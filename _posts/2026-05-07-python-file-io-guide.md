---
layout: post
title: "[6강] 파이썬 파일 입출력 (File I/O) 완전 가이드"
subtitle: "open·read·write·with문부터 CSV/JSON 파일 처리까지"
categories: [Python]
tags: [python, 파일입출력, FileIO, CSV, JSON, with문, 가이드]
author: min oh
comments: true
---

프로그램이 종료되면 메모리의 데이터는 사라집니다. **파일 입출력(File I/O)**을 사용하면 데이터를 디스크에 영구적으로 저장하거나 불러올 수 있습니다. 데이터 분석, 로그 기록, 설정 파일 관리 등 거의 모든 분야에서 필수적으로 사용합니다.

---

## 1. 파일 열기 모드

```python
# open(파일명, 모드, encoding=인코딩)
f = open("data.txt", 'r', encoding='utf-8')
```

| 모드 | 이름 | 설명 |
|------|------|------|
| `'r'` | 읽기 (Read) | 파일을 읽기만 함 (기본값). 파일 없으면 오류 |
| `'w'` | 쓰기 (Write) | 새 파일 생성. **기존 내용 모두 삭제** |
| `'a'` | 추가 (Append) | 기존 내용 뒤에 이어서 쓰기 |
| `'x'` | 독점 생성 | 파일이 이미 있으면 오류 |
| `'rb'`, `'wb'` | 바이너리 | 이진 파일 (이미지, 음악 등) |

> [!IMPORTANT]
> 한글이 포함된 파일은 반드시 `encoding='utf-8'`을 지정하세요! 윈도우에서는 `encoding='cp949'`가 필요한 경우도 있습니다.

---

## 2. 파일 쓰기 ('w', 'a')

### 2.1 write 모드 - 새 파일 생성

```python
# 방법 1: f.close()를 직접 호출
f = open("test.txt", 'w', encoding='utf-8')
for i in range(1, 6):
    f.write(f"{i}번째 줄입니다.\n")  # \n으로 줄바꿈
f.close()  # 반드시 닫아야 함!

# 방법 2: with문 (권장 - 자동으로 닫힘)
with open("test.txt", 'w', encoding='utf-8') as f:
    for i in range(1, 6):
        f.write(f"{i}번째 줄입니다.\n")
# with 블록을 벗어나면 자동으로 f.close() 호출
```

### 2.2 append 모드 - 이어쓰기

```python
with open("test.txt", 'a', encoding='utf-8') as f:
    for i in range(6, 11):
        f.write(f"{i}번째 줄이 추가됩니다.\n")
```

---

## 3. 파일 읽기 ('r')

### 3.1 세 가지 읽기 방법

```python
# readline() - 한 줄씩 읽기
with open("test.txt", 'r', encoding='utf-8') as f:
    while True:
        line = f.readline()
        if not line:
            break
        print(line, end='')

# readlines() - 모든 줄을 리스트로
with open("test.txt", 'r', encoding='utf-8') as f:
    lines = f.readlines()  # ['1번째 줄입니다.\n', '2번째 줄입니다.\n', ...]
    for line in lines:
        print(line.strip())  # strip()으로 줄바꿈 제거

# read() - 전체를 문자열 하나로
with open("test.txt", 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)
```

### 3.2 for문으로 파일 읽기 (가장 효율적)

```python
# 대용량 파일도 한 줄씩 메모리에 올려 처리
with open("test.txt", 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        print(f"{line_num:3}: {line}", end='')
```

---

## 4. 파일 처리 실전 예제

### 4.1 로그 파일 작성

```python
from datetime import datetime

def write_log(message, filename="app.log"):
    """타임스탬프와 함께 로그를 기록합니다."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] {message}\n"
    with open(filename, 'a', encoding='utf-8') as f:
        f.write(log_entry)

write_log("프로그램 시작")
write_log("데이터 처리 완료: 100건")
write_log("프로그램 종료")
```

### 4.2 단어 빈도 분석

```python
def count_words(filename):
    """텍스트 파일의 단어 빈도를 세어 상위 10개를 반환합니다."""
    freq = {}
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            words = line.lower().split()
            for word in words:
                word = word.strip('.,!?":')  # 구두점 제거
                if word:
                    freq[word] = freq.get(word, 0) + 1
    
    # 빈도 기준 내림차순 정렬
    sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    return sorted_freq[:10]  # 상위 10개
```

