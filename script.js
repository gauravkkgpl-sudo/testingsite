const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

function openModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) modalOverlay.classList.add('open');
}

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
}

const modalOverlayEl = document.getElementById('modalOverlay');
if (modalOverlayEl) {
  modalOverlayEl.addEventListener('click', e => {
    if (e.target.id === 'modalOverlay') closeModal();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* Hero Slider */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('#sliderDots button');
let current = 0, timer;

function showSlide(i) {
  if (!slides.length) return;
  slides[current].classList.remove('active');
  if (dots[current]) dots[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  if (dots[current]) dots[current].classList.add('active');
}

function goToSlide(i) { showSlide(i); resetTimer(); }
function changeSlide(dir) { showSlide(current + dir); resetTimer(); }
function resetTimer() {
  if (!slides.length) return;
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 6000);
}

const heroSliderEl = document.getElementById('heroSlider');
if (heroSliderEl && slides.length) {
  resetTimer();
  heroSliderEl.addEventListener('mouseenter', () => clearInterval(timer));
  heroSliderEl.addEventListener('mouseleave', resetTimer);
}

/* Scroll top button */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 420);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Fade-up Intersection Observer */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));