---
layout: post
title: "[5강] 파이썬 함수(Function) 완전 가이드"
subtitle: "def, 매개변수, 반환값, 람다, 데코레이터까지 함수의 모든 것"
categories: [Python]
tags: [python, 기초, 함수, def, lambda, 가이드]
author: min oh
comments: true
---

프로그래밍을 하다 보면 같은 로직을 여러 번 반복해야 하는 상황이 생깁니다. **함수(Function)**는 이런 코드를 하나로 묶어 이름을 붙이고 필요할 때마다 재호출할 수 있게 합니다. 함수를 잘 사용하면 코드가 짧아지고, 읽기 쉬워지고, 유지보수가 쉬워집니다.

---

## 1. 함수란 무엇인가?

```
                ┌─────────────┐
  입력값(인수) → │    함수     │ → 결과값(반환값)
                └─────────────┘
```

수학의 함수 `f(x) = 2x + 1`처럼, 프로그래밍의 함수도 **입력 → 처리 → 출력**의 구조입니다.

---

## 2. 함수 정의와 호출

```python
# def 함수이름(매개변수):
#     실행할 코드
#     return 결과값

def add(a, b):
    result = a + b
    return result

# 호출
print(add(3, 4))   # 7
x = add(10, 20)    # x = 30
```

### 함수의 4가지 형태

```python
# ① 입력 O, 출력 O (가장 일반적)
def multiply(a, b):
    return a * b

# ② 입력 O, 출력 X
def greet(name):
    print(f"안녕하세요, {name}님!")

# ③ 입력 X, 출력 O
def get_pi():
    return 3.14159

# ④ 입력 X, 출력 X
def say_hello():
    print("Hello!")
```

---

## 3. 매개변수 심화

### 3.1 기본값(Default) 매개변수

```python
def greet(name, message="안녕하세요"):
    print(f"{message}, {name}님!")

greet("김민준")              # "안녕하세요, 김민준님!"
greet("이서연", "반갑습니다") # "반갑습니다, 이서연님!"
```

### 3.2 키워드 인수 (순서 무관)

```python
def introduce(name, age, job):
    print(f"이름: {name}, 나이: {age}, 직업: {job}")

# 순서를 지켜 호출
introduce("김민준", 25, "엔지니어")

# 키워드를 명시하면 순서 무관
introduce(age=25, job="엔지니어", name="김민준")
```

### 3.3 가변 인수 (*args)

```python
# *args: 임의 개수의 인수를 튜플로 받음
def total(*args):
    return sum(args)

print(total(1, 2, 3))         # 6
print(total(10, 20, 30, 40))  # 100

# **kwargs: 키워드 인수를 딕셔너리로 받음
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_info(name="김민준", age=25, dept="데이터팀")
```

---

## 4. 반환값 (return)

```python
# 여러 값 반환 (실제로는 튜플 하나 반환)
def stats(data):
    return min(data), max(data), sum(data) / len(data)

lo, hi, avg = stats([3, 1, 4, 1, 5, 9, 2, 6])
print(f"최솟값: {lo}, 최댓값: {hi}, 평균: {avg:.2f}")
```

> [!WARNING]
> `return` 문을 만나는 순간 함수가 즉시 종료됩니다. 이후 코드는 실행되지 않습니다!
> ```python
> def test():
>     return 1  # 여기서 종료
>     return 2  # 절대 실행 안 됨
> ```

---

## 5. 스코프 (변수 범위)

```python
# 전역 변수와 지역 변수
count = 0  # 전역 변수

def increment():
    global count  # 전역 변수 수정하려면 global 선언
    count += 1

increment()
increment()
print(count)  # 2
```

```python
# 지역 변수는 함수 밖에서 접근 불가
def make_secret():
    secret = "비밀번호123"  # 지역 변수
    return secret

# print(secret)  # ❌ NameError!
print(make_secret())  # ✅ 반환값으로만 접근
```

---

## 6. 람다 함수 (Lambda)

간단한 함수를 한 줄로 표현합니다.

```python
# 일반 함수
def square(x):
    return x ** 2

# 람다 함수 (동일한 기능)
square = lambda x: x ** 2

print(square(5))  # 25

# 주요 활용: 정렬 키 지정
students = [
    {'name': '박지호', 'score': 78},
    {'name': '김민준', 'score': 90},
    {'name': '이서연', 'score': 85},
]

# 점수 기준 정렬
sorted_by_score = sorted(students, key=lambda s: s['score'], reverse=True)
for s in sorted_by_score:
    print(f"{s['name']}: {s['score']}점")
```

---

## 7. 고차 함수 (map, filter, reduce)

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map(): 각 요소에 함수 적용
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# filter(): 조건에 맞는 요소만 추출
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)    # [2, 4, 6, 8, 10]

# reduce(): 누적 계산
from functools import reduce
total = reduce(lambda acc, x: acc + x, numbers)
print(total)    # 55 (1+2+...+10)
```

---

## 8. 재귀 함수 (Recursion)

함수 안에서 자기 자신을 호출하는 함수입니다.

```python
# 팩토리얼: n! = n × (n-1)!
def factorial(n):
    if n == 1:  # 기저 조건 (Base Case) - 반드시 필요!
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120 (5×4×3×2×1)

# 피보나치 수열
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(fibonacci(i), end=' ')  # 0 1 1 2 3 5 8 13 21 34
```

> [!CAUTION]
> 재귀 함수는 **기저 조건(종료 조건)**이 없으면 무한 재귀로 `RecursionError`가 발생합니다!

---

## 9. 실전: 유용한 함수 모음

```python
# 성적 처리 함수 모음
def calculate_grade(score):
    """점수를 받아 학점을 반환합니다."""
    grades = {90: 'A', 80: 'B', 70: 'C', 60: 'D'}
    for threshold, grade in grades.items():
        if score >= threshold:
            return grade
    return 'F'

def analyze_scores(score_list):
    """점수 리스트를 분석하여 통계를 반환합니다."""
    return {
        'count': len(score_list),
        'average': sum(score_list) / len(score_list),
        'max': max(score_list),
        'min': min(score_list),
        'pass_rate': sum(1 for s in score_list if s >= 60) / len(score_list) * 100
    }

# 사용
scores = [90, 75, 88, 52, 64, 95, 40, 73]
stats = analyze_scores(scores)

print(f"수강생 수: {stats['count']}명")
print(f"평균: {stats['average']:.1f}점")
print(f"최고: {stats['max']}점, 최저: {stats['min']}점")
print(f"합격률: {stats['pass_rate']:.1f}%")

for score in scores:
    print(f"  {score}점 → {calculate_grade(score)}")
```

---

## 핵심 정리

| 개념 | 키워드 | 역할 |
|------|--------|------|
| 함수 정의 | `def` | 함수 블록 시작 |
| 반환값 | `return` | 결과값 반환 + 함수 종료 |
| 기본값 인수 | `def f(x=10)` | 생략 가능한 매개변수 |
| 가변 인수 | `*args`, `**kwargs` | 임의 개수의 인수 |
| 람다 | `lambda x: x*2` | 한 줄 익명 함수 |
| 전역 변수 | `global` | 함수 내에서 전역 변수 수정 |
| 재귀 | 자기 자신 호출 | 반복 구조의 수학적 표현 |

다음 강에서는 **파일 읽고 쓰기(File I/O)**로 데이터를 영구 저장하는 방법을 배웁니다.
