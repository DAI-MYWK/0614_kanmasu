// ========== DOMContentLoaded イベント ==========
document.addEventListener("DOMContentLoaded", function () {
  // ========== 変数定義 ==========
  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const heroImages = document.querySelectorAll(".hero-img");
  const strengthItems = document.querySelectorAll(".strength-item");

  // 流れるスライダー関連
  const sliderTrack = document.querySelector(".slider-track");

  // ========== ヘッダースクロール効果 ==========
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  });

  // ========== ハンバーガーメニュー ==========
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      // ハンバーガーアニメーション
      const spans = hamburger.querySelectorAll("span");
      if (hamburger.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";

        // メニュー表示
        navMenu.style.display = "flex";
        navMenu.style.flexDirection = "column";
        navMenu.style.position = "absolute";
        navMenu.style.top = "100%";
        navMenu.style.left = "0";
        navMenu.style.right = "0";
        navMenu.style.background = "white";
        navMenu.style.padding = "2rem";
        navMenu.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";

        // メニュー非表示
        navMenu.style.display = "";
        navMenu.style.flexDirection = "";
        navMenu.style.position = "";
        navMenu.style.top = "";
        navMenu.style.left = "";
        navMenu.style.right = "";
        navMenu.style.background = "";
        navMenu.style.padding = "";
        navMenu.style.boxShadow = "";
      }
    });

    // メニューリンククリック時の処理
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // モバイルメニューを閉じる
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";

        navMenu.style.display = "";
        navMenu.style.flexDirection = "";
        navMenu.style.position = "";
        navMenu.style.top = "";
        navMenu.style.left = "";
        navMenu.style.right = "";
        navMenu.style.background = "";
        navMenu.style.padding = "";
        navMenu.style.boxShadow = "";
      });
    });
  }

  // ========== スムーズスクロール ==========
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ========== ヒーロー画像のホバー効果（固定のため無効化）==========
  // ヒーロー画像は固定表示のためホバー効果を無効化

  // ========== 強みセクションのインタラクション ==========
  strengthItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const img = this.querySelector(".strength-img");
      if (img) {
        img.style.opacity = "0.3";
        img.style.transform = "scale(1.1)";
      }
    });

    item.addEventListener("mouseleave", function () {
      const img = this.querySelector(".strength-img");
      if (img) {
        img.style.opacity = "0.1";
        img.style.transform = "scale(1)";
      }
    });
  });

  // ========== お客様の声スライダー ==========
  function initVoiceSlider() {
    const voiceSliderTrack = document.querySelector(".voice-slider-track");

    if (!voiceSliderTrack) {
      console.error("Voice slider track not found");
      return;
    }

    // アニメーションを強制的に開始
    voiceSliderTrack.style.animation = "slideVoices 30s linear infinite";

    // ホバー時の一時停止
    const voiceSlider = document.querySelector(".voice-slider");
    if (voiceSlider) {
      voiceSlider.addEventListener("mouseenter", () => {
        voiceSliderTrack.style.animationPlayState = "paused";
      });

      voiceSlider.addEventListener("mouseleave", () => {
        voiceSliderTrack.style.animationPlayState = "running";
      });
    }

    console.log("Voice slider initialized and running");
  }

  // スライダーを初期化
  initVoiceSlider();

  // 念のため少し遅延してもう一度実行
  setTimeout(initVoiceSlider, 500);

  // ========== ソリューションタブ機能 ==========
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // 全てのタブボタンとコンテンツを非アクティブ化
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // クリックされたタブボタンをアクティブ化
      this.classList.add("active");

      // 対応するタブコンテンツをアクティブ化
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // ========== スクロールアニメーション ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を監視
  const animationTargets = document.querySelectorAll(`
        .section-title,
        .section-subtitle,
        .service-card,
        .strength-item,
        .news-item,
        .stakeholder-item,
        .mission-content,
        .mission-visual,
        .hero-content,
        .hero-visual,
        .achievement-slide,
        .solution-tabs,
        .contact-visual,
        .contact-content,
        .timeline-item,
        .tool-card,
        .support-main,
        .voice-card,
        .strength-hero-content,
        .strength-hero-image
    `);

  // 左右スライドイン要素も監視
  const slideTargets = document.querySelectorAll(
    ".slide-in-left, .slide-in-right, .fade-in"
  );

  // 通常のアニメーション要素
  animationTargets.forEach((target, index) => {
    if (
      !target.classList.contains("slide-in-left") &&
      !target.classList.contains("slide-in-right") &&
      !target.classList.contains("fade-in")
    ) {
      target.classList.add("animate-target");
      target.style.animationDelay = `${index * 0.05}s`;
      observer.observe(target);
    }
  });

  // 左右スライドイン要素
  slideTargets.forEach((target, index) => {
    target.style.animationDelay = `${index * 0.1}s`;
    observer.observe(target);
  });

  // ========== ステークホルダーアイテムの遅延アニメーション ==========
  const stakeholderItems = document.querySelectorAll(".stakeholder-item");
  stakeholderItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // ========== フォーム送信処理 ==========
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // フォームデータを取得
      const formData = new FormData(this);
      const company = formData.get("company");
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const message = formData.get("message");

      // 簡単なバリデーション
      if (!company || !name || !email || !message) {
        alert(
          "必須項目（会社名・担当者名・メールアドレス・お問合せ内容）を入力してください。"
        );
        return;
      }

      // Email形式のチェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("正しいメールアドレスを入力してください。");
        return;
      }

      // 送信ボタンを無効化
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "送信中...";

      // ここで実際の送信処理を行う
      // 現在はデモなので、2秒後に成功メッセージを表示
      setTimeout(() => {
        alert(
          "お問い合わせありがとうございます。\n2営業日以内にご連絡いたします。"
        );
        this.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 2000);
    });
  }

  // ========== パララックス効果（ヒーロー画像は固定のため無効化）==========
  // ヒーロー画像は固定表示のためパララックス効果を無効化

  // ========== 数値カウントアニメーション ==========
  function animateNumber(element, start, end, duration) {
    let startTime = null;

    function animate(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // 数値要素が表示されたらアニメーション開始
  const numberElements = document.querySelectorAll("[data-number]");
  const numberObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const endNumber = parseInt(element.dataset.number);
        animateNumber(element, 0, endNumber, 2000);
        numberObserver.unobserve(element);
      }
    });
  });

  numberElements.forEach((element) => {
    numberObserver.observe(element);
  });

  // ========== スクロール進捗バー ==========
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // ========== 画像の遅延読み込み ==========
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });

  // ========== ツールチップ機能 ==========
  const tooltipElements = document.querySelectorAll("[data-tooltip]");
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = this.dataset.tooltip;
      tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
      document.body.appendChild(tooltip);

      this._tooltip = tooltip;
    });

    element.addEventListener("mousemove", function (e) {
      if (this._tooltip) {
        this._tooltip.style.left = e.pageX + 10 + "px";
        this._tooltip.style.top = e.pageY - 40 + "px";
      }
    });

    element.addEventListener("mouseleave", function () {
      if (this._tooltip) {
        document.body.removeChild(this._tooltip);
        this._tooltip = null;
      }
    });
  });

  // ========== キーボードナビゲーション ==========
  document.addEventListener("keydown", function (e) {
    // スライダーのキーボード操作
    if (
      e.key === "ArrowLeft" &&
      document.activeElement.closest(".achievements-slider")
    ) {
      prevSlide();
      resetSlideInterval();
    } else if (
      e.key === "ArrowRight" &&
      document.activeElement.closest(".achievements-slider")
    ) {
      nextSlide();
      resetSlideInterval();
    }
  });

  // ========== 初期化完了のログ ==========
  console.log("KANMASU Website initialized successfully! 🚀");
});

// ========== ページ読み込み完了後の処理 ==========
window.addEventListener("load", function () {
  // プリローダーがある場合の処理
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }

  // ページロード完了のアニメーション
  document.body.classList.add("loaded");
});

// ========== リサイズ対応 ==========
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    // リサイズ後の処理
    const slides = document.querySelectorAll(".achievement-slide");
    if (slides.length > 0) {
      // スライダーの高さを再調整
      const sliderContainer = document.querySelector(".slider-container");
      if (sliderContainer && window.innerWidth <= 768) {
        sliderContainer.style.height = "600px";
      } else if (sliderContainer) {
        sliderContainer.style.height = "400px";
      }
    }
  }, 250);
});

// ========== エラーハンドリング ==========
window.addEventListener("error", function (e) {
  console.error("Script error:", e.error);
});

// ========== ユーティリティ関数 ==========
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
