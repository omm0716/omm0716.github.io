---
layout: post
title: "[10강] LangChain 문서 기반 챗봇 실습"
subtitle: "내 PDF 문서를 읽고 답변하는 똑똑한 RAG 챗봇 만들기"
categories: ["Machine Learning"]
tags: ["머신러닝", "Machine Learning", "LangChain", "LLM", "RAG", "Chatbot"]
author: "omm0716"
date: "2026-06-11 18:00:00 +0900"
---

안녕하세요! 대망의 머신러닝 시리즈 10강입니다. 
지금까지 우리는 정형화된 숫자 데이터(CSV)를 바탕으로 예측하고 분류하는 전통적인 머신러닝 기법들을 배웠습니다. 이번 마지막 시간은 요즘 인공지능의 트렌드인 **LLM(Large Language Model)**을 다루어 볼 텐데요, 그중에서도 내가 가진 문서(PDF, 텍스트)를 바탕으로 대답해주는 똑똑한 챗봇을 만들어보겠습니다.

단순히 ChatGPT에게 질문하는 것이 아닙니다. 회사 내규, 학교 교재, 개인적인 법률 문서 등 인터넷에 없는 **"나만의 문서"**를 기계에게 읽히고, 오직 그 문서의 내용만을 바탕으로 답변하게 만드는 **RAG (Retrieval-Augmented Generation)** 기술을 **LangChain** 라이브러리를 통해 구현해 보겠습니다.

---

## 1. RAG 모델과 LangChain이란?

- **RAG (검색 증강 생성)**: 사용자가 질문을 하면, LLM이 자기 머릿속(사전 학습 지식)에서만 답을 찾는 것이 아니라, 우리가 건네준 문서 더미에서 관련 내용을 '검색(Retrieval)'해 온 뒤, 그 검색 결과를 덧붙여서(Augmented) 답변을 '생성(Generation)'하는 기술입니다. 이 기술을 쓰면 환각 현상(거짓말)을 막고 출처가 분명한 답변을 얻을 수 있습니다.
- **LangChain**: 이런 복잡한 RAG 파이프라인(문서 쪼개기 -> 벡터화 -> 검색 -> LLM 답변)을 블록 조립하듯 아주 쉽게 연결해(Chain) 주는 파이썬 프레임워크입니다.

---

## 2. 문서 준비 및 쪼개기 (Document Split)

우선 챗봇이 읽을 PDF나 TXT 파일이 필요합니다. 전체 문서를 한 번에 LLM에게 먹일 수는 없습니다. 글자 수 제한이 있기 때문이죠. 따라서 문서를 적당한 크기의 덩어리(Chunk)로 잘게 쪼개주어야 합니다.

```python
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. 문서 불러오기
loader = TextLoader("./data/주택임대차보호법(법률).txt", encoding="utf-8")
docs = loader.load()

# 2. 문서 쪼개기 (청크 사이즈 1000자, 앞뒤 문맥 겹침 100자)
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
split_docs = splitter.split_documents(docs)

print(f"문서가 총 {len(split_docs)}개의 조각으로 쪼개졌습니다.")
```

---

## 3. 벡터화 (Embedding) 및 검색 저장소 (FAISS) 구축

컴퓨터는 한글을 이해하지 못합니다. 쪼개진 글 조각들을 컴퓨터가 이해할 수 있는 수많은 숫자의 나열(좌표)로 바꾸는 작업을 **임베딩(Embedding)**이라고 합니다. 그리고 이 숫자들을 잘 보관했다가, 사용자의 질문과 가장 좌표가 가까운 글 조각을 0.1초 만에 찾아주는 데이터베이스가 바로 **FAISS (벡터 DB)**입니다.

여기서는 구글의 텍스트 임베딩 모델을 사용하겠습니다.

```python
import os
from langchain_community.vectorstores import FAISS

# Google API 키 등록 (본인의 키 입력)
os.environ["GOOGLE_API_KEY"] = "YOUR_GOOGLE_API_KEY"

# 벡터 DB(FAISS) 구축
# split_docs들을 Google 임베딩 모델로 숫자로 변환하여 FAISS에 저장합니다.
vectorstore = FAISS.from_documents(
    documents=split_docs,
    embedding=GoogleTextEmbedding(api_key=os.environ["GOOGLE_API_KEY"])
)

# 문서를 검색해주는 도구(Retriever)로 변환
retriever = vectorstore.as_retriever()
```

---

## 4. 프롬프트 세팅 및 챗봇 실행

이제 LLM(두뇌)과 Retriever(눈)를 연결해 줄 차례입니다. LLM에게 **"오직 검색해 온 내용(Context)만 보고 질문(Question)에 답해"**라고 엄격한 지시사항(프롬프트)을 내립니다.

```python
from langchain_core.prompts import PromptTemplate

# 엄격한 프롬프트 작성
prompt = PromptTemplate.from_template(
    """당신은 친절한 법률/문서 어시스턴트입니다.
반드시 아래의 검색된 문맥(Context)만을 사용하여 질문에 답하세요.
만약 문맥에 없는 내용이라면 "주어진 정보에서는 찾을 수 없습니다"라고만 답하세요.

#Question:
{question}

#Context:
{context}

#Answer:"""
)

# LLM 객체 생성
llm = GoogleTextGenerator(api_key=os.environ["GOOGLE_API_KEY"])

# 질문 답변 실행 함수 만들기
def ask_chatbot(question: str):
    # 1. 질문과 비슷한 문서를 벡터 DB에서 검색
    relevant_docs = retriever.get_relevant_documents(question)
    
    # 2. 검색된 문서들의 텍스트를 하나로 이어붙임
    context_text = "\n\n".join(doc.page_content for doc in relevant_docs)
    
    # 3. 프롬프트 완성
    final_prompt = prompt.format(question=question, context=context_text)
    
    # 4. LLM에게 답변 요청
    return llm.invoke(final_prompt)

# 실행 예시
print(ask_chatbot("주택 임대시 주의할 점이 뭐야?"))
```

실행하면 우리가 넣어둔 주택임대차보호법 텍스트 파일의 내용을 바탕으로 똑똑하게 답변을 생성해 내는 것을 볼 수 있습니다!

---

## 💡 시리즈를 마치며

| 개념 | 설명 |
|---|---|
| **RAG** | 외부 문서를 검색해 와서 그 정보를 바탕으로 답변을 생성하는 언어 모델 아키텍처 |
| **임베딩 (Embedding)** | 자연어(글)를 기계가 유사도를 계산할 수 있도록 고차원 숫자 벡터로 변환하는 기술 |
| **벡터 데이터베이스** | 임베딩된 문서를 저장하고, 질문과 가장 의미가 비슷한 문서를 빛의 속도로 찾아주는 검색 엔진 |

1강의 기초적인 방정식 찾기(선형 회귀)부터 출발해 마지막 10강의 최신 LLM RAG 시스템 구축까지, 쉼 없이 달려오신 여러분 고생 많으셨습니다. 머신러닝의 기본 원리를 깨우쳤으니, 이제 여러분의 도메인 지식을 더해 무궁무진한 AI 서비스를 직접 만들어 보시기 바랍니다! 감사합니다.