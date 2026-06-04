---
layout: post
title: "[2강] SELECT 완전정복: WHERE, ORDER BY, LIKE, NULL"
subtitle: "SemiconDB로 배우는 정밀한 데이터 조회 기술"
categories: [Database]
tags: [DB, SQL, SELECT, WHERE, ORDER BY, LIKE, NULL, SemiconDB]
author: min oh
comments: true
---

데이터베이스에는 수만 건의 데이터가 쌓입니다. 그 중에서 **지금 당장 필요한 데이터만 정확하게 골라내는 것**이 SQL의 첫 번째 능력입니다. 이번 강에서는 SemiconDB를 활용하여 `WHERE`, `ORDER BY`, `LIKE`, `NULL` 처리, `LIMIT`까지 SELECT의 핵심 기능을 완전히 정복해 보겠습니다.

---

## 1. SELECT 기본 문법

```sql
SELECT 컬럼1, 컬럼2      -- 어떤 컬럼을 볼지
FROM   테이블명           -- 어느 테이블에서
WHERE  조건               -- 어떤 조건으로 필터링
ORDER BY 컬럼 ASC/DESC    -- 어떻게 정렬
LIMIT  숫자;              -- 몇 개까지
```

### AS로 컬럼에 별칭 붙이기

```sql
-- model_name을 '장비명'으로, status를 '상태'로 표시
SELECT model_name AS 장비명, 
       install_date AS 설치일, 
       status AS 상태
FROM Equipment;
```

---

## 2. WHERE 절: 조건 필터링

### 2.1 기본 비교 연산자

```sql
-- active 상태 장비만 조회
SELECT * FROM Equipment WHERE status = 'active';

-- retired 상태가 아닌 장비 조회
SELECT * FROM Equipment WHERE status != 'retired';

-- 2022년 이후 설치된 장비 조회
SELECT * FROM Equipment WHERE install_date >= '2022-01-01';
```

### 2.2 BETWEEN: 범위 조건

```sql
-- 2024년 3월 1일 ~ 3월 10일 사이의 사용 기록
SELECT * FROM UsageLog 
WHERE use_date BETWEEN '2024-03-01' AND '2024-03-10';

-- 위와 동일한 결과 (AND로 표현)
SELECT * FROM UsageLog 
WHERE use_date >= '2024-03-01' AND use_date <= '2024-03-10';
```

### 2.3 IN: 여러 값 중 하나

```sql
-- 품질팀 또는 제조팀 사용자 조회
SELECT * FROM EquipmentUser 
WHERE department IN ('품질팀', '제조팀');

-- 장비 101, 103, 105 중 하나인 사용 기록
SELECT * FROM UsageLog 
WHERE equipment_id IN (101, 103, 105);
```

### 2.4 AND / OR 조합

```sql
-- active 상태이면서 2022년 이후 설치된 장비
SELECT * FROM Equipment 
WHERE status = 'active' AND install_date >= '2022-01-01';

-- maintenance 또는 retired 상태인 장비
SELECT * FROM Equipment 
WHERE status = 'maintenance' OR status = 'retired';
-- 더 간결하게: WHERE status IN ('maintenance', 'retired')
```

> [!TIP]
> `AND`가 `OR`보다 연산 우선순위가 높습니다. 복잡한 조건은 반드시 괄호로 묶어 의도를 명확히 하세요!
> ```sql
> WHERE (status = 'active' OR status = 'maintenance') AND install_date >= '2022-01-01'
> ```

---

## 3. LIKE: 패턴 매칭

| 와일드카드 | 의미 | 예시 |
|-----------|------|------|
| `%` | 0개 이상의 임의 문자 | `'ETCH%'` → ETCH로 시작하는 모든 것 |
| `_` | 정확히 1개의 임의 문자 | `'CVD-_200'` → CVD-A200, CVD-B200... |

```sql
-- 모델명에 'ETCH'가 들어가는 장비 (앞뒤 어디든)
SELECT * FROM Equipment WHERE model_name LIKE '%ETCH%';

-- 'LITHO'로 시작하는 장비
SELECT * FROM Equipment WHERE model_name LIKE 'LITHO%';

-- 모델명이 정확히 9자리이고 '-A'를 포함하는 장비
SELECT * FROM Equipment WHERE model_name LIKE '____-A___';

-- '팀'으로 끝나는 부서
SELECT DISTINCT department FROM EquipmentUser WHERE department LIKE '%팀';
```

---

## 4. IS NULL / IS NOT NULL: NULL 처리

