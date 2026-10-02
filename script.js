// Mobile Menu Toggle
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
if(hamburger && mobileMenu){
  hamburger.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded',open);
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
}

// Welcome Popup
function closeWelcomeModal(){
  const overlay = document.getElementById('welcomeModalOverlay');
  if(overlay) overlay.classList.remove('open');
}

// QR Contribution Modal
function openModal(){
  const overlay = document.getElementById('modalOverlay');
  if(overlay) overlay.classList.add('open');
}
function closeModal(){
  const overlay = document.getElementById('modalOverlay');
  if(overlay) overlay.classList.remove('open');
}
const modalOverlay = document.getElementById('modalOverlay');
if(modalOverlay){
  modalOverlay.addEventListener('click',e=>{if(e.target.id==='modalOverlay')closeModal();});
}

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeModal();
    closeDetail();
    closeWelcomeModal();
  }
});

/* Hero Slider */
const slides=document.querySelectorAll('.hero-slide');
const dots=document.querySelectorAll('#sliderDots button');
let current=0,timer;

function showSlide(i){
  if(!slides.length) return;
  slides[current].classList.remove('active');
  if(dots[current]) dots[current].classList.remove('active');
  current=(i+slides.length)%slides.length;
  slides[current].classList.add('active');
  if(dots[current]) dots[current].classList.add('active');
}
function goToSlide(i){showSlide(i);resetTimer();}
function changeSlide(dir){showSlide(current+dir);resetTimer();}
function resetTimer(){
  if(slides.length > 1){
    clearInterval(timer);
    timer=setInterval(()=>showSlide(current+1),6000);
  }
}
if(slides.length > 1){
  resetTimer();
  const heroSlider = document.getElementById('heroSlider');
  if(heroSlider){
    heroSlider.addEventListener('mouseenter',()=>clearInterval(timer));
    heroSlider.addEventListener('mouseleave',resetTimer);
  }
}

/* Humanity Detail Popups */
const humanityDetails=[
  {icon:'⏰', title:'Spend time with someone lonely', body:'Loneliness is one of the quietest struggles people face, especially among the elderly, the widowed, or those living far from family. You don’t need a plan — a short visit, a regular phone call, or simply sitting with someone over tea can lift their whole week.'},
  {icon:'👂', title:'Listen, without rushing to fix', body:'Not every problem needs a solution right away — sometimes people just need to feel heard. When someone shares a struggle, resist the urge to jump straight to advice. Ask a genuine follow-up question and let silence sit.'},
  {icon:'🤝', title:'Help an elderly person', body:'Small physical tasks can become genuinely hard with age — carrying groceries, climbing stairs, or navigating paperwork and technology. Offer to run an errand or walk with them to an appointment.'},
  {icon:'✊', title:'Support workers in difficulty', body:'Delivery riders, domestic workers, daily-wage labourers and small vendors often go unseen. Supporting them can be as simple as paying fairly, offering water or shade, or treating them with basic respect.'},
  {icon:'🐾', title:'Care for animals', body:'Stray and vulnerable animals rely entirely on human kindness. Keeping a bowl of water outside during summer, feeding a neighbourhood stray, or volunteering at a local shelter are all meaningful acts.'},
  {icon:'💡', title:'Solve a practical problem', body:'Sometimes the most valuable help is a skill, not money — fixing a leaking tap, helping draft a resume, teaching a relative smartphone usage, or untangling bureaucracy. Your expertise can save weeks of struggle.'}
];

function openDetail(i){
  const d=humanityDetails[i];
  if(!d) return;
  document.getElementById('detailIcon').textContent=d.icon;
  document.getElementById('detailTitle').textContent=d.title;
  document.getElementById('detailBody').textContent=d.body;
  document.getElementById('detailOverlay').classList.add('open');
}
function closeDetail(){
  const overlay = document.getElementById('detailOverlay');
  if(overlay) overlay.classList.remove('open');
}
const detailOverlay = document.getElementById('detailOverlay');
if(detailOverlay){
  detailOverlay.addEventListener('click',e=>{if(e.target.id==='detailOverlay')closeDetail();});
}

/* Scroll To Top Button */
const scrollTopBtn=document.getElementById('scrollTop');
if(scrollTopBtn){
  window.addEventListener('scroll',()=>{
    scrollTopBtn.classList.toggle('show',window.scrollY>400);
  });
  scrollTopBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

/* Fade-Up Intersection Observer */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));