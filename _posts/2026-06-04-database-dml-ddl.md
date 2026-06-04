---
layout: post
title: "[5강] 데이터 조작과 구조 변경: DML + DDL 완전 가이드"
subtitle: "INSERT·UPDATE·DELETE로 데이터 다루고, CREATE·ALTER로 구조 설계하기"
categories: [Database]
tags: [DB, SQL, DML, DDL, INSERT, UPDATE, DELETE, CREATE, ALTER, 제약조건, SemiconDB]
author: min oh
comments: true
---

지금까지는 데이터를 **읽는(SELECT)** 방법을 배웠습니다. 이제 데이터를 **쓰고, 고치고, 지우는** DML(Data Manipulation Language)과 테이블 구조 자체를 **설계하고 변경하는** DDL(Data Definition Language)을 배워보겠습니다. 반도체 장비 데이터를 직접 조작하며 익혀봅시다.

---

## 1. DML: 데이터 조작어

DML은 테이블 안의 **데이터(행)**를 다루는 명령어입니다.

| 명령어 | 기능 |
|--------|------|
| `INSERT` | 새로운 행 추가 |
| `UPDATE` | 기존 행 수정 |
| `DELETE` | 기존 행 삭제 |

---

## 2. INSERT: 데이터 추가

### 2.1 기본 문법

```sql
-- 방법 1: 모든 컬럼에 순서대로 값 입력 (컬럼 목록 생략)
INSERT INTO 테이블명 VALUES (값1, 값2, 값3, ...);

-- 방법 2: 컬럼 목록을 명시하여 입력 (순서 상관 없음, 일부 컬럼만도 가능)
INSERT INTO 테이블명 (컬럼1, 컬럼2) VALUES (값1, 값2);
```

### 2.2 SemiconDB INSERT 실습

```sql
-- 새로운 사용자 추가 (모든 컬럼)
INSERT INTO EquipmentUser VALUES (6, '김지후', '생산기술팀', '010-6789-1111');

-- 새로운 장비 추가
INSERT INTO Equipment VALUES (106, 'CVD-C900', '2024-03-20', 'active');

-- 새로운 사용 기록 추가 (문제 보고 없음 = NULL)
INSERT INTO UsageLog VALUES (12, 6, 106, '2024-03-18', NULL);

-- 일부 컬럼만 입력 (나머지는 NULL 또는 DEFAULT)
INSERT INTO EquipmentUser (user_id, name, department)
VALUES (7, '한소라', '품질팀');
-- contact는 입력하지 않았으므로 NULL
```

### 2.3 INSERT 시 주의사항

```sql
-- ❌ 오류: 존재하지 않는 user_id로 UsageLog 삽입 불가 (FK 제약)
INSERT INTO UsageLog VALUES (13, 999, 101, '2024-03-20', NULL);
-- Error: Cannot add or update a child row: a foreign key constraint fails

-- ✅ 정상: FK에 맞는 user_id 사용
INSERT INTO UsageLog VALUES (13, 6, 101, '2024-03-20', NULL);
```

---

## 3. UPDATE: 데이터 수정

### 3.1 기본 문법

```sql
UPDATE 테이블명
SET 컬럼1 = 새값1, 컬럼2 = 새값2
WHERE 조건;
```

> [!CAUTION]
> **`WHERE` 절을 빠뜨리면 테이블의 모든 행이 수정됩니다!**
> UPDATE 전에 반드시 `SELECT`로 영향받을 행을 먼저 확인하세요.

### 3.2 UPDATE 실습

```sql
-- 장비 106번 상태를 'maintenance'로 변경
UPDATE Equipment 
SET status = 'maintenance' 
WHERE equipment_id = 106;

-- 사용자 7번 부서 변경
UPDATE EquipmentUser 
SET department = '개발팀' 
WHERE user_id = 7;

-- 사용 기록 12번의 이슈 내용 수정
UPDATE UsageLog 
SET issue_report = '초기 테스트 완료' 
WHERE log_id = 12;

-- 여러 컬럼 동시 수정
UPDATE EquipmentUser 
SET department = '품질팀', contact = '010-7890-2222'
WHERE user_id = 7;
```

