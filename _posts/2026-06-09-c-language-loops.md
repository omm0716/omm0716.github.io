---
layout: post
title: "[3강] C언어 반복문: for, while"
subtitle: "for문과 while문으로 반복 처리 마스터하기 - 홀수, 구구단, 합계 실습"
categories: [C-Language]
tags: [c언어, 반복문, for, while, 루프, 구구단]
author: min oh
comments: true
date: 2026-06-09 11:00:00 +0900
---

반복문은 같은 코드를 여러 번 실행할 때 사용합니다. C언어의 두 가지 핵심 반복문 `for`와 `while`을 다양한 실습 예제로 익혀봅니다.

---

## 1. for 문

횟수가 **정해진 반복**에 적합합니다.

```c
for (초기식; 조건식; 증감식) {
    // 조건식이 참인 동안 반복 실행
}
```

| 부분 | 역할 | 예시 |
|------|------|------|
| 초기식 | 반복 변수 초기화 (처음 한 번만) | `int i = 0` |
| 조건식 | 이 조건이 참인 동안 반복 | `i < 5` |
| 증감식 | 매 반복 후 실행 | `i++` |

### 기본 예제: 50~100 사이 3의 배수 개수

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int count = 0;

    for (int i = 50; i <= 100; i += 1) {
        if (!(i % 3)) {   // i % 3 == 0 과 동일: 3의 배수
            count++;
        }
    }

    printf("%d", count);   // 출력: 17
    return 0;
}
```

> [!TIP]
> `!(i % 3)`은 `i % 3 == 0`과 동일합니다. `i % 3`이 0이면 `!0`은 1(참)이 됩니다.

---

## 2. 홀수 출력 (for + if)

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int a;
    for (int i = 0; i < 5; i++) {
        scanf("%d", &a);
        if (a % 2 == 1)         // 홀수 판별
            printf("홀수: %d\n", a);
    }
    return 0;
}
```

---

## 3. 홀수·짝수 개수 세기

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int a;
    int count_odd  = 0;  // 홀수 개수
    int count_even = 0;  // 짝수 개수

    for (int i = 0; i < 5; i++) {
        scanf("%d", &a);
        if (a % 2) {    // 홀수
            count_odd++;
        } else {        // 짝수
            count_even++;
        }
    }

    printf("홀수: %d\n짝수: %d", count_odd, count_even);
    return 0;
}
```

---

## 4. 구간 합 계산

n부터 m까지의 합을 구합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int n, m;
    int a = 0;

    scanf("%d %d", &n, &m);   // 예: 1 100 → 1~100 합

    for (; m <= n; m++)       // m부터 n까지 증가하며 합산
        a += m;

    printf("%d", a);
    return 0;
}
```

**실행 예시:**
- 입력: `100 1` (n=100, m=1) → 출력: `5050`

---

## 5. 구구단 출력

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);   // 출력할 단 입력

    for (int i = 1; i < 10; i++) {
        int m = i * n;
        printf("%d\n", m);   // n단 출력
    }
    return 0;
}
```

**실행 예시 (n=3):**
```
3
6
9
12
...
27
```

---

## 6. 합계와 평균 계산

10개의 숫자를 입력받아 합과 평균을 계산합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int a;
    int sum = 0;
    int avg;

    for (int i = 0; i <= 10; i++) {
        scanf("%d", &a);
        sum += a;
    }

    printf("합계 결과: %d\n", sum);
    avg = sum / 10 / 100 * 100;   // 백의 자리에서 버림
    printf("평균: %d", avg);

    return 0;
}
```

> [!NOTE]
> `sum / 10 / 100 * 100` 연산은 정수 나눗셈을 이용해 소수점과 10의 자리를 버리는 방법입니다. 예를 들어 `sum=4567`이면 `456 / 100 * 100 = 400`이 됩니다.

---

## 7. while 문

조건이 **언제 끝날지 모를 때** 또는 **무한 루프**에 적합합니다.

```c
while (조건식) {
    // 조건식이 참인 동안 반복
}
```

```c
while (1) {        // 항상 참 → 무한 루프
    // ...
    if (종료 조건)
        break;     // break로 탈출
}
```

### do-while 문

조건 확인 전에 **무조건 한 번 실행**하고 싶을 때 사용합니다.

```c
do {
    // 먼저 실행
} while (조건식);   // 그 다음 조건 확인
```

---

## 8. 변수 교환 (Large/Small 판별)

두 수를 입력받아 큰 값을 Large, 작은 값을 Small에 저장합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int Large = 0;
    int Small = 0;
    int temp  = 0;

    scanf("%d %d", &Large, &Small);

    // Large가 Small보다 작으면 교환
    while (Large < Small)
    {
        temp  = Small;
        Small = Large;
        Large = temp;
        break;   // 한 번만 교환하면 됨
    }

    printf("Large = %d\nSmall = %d", Large, Small);
    return 0;
}
```

> [!TIP]
> 두 변수의 값을 교환할 때는 **임시 변수(temp)**를 사용합니다. `temp = A; A = B; B = temp;` 패턴을 기억하세요!

---

## 핵심 정리

| 반복문 | 특징 | 사용 상황 |
|--------|------|-----------|
| `for` | 초기식·조건·증감 한 줄로 | 반복 횟수가 정해진 경우 |
| `while` | 조건만 명시 | 반복 횟수 불명확, 무한 루프 |
| `do-while` | 먼저 실행 후 조건 확인 | 최소 1회 실행 보장 |
| `break` | 반복문 즉시 탈출 | 특정 조건에서 루프 종료 |
| `continue` | 현재 반복 건너뜀 | 특정 조건은 건너뛰고 계속 |

다음 강에서는 **while문과 복합 조건**을 활용한 심화 실습 문제들을 풀어봅니다!
