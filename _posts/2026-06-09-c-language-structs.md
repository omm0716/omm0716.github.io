---
layout: post
title: "[7강] C언어 구조체(struct)와 복합 정렬"
subtitle: "다른 자료형을 하나로 묶는 struct - 학생 성적 관리 시스템 완성하기"
categories: [C-Language]
tags: [c언어, 구조체, struct, 버블정렬, 복합정렬, 문자열, strcpy]
author: min oh
comments: true
date: 2026-06-09 15:00:00 +0900
---

지금까지는 이름(char), 점수(int) 등 서로 다른 자료형의 데이터를 별개의 배열로 관리했습니다. **구조체(struct)**를 사용하면 관련된 데이터를 **하나의 단위**로 묶어서 훨씬 깔끔하게 관리할 수 있습니다.

---

## 1. 구조체(struct) 기본

```c
// 구조체 정의 (새로운 자료형 선언)
typedef struct 구조체명 {
    자료형 멤버1;
    자료형 멤버2;
    // ...
} 별칭;
```

```c
// 구조체 선언 후 사용
struct 구조체명 변수명;          // 구조체 변수 생성
변수명.멤버명 = 값;             // 멤버 접근 (점 연산자 .)
```

---

## 2. 학생 구조체 정의

```c
#include <string.h>  // strcpy 사용에 필요

typedef struct student {
    char name[15];    // 이름 (최대 14자 + 널 문자)
    int  score[3];    // 점수 배열: [0]=과목1, [1]=과목2, [2]=합계
};
```

---

## 3. 구조체 배열과 데이터 입력

5명의 학생 데이터를 구조체 배열로 관리합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

typedef struct student {
    char name[15];
    int  score[3];   // score[0]: 과목1, score[1]: 과목2, score[2]: 합계
};

void main()
{
    struct student Student[5], temp;   // 구조체 배열 5명 + 임시 변수

    // 데이터 입력
    for (int i = 0; i < 5; i++) {
        scanf("%s %d %d",
              Student[i].name,          // 이름 (& 불필요)
              &Student[i].score[0],     // 과목1 점수
              &Student[i].score[1]);    // 과목2 점수

        // 합계 자동 계산
        Student[i].score[2] = Student[i].score[0] + Student[i].score[1];
    }

    // 결과 출력
    for (int i = 0; i < 5; i++) {
        printf("%s %d %d %3d\n",
               Student[i].name,
               Student[i].score[0],
               Student[i].score[1],
               Student[i].score[2]);
    }
}
```

**입력 형식:** `이름 과목1점수 과목2점수`
```
홍길동 85 90
김철수 70 80
...
```

---

## 4. 구조체 배열 정렬 (선택 정렬 응용)

구조체 배열은 단순 `swap`이 아니라 **구조체 단위로 통째로 교환**합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

typedef struct student {
    char name[15];
    int  score[3];
};

void main()
{
    struct student Student[5], temp;
    int index = 0;

    // 입력
    for (int i = 0; i < 5; i++) {
        scanf("%s %d %d",
              Student[i].name,
              &Student[i].score[0],
              &Student[i].score[1]);
        Student[i].score[2] = Student[i].score[0] + Student[i].score[1];
    }

    // 선택 정렬 (합계 내림차순)
    for (int i = 0; i < 4; i++) {
        index = i;
        for (int j = i + 1; j < 5; j++) {
            if (Student[index].score[2] < Student[j].score[2])
                index = j;    // 합계가 더 큰 학생의 인덱스 기록
        }
        // 구조체 통째로 교환
        temp           = Student[index];
        Student[index] = Student[i];
        Student[i]     = temp;
    }

    // 2등부터 출력 (1등 제외)
    for (int i = 1; i < 5; i++) {
        printf("%s %d %d %3d\n",
               Student[i].name,
               Student[i].score[0],
               Student[i].score[1],
               Student[i].score[2]);
    }
}
```

> [!TIP]
> 구조체 변수는 `temp = Student[i];` 처럼 **전체 복사**가 가능합니다. 단, 문자 배열(char[])은 `=`로 직접 복사가 되지 않으므로 구조체 멤버로 들어있을 때는 구조체 단위 복사를 활용합니다.

---

## 5. 버블 정렬로 문자열 포함 데이터 정렬

