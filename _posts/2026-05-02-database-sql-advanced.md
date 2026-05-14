---
layout: post
title: "SQL 고급: JOIN과 서브쿼리로 데이터 재구성하기"
subtitle: "장비 상태와 사용자 정보를 하나로 묶는 테이블 결합 기술"
categories: [Database]
tags: [DB, SQL, JOIN, 서브쿼리]
author: min oh
comments: true
---

실제 데이터베이스에서 우리가 원하는 정보는 여러 테이블에 흩어져 있는 경우가 많습니다. "어떤 장비가 누구에 의해 사용되었고, 그 장비의 현재 상태는 무엇인가?"와 같은 질문에 답하려면 테이블을 결합하는 **JOIN**과 중첩 쿼리인 **서브쿼리**를 정복해야 합니다.

---

## 1. 테이블 결합의 핵심: JOIN
반도체 장비 관리 시스템(SemiconDB)의 세 테이블을 결합하여 의미 있는 정보를 만들어 보겠습니다.

### INNER JOIN (내부 조인)
두 테이블 모두에 공통된 데이터가 있을 때만 결합합니다. 장비 사용 기록과 해당 장비의 모델명을 함께 보고 싶을 때 사용합니다.
```sql
SELECT u.log_id, e.model_name, u.use_date
FROM UsageLog AS u
INNER JOIN Equipment AS e ON u.equipment_id = e.equipment_id;
```

### LEFT JOIN (외부 조인)
왼쪽 테이블의 모든 데이터를 보존하면서 오른쪽 테이블을 결합합니다. **"한 번도 사용되지 않은 장비를 포함한 모든 장비 리스트"**를 뽑을 때 필수적입니다.
```sql
SELECT e.model_name, u.use_date
FROM Equipment AS e
LEFT JOIN UsageLog AS u ON e.equipment_id = u.equipment_id;
-- 사용 기록이 없는 장비는 use_date 자리에 NULL이 표시됩니다.
```

---

## 2. 쿼리 속의 쿼리: 서브쿼리 (Subquery)
복잡한 조건을 처리할 때 쿼리문을 중첩해서 사용할 수 있습니다.

### 단일 행 서브쿼리
"가장 최근에 도입된 장비의 사용 기록만 보고 싶다"면 어떻게 해야 할까요?
```sql
SELECT * FROM UsageLog
WHERE equipment_id = (SELECT equipment_id FROM Equipment ORDER BY install_date DESC LIMIT 1);
```

### IN 연산자와 서브쿼리
"품질팀 소속 사용자들이 사용한 장비 목록"을 조회합니다.
```sql
SELECT DISTINCT model_name FROM Equipment
WHERE equipment_id IN (
    SELECT equipment_id FROM UsageLog 
    WHERE user_id IN (SELECT user_id FROM EquipmentUser WHERE department = '품질팀')
);
```

---

## 3. 실무 응용: 가상 테이블 'VIEW'와 성능 최적화 'INDEX'
복잡한 JOIN 문을 매번 작성하기 번거롭다면 **VIEW**를 만들어 편리하게 관리할 수 있습니다.

### 편리한 조회를 위한 VIEW 생성
```sql
CREATE VIEW EquipmentSummary AS
SELECT u.log_id, e.model_name, usr.name AS operator_name, u.use_date, u.issue_report
FROM UsageLog u
JOIN Equipment e ON u.equipment_id = e.equipment_id
JOIN EquipmentUser usr ON u.user_id = usr.user_id;

-- 이후에는 아주 간단하게 조회 가능
SELECT * FROM EquipmentSummary WHERE issue_report IS NOT NULL;
```

### 대용량 데이터 검색을 위한 INDEX
수백만 건의 로그 데이터가 쌓였다면, `use_date` 컬럼에 인덱스를 걸어 조회 속도를 획기적으로 높일 수 있습니다.
```sql
CREATE INDEX idx_use_date ON UsageLog(use_date);
```

---

데이터베이스는 단순히 정보를 저장하는 금고가 아니라, 적절한 질문(Query)을 던져 가치 있는 인사이트를 뽑아내는 **지식의 창고**입니다. 반도체 장비 데이터를 활용한 이번 실습이 여러분의 SQL 실력 향상에 큰 도움이 되었기를 바랍니다!
