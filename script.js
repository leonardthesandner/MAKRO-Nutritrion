/* Mobile nav */
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
  });
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMobile.classList.remove('active');
    });
  });
}

/* Accordion */
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.parentElement;
    const group = item.parentElement;
    group.querySelectorAll('.accordion-item').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

/* Generic slider — works on placeholder frames or real <img>s alike */
document.querySelectorAll('.product-swiper').forEach(swiper => {
  const track = swiper.querySelector('.product-swiper-track');
  const slides = swiper.querySelectorAll('.swiper-slide');
  const dots = swiper.querySelectorAll('.swiper-dot');
  const prev = swiper.querySelector('.swiper-prev');
  const next = swiper.querySelector('.swiper-next');
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * (100 / slides.length)}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }
  function go(delta) {
    index = (index + delta + slides.length) % slides.length;
    update();
  }

  if (prev) prev.addEventListener('click', () => go(-1));
  if (next) next.addEventListener('click', () => go(1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; update(); }));

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
  }, { passive: true });
});

/* Scroll reveal */
const revealItems = document.querySelectorAll('[data-reveal]');
if (revealItems.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(el => io.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('is-visible'));
}

/* Count-up for data readouts */
const countTargets = document.querySelectorAll('[data-count]');
if (countTargets.length && 'IntersectionObserver' in window) {
  const countIo = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      countIo.unobserve(el);
      const raw = el.dataset.count;
      const match = raw.match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = parseInt(match[1], 10);
      const suffix = match[2] || '';
      const duration = 700;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  countTargets.forEach(el => countIo.observe(el));
}
