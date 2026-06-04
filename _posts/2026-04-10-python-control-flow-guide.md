---
layout: post
title: "[3강] 파이썬 제어문: 조건문(if)과 반복문(for/while)"
subtitle: "if, elif, else부터 for·while·break·continue까지 흐름 제어 완전 정복"
categories: [Python]
tags: [python, 기초, 제어문, if, for, while]
author: min oh
comments: true
date: 2026-04-10 09:00:00 +0900
---

프로그램은 항상 위에서 아래로만 실행되지 않습니다. **조건에 따라 다른 동작을 하고**, **같은 동작을 여러 번 반복**하도록 제어할 수 있어야 합니다. 이것이 프로그래밍의 핵심 흐름 제어입니다.

---

## 1. 조건문 (if / elif / else)

### 1.1 기본 구조

```python
# 기본 if-else
score = int(input('점수를 입력하세요: '))

if score >= 60:
    print(f"{score}점, 합격입니다!")
else:
    print(f"{score}점, 불합격입니다.")
```

> [!IMPORTANT]
> if문 다음에는 반드시 **콜론(:)**을 붙이고, 블록 내부는 **들여쓰기(4칸)**로 구분합니다. 들여쓰기가 잘못되면 즉시 오류가 발생합니다!

### 1.2 elif로 다중 조건

```python
score = int(input("점수 입력: "))

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"학점: {grade}")
```

### 1.3 비교 연산자와 논리 연산자

```python
# 비교 연산자
print(10 > 5)    # True
print(10 == 10)  # True (같다 = ==, 다르다 = !=)
print(10 >= 20)  # False

# 논리 연산자 (and, or, not)
math, eng = 85, 70
if math >= 80 and eng >= 60:
    print("이공계 장학생 기준 충족!")

# in, not in (파이썬 특유의 직관적인 문법)
pocket = ['phone', 'money', 'card']
if 'money' in pocket:
    print("택시를 탑시다!")
elif 'card' in pocket:
    print("버스를 탑시다!")
else:
    print("걷겠습니다...")
```

### 1.4 삼항 연산자 (한 줄 조건식)

```python
age = 20
status = "성인" if age >= 18 else "미성년자"
print(status)  # 성인

# 활용 예: 절댓값 구하기
x = -5
abs_x = x if x >= 0 else -x
```

---

## 2. while 반복문

조건이 참인 동안 계속 반복합니다.

### 2.1 기본 구조

```python
n = 1
while n <= 5:
    print(n)
    n += 1  # n을 증가시키지 않으면 무한 루프!
```

### 2.2 break와 continue

```python
# break: 반복문 즉시 종료
n = 0
while True:  # 무한 루프
    n += 1
    if n == 5:
        break  # n이 5가 되면 반복 종료
print(f"종료! n = {n}")  # n = 5

# continue: 현재 반복만 건너뛰고 다음 반복으로
n = 0
while n < 10:
    n += 1
    if n % 2 == 0:
        continue  # 짝수면 건너뜀
    print(n)  # 1, 3, 5, 7, 9 만 출력
```

### 2.3 실전 예제: 커피 자판기

```python
coffee = int(input("초기 커피 개수: "))

while True:
    money = int(input("금액을 넣으세요 (커피 1잔 300원): "))
    if money == 300:
        print("커피를 드립니다.")
        coffee -= 1
    elif money > 300:
        print(f"거스름돈 {money - 300}원을 드리고 커피를 드립니다.")
        coffee -= 1
    else:
        print("금액이 부족합니다. 돈을 돌려드립니다.")

    if coffee == 0:
        print("커피가 모두 소진되었습니다.")
        break
```

---

## 3. for 반복문

시퀀스(리스트, 튜플, 문자열 등)를 **순서대로 하나씩** 꺼내 반복합니다.

### 3.1 기본 구조