---

## 4. DELETE: 데이터 삭제

### 4.1 기본 문법

```sql
DELETE FROM 테이블명
WHERE 조건;
```

### 4.2 외래키(FK)가 있을 때의 삭제

```sql
-- ✅ 정상: 사용 기록이 없는 사용자는 삭제 가능
DELETE FROM EquipmentUser WHERE user_id = 7;  -- UsageLog에 기록 없음

-- ❌ 오류: 사용 기록이 있는 사용자는 삭제 불가!
DELETE FROM EquipmentUser WHERE user_id = 6;
-- Error: Cannot delete or update a parent row: a foreign key constraint fails
```

> [!IMPORTANT]
> **FK 오류가 발생하는 이유**: `UsageLog`가 `EquipmentUser`를 참조하고 있기 때문에, 참조되는 데이터(부모)를 먼저 삭제하면 자식 데이터가 고아(Orphan)가 됩니다. MySQL은 이를 방지합니다.
>
> **해결 방법**: 자식 테이블(UsageLog)에서 해당 데이터를 먼저 삭제한 뒤, 부모 테이블을 삭제합니다.
> ```sql
> DELETE FROM UsageLog WHERE user_id = 6;      -- 자식 먼저
> DELETE FROM EquipmentUser WHERE user_id = 6; -- 부모 나중에
> ```

---

## 5. DDL: 데이터 정의어

DDL은 테이블의 **구조(스키마)**를 정의하고 변경합니다.

| 명령어 | 기능 |
|--------|------|
| `CREATE TABLE` | 새 테이블 생성 |
| `ALTER TABLE` | 기존 테이블 구조 변경 |
| `DROP TABLE` | 테이블 삭제 |

---

## 6. CREATE TABLE: 제약조건 완전 가이드

```sql
CREATE TABLE NewBook (
    bookname   VARCHAR(20) NOT NULL,       -- NULL 불허
    publisher  VARCHAR(20) UNIQUE,         -- 중복 불허
    price      INTEGER DEFAULT 10000       -- 기본값 설정
               CHECK(price >= 1000),       -- 값 범위 제한
    PRIMARY KEY (bookname, publisher)      -- 복합 기본키
);
```

### 6.1 주요 제약조건 설명

| 제약조건 | 의미 | 예시 |
|---------|------|------|
| `PRIMARY KEY` | 유일하고 NULL 아닌 식별자 | `user_id INT PRIMARY KEY` |
| `NOT NULL` | NULL 값 저장 불가 | `name VARCHAR(20) NOT NULL` |
| `UNIQUE` | 중복값 저장 불가 (NULL은 허용) | `contact VARCHAR(50) UNIQUE` |
| `DEFAULT 값` | 입력 없을 때 기본값 사용 | `status VARCHAR(20) DEFAULT 'active'` |
| `CHECK(조건)` | 조건에 맞는 값만 허용 | `price INT CHECK(price >= 0)` |
| `FOREIGN KEY` | 다른 테이블 PK 참조 | 아래 예시 참고 |

### 6.2 ON DELETE CASCADE

부모 테이블 데이터 삭제 시, 자식 데이터도 함께 삭제합니다.

```sql
CREATE TABLE NewOrders (
    orderid   INTEGER PRIMARY KEY,
    custid    INTEGER NOT NULL,
    saleprice INTEGER,
    orderdate DATE,
    FOREIGN KEY (custid)
        REFERENCES NewCustomer(custid)
        ON DELETE CASCADE  -- 고객 삭제 시 주문도 자동 삭제
);
```

### 6.3 MaintenanceLog 테이블 생성 실습

```sql
-- 반도체 장비 유지보수 이력 테이블
CREATE TABLE MaintenanceLog (
    maintenance_id   INT PRIMARY KEY,
    equipment_id     INT NOT NULL,
    maintenance_date DATE NOT NULL,
    engineer_name    VARCHAR(50) NOT NULL,
    maintenance_type VARCHAR(30) NOT NULL,  -- '정기점검', '수리', '긴급수리' 등
    details          VARCHAR(255),           -- NULL 허용 (선택사항)
    FOREIGN KEY (equipment_id) REFERENCES Equipment(equipment_id)
);
```