`NULL`은 **값이 없음**을 의미합니다. `=`으로는 비교할 수 없고 반드시 `IS NULL` / `IS NOT NULL`을 사용해야 합니다.

```sql
-- 이슈 보고가 없는(정상) 사용 기록만 조회
SELECT * FROM UsageLog WHERE issue_report IS NULL;

-- 이슈가 보고된 기록만 조회
SELECT * FROM UsageLog WHERE issue_report IS NOT NULL;

-- NULL과 = 비교하면 아무것도 안 나온다! (잘못된 예)
-- SELECT * FROM UsageLog WHERE issue_report = NULL;  -- ❌ 결과 없음!
```

> [!IMPORTANT]
> **NULL은 = NULL로 비교하면 절대 안 됩니다!**
> NULL은 "알 수 없는 값"이기 때문에, NULL = NULL도 TRUE가 아닙니다.
> 반드시 `IS NULL` 또는 `IS NOT NULL`을 사용하세요.

---

## 5. ORDER BY: 정렬

```sql
-- 장비를 설치일 최신순으로 정렬 (내림차순)
SELECT * FROM Equipment ORDER BY install_date DESC;

-- 장비를 설치일 오래된 순으로 정렬 (오름차순, 기본값)
SELECT * FROM Equipment ORDER BY install_date ASC;

-- 다중 정렬: 상태(오름차순)로 먼저 묶고, 같은 상태 내에서는 설치일 최신순
SELECT * FROM Equipment 
ORDER BY status ASC, install_date DESC;
```

### 정렬 결과 미리보기

```sql
-- status: active > maintenance > retired (알파벳순)
-- 같은 status 내에서는 최신 장비가 먼저
SELECT model_name, status, install_date FROM Equipment 
ORDER BY status, install_date DESC;
```

---

## 6. LIMIT: 결과 개수 제한

```sql
-- 가장 최근에 설치된 장비 3대만 조회
SELECT * FROM Equipment 
ORDER BY install_date DESC 
LIMIT 3;

-- 가장 최근 사용 기록 5건
SELECT * FROM UsageLog 
ORDER BY use_date DESC 
LIMIT 5;
```

---

## 7. 실전 예제: 복합 조건 쿼리

### 예제 1: 이상이 보고된 최근 5건

```sql
SELECT log_id, user_id, equipment_id, use_date, issue_report
FROM UsageLog
WHERE issue_report IS NOT NULL
ORDER BY use_date DESC
LIMIT 5;
```

### 예제 2: active 장비 중 2022년 이후 도입된 것

```sql
SELECT model_name, install_date
FROM Equipment
WHERE status = 'active' 
  AND install_date >= '2022-01-01'
ORDER BY install_date DESC;
```

### 예제 3: 품질팀 직원의 사용 기록 (user_id로 필터링)

```sql
-- 품질팀 user_id: 1번(김지훈), 3번(이준호)
SELECT * FROM UsageLog
WHERE user_id IN (1, 3)
  AND use_date BETWEEN '2024-03-01' AND '2024-03-15'
ORDER BY use_date ASC;
```

### 예제 4: ETCH 계열 장비의 이슈 발생 기록

```sql
-- ETCH로 시작하는 장비의 equipment_id = 101
SELECT u.log_id, u.use_date, u.issue_report
FROM UsageLog AS u
WHERE u.equipment_id IN (
    SELECT equipment_id FROM Equipment WHERE model_name LIKE 'ETCH%'
)
AND u.issue_report IS NOT NULL
ORDER BY u.use_date DESC;
```

---

## 8. SELECT 문법 핵심 정리

| 기능 | 문법 | 사용 시기 |
|------|------|-----------|
| 전체 조회 | `SELECT *` | 개발/디버깅 시 |
| 특정 컬럼 | `SELECT col1, col2` | 실무 (성능 최적화) |
| 조건 필터 | `WHERE 조건` | 원하는 행만 선택 |
| 범위 조건 | `BETWEEN A AND B` | 날짜, 숫자 범위 |
| 복수 값 | `IN (값1, 값2)` | 여러 값 중 하나 |
| 패턴 검색 | `LIKE '%패턴%'` | 문자 포함 여부 |
| NULL 검사 | `IS NULL / IS NOT NULL` | 빈 값 처리 |
| 정렬 | `ORDER BY col DESC` | 결과 순서 지정 |
| 개수 제한 | `LIMIT n` | 상위 n개만 출력 |

다음 강에서는 데이터를 **그룹으로 묶어 통계를 내는** `GROUP BY`와 `HAVING`의 원리와 SQL 실행 순서에 대해 심층적으로 다뤄보겠습니다.
