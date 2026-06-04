---
layout: post
title: LangChain 기반 챗봇 실습
subtitle: LangChain을 활용하여 문서를 기반으로 답변하는 챗봇(RAG)을 구현해 봅니다.
categories: [Machine Learning]
tags: [머신러닝, LangChain, LLM, RAG]
author: min oh
date: 2026-06-04 12:00:00 +0900
---

이번 포스트에서는 LangChain을 활용하여 제공된 문서를 바탕으로 질문에 답변하는 RAG(Retrieval-Augmented Generation) 챗봇을 구현하는 예제를 소개합니다. PDF, 텍스트(TXT), 워드 문서(DOCX) 등 다양한 파일에서 정보를 로드하고 FAISS 벡터 스토어를 사용하여 의미 검색을 수행합니다.

## 전체 코드
다음은 `langchain.py` 파일의 전체 스크립트 내용입니다. Google API Key가 필요합니다.

```python
#!/usr/bin/env python3
\"\"\"LangChain 문서 기반 챗봇 예제 스크립트

설치:
    pip install -r requirements.txt

사용 방법:
    python langchain.py
\"\"\"

import os
from pathlib import Path
from typing import List

import requests
from langchain_community.document_loaders import PyPDFLoader, TextLoader, UnstructuredWordDocumentLoader
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings
from langchain_core.prompts import PromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Google API 키 설정
GOOGLE_API_KEY = "your api key"
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

class GoogleTextEmbedding(Embeddings):
    def __init__(self, api_key: str, model: str = "textembedding-gecko-001"):
        self.api_key = api_key
        self.model = model
        self.endpoint = "https://embedding.googleapis.com/v1/embeddings"

    def _request(self, payload: dict) -> dict:
        response = requests.post(
            self.endpoint,
            params={"key": self.api_key},
            json=payload,
            timeout=60,
        )
        response.raise_for_status()
        return response.json()

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        response = self._request({"model": self.model, "input": texts})
        return [item["embedding"] for item in response["data"]]

    def embed_query(self, text: str) -> list[float]:
        return self.embed_documents([text])[0]

class GoogleTextGenerator:
    def __init__(
        self,
        api_key: str,
        model_name: str = "text-bison-001",
        temperature: float = 0.0,
        max_output_tokens: int = 1024,
    ):
        self.api_key = api_key
        self.model_name = model_name
        self.temperature = temperature
        self.max_output_tokens = max_output_tokens
        self.base_url = "https://generativelanguage.googleapis.com/v1beta2/models"

    def invoke(self, prompt: str) -> str:
        response = requests.post(
            f"{self.base_url}/{self.model_name}:generate",
            params={"key": self.api_key},
            json={
                "prompt": {"text": prompt},
                "temperature": self.temperature,
                "maxOutputTokens": self.max_output_tokens,
            },
            timeout=60,
        )
        response.raise_for_status()
        data = response.json()
        candidates = data.get("candidates", [])
        if not candidates:
            raise ValueError("Google API returned no text generation candidates.")
        candidate = candidates[0]
        return candidate.get("output") or candidate.get("content") or ""

def load_pdf(pdf_path: str) -> List[Document]:
    loader = PyPDFLoader(pdf_path)
    return loader.load()

def load_text(txt_path: str, encoding: str = "utf-8") -> List[Document]:
    loader = TextLoader(txt_path, encoding=encoding)
    return loader.load()

def load_docx(docx_path: str) -> List[Document]:
    loader = UnstructuredWordDocumentLoader(docx_path)
    return loader.load()

def load_documents_from_data_dir(data_dir: Path) -> List[Document]:
    supported_ext = {".pdf", ".txt", ".docx"}
    docs: List[Document] = []

    if not data_dir.exists():
        print(f"[WARN] data 디렉토리가 없습니다: {data_dir}. 생성합니다.")
        data_dir.mkdir(parents=True, exist_ok=True)
        return docs

    for path in sorted(data_dir.iterdir()):
        if not path.is_file():
            continue

        ext = path.suffix.lower()
        if ext not in supported_ext:
            print(f"[WARN] 지원되지 않는 파일 형식입니다: {path.name}")
            continue

        try:
            if ext == ".pdf":
                loaded = load_pdf(str(path))
            elif ext == ".txt":
                for enc in ("utf-8", "cp949", "euc-kr"):
                    try:
                        loaded = load_text(str(path), encoding=enc)
                        break
                    except Exception:
                        loaded = []
            elif ext == ".docx":
                loaded = load_docx(str(path))
            else:
                loaded = []

            print(f"[INFO] 로드 완료: {path.name} ({len(loaded)} 문서)")
            docs.extend(loaded)
        except Exception as exc:
            print(f"[ERROR] {path.name} 로드 실패: {exc}")

    return docs

def split_documents(docs: List[Document], chunk_size: int = 1000, chunk_overlap: int = 100) -> List[Document]:
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(docs)

def build_faiss_index(documents: List[Document]) -> FAISS:
    return FAISS.from_documents(documents=documents, embedding=GoogleTextEmbedding(api_key=GOOGLE_API_KEY))

def build_rag_chain(retriever, model_name: str = "text-bison-001", temperature: float = 0.0):
    prompt = PromptTemplate.from_template(
        \"\"\"당신은 질문-답변(Question-Answering)을 수행하는 친절한 AI 어시스턴트입니다.
검색된 다음 문맥(context)을 사용하여 질문(question)에 답하세요.
만약, 주어진 문맥(context)에서 답을 찾을 수 없다면, `주어진 정보에서 질문에 대한 정보를 찾을 수 없습니다`라고 답하세요.
한글로 답변해 주세요. 단, 기술적인 용어나 이름은 번역하지 않고 그대로 사용해 주세요.

#Question:
{question}

#Context:
{context}

#Answer:\"\"\"
    )

    llm = GoogleTextGenerator(api_key=GOOGLE_API_KEY, model_name=model_name, temperature=temperature)

    def run(question: str):
        docs = retriever.get_relevant_documents(question)
        if not docs:
            return "주어진 정보에서 질문에 대한 정보를 찾을 수 없습니다"
        context_text = "\n\n".join(doc.page_content for doc in docs)
        prompt_text = prompt.format(question=question, context=context_text)
        return llm.invoke(prompt_text)

    return run

def main():
    base_dir = Path(__file__).resolve().parent
    data_dir = base_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)

    print("[INFO] LangChain 문서 기반 챗봇 스크립트 실행")
    print("[INFO] Google API 키가 설정되었습니다.")
    print(f"[INFO] data 폴더 경로: {data_dir}")

    loaded_docs = load_documents_from_data_dir(data_dir)
    if not loaded_docs:
        print("[WARN] data 폴더에 로드할 문서가 없습니다. PDF, TXT, DOCX 파일을 추가하세요.")
        print("[INFO] 스크립트 실행 종료")
        return

    split_docs = split_documents(loaded_docs, chunk_size=1000, chunk_overlap=100)
    print(f"[INFO] 총 문서 청크 생성 완료: {len(split_docs)}개")

    vectorstore = build_faiss_index(split_docs)
    retriever = vectorstore.as_retriever()

    rag_chain = build_rag_chain(retriever)

    print("\\n[질문 예시]: 금융기관에 대해서 분류해줘.")
    print("[질문 예시]: 주택 임대시 주의점은 무엇인가요?")

    # 대화형 QA 루프
    print("\\n" + "=" * 50)
    print("[INFO] 직접 질문해보세요. 종료하려면 'q' 또는 '종료'를 입력하세요.")
    print("=" * 50)

    while True:
        try:
            user_input = input("\\n질문: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\\n[INFO] 종료합니다.")
            break

        if not user_input:
            continue
        if user_input.lower() in ("q", "quit", "exit", "종료"):
            print("[INFO] 종료합니다.")
            break

        response = rag_chain.invoke(user_input)
        print(f"응답: {response}")

if __name__ == "__main__":
    main()
```
