---
layout: post
title: "SQL 심화: 서브쿼리, 뷰, 인덱스"
subtitle: "복잡한 쿼리와 성능 최적화의 핵심"
categories: [Database]
tags: [DB, SQL, 심화]
author: min oh
comments: true
---

SQL의 기본을 익혔다면, 이제 더 복잡한 데이터를 처리하고 성능을 높이는 방법을 알아볼 차례입니다.

---

## 1. 서브쿼리 (Subquery)
쿼리문 안에 또 다른 쿼리문이 포함된 형태입니다.

```sql
-- 가장 나이가 많은 학생 찾기
SELECT *
FROM students
WHERE age = (SELECT MAX(age) FROM students);
```

---

## 2. 뷰 (View)
복잡한 `SELECT` 문을 마치 하나의 테이블처럼 이름 붙여 사용하는 가상 테이블입니다.

```sql
-- 전공별 평균 나이를 보여주는 뷰 생성
CREATE VIEW avgage AS 
SELECT major, AVG(age) FROM students GROUP BY major;

-- 뷰를 이용한 간편 조회
SELECT * FROM avgage;
```

---

## 3. 인덱스 (Index)
데이터 검색 속도를 비약적으로 향상시켜 주는 도구입니다. 책의 맨 뒤에 있는 '찾아보기'와 같습니다.

```sql
-- 도서 제목(title)에 인덱스 생성
CREATE INDEX idx_title ON books(title);

-- 인덱스 작동 확인
EXPLAIN SELECT * FROM books WHERE title = '데미안';
```

### 주의사항
인덱스는 읽기 속도를 높여주지만, 데이터를 추가/수정/삭제할 때는 인덱스도 함께 업데이트해야 하므로 쓰기 성능은 약간 떨어질 수 있습니다. 꼭 필요한 컬럼에만 전략적으로 생성하는 것이 중요합니다.

---

데이터베이스 학습은 이론보다 직접 쿼리를 날려보며 데이터가 어떻게 변하는지 확인하는 과정이 중요합니다. 오늘 정리한 핵심 문법들을 바탕으로 다양한 실습을 이어가 보세요!
