const bindu = document.getElementById('bindu');
const ring = document.getElementById('ring');
const caption = document.getElementById('caption');
const hero = document.getElementById('hero');

let settled = false;

function playEntrance() {
  bindu.classList.remove('pulse');
  bindu.setAttribute('r', '4');
  ring.setAttribute('r', '90');
  ring.setAttribute('opacity', '1');

  setTimeout(() => {
    caption.textContent = 'zero — everything starts here';
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

  // force reflow so the reset actually applies before re-animating
  void hero.offsetWidth;

  bindu.style.transition = '';
  ring.style.transition = '';
  playEntrance();
}

// initial pulse, then auto-play after ~1.8s
bindu.classList.add('pulse');
setTimeout(playEntrance, 1800);

hero.addEventListener('click', replayEntrance);