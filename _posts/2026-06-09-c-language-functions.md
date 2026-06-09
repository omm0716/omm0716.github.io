---
layout: post
title: "[6강] C언어 함수와 정렬 알고리즘"
subtitle: "함수 정의·호출·전역변수부터 선택 정렬까지 - 코드를 기능 단위로 분리하는 설계 기법"
categories: [C-Language]
tags: [c언어, 함수, function, 선택정렬, 정렬, 전역변수, 2차원배열]
author: min oh
comments: true
date: 2026-06-09 14:00:00 +0900
---

**함수(Function)**는 특정 기능을 수행하는 코드 블록에 이름을 붙인 것입니다. 코드의 재사용성과 가독성을 높이고, 복잡한 프로그램을 작은 단위로 분리해 관리할 수 있게 해줍니다.

---

## 1. 함수 기본 구조

```c
반환형 함수명(매개변수 목록)
{
    // 함수 본체 (실행할 코드)
    return 반환값;   // 반환형이 void이면 생략 가능
}
```

| 구성 요소 | 설명 |
|-----------|------|
| **반환형** | 함수가 돌려줄 값의 자료형 (`int`, `void`, `float` 등) |
| **함수명** | 함수를 호출할 때 사용할 이름 |
| **매개변수** | 함수에 전달할 입력값 (없으면 `void` 또는 비워둠) |
| **return** | 결과값을 호출한 곳으로 돌려줌 |

---

## 2. 사칙연산 함수 만들기

각 연산을 별도의 함수로 분리하여 main에서 호출합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

// 전역 변수로 선언된 함수들 (반환형 생략 - 구형 C 스타일)
void add()
{
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    printf("합(덧셈): %d\n", a + b);
}

void sub()
{
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    printf("차(뺄셈): %d\n", a - b);
}

void mul()
{
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    printf("곱(곱셈): %d\n", a * b);
}

void dev()
{
    int a = 0, b = 0;
    scanf("%d %d", &a, &b);
    printf("몫(나눗셈): %d\n", a / b);
}

int main()
{
    int ch = 0;

    while (ch != 5)
    {
        printf("\n--- 메뉴 ---\n");
        printf("1.덧셈\n2.뺄셈\n3.곱셈\n4.나눗셈\n5.종료\n");
        printf("선택: ");
        scanf("%d", &ch);

        if (ch == 5) {
            printf("프로그램 종료합니다.\n");
            break;
        }

        switch (ch)
        {
        case 1: add(); break;
        case 2: sub(); break;
        case 3: mul(); break;
        case 4: dev(); break;
        default:
            printf("잘못된 입력입니다.\n");
            break;
        }
    }
    return 0;
}
```

**설계 원칙:** 각 연산을 독립적인 함수로 만들면:
- 코드 가독성 향상
- 기능별 수정이 다른 코드에 영향을 주지 않음
- 재사용 가능

---

## 3. 2차원 배열과 성적 순위 (5명)

2차원 배열로 이름과 점수를 함께 관리합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int score[5];
    int count[5] = {0};
    char name[5][20];   // 2차원 문자 배열: 5명의 이름 (최대 20자)

    printf("이름과 점수 입력");

    for (int i = 0; i < 5; i++) {
        scanf("%s", name[i]);      // i번째 학생 이름
        scanf("%d", &score[i]);    // i번째 학생 점수
    }

    // 순위 계산
    for (int i = 0; i < 5; i++) {
        count[i] = 1;              // 초기 순위 = 1
        for (int j = 0; j < 5; j++) {
            if (score[i] < score[j])
                count[i]++;        // 나보다 높은 점수만큼 순위 하락
        }
    }

    // 결과 출력
    for (int i = 0; i < 5; i++) {
        printf("%d등 %s\n", count[i], name[i]);
    }

    return 0;
}
```

---

## 4. 순위 순서대로 출력하기 (정렬 없이)

