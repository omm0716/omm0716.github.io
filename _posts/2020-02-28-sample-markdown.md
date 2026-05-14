---
layout: post
title: 마크다운 작성 팁과 가이드
subtitle: 아름다운 블로그 포스팅을 위한 마크다운 활용법
gh-repo: daattali/beautiful-jekyll
gh-badge: [star, fork, follow]
tags: [markdown, 가이드, 테스트]
comments: true
mathjax: true
author: min oh
---

{: .box-success}
이 포스트는 마크다운(Markdown)을 사용하여 블로그 글을 작성하는 방법을 보여주는 데모 페이지입니다. 마크다운을 사용하면 일반 텍스트를 **굵게**, *기울임*, 테이블 등으로 간편하게 변환할 수 있습니다. [마크다운 튜토리얼(영문)](https://markdowntutorial.com/)을 참고하시면 5분 만에 기초를 익힐 수 있습니다.

---

## 1. 텍스트 강조와 제목

기본적인 텍스트 강조 방법은 다음과 같습니다:
- **여기는 굵은 글씨입니다.**
- *여기는 기울임 글씨입니다.*
- ~~여기는 취소선입니다.~~

### 부제목 예시 (H3)
제목은 `#`의 개수로 수준을 조절할 수 있습니다.

---

## 2. 링크와 테이블

[외부 사이트 링크(네이버)](https://www.naver.com)를 걸거나, 페이지 내부의 [특정 섹션으로 이동](#local-urls)하는 링크를 만들 수 있습니다.

### 테이블 예시

| 항목 | 현재 값 | 다음 값 | 이전 값 |
| :--- | :--- | :--- | :--- |
| 숫자 | 5 | 6 | 4 |
| 점수 | 10 | 11 | 9 |
| 순위 | 2 | 3 | 1 |

---

## 3. 수학 공식 (MathJax)

[MathJax](https://www.mathjax.org/)를 사용하여 LaTeX 수식을 작성할 수 있습니다. 

예를 들어, 근의 공식은 다음과 같이 표현됩니다:
\\(a \ne 0\\) 일 때, \\(ax^2 + bx + c = 0\\) 의 해는 다음과 같습니다.
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$

---

## 4. 이미지 삽입

이미지를 삽입하고 정렬하는 방법입니다.

### 기본 이미지
![크레페](https://beautifuljekyll.com/assets/img/crepe.jpg)

### 중앙 정렬 이미지
테마에서 제공하는 클래스를 사용하여 이미지를 중앙에 배치할 수 있습니다.
![크레페](https://beautifuljekyll.com/assets/img/crepe.jpg){: .mx-auto.d-block :}

---

## 5. 코드 블록 (Code Syntax Highlighting)

개발 블로그에서 필수적인 코드 블록 표현 방식입니다.

### 일반 코드 (강조 없음)
~~~
var foo = function(x) {
  return(x + 5);
}
foo(3)
~~~

### 언어 지정 강조 (JavaScript)
```javascript
var foo = function(x) {
  return(x + 5);
}
foo(3)
```

### 줄 번호 포함
{% highlight javascript linenos %}
var foo = function(x) {
  return(x + 5);
}
foo(3)
{% endhighlight %}

---

## 6. 알림 박스 (Notice Boxes)

독자의 주의를 끌기 위해 다양한 스타일의 박스를 사용할 수 있습니다.

### 알림 (Note)
{: .box-note}
**참고:** 이것은 일반적인 알림이나 메모를 위한 박스입니다.

### 경고 (Warning)
{: .box-warning}
**경고:** 주의가 필요한 내용을 작성할 때 사용합니다.

### 오류 (Error)
{: .box-error}
**오류:** 중요한 에러나 금지 사항을 알릴 때 적합합니다.

---

## 7. 로컬 URL 및 상세 내용 {#local-urls}

GitHub Pages에서 프로젝트 사이트를 운영할 때 로컬 이미지 경로가 깨지는 경우가 있습니다. 이럴 때는 `relative_url` 필터를 사용하는 것이 안전합니다.

**잘못된 예시 (로컬 경로):**
![크레페](/assets/img/crepe.jpg)

**올바른 예시 (relative_url 사용):**
![크레페]({{ '/assets/img/crepe.jpg' | relative_url }})

### 접기/펼치기 (Details)
<details markdown="1">
<summary>여기를 클릭하여 내용을 확인하세요!</summary>
이곳에 숨겨진 상세 내용을 작성할 수 있습니다. 마크다운 문법도 그대로 적용됩니다.
- **굵은 글씨**도 가능합니다.
- 리스트도 만들 수 있죠.
</details>

