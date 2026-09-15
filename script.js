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