1등부터 5등 순서로 출력하려면 외부 루프를 순위로 돌립니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int score[5];
    int count[5] = {0};
    char name[5][20];

    for (int i = 0; i < 5; i++) {    // 입력
        printf("이름과 점수 입력");
        scanf("%s", name[i]);
        scanf("%d", &score[i]);
    }

    for (int i = 0; i < 5; i++) {    // 순위 계산
        count[i] = 1;
        for (int j = 0; j < 5; j++) {
            if (score[i] < score[j])
                count[i]++;
        }
    }

    for (int i = 1; i < 6; i++) {    // 1등~5등 순서로 출력
        for (int j = 0; j < 5; j++) {
            if (i == count[j]) {      // i등인 학생을 찾아서 출력
                printf("%s %d등 %d점\n", name[j], count[j], score[j]);
            }
        }
    }

    return 0;
}
```

---

## 5. 선택 정렬 (Selection Sort)

배열을 오름차순으로 정렬하는 가장 직관적인 알고리즘입니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int Num_arr[] = { 6, 7, 8, 2, 4, 5 };
int length    = sizeof(Num_arr) / sizeof(int);

void SelectionSort()
{
    int temp;
    for (int i = 0; i < 5; i++) {
        for (int j = i + 1; j < 6; j++) {
            if (Num_arr[i] > Num_arr[j]) {    // 앞이 더 크면
                temp        = Num_arr[i];
                Num_arr[i]  = Num_arr[j];
                Num_arr[j]  = temp;           // 교환 (swap)
            }
        }
    }

    for (int i = 0; i < 6; i++) {
        printf("%2d", Num_arr[i]);
    }
    printf("\n");
}

int main(void)
{
    printf("Original:");
    for (int i = 0; i < length; i++)
        printf(" %d", Num_arr[i]);
    printf("\n----------------------------------------------\n");

    SelectionSort();   // 정렬 함수 호출
    return 0;
}
```

**선택 정렬 동작 과정 (6 7 8 2 4 5):**
```
[6, 7, 8, 2, 4, 5]  → i=0: 6과 2를 비교 → 교환
[2, 7, 8, 6, 4, 5]  → i=1: 7과 4를 비교 → 교환
[2, 4, 8, 6, 7, 5]  → i=2: 8과 5를 비교 → 교환
[2, 4, 5, 6, 7, 8]  → 정렬 완료!
```

> [!NOTE]
> 선택 정렬의 시간 복잡도는 O(n²)입니다. 원소 수가 많아질수록 느려지지만, 구현이 직관적이어서 학습용으로 많이 사용됩니다.

---

## 6. 전역 변수 vs 지역 변수

```c
int global = 100;   // 전역 변수: 프로그램 전체에서 사용 가능

void func()
{
    int local = 200;    // 지역 변수: 함수 내에서만 사용 가능
    printf("%d\n", global);  // OK: 전역 변수 접근 가능
    printf("%d\n", local);   // OK: 지역 변수 접근 가능
}

int main()
{
    printf("%d\n", global);  // OK
    // printf("%d\n", local);  // ERROR: 지역 변수에 접근 불가
    return 0;
}
```

| 구분 | 선언 위치 | 유효 범위 | 초기화 |
|------|-----------|-----------|--------|
| **전역 변수** | 함수 외부 | 파일 전체 | 자동으로 0 |
| **지역 변수** | 함수 내부 | 해당 함수 내 | 쓰레기값 (초기화 필요) |

---

## 핵심 정리

| 개념 | 내용 |
|------|------|
| **함수 선언** | `반환형 함수명(매개변수) { ... }` |
| **함수 호출** | `함수명(인수);` |
| **void 함수** | 반환값 없음 (return 생략 가능) |
| **2차원 배열** | `char name[행][열]` → 여러 문자열 저장 |
| **선택 정렬** | 이중 for + 교환(swap)으로 오름차순 정렬 |
| **swap** | `temp = a; a = b; b = temp;` 패턴 |

다음 강에서는 **구조체(struct)**로 서로 다른 자료형의 데이터를 하나로 묶어 관리하는 방법을 배웁니다!
