# 프로젝트 개요: omm0716.github.io

이 프로젝트는 GitHub Pages를 기반으로 호스팅되는 **Jekyll 정적 블로그**입니다. 'Beautiful Jekyll' 테마를 사용하여 구축되었으며, 주로 프로그래밍(Python)과 데이터베이스(SQL), 머신러닝(Machine Learning) 학습 내용을 기록하는 용도로 사용되고 있습니다.

## 주요 설정 및 구조

- **테마**: Beautiful Jekyll
- **블로그 소유자 / 작성자**: omm0716 (GitHub: omm0716, Email: omm1532@gmail.com)
- **블로그 제목**: omm0716 블로그
- **블로그 설명 (RSS)**: 이 곳에서 프로그래밍을 공부 합니다.
- **주요 파일 및 디렉토리 구조**:
  - `_config.yml`: 블로그의 전체적인 설정(제목, 메뉴 링크, 작성자 정보, 연동 서비스 등)을 담고 있는 핵심 설정 파일입니다.
  - `_posts/`: 블로그의 게시글들이 마크다운(`.md`) 형식으로 저장되는 디렉토리입니다.
  - `_layouts/post.html`: 포스트 레이아웃. 같은 카테고리 내 이전/다음 포스트 네비게이션 포함.
  - `_layouts/`, `_includes/`: 블로그의 디자인 및 레이아웃을 구성하는 HTML/Liquid 템플릿입니다.
  - `assets/`: 이미지, CSS, JavaScript 등 정적 파일이 포함되어 있습니다.
  - `assets/img/logo.jpg`: 현재 사용 중인 블로그 네비게이션 바 아바타 이미지.
  - `assets/css/custom.css`: 다크모드, 코드 하이라이팅, TOC, 포스트 네비게이션 등 커스텀 스타일.
  - `README.md`: Beautiful Jekyll 테마의 원본 설명서 및 프로젝트 가이드가 포함되어 있습니다.
  - `python.md`: Python 카테고리 페이지 (날짜 오름차순 정렬 적용)
  - `database.md`: Database 카테고리 페이지 (날짜 오름차순 정렬 적용)
  - `machine-learning.md`: Machine Learning 카테고리 페이지 (날짜 오름차순 정렬 적용)
  - `tools.md`: Tools 카테고리 페이지 (날짜 오름차순 정렬 적용) — 2026-06-05 신규 추가
  - `watermelon-game.md`: 🍉 사과 합치기 게임 페이지 (Canvas 기반, 수박게임 스타일) — 2026-06-05 신규 추가
  - `fruit-box-game.md`: 🍎 사과 게임 페이지 (Canvas 기반, フルーツボックス 원작 스타일) — 2026-06-05 신규 추가

## 네비게이션 메뉴 구성 (`_config.yml`)

```yaml
navbar-links:
  About Me: "aboutme"
  Github: "https://github.com/omm0716"
  Tools: "tools"
  🎮 게임:
    - 🍉 수박 게임: "watermelon-game"
    - 🍎 사과 게임: "fruit-box-game"
```

## 블로그 아바타 설정 (`_config.yml`)

```yaml
avatar: "/assets/img/logo.jpg"
round-avatar: true
```

- 아바타 이미지 파일: `assets/img/logo.jpg` (2026-06-05 변경)
- 원형 크롭 적용 중 (`round-avatar: true`)

## 포스트 정렬 규칙 (중요!)

카테고리 페이지(`python.md`, `database.md`, `machine-learning.md`, `tools.md`)는 모두 `sort: 'date'`를 사용하여 **날짜 오름차순(강좌 순서대로)** 표시합니다.

**같은 날짜의 포스트는 반드시 YAML front matter에 `date: YYYY-MM-DD HH:MM:SS +0900` 형태로 시간을 명시**해야 올바른 순서가 보장됩니다.

```yaml
---
date: 2026-06-04 09:00:00 +0900  # 시간으로 순서 구분
---
```

## 포스트 내 이전/다음 네비게이션 (중요!)

