const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes=new Map(),storage={},events={},intervals=new Map();let serial=0,now=10000,storageBlocked=false;
function element(){return {innerHTML:'',textContent:'',value:'',hidden:false,disabled:false,checked:false,dataset:{},className:'',classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(name,fn){(this.events??={})[name]=fn;},after(){},before(){},insertAdjacentHTML(){},replaceChildren(){this.innerHTML='';},focus(){},scrollIntoView(){},showModal(){this.open=true;},close(){this.open=false;this.events?.close?.();}};}
const $=selector=>{if(!nodes.has(selector))nodes.set(selector,element());return nodes.get(selector);};
const RealDate=Date;class FakeDate extends RealDate{static now(){return now;}}
const ctx={document:{querySelector:s=>s==='#sessionStorage'&&!$('#courtPanel').innerHTML.includes('id="sessionStorage"')?null:$(s),querySelectorAll:()=>[],createElement:element,body:element()},window:{addEventListener:(n,f)=>events[n]=f,print(){}},localStorage:{getItem:k=>storage[k]??null,setItem:(k,v)=>{if(storageBlocked)throw Error('blocked');storage[k]=v;}},Date:FakeDate,setInterval:f=>{intervals.set(++serial,f);return serial;},clearInterval:i=>intervals.delete(i),FormData:class{constructor(form){return Object.entries(form.data??{});}},console};
vm.createContext(ctx);
for(const file of ['lesson-visuals.js','app.js','training.js'])vm.runInContext(fs.readFileSync('dist/'+file,'utf8'),ctx);
const api=ctx.window.PadelTraining;
let combinations=0;
for(const goal of api.goals)for(const minutes of [20,40,60])for(const players of [1,2,4])for(const level of [0,1,2]){
  const plan=api.buildPlan({goal:goal.id,minutes,players,level});
  assert.equal(plan.blocks.reduce((n,b)=>n+b.minutes,0),minutes);
  assert(plan.blocks.every(b=>b.minutes>0&&b.instruction&&b.easier));
  if(players===1)assert(!plan.blocks[1].instruction.includes('Una persona lanza'));
  for(const [l,i] of goal.lessons)assert(vm.runInContext(`Boolean(courses[${l}][${i}])`,ctx));
  combinations++;
}
for(const data of [{goal:'bad',minutes:40,players:2,level:0},{goal:'primer-partido',minutes:45,players:2,level:0},{goal:'primer-partido',minutes:40,players:3,level:0},{goal:'primer-partido',minutes:40,players:2,level:8}])assert.throws(()=>api.buildPlan(data));
for(const data of [null,{},[],{id:'x',settings:{goal:'invalid'}}])assert.equal(api.restore(data),null);
assert.equal(api.validHistory({}).length,0);
assert.equal(api.validHistory([null,{id:'x',goal:'invalid'}]).length,0);
function generate(){const form=$('#trainingForm');form.data={goal:'defender-pared',minutes:'20',players:'2',level:'0'};form.onsubmit({preventDefault(){},target:form});}
generate();assert($('#planResult').innerHTML.includes('Defender mejor la pared'));
$('#startCourt').onclick();
let active=JSON.parse(storage['padelx-active-session']);assert.equal(active.remaining,240);
$('#toggleTimer').onclick();now+=90500;for(const fn of [...intervals.values()])fn();assert.equal($('#courtClock').textContent,'02:30');
$('#toggleTimer').onclick();assert.equal(intervals.size,0);now+=60000;assert.equal(JSON.parse(storage['padelx-active-session']).remaining,150);
$('#plusRep').onclick();$('#minusRep').onclick();$('#minusRep').onclick();assert.equal($('#repCount').textContent,0);
$('#restTimer').onclick();assert.equal($('#restStatus').textContent,'Descanso · 01:00');now+=60000;for(const fn of [...intervals.values()])fn();assert($('#restStatus').textContent.includes('Descanso terminado'));assert.equal(intervals.size,0);
const restored=api.restore(JSON.parse(storage['padelx-active-session']));assert.equal(restored.running,false);assert.equal(restored.remaining,150);
generate();assert($('#planError').textContent.includes('sesión en curso'));
$('#toggleTimer').onclick();now+=200000;for(const fn of [...intervals.values()])fn();assert.equal($('#courtClock').textContent,'00:00');assert.equal(JSON.parse(storage['padelx-active-session']).index,0);assert.equal(intervals.size,0);
for(let i=0;i<4;i++)$('#nextBlock').onclick();assert($('#courtPanel').innerHTML.includes('¿Qué te llevas de hoy?'));
const reflection=$('#reflectionForm');reflection.data={feeling:'repetir',note:'<script>ejemplo</script>'};
storageBlocked=true;reflection.onsubmit({preventDefault(){},target:reflection});assert($('#reflectionError').textContent.includes('No se pudo guardar'));assert(!storage['padelx-training-history']);
storageBlocked=false;reflection.onsubmit({preventDefault(){},target:reflection});assert.equal(JSON.parse(storage['padelx-training-history']).length,1);assert($('#trainingHistory').innerHTML.includes('&lt;script&gt;'));assert.equal(storage['padelx-active-session'],'null');
generate();$('#startCourt').onclick();$('#discardSession').onclick();assert($('#discardPrompt').innerHTML.includes('Se perderá'));$('#keepSession').onclick();assert.equal($('#discardPrompt').innerHTML,'');
$('#discardSession').onclick();$('#confirmDiscard').onclick();assert.equal(storage['padelx-active-session'],'null');assert.equal($('#courtPanel').hidden,true);assert.equal(JSON.parse(storage['padelx-training-history']).length,1);
console.log(`OK: ${combinations} planes, rutas, entradas inválidas, recuperación, reloj, pausas, descanso, repeticiones, cierre, fallos de almacenamiento y descarte`);
