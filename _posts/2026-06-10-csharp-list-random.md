---
layout: post
title: "[C#] 5강 - List<T>와 Random: 동적 컬렉션과 난수"
subtitle: "고정 크기 배열의 한계를 넘어, List<T>의 Add/Remove/Contains 메서드와 Random 클래스를 마스터합니다."
date: 2026-06-10 13:00:00 +0900
categories: [C-Sharp]
tags: [C#, List, 컬렉션, Random, 제네릭, foreach, Add, Remove, Contains]
---

## 목차
1. [배열의 한계와 List\<T\>](#1-배열의-한계와-listt)
2. [List\<T\> 기본 조작](#2-listt-기본-조작)
3. [실습: 판다의 쇼핑 리스트](#3-실습-판다의-쇼핑-리스트)
4. [List\<T\> 주요 메서드 정리](#4-listt-주요-메서드-정리)
5. [List\<int\> 심화 실습: Add / Remove / Clear](#5-listint-심화-실습-add--remove--clear)
6. [Random 클래스](#6-random-클래스)
7. [응용: List\<Student\>로 데이터 관리](#7-응용-liststudent로-데이터-관리)
8. [정리](#8-정리)

---

## 1. 배열의 한계와 List\<T\>

배열(`int[]`, `string[]`)은 선언 시 크기가 **고정**됩니다.

```csharp
int[] arr = new int[5];  // 딱 5개만 저장 가능
```

실행 중에 요소를 추가/삭제하려면 **`List<T>`** 를 사용합니다.

| 특징 | 배열 | List\<T\> |
|------|------|-----------|
| 크기 | 고정 | **동적 (자동 확장)** |
| 요소 추가 | 불가 | `.Add()` |
| 요소 삭제 | 불가 | `.Remove()` |
| 요소 수 | `.Length` | `.Count` |
| 접근 방식 | `arr[i]` | `list[i]` |

---

## 2. List\<T\> 기본 조작

`List<T>`를 사용하려면 `using System.Collections.Generic;` 이 필요합니다.

```csharp
using System.Collections.Generic;

// 선언 및 생성
List<string> fruits = new List<string>();

// 요소 추가
fruits.Add("사과");
fruits.Add("바나나");
fruits.Add("포도");

// 요소 수 확인
Console.WriteLine(fruits.Count);  // 3

// 인덱스로 접근 (배열처럼)
Console.WriteLine(fruits[0]);     // 사과
Console.WriteLine(fruits[1]);     // 바나나

// 반복 순회
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}

// 요소 제거
fruits.Remove("바나나");         // 값으로 제거
// fruits.RemoveAt(0);           // 인덱스로 제거

// 전체 삭제
fruits.Clear();
```

---

## 3. 실습: 판다의 쇼핑 리스트

```csharp
using System;
using System.Collections.Generic;

namespace ConsoleApp8
{
    class Program
    {
        static void Main(string[] args)
        {
            // 1. 선언 및 생성
            List<string> pandaShoppingList = new List<string>();

            // 2. Add: 리스트에 담기
            pandaShoppingList.Add("시원한 하늘보리");
            pandaShoppingList.Add("구수한 하늘보리");
            pandaShoppingList.Add("얼음컵");
            pandaShoppingList.Add("비상용 죽순");
            pandaShoppingList.Add("여행 가이드북");

            Console.WriteLine("=== 판다의 쇼핑 리스트 ===");

            // 3. Count: 개수 확인
            Console.WriteLine($"담긴 물건 개수: {pandaShoppingList.Count}개");

            // 4. foreach: 하나씩 꺼내기
            foreach (string item in pandaShoppingList)
            {
                Console.WriteLine($"판다가 챙긴 것: {item}");
            }

            Console.WriteLine("\n--- 리스트 수정 중 ---");

            // 5. Remove: 특정 항목 제거
            pandaShoppingList.Remove("얼음컵");

            // 6. Contains: 포함 여부 확인
            if (pandaShoppingList.Contains("시원한 하늘보리"))
            {
                Console.WriteLine("하늘보리가 가방에 있네요! 사막도 OK!");
            }

            // 7. 인덱스 접근
            Console.WriteLine($"첫 번째 아이템: {pandaShoppingList[0]}");
            Console.WriteLine($"두 번째 아이템: {pandaShoppingList[1]}");

            Console.WriteLine("===========================");
        }
    }
}
```

**실행 결과:**
```
=== 판다의 쇼핑 리스트 ===
담긴 물건 개수: 5개
판다가 챙긴 것: 시원한 하늘보리
판다가 챙긴 것: 구수한 하늘보리
판다가 챙긴 것: 얼음컵
판다가 챙긴 것: 비상용 죽순
판다가 챙긴 것: 여행 가이드북

--- 리스트 수정 중 ---
하늘보리가 가방에 있네요! 사막도 OK!
첫 번째 아이템: 시원한 하늘보리
두 번째 아이템: 구수한 하늘보리
===========================
```

---

## 4. List\<T\> 주요 메서드 정리

| 메서드/프로퍼티 | 설명 | 예시 |
|----------------|------|------|
| `.Add(item)` | 끝에 추가 | `list.Add("사과")` |
| `.Remove(item)` | 값으로 제거 (첫 번째) | `list.Remove("사과")` |
| `.RemoveAt(i)` | 인덱스로 제거 | `list.RemoveAt(0)` |
| `.Clear()` | 전체 삭제 | `list.Clear()` |
| `.Contains(item)` | 포함 여부 | `list.Contains("사과")` → `true/false` |
| `.Count` | 요소 수 | `list.Count` → `int` |
| `.Insert(i, item)` | 특정 위치에 삽입 | `list.Insert(1, "딸기")` |
| `.Sort()` | 정렬 | `list.Sort()` |
| `.IndexOf(item)` | 인덱스 반환 (-1: 없음) | `list.IndexOf("포도")` |

---

## 5. List\<int\> 심화 실습: Add / Remove / Clear

```csharp
using System;
using System.Collections.Generic;

namespace instance
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> list = new List<int>();

            list.Add(52);
            list.Add(273);
            list.Add(32);
            list.Add(64);

            // 현재 상태 출력
            foreach (var item in list)
            {
                Console.WriteLine("Count: " + list.Count + "\titem: " + item);
            }

            // 273 제거
            list.Remove(273);
            Console.WriteLine("\n--- 273 제거 후 ---");
            foreach (var item in list)
            {
                Console.WriteLine("Count: " + list.Count + "\titem: " + item);
            }

            // 전체 삭제
            list.Clear();
            Console.WriteLine("\n--- Clear 후 ---");
            if (list.Count != 0)
            {
                foreach (var item in list)
                {
                    Console.WriteLine("Count: " + list.Count + "\titem: " + item);
                }
            }
            else
            {
                Console.WriteLine("데이터가 없어요.");
            }
        }
    }
}
```

**실행 결과:**
```
Count: 4    item: 52
Count: 4    item: 273
Count: 4    item: 32
Count: 4    item: 64

--- 273 제거 후 ---
Count: 3    item: 52
Count: 3    item: 32
Count: 3    item: 64

--- Clear 후 ---
데이터가 없어요.
```

> 📌 **중요**: `foreach` 루프 **안에서** 리스트를 수정(Add/Remove)하면 예외(`InvalidOperationException`)가 발생합니다. 수정은 루프 **밖**에서 하거나, 인덱스 역방향 `for` 를 사용하세요.

---

## 6. Random 클래스

`Random` 클래스로 난수(임의의 수)를 생성할 수 있습니다.

```csharp
Random random = new Random();

// Next(min, max): min 이상, max 미만의 정수
int r1 = random.Next(10, 100);   // 10~99
int r2 = random.Next(10, 100);   // 10~99
Console.WriteLine(r1);
Console.WriteLine(r2);

// Next(): 0 이상의 임의 정수
int r3 = random.Next();

// NextDouble(): 0.0 이상 1.0 미만의 실수
double rd = random.NextDouble();
```

**실행 예시 (매번 다른 결과):**
```
47
83
12
61
```

### 주사위 시뮬레이션

```csharp
Random rng = new Random();
int dice = rng.Next(1, 7);   // 1~6
Console.WriteLine($"주사위 결과: {dice}");
```

---

## 7. 응용: List\<Student\>로 데이터 관리

클래스를 타입 파라미터로 사용하면 **복잡한 데이터도 리스트로 관리**할 수 있습니다.

```csharp
using System;
using System.Collections.Generic;

namespace ConsoleApp9
{
    // 학생 데이터를 담는 클래스
    class Student
    {
        public string id;
        public int    grade;
        public string name;
        public string major;
        public DateTime birthday;
    }

    class Program
    {
        static void Main(string[] args)
        {
            List<Student> list = new List<Student>();

            // 객체 초기화 문법 (중괄호로 필드를 바로 할당)
            list.Add(new Student() { name = "홍길동", grade = 1 });
            list.Add(new Student() { name = "김영희", grade = 2, major = "컴퓨터공학" });

            foreach (var item in list)
            {
                Console.WriteLine($"{item.name} : {item.grade}학년");
            }
        }
    }
}
```

**실행 결과:**
```
홍길동 : 1학년
김영희 : 2학년
```

### 객체 초기화 문법

```csharp
// 방법 1: 일반 (생성 후 각각 대입)
Student s = new Student();
s.name  = "홍길동";
s.grade = 1;

// 방법 2: 객체 초기화 문법 (간결, 권장)
Student s = new Student() { name = "홍길동", grade = 1 };

// 방법 3: var 사용 (타입 추론)
var s = new Student { name = "홍길동", grade = 1 };
```

---

## 8. 정리

| 개념 | 핵심 내용 |
|------|----------|
| `List<T>` | 크기가 동적으로 늘어나는 배열, `Add/Remove/Clear` |
| `.Count` | 현재 요소 수 (배열의 `.Length`에 해당) |
| `.Contains()` | 특정 값 포함 여부 확인 |
| `Random` | `Next(min, max)`로 범위 내 난수 생성 |
| 객체 초기화 | `new Class() { field = value }` 간결 초기화 |
| `List<클래스>` | 복잡한 데이터 묶음을 리스트로 관리 |

다음 강에서는 **클래스, 메서드, static 키워드** 를 배웁니다! 🚀
