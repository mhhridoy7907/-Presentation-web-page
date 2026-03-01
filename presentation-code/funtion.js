
const c=document.getElementById("bg"),ctx=c.getContext("2d");
function resize(){c.width=innerWidth;c.height=innerHeight}
resize();addEventListener("resize",resize);

let p=[];
for(let i=0;i<150;i++){
  p.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:Math.random()-0.5,vy:Math.random()-0.5});
}

function animate(){
  ctx.clearRect(0,0,c.width,c.height);
  p.forEach(o=>{
    o.x+=o.vx;o.y+=o.vy;
    if(o.x<0||o.x>innerWidth) o.vx*=-1;
    if(o.y<0||o.y>innerHeight) o.vy*=-1;
    ctx.fillStyle="#00ffea";
    ctx.beginPath();ctx.arc(o.x,o.y,2,0,Math.PI*2);ctx.fill();
  });
  for(let i=0;i<p.length;i++){
    for(let j=i+1;j<p.length;j++){
      let dx=p[i].x-p[j].x,dy=p[i].y-p[j].y,d=Math.hypot(dx,dy);
      if(d<120){
        ctx.strokeStyle=`rgba(0,255,234,${1-d/120})`;
        ctx.beginPath();
        ctx.moveTo(p[i].x,p[i].y);
        ctx.lineTo(p[j].x,p[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();


const texts=[
 ["l1","RTM Al-Kabir Technical University"],
 ["l2","An presentation on"],
 ["l3","The Ways Black Hat Hackers Steal Our Information"],
 ["l4","Course Title: Reading and Writing Skills"],
 ["l5","Course Code: GED 1105"]
];

let i=0,j=0;
function type(){
  if(i>=texts.length){
    const l1=document.getElementById("l1");
    l1.classList.add("glitch");
    l1.setAttribute("data-text",texts[0][1]);
    return;
  }
  const el=document.getElementById(texts[i][0]);
  el.classList.add("typing");
  el.textContent+=texts[i][1][j++];
  if(j===texts[i][1].length){
    el.classList.remove("typing");
    i++;j=0;
    setTimeout(type,400);
  }else{
    setTimeout(type,20);
  }
}
type();


const inputField = document.getElementById("pass");
const voiceText = document.getElementById("voiceText").innerText;

inputField.addEventListener("click", ()=>{
  const msg = new SpeechSynthesisUtterance(voiceText);
  speechSynthesis.speak(msg);
});


const beepCtx=new AudioContext();
function beep(){
  const o=beepCtx.createOscillator();
  const g=beepCtx.createGain();
  o.connect(g);g.connect(beepCtx.destination);
  o.frequency.value=800;
  o.start();
  g.gain.exponentialRampToValueAtTime(0.0001,beepCtx.currentTime+0.1);
  o.stop(beepCtx.currentTime+0.1);
}
pass.addEventListener("keydown",beep);


function check(){
  if(pass.value==="asdfgh123"){
    box.classList.add("fade");
    setTimeout(()=>location.href="slides/slide1.html",800);
  }else{
    error.style.display="block";
    box.classList.add("shake");
    setTimeout(()=>box.classList.remove("shake"),300);
  }
}
