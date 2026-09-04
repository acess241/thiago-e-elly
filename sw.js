const CACHE='thiago-elly-audio-v1';
const FILES=['./','index.html','style.css','script.js','personal.js','relationship.js','assets/content.js','assets/paper-art.png','assets/seja-como-for.m4a',...Array.from({length:13},(_,i)=>`assets/photo-${String(i+1).padStart(2,'0')}.jpeg`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('thiago-elly-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);const saved=await cache.match(event.request.url);
  if(saved&&event.request.headers.has('range')){
   const bytes=await saved.arrayBuffer();const match=/^bytes=(\d*)-(\d*)$/.exec(event.request.headers.get('range'));
   if(!match)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${bytes.byteLength}`}});
   const start=match[1]?Number(match[1]):Math.max(0,bytes.byteLength-Number(match[2]));
   const end=match[1]&&match[2]?Math.min(Number(match[2]),bytes.byteLength-1):bytes.byteLength-1;
   if(start>end||start>=bytes.byteLength)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${bytes.byteLength}`}});
   return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':'audio/mp4','Content-Range':`bytes ${start}-${end}/${bytes.byteLength}`,'Content-Length':String(end-start+1),'Accept-Ranges':'bytes'}});
  }
  if(saved&&!event.request.mode.includes('navigate'))return saved;
  try{return await fetch(event.request);}catch(error){if(saved)return saved;if(event.request.mode==='navigate')return cache.match('index.html');throw error;}
 })());
});