`_layouts/post.html`에 **같은 카테고리 내** 이전/다음 포스트 카드 네비게이션이 구현되어 있습니다 (2026-06-05 추가).

- 동작 방식: 해당 포스트의 `categories[0]`을 기준으로 날짜 오름차순 정렬 후 이전/다음 포스트 링크 표시
- 카테고리가 없는 포스트는 Jekyll 기본 `page.previous` / `page.next` 사용
- 스타일: `assets/css/custom.css`의 `.post-nav-*` 클래스군으로 정의 (라이트/다크모드 + 모바일 대응)

## 블로그 포스트 내용 분석 (`_posts` 폴더)

현재 작성된 포스트들은 크게 **Python**, **Database(SQL)**, **Machine Learning**, **Tools** 네 가지 주제로 나뉘어 체계적으로 작성되어 있습니다.

### 1. Python 학습 (총 7건) — 2026-06-04 대규모 리뉴얼

- `2026-03-12-python.md`: [1강] 파이썬 기초: 변수, 자료형, 연산자 (int/float/str/list/dict/bool, f-string, 형변환)
- `2026-03-13-python-practice.md`: [2강] 파이썬 기초 실습 (슬라이싱, 딕셔너리, 단어 빈도, 성적 관리)
- `2026-04-10-python-control-flow-guide.md`: [3강] 제어문: 조건문·반복문 (if/elif, while, for, 리스트 컴프리헨션)
- `2026-04-17-python-loops-practice-problems.md`: [4강] 반복문 실전 마스터 (누산기, 플래그, zip, enumerate, any/all)
- `2026-04-24-python-functions-guide.md`: [5강] 함수 완전 가이드 (def, 기본값, *args/**kwargs, lambda, 재귀)
- `2026-05-07-python-file-io-guide.md`: [6강] 파일 입출력 (open/read/write, with문, CSV, JSON, os 모듈)
- `2026-05-14-python-api-tutorial.md`: [7강] 외부 API 활용 (requests, JSON 파싱, 클래스, 에러처리, API Key)

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

**같은 날짜(2026-06-04) 포스트 시간 배분:**
- 5강: `09:00:00`, 6강: `10:00:00`, 7강: `11:00:00`

### 3. Machine Learning 학습 (총 4건)

- `2026-06-04-machine-learning-linear-regression.md`: 선형 회귀 분석 기초 (`09:00:00`)
- `2026-06-04-machine-learning-multiple-regression.md`: 다중 회귀 분석 (`10:00:00`)
- `2026-06-04-machine-learning-logistic-regression.md`: 로지스틱 회귀 분석 (`11:00:00`)
- `2026-06-04-machine-learning-langchain-tutorial.md`: LangChain 기반 챗봇 실습 (`12:00:00`)

### 4. Tools 학습 (총 1건) — 2026-06-05 신규 추가

- `2026-06-05-tools-test.md`: [1강] Git & GitHub 기초: 버전 관리 시작하기 (설치, commit, branch, GitHub 연동, .gitignore) (`09:00:00`)

### 5. 기타 (1건)

- `2026-03-01-sample-markdown.md`: 마크다운 샘플 문서 (Beautiful Jekyll 튜토리얼용)

## 업데이트 이력

| 날짜 | 업데이트 내용 |
|------|--------------|
| 2026-06-04 | Database 섹션 대규모 리뉴얼 (4강 → 7강 시리즈) |
| 2026-06-04 | Python 섹션 대규모 리뉴얼 (1강~7강 번호 체계 정립) |
| 2026-06-04 | 카테고리 페이지 정렬 수정 (`sort: 'date'` 오름차순) |
| 2026-06-04 | 같은 날짜 포스트에 시간 명시 (HH:MM:SS +0900) |
| 2026-06-05 | **Tools 카테고리 신규 추가** (`tools.md`, 네비게이션 메뉴 등록) |
| 2026-06-05 | **Tools 첫 번째 포스트 추가** ([1강] Git & GitHub 기초) |
| 2026-06-05 | **블로그 아바타 이미지 변경** (`avatar-icon.png` → `logo.jpg`) |
| 2026-06-05 | **포스트 내 이전/다음 포스트 네비게이션 추가** (같은 카테고리 기준, 카드 UI) |
| 2026-06-05 | **🍉 수박 합치기 게임 추가** (`watermelon-game.md`, Canvas 물리 엔진 기반) |
| 2026-06-05 | **🍎 사과 게임 추가** (`fruit-box-game.md`, フルーツボックス 원작 스타일, 드래그 선택) |
| 2026-06-05 | **🎮 게임 드롭다운 메뉴 통합** (수박 게임 + 사과 게임을 하나의 서브메뉴로 묶음) |

## 요약

이 폴더는 "omm0716"님이 Python, Database, Machine Learning, Tools에 대한 프로그래밍 지식을 정리하고 공유하기 위해 운영 중인 개인 학습용 Jekyll 블로그 소스 코드입니다.

**2026-06-04 대규모 업데이트**: Python 7강 + Database 7강 시리즈 리뉴얼 완료. 모든 카테고리 페이지에 오름차순 정렬 적용. 반도체 장비 DB(SemiconDB)와 공정 센서 DB(ProcessSensorDB)를 핵심 예제로 활용.

**2026-06-05 업데이트**: Tools 카테고리 신규 추가 및 첫 포스트(Git & GitHub 기초) 작성. 블로그 아바타 이미지를 `logo.jpg`로 변경. 모든 포스트에 같은 카테고리 기준 이전/다음 포스트 카드 네비게이션 적용. 🍉 수박 게임 + 🍎 사과 게임 추가 후 `🎮 게임` 드롭다운으로 통합.

---
# Project Overview: omm0716.github.io
This project is a **Jekyll static blog** hosted on GitHub Pages. It is built using the 'Beautiful Jekyll' theme and is primarily used to document learning contents for programming (Python), database (SQL), and Machine Learning.

## Main Settings and Structure
- **Theme**: Beautiful Jekyll
- **Blog Owner / Author**: omm0716 (GitHub: omm0716, Email: omm1532@gmail.com)
- **Blog Title**: omm0716 Blog
- **Blog Description (RSS)**: I study programming here.
- **Key files**:
  - `_config.yml`: Core site configuration
  - `_posts/`: Blog posts in Markdown format
  - `_layouts/post.html`: Post layout with same-category prev/next navigation (added 2026-06-05)
  - `assets/img/logo.jpg`: Current navbar avatar image (changed 2026-06-05)
  - `assets/css/custom.css`: Custom styles (dark mode, code highlighting, TOC, post navigation)
  - `python.md`, `database.md`, `machine-learning.md`, `tools.md`: Category pages with ascending `sort: 'date'`

## Navbar Links (`_config.yml`)
```yaml
navbar-links:
  About Me: "aboutme"
  Github: "https://github.com/omm0716"
  Tools: "tools"
  🎮 게임:
    - 🍉 수박 게임: "watermelon-game"
    - 🍎 사과 게임: "fruit-box-game"
```

## Avatar (`_config.yml`)
```yaml
avatar: "/assets/img/logo.jpg"
round-avatar: true
```

## Post Sorting Rule (IMPORTANT!)
All category pages use `{% assign posts = posts | sort: 'date' %}` for **ascending date order** (lesson 1 → last lesson).

For same-day posts, **always specify a time** in YAML front matter:
```yaml
date: 2026-06-04 09:00:00 +0900
```

## Post Prev/Next Navigation (IMPORTANT!)
Implemented in `_layouts/post.html` (2026-06-05). Navigates within the **same category** in ascending date order.
- Styled via `.post-nav-*` classes in `assets/css/custom.css`
- Supports light mode, dark mode, and mobile

## Blog Post Content Analysis (`_posts` folder)

### 1. Python Learning (7 posts total) — Major Renewal on 2026-06-04
- `2026-03-12-python.md`: [Lesson 1] Python Basics: Variables, Data Types, Operators
- `2026-03-13-python-practice.md`: [Lesson 2] Python Practice: Strings, Lists, Dicts
- `2026-04-10-python-control-flow-guide.md`: [Lesson 3] Control Flow: if/elif, while, for, list comprehension
- `2026-04-17-python-loops-practice-problems.md`: [Lesson 4] Loops Mastery: zip, enumerate, any/all patterns
- `2026-04-24-python-functions-guide.md`: [Lesson 5] Functions: def, *args/**kwargs, lambda, recursion
- `2026-05-07-python-file-io-guide.md`: [Lesson 6] File I/O: open/read/write, with, CSV, JSON
- `2026-05-14-python-api-tutorial.md`: [Lesson 7] APIs: requests, JSON parsing, Class, error handling

### 2. Database / SQL Learning (7 posts total) — Major Renewal on 2026-06-04
- `2026-04-17-database-intro.md`: [Lesson 1] Semiconductor Equipment DB Design: Tables, Relationships, ERD
- `2026-04-21-database-sql-basic.md`: [Lesson 2] SELECT Mastery: WHERE, ORDER BY, LIKE, NULL
- `2026-04-28-database-sql-join.md`: [Lesson 3] Data Aggregation: GROUP BY + HAVING + SQL Execution Order
- `2026-05-02-database-sql-advanced.md`: [Lesson 4] Table Joins: INNER JOIN vs LEFT JOIN
- `2026-06-04-database-dml-ddl.md`: [Lesson 5] Data Manipulation & Structure: DML + DDL Complete Guide
- `2026-06-04-database-semicon-expanded.md`: [Lesson 6] SemiconDB Expansion: Department, MaintenanceLog & Data Reading Training
- `2026-06-04-database-processsensor.md`: [Lesson 7] Process Sensor Data Analysis: Anomaly Detection with ProcessSensorDB

### 3. Machine Learning Learning (4 posts total)
- `2026-06-04-machine-learning-linear-regression.md`: Linear Regression Basics (`09:00`)
- `2026-06-04-machine-learning-multiple-regression.md`: Multiple Regression (`10:00`)
- `2026-06-04-machine-learning-logistic-regression.md`: Logistic Regression (`11:00`)
- `2026-06-04-machine-learning-langchain-tutorial.md`: LangChain Chatbot Tutorial (`12:00`)

### 4. Tools Learning (1 post total) — Added 2026-06-05
- `2026-06-05-tools-test.md`: [Lesson 1] Git & GitHub Basics: Version Control Fundamentals (`09:00`)

### 5. Others (1 post)
- `2026-03-01-sample-markdown.md`: Sample Markdown Document (for Beautiful Jekyll tutorial)

## Summary
This folder contains the source code for a personal learning Jekyll blog operated by "omm0716".

**2026-06-04 Major Update**:
- Python section massively renewed (7-lesson series with lesson numbers [1강]~[7강])
- Database section massively renewed (7-lesson series using SemiconDB and ProcessSensorDB)
- All category pages now use ascending date sort for proper lesson ordering
- Same-day posts have explicit HH:MM:SS timestamps to ensure correct ordering

**2026-06-05 Update**:
- Added new **Tools** category (`tools.md`, navbar link added to `_config.yml`)
- Added first Tools post: [Lesson 1] Git & GitHub Basics (`2026-06-05-tools-test.md`)
- Changed blog avatar image from `avatar-icon.png` to `logo.jpg` (copied to `assets/img/logo.jpg`)
- Added **same-category prev/next post navigation** to all posts via `_layouts/post.html` and `assets/css/custom.css`
- Added **🍉 Watermelon Merge Game** (`watermelon-game.md`, Canvas physics engine, Suika-game style)
- Added **🍎 Apple Box Game** (`fruit-box-game.md`, Canvas drag-select, フルーツボックス style)
- **Grouped both games** under a single **🎮 게임 dropdown** in navbar (`_config.yml` sub-menu)