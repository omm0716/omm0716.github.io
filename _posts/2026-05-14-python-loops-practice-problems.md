---
layout: post
title: "파이썬 실습: 반복문 마스터하기 (while & for)"
subtitle: "다양한 예제로 익히는 파이썬 반복문 활용법"
categories: [Python]
tags: [python, 연습문제, 실습]
author: min oh
comments: true
---

지난 포스트에서 배운 파이썬 반복문 기초를 바탕으로, 실무와 알고리즘 문제 풀이에서 자주 쓰이는 패턴들을 연습해 보겠습니다. 각 문제의 요구 사항을 먼저 읽고 직접 코드를 작성해 본 뒤 모범 답안을 확인해 보세요.

---

## 🟢 WHILE 반복문 연습

### 1. 제곱수 출력하기
사용자로부터 정수 `num`을 입력받아, 1부터 `num`까지 각 숫자의 제곱을 출력합니다.

```python
num = int(input('정수를 입력해주세요: '))
n = 1
while n <= num:
    print(n**2)
    n += 1
```
- **포인트**: `n`의 값을 매 반복마다 증가시켜 무한 루프에 빠지지 않도록 주의합니다.

### 2. 공 튀기기 시뮬레이션
100cm 높이에서 떨어진 공이 튈 때마다 이전 높이의 60%(3/5)만큼 다시 올라온다고 가정합니다. 입력받은 횟수만큼 튄 후의 최종 높이를 계산합니다.

```python
num = int(input('공이 튀는 횟수를 입력하세요: '))
n = 1
h = 100 # 초기 높이
while n <= num:
    h = h * 0.6
    n += 1
print("최종 높이:", h)
```

### 3. 커피 자판기 프로그램
남은 커피 수량을 관리하고, 입력된 금액에 따라 거스름돈을 주거나 판매를 중지하는 시뮬레이션입니다.

```python
coffee = int(input("초기 커피 개수를 입력하세요: "))
while True:
    money = int(input("돈을 넣어 주세요 (커피 1잔 300원): "))
    if money == 300:
        print("커피를 줍니다.")
        coffee -= 1
    elif money > 300:
        print(f"거스름돈 {money - 300}원을 주고 커피를 줍니다.")
        coffee -= 1
    else:
        print("돈이 부족합니다. 다시 돌려주고 커피를 주지 않습니다.")
        print(f"남은 커피의 양은 {coffee}개입니다.")
    
    if coffee == 0:
        print("커피가 다 떨어졌습니다. 판매를 중지합니다.")
        break
```

---

## 🔵 FOR 반복문 연습

### 1. 알파벳 빈도수 세기
입력받은 문자열 내에서 알파벳(a~z)이 각각 몇 번 등장하는지 오름차순으로 출력합니다. (대소문자 구분 없음)

```python
word = input("문자열을 입력하세요: ").lower()
alphabet = "abcdefghijklmnopqrstuvwxyz"

for char in alphabet:
    count = 0
    for s in word:
        if s == char:
            count += 1
    if count > 0:
        print(f"- {char}: {count}")
```

### 2. 계단식 숫자 출력
중첩 `for`문을 사용하여 1부터 입력받은 `n`까지 계단 형태로 숫자를 출력합니다.

```python
n = int(input("정수 n을 입력하세요: "))

for i in range(1, n + 1):
    for j in range(1, i + 1):
        if j == i:
            print(j) # 줄바꿈
        else:
            print(j, end=' ') # 공백 추가 후 옆으로 출력
```

### 3. 공배수 출력 및 줄바꿈 관리
1부터 500까지의 숫자 중 3과 5의 공배수(15의 배수)를 찾아 한 줄에 5개씩 출력합니다.

```python
count = 0
for i in range(1, 501):
    if i % 3 == 0 and i % 5 == 0:
        print(i, end='\t') # 탭 간격으로 출력
        count += 1
        if count % 5 == 0:
            print() # 5개마다 줄바꿈
```

### 4. 중첩 루프: 구구단 출력
2단부터 9단까지의 구구단을 포맷 문자열(f-string)을 사용하여 깔끔하게 출력합니다.

```python
for m in range(2, 10):
    print(f"--- {m}단 ---")
    for i in range(1, 10):
        print(f"{m} x {i} = {m * i}")
    print() # 단 사이 공백
```

---

반복문은 조건문과 함께 프로그래밍의 논리를 구성하는 가장 핵심적인 도구입니다. 위의 문제들이 익숙해질 때까지 반복해서 연습해 보세요!
