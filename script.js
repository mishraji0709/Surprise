function createHeart() {
  const heart = document.createElement('div');
  heart.textContent = '💖';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 3 + Math.random() * 3 + 's';
  document.getElementById('heart-rain').appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 300);

function startMusic() {
  const audio = document.getElementById('bgAudio');
  audio.volume = 0.5;
  audio.play().catch(() => console.log("Autoplay blocked"));
}

const password = "4321";
document.getElementById('pwForm').addEventListener('submit', e => {
  e.preventDefault();
  if (document.getElementById('pwInput').value.trim() === password) {
    switchSection('mainPage');
    startMusic();
    typeWriter();
  } else alert("Wrong password 😅");
});

const text = "Hey… I just wanted to say something simple — You're genuinely different, and maybe that's why I made this for you ❤️";
let i = 0;
function typeWriter() {
  const el = document.getElementById('typewriter');
  if (i < text.length) {
    el.textContent += text.charAt(i++);
    setTimeout(typeWriter, 50);
  }
}

document.getElementById('toWelcome').addEventListener('click', () => switchSection('welcomePage'));
document.getElementById('continueBtn').addEventListener('click', () => switchSection('quotePage'));
document.getElementById('toProposal').addEventListener('click', () => switchSection('proposalPage'));

function switchSection(id) {
  document.querySelectorAll('.section').forEach(s => {
    if (s.id === id) {
      s.classList.remove('hidden');
      setTimeout(() => s.classList.add('active'), 10);
    } else {
      s.classList.remove('active');
      setTimeout(() => s.classList.add('hidden'), 600);
    }
  });
  window.scrollTo(0, 0);
}

document.getElementById('yesBtn').addEventListener('click', () => switchSection('yesPage'));
document.getElementById('noBtn').addEventListener('click', () => {
  switchSection('noPage');
  initNoPage();
});

function initNoPage() {
  document.getElementById('noYesBtn').addEventListener('click', () => switchSection('yesPage'));
  document.getElementById('noNoBtn').addEventListener('click', () => handleNoClick(document.getElementById('noNoBtn')));
}

function handleNoClick(btn) {
  btn.classList.add('fade-out');
  setTimeout(() => {
    btn.style.display = 'none';
    const msg = document.createElement('p');
    msg.className = 'no-msg';
    msg.innerHTML = 'No.. You have only one option 😏';
    btn.parentElement.appendChild(msg);
  }, 600);
}