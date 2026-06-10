---
layout: post
title: "[C#] 6강 - 클래스, 메서드, static 키워드"
subtitle: "클래스 정의, 인스턴스 생성, 인스턴스 메서드와 static 메서드, 메서드 오버로딩을 완전히 이해합니다."
date: 2026-06-10 14:00:00 +0900
categories: [C-Sharp]
tags: [C#, 클래스, 객체, 메서드, static, 오버로딩, 인스턴스, OOP]
---

## 목차
1. [클래스(Class)란?](#1-클래스class란)
2. [필드(Field)와 인스턴스 생성](#2-필드field와-인스턴스-생성)
3. [인스턴스 메서드](#3-인스턴스-메서드)
4. [실습: Product 클래스](#4-실습-product-클래스)
5. [static 메서드](#5-static-메서드)
6. [메서드 오버로딩 (Overloading)](#6-메서드-오버로딩-overloading)
7. [접근 제한자 (Access Modifier)](#7-접근-제한자-access-modifier)
8. [정리](#8-정리)

---

## 1. 클래스(Class)란?

C#은 **객체 지향 프로그래밍(OOP)** 언어입니다.  
**클래스**는 데이터(필드)와 동작(메서드)을 묶은 **설계도**이며,  
**인스턴스(객체)** 는 그 설계도로 만든 **실체**입니다.

```
클래스(Class)    →   인스턴스(Instance)
  설계도              실제 사물
  붕어빵 틀           붕어빵
  Student 클래스      홍길동 학생 객체
```

---

## 2. 필드(Field)와 인스턴스 생성

```csharp
// 클래스 정의
class Product
{
    // 필드: 데이터를 저장하는 변수
    public string name;
    public int    price;
}

// 인스턴스 생성 및 사용
class Program
{
    static void Main(string[] args)
    {
        // new 키워드로 인스턴스 생성
        Product product = new Product();

        // 점(.) 연산자로 필드 접근
        product.name  = "감자";
        product.price = 2000;

        Console.WriteLine(product.name + " : " + product.price + "원");
        // 출력: 감자 : 2000원
    }
}
```

### 여러 인스턴스 생성

같은 클래스로 독립적인 객체를 여러 개 만들 수 있습니다.

```csharp
Product p1 = new Product();
p1.name  = "감자";
p1.price = 2000;

Product p2 = new Product();
p2.name  = "고구마";
p2.price = 3000;

Console.WriteLine($"{p1.name}: {p1.price}원");  // 감자: 2000원
Console.WriteLine($"{p2.name}: {p2.price}원");  // 고구마: 3000원
```

---

## 3. 인스턴스 메서드

클래스 안에 정의된 함수를 **메서드**라고 합니다.  
인스턴스 메서드는 **해당 인스턴스의 데이터를 이용**해 동작합니다.

```csharp
class Customer
{
    public string custName;
    public int    point;

    // 인스턴스 메서드
    public void Visit()
    {
        Console.WriteLine("어서오세요! 환영합니다~");
    }

    public void Buy()
    {
        Console.WriteLine("구매합니다. 감사합니다.");
    }

    public void Refund()
    {
        Console.WriteLine("환불합니다. 환불금은 계좌로 입금해 드리겠습니다.");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Customer c = new Customer();
        c.custName = "홍길동";
        c.Visit();   // 어서오세요! 환영합니다~
        c.Buy();     // 구매합니다. 감사합니다.
    }
}
```

### 반환값이 있는 메서드

```csharp
class MyMath
{
    // 두 정수의 합을 반환하는 메서드
    public int Add(int a, int b)
    {
        return a + b;
    }

    // 제곱을 반환하는 메서드
    public int Power(int x)
    {
        return x * x;
    }
}

class Program
{
    static void Main(string[] args)
    {
        MyMath math = new MyMath();
        Console.WriteLine(math.Power(10));  // 100
        Console.WriteLine(math.Power(20));  // 400
        Console.WriteLine(math.Add(3, 5));  // 8
    }
}
```

---

## 4. 실습: Product 클래스

```csharp
using System;

namespace MyProgram
{
    class Product
    {
        public string name;
        public string price;
    }

    class Program
    {
        static void Main(string[] args)
        {
            // 인스턴스 생성
            Product product = new Product();

            // 필드 값 할당
            product.name  = "감자";
            product.price = "2000";

            // 출력
            Console.WriteLine(product.name + " : " + product.price + "원");
        }
    }
}
```

**출력:**
```
감자 : 2000원
```

> 💡 **네이밍 컨벤션**: C#에서 클래스명과 메서드명은 **PascalCase** (첫 글자 대문자), 변수/필드명은 **camelCase** (첫 글자 소문자)를 사용합니다.

---

## 5. static 메서드

`static` 메서드는 **인스턴스 없이 클래스 이름으로 직접 호출**합니다.  
수학 유틸리티 함수처럼 특정 객체에 종속되지 않는 기능에 적합합니다.

```csharp
class MathHelper
{
    // static 메서드: 인스턴스 없이 호출 가능
    public static int Square(int x)
    {
        return x * x;
    }

    public static int Abs(int x)
    {
        return x < 0 ? -x : x;
    }
}

class Program
{
    static void Main(string[] args)
    {
        // 클래스명.메서드명() 으로 호출 (new 불필요!)
        int sq  = MathHelper.Square(5);  // 25
        int abs = MathHelper.Abs(-7);    // 7

        Console.WriteLine(sq);
        Console.WriteLine(abs);
    }
}
```

### static vs 인스턴스 비교

| 구분 | 선언 | 호출 방법 | 사용 상황 |
|------|------|----------|----------|
| 인스턴스 메서드 | `public void Foo()` | `obj.Foo()` | 객체 상태(필드) 사용 |
| static 메서드 | `public static void Foo()` | `ClassName.Foo()` | 객체 상태 불필요, 유틸리티 |

> 📌 `Main` 메서드가 `static`인 이유: 프로그램 시작 시 아직 어떤 객체도 생성되지 않았으므로, 인스턴스 없이 호출 가능해야 합니다.

---

## 6. 메서드 오버로딩 (Overloading)

**같은 이름의 메서드**를 **매개변수의 타입이나 개수**를 다르게 하여 여러 개 정의할 수 있습니다.

```csharp
class MyMath
{
    // int 매개변수
    public static int Abs(int input)
    {
        return input < 0 ? -input : input;
    }

    // long 매개변수 (타입이 다름 → 오버로딩)
    public static long Abs(long input)
    {
        return input < 0 ? -input : input;
    }

    // double 매개변수
    public static double Abs(double input)
    {
        return input < 0 ? -input : input;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(MyMath.Abs(-5));      // int 버전 호출 → 5
        Console.WriteLine(MyMath.Abs(-100L));   // long 버전 호출 → 100
        Console.WriteLine(MyMath.Abs(-3.14));   // double 버전 호출 → 3.14
    }
}
```

컴파일러가 **전달된 인자의 타입**을 보고 적절한 메서드를 자동으로 선택합니다.

### 오버로딩 규칙

| 가능 여부 | 예시 |
|---------|------|
| ✅ 가능 | 매개변수 **타입** 다름 |
| ✅ 가능 | 매개변수 **개수** 다름 |
| ❌ 불가 | 반환형만 다름 (컴파일 오류) |

---

## 7. 접근 제한자 (Access Modifier)

클래스 멤버에 접근 가능한 범위를 지정합니다.

| 키워드 | 접근 범위 |
|--------|----------|
| `public` | 어디서든 접근 가능 |
| `private` | **같은 클래스 안에서만** (기본값) |
| `protected` | 같은 클래스 + 파생 클래스 |
| `internal` | 같은 어셈블리(프로젝트) 내 |

```csharp
class BankAccount
{
    public string owner;      // 외부에서 읽고 쓸 수 있음
    private int balance;      // 외부에서 직접 접근 불가

    public void Deposit(int amount)
    {
        balance += amount;    // 메서드를 통해서만 수정 가능
    }

    public int GetBalance()
    {
        return balance;
    }
}

class Program
{
    static void Main(string[] args)
    {
        BankAccount acc = new BankAccount();
        acc.owner = "홍길동";      // public: OK
        // acc.balance = 1000;    // private: 컴파일 오류!

        acc.Deposit(50000);
        Console.WriteLine(acc.GetBalance());  // 50000
    }
}
```

---

## 8. 정리

| 개념 | 핵심 내용 |
|------|----------|
| **클래스** | 필드 + 메서드를 묶은 설계도 |
| **인스턴스** | `new 클래스명()`으로 생성한 실체 |
| **인스턴스 메서드** | 객체를 통해 호출, 객체 상태 사용 |
| **static 메서드** | `클래스명.메서드명()`, 인스턴스 불필요 |
| **오버로딩** | 같은 이름, 다른 매개변수 → 컴파일러가 자동 선택 |
| **public/private** | 멤버 접근 범위 제어 |

다음 강에서는 **클래스 설계 실전: 재고 관리 시스템과 Windows Forms 입문** 을 배웁니다! 🚀