```python
fruits = ['사과', '바나나', '딸기']
for fruit in fruits:
    print(f"과일: {fruit}")

# 문자열 순회
for char in "Python":
    print(char, end=' ')  # P y t h o n
```

### 3.2 range() 함수

```python
# range(stop) - 0부터 stop-1까지
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop) - start부터 stop-1까지
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# range(start, stop, step) - step 간격으로
for i in range(0, 20, 3):
    print(i)  # 0, 3, 6, 9, 12, 15, 18

# 역순 반복
for i in range(10, 0, -1):
    print(i, end=' ')  # 10 9 8 7 6 5 4 3 2 1
```

### 3.3 enumerate() - 인덱스와 값을 함께

```python
fruits = ['사과', '바나나', '딸기']
for i, fruit in enumerate(fruits):
    print(f"{i+1}번: {fruit}")
# 1번: 사과
# 2번: 바나나
# 3번: 딸기
```

### 3.4 중첩 for문 (구구단)

```python
for m in range(2, 10):
    print(f"--- {m}단 ---")
    for i in range(1, 10):
        print(f"{m} × {i} = {m * i}")
    print()
```

---

## 4. 리스트 컴프리헨션 (List Comprehension)

for문과 조건문을 한 줄로 압축하는 강력한 문법입니다.

```python
# 일반 for문
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# 리스트 컴프리헨션 (동일한 결과)
squares = [i ** 2 for i in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# 조건 필터링
even_squares = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# 문자열 처리
words = ['hello', 'python', 'world']
upper_words = [w.upper() for w in words]
print(upper_words)  # ['HELLO', 'PYTHON', 'WORLD']
```

---

## 5. 실전 문제

### 문제 1: 합격 판별

```python
scores = [50, 49, 60, 44, 75, 82, 55]
for s in scores:
    result = "합격" if s >= 60 else "불합격"
    print(f"{s}점: {result}")
```

### 문제 2: 공배수 출력 (1~500, 15의 배수)

```python
count = 0
for i in range(1, 501):
    if i % 3 == 0 and i % 5 == 0:
        print(i, end='\t')
        count += 1
        if count % 5 == 0:
            print()  # 5개마다 줄바꿈
```

### 문제 3: 공 튀기기 시뮬레이션

```python
# 100cm에서 떨어지고 매번 60%만큼 튀어오를 때, n번 후의 높이
n = int(input("공이 튀는 횟수: "))
h = 100.0
for _ in range(n):
    h *= 0.6
print(f"{n}번 후 높이: {h:.4f}cm")
```

### 문제 4: 알파벳 빈도 세기

```python
word = input("단어를 입력하세요: ").lower()

# 딕셔너리로 빈도 집계
freq = {}
for char in word:
    if char.isalpha():  # 알파벳만
        freq[char] = freq.get(char, 0) + 1

# 알파벳 순 정렬 출력
for char in sorted(freq):
    print(f"  {char}: {freq[char]}번")
```

---

## 6. 제어문 흐름 정리

```
프로그램 흐름
 ┌──────────────────────────────────────┐
 │  순차 실행 (위 → 아래)                │
 │  ┌─────────┐                         │
 │  │  if/elif │ 조건에 따라 분기         │
 │  └─────────┘                         │
 │  ┌─────────┐                         │
 │  │  while   │ 조건이 참인 동안 반복    │
 │  └─────────┘                         │
 │  ┌─────────┐                         │
 │  │   for    │ 시퀀스를 순서대로 반복   │
 │  └─────────┘                         │
 └──────────────────────────────────────┘
```

| 키워드 | 역할 | 사용 위치 |
|--------|------|-----------|
| `break` | 반복문 즉시 탈출 | while, for |
| `continue` | 현재 반복 건너뜀 | while, for |
| `pass` | 아무것도 하지 않음 (자리 채우기) | if, for, while |

다음 강에서는 **함수(Function)**를 만들어 코드를 재사용하는 방법을 배웁니다.
