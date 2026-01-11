// Year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Theme toggle (default: dark)
(function() {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  function updateButton(theme) {
    if (!toggle) return;
    if (theme === 'dark') {
      toggle.textContent = '☀️ Light';
      toggle.setAttribute('aria-pressed', 'true');
    } else {
      toggle.textContent = '🌙 Dark';
      toggle.setAttribute('aria-pressed', 'false');
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') body.classList.add('dark');
    else body.classList.remove('dark');
    updateButton(theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
  }

  // Restore saved theme or default to dark
  try {
    const saved = localStorage.getItem('theme');
    const initial = saved === 'light' ? 'light' : 'dark';
    applyTheme(initial);
  } catch (e) {
    applyTheme('dark');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Scroll-to-top button: show on scroll, smooth scroll to top on click
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    const threshold = 200; // show button after 200px of scrolling (changed)

    function updateScrollBtn() {
      if (window.scrollY > threshold) scrollBtn.classList.add('visible');
      else scrollBtn.classList.remove('visible');
    }

    // Throttle scroll handler for performance
    let scheduled = false;
    window.addEventListener('scroll', () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          updateScrollBtn();
          scheduled = false;
        });
      }
    });

    // Initial state
    updateScrollBtn();

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // allow keyboard activation
    scrollBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();