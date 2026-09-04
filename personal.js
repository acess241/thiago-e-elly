const pinInput=document.getElementById('pin-input'),pinMessage=document.getElementById('pin-message');
function unlock(){
 if(pinInput.value==='160326'){
  document.getElementById('lock-screen').hidden=true;document.getElementById('cover').hidden=false;
  document.getElementById('open-heart').focus({preventScroll:true});pinInput.value='';
 }else{pinMessage.textContent='Ops, meu amorrr... tenta o nosso dia de novo ♡';pinInput.value='';pinInput.focus();}
}
document.getElementById('pin-form').addEventListener('submit',e=>{e.preventDefault();unlock();});
pinInput.addEventListener('input',()=>{pinInput.value=pinInput.value.replace(/\D/g,'').slice(0,6);pinMessage.textContent='';});
document.querySelectorAll('[data-digit]').forEach(b=>b.addEventListener('click',()=>{pinInput.value=(pinInput.value+b.dataset.digit).slice(0,6);pinMessage.textContent='';if(pinInput.value.length===6)unlock();}));
document.getElementById('pin-delete').onclick=()=>{pinInput.value=pinInput.value.slice(0,-1);};
function tick(){
 const now=new Date();document.getElementById('lock-clock').textContent=now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
 const values=window.relationshipElapsed(now.getTime());
 document.querySelectorAll('[data-duration]').forEach((el,i)=>el.textContent=String(values[i]).padStart(2,'0'));
}
tick();setInterval(tick,1000);
