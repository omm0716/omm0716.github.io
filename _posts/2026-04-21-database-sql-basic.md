---
layout: post
title: "SQL 기초: 데이터 조작 및 조회 (CRUD)"
subtitle: "INSERT, SELECT, UPDATE, DELETE 마스터하기"
category: Database
tags: [DB, SQL, 기초]
author: min oh
comments: true
---

SQL의 가장 핵심은 데이터를 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)하는 것입니다. 이를 줄여서 **CRUD**라고 부릅니다.

---

## 1. 테이블 생성 (CREATE)
데이터를 저장하기 전, 어떤 종류의 데이터를 담을지 형식을 정해야 합니다.

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY, -- 고유 식별자
    name VARCHAR(20) NOT NULL,          -- 이름 (필수)
    age INT,                            -- 나이
    major VARCHAR(20)                   -- 전공
);
```

---

## 2. 데이터 추가 (INSERT)
생성된 테이블에 실제 데이터를 넣는 단계입니다.

```sql
INSERT INTO students (name, age, major) 
VALUES ('김철수', 20, '컴퓨터공학'), ('이만수', 21, '전자공학');
```

---

## 3. 데이터 조회 (SELECT)
저장된 데이터를 불러오는 가장 중요한 명령입니다.

```sql
-- 모든 데이터 조회
SELECT * FROM students;

-- 특정 전공 학생만 조회
SELECT * FROM students WHERE major = '컴퓨터공학';

-- 나이순으로 정렬 (오름차순)
SELECT * FROM students ORDER BY age ASC;
```

---

## 4. 데이터 수정 (UPDATE)
이미 저장된 값을 바꿀 때 사용합니다.

```sql
-- ID가 1인 학생의 전공을 변경
UPDATE students SET major = '영문학' WHERE id = 1;
```

---

## 5. 데이터 삭제 (DELETE)
불필요한 데이터를 삭제합니다.

```sql
-- ID가 6인 데이터 삭제
DELETE FROM students WHERE id = 6;
```

> [!CAUTION]
> `UPDATE`와 `DELETE`를 사용할 때는 반드시 `WHERE` 절을 확인하세요. 조건이 없으면 테이블 전체 데이터가 수정되거나 삭제될 수 있습니다.
