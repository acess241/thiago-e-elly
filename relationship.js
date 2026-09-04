(function(root){
 const START=Date.UTC(2026,2,16,17,30); // Calendário da Bahia (UTC-3), tratado sem depender do fuso do aparelho.
 function elapsed(now=Date.now()){
  const end=now-3*3600000;if(end<START)return [0,0,0,0,0,0];
  const d=new Date(end);let months=(d.getUTCFullYear()-2026)*12+d.getUTCMonth()-2;
  const anniversary=m=>Date.UTC(2026,2+m,16,17,30);
  if(anniversary(months)>end)months--;
  let rest=end-anniversary(months);const days=Math.floor(rest/86400000);rest%=86400000;
  const hours=Math.floor(rest/3600000);rest%=3600000;
  const minutes=Math.floor(rest/60000);const seconds=Math.floor(rest%60000/1000);
  return [Math.floor(months/12),months%12,days,hours,minutes,seconds];
 }
 if(typeof module!=='undefined')module.exports={elapsed};else root.relationshipElapsed=elapsed;
})(typeof window!=='undefined'?window:globalThis);
