---
layout: post
title: "[C#] 2강 - 조건문: if, else if, switch"
subtitle: "if-else와 switch 문으로 조건에 따라 다른 코드를 실행합니다."
date: 2026-06-10 10:00:00 +0900
categories: [C-Sharp]
tags: [C#, 조건문, if, else, switch, ConsoleKeyInfo]
---

## 목차
1. [if / else](#1-if--else)
2. [else if 체인](#2-else-if-체인)
3. [실습: 학점 분류기](#3-실습-학점-분류기)
4. [switch 문](#4-switch-문)
5. [ConsoleKeyInfo와 방향키 입력](#5-consolekeyinfo와-방향키-입력)
6. [중첩 switch: 계절 분류기](#6-중첩-switch-계절-분류기)
7. [정리](#7-정리)

---

## 1. if / else

가장 기본적인 조건 분기입니다.

```csharp
int input = int.Parse(Console.ReadLine());

if (input % 2 == 0)
{
    Console.WriteLine("짝수입니다.");
}
else
{
    Console.WriteLine("홀수입니다.");
}
```

**조건 연산자 정리:**

| 연산자 | 의미 | 예시 |
|--------|------|------|
| `==` | 같다 | `a == 0` |
| `!=` | 다르다 | `a != 0` |
| `>` | 크다 | `a > 10` |
| `<` | 작다 | `a < 10` |
| `>=` | 크거나 같다 | `a >= 10` |
| `<=` | 작거나 같다 | `a <= 10` |
| `&&` | AND (그리고) | `a > 0 && a < 10` |
| `\|\|` | OR (또는) | `a == 0 \|\| a == 1` |

---

## 2. else if 체인

여러 조건을 순서대로 검사할 때 사용합니다.

```csharp
if (조건1)
{
    // 조건1이 참일 때
}
else if (조건2)
{
    // 조건1은 거짓, 조건2가 참일 때
}
else if (조건3)
{
    // ...
}
else
{
    // 모든 조건이 거짓일 때
}
```

> ⚠️ **주의**: `else if` 체인은 **위에서부터 차례로** 검사하며, 처음으로 참인 조건 하나만 실행됩니다.

---

## 3. 실습: 학점 분류기

학점(0.0 ~ 4.5)을 입력받아 등급을 출력하는 프로그램입니다.

```csharp
using System;

namespace ConsoleApp4
{
    class Program
    {
        static void Main(string[] args)
        {
            double score = double.Parse(Console.ReadLine());

            if (score == 4.5)
            {
                Console.WriteLine("신");
            }
            else if (4.2 <= score && score < 4.5)
            {
                Console.WriteLine("교수님의 사랑");
            }
            else if (3.5 <= score && score < 4.2)
            {
                Console.WriteLine("현 체제의 수호자");
            }
            else if (2.8 <= score && score < 3.5)
            {
                Console.WriteLine("일반인");
            }
            else if (2.3 <= score && score < 2.8)
            {
                Console.WriteLine("일탈을 꿈꾸는 소시민");
            }
            else if (1.75 <= score && score < 2.3)
            {
                Console.WriteLine("오락문화 선구자");
            }
            else if (1.0 <= score && score < 1.75)
            {
                Console.WriteLine("불가축천민");
            }
            else if (0.5 <= score && score < 1.0)
            {
                Console.WriteLine("자벌레");
            }
            else if (0 < score && score < 0.5)
            {
                Console.WriteLine("플랑크톤");
            }
            else
            {
                Console.WriteLine("시대를 앞서가는 혁명의 씨앗");
            }
        }
    }
}
```

**실행 예시:**
```
4.5
신

3.8
현 체제의 수호자

0
시대를 앞서가는 혁명의 씨앗
```

> 💡 **포인트**: `2.8 <= score && score < 3.5` 처럼 **범위 조건**은 AND(`&&`) 연산자로 두 조건을 동시에 걸어줍니다.

---

## 4. switch 문

하나의 변수 값에 따라 여러 케이스로 분기할 때 `switch`가 더 깔끔합니다.

```csharp
int input = int.Parse(Console.ReadLine());

switch (input % 2)
{
    case 0:
        Console.WriteLine("짝수입니다.");
        break;   // ← 반드시 break! (없으면 다음 case로 떨어짐)
    case 1:
        Console.WriteLine("홀수입니다.");
        break;
    default:
        Console.WriteLine("알 수 없는 값입니다.");
        break;
}
```

### if vs switch 비교

| 특징 | if-else | switch |
|------|---------|--------|
| 조건 | 범위, 복잡한 식 가능 | 상수 값 비교 |
| 가독성 | 조건이 많으면 복잡 | 케이스 많을 때 깔끔 |
| 사용 예 | `score >= 3.5` | `day == 1, 2, 3...` |

---

## 5. ConsoleKeyInfo와 방향키 입력

`Console.ReadKey()`는 키 입력을 받아 **ConsoleKeyInfo** 객체로 반환합니다.  
방향키, 특수키도 처리할 수 있습니다.

```csharp
using System;

namespace ConsoleApp6
{
    class Program
    {
        static void Main(string[] args)
        {
            ConsoleKeyInfo info = Console.ReadKey();   // 키 1개 입력 대기

            switch (info.Key)
            {
                case ConsoleKey.UpArrow:
                    Console.WriteLine("위쪽으로 이동");
                    break;
                case ConsoleKey.RightArrow:
                    Console.WriteLine("오른쪽으로 이동");
                    break;
                case ConsoleKey.DownArrow:
                    Console.WriteLine("아래쪽으로 이동");
                    break;
                case ConsoleKey.LeftArrow:
                    Console.WriteLine("왼쪽으로 이동");
                    break;
                default:
                    Console.WriteLine("다른 키를 눌렀습니다.");
                    break;
            }
        }
    }
}
```

**ConsoleKeyInfo 주요 속성:**

| 속성 | 설명 |
|------|------|
| `.Key` | `ConsoleKey` 열거형 (방향키, 문자 등) |
| `.KeyChar` | 입력된 문자 (`char`) |
| `.Modifiers` | Shift/Alt/Ctrl 조합 여부 |

---

## 6. 중첩 switch: 계절 분류기

switch 안에 또 다른 switch를 넣을 수도 있습니다. 아래는 **case 묶기(fall-through)** 를 이용한 계절 분류기입니다.

```csharp
Console.WriteLine("이번달은 몇월?");
int mon = int.Parse(Console.ReadLine());

switch (mon)
{
    case 12:
    case 1:
    case 2:
        Console.WriteLine("겨울입니다.");   // 12, 1, 2월 모두 여기로
        break;
    case 3:
    case 4:
    case 5:
        Console.WriteLine("봄입니다.");
        break;
    case 6:
    case 7:
    case 8:
        Console.WriteLine("여름입니다.");
        break;
    case 9:
    case 10:
    case 11:
        Console.WriteLine("가을입니다.");
        break;
    default:
        Console.WriteLine("잘못된 월입니다.");
        break;
}
```

**실행 예시:**
```
이번달은 몇월?
3
봄입니다.
```

---

## 7. 정리

| 구문 | 언제 사용? |
|------|-----------|
| `if` / `else` | 단순 참/거짓 분기 |
| `else if` 체인 | 범위 조건, 여러 조건 순서 검사 |
| `switch` | 하나의 값을 여러 상수와 비교 |
| `case 묶기` | 동일 결과를 여러 값에 적용 |
| `ConsoleKeyInfo` | 키보드 입력(방향키 포함) 처리 |

다음 강에서는 **반복문(for, while, foreach)** 과 콘솔 제어를 배웁니다! 🚀
