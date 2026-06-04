---
layout: post
title: "[4강] 파이썬 반복문 실전 마스터"
subtitle: "while·for 심화 응용 + 중첩 루프 + 실전 알고리즘 패턴"
categories: [Python]
tags: [python, 반복문, 실습, 연습문제, while, for]
author: min oh
comments: true
date: 2026-04-17 09:00:00 +0900
---

3강에서 배운 반복문의 기초를 바탕으로, 실무와 알고리즘 문제에서 자주 쓰이는 **심화 패턴**들을 집중적으로 연습합니다. 각 문제를 먼저 스스로 풀어보세요!

---

## 🟢 while 반복문 심화

### 패턴 1: 누산기 패턴 (Accumulator)

```python
# 1부터 N까지 합계
n = int(input("N을 입력하세요: "))
total = 0
i = 1
while i <= n:
    total += i
    i += 1
print(f"1~{n} 합계: {total}")

# for로 더 간결하게
total = sum(range(1, n + 1))
print(f"1~{n} 합계: {total}")
```

---

### 패턴 2: 플래그 패턴 (Flag)

```python
# 소수(Prime) 판별
num = int(input("정수를 입력하세요: "))
is_prime = True

if num < 2:
    is_prime = False
else:
    i = 2
    while i * i <= num:  # 제곱근까지만 확인 (효율적)
        if num % i == 0:
            is_prime = False
            break
        i += 1

result = "소수입니다" if is_prime else "소수가 아닙니다"
print(f"{num}: {result}")
```

---

### 패턴 3: 반복 입력 패턴

```python
# 사용자가 'q'를 입력할 때까지 숫자를 받아 합산
total = 0
count = 0

while True:
    user_input = input("숫자를 입력하세요 (종료: q): ")
    if user_input.lower() == 'q':
        break
    try:
        num = float(user_input)
        total += num
        count += 1
    except ValueError:
        print("잘못된 입력입니다. 다시 입력해주세요.")

if count > 0:
    print(f"합계: {total}, 평균: {total/count:.2f}")
```

---

## 🔵 for 반복문 심화

### 패턴 4: zip() - 두 리스트를 동시에

```python
# zip()으로 두 리스트를 병렬 처리
names  = ['김민준', '이서연', '박지호']
scores = [90, 85, 78]

for name, score in zip(names, scores):
    grade = 'A' if score >= 90 else 'B' if score >= 80 else 'C'
    print(f"{name}: {score}점 → {grade}")
```

---

### 패턴 5: 중첩 for문 (별 찍기)

```python
# 오른쪽 삼각형
n = 5
for i in range(1, n + 1):
    print('*' * i)

# 피라미드
for i in range(1, n + 1):
    spaces = ' ' * (n - i)
    stars  = '*' * (2 * i - 1)
    print(spaces + stars)
```

---

### 패턴 6: 리스트 컴프리헨션 + 중첩

```python
# 1~9까지 숫자의 제곱, 짝수만
even_sq = [x**2 for x in range(1, 10) if x % 2 == 0]
print(even_sq)  # [4, 16, 36, 64]

# 2차원 행렬 만들기
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
for row in matrix:
    print(row)
# [1, 2, 3]
# [2, 4, 6]
# [3, 6, 9]
```

---

## 🟣 실전 문제 풀기

### 문제 1: 제곱수 출력하기

```python
num = int(input('정수를 입력해주세요: '))
for n in range(1, num + 1):
    print(f"{n}² = {n**2}")
```

---

### 문제 2: 공 튀기기 (while 응용)

```python
# 100cm에서 공이 60%씩 반발
n = int(input('공이 튀는 횟수: '))
h = 100.0
for i in range(n):
    h *= 0.6
    print(f"{i+1}번째: {h:.2f}cm")
print(f"\n{n}번 후 최종 높이: {h:.4f}cm")
```

---

### 문제 3: 알파벳 빈도수 세기

```python
word = input("문자열을 입력하세요: ").lower()

for char in sorted(set(word)):
    if char.isalpha():
        count = word.count(char)
        bar = '■' * count  # 시각화
        print(f"  {char}: {bar} ({count})")
```

---

### 문제 4: 계단식 숫자 출력 (중첩 for)

```python
n = int(input("정수 n을 입력하세요: "))
for i in range(1, n + 1):
    row = ' '.join(str(j) for j in range(1, i + 1))
    print(row)
```
```
1
1 2
1 2 3
1 2 3 4
```

---

### 문제 5: 공배수 출력 (1~500, 15의 배수)

```python
multiples = [i for i in range(1, 501) if i % 15 == 0]

for idx, num in enumerate(multiples, 1):
    print(f"{num:4}", end='')
    if idx % 5 == 0:  # 5개마다 줄바꿈
        print()
```

---

### 문제 6: 구구단 테이블 (중첩 for)

```python
# 헤더
print(" " * 4, end='')
for i in range(1, 10):
    print(f"{i:5}", end='')
print()
print('-' * 50)

# 구구단 테이블
for m in range(2, 10):
    print(f"{m}단:", end='')
    for i in range(1, 10):
        print(f"{m*i:5}", end='')
    print()
```

---

## 🔴 고급: 반복문 최적화 패턴

### any()와 all()

```python
scores = [85, 92, 78, 60, 95]

# any(): 하나라도 조건 만족하면 True
has_perfect = any(s == 100 for s in scores)
print(f"만점 있음: {has_perfect}")  # False

# all(): 모두 조건 만족해야 True
all_pass = all(s >= 60 for s in scores)
print(f"전원 합격: {all_pass}")  # True
```

### max()와 min() 응용

```python
students = [
    {'name': '김민준', 'score': 85},
    {'name': '이서연', 'score': 92},
    {'name': '박지호', 'score': 78},
]

# 최고·최저 점수 학생 찾기
top    = max(students, key=lambda x: x['score'])
bottom = min(students, key=lambda x: x['score'])

name_top, score_top = top['name'], top['score']
name_bot, score_bot = bottom['name'], bottom['score']
print(f"1등: {name_top} ({score_top}점)")
print(f"꼴등: {name_bot} ({score_bot}점)")
```

---

## 패턴 정리

| 패턴 | 코드 | 용도 |
|------|------|------|
| 누산기 | `total += value` | 합계/곱 계산 |
| 플래그 | `found = False; break` | 탐색/조건 판별 |
| 무한루프 | `while True: ... break` | 반복 입력 |
| zip | `for a, b in zip(list1, list2)` | 병렬 처리 |
| enumerate | `for i, v in enumerate(lst)` | 인덱스+값 |
| 컴프리헨션 | `[x for x in lst if 조건]` | 필터+변환 |

다음 강에서는 반복되는 코드를 **함수(Function)**로 묶어 재사용하는 방법을 배웁니다.
