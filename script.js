const bindu = document.getElementById('bindu');
const ring = document.getElementById('ring');
const captionText = document.getElementById('caption-text');
const hero = document.getElementById('hero');
const spokes = document.querySelectorAll('.spoke');
const labels = document.querySelectorAll('.label');
const hexGuide = document.getElementById('hex-guide');

let settled = false;

function playEntrance() {
  bindu.classList.remove('pulse');
  bindu.setAttribute('r', '4');
  ring.setAttribute('r', '90');
  ring.setAttribute('opacity', '1');

  setTimeout(() => {
    hexGuide.setAttribute('opacity', '0.5');
    spokes.forEach((spoke, i) => {
      setTimeout(() => {
        spoke.setAttribute('opacity', '0.6');
      }, i * 100);
    });
    labels.forEach((label, i) => {
      setTimeout(() => {
        label.style.opacity = '1';
      }, 300 + i * 100);
    });
    captionText.textContent = 'zero — everything starts here';
    settled = true;
  }, 1400);
}

function replayEntrance() {
  if (!settled) return;

  bindu.style.transition = 'none';
  ring.style.transition = 'none';
  bindu.setAttribute('r', '6');
  ring.setAttribute('r', '0');
  ring.setAttribute('opacity', '0');
  hexGuide.setAttribute('opacity', '0');
  spokes.forEach(spoke => spoke.setAttribute('opacity', '0'));
  labels.forEach(label => label.style.opacity = '0');
  settled = false;

  void hero.offsetWidth;

  bindu.style.transition = '';
  ring.style.transition = '';
  playEntrance();
}

bindu.classList.add('pulse');
setTimeout(playEntrance, 1800);

hero.addEventListener('click', replayEntrance);

// Mini-nav + active section highlighting
const miniNav = document.getElementById('mini-nav');
const navLinks = document.querySelectorAll('#mini-nav a');
const sections = document.querySelectorAll('.content-section');

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      miniNav.classList.remove('visible');
    } else {
      miniNav.classList.add('visible');
    }
  });
}, { threshold: 0 });

heroObserver.observe(hero);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// Fade-in reveal as each section scrolls into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => revealObserver.observe(section));

// Easter egg: type "zero" anywhere to reveal the sign
const jobSign = document.getElementById('job-sign');
const daysCounter = document.getElementById('days-counter');
const lastJobDate = new Date('2025-09-15'); // TODO: replace with your actual last working day

let keyBuffer = '';
const secretWord = 'zero';

document.addEventListener('keydown', (e) => {
  keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-secretWord.length);

  if (keyBuffer === secretWord) {
    const diffDays = Math.floor((new Date() - lastJobDate) / (1000 * 60 * 60 * 24));
    daysCounter.textContent = diffDays;
    jobSign.classList.add('visible');
    setTimeout(() => jobSign.classList.remove('visible'), 8000);
    keyBuffer = '';
  }
});