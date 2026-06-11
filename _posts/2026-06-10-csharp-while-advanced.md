---
layout: post
title: "[C#] 4강 - while 심화: 메뉴 시스템과 카페 주문 프로젝트"
subtitle: "while을 활용한 대화형 메뉴 시스템, 누산기 패턴, 영수증 출력까지 실전 프로젝트를 완성합니다."
date: 2026-06-10 12:00:00 +0900
categories: [C-Sharp]
tags: [C#, while, 메뉴시스템, 누산기, 프로젝트, 할인계산, 영수증]
---

## 목차
1. [누산기 패턴](#1-누산기-패턴)
2. [실습: 카페 주문 + 할인 계산기](#2-실습-카페-주문--할인-계산기)
3. [실습: while 루프 카페 메뉴 시스템](#3-실습-while-루프-카페-메뉴-시스템)
4. [문자열 포맷팅 팁](#4-문자열-포맷팅-팁)
5. [while 루프로 키보드 제어 구현](#5-while-루프로-키보드-제어-구현)
6. [정리](#6-정리)

---

## 1. 누산기 패턴

**누산기(Accumulator) 패턴**은 반복문 안에서 값을 계속 더해 최종 합계를 구하는 패턴입니다.  
C#의 `+=` 복합 대입 연산자를 사용합니다.

```csharp
int total = 0;   // 누산기 변수 (반복 전 초기화)

for (int i = 1; i <= 10; i++)
{
    total += i;  // total = total + i
}

Console.WriteLine("합계: " + total);   // 합계: 55
```

**복합 대입 연산자 정리:**

| 연산자 | 의미 |
|--------|------|
| `a += b` | `a = a + b` |
| `a -= b` | `a = a - b` |
| `a *= b` | `a = a * b` |
| `a /= b` | `a = a / b` |
| `a %= b` | `a = a % b` |

---

## 2. 실습: 카페 주문 + 할인 계산기

세 종류 음료의 수량을 입력받아 총금액을 계산하고, 금액에 따라 할인을 적용하는 프로그램입니다.

```csharp
using System;

namespace ConsoleApp5
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("주문해주세요. 첫번째 선택지는 아메리카노");
            Console.WriteLine("주문해주세요. 두번째 선택지는 라떼");
            Console.WriteLine("주문해주세요. 세번째 선택지는 녹차");

            int 첫번째주문 = int.Parse(Console.ReadLine());
            int 두번째주문 = int.Parse(Console.ReadLine());
            int 세번째주문 = int.Parse(Console.ReadLine());

            int 아메리카노 = 2000;
            int 라떼       = 3000;
            int 녹차       = 2500;

            int 결제금액 = 아메리카노 * 첫번째주문
                         + 라떼 * 두번째주문
                         + 녹차 * 세번째주문;

            // 할인 정책
            if (결제금액 >= 20000)
            {
                Console.WriteLine("결제 금액 2만원 이상 20% 할인됩니다.");
                Console.WriteLine("최종 금액: " + (결제금액 * 0.8));
                Console.WriteLine("할인 금액: " + (결제금액 * 0.2));
            }
            else if (결제금액 >= 10000)
            {
                Console.WriteLine("결제 금액 1만원 이상 15% 할인됩니다.");
                Console.WriteLine("최종 금액: " + (결제금액 * 0.85));
                Console.WriteLine("할인 금액: " + (결제금액 * 0.15));
            }
            else
            {
                Console.WriteLine("결제 금액입니다: " + 결제금액);
            }
        }
    }
}
```

**실행 예시:**
```
주문해주세요. 첫번째 선택지는 아메리카노
주문해주세요. 두번째 선택지는 라떼
주문해주세요. 세번째 선택지는 녹차
3
2
1
결제 금액 2만원 이상 20% 할인됩니다.
최종 금액: 17200
할인 금액: 4300
```

> 💡 **C#의 한글 변수명**: C#은 유니코드 식별자를 지원하므로 변수명에 한글을 사용할 수 있습니다. 단, 실무에서는 영문 사용을 권장합니다.

---

## 3. 실습: while 루프 카페 메뉴 시스템

반복적으로 메뉴를 주문받고, `99`를 입력하면 영수증을 출력 후 결제하는 완성형 프로그램입니다.

```csharp
using System;

namespace ConsoleApp7
{
    class Program
    {
        static void Main(string[] args)
        {
            int 아메리카노 = 2000;
            int 라떼       = 3000;
            int 녹차       = 2500;
            int 주문       = 0;
            int count1     = 0;  // 아메리카노 잔 수
            int count2     = 0;  // 라떼 잔 수
            int count3     = 0;  // 녹차 잔 수
            int 총금액     = 0;
            int pay        = 0;
            int change     = 0;

            // ① 주문 루프
            while (true)
            {
                Console.WriteLine("-주문을 시작합니다.-");
                Console.WriteLine("--------------------");
                Console.WriteLine("메뉴");
                Console.WriteLine("1. 아메리카노 2000원");
                Console.WriteLine("2. 라떼 3000원");
                Console.WriteLine("3. 녹차 2500원");
                Console.WriteLine("99. 주문 종료");
                Console.WriteLine("--------------------");
                Console.WriteLine("메뉴의 번호를 눌러주세요.");
                주문 = int.Parse(Console.ReadLine());

                if (주문 == 1)
                {
                    Console.WriteLine("아메리카노 잔수를 입력하세요:");
                    count1 = int.Parse(Console.ReadLine());
                    총금액 += 아메리카노 * count1;
                    Console.WriteLine($"→ 아메리카노 {count1}잔 추가되었습니다.");
                }
                else if (주문 == 2)
                {
                    Console.WriteLine("라떼 잔수를 입력하세요:");
                    count2 = int.Parse(Console.ReadLine());
                    총금액 += 라떼 * count2;
                    Console.WriteLine($"→ 라떼 {count2}잔 추가되었습니다.");
                }
                else if (주문 == 3)
                {
                    Console.WriteLine("녹차 잔수를 입력하세요:");
                    count3 = int.Parse(Console.ReadLine());
                    총금액 += 녹차 * count3;
                    Console.WriteLine($"→ 녹차 {count3}잔 추가되었습니다.");
                }
                else if (주문 == 99)
                {
                    // ② 영수증 출력
                    int 총합잔수 = count1 + count2 + count3;
                    Console.WriteLine("주문을 종료합니다. 영수증을 출력합니다.");
                    Console.WriteLine("---------- 주문 내역 ----------");
                    Console.WriteLine($"아메리카노\t{count1}잔\t{아메리카노}원\t{아메리카노 * count1}원");
                    Console.WriteLine($"라떼\t\t{count2}잔\t{라떼}원\t{라떼 * count2}원");
                    Console.WriteLine($"녹차\t\t{count3}잔\t{녹차}원\t{녹차 * count3}원");
                    Console.WriteLine($"총합계\t\t{총합잔수}잔\t\t{총금액}원");
                    break;
                }
                else
                {
                    Console.WriteLine("잘못 입력하였습니다. 다시 입력해주세요.");
                }
            }

            // ③ 결제 루프: 금액이 부족하면 재입력 요구
            while (pay < 총금액)
            {
                Console.WriteLine("지불금액을 입력하세요:");
                pay = int.Parse(Console.ReadLine());

                if (pay < 총금액)
                {
                    Console.WriteLine("지불금액이 부족합니다. 다시 입력해주세요.");
                }
            }

            change = pay - 총금액;
            Console.WriteLine("거스름돈: " + change + "원");
            Console.WriteLine("이용해주셔서 감사합니다!");
        }
    }
}
```

**실행 예시:**
```
-주문을 시작합니다.-
--------------------
1. 아메리카노 2000원
2. 라떼 3000원
3. 녹차 2500원
99. 주문 종료
→ 아메리카노 2잔 추가되었습니다.
...
---------- 주문 내역 ----------
아메리카노  2잔  2000원  4000원
...
총합계      3잔          8500원
지불금액을 입력하세요:
10000
거스름돈: 1500원
이용해주셔서 감사합니다!
```

### 코드 설계 포인트

| 구조 | 역할 |
|------|------|
| 첫 번째 `while (true)` | 주문 반복, `99`로 탈출 |
| `총금액 +=` | 주문할 때마다 누적 합산 |
| 두 번째 `while (pay < 총금액)` | 부족 금액 재입력 강제 |

---

## 4. 문자열 포맷팅 팁

### 문자열 보간 `$"..."`

```csharp
string name = "아메리카노";
int count = 2;
int price = 2000;

// 방법 1: 연결 연산자 +
Console.WriteLine(name + " " + count + "잔: " + (price * count) + "원");

// 방법 2: 문자열 보간 (권장)
Console.WriteLine($"{name} {count}잔: {price * count}원");

// 방법 3: String.Format
Console.WriteLine(String.Format("{0} {1}잔: {2}원", name, count, price * count));
```

### 탭 정렬 `\t`

```csharp
Console.WriteLine("항목\t\t잔수\t단가\t합계");
Console.WriteLine($"아메리카노\t{count1}잔\t{아메리카노}원\t{아메리카노 * count1}원");
```

---

## 5. while 루프로 키보드 제어 구현

`while (true)` 안에서 `ConsoleKeyInfo`를 반복 읽으면 **게임 컨트롤러 같은 입력 루프**를 만들 수 있습니다.

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        while (true)
        {
            ConsoleKeyInfo info = Console.ReadKey();

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
                case ConsoleKey.X:
                    Console.WriteLine("X키로 종료합니다.");
                    return;  // Main 종료
                default:
                    Console.WriteLine("다른 키를 눌렀습니다.");
                    break;
            }
        }
    }
}
```

---

## 6. 정리

| 패턴 | 언제 사용? |
|------|-----------|
| **누산기** | 반복 중 값 누적 (`total += x`) |
| **메뉴 루프** | `while(true)` + 선택지 분기 + 종료 번호로 `break` |
| **결제 루프** | 조건 미충족 시 재입력 (`while (pay < total)`) |
| **입력 루프** | `ConsoleKeyInfo` + `while(true)` 무한 키 감지 |

다음 강에서는 **문자열 심화와 List\<T\> 컬렉션** 을 배웁니다! 🚀
