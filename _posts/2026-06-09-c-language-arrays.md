---
layout: post
title: "[5강] C언어 배열과 문자열"
subtitle: "배열 선언부터 최대값 탐색·순위 계산·문자 배열까지 - 다수의 데이터를 다루는 핵심 기술"
categories: [C-Language]
tags: [c언어, 배열, 문자열, array, char, 최대값, 순위]
author: min oh
comments: true
date: 2026-06-09 13:00:00 +0900
---

변수는 하나의 값만 저장할 수 있지만, **배열(Array)**을 사용하면 같은 자료형의 여러 값을 연속된 메모리에 저장하고 인덱스로 접근할 수 있습니다. C언어에서 배열과 문자열을 자유자재로 다루는 방법을 알아봅니다.

---

## 1. 배열 기초

```c
자료형 배열명[크기];           // 선언 (자동 초기화 안 됨!)
자료형 배열명[크기] = {값1, 값2, ...};  // 선언과 동시에 초기화
자료형 배열명[크기] = {0};    // 전체를 0으로 초기화
```

```c
int n[9] = { 3, 6, 4, 2, 8, 4, 9, 1, 7 };
//           [0][1][2][3][4][5][6][7][8]
//                                 ↑ 인덱스는 0부터 시작!

printf("%d", n[0]);   // 3 (첫 번째 원소)
printf("%d", n[8]);   // 7 (마지막 원소)
```

> [!IMPORTANT]
> 배열의 크기가 `n`이면 유효한 인덱스는 `0` ~ `n-1`입니다. `n[n]`은 범위를 벗어나 **정의되지 않은 동작(Undefined Behavior)**이 발생합니다!

---

## 2. 배열 입출력

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int arr[5];

    // 배열에 5개 값 입력
    for (int i = 0; i < 5; i++) {
        scanf("%d", &arr[i]);   // &arr[i] : i번째 원소의 주소
    }

    // 배열 내용 출력
    for (int i = 0; i < 5; i++) {
        printf("%d", arr[i]);
    }

    return 0;
}
```

---

## 3. 배열에서 최대값 찾기

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int max = 0;
    int n[9] = { 3, 6, 4, 2, 8, 4, 9, 1, 7 };

    // sizeof(n) / sizeof(n[0]) : 배열의 원소 개수 (9)
    for (int i = 0; i < sizeof(n) / sizeof(n[0]); i++) {
        if (max < n[i])
            max = n[i];   // 현재까지의 최대값 갱신
    }

    printf("%d", max);   // 출력: 9
    return 0;
}
```

> [!TIP]
> `sizeof(n) / sizeof(n[0])` 패턴은 배열의 원소 개수를 자동으로 계산합니다. 배열 크기가 바뀌어도 코드 수정이 필요 없어 유용합니다.

---

## 4. 배열에서 특정 값 검색

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int index = 0;   // 찾았는지 여부 (플래그)
    int num;
    int n[] = { 3, 6, 5, 2, 7, 4, 8, 9, 1, 7 };

    scanf("%d", &num);   // 찾을 값 입력

    for (int i = 0; i < sizeof(n) / sizeof(n[0]); i++) {
        if (num == n[i]) {
            num   = i;     // 인덱스로 덮어씀
            index = 1;     // 찾았음을 표시
        }
    }

    printf("%d", num);
    if (index == 0)
        printf("없음");   // 못 찾았을 때

    return 0;
}
```

---

## 5. 배열 값 비교 (내 값보다 큰 원소 개수)

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int count = 0;
    int a     = 0;
    int num[] = { 3, 2, 4, 2, 3, 2, 9, 5, 7 };

    scanf("%d", &a);   // 기준 값 입력

    for (int i = 0; i < 9; i++) {
        if (a < num[i])   // a보다 큰 원소 개수 카운트
            count++;
    }

    printf("%d", count);
    return 0;
}
```

---

## 6. 배열로 성적 순위 구하기 (이중 for문)

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    int rank;
    int score[] = { 30, 60, 40, 20, 80, 40, 90, 10, 70 };

    printf("- 순위표 -\n");

    for (int i = 0; i < 9; i++) {
        rank = 1;   // 모든 학생의 초기 순위 = 1등

        for (int j = 0; j < 9; j++) {
            if (score[i] < score[j])   // 나보다 높은 점수가 있으면
                rank++;                 // 내 순위 하락
        }

        printf("%d점 %d등\n", score[i], rank);
    }

    return 0;
}
```

**알고리즘 설명:**
- 외부 루프 `i`: 현재 순위를 계산할 학생
- 내부 루프 `j`: 나머지 모든 학생과 비교
- `score[i] < score[j]`인 경우마다 `rank++` → 나보다 점수 높은 사람 수 = 내 순위 - 1

---

## 7. 문자 배열(char array)과 문자열

C언어에는 별도의 `string` 타입이 없습니다. 문자 배열(`char []`)로 문자열을 표현합니다.

### 7.1 문자 배열 기초

```c
char name[] = { "kda" };    // 문자열 리터럴로 초기화
printf("%s", name);         // 출력: kda

char name2[4];              // 크기 4 배열 (문자 3개 + 널 문자 '\0')
scanf("%s", name2);         // 문자열 입력 (& 안 붙임!)
printf("%s", name2);
```

> [!IMPORTANT]
> 문자 배열에서 `scanf`로 입력할 때는 `&`를 붙이지 않습니다! 배열명 자체가 주소를 의미합니다.

### 7.2 문자 배열 순회 (인덱스 + 아스키 코드)

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    char str[] = "C programming for the first time";
    int slen = sizeof(str) / sizeof(str[0]) - 1;   // 문자열 길이 (널 문자 제외)

    for (int i = 0; i < slen; i++) {
        printf("%c %d\n", str[i], i);   // 문자와 인덱스 출력
    }

    return 0;
}
```

**출력 일부:**
```
C 0
  1
p 2
r 3
...
```

### 7.3 문자열 이름 입출력

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
    char name[16];
    scanf("%s", name);              // 문자열 입력
    printf("당신의 이름 \"%s\" 입니다.", name);
    return 0;
}
```

---

## 8. 배열 크기 계산법 정리

| 상황 | 코드 | 결과 |
|------|------|------|
| 정수 배열 원소 수 | `sizeof(arr) / sizeof(arr[0])` | 전체 byte / 원소 byte |
| 문자열 길이 | `sizeof(str) / sizeof(str[0]) - 1` | 총 문자 수 (널 문자 제외) |

---

## 핵심 정리

| 개념 | 코드 예시 |
|------|-----------|
| **배열 선언** | `int n[5] = {1, 2, 3, 4, 5};` |
| **원소 접근** | `n[0]`, `n[4]` (0번부터 N-1번) |
| **배열 입출력** | `scanf("%d", &arr[i]);` |
| **원소 수 계산** | `sizeof(arr) / sizeof(arr[0])` |
| **문자 배열** | `char name[20];` + `scanf("%s", name);` |
| **최대값 탐색** | max 초기화 후 전체 순회하며 비교 |
| **순위 계산** | 이중 for문으로 나보다 높은 점수 카운트 |

다음 강에서는 **함수(Function)**를 통해 코드를 기능별로 분리하고 재사용하는 방법을 배웁니다!
