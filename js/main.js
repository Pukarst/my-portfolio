(() => {
  const body = document.body;
  const hidePageLoader = () => {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    body.setAttribute('aria-busy', 'false');
  };
  const loaderTimeout = window.setTimeout(hidePageLoader, 1600);
  window.addEventListener('load', () => {
    window.clearTimeout(loaderTimeout);
    hidePageLoader();
  }, { once: true });

  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
    const next = theme === 'dark' ? 'light' : 'dark';
    themeButton?.setAttribute('aria-label', `Switch to ${next} mode`);
    themeButton?.setAttribute('title', `Switch to ${next} mode`);
    if (themeButton) themeButton.innerHTML = theme === 'dark' ? '<span aria-hidden="true">&#9728;</span>' : '<span aria-hidden="true">&#9790;</span>';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b1120' : '#f8fafc');
  };
  setTheme(root.dataset.theme || 'dark');
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const menuButton = document.querySelector('.menu-toggle');
  const navPanel = document.querySelector('.nav-panel');
  const closeMenu = () => {
    navPanel?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  };
  menuButton?.addEventListener('click', () => {
    const open = navPanel?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navPanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter-button').forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('.project-card').forEach((card) => {
        const tech = (card.dataset.tech || '').split(' ');
        card.hidden = filter !== 'all' && !tech.includes(filter);
      });
    });
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section-top, .section-heading-row, .about-copy, .highlights, .skill-card, .experience-card, .project-card, .services-grid article, .education-item, .learning-list, .contact-form'
    );
    document.documentElement.classList.add('has-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = `Portfolio inquiry from ${data.get('name')}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
    const url = `mailto:bade5pukar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const note = document.querySelector('#form-note');
    if (note) note.textContent = 'Your email app should open with the message ready. If it does not, email bade5pukar@gmail.com directly.';
    window.location.href = url;
  });
})();
