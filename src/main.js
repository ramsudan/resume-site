import './style.css';
import { resume } from './data.js';
import { initScene } from './scene.js';

const app = document.getElementById('app');

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderHero() {
  const section = el('section', 'section hero', `
    <div class="hero-inner reveal">
      <h1>${resume.name}</h1>
      <h2>${resume.headline}</h2>
      <p class="summary">${resume.summary}</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#experience">View Experience</a>
        <a class="btn btn-ghost" href="#contact">Get in Touch</a>
      </div>
    </div>
    <div class="scroll-hint">Scroll<span></span></div>
  `);
  section.id = 'home';
  return section;
}

function renderExperience() {
  const items = resume.experience
    .map(
      (job) => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="timeline-head">
            <h4>${job.title}</h4>
            <span class="timeline-dates">${job.start} — ${job.end}</span>
          </div>
          <p class="timeline-company">${job.company}</p>
          <div class="timeline-details">
            <ul>
              ${job.bullets.map((b) => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>`
    )
    .join('');

  const section = el('section', 'section', `
    <h3 class="section-title reveal">Experience</h3>
    <div class="timeline">${items}</div>
  `);
  section.id = 'experience';
  return section;
}

function renderSkills() {
  const chips = resume.skills
    .map((s) => `<span class="chip reveal">${s}</span>`)
    .join('');
  const section = el('section', 'section', `
    <h3 class="section-title reveal">Skills</h3>
    <div class="chip-grid">${chips}</div>
    ${
      resume.certifications?.length
        ? `<div class="reveal cert-row">
            ${resume.certifications
              .map((c) => `<span class="pill">${c}</span>`)
              .join('')}
          </div>`
        : ''
    }
  `);
  section.id = 'skills';
  return section;
}

function renderExploring() {
  if (!resume.exploring?.length) return null;
  const items = resume.exploring
    .map((s) => `<span class="chip chip-alt reveal">${s}</span>`)
    .join('');
  const section = el('section', 'section', `
    <h3 class="section-title reveal">Currently Exploring</h3>
    <p class="reveal about-text">Building AI fluency alongside the day job.</p>
    <div class="chip-grid">${items}</div>
  `);
  section.id = 'exploring';
  return section;
}

function renderContact() {
  const section = el('section', 'section contact', `
    <h3 class="section-title reveal">Get in Touch</h3>
    <p class="reveal about-text">Open to conversations about web, hybrid app, and AI-assisted development.</p>
    <div class="contact-links reveal">
      <a href="${resume.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      ${resume.github ? `<a href="${resume.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
    </div>
    <p class="footer-note reveal">Built with Three.js. © ${new Date().getFullYear()} ${resume.name}.</p>
  `);
  section.id = 'contact';
  return section;
}

[
  renderHero(),
  renderExperience(),
  renderSkills(),
  renderExploring(),
  renderContact(),
]
  .filter(Boolean)
  .forEach((s) => app.appendChild(s));

// Theme (light default, persisted, respects toggle)
const THEME_KEY = 'resume-theme';
const storedTheme = localStorage.getItem(THEME_KEY);
let theme = storedTheme === 'dark' ? 'dark' : 'light';

const toggleBtn = document.getElementById('theme-toggle');
function applyTheme(next) {
  theme = next;
  document.documentElement.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  toggleBtn.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
  localStorage.setItem(THEME_KEY, theme);
}
applyTheme(theme);

// Background scene
const canvas = document.getElementById('bg');
const { setScrollProgress, setTheme } = initScene(canvas, theme);

toggleBtn.addEventListener('click', () => {
  applyTheme(theme === 'dark' ? 'light' : 'dark');
  setTheme(theme);
});

// Cached once — static for the life of the page — so fast/repeated scroll
// events don't re-query the DOM on every firing.
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('main > section');

// Scroll events can fire far more often than the display refreshes
// (especially during a fast trackpad/wheel fling). Coalesce all the work
// into a single update per animation frame instead of running it per event.
let scrollTicking = false;
function updateScrollState() {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
  setScrollProgress(progress);

  let currentId = sections[0]?.id;
  sections.forEach((s) => {
    if (scrollTop >= s.offsetTop - window.innerHeight * 0.4) {
      currentId = s.id;
    }
  });
  navLinks.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });

  scrollTicking = false;
}
function onScroll() {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(updateScrollState);
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
updateScrollState();

// Reveal-on-scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));

// Experience cards expand as they scroll into view
const expandObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('expanded');
        expandObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document
  .querySelectorAll('.timeline-item')
  .forEach((node) => expandObserver.observe(node));

// Smooth scroll for nav links
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});
