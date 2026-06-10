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

document.querySelectorAll('.product-swiper').forEach(swiper => {
  const track = swiper.querySelector('.product-swiper-track');
  const slides = swiper.querySelectorAll('.product-swiper-track img');
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

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; update(); }));

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
  }, { passive: true });
});
