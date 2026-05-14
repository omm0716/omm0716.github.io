---
layout: post
title: "SQL 중급: JOIN과 데이터 그룹화"
subtitle: "여러 테이블을 묶고 데이터를 요약하는 방법"
category: Database
tags: [DB, SQL, JOIN]
author: min oh
comments: true
---

데이터베이스의 진정한 힘은 흩어져 있는 여러 테이블의 데이터를 하나로 묶어 분석하는 데서 나옵니다.

---

## 1. 데이터 그룹화 (GROUP BY)
특정 컬럼을 기준으로 데이터를 그룹화하여 통계를 낼 수 있습니다.

```sql
-- 전공별 학생 수와 평균 나이 계산
SELECT major, COUNT(*) AS 학생수, AVG(age) AS 평균나이 
FROM students 
GROUP BY major;

-- 평균 나이가 22세 이상인 전공만 출력 (HAVING)
SELECT major, AVG(age) 
FROM students 
GROUP BY major 
HAVING AVG(age) >= 22;
```

---

## 2. 테이블 조인 (JOIN)
서로 연관된 테이블들을 연결하여 조회하는 기능입니다.

### INNER JOIN
두 테이블에 모두 데이터가 존재하는 경우만 합칩니다.
```sql
SELECT s.name, b.title, br.borrow_date
FROM students AS s
INNER JOIN borrow AS br ON s.id = br.student_id
INNER JOIN books AS b ON br.book_id = b.id;
```

### LEFT JOIN
왼쪽 테이블의 모든 데이터와 오른쪽 테이블의 매칭되는 데이터를 합칩니다. (매칭되지 않으면 NULL)
```sql
SELECT s.name, br.borrow_date
FROM students AS s
LEFT JOIN borrow AS br ON s.id = br.student_id;
```

---

## 3. 외래키 (Foreign Key)
테이블 간의 관계를 맺어주는 핵심 장치입니다. `borrow` 테이블의 `student_id`가 `students` 테이블의 `id`를 참조함으로써 데이터의 무결성을 지킵니다.

```sql
CREATE TABLE borrow (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    book_id INT NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(book_id) REFERENCES books(id)
);
```

이러한 관계 설정을 통해 데이터가 서로 꼬이지 않도록 안전하게 관리할 수 있습니다.
