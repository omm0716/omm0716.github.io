---
layout: post
title: "[1강] Git & GitHub 기초: 버전 관리 시작하기"
subtitle: "Git 설치부터 커밋, 브랜치, GitHub 연동까지 한 번에 익히기"
date: 2026-06-05 09:00:00 +0900
categories: Tools
tags: [Git, GitHub, 버전관리, CLI]
comments: true
---

# Git & GitHub 기초: 버전 관리 시작하기

소프트웨어 개발에서 **버전 관리(Version Control)**는 필수 역량입니다.  
이번 강의에서는 Git의 핵심 개념부터 GitHub 연동까지 실습 중심으로 다룹니다.

---

## 1. Git이란?

**Git**은 분산 버전 관리 시스템(DVCS)으로, 파일의 변경 이력을 체계적으로 관리합니다.

| 개념 | 설명 |
|------|------|
| Repository (저장소) | 프로젝트의 전체 이력이 저장되는 공간 |
| Commit | 변경 사항의 스냅샷 |
| Branch | 독립적인 작업 공간 |
| Merge | 두 브랜치를 하나로 합치는 작업 |

---

## 2. Git 설치 및 초기 설정

```bash
# Windows: https://git-scm.com 에서 설치
# 설치 후 버전 확인
git --version

# 사용자 정보 설정 (최초 1회)
git config --global user.name "omm0716"
git config --global user.email "omm1532@gmail.com"

# 설정 확인
git config --list
```

---

## 3. 기본 워크플로우

### 3-1. 저장소 초기화 및 첫 커밋

```bash
# 새 폴더 생성 후 이동
mkdir my-project
cd my-project

# Git 저장소 초기화
git init

# 파일 생성
echo "# My Project" > README.md

# 스테이징 영역에 추가
git add README.md

# 커밋
git commit -m "첫 번째 커밋: README.md 추가"

# 상태 확인
git status
git log --oneline
```

### 3-2. 변경 사항 추적

```bash
# 모든 변경 파일 스테이징
git add .

# 변경 내용 확인 (스테이징 전)
git diff

# 변경 내용 확인 (스테이징 후)
git diff --staged
```

---

## 4. 브랜치(Branch) 관리

```bash
# 브랜치 목록 확인
git branch

# 새 브랜치 생성 및 이동
git checkout -b feature/login

# 작업 후 커밋
git add .
git commit -m "로그인 기능 추가"

# main 브랜치로 돌아와서 병합
git checkout main
git merge feature/login

# 병합된 브랜치 삭제
git branch -d feature/login
```

---

## 5. GitHub 연동 (원격 저장소)

### 5-1. 원격 저장소 연결

```bash
# GitHub에서 새 Repository 생성 후
git remote add origin https://github.com/omm0716/my-project.git

# 원격 저장소에 푸시
git push -u origin main

# 원격 저장소에서 가져오기
git pull origin main
```

### 5-2. 기존 프로젝트 클론

```bash
git clone https://github.com/omm0716/omm0716.github.io.git
```

---

## 6. 자주 사용하는 Git 명령어 요약

| 명령어 | 설명 |
|--------|------|
| `git init` | 저장소 초기화 |
| `git add <file>` | 스테이징에 추가 |
| `git commit -m "msg"` | 커밋 |
| `git status` | 현재 상태 확인 |
| `git log --oneline` | 커밋 이력 간단 조회 |
| `git branch` | 브랜치 목록 |
| `git checkout -b <name>` | 브랜치 생성 및 이동 |
| `git merge <branch>` | 브랜치 병합 |
| `git push origin main` | 원격 저장소에 푸시 |
| `git pull origin main` | 원격 저장소에서 가져오기 |
| `git clone <url>` | 저장소 복제 |

---

## 7. .gitignore 설정

추적하지 않을 파일을 `.gitignore`에 명시합니다.

```bash
# .gitignore 파일 예시

# Python
__pycache__/
*.pyc
*.pyo
.env
venv/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

## 마무리

이번 강의에서 배운 내용:

- ✅ Git의 핵심 개념 (Repository, Commit, Branch)
- ✅ `git init`, `git add`, `git commit` 기본 워크플로우
- ✅ 브랜치 생성·병합·삭제
- ✅ GitHub 원격 저장소 연동 (push / pull / clone)
- ✅ `.gitignore` 설정

다음 강의에서는 **GitHub Actions를 이용한 CI/CD 자동화**를 다룰 예정입니다. 🚀
