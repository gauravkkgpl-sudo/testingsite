const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

function openModal() {
  const modal = document.getElementById('modalOverlay');
  if (modal) modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('modalOverlay');
  if (modal) modal.classList.remove('open');
}

const modalOverlay = document.getElementById('modalOverlay');
if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
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

const heroSlider = document.getElementById('heroSlider');
if (heroSlider && slides.length) {
  resetTimer();
  heroSlider.addEventListener('mouseenter', () => clearInterval(timer));
  heroSlider.addEventListener('mouseleave', resetTimer);
}

/* Scroll top button */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Fade-up Intersection Observer */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));