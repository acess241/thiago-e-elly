const content=window.LETTER_CONTENT;
const $=id=>document.getElementById(id);
let photoIndex=0,lastPhotoFocus=null;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function reveal(id,scroll=true){const el=$(id);el.hidden=false;if(scroll)requestAnimationFrame(()=>el.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'}));}
function makePhoto(index){const button=document.createElement('button');button.className='photo';button.style.setProperty('--angle',`${[-5,4,-2,3][index%4]}deg`);const img=document.createElement('img');img.src=`assets/${content.photos[index][0]}`;img.alt=content.photos[index][1];img.loading='lazy';const label=document.createElement('span');label.textContent=content.photos[index][1];button.append(img,label);button.setAttribute('aria-label',`Ampliar foto: ${label.textContent}`);button.addEventListener('click',()=>openPhoto(index,button));return button;}
[3,6].forEach(i=>$('first-photos').append(makePhoto(i)));
content.photos.forEach((_,i)=>{if(![1,3,6].includes(i))$('gallery').append(makePhoto(i));});
function updatePhoto(){const [src,caption]=content.photos[photoIndex];$('zoom-photo').src=`assets/${src}`;$('zoom-photo').alt=caption;$('zoom-caption').textContent=caption;$('photo-count').textContent=`${photoIndex+1} / ${content.photos.length}`;}
function openPhoto(index,trigger){photoIndex=index;lastPhotoFocus=trigger;updatePhoto();$('photo-dialog').showModal();document.body.classList.add('modal-open');}
$('main-photo').onclick=()=>openPhoto(1,$('main-photo'));
$('close-photo').onclick=()=>$('photo-dialog').close();
$('photo-dialog').addEventListener('close',()=>{document.body.classList.remove('modal-open');lastPhotoFocus?.focus({preventScroll:true});});
$('photo-dialog').addEventListener('click',e=>{if(e.target===$('photo-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
function changePhoto(delta){photoIndex=(photoIndex+delta+content.photos.length)%content.photos.length;updatePhoto();}
$('prev-photo').onclick=()=>changePhoto(-1);$('next-photo').onclick=()=>changePhoto(1);
$('photo-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowLeft')changePhoto(-1);if(e.key==='ArrowRight')changePhoto(1);});
$('open-heart').onclick=()=>{$('open-heart').disabled=true;$('cover').classList.add('opening');setTimeout(()=>{$('cover').hidden=true;reveal('letter');$('back-cover').focus({preventScroll:true});},reduced?0:750);};
$('back-cover').onclick=()=>{$('letter').hidden=true;$('cover').hidden=false;$('cover').classList.remove('opening');$('open-heart').disabled=false;window.scrollTo(0,0);$('open-heart').focus({preventScroll:true});};
$('first-envelope').onclick=()=>{const opened=$('first-envelope').getAttribute('aria-expanded')==='true';$('first-envelope').setAttribute('aria-expanded',String(!opened));$('first-message').hidden=opened;if(!opened)reveal('music-section',false);};
document.querySelectorAll('[data-reveal]').forEach(b=>b.onclick=()=>reveal(b.dataset.reveal));
content.notes.forEach(([title,message],i)=>{const b=document.createElement('button');b.className='note';b.setAttribute('aria-expanded','false');const text=document.createElement('span');text.textContent=title;const hint=document.createElement('small');hint.textContent='puxe a pontinha ↗';b.append(text,hint);b.onclick=()=>{const open=b.classList.toggle('open');b.setAttribute('aria-expanded',String(open));text.textContent=open?message:title;hint.textContent=open?'dobrar de novo ↶':'puxe a pontinha ↗';};$('notes').append(b);});
content.letter.forEach(text=>{const p=document.createElement('p');p.textContent=text;$('letter-text').append(p);});
$('final-open').onclick=()=>{$('final-open').setAttribute('aria-expanded','true');$('final-open').hidden=true;reveal('final-text');};
$('final-close').onclick=()=>{$('final-text').hidden=true;$('final-open').hidden=false;$('final-open').setAttribute('aria-expanded','false');$('final-open').focus();};
const audio=$('audio');audio.src=content.music.src;audio.volume=.55;$('song-title').textContent=content.music.title;
function reflectAudio(){const playing=!audio.paused;$('record').classList.toggle('playing',playing);$('record').setAttribute('aria-pressed',String(playing));$('record').setAttribute('aria-label',playing?'Pausar música':'Reproduzir música');$('play').textContent=playing?'Ⅱ pausar um pouquinho':'▷ dar o play';}
async function toggleAudio(){if(audio.paused){try{await audio.play();$('audio-status').textContent='';}catch{$('audio-status').textContent='Não consegui tocar agora. Toque para tentar novamente.';}}else audio.pause();}
$('record').onclick=toggleAudio;$('play').onclick=toggleAudio;audio.addEventListener('play',reflectAudio);audio.addEventListener('pause',reflectAudio);audio.addEventListener('ended',reflectAudio);audio.addEventListener('error',()=>{$('audio-status').textContent='A música não carregou. Tente abrir a cartinha novamente.';});
audio.addEventListener('timeupdate',()=>{$('seek').value=Number.isFinite(audio.duration)?audio.currentTime/audio.duration*100:0;$('time').textContent=`${Math.floor(audio.currentTime/60)}:${String(Math.floor(audio.currentTime%60)).padStart(2,'0')}`;});$('seek').oninput=()=>{if(Number.isFinite(audio.duration))audio.currentTime=$('seek').value/100*audio.duration;};
