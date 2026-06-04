# 프로젝트 개요: omm0716.github.io

이 프로젝트는 GitHub Pages를 기반으로 호스팅되는 **Jekyll 정적 블로그**입니다. 'Beautiful Jekyll' 테마를 사용하여 구축되었으며, 주로 프로그래밍(Python)과 데이터베이스(SQL) 학습 내용을 기록하는 용도로 사용되고 있습니다.

## 주요 설정 및 구조

- **테마**: Beautiful Jekyll
- **블로그 소유자 / 작성자**: omm0716 (GitHub: omm0716, Email: omm1532@gmail.com)
- **블로그 제목**: omm0716 블로그
- **블로그 설명 (RSS)**: 이 곳에서 프로그래밍을 공부 합니다.
- **주요 파일 및 디렉토리 구조**:
  - `_config.yml`: 블로그의 전체적인 설정(제목, 메뉴 링크, 작성자 정보, 연동 서비스 등)을 담고 있는 핵심 설정 파일입니다.
  - `_posts/`: 블로그의 게시글들이 마크다운(`.md`) 형식으로 저장되는 디렉토리입니다.
  - `_layouts/`, `_includes/`: 블로그의 디자인 및 레이아웃을 구성하는 HTML/Liquid 템플릿입니다.
  - `assets/`: 이미지, CSS, JavaScript 등 정적 파일이 포함되어 있습니다.
  - `README.md`: Beautiful Jekyll 테마의 원본 설명서 및 프로젝트 가이드가 포함되어 있습니다.

## 블로그 포스트 내용 분석 (`_posts` 폴더)

현재 작성된 포스트들은 크게 **Python**, **Database(SQL)**, **Machine Learning** 세 가지 주제로 나뉘어 체계적으로 작성되어 있습니다.

### 1. Python 학습 (총 7건)
- `2026-03-12-python.md`: Python 기초
- `2026-03-13-python-practice.md`: Python 실습
- `2026-04-10-python-control-flow-guide.md`: 제어문 가이드 (조건문, 반복문 등)
- `2026-04-17-python-loops-practice-problems.md`: 반복문 실습 문제
- `2026-04-24-python-functions-guide.md`: 함수 가이드
- `2026-05-07-python-file-io-guide.md`: 파일 입출력 가이드
- `2026-05-14-python-api-tutorial.md`: API 사용 튜토리얼

### 2. Database / SQL 학습 (총 7건) — 2026-06-04 대규모 리뉴얼
- `2026-04-17-database-intro.md`: [1강] 반도체 장비 DB 설계: 테이블, 관계, ERD (SemiconDB v1, PK/FK, CREATE TABLE)
- `2026-04-21-database-sql-basic.md`: [2강] SELECT 완전정복: WHERE, ORDER BY, LIKE, NULL (필터링, 패턴 매칭, LIMIT)
- `2026-04-28-database-sql-join.md`: [3강] 데이터 집계의 기술: GROUP BY + HAVING + SQL 실행 순서 (집계 함수, WHERE vs HAVING)
- `2026-05-02-database-sql-advanced.md`: [4강] 테이블 결합의 정석: INNER JOIN vs LEFT JOIN (3테이블 JOIN, NULL 패턴, 서브쿼리)
- `2026-06-04-database-dml-ddl.md`: [5강] 데이터 조작과 구조 변경: DML + DDL 완전 가이드 (INSERT/UPDATE/DELETE, CREATE/ALTER, 제약조건)
- `2026-06-04-database-semicon-expanded.md`: [6강] SemiconDB 확장: Department·MaintenanceLog와 데이터 읽기 훈련 (4테이블 JOIN, UNION, COALESCE)
- `2026-06-04-database-processsensor.md`: [7강] 공정 센서 데이터 분석: ProcessSensorDB로 이상값 탐지하기 (6테이블 JOIN, CASE WHEN, 공정 분석)

**Database 시리즈 사용 DB:**
- SemiconDB (semicon_equipDB): Equipment, EquipmentUser, UsageLog, Department, MaintenanceLog
- ProcessSensorDB: ProcessStep, Lot, Equipment, RunHistory, Sensor, SensorMeasurement
- 마당서점 DB (demo_madang): Customer, Book, Orders (비교 학습용)

### 3. Machine Learning 학습 (총 4건)
- `2026-06-04-machine-learning-linear-regression.md`: 선형 회귀 분석 기초
- `2026-06-04-machine-learning-multiple-regression.md`: 다중 회귀 분석
- `2026-06-04-machine-learning-logistic-regression.md`: 로지스틱 회귀 분석
- `2026-06-04-machine-learning-langchain-tutorial.md`: LangChain 기반 챗봇 실습

### 4. 기타 (1건)
- `2026-03-01-sample-markdown.md`: 마크다운 샘플 문서 (Beautiful Jekyll 튜토리얼용)

## 요약

