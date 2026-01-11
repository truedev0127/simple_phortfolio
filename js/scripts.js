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
    const iconEl = toggle.querySelector('.theme-icon');
    const sunSVG = '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    const moonSVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

    if (theme === 'dark') {
      // show sun icon because clicking will switch to light
      if (iconEl) iconEl.innerHTML = sunSVG;
      toggle.setAttribute('aria-pressed', 'true');
      toggle.setAttribute('title', 'Switch to light mode');
    } else {
      // show moon icon because clicking will switch to dark
      if (iconEl) iconEl.innerHTML = moonSVG;
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('title', 'Switch to dark mode');
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