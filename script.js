// 🌸 Heart rain
function createHeart(){
  const h=document.createElement('div');
  h.textContent='💖';
  h.style.left=Math.random()*100+'vw';
  h.style.animationDuration=3+Math.random()*3+'s';
  document.getElementById('heart-rain').appendChild(h);
  setTimeout(()=>h.remove(),6000);
}
setInterval(createHeart,300);

// 🌸 Music fade in/out
function fadeAudio(audio, targetVolume, duration){
  const step = (targetVolume - audio.volume) / (duration / 100);
  const interval = setInterval(()=>{
    audio.volume = Math.min(1, Math.max(0, audio.volume + step));
    if((step>0 && audio.volume>=targetVolume)||(step<0 && audio.volume<=targetVolume)){
      clearInterval(interval);
    }
  },100);
}

function startMusic(){
  const a=document.getElementById('bgAudio');
  a.volume=0;
  a.play().catch(()=>console.log("Autoplay blocked"));
  fadeAudio(a,0.5,2000);
}

function stopMusic(){
  const a=document.getElementById('bgAudio');
  fadeAudio(a,0,1500);
  setTimeout(()=>a.pause(),1600);
}

// 🌸 Section control
function switchSection(id){
  document.querySelectorAll('.section').forEach(s=>{
    if(s.id===id){s.classList.remove('hidden');setTimeout(()=>s.classList.add('active'),10);}
    else{s.classList.remove('active');setTimeout(()=>s.classList.add('hidden'),600);}
  });
  window.scrollTo(0,0);
}

// 🌸 Encrypted password check (simple)
function encrypt(text){
  return btoa(text.split('').reverse().join(''));
}
const correctHash = encrypt("1234"); // password = 1234

// 🌸 Loading → Password page
setTimeout(()=>switchSection('passwordPage'),2000);

// 🌸 Password form
document.getElementById('pwForm').addEventListener('submit',e=>{
  e.preventDefault();
  const val=document.getElementById('pwInput').value.trim();
  if(encrypt(val)===correctHash){
    switchSection('mainPage');
    startMusic();
    typeWriter();
  } else alert("Wrong password 😅");
});

// 🌸 Typewriter effect
const text="Hey… I just wanted to say something simple — You're genuinely different, and maybe that's why I made this for you ❤️";
let i=0;
function typeWriter(){
  const el=document.getElementById('typewriter');
  if(i<text.length){el.textContent+=text.charAt(i++);setTimeout(typeWriter,50);}
}

document.getElementById('toWelcome').addEventListener('click',()=>switchSection('welcomePage'));
document.getElementById('continueBtn').addEventListener('click',()=>switchSection('quotePage'));
document.getElementById('toProposal').addEventListener('click',()=>switchSection('proposalPage'));

// 🌸 Buttons
document.getElementById('yesBtn').addEventListener('click',()=>{
  switchSection('yesPage');
  stopMusic();
});
document.getElementById('noBtn').addEventListener('click',()=>{switchSection('noPage');initNoPage();});

function initNoPage(){
  document.getElementById('noYesBtn').addEventListener('click',()=>switchSection('yesPage'));
  const noRealBtn=document.getElementById('noNoBtn');
  moveRandomEffect(noRealBtn);
}
function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.top = Math.floor(Math.random() * 85 + 5) + "%";
  elm.style.left = Math.floor(Math.random() * 85 + 5) + "%";
}
function moveRandomEffect(btn){
  btn.addEventListener("mouseenter",(e)=>moveRandomEl(e.target));
  btn.addEventListener("mousemove",(e)=>moveRandomEl(e.target));
  btn.addEventListener("click",(e)=>moveRandomEl(e.target));
}

// 🌸 Replay
document.getElementById('replayBtn').addEventListener('click',()=>{
  i=0;
  document.getElementById('typewriter').textContent='';
  document.getElementById('pwInput').value='';
  switchSection('passwordPage');
});