---

## 7. ALTER TABLE: 테이블 구조 변경

### 7.1 컬럼 추가

```sql
-- Equipment 테이블에 'location' 컬럼 추가
ALTER TABLE Equipment ADD location VARCHAR(50);

-- NewBook에 bookid 컬럼 추가
ALTER TABLE NewBook ADD bookid INTEGER;
```

### 7.2 기본키 변경

```sql
-- 기존 기본키 제거
ALTER TABLE NewBook DROP PRIMARY KEY;

-- 새로운 기본키 설정
ALTER TABLE NewBook ADD PRIMARY KEY (bookid);
```

### 7.3 외래키 추가

```sql
-- NewOrders의 bookid에 외래키 추가
ALTER TABLE NewOrders
ADD CONSTRAINT fk_book
FOREIGN KEY (bookid) REFERENCES NewBook(bookid);
```

### 7.4 컬럼 수정 / 삭제

```sql
-- 컬럼 타입 변경
ALTER TABLE Equipment MODIFY status VARCHAR(30);

-- 컬럼 삭제
ALTER TABLE Equipment DROP COLUMN location;
```

---

## 8. DDL 제약조건 실습: 전체 시나리오

```sql
-- 0. 기존 테이블 삭제 (역순으로)
DROP TABLE IF EXISTS NewOrders;
DROP TABLE IF EXISTS NewBook;
DROP TABLE IF EXISTS NewCustomer;

-- 1. 고객 테이블
CREATE TABLE NewCustomer (
    custid  INTEGER PRIMARY KEY,
    name    VARCHAR(40),
    address VARCHAR(40),
    phone   VARCHAR(30)
);

-- 2. 도서 테이블 (다양한 제약조건 적용)
CREATE TABLE NewBook (
    bookname  VARCHAR(20) NOT NULL,
    publisher VARCHAR(20) UNIQUE,
    price     INTEGER DEFAULT 10000 CHECK(price >= 1000),
    PRIMARY KEY (bookname, publisher)
);

-- 3. 주문 테이블 (ON DELETE CASCADE 포함)
CREATE TABLE NewOrders (
    orderid   INTEGER PRIMARY KEY,
    custid    INTEGER NOT NULL,
    bookid    INTEGER,
    saleprice INTEGER,
    orderdate DATE,
    FOREIGN KEY (custid) REFERENCES NewCustomer(custid) ON DELETE CASCADE
);

-- 데이터 입력 테스트
INSERT INTO NewCustomer VALUES (1, 'Alice', 'Seoul', '010-1111-1111');
INSERT INTO NewBook VALUES ('SQL입문', '한빛출판사', 15000);

-- DEFAULT 적용 테스트 (price 생략 → 10000)
INSERT INTO NewBook (bookname, publisher) VALUES ('AI개론', '위키북스');

-- CHECK 위반 테스트 (price < 1000 → 오류!)
-- INSERT INTO NewBook VALUES ('파이썬', '이지스퍼블리싱', 500);  -- ❌ 오류
```

---

## 9. DML vs DDL 한눈에 비교

| 구분 | 명령어 | 대상 | 트랜잭션 |
|------|--------|------|---------|
| DML | INSERT, UPDATE, DELETE | 테이블 내의 **데이터(행)** | 롤백 가능 |
| DDL | CREATE, ALTER, DROP | 테이블의 **구조(스키마)** | 자동 커밋 (롤백 불가) |

> [!WARNING]
> DDL은 실행하면 자동으로 커밋됩니다. `DROP TABLE`은 **되돌릴 수 없으므로** 신중하게 실행하세요!

다음 강에서는 지금까지 배운 모든 것을 활용하여 **SemiconDB를 실제 현업 수준으로 확장**하고, 복잡한 데이터를 해석하는 "데이터 읽기 훈련"을 해보겠습니다.