이 폴더는 "omm0716"님이 Python, Database, Machine Learning에 대한 프로그래밍 지식을 정리하고 공유하기 위해 운영 중인 개인 학습용 Jekyll 블로그 소스 코드입니다. 설정 파일(`_config.yml`)이 잘 구성되어 있으며, 주기적으로 작성된 포스트들이 `_posts` 디렉토리에 마크다운 형식으로 잘 정리되어 있습니다. 추가적인 수정이나 포스팅 작성 시 기존 포스트들의 형식(YAML Front Matter 등)을 참고하여 작성하면 됩니다.

**2026-06-04 업데이트**: Database 섹션 대규모 리뉴얼 완료 (4강 → 7강 시리즈). 반도체 장비 DB(SemiconDB)와 공정 센서 DB(ProcessSensorDB)를 핵심 예제로 활용. ERD 설계부터 이상값 탐지까지 체계적인 SQL 학습 시리즈 완성.
---
# Project Overview: omm0716.github.io
This project is a **Jekyll static blog** hosted on GitHub Pages. It is built using the 'Beautiful Jekyll' theme and is primarily used to document learning contents for programming (Python) and database (SQL).
## Main Settings and Structure
- **Theme**: Beautiful Jekyll
- **Blog Owner / Author**: omm0716 (GitHub: omm0716, Email: omm1532@gmail.com)
- **Blog Title**: omm0716 Blog
- **Blog Description (RSS)**: I study programming here.
- **Main File and Directory Structure**:
  - `_config.yml`: The core configuration file containing the overall settings of the blog (title, menu links, author information, integrated services, etc.).
  - `_posts/`: The directory where blog posts are stored in Markdown (`.md`) format.
  - `_layouts/`, `_includes/`: HTML/Liquid templates that configure the design and layout of the blog.
  - `assets/`: Contains static files such as images, CSS, and JavaScript.
  - `README.md`: Contains the original manual and project guide for the Beautiful Jekyll theme.
## Blog Post Content Analysis (`_posts` folder)
The currently written posts are broadly divided into three main topics: **Python**, **Database (SQL)**, and **Machine Learning**, and are organized systematically.
### 1. Python Learning (7 posts total)
- `2026-03-12-python.md`: Python Basics
- `2026-03-13-python-practice.md`: Python Practice
- `2026-04-10-python-control-flow-guide.md`: Control Flow Guide (Conditionals, Loops, etc.)
- `2026-04-17-python-loops-practice-problems.md`: Loops Practice Problems
- `2026-04-24-python-functions-guide.md`: Functions Guide
- `2026-05-07-python-file-io-guide.md`: File I/O Guide
- `2026-05-14-python-api-tutorial.md`: API Usage Tutorial
### 2. Database / SQL Learning (7 posts total) — Major Renewal on 2026-06-04
- `2026-04-17-database-intro.md`: [Lesson 1] Semiconductor Equipment DB Design: Tables, Relationships, ERD
- `2026-04-21-database-sql-basic.md`: [Lesson 2] SELECT Mastery: WHERE, ORDER BY, LIKE, NULL
- `2026-04-28-database-sql-join.md`: [Lesson 3] Data Aggregation: GROUP BY + HAVING + SQL Execution Order
- `2026-05-02-database-sql-advanced.md`: [Lesson 4] Table Joins: INNER JOIN vs LEFT JOIN
- `2026-06-04-database-dml-ddl.md`: [Lesson 5] Data Manipulation & Structure: DML + DDL Complete Guide
- `2026-06-04-database-semicon-expanded.md`: [Lesson 6] SemiconDB Expansion: Department, MaintenanceLog & Data Reading Training
- `2026-06-04-database-processsensor.md`: [Lesson 7] Process Sensor Data Analysis: Anomaly Detection with ProcessSensorDB
### 3. Machine Learning Learning (4 posts total)
- `2026-06-04-machine-learning-linear-regression.md`: Linear Regression Basics
- `2026-06-04-machine-learning-multiple-regression.md`: Multiple Regression
- `2026-06-04-machine-learning-logistic-regression.md`: Logistic Regression
- `2026-06-04-machine-learning-langchain-tutorial.md`: LangChain Chatbot Tutorial

### 4. Others (1 post)
- `2026-03-01-sample-markdown.md`: Sample Markdown Document (for Beautiful Jekyll tutorial)
## Summary
This folder contains the source code for a personal learning Jekyll blog operated by "omm0716" to organize and share programming knowledge about Python, Database, and Machine Learning. The configuration file (`_config.yml`) is well-organized, and the periodically written posts are well-structured in Markdown format within the `_posts` directory. When making further modifications or writing new posts, you can refer to the format of existing posts (such as YAML Front Matter).

**2026-06-04 Update**: Database section massively renewed (4 posts → 7-lesson series). Key DBs used: SemiconDB (semiconductor equipment management) and ProcessSensorDB (process sensor analysis). Topics range from ERD design to anomaly detection in sensor data using complex 6-table JOINs.