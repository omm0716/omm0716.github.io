---
layout: post
title: "SQL 중급: GROUP BY와 HAVING으로 통계 데이터 추출하기"
subtitle: "장비별 사용 횟수와 오류 발생 빈도 분석"
categories: [Database]
tags: [DB, SQL, 통계, GROUP BY]
author: min oh
comments: true
---

단순한 개별 데이터 조회에서 나아가, 전체적인 흐름을 파악하기 위해서는 데이터를 그룹화하고 요약하는 기술이 필요합니다. 이번 포스트에서는 **GROUP BY**와 **HAVING**의 핵심 개념을 반도체 장비 관리 시나리오에 적용해 보겠습니다.

---

## 1. 데이터 그룹화: GROUP BY
`GROUP BY`는 특정 컬럼의 값이 같은 데이터들을 하나로 묶어줍니다. 이때 보통 집계 함수(`COUNT`, `SUM`, `AVG`, `MAX`, `MIN`)와 함께 사용됩니다.

### 장비별 총 사용 횟수 조회
어떤 장비가 가장 빈번하게 가동되는지 확인해 봅시다.
```sql
SELECT equipment_id, COUNT(*) AS 사용횟수 
FROM UsageLog 
GROUP BY equipment_id;
```

### 사용자별 최근 사용일 확인
각 담당자가 마지막으로 장비를 다룬 날짜를 파악합니다.
```sql
SELECT user_id, MAX(use_date) AS 최근사용일 
FROM UsageLog 
GROUP BY user_id;
```

---

## 2. 그룹화 데이터 필터링: HAVING 절
많은 분이 `WHERE`와 `HAVING`을 헷갈려합니다. 
- **WHERE**: 그룹화하기 **전**에 개별 데이터를 필터링합니다.
- **HAVING**: 그룹화가 완료된 **후**의 결과값(집계 결과)을 필터링합니다.

### 사용 횟수가 2회 이상인 '우수 가동' 장비 조회
```sql
SELECT equipment_id, COUNT(*) AS 사용횟수 
FROM UsageLog 
GROUP BY equipment_id 
HAVING COUNT(*) >= 2; -- 그룹화된 결과에 대한 조건
```

### 문제 보고가 1건 이상 발생한 '주의' 장비 조회
```sql
SELECT equipment_id, COUNT(issue_report) AS 문제발생건수 
FROM UsageLog 
GROUP BY equipment_id 
HAVING COUNT(issue_report) >= 1;
```

---

## 3. 복합 쿼리: WHERE + GROUP BY + HAVING
세 절을 모두 사용하여 정교한 통계를 낼 수 있습니다.
- **상황**: "2024년 3월 5일 이후의 기록 중, 사용 횟수가 2회 이상인 사용자 목록을 보여주세요."

```sql
SELECT user_id, COUNT(*) AS 사용횟수 
FROM UsageLog 
WHERE use_date >= '2024-03-05' -- 1. 먼저 날짜로 필터링
GROUP BY user_id                -- 2. 사용자별로 그룹화
HAVING COUNT(*) >= 2           -- 3. 그룹화된 결과 중 2회 이상인 것만 선택
ORDER BY 사용횟수 DESC;          -- 4. 보기 좋게 정렬
```

> [!NOTE]
> 쿼리 실행 순서: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**
> 이 순서를 이해하면 복잡한 쿼리도 실수 없이 작성할 수 있습니다.

데이터를 묶고 필터링하는 능력을 갖추면 데이터베이스를 단순한 저장소가 아닌 **분석 도구**로 활용할 수 있게 됩니다. 다음 시간에는 흩어진 테이블을 하나로 합치는 **JOIN**의 마법에 대해 알아보겠습니다.
