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
});
