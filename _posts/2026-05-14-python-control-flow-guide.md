---
layout: post
title: "파이썬 기초: 조건문과 반복문 가이드"
subtitle: "if문, while문, for문 완벽 정리"
tags: [python, 기초, 가이드]
author: min oh
comments: true
---

## 1. if문이 필요한 이유

주어진 조건을 판단한 후 그 상황에 맞게 처리해야 할 경우가 생깁니다. 프로그래밍에서 조건을 판단하여 해당 조건에 맞는 상황을 수행하는 데 쓰는 것이 바로 **if문**입니다.

### 기본 예시
```python
score = int(input('점수를 입력하시오'))

if score >= 60: # 60점 이상이면 합격
    print(str(score) + '점, 합격입니다')
else:    # 60점 미만이면 불합격
    print(str(score) + '점, 불합격입니다')
```

> [!IMPORTANT]
> if 문을 만들 때는 `if 조건문:` 바로 다음 문장부터 if 문에 속하는 모든 문장에 **들여쓰기(indentation)**를 해야 합니다.

### 다중 조건 (and, or)
```python
math = int(input('수학 점수를 입력하시오'))
eng = int(input('영어 점수를 입력하시오'))

if math >= 60 and eng >= 60:
    print(str(math) + '점, ' + str(eng) + '점, 합격입니다')
else:
    print(str(math) + '점, ' + str(eng) + '점, 불합격입니다')
```

---

## 2. 비교 연산자와 논리 연산자

### 비교 연산자
| 연산자 | 설명 |
| :--- | :--- |
| `x < y` | x가 y보다 작다 |
| `x > y` | x가 y보다 크다 |
| `x == y` | x와 y가 같다 |
| `x != y` | x와 y가 같지 않다 |
| `x >= y` | x가 y보다 크거나 같다 |
| `x <= y` | x가 y보다 작거나 같다 |

### 논리 연산자 (and, or, not)
- `x or y`: x와 y 둘 중 하나만 참이어도 참이다.
- `x and y`: x와 y 모두 참이어야 참이다.
- `not x`: x가 거짓이면 참이다.

---

## 3. 파이썬의 특수한 조건문: in, not in

파이썬은 리스트, 튜플, 문자열 내에 특정 요소가 있는지 확인하는 직관적인 문법을 제공합니다.

```python
pocket = ['phone', 'money', 'wallet', 'IDcard']

if 'money' in pocket:
    print('택시를 타세요')
else:
    print('걸어가세요')
```

- `x in 리스트/튜플/문자열`
- `x not in 리스트/튜플/문자열`

---

## 4. 다양한 조건을 판단하는 elif

"주머니에 돈이 있으면 택시를 타고, 돈은 없지만 카드가 있으면 택시를 타고, 둘 다 없으면 걸어가라."와 같이 여러 조건을 순차적으로 판단할 때 사용합니다.

```python
pocket = ['phone', 'money', 'wallet', 'IDcard']

if 'money' in pocket and 'card' in pocket:
    print('아무거나 타세요')
elif 'money' in pocket:
    print('버스를 타세요')
elif 'card' in pocket:
    print('택시를 타세요')
else:
    print('아무것도 없네요. 걸어가세요')
```

---

## 5. while문 (반복문)

조건문이 참인 동안 문장을 반복해서 수행합니다.

### 기본 구조
```python
num = 1
while num <= 5:
    print(num)
    num = num + 1
```

### break와 continue
- **break**: 반복문을 강제로 빠져나갈 때 사용합니다.
- **continue**: 반복문의 처음(조건문)으로 다시 돌아갈 때 사용합니다.

```python
# continue 예시: 5 미만의 숫자는 출력하지 않음
num = 0
while num <= 10:
    num += 1
    if num < 5:
        continue
    print(num)
```

---

## 6. for문 (반복문)

리스트나 튜플, 문자열의 첫 번째 요소부터 마지막 요소까지 차례로 변수에 대입하며 반복합니다.

### 기본 구조
```python
list1 = ['one', 'two', 'three', 'four', 'five']

for i in list1:
    print(i * 2)
```

### range 함수 활용
```python
for i in range(0, 10, 3): # 0부터 9까지 3씩 증가
    print(i)

for i in range(-10, -20, -2): # -10부터 -19까지 2씩 감소
    print(i)
```

### 실전 응용 (합격 판별)
```python
scores = [50, 49, 60, 44, 5]
for s in scores:
    if s >= 50:
        print(str(s) + '점, 합격입니다.')
    else:
        print(str(s) + '점, 불합격입니다.')
```
