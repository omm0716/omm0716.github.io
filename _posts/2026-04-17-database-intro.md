---
layout: post
title: "데이터베이스 기초: DB란 무엇인가?"
subtitle: "데이터베이스의 개념과 SQL 학습 준비"
categories: [Database]
tags: [DB, SQL, 기초]
author: min oh
comments: true
---

## 1. 데이터베이스(Database)란?
데이터베이스는 여러 사람이 공유하여 사용할 목적으로 체계화해 관리하는 **데이터의 집합**입니다. 단순히 데이터를 저장하는 것을 넘어, 효율적으로 검색하고 수정할 수 있는 구조를 갖추고 있습니다.

### DBMS (Database Management System)
데이터베이스를 직접 관리하는 소프트웨어를 DBMS라고 합니다. 대표적으로 MySQL, Oracle, PostgreSQL 등이 있습니다.

---

## 2. SQL 실습 환경 만들기
SQL을 실습하기 위해서는 DBMS가 설치되어 있어야 합니다. 가장 대중적인 **MySQL**과 시각적 도구인 **MySQL Workbench**를 활용하는 것이 일반적입니다.

### 학습용 데이터베이스 생성
```sql
-- sample이라는 이름의 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS sample;

-- 생성된 데이터베이스 사용 설정
USE sample;
```

---

## 3. 테이블(Table)의 구조
데이터는 행(Row)과 열(Column)로 구성된 테이블 형태로 저장됩니다.
- **Column (열)**: 데이터의 속성 (예: 이름, 나이, 전공)
- **Row (행)**: 실제 데이터 한 건 (예: 김철수, 20세, 컴퓨터공학)

데이터베이스 학습의 첫걸음은 이러한 구조를 이해하고, 데이터를 담을 '그릇'인 테이블을 만드는 것부터 시작됩니다.
