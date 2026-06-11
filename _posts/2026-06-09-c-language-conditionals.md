---
layout: post
title: "[2강] C언어 조건문: if, 삼항 연산자, switch"
subtitle: "조건에 따라 다른 결과를 출력하는 분기 처리 완전 가이드"
categories: [C-Language]
tags: [c언어, 조건문, if, switch, 삼항연산자, 분기]
author: min oh
comments: true
date: 2026-06-09 10:00:00 +0900
---

프로그램이 단순히 계산만 하는 것이 아니라 **상황에 따라 다른 행동을 선택**하게 만들려면 조건문이 필요합니다. C언어의 조건문 구조를 실습 예제로 익혀봅니다.

---

## 1. if / else if / else 문

가장 기본적인 조건 분기 구조입니다.

```c
if (조건식) {
    // 조건이 참(true)일 때 실행
} else if (다른 조건식) {
    // 첫 조건이 거짓이고 이 조건이 참일 때 실행
} else {
    // 모든 조건이 거짓일 때 실행
}
```

### 실습: 나이에 따른 분류

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int age;
    scanf("%d", &age);

    if (age <= 18) {
        printf("미성년자");
    } else {
        printf("성인");
    }

    return 0;
}
```

**실행 예시:**
- 입력: `16` → 출력: `미성년자`
- 입력: `20` → 출력: `성인`

---

## 2. 삼항 연산자 (Ternary Operator)

`if-else`를 한 줄로 축약할 수 있는 표현식입니다.

```
조건식 ? 참일 때 값 : 거짓일 때 값
```

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int age;
    scanf("%d", &age);

    // if-else 와 동일한 동작
    printf("%s", age <= 18 ? "미성년자" : "성인");

    return 0;
}
```

> [!TIP]
> 삼항 연산자는 간단한 조건 분기에 유용합니다. 복잡한 로직은 일반 `if-else`를 사용하는 것이 가독성이 좋습니다.

---

## 3. 다중 조건: 네 변수 비교

여러 변수를 비교할 때는 `&&`(AND), `||`(OR) 연산자를 활용합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int a, b, c, d;
    scanf("%d %d %d %d", &a, &b, &c, &d);

    // a가 b, c 모두와 다를 때
    if (a != b && a != c) {
        printf("a가 나머지와 다름");
    } else if (b != a) {
        printf("b가 나머지와 다름");
    } else if (c != b) {
        printf("c가 나머지와 다름");
    } else {
        printf("d가 나머지와 다름");
    }

    return 0;
}
```

### 논리 연산자 정리

| 연산자 | 의미 | 예시 |
|--------|------|------|
| `&&` | AND (둘 다 참이어야 참) | `a > 0 && b > 0` |
| `\|\|` | OR (하나라도 참이면 참) | `a == 0 \|\| b == 0` |
| `!` | NOT (참↔거짓 반전) | `!(a == 0)` |

### 비교 연산자 정리

| 연산자 | 의미 |
|--------|------|
| `==` | 같다 |
| `!=` | 다르다 |
| `>` | 크다 |
| `<` | 작다 |
| `>=` | 크거나 같다 |
| `<=` | 작거나 같다 |

> [!IMPORTANT]
> 대입(`=`)과 비교(`==`)를 혼동하지 않도록 주의하세요! `if (a = 5)`는 a에 5를 대입하는 코드로, 의도한 비교가 아닙니다.

---

## 4. switch 문

정수나 문자를 기준으로 여러 경우를 처리할 때 사용합니다.

```c
switch (변수 또는 식) {
    case 값1:
        // 값1일 때 실행
        break;        // 반드시 break로 탈출!
    case 값2:
        // 값2일 때 실행
        break;
    default:
        // 모든 case에 해당 없을 때
        break;
}
```

### 실습: 나이 그룹 분류 (switch + fall-through)

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int age = 1;  // 0이 입력될 때까지 반복 (다음 강 반복문과 연계)
    int a = 0, b = 0, c = 0, d = 0;

    for (; age != 0; )
    {
        scanf("%d", &age);

        switch (age / 10)  // 10으로 나눈 몫으로 연령대 결정
        {
        case 0:
        case 1:
        case 2:
            a++;   // 0~29세
            break;
        case 3:
        case 4:
            b++;   // 30~49세
            // break 없음 → fall-through로 c도 증가!
        case 5:
            c++;   // 50~59세 (30~49도 여기 포함됨)
            break;
        default:
            d++;   // 60세 이상
        }
    }

    printf("0~29세: %d\n", --a);   // 0 입력 카운트 제외
    printf("30~49세: %d\n", b);
    printf("50~59세: %d\n", c);
    printf("60이상: %d\n", d);

    return 0;
}
```

> [!WARNING]
> `switch`에서 `break`를 빠뜨리면 다음 `case`로 **fall-through**(연속 실행)됩니다. 이는 의도적으로 활용할 수도 있지만, 실수로 빠뜨리면 버그가 됩니다.

---

## 5. switch를 활용한 계산기 메뉴

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int ch = 0;

    while (ch != 5)  // 5번 종료 선택 전까지 반복 (반복문은 다음 강에서!)
    {
        printf("\n--- 메뉴 ---\n");
        printf("1.덧셈\n2.뺄셈\n3.곱셈\n4.나눗셈\n5.종료\n");
        printf("선택: ");
        scanf("%d", &ch);

        if (ch == 5) {
            printf("프로그램 종료합니다.\n");
            break;
        }

        int a = 0, b = 0;
        scanf("%d %d", &a, &b);  // 피연산자 입력

        switch (ch)
        {
        case 1:
            printf("합(덧셈): %d\n", a + b);
            break;
        case 2:
            printf("차(뺄셈): %d\n", a - b);
            break;
        case 3:
            printf("곱(곱셈): %d\n", a * b);
            break;
        case 4:
            printf("몫(나눗셈): %d\n", a / b);
            break;
        default:
            printf("잘못된 입력입니다.\n");
            break;
        }
    }

    return 0;
}
```

**실행 흐름:**
1. 메뉴 출력 → 번호 선택
2. 두 수 입력 → 해당 연산 결과 출력
3. 5 입력 시 종료

---

## 핵심 정리

| 구조 | 사용 상황 |
|------|-----------|
| `if-else` | 범위 조건, 복잡한 논리식 |
| `삼항 연산자` | 간단한 2지 선택 (코드 단축) |
| `switch` | 특정 정수/문자 값에 따른 다중 분기 |

다음 강에서는 **반복문(for, while)**으로 같은 코드를 여러 번 반복 실행하는 방법을 배웁니다!
