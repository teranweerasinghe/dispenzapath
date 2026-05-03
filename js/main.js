// DispenzaPath — Global JS

// Mobile nav toggle
(function() {
  const ham = document.getElementById('hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  if (ham && mobileNav) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }
})();

// Reading progress bar
(function() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const total = doc.scrollHeight - doc.clientHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  });
})();

// FAQ accordion (for pages not using <details>)
(function() {
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer-body');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-answer-body').style.maxHeight = '0';
        el.querySelector('.faq-icon').textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.textContent = '×';
      }
    });
  });
})();

// Smooth active nav link highlight
(function() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href')) && a.getAttribute('href') !== '/') {
      a.classList.add('active');
    }
  });
})();

// Scroll-triggered fade animations
(function() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-up'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

// Search functionality
function initSearch(allPosts) {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const count = document.getElementById('result-count');
  if (!input || !results) return;

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  if (q) { input.value = q; runSearch(q); }

  input.addEventListener('input', () => runSearch(input.value));

  function runSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) { results.innerHTML = ''; if (count) count.textContent = ''; return; }
    const found = allPosts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    );
    if (count) count.textContent = found.length + ' result' + (found.length !== 1 ? 's' : '') + ' for "' + query + '"';
    if (!found.length) {
      results.innerHTML = '<div class="no-results"><p>No articles found for <strong>"' + query + '"</strong>.<br>Try searching for a concept, meditation, or book name.</p></div>';
      return;
    }
    results.innerHTML = '<div class="posts-grid">' + found.map(p => `
      <a class="post-card" href="${p.url}">
        <div class="post-thumb ${p.bg}">${p.roman}</div>
        <div class="post-body">
          <div class="post-cat">${p.category}</div>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <div class="post-meta"><span>${p.date}</span><span class="post-read">${p.read} →</span></div>
        </div>
      </a>`).join('') + '</div>';
  }
}

// Newsletter form
(function() {
  document.querySelectorAll('.email-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      const btn = form.querySelector('button');
      if (!input.value) return;
      btn.textContent = 'Subscribed ✓';
      btn.style.background = '#5C7A5A';
      input.value = '';
      input.placeholder = 'Thanks! Check your inbox.';
      setTimeout(() => { btn.textContent = 'Subscribe →'; btn.style.background = ''; input.placeholder = 'your@email.com'; }, 4000);
    });
  });
})();