---

## 5. CSV 파일 처리

CSV(Comma Separated Values)는 데이터 분석에서 가장 많이 사용하는 파일 형식입니다.

### 5.1 csv 모듈 기본

```python
import csv

# CSV 쓰기
headers = ['이름', '부서', '점수']
data = [
    ['김민준', '공정운영팀', 92],
    ['이서연', '품질분석팀', 88],
    ['박지호', '유지보수팀', 75],
]

with open("scores.csv", 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(headers)    # 헤더 행 작성
    writer.writerows(data)      # 데이터 행들 작성
```

```python
# CSV 읽기 - DictReader 사용 (헤더를 키로)
with open("scores.csv", 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['이름']}: {row['점수']}점")
```

> [!TIP]
> 윈도우에서 한글 CSV를 엑셀로 열 때 깨지지 않으려면 `encoding='utf-8-sig'`를 사용하세요!

### 5.2 성적 분석 실전

```python
import csv

def analyze_csv(filename):
    scores = []
    names = []
    
    with open(filename, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            names.append(row['이름'])
            scores.append(int(row['점수']))
    
    print(f"수강생: {len(scores)}명")
    print(f"평균: {sum(scores)/len(scores):.1f}점")
    print(f"최고: {max(scores)}점 ({names[scores.index(max(scores))]})")
    print(f"최저: {min(scores)}점 ({names[scores.index(min(scores))]})")
    print(f"합격률: {sum(1 for s in scores if s>=60)/len(scores)*100:.0f}%")

analyze_csv("scores.csv")
```

---

## 6. JSON 파일 처리

JSON은 웹 API와 설정 파일에서 표준으로 사용하는 형식입니다.

```python
import json

# 딕셔너리 → JSON 파일로 저장
equipment_data = {
    "equipment_id": 101,
    "model_name": "ETCH-A100",
    "status": "active",
    "sensors": ["rf_power", "gas_flow"],
    "install_date": "2022-03-15"
}

with open("equipment.json", 'w', encoding='utf-8') as f:
    json.dump(equipment_data, f, ensure_ascii=False, indent=2)
    # ensure_ascii=False: 한글 유지
    # indent=2: 들여쓰기로 보기 좋게

# JSON 파일 → 딕셔너리로 읽기
with open("equipment.json", 'r', encoding='utf-8') as f:
    data = json.load(f)

print(data['model_name'])   # ETCH-A100
print(data['sensors'])      # ['rf_power', 'gas_flow']
```

---

## 7. 파일 존재 여부 확인 (os 모듈)

```python
import os

filename = "data.txt"

# 파일 존재 여부
if os.path.exists(filename):
    print(f"파일 크기: {os.path.getsize(filename)} bytes")
else:
    print("파일이 없습니다.")

# 디렉토리 생성
os.makedirs("output", exist_ok=True)  # exist_ok=True: 이미 있어도 오류 없음
```

---

## 8. with문의 중요성

```python
# ❌ 위험한 코드 (예외 발생 시 close() 안 됨)
f = open("data.txt", 'r')
content = f.read()
# 여기서 오류 발생 → f.close()가 실행 안 됨!
f.close()

# ✅ 안전한 코드 (항상 close() 보장)
with open("data.txt", 'r', encoding='utf-8') as f:
    content = f.read()
# with 블록 종료 시 자동으로 close()

# ✅ 여러 파일 동시 열기
with open("input.txt", 'r') as fin, open("output.txt", 'w') as fout:
    for line in fin:
        fout.write(line.upper())
```

---

## 핵심 정리

| 형식 | 모듈 | 주요 함수 | 용도 |
|------|------|-----------|------|
| TXT | 내장 | `open()`, `read()`, `write()` | 텍스트, 로그 |
| CSV | `csv` | `DictReader()`, `writer()` | 표 형식 데이터 |
| JSON | `json` | `load()`, `dump()` | API, 설정 파일 |
| Excel | `openpyxl` | `load_workbook()` | 엑셀 파일 |
| Binary | 내장 | `open('rb')` | 이미지, 음악 |

다음 강에서는 **외부 API**를 활용하여 실시간 데이터를 가져오는 방법을 배웁니다!
