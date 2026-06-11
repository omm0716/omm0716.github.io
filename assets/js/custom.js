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

  // --- Code Block Copy Button ---
  const codeBlocks = document.querySelectorAll("div.highlighter-rouge, figure.highlight");
  codeBlocks.forEach(function(block) {
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
    }
  };

  // 1. 구글 번역용 숨김 앵커 생성
  let gtDiv = document.getElementById("google_translate_element");
  if (!gtDiv) {
    gtDiv = document.createElement("div");
    gtDiv.id = "google_translate_element";
    gtDiv.style.display = "none";
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
    
    // 로드 직후 로컬 스토리지 선호 언어 반영 (약간 지연을 두어 콤보박스 파싱 대기)
    setTimeout(() => {
      const preferredLang = localStorage.getItem('blog_preferred_lang') || 'ko';
      applyLanguage(preferredLang);
    }, 800);
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

  // 5. 실제 번역 적용 기능 (로컬 번역 + 구글 번역 콤보 박스 제어 및 라벨 갱신)
  function applyLanguage(langCode) {
    // 로컬 딕셔너리 기반 네이티브 번역 적용
    applyNativeTranslations(langCode);

    // 이벤트 브로드캐스트하여 동적 컴포넌트(퀴즈, 추천) 리렌더링 유도
    window.dispatchEvent(new CustomEvent('blogLanguageChanged', { detail: { language: langCode } }));

    const selectEl = document.querySelector('.goog-te-combo');
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change'));
      
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
    } else {
      // 아직 구글 콤보박스가 DOM에 파싱되지 않은 경우 폴링 재시도
      setTimeout(() => {
        const selectElRetry = document.querySelector('.goog-te-combo');
        if (selectElRetry) {
          selectElRetry.value = langCode;
          selectElRetry.dispatchEvent(new Event('change'));
        }
      }, 500);

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
    }
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
