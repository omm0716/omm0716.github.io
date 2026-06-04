---
layout: post
title: "[2강] 파이썬 기초 실습: 변수·문자열·리스트 문제풀기"
subtitle: "직접 코딩하며 익히는 파이썬 기초 문법 실전 연습"
categories: [Python]
tags: [python, 연습문제, 실습, 기초]
author: min oh
comments: true
---

지난 포스트에서 배운 파이썬 기초 문법을 바탕으로 다양한 실습 문제를 풀어봅시다. **직접 코드를 작성해보는 것이 가장 중요**합니다. 먼저 스스로 풀어보고 정답 코드와 비교해 보세요!

---

## 🟢 변수와 연산자

### 문제 1. 제곱 계산하기
숫자 2개를 입력받아 각각의 제곱을 계산하여 출력하세요.

```python
a = int(input("a의 값을 입력하세요: "))
b = int(input("b의 값을 입력하세요: "))

print(f"a의 제곱: {a ** 2}")
print(f"b의 제곱: {b ** 2}")
```
> **포인트**: `input()`은 항상 문자열을 반환하므로 `int()`로 변환 필수!

---

### 문제 2. 평균 점수 계산하기
국어(80), 영어(75), 수학(55) 점수의 합계와 평균을 구하여 출력하세요.

```python
kor, eng, math = 80, 75, 55
total = kor + eng + math
average = total / 3

print(f"합계: {total}점")
print(f"평균: {average:.1f}점")  # 소수점 1자리
```

---

### 문제 3. 원의 넓이와 둘레 계산기
반지름을 입력받아 원의 넓이(πr²)와 둘레(2πr)를 계산하세요.

```python
import math

r = float(input("반지름을 입력하세요: "))
area = math.pi * r ** 2
circumference = 2 * math.pi * r

print(f"원의 넓이: {area:.2f}")
print(f"원의 둘레: {circumference:.2f}")
```

---

## 🔵 문자열 (String)

### 문제 4. 문자열 슬라이싱 (날짜 분리)
`'20241014sunny'` 텍스트에서 연도, 월, 일, 날씨를 각각 추출하세요.

```python
text = '20241014sunny'

year    = text[0:4]   # '2024'
month   = text[4:6]   # '10'
day     = text[6:8]   # '14'
weather = text[8:]    # 'sunny'

print(f"연도: {year}, 월: {month}, 일: {day}, 날씨: {weather}")
```

---

### 문제 5. 주민등록번호 분리
주민등록번호 `'881120-1068234'`에서 생년월일(앞자리)과 성별 번호를 출력하세요.

```python
id_num = '881120-1068234'

birth   = id_num[:6]   # '881120'
gender  = id_num[7]    # '1' (남성=1,3,5,7 / 여성=2,4,6,8)
back    = id_num[7:]   # '1068234'

print(f"생년월일: {birth}")
print(f"성별 식별 번호: {gender} ({'남성' if gender in '1357' else '여성'})")
```

---

### 문제 6. 문자열 가공 실습

```python
text = 'a:b:c:d'

# 콜론을 샵으로 치환
new_text = text.replace(':', '#')
print(new_text)  # a#b#c#d

# 분리 후 다시 합치기
parts = text.split(':')       # ['a', 'b', 'c', 'd']
joined = '-'.join(parts)      # 'a-b-c-d'
print(joined)

# 대소문자 변환
sentence = "Hello Python World"
print(sentence.upper())       # HELLO PYTHON WORLD
print(sentence.lower())       # hello python world
print(sentence.title())       # Hello Python World (각 단어 첫글자 대문자)
```

---

## 🟣 리스트 (List)

### 문제 7. 리스트 정렬하기
리스트 `[1, 3, 5, 4, 2]`를 오름차순과 내림차순으로 정렬하세요.

```python
a = [1, 3, 5, 4, 2]

# 방법 1: sort() - 원본 변경
a.sort()         # [1, 2, 3, 4, 5]
print(a)
a.sort(reverse=True)  # [5, 4, 3, 2, 1]
print(a)

# 방법 2: sorted() - 원본 유지
original = [1, 3, 5, 4, 2]
sorted_asc  = sorted(original)          # 오름차순
sorted_desc = sorted(original, reverse=True)  # 내림차순
print(original)     # [1, 3, 5, 4, 2] - 변경 없음
print(sorted_asc)   # [1, 2, 3, 4, 5]
```

---

### 문제 8. 리스트 중복 제거
리스트 `[1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5]`에서 중복을 제거하세요.

```python
a = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5]

# 방법 1: set() 사용 (순서 무관)
result = list(set(a))
print(sorted(result))  # [1, 2, 3, 4, 5]

# 방법 2: 순서 유지하며 중복 제거
seen = []
for num in a:
    if num not in seen:
        seen.append(num)
print(seen)  # [1, 2, 3, 4, 5]
```

> [!NOTE]
> `set()`은 순서를 보장하지 않습니다. 원래 순서를 유지하려면 방법 2를 사용하세요.

---

## 🟡 딕셔너리 (Dictionary)

### 문제 9. 딕셔너리 값 접근과 수정

```python
scores = {'A': 90, 'B': 80, 'C': 70}

# 값 접근
print(scores['B'])          # 80
print(scores.get('D', 0))   # 0 (없는 키는 기본값 반환)

# 추가와 수정
scores['D'] = 60      # 새 키 추가
scores['A'] = 95      # 기존 값 수정

# 전체 출력
for name, score in scores.items():
    print(f"{name}학생: {score}점")
```

---

### 문제 10. 단어 빈도수 세기
문자열에서 각 단어가 몇 번 등장하는지 딕셔너리로 집계하세요.

```python
sentence = "I love Python and Python loves me too"
words = sentence.split()

# 딕셔너리로 빈도 집계
freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1

print(freq)
# {'I': 1, 'love': 1, 'Python': 2, 'and': 1, 'loves': 1, 'me': 1, 'too': 1}

# 가장 많이 등장한 단어
most_common = max(freq, key=freq.get)
print(f"가장 많은 단어: '{most_common}' ({freq[most_common]}회)")
```

---

## 💡 응용 실습: 성적 관리 프로그램

```python
# 학생 성적 관리
students = [
    {'name': '김민준', 'scores': [90, 85, 92]},
    {'name': '이서연', 'scores': [78, 88, 95]},
    {'name': '박지호', 'scores': [65, 70, 80]},
]

print("=" * 30)
print(f"{'이름':<8} {'평균':>6} {'등급':>4}")
print("=" * 30)

for student in students:
    avg = sum(student['scores']) / len(student['scores'])
    grade = 'A' if avg >= 90 else 'B' if avg >= 80 else 'C'
    print(f"{student['name']:<8} {avg:>6.1f}점 {grade:>4}")
```

---

## 핵심 포인트 정리

| 자료형 | 주요 실수 | 해결책 |
|--------|-----------|--------|
| `int`/`float` | `input()`이 문자열로 옴 | `int(input(...))` |
| `str` | 인덱스는 0부터 시작 | `text[0]` = 첫 문자 |
| `list` | `sort()`는 원본 변경 | 원본 보존엔 `sorted()` |
| `dict` | 없는 키 접근 시 오류 | `.get(key, 기본값)` |

다음 강에서는 **조건문(if)과 반복문(for/while)**으로 프로그램의 흐름을 제어하는 방법을 배워봅니다.
