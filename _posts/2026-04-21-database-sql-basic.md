---
layout: post
title: "SQL 기초: WHERE와 ORDER BY로 원하는 데이터 추출하기"
subtitle: "반도체 장비 데이터 필터링과 정렬 기법"
categories: [Database]
tags: [DB, SQL, 기초, 필터링]
author: min oh
comments: true
---

데이터베이스에는 수만 건의 데이터가 쌓일 수 있습니다. 그중에서 우리가 당장 필요한 데이터(예: 이번 달 발생한 오류 로그)만 골라내는 능력이 무엇보다 중요합니다. **WHERE**와 **ORDER BY**를 활용한 실무적인 데이터 추출법을 알아봅니다.

---

## 1. 정밀한 조건 필터링: WHERE 절
`WHERE` 절은 특정 조건을 만족하는 행(Row)만 골라낼 때 사용합니다.

### 날짜 범위 조회 (BETWEEN)
2024년 3월 초에 발생한 로그만 확인하고 싶을 때 유용합니다.
```sql
SELECT * FROM UsageLog 
WHERE use_date BETWEEN '2024-03-01' AND '2024-03-10';
```

### 패턴 매칭 (LIKE)
모델명에 'ETCH'가 들어가는 장비만 찾고 싶을 때 `%` 와일드카드를 사용합니다.
```sql
SELECT * FROM Equipment 
WHERE model_name LIKE 'ETCH%'; -- 'ETCH'로 시작하는 모든 모델
```

### NULL 값 체크 (IS NULL / IS NOT NULL)
이슈 보고(`issue_report`)가 없는 깨끗한 기록만 조회하고 싶다면 `NULL` 체크가 필수입니다.
```sql
SELECT * FROM UsageLog 
WHERE issue_report IS NULL;
```

---

## 2. 데이터 정렬의 정석: ORDER BY 절
조회된 데이터를 보기 좋게 정렬하면 의사결정이 빨라집니다.

### 다중 정렬 기준
먼저 장비 상태(`status`)별로 묶고, 같은 상태라면 도입일(`install_date`)이 최신인 순서대로 정렬해 보겠습니다.
```sql
SELECT * FROM Equipment 
ORDER BY status ASC, install_date DESC;
-- ASC: 오름차순 (A-Z, 오래된 날짜)
-- DESC: 내림차순 (Z-A, 최신 날짜)
```

### 상위 데이터 제한 (LIMIT)
가장 최근에 도입된 장비 3대만 확인하고 싶을 때 사용합니다.
```sql
SELECT * FROM Equipment 
ORDER BY install_date DESC 
LIMIT 3;
```

---

## 3. 실무 예제: "문제가 보고된 품질팀의 사용 기록 찾기"
여러 조건을 조합하여 복잡한 상황에 대응할 수 있습니다.
```sql
SELECT * FROM UsageLog 
WHERE issue_report IS NOT NULL 
  AND user_id IN (SELECT user_id FROM EquipmentUser WHERE department = '품질팀')
ORDER BY use_date DESC;
```

단순한 조회를 넘어, 비즈니스 로직을 쿼리에 녹여내는 것이 SQL 활용의 핵심입니다. 다음 시간에는 데이터를 뭉쳐서 통계를 내는 **GROUP BY**와 **HAVING**에 대해 깊이 있게 다뤄보겠습니다.
