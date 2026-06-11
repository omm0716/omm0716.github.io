---
layout: post
title: "[4강] C언어 반복문 심화: while + 누산기 + 실전 문제"
subtitle: "판매 집계, 무게 검수, 불량률 계산 - while문과 break를 활용한 실전 패턴"
categories: [C-Language]
tags: [c언어, while, 누산기, break, 실전, 반복문심화]
author: min oh
comments: true
date: 2026-06-09 12:00:00 +0900
---

이번 강에서는 `while(1)`과 `break`를 조합한 **누산기 패턴**을 실전 문제로 집중 연습합니다. 실무에서 자주 등장하는 데이터 입력 → 조건 판별 → 누적 계산의 흐름을 익혀봅니다.

---

## 1. 누산기 패턴 (Accumulator Pattern)

```c
while (1) {
    // 1. 데이터 입력
    // 2. 종료 조건 확인 (break)
    // 3. 조건 처리 및 누적
    // 4. 출력
}
```

이 패턴은:
- 종료 시점을 미리 알 수 없을 때
- 특정 값이 입력될 때까지 계속 받아야 할 때
- 입력 데이터를 계속 누적해야 할 때

주로 사용됩니다.

---

## 2. 판매 집계 시스템

매장 별 입장 인원과 판매액을 입력받아 합산합니다. 인원이 0이 되면 종료합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int person      = 0;
    int pay         = 0;
    int totalperson = 0;
    int totalpay    = 0;

    while (1) {
        scanf("%d", &person);
        scanf("%d", &pay);

        printf("%d 명의 판매액: ", person);
        printf("%d 원\n", pay);

        totalperson += person;
        totalpay    += pay;

        if (person == 0) {
            printf("판매 집계 종료\n");
            break;
        }
    }

    printf("총 %d명 총 %d원", totalperson, totalpay);
    return 0;
}
```

**핵심 포인트:** 0 입력 시 `break`로 탈출하되, `break` 전에 누적 집계는 이미 완료됩니다.

---

## 3. 돼지 무게 검수 (범위 조건)

무게가 60kg~80kg인 돼지만 합격 처리하고, 총 무게가 5000kg을 초과하면 종료합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int pignum   = 500;   // 목표 돼지 수
    int pig      = 0;     // 합격 돼지 수
    int totalwei = 5000;  // 목표 총 무게
    int pigwei   = 0;     // 입력 무게
    int countwei = 0;     // 누적 무게

    printf("돼지 무게를 입력하세요\n");

    while (1)
    {
        scanf("%d", &pigwei);

        if (pigwei >= 60 && pigwei <= 80)  // 합격 범위: 60~80kg
        {
            printf("합격\n");
            printf("%dkg 돼지 한 마리 추가\n", pigwei);
            pig      += 1;
            countwei += pigwei;
            printf("%d마리\n", pig);
            printf("누적 무게: %dkg\n", countwei);
        }
        else {
            printf("불합격\n");
        }

        if (countwei >= totalwei)   // 목표 달성 시 종료
            break;
    }

    printf("총 %d마리\n총 %dkg", pig, countwei);
    return 0;
}
```

**조건 분기 구조:**
```
무게 입력
├── 60~80kg → 합격: pig++, countwei 누적
└── 그 외 → 불합격
↓
countwei >= 5000 → break (종료)
```

---

## 4. 돼지 무게 검수 v2 (이중 while)

같은 문제를 중첩 `while`로 구현하는 방법입니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int pig      = 0;
    int wei      = 1;
    int totalwei = 0;

    while (totalwei <= 5000 && wei != 0)
    {
        printf("무게를 입력\n");
        scanf("%d", &wei);

        while (wei >= 60 && wei <= 80)   // 범위 조건을 while로 처리
        {
            pig++;
            totalwei += wei;
            break;    // 내부 while 탈출
        }
    }

    printf("%d마리\n%dkg", pig, totalwei);
    return 0;
}
```

> [!NOTE]
> 내부 `while`은 사실상 조건 확인 후 한 번만 실행됩니다. 이 경우 `if`와 동일하게 동작합니다. 실제로는 `if`를 사용하는 것이 더 명확합니다.

---

## 5. 사과 불량률 계산

기준 무게(195~205g)에서 벗어난 사과의 불량률을 계산합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int apple      = 0;   // 총 사과 수
    int errorapple = 0;   // 불량 사과 수
    int applewei   = 0;   // 사과 무게

    while (1)
    {
        printf("사과 무게를 입력합니다.\n");
        scanf("%d", &applewei);

        if (applewei == 0)   // 0 입력 시 종료
            break;

        apple++;   // 총 사과 수 증가

        if (applewei <= 195 || applewei >= 205)   // 불량 조건
        {
            printf("%d번 사과 불량\n", apple);
            errorapple++;
        }
    }

    int total = 100 * errorapple / apple;   // 불량률(%)
    printf("불량률: %d%%", total);

    return 0;
}
```

**수식 분석:**
- `100 * errorapple / apple` → 불량률(%) 정수 계산
- `%d%%` → `%`를 출력하려면 `%%`로 작성 (이스케이프)

---

## 6. while문 종료 패턴 비교

| 패턴 | 코드 | 특징 |
|------|------|------|
| **0 입력 종료** | `if (x == 0) break;` | 특정 값을 종료 신호로 사용 |
| **누적 합 종료** | `if (total >= limit) break;` | 목표 달성 시 종료 |
| **외부 조건 종료** | `while (total <= 5000 && x != 0)` | 반복 조건을 while에 직접 명시 |

---

## 핵심 정리

```c
// 누산기 패턴 템플릿
int count = 0;
int total = 0;

while (1) {
    int input;
    scanf("%d", &input);

    if (input == 0) break;      // 종료 신호

    if (input >= MIN && input <= MAX) {   // 범위 조건
        count++;
        total += input;
    }

    if (total >= LIMIT) break;  // 목표 달성 종료
}

printf("개수: %d, 합계: %d", count, total);
```

다음 강에서는 **배열(Array)**로 여러 데이터를 한꺼번에 처리하는 방법을 배웁니다!
