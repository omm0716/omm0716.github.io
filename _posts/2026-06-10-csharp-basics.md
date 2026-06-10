---
layout: post
title: "[C#] 1강 - 변수, 자료형, 형변환"
subtitle: "C#의 기본 자료형, 변수 선언, 명시적/암묵적 형변환을 배웁니다."
date: 2026-06-10 09:00:00 +0900
categories: [C-Sharp]
tags: [C#, 변수, 자료형, 형변환, int, long, string]
---

## 목차
1. [C#이란?](#1-c란)
2. [변수와 자료형](#2-변수와-자료형)
3. [정수형: int와 long](#3-정수형-int와-long)
4. [형변환 (Type Casting)](#4-형변환-type-casting)
5. [문자열과 숫자 변환](#5-문자열과-숫자-변환)
6. [실습: 1부터 100까지 합](#6-실습-1부터-100까지-합)
7. [정리](#7-정리)

---

## 1. C#이란?

**C#(C Sharp)** 은 Microsoft가 개발한 객체지향 프로그래밍 언어입니다.  
`.NET` 플랫폼 위에서 동작하며, Windows 앱(WinForms, WPF), 웹 앱(ASP.NET), 게임(Unity) 등 다양한 분야에서 활용됩니다.

| 언어 | 특징 |
|------|------|
| C | 저수준, 빠름, 메모리 직접 관리 |
| C++ | C + 객체지향 |
| **C#** | **안전한 메모리 관리, 풍부한 라이브러리, .NET 생태계** |

---

## 2. 변수와 자료형

변수(Variable)는 데이터를 저장하는 이름이 붙은 공간입니다.

```csharp
자료형 변수이름 = 값;
```

C#의 주요 기본 자료형:

| 자료형 | 크기 | 범위 | 예시 |
|--------|------|------|------|
| `bool` | 1 byte | true / false | `bool flag = true;` |
| `int` | 4 bytes | ±21억 | `int age = 25;` |
| `long` | 8 bytes | ±약 922경 | `long big = 10000000000L;` |
| `float` | 4 bytes | 소수점 7자리 | `float f = 3.14f;` |
| `double` | 8 bytes | 소수점 15자리 | `double d = 3.14;` |
| `char` | 2 bytes | 유니코드 문자 1개 | `char c = 'A';` |
| `string` | 가변 | 문자열 | `string s = "Hello";` |

> 💡 **Tip**: `long` 리터럴은 숫자 뒤에 `L`을 붙입니다. `float`는 `f`를 붙입니다.

---

## 3. 정수형: int와 long

`int`는 가장 많이 쓰이는 정수형이지만, 범위가 **-2,147,483,648 ~ 2,147,483,647** 으로 한정됩니다.  
이 범위를 넘으면 **오버플로우(Overflow)** 가 발생합니다.

```csharp
long longnumber = 2147483647L + 2147483647L;  // int 최대값 * 2
Console.WriteLine(longnumber);   // 4294967294 (long이라서 정상 출력)

int intnumber = (int)longnumber; // long → int 강제 변환
Console.WriteLine(intnumber);    // -2 (오버플로우 발생!)
```

**실행 결과:**
```
4294967294
-2
```

> ⚠️ **주의**: 큰 수를 다룰 때는 `long`을 사용해야 오버플로우를 방지할 수 있습니다.

---

## 4. 형변환 (Type Casting)

### 암시적 형변환 (Implicit Casting)
작은 자료형 → 큰 자료형으로는 자동 변환됩니다.

```csharp
int i = 100;
long l = i;       // int → long (자동 변환, 데이터 손실 없음)
double d = i;     // int → double (자동 변환)
```

### 명시적 형변환 (Explicit Casting)
큰 자료형 → 작은 자료형은 **(자료형)** 을 앞에 붙여 강제 변환합니다.  
데이터 손실이 발생할 수 있습니다.

```csharp
double d = 9.78;
int i = (int)d;         // → 9  (소수점 버림)

long big = 4294967294L;
int small = (int)big;   // → -2 (오버플로우)
```

### 형변환 가능 경로

```
byte → short → int → long → float → double
                ↑
              char
```

---

## 5. 문자열과 숫자 변환

사용자가 콘솔에 입력한 값은 항상 **문자열(string)** 로 받습니다.  
숫자로 계산하려면 변환이 필요합니다.

### string → 숫자

```csharp
string numberstring = "51";

// 방법 1: Parse (실패 시 예외 발생)
int parsed = int.Parse(numberstring);    // → 51
double d   = double.Parse("3.14");      // → 3.14

// 방법 2: TryParse (실패 시 false 반환, 안전)
bool success = int.TryParse("abc", out int result);  // success = false
```

### 숫자 → string

```csharp
int num = 42;
string s1 = num.ToString();          // → "42"
string s2 = $"숫자는 {num}입니다.";  // 문자열 보간 (Interpolation)
```

> 💡 **문자열 보간** `$"..."` 은 변수를 중괄호 `{}` 안에 넣어 출력하는 편리한 방법입니다.

---

## 6. 실습: 1부터 100까지 합

```csharp
using System;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            int result = 0;  // 결과값 누적을 위한 변수
            Console.WriteLine("1부터 100까지 합을 구합니다.");

            for (int i = 0; i <= 100; i++)   // 0부터 100까지 반복
            {
                result += i;  // result = result + i 와 같음
            }
            Console.WriteLine(result);   // 5050 출력
        }
    }
}
```

**실행 결과:**
```
1부터 100까지 합을 구합니다.
5050
```

> 📌 **공식**: 1부터 n까지의 합 = n × (n + 1) / 2  
> → 100 × 101 / 2 = **5050**

---

## 7. 정리

| 개념 | 핵심 내용 |
|------|----------|
| **변수** | 데이터를 저장하는 이름이 붙은 공간 |
| **int** | 4바이트 정수, 범위: ±21억 |
| **long** | 8바이트 정수, 큰 수에 사용, 리터럴에 `L` 추가 |
| **암시적 형변환** | 작은 형 → 큰 형, 자동 변환 |
| **명시적 형변환** | 큰 형 → 작은 형, `(자료형)` 표기, 데이터 손실 가능 |
| **int.Parse()** | 문자열 → 정수 변환 |
| **ToString()** | 숫자 → 문자열 변환 |

다음 강에서는 **조건문(if, switch)** 을 배웁니다! 🚀
