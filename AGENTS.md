# 프로젝트 개요: omm0716.github.io

> [!IMPORTANT]
> ## 🤖 에이전트 필수 행동 규칙
>
> **모든 작업이 끝난 후 반드시 이 파일(`AGENTS.md`)을 업데이트해야 합니다.**
>
> 업데이트 항목:
> - 새로 추가된 파일 (포스트, 카테고리 페이지, 게임 등)
> - 수정된 파일 및 변경 내용 요약
> - 네비게이션 메뉴 변경 사항 (`_config.yml`)
> - 업데이트 이력 테이블에 날짜와 내용 추가
> - 영문 요약(Summary) 섹션도 동일하게 반영
>
> **이 규칙은 예외 없이 모든 작업에 적용됩니다.**

이 프로젝트는 GitHub Pages를 기반으로 호스팅되는 **Jekyll 정적 블로그**입니다. 'Beautiful Jekyll' 테마를 사용하여 구축되었으며, 주로 프로그래밍(Python, C언어, **C#**)과 데이터베이스(SQL), 머신러닝(Machine Learning) 학습 내용을 기록하는 용도로 사용되고 있습니다.

## 주요 설정 및 구조

- **테마**: Beautiful Jekyll
- **블로그 소유자 / 작성자**: omm0716 (GitHub: omm0716, Email: omm1532@gmail.com)
- **블로그 제목**: omm0716 블로그
- **블로그 설명 (RSS)**: 이 곳에서 프로그래밍을 공부 합니다.
- **주요 파일 및 디렉토리 구조**:
  - `_config.yml`: 블로그의 전체적인 설정(제목, 메뉴 링크, 작성자 정보, 연동 서비스 등)을 담고 있는 핵심 설정 파일입니다.
  - `_posts/`: 블로그의 게시글들이 마크다운(`.md`) 형식으로 저장되는 디렉토리입니다.
  - `_layouts/post.html`: 포스트 레이아웃. 같은 카테고리 내 이전/다음 포스트 네비게이션 포함.
  - `_layouts/`, `_includes/`: 블로그의 디자인 및 레이아웃을 구성하는 HTML/Liquid 템플릿입니다. (`_includes/recommendation-widget.html` 대화형 추천 위젯, `_includes/quiz-widget.html` 파이썬 퀴즈 위젯 포함)
  - `assets/`: 이미지, CSS, JavaScript 등 정적 파일이 포함되어 있습니다. (`assets/data/python-quiz.json` 퀴즈 문항 데이터 탑재)
  - `assets/img/logo.jpg`: 현재 사용 중인 블로그 네비게이션 바 아바타 이미지.
  - `assets/css/custom.css`: 다크모드, 코드 하이라이팅, TOC, 포스트 네비게이션 등 커스텀 스타일.
  - `README.md`: Beautiful Jekyll 테마의 원본 설명서 및 프로젝트 가이드가 포함되어 있습니다.
  - `python.md`: Python 카테고리 페이지 (날짜 오름차순 정렬 적용)
  - `database.md`: Database 카테고리 페이지 (날짜 오름차순 정렬 적용)
  - `machine-learning.md`: Machine Learning 카테고리 페이지 (날짜 오름차순 정렬 적용)
  - `tools.md`: Tools 카테고리 페이지 (날짜 오름차순 정렬 적용) — 2026-06-05 신규 추가
  - `c-language.md`: C Language 카테고리 페이지 (날짜 오름차순 정렬 적용) — 2026-06-09 신규 추가
  - `csharp.md`: C# 카테고리 페이지 (날짜 오름차순 정렬 적용) — 2026-06-10 신규 추가
  - `watermelon-game.md`: 🍉 사과 합치기 게임 페이지 (Canvas 기반, 수박게임 스타일) — 2026-06-05 신규 추가
  - `fruit-box-game.md`: 🍎 사과 게임 페이지 (Canvas 기반, フルーツボックス 원작 스타일) — 2026-06-05 신규 추가

## 네비게이션 메뉴 구성 (`_config.yml`)

```yaml
navbar-links:
  About Me: "aboutme"
  Github: "https://github.com/omm0716"
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

카테고리 페이지(`python.md`, `database.md`, `machine-learning.md`, `tools.md`, `c-language.md`, `csharp.md`)는 모두 `sort: 'date'`를 사용하여 **날짜 오름차순(강좌 순서대로)** 표시합니다.

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

현재 작성된 포스트들은 크게 **Python**, **Database(SQL)**, **Machine Learning**, **Tools**, **C언어**, **C#** 여섯 가지 주제로 나뉘어 체계적으로 작성되어 있습니다.

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

### 3. Machine Learning 학습 (총 10건) — 2026-06-11 대규모 리뉴얼

- `2026-06-11-machine-learning-01-linear-regression.md`: [1강] 선형 회귀 분석 기초 (`09:00:00`)
- `2026-06-11-machine-learning-02-multiple-regression.md`: [2강] 다중 회귀 분석 (`10:00:00`)
- `2026-06-11-machine-learning-03-logistic-regression.md`: [3강] 로지스틱 회귀 분석 (`11:00:00`)
- `2026-06-11-machine-learning-04-knn.md`: [4강] KNN 알고리즘 (`12:00:00`)
- `2026-06-11-machine-learning-05-k-fold.md`: [5강] K-Fold 교차검증 (`13:00:00`)
- `2026-06-11-machine-learning-06-grid-search.md`: [6강] 그리드 서치 (`14:00:00`)
- `2026-06-11-machine-learning-07-random-forest.md`: [7강] 앙상블: 랜덤 포레스트 (`15:00:00`)
- `2026-06-11-machine-learning-08-kmeans.md`: [8강] 군집 분석: K-Means (`16:00:00`)
- `2026-06-11-machine-learning-09-dbscan.md`: [9강] 군집 분석: DBSCAN (`17:00:00`)
- `2026-06-11-machine-learning-10-langchain.md`: [10강] LangChain 문서 기반 챗봇 실습 (`18:00:00`)

### 4. Tools 학습 (총 1건) — 2026-06-05 신규 추가

- `2026-06-05-tools-test.md`: [1강] Git & GitHub 기초: 버전 관리 시작하기 (설치, commit, branch, GitHub 연동, .gitignore) (`09:00:00`)

### 5. C언어 학습 (총 7건) — 2026-06-09 신규 추가

**소스 출처:** `C:\Users\user\Desktop\2026하이테크` (Visual Studio 프로젝트 파일들)

- `2026-06-09-c-language-basics.md`: [1강] C언어 기초: 변수, 자료형, printf/scanf, 산술 연산, 초 변환, 금액 계산 (`09:00:00`)
- `2026-06-09-c-language-conditionals.md`: [2강] 조건문: if-else, 삼항 연산자, switch, 나이 분류 계산기 메뉴 (`10:00:00`)
- `2026-06-09-c-language-loops.md`: [3강] 반복문: for, while, 3의 배수, 홀짝 카운트, 구간합, 구구단 (`11:00:00`)
- `2026-06-09-c-language-while-advanced.md`: [4강] while 심화: 누산기 패턴, 판매 집계, 돼지 무게 검수, 불량률 (`12:00:00`)
- `2026-06-09-c-language-arrays.md`: [5강] 배열과 문자열: 최대값 탐색, 검색, 순위 계산, char 배열 (`13:00:00`)
- `2026-06-09-c-language-functions.md`: [6강] 함수와 정렬: 사칙연산 함수, 2차원 배열, 선택 정렬, 전역/지역 변수 (`14:00:00`)
- `2026-06-09-c-language-structs.md`: [7강] 구조체: struct 정의, strcpy, 버블 정렬, 복합 데이터 관리 (`15:00:00`)

**같은 날짜(2026-06-09) 포스트 시간 배분:**
- 1강: `09:00:00`, 2강: `10:00:00`, 3강: `11:00:00`, 4강: `12:00:00`, 5강: `13:00:00`, 6강: `14:00:00`, 7강: `15:00:00`

### 6. C# 학습 (총 7건) — 2026-06-10 신규 추가

**소스 출처:** `D:\2604340032 오민` (Visual Studio 프로젝트 파일들)

- `2026-06-10-csharp-basics.md`: [1강] C# 기초: 변수, 자료형, 형변환 (int/long/string, Parse, 오버플로우) (`09:00:00`)
- `2026-06-10-csharp-conditionals.md`: [2강] 조건문: if-else, else if 체인, switch, ConsoleKeyInfo, 학점 분류기 (`10:00:00`)
- `2026-06-10-csharp-loops.md`: [3강] 반복문: for, while, do-while, foreach, 문자열 메서드, 콘솔 애니메이션 (`11:00:00`)
- `2026-06-10-csharp-while-advanced.md`: [4강] while 심화: 누산기 패턴, 카페 주문+할인 계산기, 영수증 출력, 결제 루프 (`12:00:00`)
- `2026-06-10-csharp-list-random.md`: [5강] List<T>와 Random: 동적 컬렉션 Add/Remove/Clear, List<Student>, 판다 쇼핑 리스트 (`13:00:00`)
- `2026-06-10-csharp-class-method.md`: [6강] 클래스·메서드·static: 인스턴스, 접근 제한자, static 메서드, 오버로딩 (`14:00:00`)
- `2026-06-10-csharp-class-design-winforms.md`: [7강] 클래스 설계 실전: LM 재고 관리 시스템(Customer/Employee/Goods/Partnercompany), Windows Forms 입문 (`15:00:00`)

**C# 시리즈 프로젝트 출처:**
- ConsoleApp1~9: 기초 반복문·조건문·자료형·문자열·List
- ConsoleApp0527: 클래스 메서드·오버로딩
- ConsoleApp0610: 빈 스캐폴드
- Static, instance: static 메서드 / List<T> 심화
- LMstockManagementSystm: 다중 클래스 재고 관리 시스템
- WindowsFormsApp1: Windows Forms 입문

**같은 날짜(2026-06-10) 포스트 시간 배분:**
- 1강: `09:00:00`, 2강: `10:00:00`, 3강: `11:00:00`, 4강: `12:00:00`, 5강: `13:00:00`, 6강: `14:00:00`, 7강: `15:00:00`

### 7. 기타 (1건)

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
| 2026-06-09 | **C Language 카테고리 신규 추가** (`c-language.md`, 네비게이션 메뉴 등록) |
| 2026-06-09 | **C언어 1강~7강 포스트 추가** (기초 → 구조체, 출처: `2026하이테크` Visual Studio 프로젝트) |
| 2026-06-10 | **C# 카테고리 신규 추가** (`csharp.md` → `permalink: /c-sharp/`, 네비게이션 메뉴 등록) |
| 2026-06-10 | **C# 1강~7강 포스트 추가** (기초 → WinForms, 출처: `2604340032 오민` Visual Studio 프로젝트) |
| 2026-06-10 | **C# 카테고리 404 버그 수정** (`permalink: /csharp/` → `/c-sharp/`, navbar 링크도 동일 수정) |
| 2026-06-10 | **🍉 수박 게임 물리 엔진 개선** (댐핑·마찰·질량비 임펄스·슬립 안착·서브스텝6 적용) |
| 2026-06-10 | **🍎 사과 게임 프레임 버그 수정** (첫 프레임 dt 스파이크 방지, removingMap O(1) 탐색, 파티클 중복 방지) |
| 2026-06-10 | **AGENTS.md 자동 업데이트 규칙 추가** (모든 작업 완료 후 필수 업데이트 명시) |
| 2026-06-11 | **Machine Learning 섹션 대규모 리뉴얼** (기존 4건 삭제, 10강 시리즈로 상세 튜토리얼 추가) |
| 2026-06-11 | **네비게이션 메뉴 정리** (미사용하는 C#, C Language, Tools 상단 메뉴 비활성화) |
| 2026-06-11 | **메인 화면 대화형 학습 추천 위젯 추가** (3단계 질문 기반 맞춤 포스트 추천 기믹 도입, Liquid JSON 파싱 IDE 경고 우회 적용) |
| 2026-06-11 | **메인 화면 1일 1문제 파이썬 퀴즈 위젯 추가** (LocalStorage 기반 연속 정답/스탬프 및 외부 DB 연동 닉네임 입력 모달 구현) |

## 요약

이 폴더는 "omm0716"님이 Python, Database, Machine Learning, Tools, **C언어**, **C#**에 대한 프로그래밍 지식을 정리하고 공유하기 위해 운영 중인 개인 학습용 Jekyll 블로그 소스 코드입니다.

**2026-06-04 대규모 업데이트**: Python 7강 + Database 7강 시리즈 리뉴얼 완료. 모든 카테고리 페이지에 오름차순 정렬 적용. 반도체 장비 DB(SemiconDB)와 공정 센서 DB(ProcessSensorDB)를 핵심 예제로 활용.

**2026-06-05 업데이트**: Tools 카테고리 신규 추가 및 첫 포스트(Git & GitHub 기초) 작성. 블로그 아바타 이미지를 `logo.jpg`로 변경. 모든 포스트에 같은 카테고리 기준 이전/다음 포스트 카드 네비게이션 적용. 🍉 수박 게임 + 🍎 사과 게임 추가 후 `🎮 게임` 드롭다운으로 통합.

**2026-06-09 업데이트**: **C Language 카테고리 신규 추가** (`c-language.md`). Visual Studio 프로젝트 파일(`2026하이테크`)을 분석하여 C언어 1강~7강 포스트 작성 완료. 네비게이션 메뉴에 `C Language` 링크 등록.

**2026-06-10 업데이트**: **C# 카테고리 신규 추가** (`csharp.md` → permalink `/c-sharp/`). Visual Studio 프로젝트 파일(`2604340032 오민`)을 분석하여 C# 1강~7강 포스트 작성 완료. 네비게이션 메뉴에 `C#` 링크 등록. 7강 시리즈: 변수·자료형 → 조건문 → 반복문 → while심화(카페 주문) → List\<T\>·Random → 클래스·메서드·static → 다중 클래스 설계(LM재고관리) + Windows Forms 입문. **C# 카테고리 404 버그 수정** (`permalink /csharp/` → `/c-sharp/`). **🍉 수박 게임 물리 엔진 개선** (댐핑↓, 질량비 임펄스, 슬립 안착, 서브스텝 6). **🍎 사과 게임 프레임 버그 수정** (첫 프레임 dt 스파이크, O(1) Map 탐색, 파티클 중복 방지). **AGENTS.md 자동 업데이트 규칙 추가**.

**2026-06-11 업데이트**: **Machine Learning 섹션 대규모 리뉴얼**. 기존 4건 삭제 후, 1강~10강 시리즈를 초보자 맞춤형 튜토리얼 포맷으로 전면 재작성. **네비게이션 메뉴 정리** (자주 쓰지 않는 C#, C Language, Tools 상단 링크 제거). **메인 화면 대화형 학습 추천 위젯 추가**: 3개 질문을 통해 사용자의 성향을 진단하고 적합한 3개 포스트를 추천하는 위젯 구현 (`_includes/recommendation-widget.html`, `index.html`, `assets/css/custom.css`). **메인 화면 1일 1문제 파이썬 퀴즈 위젯 추가**: '초보자를 위한 파이썬 300제' 스타일의 15개 문항을 담은 JSON 데이터셋 구축, LocalStorage 기반의 연속 정답 일수(Streak) 및 7칸 스탬프 카드 상태 유지 기능, 7/14/30일 연속 달성 시 외부 DB(Firebase/Supabase REST API)에 닉네임과 함께 기록하는 명예의 전당 입력 모달 시스템 연동.

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
  - `python.md`, `database.md`, `machine-learning.md`, `tools.md`, `c-language.md`, `csharp.md`: Category pages with ascending `sort: 'date'`

## Navbar Links (`_config.yml`)
```yaml
navbar-links:
  About Me: "aboutme"
  Github: "https://github.com/omm0716"
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

### 3. Machine Learning Learning (10 posts total) — Major Renewal on 2026-06-11
- `2026-06-11-machine-learning-01-linear-regression.md`: [Lesson 1] Linear Regression Basics (`09:00`)
- `2026-06-11-machine-learning-02-multiple-regression.md`: [Lesson 2] Multiple Regression (`10:00`)
- `2026-06-11-machine-learning-03-logistic-regression.md`: [Lesson 3] Logistic Regression (`11:00`)
- `2026-06-11-machine-learning-04-knn.md`: [Lesson 4] KNN Algorithm (`12:00`)
- `2026-06-11-machine-learning-05-k-fold.md`: [Lesson 5] K-Fold Cross Validation (`13:00`)
- `2026-06-11-machine-learning-06-grid-search.md`: [Lesson 6] Grid Search (`14:00`)
- `2026-06-11-machine-learning-07-random-forest.md`: [Lesson 7] Random Forest (`15:00`)
- `2026-06-11-machine-learning-08-kmeans.md`: [Lesson 8] K-Means Clustering (`16:00`)
- `2026-06-11-machine-learning-09-dbscan.md`: [Lesson 9] DBSCAN Clustering (`17:00`)
- `2026-06-11-machine-learning-10-langchain.md`: [Lesson 10] LangChain Chatbot Tutorial (`18:00`)

### 4. Tools Learning (1 post total) — Added 2026-06-05
- `2026-06-05-tools-test.md`: [Lesson 1] Git & GitHub Basics: Version Control Fundamentals (`09:00`)

### 5. C Language Learning (7 posts total) — Added 2026-06-09
**Source:** `C:\Users\user\Desktop\2026하이테크` (Visual Studio project files)

- `2026-06-09-c-language-basics.md`: [Lesson 1] C Basics: Variables, Data Types, printf/scanf, Arithmetic (`09:00`)
- `2026-06-09-c-language-conditionals.md`: [Lesson 2] Conditionals: if-else, Ternary Operator, switch (`10:00`)
- `2026-06-09-c-language-loops.md`: [Lesson 3] Loops: for, while, Odd/Even, Multiplication Table (`11:00`)
- `2026-06-09-c-language-while-advanced.md`: [Lesson 4] while Advanced: Accumulator Pattern, break (`12:00`)
- `2026-06-09-c-language-arrays.md`: [Lesson 5] Arrays & Strings: Max Search, Rank, char Array (`13:00`)
- `2026-06-09-c-language-functions.md`: [Lesson 6] Functions & Sorting: Selection Sort, 2D Array, Global/Local (`14:00`)
- `2026-06-09-c-language-structs.md`: [Lesson 7] Structs: struct, strcpy, Bubble Sort, Complex Data (`15:00`)

### 6. C# Learning (7 posts total) — Added 2026-06-10
**Source:** `D:\2604340032 오민` (Visual Studio project files)

- `2026-06-10-csharp-basics.md`: [Lesson 1] C# Basics: Variables, Data Types, Type Casting (int/long/string, Parse, Overflow) (`09:00`)
- `2026-06-10-csharp-conditionals.md`: [Lesson 2] Conditionals: if-else, else if chain, switch, ConsoleKeyInfo, GPA Classifier (`10:00`)
- `2026-06-10-csharp-loops.md`: [Lesson 3] Loops: for, while, do-while, foreach, String Methods, Console Animation (`11:00`)
- `2026-06-10-csharp-while-advanced.md`: [Lesson 4] while Advanced: Accumulator, Café Order+Discount, Receipt, Payment Loop (`12:00`)
- `2026-06-10-csharp-list-random.md`: [Lesson 5] List<T> & Random: Add/Remove/Clear, List<Student>, Panda Shopping List (`13:00`)
- `2026-06-10-csharp-class-method.md`: [Lesson 6] Classes & Methods: Instance, Access Modifiers, static, Overloading (`14:00`)
- `2026-06-10-csharp-class-design-winforms.md`: [Lesson 7] Class Design: LM Stock Management System (Customer/Employee/Goods/Partnercompany) + Windows Forms Intro (`15:00`)

### 7. Others (1 post)
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

**2026-06-09 Update**:
- Added new **C Language** category (`c-language.md`, navbar link `C Language` added to `_config.yml`)
- Added C Language Lessons 1–7 based on Visual Studio projects in `C:\Users\user\Desktop\2026하이테크`
  - Lessons cover: Basics → Conditionals → Loops → while Advanced → Arrays/Strings → Functions/Sort → Structs
- All 7 posts dated 2026-06-09 with times from 09:00 to 15:00 (+0900) for correct ordering

**2026-06-10 Update**:
- Added new **C#** category (`csharp.md`, navbar link `C#` added to `_config.yml`)
- Added C# Lessons 1–7 based on Visual Studio projects in `D:\2604340032 오민`
  - Lessons cover: Basics → Conditionals → Loops → while Advanced (Café System) → List<T>/Random → Class/Method/static/Overloading → Multi-Class Design (LM Stock Mgmt) + Windows Forms
- All 7 posts dated 2026-06-10 with times from 09:00 to 15:00 (+0900) for correct ordering

**2026-06-11 Update**:
- **Major Renewal of Machine Learning Category**: Deleted 4 old placeholder posts and created a full 10-lesson tutorial series covering Regression, KNN, Clustering, and LangChain. Fixed YAML front matter parsing errors and applied detailed, beginner-friendly explanations. All posts dated 2026-06-11 from 09:00 to 18:00.
- **Navbar Clean Up**: Removed links to C#, C Language, and Tools from the top-right navigation menu as per request.
- **Interactive Learning Recommender Widget**: Added a 3-step dynamic survey widget on the homepage that scores user goals, difficulty level, and project choices, offering top 3 personalized post recommendations.
- **Daily Python Quiz & Streak Tracker**: Created a daily quiz widget on the homepage that displays one Python exercise per day (mapped to calendar days) from a local JSON base. Integrates LocalStorage for consecutive correct streaks, a 7-stamp loyalty calendar card, and a medal modal to register user names on external databases (Supabase or Firebase REST API) upon reaching 7, 14, or 30-day milestones.