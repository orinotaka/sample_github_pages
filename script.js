"use strict";

// Theme handling
(function initTheme() {
  try {
    var saved = localStorage.getItem("theme");
    var shouldUseDark = saved
      ? saved === "dark"
      : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (shouldUseDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch (_) {
    // ignore
  }
})();

window.addEventListener("DOMContentLoaded", function () {
  var toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    updateToggleState(toggleBtn, isDark);
    toggleBtn.addEventListener("click", function () {
      var currentlyDark = document.documentElement.getAttribute("data-theme") === "dark";
      var nextIsDark = !currentlyDark;
      if (nextIsDark) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      try {
        localStorage.setItem("theme", nextIsDark ? "dark" : "light");
      } catch (_) {
        // ignore
      }
      updateToggleState(toggleBtn, nextIsDark);
    });
  }

  function updateToggleState(btn, isDark) {
    btn.setAttribute("aria-pressed", String(isDark));
    btn.textContent = isDark ? "ライトテーマにする" : "テーマを切り替える";
  }

  // Reveal on scroll
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (revealEls.length === 0) return;

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el, i) {
      // slight stagger
      el.style.transitionDelay = (i * 60) + "ms";
      observer.observe(el);
    });
  } else {
    // Fallback without IO
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
});


