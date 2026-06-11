document.addEventListener("DOMContentLoaded", function() {
  // --- Dark Mode Toggle ---
  const toggleBtn = document.getElementById("dark-mode-toggle");
  const icon = document.getElementById("dark-mode-icon");
  
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function(e) {
      e.preventDefault();
      let theme = document.documentElement.getAttribute("data-theme");
      let targetTheme = theme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("theme", targetTheme);
      
      if (icon) {
        if (targetTheme === "dark") {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        } else {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
      }
      
      const brightnessWrapper = document.getElementById("brightness-control-wrapper");
      if (brightnessWrapper) {
        brightnessWrapper.style.display = targetTheme === "dark" ? "flex" : "none";
      }
      
      const overlay = document.getElementById("brightness-overlay");
      if (overlay) {
        overlay.style.backgroundColor = targetTheme === "dark" ? `rgba(0, 0, 0, ${document.getElementById("brightness-slider").value / 100})` : "rgba(0, 0, 0, 0)";
      }

      // Update utterances theme if iframe exists
      const iframe = document.querySelector('.utterances-frame');
      if (iframe) {
        const message = {
          type: 'set-theme',
          theme: targetTheme === 'dark' ? 'photon-dark' : 'github-light'
        };
        iframe.contentWindow.postMessage(message, 'https://utteranc.es');
      }
    });
  }

  // Create Brightness Overlay
  let overlay = document.getElementById("brightness-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "brightness-overlay";
    document.body.appendChild(overlay);
  }

  // --- Brightness Slider Logic ---
  const brightnessSlider = document.getElementById("brightness-slider");
  const brightnessWrapper = document.getElementById("brightness-control-wrapper");
  
  if (brightnessSlider) {
    // Initial State Check
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      if (brightnessWrapper) brightnessWrapper.style.display = "flex";
      const savedOpacity = localStorage.getItem("dark-brightness") || "0";
      brightnessSlider.value = savedOpacity;
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${savedOpacity / 100})`;
    }
    
    brightnessSlider.addEventListener("input", function(e) {
      const val = e.target.value;
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${val / 100})`;
      localStorage.setItem("dark-brightness", val);
    });
  }

  // --- Code Block Copy Button & Translation Prevention ---
  const codeBlocks = document.querySelectorAll("div.highlighter-rouge, figure.highlight");
  codeBlocks.forEach(function(block) {
    // Add notranslate class to prevent Google Translate from translating code blocks
    block.classList.add("notranslate");
    block.setAttribute("translate", "no");

    // Prevent adding multiple headers if script runs twice
    if (block.querySelector('.code-header')) return;

    const header = document.createElement("div");
    header.className = "code-header";
    
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = "<i class='far fa-copy'></i> 복사";
    
    copyBtn.addEventListener("click", function() {
      // Find the code element
      const codeEl = block.querySelector("code");
      if (!codeEl) return;
      const code = codeEl.innerText;
      
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerHTML = "<i class='fas fa-check'></i> 복사됨!";
        setTimeout(() => {
          copyBtn.innerHTML = "<i class='far fa-copy'></i> 복사";
        }, 2000);
      });
    });
    
    header.appendChild(copyBtn);
    block.insertBefore(header, block.firstChild);
  });

  // Protect all inline code tags from being translated
  document.querySelectorAll("code").forEach(function(el) {
    el.classList.add("notranslate");
    el.setAttribute("translate", "no");
  });

  // --- Dynamic Floating TOC & Active Highlight (Scrollspy) ---
  const headers = Array.from(document.querySelectorAll(".blog-post h1, .blog-post h2, .blog-post h3")).filter(h => h.id);
  
  if (headers.length > 0) {
    // Create TOC container
    const tocContainer = document.createElement("div");
    tocContainer.className = "floating-toc d-none d-xl-block";
    
    const tocTitle = document.createElement("div");
    tocTitle.className = "toc-title";
    tocTitle.innerText = "목차";
    tocContainer.appendChild(tocTitle);
    
    const tocList = document.createElement("ul");
    tocList.className = "toc-list";
    
    headers.forEach(h => {
      const li = document.createElement("li");
      li.className = "toc-item toc-" + h.tagName.toLowerCase();
      
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.innerText = h.innerText;
      
      li.appendChild(a);
      tocList.appendChild(li);
    });
    
    tocContainer.appendChild(tocList);
    
    // Insert TOC into the main content area (e.g., body or side)
    document.body.appendChild(tocContainer);
    
    const tocLinks = tocContainer.querySelectorAll("a");
    
    // Scrollspy logic
    window.addEventListener("scroll", () => {
      let current = "";
      headers.forEach(h => {
        const hTop = h.getBoundingClientRect().top;
        if (hTop <= 150) {
          current = h.id;
        }
      });
      
      tocLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").endsWith("#" + current) && current !== "") {
          link.classList.add("active");
        }
      });
    });
  }

  // =========================================================================
  // Google Translate 다국어 번역 시스템 (KO, EN, JA, ZH) 및 로컬 사전
  // =========================================================================

  window.UI_TRANSLATIONS = {
    // Brand & Header
    "brand_title": {
      "ko": "omm0716 블로그",
      "en": "omm0716 Blog",
      "ja": "omm0716ブログ",
      "zh-CN": "omm0716博客"
    },
    "title_omm0716의 블로그": {
      "ko": "omm0716의 블로그",
      "en": "omm0716's Blog",
      "ja": "omm0716のブログ",
      "zh-CN": "omm0716的博客"
    },
    "subtitle_이 곳에서 프로그래밍을 공부 하고 기록 합니다. (I study and log programming here.)": {
      "ko": "이 곳에서 프로그래밍을 공부 하고 기록 합니다.",
      "en": "I study and record programming here.",
      "ja": "ここでプログラミングを学び、記録しています。",
      "zh-CN": "在这里学习并记录编程。"
    },
    "title_Python": {
      "ko": "Python",
      "en": "Python",
      "ja": "Python",
      "zh-CN": "Python"
    },
    "subtitle_파이썬 관련 모든 포스트를 모아둔 곳입니다. (This is a collection of all Python-related posts.)": {
      "ko": "파이썬 관련 모든 포스트를 모아둔 곳입니다.",
      "en": "This is a collection of all Python-related posts.",
      "ja": "Pythonに関連するすべての投稿의 컬렉션입니다.",
      "zh-CN": "这里收集了所有与 Python 相关的文章。"
    },
    "title_Database": {
      "ko": "Database",
      "en": "Database",
      "ja": "データベース",
      "zh-CN": "数据库"
    },
    "subtitle_데이터베이스 관련 모든 포스트를 모아둔 곳입니다. (This is a collection of all Database-related posts.)": {
      "ko": "데이터베이스 관련 모든 포스트를 모아둔 곳입니다.",
      "en": "This is a collection of all Database-related posts.",
      "ja": "データベースに関連するすべての投稿의 컬렉션입니다.",
      "zh-CN": "这里收集了所有与数据库相关的文章。"
    },
    "title_Machine Learning": {
      "ko": "Machine Learning",
      "en": "Machine Learning",
      "ja": "機械学習",
      "zh-CN": "机器学习"
    },
    "subtitle_머신러닝 관련 모든 포스트를 모아둔 곳입니다. (This is a collection of all Machine Learning-related posts.)": {
      "ko": "머신러닝 관련 모든 포스트를 모아둔 곳입니다.",
      "en": "This is a collection of all Machine Learning-related posts.",
      "ja": "機械学習に関連するすべての投稿의 컬렉션입니다.",
      "zh-CN": "这里收集了所有与机器学习相关的文章。"
    },
    "title_Tools": {
      "ko": "Tools",
      "en": "Tools",
      "ja": "ツール",
      "zh-CN": "工具"
    },
    "subtitle_개발 도구 관련 모든 포스트를 모아둔 곳입니다. (This is a collection of all Tools-related posts.)": {
      "ko": "개발 도구 관련 모든 포스트를 모아둔 곳입니다.",
      "en": "This is a collection of all Tools-related posts.",
      "ja": "開発ツールに関連するすべての投稿의 컬렉션입니다.",
      "zh-CN": "这里收集了所有与开发工具相关的文章。"
    },
    "title_C Language": {
      "ko": "C Language",
      "en": "C Language",
      "ja": "C言語",
      "zh-CN": "C 语言"
    },
    "subtitle_C언어 관련 모든 포스트를 모아둔 곳입니다. (This is a collection of all C Language-related posts.)": {
      "ko": "C언어 관련 모든 포스트를 모아둔 곳입니다.",
      "en": "This is a collection of all C Language-related posts.",
      "ja": "C言語に関連하는 모든 投稿의 컬렉션입니다.",
      "zh-CN": "这里收集了所有与 C 语言相关的文章。"
    },
    "title_C#": {
      "ko": "C#",
      "en": "C#",
      "ja": "C#",
      "zh-CN": "C#"
    },
    "subtitle_C# 관련 모든 포스트를 모아둔 곳입니다. (This is a collection of all C# related posts.)": {
      "ko": "C# 관련 모든 포스트를 모아둔 곳입니다.",
      "en": "This is a collection of all C# related posts.",
      "ja": "C#に関連하는 모든 投稿의 컬렉션입니다.",
      "zh-CN": "这里收集了所有与 C# 相关的文章。"
    },

    // Navbar items
    "nav_About Me": {
      "ko": "About Me",
      "en": "About Me",
      "ja": "プロフィール",
      "zh-CN": "关于我"
    },
    "nav_Github": {
      "ko": "Github",
      "en": "Github",
      "ja": "Github",
      "zh-CN": "Github"
    },
    "nav_🎮 게임": {
      "ko": "🎮 게임",
      "en": "🎮 Games",
      "ja": "🎮 ゲーム",
      "zh-CN": "🎮 游戏"
    },
    "nav_🍉 수박 게임": {
      "ko": "🍉 수박 게임",
      "en": "🍉 Watermelon",
      "ja": "🍉 スイカゲーム",
      "zh-CN": "🍉 合成大西瓜"
    },
    "nav_🍎 사과 게임": {
      "ko": "🍎 사과 게임",
      "en": "🍎 Apple Game",
      "ja": "🍎 アップルゲーム",
      "zh-CN": "🍎 苹果游戏"
    },

    // Sidebar
    "sidebar_categories": {
      "ko": "카테고리",
      "en": "Categories",
      "ja": "カテゴリ",
      "zh-CN": "文章分类"
    },
    "sidebar_popular_tags": {
      "ko": "인기 태그",
      "en": "Popular Tags",
      "ja": "人気タグ",
      "zh-CN": "热门标签"
    },
    "sidebar_recent_posts": {
      "ko": "최근 포스트",
      "en": "Recent Posts",
      "ja": "最近の投稿",
      "zh-CN": "最新文章"
    },
    "sidebar_no_categories": {
      "ko": "카테고리가 없습니다",
      "en": "No categories found",
      "ja": "カテゴリが見つかりません",
      "zh-CN": "未找到分类"
    },
    "category_Python": {
      "ko": "Python (파이썬)",
      "en": "Python",
      "ja": "Python (パイソン)",
      "zh-CN": "Python (派森)"
    },
    "category_Database": {
      "ko": "Database (데이터베이스)",
      "en": "Database",
      "ja": "データベース",
      "zh-CN": "数据库"
    },
    "category_Machine Learning": {
      "ko": "Machine Learning (머신러닝)",
      "en": "Machine Learning",
      "ja": "機械学習",
      "zh-CN": "机器学习"
    },
    "category_Tools": {
      "ko": "Tools (도구)",
      "en": "Tools",
      "ja": "ツール",
      "zh-CN": "工具"
    },
    "category_C-Language": {
      "ko": "C Language (C언어)",
      "en": "C Language",
      "ja": "C言語",
      "zh-CN": "C 语言"
    },
    "category_C-Sharp": {
      "ko": "C# (.NET)",
      "en": "C#",
      "ja": "C#",
      "zh-CN": "C#"
    },

    // General templates
    "posted_on": {
      "ko": "작성일:",
      "en": "Posted on",
      "ja": "投稿日:",
      "zh-CN": "发布于"
    },
    "read_more": {
      "ko": "더 보기",
      "en": "Read More",
      "ja": "続きを読む",
      "zh-CN": "阅读更多"
    },
    "tags": {
      "ko": "태그:",
      "en": "Tags:",
      "ja": "タグ:",
      "zh-CN": "标签:"
    },
    "newer_posts": {
      "ko": "이전 글",
      "en": "Newer Posts",
      "ja": "新しい投稿",
      "zh-CN": "较新的文章"
    },
    "older_posts": {
      "ko": "다음 글",
      "en": "Older Posts",
      "ja": "古い投稿",
      "zh-CN": "较旧的文章"
    },
    "prev_post_label": {
      "ko": "이전 포스트",
      "en": "Previous Post",
      "ja": "前の投稿",
      "zh-CN": "上一篇文章"
    },
    "first_post_label": {
      "ko": "첫 번째 포스트입니다",
      "en": "This is the first post",
      "ja": "これが最初の投稿です",
      "zh-CN": "这是第一篇文章"
    },
    "next_post_label": {
      "ko": "다음 포스트",
      "en": "Next Post",
      "ja": "次の投稿",
      "zh-CN": "下一篇文章"
    },
    "last_post_label": {
      "ko": "마지막 포스트입니다",
      "en": "This is the last post",
      "ja": "これが最後の投稿です",
      "zh-CN": "这是最后一篇文章"
    },

    // Daily quiz tooltips
    "quiz_medal_bronze_title": {
      "ko": "7일 연속 정답 (동메달)",
      "en": "7-day consecutive correct (Bronze Medal)",
      "ja": "7日連続正解 (銅メダル)",
      "zh-CN": "连续 7 天答对 (铜牌)"
    },
    "quiz_medal_silver_title": {
      "ko": "14일 연속 정답 (은메달)",
      "en": "14-day consecutive correct (Silver Medal)",
      "ja": "14日連続正解 (銀メダル)",
      "zh-CN": "连续 14 天答对 (银牌)"
    },
    "quiz_medal_gold_title": {
      "ko": "30일 연속 정답 (금메달)",
      "en": "30-day consecutive correct (Gold Medal)",
      "ja": "30日連続正解 (金メダル)",
      "zh-CN": "连续 30 天答对 (金牌)"
    },
    "by_author": {
      "ko": "작성자:",
      "en": "By",
      "ja": "著者:",
      "zh-CN": "作者:"
    },
    "last_updated": {
      "ko": "최근 업데이트:",
      "en": "Last updated",
      "ja": "最終更新日:",
      "zh-CN": "最近更新于"
    },
    // Recommender Widget - Intro
    "rec_title": {
      "ko": "나에게 딱 맞는 개발 로드맵 찾기 🎯",
      "en": "Find Your Perfect Development Roadmap 🎯",
      "ja": "自分にぴったりの開発ロードマップを見つける 🎯",
      "zh-CN": "寻找最适合您的开发路线图 🎯"
    },
    "rec_subtitle": {
      "ko": "어떤 언어부터 시작해야 할지 고민이신가요?<br>3개의 짧은 질문에 답하시면 omm0716 블로그의 포스트 중 지금 읽기 가장 좋은 최적의 가이드를 추천해 드립니다!",
      "en": "Wondering which language to start with?<br>Answer 3 short questions to find the best customized guide posts on omm0716 Blog!",
      "ja": "どの言語から始めればよいか迷っていませんか？<br>3つの簡単な質問に答えるだけで、omm0716ブログの投稿から今読むべき最適なガイドをおすすめします！",
      "zh-CN": "纠结于从哪门语言开始学习吗？<br>回答3个简短的问题，我们将在 omm0716 博客的文章中为您推荐当前最适合的阅读指南！"
    },
    "rec_start": {
      "ko": "진단 시작하기",
      "en": "Start Assessment",
      "ja": "診断を開始する",
      "zh-CN": "开始测试"
    },
    // Question 1
    "rec_q1_badge": {
      "ko": "질문 1 / 3",
      "en": "Question 1 / 3",
      "ja": "質問 1 / 3",
      "zh-CN": "问题 1 / 3"
    },
    "rec_q1_title": {
      "ko": "지금 가장 공부하고 싶거나 달성하고자 하는 목표는 무엇인가요?",
      "en": "What is your primary goal or area you want to study right now?",
      "ja": "今最も勉強したいことや、達成したい目標は何ですか？",
      "zh-CN": "您目前最想学习或最想达成的目标是什么？"
    },
    "rec_q1_a": {
      "ko": "컴퓨터 작동 방식과 프로그래밍의 깊은 기초 원리를 이해하고 싶습니다.",
      "en": "I want to understand how computers work and deep foundational programming principles.",
      "ja": "コンピュータの仕組みやプログラミングの深い基礎原理を理解したいです。",
      "zh-CN": "我想理解计算机运行机制以及底层的编程基础原理。"
    },
    "rec_q1_b": {
      "ko": "웹 데이터 자동 수집(크롤링), 간단한 API 활용 등 실용적인 기능을 구현해 보고 싶습니다.",
      "en": "I want to build practical functions like web crawling (scraping) and simple API integration.",
      "ja": "ウェブデータの自動収集（クローリング）や、簡単なAPI連携などの実用的な機能を実装してみたいです。",
      "zh-CN": "我想实现网页数据自动采集（爬虫）、简单 API 对接等实用功能。"
    },
    "rec_q1_c": {
      "ko": "데이터베이스 설계와 SQL 조리를 자유자재로 다루며 데이터를 다루는 법을 마스터하고 싶습니다.",
      "en": "I want to master database design, SQL querying, and data manipulation.",
      "ja": "データベース設計やSQLクエリを自在に操り、データ処理をマスターしたいです。",
      "zh-CN": "我想自由掌握数据库设计与 SQL 查询，彻底精通数据处理。"
    },
    "rec_q1_d": {
      "ko": "인공지능(AI)과 머신러닝의 알고리즘을 분석하고, PDF 문서 기반 RAG 챗봇을 만들어 보고 싶습니다.",
      "en": "I want to analyze AI/ML algorithms and build PDF-based RAG chatbots.",
      "ja": "人工知能（AI）や機械学習のアルゴリズムを分析し、PDF文書ベースの RAGチャットボットを作ってみたいです。",
      "zh-CN": "我想分析人工智能（AI）和机器学习算法，并构建基于 PDF 文档的 RAG 聊天机器人。"
    },
    "rec_q1_e": {
      "ko": "Windows용 데스크톱 프로그램(GUI) 개발과 견고한 객체 지향 프로그래밍 설계를 배우고 싶습니다.",
      "en": "I want to learn object-oriented design and Windows desktop GUI application development.",
      "ja": "Windows用のデスクトップアプリ（GUI）開発や、堅牢なオブジェクト指向プログラミング設計を学びたいです。",
      "zh-CN": "我想学习 Windows 桌面程序（GUI）开发以及严谨的面向对象程序设计。"
    },
    // Question 2
    "rec_q2_badge": {
      "ko": "질문 2 / 3",
      "en": "Question 2 / 3",
      "ja": "質問 2 / 3",
      "zh-CN": "问题 2 / 3"
    },
    "rec_q2_title": {
      "ko": "자신의 현재 코딩 숙련도 및 원하시는 강좌 스타일은 어떤가요?",
      "en": "What is your current coding proficiency and preferred tutorial style?",
      "ja": "ご自身の現在のコーディング習熟度や、希望する講座のスタイルはどうですか？",
      "zh-CN": "您目前的编程水平以及期望的学习风格是什么？"
    },
    "rec_q2_a": {
      "ko": "<strong>완전 기초부터 차근차근:</strong> 변수, 제어문 등 아주 기본적인 문법 개념부터 차근차근 다지는 입문 코스가 필요합니다.",
      "en": "<strong>Beginner Step-by-step:</strong> I need an introductory course focusing on basic syntax like variables and control flows.",
      "ja": "<strong>基礎から一歩ずつ：</strong> 変数や制御文など、ごく基本的な文法概念からしっかりと固める入門コースが必要です。",
      "zh-CN": "<strong>从零开始循序渐进：</strong> 我需要从变量、控制语句等最基础的语法概念开始打牢基础的入门课程。"
    },
    "rec_q2_b": {
      "ko": "<strong>실전 활용 및 심화:</strong> 기본 문법보다는 데이터 분석, 알고리즘 구현, 클래스 설계 등 동작하는 프로젝트 실습 중심이 좋습니다.",
      "en": "<strong>Practical & Advanced:</strong> I prefer project-based practice such as data analysis, algorithms, and class design rather than basic syntax.",
      "ja": "<strong>実践活用と深掘り：</strong> 基本文法よりも、データ分析やアルゴリズム実装、クラス設計など、実際に動くプロジェクトの実習中心が良いです。",
      "zh-CN": "<strong>实战应用与进阶：</strong> 相比基础语法，我更喜欢数据分析、算法实现、类设计等实际项目演练课程。"
    },
    "rec_q2_c": {
      "ko": "<strong>핵심 도구 활용:</strong> 깃(Git)과 깃허브(GitHub) 버전 관리처럼 개발자 협업의 핵심 필수 도구를 빠르게 익히고 싶습니다.",
      "en": "<strong>Essential Tools:</strong> I want to quickly learn developer collaboration tools like Git and GitHub version control.",
      "ja": "<strong>必須ツールの活用：</strong> GitやGitHubのバージョン管理など、開発者の共同作業に欠かせない必須ツールを素早く身につけたいです。",
      "zh-CN": "<strong>核心工具应用：</strong> 我想快速掌握 Git 和 GitHub 版本控制等程序员协同开发的核心必备工具。"
    },
    // Question 3
    "rec_q3_badge": {
      "ko": "질문 3 / 3",
      "en": "Question 3 / 3",
      "ja": "質問 3 / 3",
      "zh-CN": "问题 3 / 3"
    },
    "rec_q3_title": {
      "ko": "아래 나열된 실습 프로젝트 중 가장 직접 만들어 보고 싶은 것은 무엇인가요?",
      "en": "Which of the following hands-on projects do you want to build the most?",
      "ja": "以下に挙げる実習プロジェクトの中で、最も直接作ってみたいものはどれですか？",
      "zh-CN": "在下方列出的实战项目中，您最想亲自动手实现的是哪一个？"
    },
    "rec_q3_a": {
      "ko": "금액권별 지폐 계산기 및 선택/버블 정렬 등의 정렬 알고리즘 실습",
      "en": "Currency bill calculator and sorting algorithms like Selection/Bubble sort",
      "ja": "金種別のお札計算機や選択ソート・バブルソートなどのソートアルゴリズムの実習",
      "zh-CN": "按面额计算纸币数量 the 计算器，以及选择排序、冒泡排序等排序算法演练"
    },
    "rec_q3_b": {
      "ko": "반도체 장비 DB 설계, 4테이블 결합, 공정 센서 측정 데이터 이상값 분석",
      "en": "Semiconductor equipment DB design, 4-table join, and process sensor anomaly detection",
      "ja": "半導体装置DB設計、4テーブル結合、工程センサー測定データの異常値分析",
      "zh-CN": "半导体设备数据库设计、4表关联查询、以及工艺传感器测量数据异常值分析"
    },
    "rec_q3_c": {
      "ko": "K-Means/DBSCAN 군집 분석 및 LangChain 기반 PDF 문서 연동 AI 챗봇",
      "en": "K-Means/DBSCAN clustering and LangChain-based PDF-linked AI chatbot",
      "ja": "K-Means / DBSCANクラスター分析やLangChainベースのPDF文書連携AIチャットボット",
      "zh-CN": "K-Means/DBSCAN 聚类分析，以及基于 LangChain 的 PDF 文档联动 AI 聊天机器人"
    },
    "rec_q3_d": {
      "ko": "카페 무인 주문 영수증 출력 루프 및 다중 클래스 기반 재고 관리 WinForms 프로그램",
      "en": "Kiosk receipt printing loop and multi-class inventory management WinForms app",
      "ja": "カフェ無人注文レシート出力ループや複数クラスベースの在庫管理WinFormsアプリ",
      "zh-CN": "咖啡馆自助点单小票打印循环，以及基于多类的库存管理 WinForms 应用程序"
    },
    "rec_q3_e": {
      "ko": "실시간 날씨 공공 API 호출 데이터 파싱 및 파일(CSV, JSON) 저장 프로그램",
      "en": "Real-time public weather API call data parser and CSV/JSON file writer",
      "ja": "リアルタイム気象公共API呼び出しデータの解析とファイル（CSV、JSON）保存プログラム",
      "zh-CN": "实时天气公共 API 调用数据解析及文件（CSV、JSON）保存程序"
    },
    "rec_q3_f": {
      "ko": "내 컴퓨터의 코드를 로컬 저장소에 커밋하고 GitHub 클라우드 저장소와 연동하기",
      "en": "Commit local code to a repository and link with GitHub cloud repository",
      "ja": "自分のパソコンのコードをローカルリポジトリにコミットし、GitHubクラウドリポジトリと連携する",
      "zh-CN": "将本地电脑上的代码提交至本地仓库，并与 GitHub 云端仓库进行联动"
    },
    // Result
    "rec_result_badge": {
      "ko": "✨ 맞춤 추천 결과",
      "en": "✨ Custom Recommendations",
      "ja": "✨ おすすめ診断結果",
      "zh-CN": "✨ 个性化推荐结果"
    },
    "rec_restart": {
      "ko": "테스트 다시 하기",
      "en": "Retake Test",
      "ja": "テストをやり直す",
      "zh-CN": "重新测试"
    },
    "rec_explore": {
      "ko": "카테고리 전체보기",
      "en": "View Full Category",
      "ja": "カテゴリー全体を見る",
      "zh-CN": "查看全部分类"
    }
  };

  // 1. 구글 번역용 숨김 앵커 생성
  let gtDiv = document.getElementById("google_translate_element");
  if (!gtDiv) {
    gtDiv = document.createElement("div");
    gtDiv.id = "google_translate_element";
    gtDiv.style.position = "absolute";
    gtDiv.style.top = "-9999px";
    gtDiv.style.left = "-9999px";
    gtDiv.style.width = "1px";
    gtDiv.style.height = "1px";
    gtDiv.style.overflow = "hidden";
    document.body.appendChild(gtDiv);
  }

  // 2. 구글 번역 엔진 초기화 콜백 정의 (글로벌 바인딩)
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'ko',
      includedLanguages: 'en,ja,zh-CN',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
    
    // 로드 즉시 바로 로컬 스토리지 선호 언어 반영
    const preferredLang = localStorage.getItem('blog_preferred_lang') || 'ko';
    applyLanguage(preferredLang);
  };

  // 3. 구글 번역 스크립트 비동기 삽입
  const gtScript = document.createElement("script");
  gtScript.type = "text/javascript";
  gtScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(gtScript);

  // 4. 전역 언어 변경 이벤트 핸들러 바인딩
  window.changeLanguage = function(langCode) {
    localStorage.setItem('blog_preferred_lang', langCode);
    applyLanguage(langCode);
  };

  // 5. 실제 번역 적용 기능 (로컬 번역 + 구글 번역 콤보 박스 제어 및 라벨 갱신 - 폴링 방식)
  let translatePollInterval = null;
  function applyLanguage(langCode) {
    // 로컬 딕셔너리 기반 네이티브 번역 적용
    applyNativeTranslations(langCode);

    // 이벤트 브로드캐스트하여 동적 컴포넌트(퀴즈, 추천) 리렌더링 유도
    window.dispatchEvent(new CustomEvent('blogLanguageChanged', { detail: { language: langCode } }));

    // 언어 라벨 업데이트
    const currentLangLabel = document.getElementById('current-lang-label');
    if (currentLangLabel) {
      const labels = {
        'ko': 'KO',
        'en': 'EN',
        'ja': 'JA',
        'zh-CN': 'ZH'
      };
      currentLangLabel.innerText = labels[langCode] || 'KO';
    }

    // 기존 폴링이 있으면 제거
    if (translatePollInterval) {
      clearInterval(translatePollInterval);
      translatePollInterval = null;
    }

    let attempts = 0;
    const maxAttempts = 50; // 50 * 200ms = 10초 동안 대기
    translatePollInterval = setInterval(() => {
      const selectEl = document.querySelector('.goog-te-combo');
      if (selectEl) {
        clearInterval(translatePollInterval);
        translatePollInterval = null;

        let targetValue = langCode;
        if (langCode === 'ko') {
          // 한국어인 경우 'ko' 옵션이 있는지 확인하고 없으면 빈 문자열("")로 설정하여 번역 해제
          let hasKo = false;
          for (let i = 0; i < selectEl.options.length; i++) {
            if (selectEl.options[i].value === 'ko') {
              hasKo = true;
              break;
            }
          }
          targetValue = hasKo ? 'ko' : '';
        }

        if (selectEl.value !== targetValue) {
          selectEl.value = targetValue;
          selectEl.dispatchEvent(new Event('change'));
        }
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(translatePollInterval);
          translatePollInterval = null;
          console.warn('Google Translate combo box not found after 10 seconds.');
        }
      }
    }, 200);
  }

  // 로컬 번역 처리기 구현
  function applyNativeTranslations(lang) {
    const dict = window.UI_TRANSLATIONS;
    if (!dict) return;

    // 1. data-i18n 처리 (textContent / innerHTML)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] && dict[key][lang] !== undefined) {
        const val = dict[key][lang];
        if (val.includes('<') && val.includes('>')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 2. data-i18n-title 처리
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key] && dict[key][lang] !== undefined) {
        el.setAttribute('title', dict[key][lang]);
      }
    });

    // 3. data-i18n-placeholder 처리
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] && dict[key][lang] !== undefined) {
        el.setAttribute('placeholder', dict[key][lang]);
      }
    });

    // 4. 읽기 시간(Read Time) 처리
    const readTimeValEl = document.getElementById('post-read-time-value');
    const readTimeDispEl = document.getElementById('post-read-time-display');
    if (readTimeValEl && readTimeDispEl) {
      const mins = parseInt(readTimeValEl.textContent.trim(), 10) || 0;
      if (lang === 'ko') {
        readTimeDispEl.textContent = mins >= 1 ? `${mins}분 분량` : `1분 미만 분량`;
      } else if (lang === 'ja') {
        readTimeDispEl.textContent = mins >= 1 ? `${mins}分で読めます` : `1分未満で読めます`;
      } else if (lang === 'zh-CN') {
        readTimeDispEl.textContent = mins >= 1 ? `预计阅读时间 ${mins} 分钟` : `预计阅读时间少于 1 分钟`;
      } else {
        // English
        readTimeDispEl.textContent = mins >= 1 ? `${mins} minute read` : `< 1 minute read`;
      }
    }
  }

  // 6. DOM 로드 직후 로컬 번역 즉시 적용 (레이아웃 깜빡임 및 지연 방지)
  const initialPreferredLang = localStorage.getItem('blog_preferred_lang') || 'ko';
  applyNativeTranslations(initialPreferredLang);
  
  const currentLangLabel = document.getElementById('current-lang-label');
  if (currentLangLabel) {
    const labels = {
      'ko': 'KO',
      'en': 'EN',
      'ja': 'JA',
      'zh-CN': 'ZH'
    };
    currentLangLabel.innerText = labels[initialPreferredLang] || 'KO';
  }
});
