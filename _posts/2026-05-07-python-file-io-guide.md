---
layout: post
title: "파이썬 기초: 파일 읽고 쓰기 (File I/O) 완벽 가이드"
subtitle: "파일 생성부터 데이터 읽기, 추가, 그리고 with문 활용까지"
categories: [Python]
tags: [python, 기초, 가이드]
author: min oh
comments: true
---

프로그램이 실행되는 동안에만 데이터를 가지고 있는 것이 아니라, 데이터를 영구적으로 저장하거나 저장된 데이터를 불러와야 할 때 **파일 읽고 쓰기(File I/O)** 기능을 사용합니다. 파이썬에서 파일을 다루는 핵심 방법들을 정리해 보았습니다.

---

## 1. 파일 열기 모드

파일을 열 때는 `open()` 함수를 사용하며, 용도에 맞는 **모드(Mode)**를 지정해야 합니다.

| 모드 | 이름 | 설명 |
| :--- | :--- | :--- |
| **'r'** | 읽기 모드 (Read) | 파일을 읽기만 할 때 사용 (기본값) |
| **'w'** | 쓰기 모드 (Write) | 파일에 내용을 쓸 때 사용 (**기존 내용이 모두 삭제됨**) |
| **'a'** | 추가 모드 (Append) | 파일의 마지막에 새로운 내용을 추가할 때 사용 |

---

## 2. 파일 생성하고 데이터 쓰기 ('w')

새로운 파일을 만들거나 기존 파일을 덮어쓰고 싶을 때 사용합니다.

```python
# 파일 열기 (쓰기 모드)
f = open("test.txt", 'w', encoding='utf-8')

for i in range(1, 6):
    data = f"{i}번째 줄입니다.\n"
    f.write(data)

# 파일 닫기 (매우 중요!)
f.close()
```

> [!IMPORTANT]
> 한글이 포함된 파일을 다룰 때는 `encoding='utf-8'` 설정을 추가해야 글자가 깨지지 않습니다.

---

## 3. 파일 읽기 ('r')

저장된 파일을 불러오는 방법은 세 가지가 있습니다.

### (1) readline() - 한 줄씩 읽기
파일의 첫 번째 줄부터 한 줄씩 읽어옵니다.
```python
f = open("test.txt", 'r', encoding='utf-8')
while True:
    line = f.readline()
    if not line: break # 더 이상 읽을 줄이 없으면 종료
    print(line, end='')
f.close()
```

### (2) readlines() - 모든 줄을 리스트로 읽기
파일의 모든 줄을 읽어서 각각의 줄을 요소로 갖는 리스트를 반환합니다.
```python
f = open("test.txt", 'r', encoding='utf-8')
lines = f.readlines()
for line in lines:
    print(line.strip()) # strip()으로 줄바꿈 제거 가능
f.close()
```

### (3) read() - 전체 내용을 문자열로 읽기
파일의 내용 전체를 하나의 큰 문자열로 읽어옵니다.
```python
f = open("test.txt", 'r', encoding='utf-8')
data = f.read()
print(data)
f.close()
```

---

## 4. 기존 파일에 내용 추가하기 ('a')

쓰기 모드('w')는 파일을 새로 만들거나 덮어쓰지만, 추가 모드('a')는 기존 내용은 그대로 두고 뒤에 덧붙입니다.

```python
f = open("test.txt", 'a', encoding='utf-8')
for i in range(6, 11):
    data = f"{i}번째 줄이 추가되었습니다.\n"
    f.write(data)
f.close()
```

---

## 5. with문과 함께 사용하기 (강력 추천)

파일을 열면 항상 `f.close()`로 닫아주어야 합니다. 하지만 깜빡 잊기 쉽죠. 파이썬의 `with`문을 사용하면 블록을 벗어나는 순간 파일이 **자동으로 닫히므로** 훨씬 안전하고 깔끔합니다.

```python
# close()를 직접 호출할 필요가 없습니다.
with open("hello.txt", "w", encoding='utf-8') as f:
    f.write("Life is short, you need Python!")
```

---

파일 입출력은 데이터 분석, 로그 기록, 설정 파일 관리 등 프로그래밍의 거의 모든 분야에서 사용되는 필수 기능입니다. 특히 `with`문과 `encoding='utf-8'` 사용 습관을 들여 에러 없는 코드를 작성해 보세요!
