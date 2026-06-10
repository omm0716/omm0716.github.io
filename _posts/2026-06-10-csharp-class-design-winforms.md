---
layout: post
title: "[C#] 7강 - 클래스 설계 실전: 재고 관리 시스템과 Windows Forms 입문"
subtitle: "다중 클래스를 설계하는 재고 관리 시스템과 GUI 프로그래밍의 첫걸음 Windows Forms를 배웁니다."
date: 2026-06-10 15:00:00 +0900
categories: [C-Sharp]
tags: [C#, 클래스설계, OOP, 재고관리, WindowsForms, WinForms, GUI, MessageBox, Button]
---

## 목차
1. [다중 클래스 설계](#1-다중-클래스-설계)
2. [실전 프로젝트: LM 재고 관리 시스템](#2-실전-프로젝트-lm-재고-관리-시스템)
3. [클래스 다이어그램 (UML)](#3-클래스-다이어그램-uml)
4. [Windows Forms 입문](#4-windows-forms-입문)
5. [MessageBox와 이벤트 핸들러](#5-messagebox와-이벤트-핸들러)
6. [WinForms vs 콘솔 앱 비교](#6-winforms-vs-콘솔-앱-비교)
7. [정리 및 C# 학습 로드맵](#7-정리-및-c-학습-로드맵)

---

## 1. 다중 클래스 설계

실제 프로젝트에서는 하나의 프로그램에 **여러 클래스가 협력**합니다.  
각 클래스는 **단일 책임 원칙(SRP)** 에 따라 하나의 역할만 담당하는 것이 좋습니다.

```
[마트 시스템]
  ├── Customer     (고객: 방문, 구매, 반품, 환불)
  ├── Employee     (직원: 출근, 판매, 재고관리, 퇴근)
  ├── Goods        (상품: 상품ID, 이름, 수량, 가격, 유통기한)
  └── Partnercompany (협력업체: 발주, 생산, 배달)
```

---

## 2. 실전 프로젝트: LM 재고 관리 시스템

### Goods 클래스 — 상품 정보

```csharp
// Goods.cs
using System;

namespace LMstockManagementSystm
{
    class Goods
    {
        public string   goodsId;          // 상품 ID
        public string   goodsName;        // 상품명
        public int      quantity;         // 수량
        public int      price;            // 가격
        public DateTime ExpirationDate;   // 유통기한
        public string   items;            // 품목 (유제품, 채소 등)
    }
}
```

### Customer 클래스 — 고객 행동

```csharp
// Customer.cs
using System;

namespace LMstockManagementSystm
{
    class Customer
    {
        public string custId;    // 고객 ID
        public string custName;  // 고객 이름
        public string resNum;    // 주민번호
        public string phone;     // 전화번호
        public string address;   // 주소
        public int    point;     // 포인트
        public string account;   // 계좌번호
        public int    stock;     // 구매 품목 수

        public void Visit()    { Console.WriteLine("어서오세요! 환영합니다~"); }
        public void Buy()      { Console.WriteLine("구매합니다. 감사합니다."); }
        public void Returnit() { Console.WriteLine("반품처리 합니다."); }
        public void Exchange() { Console.WriteLine("교환합니다. 또 이용해 주세요."); }
        public void Refund()   { Console.WriteLine("환불합니다. 환불금은 계좌로 입금해 드리겠습니다."); }
        public void Exit()     { Console.WriteLine("감사합니다! 또 방문해 주세요~"); }
    }
}
```

### Employee 클래스 — 직원 행동

```csharp
// Employee.cs
using System;

namespace LMstockManagementSystm
{
    class Employee
    {
        public string empId;      // 직원 ID
        public string empName;    // 직원 이름
        public string resNum;     // 주민번호
        public string sex;        // 성별
        public int    age;        // 나이
        public string phone;      // 전화번호
        public string address;    // 주소
        public string birthday;   // 생년월일
        public string account;    // 계좌번호
        public string job;        // 직급

        public void GoToWork()           { Console.WriteLine("근무자 확인. 출근이 확인되었습니다."); }
        public void Sell()               { Console.WriteLine("상품 판매를 시작합니다."); }
        public void Calculate()          { Console.WriteLine("금액 확인. 일치. 상품을 고객님께 드립니다."); }
        public void Dispose()            { Console.WriteLine("유통기한이 지난 상품. 폐기합니다."); }
        public void InventoryProcessing(){ Console.WriteLine("재고관리 시간입니다. 상품의 수량 확인"); }
        public void Cleaning()           { Console.WriteLine("퇴근 전 청소 시간입니다. 청소를 시작합니다."); }
        public void LeaveWork()          { Console.WriteLine("퇴근 시간입니다. 고생하셨습니다."); }
    }
}
```

### Partnercompany 클래스 — 협력업체

```csharp
// Partnercompany.cs
using System;

namespace LMstockManagementSystm
{
    class Partnercompany
    {
        public string companyName;    // 회사명
        public string phone;          // 전화번호
        public string businessnum;    // 사업자번호
        public string goodsName;      // 상품명
        public string account;        // 계좌번호
        public int    goodsQuantity;  // 물량

        public void Ordering()    { Console.WriteLine("상품 발주 요청이 들어왔습니다. 제품이 없으면 생산하시오."); }
        public void Produce()     { Console.WriteLine("제품이 없군요. 생산합니다."); }
        public void Collectmoney(){ Console.WriteLine("입금 확인 후 배달을 시작합니다."); }
        public void Delivery()    { Console.WriteLine("마트로 배달합니다."); }
    }
}
```

### Main 프로그램 — 클래스 인스턴스 활용

```csharp
// LMstockManagementSystm.cs
using System;

namespace LMstockManagementSystm
{
    class LMstockManagementSystm
    {
        static void Main(string[] args)
        {
            // 상품 등록
            Goods milk = new Goods();
            milk.goodsId   = "M001";
            milk.goodsName = "서울우유";
            milk.quantity  = 10;
            milk.price     = 2500;
            milk.items     = "유제품";
            milk.ExpirationDate = new DateTime(2026, 7, 1);

            Console.WriteLine($"{milk.goodsName}의 가격은 {milk.price}원입니다.");
            Console.WriteLine($"재고: {milk.quantity}개 / 유통기한: {milk.ExpirationDate:yyyy-MM-dd}");

            Console.WriteLine();

            // 고객 방문 시뮬레이션
            Customer customer = new Customer();
            customer.custName = "홍길동";
            customer.Visit();
            customer.Buy();
            customer.Exit();

            Console.WriteLine();

            // 직원 업무 시뮬레이션
            Employee emp = new Employee();
            emp.empName = "김영희";
            emp.GoToWork();
            emp.Sell();
            emp.LeaveWork();
        }
    }
}
```

**실행 결과:**
```
서울우유의 가격은 2500원입니다.
재고: 10개 / 유통기한: 2026-07-01

어서오세요! 환영합니다~
구매합니다. 감사합니다.
감사합니다! 또 방문해 주세요~

근무자 확인. 출근이 확인되었습니다.
상품 판매를 시작합니다.
퇴근 시간입니다. 고생하셨습니다.
```

---

## 3. 클래스 다이어그램 (UML)

소프트웨어 설계에서는 UML 클래스 다이어그램으로 클래스 관계를 시각화합니다.

```
┌─────────────────────┐    ┌──────────────────────┐
│      Customer        │    │       Employee        │
├─────────────────────┤    ├──────────────────────┤
│ + custId: string    │    │ + empId: string       │
│ + custName: string  │    │ + empName: string     │
│ + point: int        │    │ + job: string         │
├─────────────────────┤    ├──────────────────────┤
│ + Visit()           │    │ + GoToWork()          │
│ + Buy()             │    │ + Sell()              │
│ + Refund()          │    │ + LeaveWork()         │
└─────────────────────┘    └──────────────────────┘

┌─────────────────────┐    ┌──────────────────────┐
│        Goods         │    │   Partnercompany     │
├─────────────────────┤    ├──────────────────────┤
│ + goodsId: string   │    │ + companyName: string │
│ + goodsName: string │    │ + goodsQuantity: int  │
│ + quantity: int     │    ├──────────────────────┤
│ + price: int        │    │ + Ordering()          │
│ + ExpirationDate    │    │ + Delivery()          │
└─────────────────────┘    └──────────────────────┘
```

---

## 4. Windows Forms 입문

**Windows Forms(WinForms)** 는 C#으로 **GUI(그래픽 사용자 인터페이스) 앱**을 만드는 기술입니다.

### 프로젝트 구성

WinForms 프로젝트를 만들면 자동으로 생성되는 파일들:

| 파일 | 역할 |
|------|------|
| `Program.cs` | 앱의 진입점, `Application.Run()` |
| `Form1.cs` | 폼(창) 코드 로직 |
| `Form1.Designer.cs` | 디자이너가 자동 생성하는 UI 코드 |

### Program.cs

```csharp
using System;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    static class Program
    {
        [STAThread]  // Windows UI는 단일 스레드 방식
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());  // Form1을 메인 창으로 실행
        }
    }
}
```

---

## 5. MessageBox와 이벤트 핸들러

### Form1.cs — 버튼 클릭 이벤트

```csharp
using System;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();  // 디자이너가 만든 UI 초기화
        }

        // button1을 클릭했을 때 실행되는 이벤트 핸들러
        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("안녕하소~");
        }

        // button2를 클릭했을 때 실행
        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show("안녕히 가소~");
        }
    }
}
```

### 이벤트 핸들러 이해하기

WinForms는 **이벤트 기반 프로그래밍(Event-Driven)** 방식입니다.

```
[사용자 행동]     →    [이벤트 발생]    →   [핸들러 실행]
  버튼 클릭        button1.Click        button1_Click()
  키 입력          KeyDown             Form1_KeyDown()
  창 닫기          FormClosing         Form1_FormClosing()
```

### MessageBox 옵션

```csharp
// 단순 메시지
MessageBox.Show("안녕하세요!");

// 제목 + 메시지
MessageBox.Show("내용", "제목");

// 버튼 옵션 + 아이콘
DialogResult result = MessageBox.Show(
    "정말 종료하겠습니까?",
    "확인",
    MessageBoxButtons.YesNo,
    MessageBoxIcon.Question
);

if (result == DialogResult.Yes)
{
    Application.Exit();  // 앱 종료
}
```

---

## 6. WinForms vs 콘솔 앱 비교

| 항목 | 콘솔 앱 | Windows Forms |
|------|---------|---------------|
| 출력 방식 | `Console.WriteLine()` | `Label.Text`, `TextBox.Text` |
| 입력 방식 | `Console.ReadLine()` | `TextBox`, `Button 클릭` |
| 실행 흐름 | 순차 실행 | 이벤트 기반 (대기 → 이벤트 → 처리) |
| 적합한 용도 | 빠른 프로토타입, 백엔드 | 데스크톱 GUI 앱 |
| 학습 난이도 | 낮음 | 중간 |

---

## 7. 정리 및 C# 학습 로드맵

### 7강 핵심 정리

| 개념 | 핵심 내용 |
|------|----------|
| **다중 클래스** | 역할별로 클래스를 분리해 설계 |
| **인스턴스 협력** | 여러 클래스 인스턴스가 Main에서 조율 |
| **WinForms** | `Form` + 컨트롤 + 이벤트 핸들러 |
| **이벤트** | 사용자 행동 → 이벤트 발생 → 핸들러 실행 |
| **MessageBox** | 사용자에게 메시지/확인 대화상자 표시 |

### C# 학습 로드맵

```
[1강] 변수·자료형·형변환
  ↓
[2강] 조건문 (if, switch)
  ↓
[3강] 반복문 (for, while, foreach)
  ↓
[4강] while 심화 · 메뉴 시스템
  ↓
[5강] List<T> · Random
  ↓
[6강] 클래스 · 메서드 · static · 오버로딩
  ↓
[7강] 다중 클래스 설계 · Windows Forms ← 현재 위치
  ↓
[다음 단계]
  - 상속(Inheritance) & 다형성(Polymorphism)
  - 인터페이스(Interface)
  - 예외 처리(try-catch)
  - LINQ (Language Integrated Query)
  - 비동기 프로그래밍 (async/await)
  - WPF 또는 MAUI (현대적 GUI)
```

> 🎉 **7강 완료!** 콘솔 프로그래밍의 핵심 개념부터 다중 클래스 설계, Windows Forms GUI까지 C#의 기초를 모두 마쳤습니다. 다음 단계로 **상속과 다형성**을 학습하면 더욱 강력한 객체 지향 프로그래밍이 가능합니다!
