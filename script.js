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
  if (e.key === 'Escape') {
    closeModal();
    closeDetail();
  }
});

/* hero slider (only runs if slider exists on the page) */
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

/* humanity detail popups */
const humanityDetails = [
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14311F" stroke-width="1.6"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-4 4-6 7-6s5.5 2 7 6"/></svg>',
    title: 'Spend time with someone lonely',
    body: 'Loneliness is one of the quietest struggles people face, especially among the elderly, the widowed, or those living far from family. You don’t need a plan — a short visit, a regular phone call, or simply sitting with someone over tea can lift their whole week. Try setting a recurring reminder to check in on one person, even for ten minutes. Consistency matters more than the length of the visit.'
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14311F" stroke-width="1.6"><path d="M8 10c0-2.5 2-4 4-4s4 1.5 4 4c0 3-4 4-4 7"/><circle cx="12" cy="20" r="0.6" fill="#14311F"/></svg>',
    title: 'Listen, without rushing to fix',
    body: 'Not every problem needs a solution right away — sometimes people just need to feel heard. When someone shares a struggle, resist the urge to jump straight to advice. Ask a genuine follow-up question, hold eye contact, and let silence sit instead of filling it. Being fully present, without judgement or a rush to respond, is a form of care that’s often more valuable than any fix.'
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14311F" stroke-width="1.6"><path d="M4 12h16M4 12l4-4M4 12l4 4"/></svg>',
    title: 'Help an elderly person',
    body: 'Small physical tasks can become genuinely hard with age — carrying groceries, climbing stairs, or navigating paperwork and technology. Offer to run an errand, walk with them to an appointment, or simply check that they have what they need for the week. If you know an elderly neighbour living alone, a regular knock on the door means more than most people realise.'
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14311F" stroke-width="1.6"><path d="M3 12h18M12 3v18"/></svg>',
    title: 'Support workers in difficulty',
    body: 'Delivery riders, domestic workers, daily-wage labourers and small vendors often go unseen even though their work touches our daily lives. Supporting them can be as simple as paying fairly and on time, offering water or shade on a hot day, treating them with basic respect, or speaking up when you see someone being mistreated. Noticing someone’s struggle out loud is often the first step to real help.'
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14311F" stroke-width="1.6"><path d="M12 21c-4-2-8-6-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5-4 9-8 11Z"/></svg>',
    title: 'Care for animals',
    body: 'Stray and vulnerable animals rely entirely on human kindness. Keeping a bowl of water outside during summer, feeding a neighbourhood stray, volunteering at a local shelter, or fostering an animal in need are all meaningful acts. Even reporting an injured or mistreated animal to a local rescue group can save a life. Gentleness toward animals reflects the same humanity we hope to show people.'
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14311F" stroke-width="1.6"><path d="M4 20h16M6 20V10l6-6 6 6v10"/></svg>',
    title: 'Solve a practical problem',
    body: 'Sometimes the most valuable help is a skill, not a sum of money — fixing a leaking tap, helping someone draft a resume, teaching a relative to use a smartphone, or untangling a piece of bureaucracy. Think about what you’re already good at, then offer it to someone who’s stuck. A single afternoon of your expertise can save someone weeks of struggle.'
  }
];

function openDetail(i) {
  const d = humanityDetails[i];
  if (!d) return;
  document.getElementById('detailIcon').innerHTML = d.icon;
  document.getElementById('detailTitle').textContent = d.title;
  document.getElementById('detailBody').textContent = d.body;
  document.getElementById('detailOverlay').classList.add('open');
}

function closeDetail() {
  const detailOverlay = document.getElementById('detailOverlay');
  if (detailOverlay) detailOverlay.classList.remove('open');
}

const detailOverlayEl = document.getElementById('detailOverlay');
if (detailOverlayEl) {
  detailOverlayEl.addEventListener('click', e => {
    if (e.target.id === 'detailOverlay') closeDetail();
  });
}

/* Scroll top button */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 420);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Intersection Observer for reveal animations */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));