---
layout: post
title: "[C#] 3강 - 반복문: for, while, foreach"
subtitle: "for, while, do-while, foreach 반복문과 배열, 문자열 순회, 콘솔 애니메이션을 학습합니다."
date: 2026-06-10 11:00:00 +0900
categories: [C-Sharp]
tags: [C#, 반복문, for, while, foreach, break, continue, 배열, 문자열]
---

## 목차
1. [for 문](#1-for-문)
2. [while 문](#2-while-문)
3. [do-while 문](#3-do-while-문)
4. [break와 continue](#4-break와-continue)
5. [foreach 문](#5-foreach-문)
6. [배열과 역순 출력](#6-배열과-역순-출력)
7. [문자열 메서드 기초](#7-문자열-메서드-기초)
8. [실습: 콘솔 애니메이션](#8-실습-콘솔-애니메이션)
9. [정리](#9-정리)

---

## 1. for 문

반복 횟수가 **명확할 때** 가장 많이 사용합니다.

```csharp
// 기본 구조
for (초기식; 조건식; 증감식)
{
    // 반복 실행할 코드
}

// 예: 1부터 100까지 합계
int result = 0;
for (int i = 1; i <= 100; i++)
{
    result += i;  // 누적 합산
}
Console.WriteLine(result);  // 5050
```

### 역방향 for

```csharp
// 10에서 1까지 역순 카운트
for (int i = 10; i >= 1; i--)
{
    Console.Write(i + " ");
}
// 출력: 10 9 8 7 6 5 4 3 2 1
```

### 별 피라미드 그리기

```csharp
for (int i = 0; i < 10; i++)
{
    for (int j = 0; j < i + 1; j++)
        Console.Write('*');
    Console.Write('\n');
}
```

**출력:**
```
*
**
***
****
*****
******
*******
********
*********
**********
```

---

## 2. while 문

반복 횟수를 **미리 알 수 없을 때** 사용합니다.  
조건이 `true`인 동안 계속 반복합니다.

```csharp
// 기본 구조
while (조건)
{
    // 반복 실행할 코드
}

// 예: 1부터 10까지 출력
int i = 1;
while (i <= 10)
{
    Console.WriteLine(i);
    i++;
}
```

### 무한 루프 + break

`while (true)` 는 의도적인 무한 루프 패턴입니다.  
탈출 조건은 `break`로 처리합니다.

```csharp
while (true)
{
    Console.WriteLine("숫자를 입력해주세요. (짝수를 입력하면 종료):");
    int input = int.Parse(Console.ReadLine());

    if (input % 2 == 0)
    {
        break;  // 짝수가 입력되면 루프 탈출
    }
}
Console.WriteLine("짝수를 입력했으므로 종료합니다.");
```

**실행 예시:**
```
숫자를 입력해주세요. (짝수를 입력하면 종료):
3
숫자를 입력해주세요. (짝수를 입력하면 종료):
7
숫자를 입력해주세요. (짝수를 입력하면 종료):
4
짝수를 입력했으므로 종료합니다.
```

---

## 3. do-while 문

`while`과 달리 **최소 1번은 반드시 실행**됩니다.  
사용자 입력 반복 처리에 유용합니다.

```csharp
string input;
do
{
    Console.Write("입력 (exit을 입력하면 종료):");
    input = Console.ReadLine();
}
while (input != "exit");

Console.WriteLine("프로그램을 종료합니다.");
```

**실행 예시:**
```
입력 (exit을 입력하면 종료):Hello
입력 (exit을 입력하면 종료):exit
프로그램을 종료합니다.
```

---

## 4. break와 continue

| 키워드 | 역할 |
|--------|------|
| `break` | **즉시** 반복문을 종료하고 빠져나감 |
| `continue` | 현재 반복만 건너뛰고 **다음 반복**으로 진행 |

```csharp
// break 예시: 5를 만나면 중단
for (int i = 0; i < 10; i++)
{
    if (i == 5) break;
    Console.Write(i + " ");   // 출력: 0 1 2 3 4
}

// continue 예시: 홀수만 건너뜀
for (int i = 0; i < 10; i++)
{
    if (i % 2 != 0) continue;
    Console.Write(i + " ");   // 출력: 0 2 4 6 8
}
```

---

## 5. foreach 문

배열이나 컬렉션의 **요소를 하나씩 순회**할 때 편리합니다.  
인덱스 없이 값을 직접 꺼냅니다.

```csharp
string[] array = { "사과", "딸기", "포도", "바나나", "배" };

foreach (string item in array)
{
    Console.WriteLine(item);
}
```

**출력:**
```
사과
딸기
포도
바나나
배
```

> 💡 `var`를 사용하면 컴파일러가 자료형을 자동 추론합니다.
> ```csharp
> foreach (var item in array) { ... }
> ```

---

## 6. 배열과 역순 출력

배열 인덱스는 `0`부터 시작합니다. 역방향 for로 역순 출력이 가능합니다.

```csharp
int[] intArray = { 1, 2, 3, 4, 5, 6 };

// 역순으로 출력
for (int i = intArray.Length - 1; i >= 0; i--)
{
    Console.WriteLine(intArray[i]);
}
```

**출력:**
```
6
5
4
3
2
1
```

> 📌 `.Length` 프로퍼티: 배열의 요소 개수를 반환합니다.

---

## 7. 문자열 메서드 기초

`string` 클래스는 다양한 내장 메서드를 제공합니다.

### ToUpper / ToLower

```csharp
string input = "Potato Tomato";
string upper = input.ToUpper();    // "POTATO TOMATO"
string lower = input.ToLower();    // "potato tomato"

// ⚠️ 원본 string은 변경되지 않습니다! (불변 객체)
Console.WriteLine(input);   // "Potato Tomato" (그대로)
Console.WriteLine(upper);   // "POTATO TOMATO"
```

### Split - 문자열 분리

```csharp
string input = "감자 고구마 토마토 샐러리";
string[] inputs = input.Split(new char[] { ' ' });  // 공백으로 분리

foreach (var item in inputs)
{
    Console.WriteLine(item);
}
```

**출력:**
```
감자
고구마
토마토
샐러리
```

### Trim - 앞뒤 공백 제거

```csharp
string input = "         test        ";
Console.WriteLine("::" + input.Trim() + "::");  // "::test::"
```

### 주요 string 메서드 정리

| 메서드 | 설명 | 예시 |
|--------|------|------|
| `.ToUpper()` | 대문자 변환 | `"abc".ToUpper()` → `"ABC"` |
| `.ToLower()` | 소문자 변환 | `"ABC".ToLower()` → `"abc"` |
| `.Trim()` | 앞뒤 공백 제거 | `" hi ".Trim()` → `"hi"` |
| `.Split(' ')` | 구분자로 분리 | `"a b c".Split(' ')` → `["a","b","c"]` |
| `.Contains("str")` | 포함 여부 | `"hello".Contains("ell")` → `true` |
| `.Replace("a","b")` | 교체 | `"cat".Replace("c","b")` → `"bat"` |
| `.Length` | 문자 수 | `"hello".Length` → `5` |
| `.Substring(i, n)` | 부분 문자열 | `"hello".Substring(1,3)` → `"ell"` |

---

## 8. 실습: 콘솔 애니메이션

`Console.SetCursorPosition()`과 `Thread.Sleep()`으로 콘솔 애니메이션을 만들 수 있습니다.

```csharp
using System;
using System.Threading;

namespace ConsoleApp8
{
    class Program
    {
        static void Main(string[] args)
        {
            int x = 1;
            while (x < 50)
            {
                Console.Clear();                    // 화면 지우기
                Console.SetCursorPosition(x, 5);   // 커서 위치 (x열, 5행)

                // x 값에 따라 다른 모양 출력 → 움직이는 것처럼 보임
                if (x % 3 == 0)
                    Console.WriteLine("__@");
                else if (x % 3 == 1)
                    Console.WriteLine("_^@");
                else
                    Console.WriteLine("^_@");

                Thread.Sleep(100);   // 0.1초 대기 (애니메이션 속도 조절)
                x++;
            }
        }
    }
}
```

**핵심 API:**

| API | 설명 |
|-----|------|
| `Console.Clear()` | 콘솔 화면 전체 지우기 |
| `Console.SetCursorPosition(x, y)` | 커서를 (x열, y행)으로 이동 |
| `Thread.Sleep(ms)` | 밀리초(ms) 동안 실행 일시 정지 |

---

## 9. 정리

| 반복문 | 특징 | 사용 상황 |
|--------|------|----------|
| `for` | 횟수 지정, 인덱스 활용 | 정해진 횟수 반복 |
| `while` | 조건 기반 | 횟수 불명, 무한루프 패턴 |
| `do-while` | 최소 1회 실행 보장 | 사용자 입력 처리 |
| `foreach` | 컬렉션 순회 전용 | 배열, List 순회 |

다음 강에서는 **while 심화: 메뉴 시스템과 실전 프로젝트** 를 배웁니다! 🚀