이름, 과목1, 과목2, 합계를 함께 관리하며 합계 기준으로 내림차순 정렬합니다.

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>

int main(void)
{
    char name[5][20] = {0};
    int  score1[5]   = {0};
    int  score2[5]   = {0};
    int  sum[5]      = {0};

    char temp_name[20];
    int  temp_score1, temp_score2, temp_sum;

    // 5명 입력
    for (int i = 0; i < 5; i++) {
        printf("[%d번째 학생] 이름 입력: ", i + 1);
        scanf("%s", name[i]);

        printf("과목1 과목2 입력: ");
        scanf("%d %d", &score1[i], &score2[i]);

        sum[i] = score1[i] + score2[i];   // 합계 계산
        printf("\n");
    }

    // 버블 정렬 (합계 내림차순)
    for (int i = 0; i < 4; i++) {
        for (int j = i + 1; j < 5; j++) {
            if (sum[i] < sum[j]) {

                // 합계 교환
                temp_sum = sum[i];
                sum[i]   = sum[j];
                sum[j]   = temp_sum;

                // 과목1 교환
                temp_score1  = score1[i];
                score1[i]    = score1[j];
                score1[j]    = temp_score1;

                // 과목2 교환
                temp_score2  = score2[i];
                score2[i]    = score2[j];
                score2[j]    = temp_score2;

                // 이름 교환 (문자열은 strcpy 사용!)
                strcpy(temp_name, name[i]);
                strcpy(name[i],   name[j]);
                strcpy(name[j],   temp_name);
            }
        }
    }

    // 정렬 결과 출력
    for (int i = 0; i < 5; i++) {
        printf("%s\t%d\t%d\t%d\n", name[i], score1[i], score2[i], sum[i]);
    }

    return 0;
}
```

> [!IMPORTANT]
> 문자 배열(char[])은 `=` 연산자로 복사할 수 없습니다. 반드시 `strcpy(목적지, 원본)` 함수를 사용해야 합니다. `string.h` 헤더가 필요합니다.

---

## 6. 구조체 vs 병렬 배열 비교

| 방식 | 코드 예시 | 장점 | 단점 |
|------|-----------|------|------|
| **병렬 배열** | `name[5]`, `score1[5]`, `score2[5]` | 간단 | 관련 데이터 분산, 정렬 시 모든 배열 동시 교환 |
| **구조체 배열** | `Student[5].name`, `Student[5].score` | 데이터 응집, 구조체 단위 교환으로 단순 | 정의가 필요 |

---

## 7. string.h 주요 함수

| 함수 | 기능 | 예시 |
|------|------|------|
| `strcpy(dst, src)` | 문자열 복사 | `strcpy(name, "홍길동")` |
| `strlen(str)` | 문자열 길이 반환 | `strlen("hello")` → 5 |
| `strcmp(s1, s2)` | 문자열 비교 (같으면 0) | `strcmp(a, b)` |
| `strcat(dst, src)` | 문자열 연결 | `strcat(name, "씨")` |

---

## 핵심 정리

| 개념 | 내용 |
|------|------|
| **struct 정의** | `typedef struct { 멤버들 } 이름;` |
| **멤버 접근** | `변수명.멤버명` |
| **구조체 복사** | `s1 = s2;` (전체 복사 가능) |
| **문자열 복사** | `strcpy(dst, src)` — `=` 연산자 사용 불가 |
| **구조체 정렬** | `temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;` |
| **버블 정렬** | 인접한 원소를 비교·교환하며 정렬 (O(n²)) |

---

## 시리즈 전체 요약

| 강좌 | 주제 |
|------|------|
| 1강 | 변수, 자료형, printf/scanf, 산술 연산 |
| 2강 | if-else, 삼항 연산자, switch, 논리 연산 |
| 3강 | for문, while문, 홀수·구구단·합계 |
| 4강 | while 심화, 누산기 패턴, break 활용 |
| 5강 | 배열, 최대값·검색·순위, char 배열 |
| 6강 | 함수, 2차원 배열, 선택 정렬, 전역/지역 변수 |
| **7강** | **구조체, strcpy, 버블 정렬, 복합 데이터 관리** |

C언어 기초 시리즈를 완주하셨습니다! 🎉 이제 포인터(Pointer)와 동적 메모리 할당으로 나아가 보세요.
