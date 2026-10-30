/* PadelX: rutas, planificación determinista y sesión en pista. Sin servicios externos. */
(function () {
  'use strict';
  const goals = [
    { id: 'primer-partido', title: 'Disfrutar mi primer partido', tag: 'UNA BASE PARA EMPEZAR', text: 'Control, saque y una posición que te ayude a seguir jugando.', image: 0, lessons: [[0,0],[0,1],[0,2],[0,3]], cue: 'Contacto cómodo, margen y comunicación.', drill: 'Pelotead al centro a ritmo cómodo, alternando derecha y revés. Después iniciad cada secuencia con un saque suave.', solo: 'Alterna preparación de derecha y revés sin pelota. Practica después el bote y el gesto de saque hacia una zona libre, recogiendo antes de repetir.', transfer: 'Iniciad puntos con saque y buscad tres devoluciones controladas antes de acelerar.' },
    { id: 'defender-pared', title: 'Defender mejor la pared', tag: 'TIEMPO Y ESPACIO', text: 'Lee el rebote, deja espacio y devuelve con control.', image: 4, lessons: [[0,1],[1,0],[1,2]], cue: 'Lee primero y ajusta los pies antes del contacto.', drill: 'Una persona lanza lento al cristal de fondo y la otra devuelve al centro después del rebote. Cambiad de papel cada cinco pelotas.', solo: 'Sin pelota, ensaya giro, pasos de ajuste y recuperación dejando espacio respecto al cristal. Después lanza suavemente con la mano al suelo y cristal y recoge el rebote, sin golpear.', transfer: 'Alternad pelotas que se juegan antes y después de pared. Anunciad la decisión antes del golpe; no busquéis velocidad.' },
    { id: 'ganar-red', title: 'Construir el punto en la red', tag: 'CONTROL ANTES DE ACELERAR', text: 'Conecta globo, transición y voleas compactas.', image: 5, lessons: [[0,1],[1,2],[1,1]], cue: 'Preparación corta y recuperación equilibrada.', drill: 'Una persona volea y la otra alimenta desde el fondo a ritmo cómodo. Alternad derecha y revés con objetivos amplios; intercambiad posiciones.', solo: 'Ensaya voleas de derecha y revés sin pelota, con preparación corta. Marca una posición de espera y recupera tras cada gesto, sin invadir otra pista.', transfer: 'Alternad defensa y globo. Avanzad solo cuando la pelota dé tiempo y frenad antes del golpe contrario.' },
    { id: 'jugar-pareja', title: 'Entenderme con mi pareja', tag: 'DOS JUGADORES, UNA INTENCIÓN', text: 'Cubrid el centro y acordad cuándo avanzar juntos.', image: 3, lessons: [[0,3],[1,2],[2,3]], cue: 'Hablad antes de la pelota dudosa y moveos juntos.', drill: 'Sin pelota, desplazaos lateralmente como pareja siguiendo un objetivo imaginario. Después alternad peloteo suave y avisos de «mía», «tuya» y «subimos».', solo: 'Recorre sin pelota posiciones de defensa y red. En cada parada di en voz alta qué zona cubriría tu pareja y cuándo anunciarías una pelota central.', transfer: 'Jugad puntos con una intención acordada antes de cada saque. Comentad al terminar si la coordinación ayudó, independientemente del marcador.' }
  ];
  const durations = [20,40,60], players = [1,2,4], levels = [0,1,2];
  const $ = s => document.querySelector(s);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clock = seconds => `${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`;
  function buildPlan(settings) {
    const goal = goals.find(g => g.id === settings.goal);
    const minutes = Number(settings.minutes), count = Number(settings.players), difficulty = Number(settings.level);
    if (!goal || !durations.includes(minutes) || !players.includes(count) || !levels.includes(difficulty)) throw new Error('Elige un objetivo, duración, nivel y número de jugadores válidos.');
    const warm = minutes === 20 ? 4 : minutes === 40 ? 6 : 8;
    const transfer = minutes === 20 ? 4 : minutes === 40 ? 10 : 16;
    const practice = minutes-warm-transfer-2;
    const easy = 'Si cuesta mantener el control, reduce el ritmo y amplía el objetivo.';
    const progression = difficulty === 0 ? 'Alimentación lenta, previsible y sin buscar potencia.' : difficulty === 1 ? 'Cuando haya control, alterna dos direcciones y añade pasos de ajuste.' : 'Añade incertidumbre en dirección o altura solo después de varias repeticiones cómodas; evita aumentar todo a la vez.';
    const group = count === 4 ? 'Trabajad en dos parejas; alternad los papeles a mitad del bloque y mantened las zonas de golpeo separadas.' : count === 2 ? 'Cambiad de papel a mitad del bloque para practicar ambos.' : 'Trabajo individual de preparación y lectura. No sustituye la práctica con rival.';
    return { settings: {goal: goal.id, minutes, players: count, level: difficulty}, title: goal.title, cue: goal.cue, image: goal.image, blocks: [
      {title:'Activa el cuerpo', minutes:warm, kind:'warm', instruction:'Revisa cordón, suelo y espacio. Haz movilidad suave y desplazamientos progresivos. '+(count===1?'Ensaya gestos lentos sin pelota.':'Termina con peloteo suave.'), easier:'Reduce el recorrido y la intensidad según tus sensaciones.'},
      {title:'Practica con intención', minutes:practice, kind:'practice', instruction:(count===1?goal.solo:goal.drill)+' '+group+' '+progression+' Incluye pausas de 60 segundos entre series cortas dentro de este bloque.', easier:easy},
      {title:count===1?'Ensaya la decisión':'Llévalo al juego', minutes:transfer, kind:'transfer', instruction:count===1?'Imagina una pelota cómoda y otra exigente. Di qué harías, ensaya sin pelota y recupera. Alterna ambas situaciones con pausas.':count===2&&goal.id==='jugar-pareja'?'Coordinad juntos desplazamientos sin pelota. Después pelotead uno frente a otro y practicad avisos; dejad los puntos en pareja para una sesión de cuatro.':goal.transfer+' '+(count===4?'Jugad dos contra dos.':'Adaptadlo a uno contra uno, con una zona amplia acordada y sin medir el resultado como partido de dobles.'), easier:'Vuelve a un lanzamiento previsible o a un ensayo sin pelota.'},
      {title:'Observa y decide qué repetir', minutes:2, kind:'review', instruction:'Baja el ritmo y anota una cosa que salió bien y una que quieras repetir. Valora el control y la decisión, además del resultado.', easier:'Elige una sola observación concreta.'}
    ]};
  }
  function load(key, fallback) { try { const value=JSON.parse(localStorage.getItem(key)); return value === null ? fallback : value; } catch { return fallback; } }
  function save(key,value) { try { localStorage.setItem(key,JSON.stringify(value)); return true; } catch { return false; } }
  function validHistory(value) { return Array.isArray(value) ? value.filter(x=>x&&typeof x.id==='string'&&typeof x.at==='string'&&goals.some(g=>g.id===x.goal)&&durations.includes(x.minutes)&&players.includes(x.players)&&typeof x.note==='string'&&x.note.length<=240&&['repetir','mejor','dificil'].includes(x.feeling)).slice(-30) : []; }
  let session=null, selected=goals[0].id, interval=null;
  function restore(raw) {
    try {
      if(!raw || typeof raw.id!=='string' || raw.id.length>100) return null;
      const plan=buildPlan(raw.settings), max=plan.blocks.length-1;
      if(!Number.isInteger(raw.index)||raw.index<0||raw.index>max||!Number.isInteger(raw.remaining)||raw.remaining<0||raw.remaining>plan.blocks[raw.index].minutes*60||!Array.isArray(raw.reps)||raw.reps.length!==plan.blocks.length||!raw.reps.every(x=>Number.isInteger(x)&&x>=0&&x<=9999)) return null;
      // Una recarga pausa la sesión. El reloj nunca avanza sin una acción del jugador.
      return {id:raw.id,plan,index:raw.index,remaining:raw.remaining,reps:raw.reps,running:false,deadline:0};
    } catch { return null; }
  }
  function persist() {
    if(!session) return;
    const ok=save('padelx-active-session',{id:session.id,settings:session.plan.settings,index:session.index,remaining:session.remaining,reps:session.reps});
    const status=$('#sessionStorage');
    if(status)status.textContent=ok?'Sesión guardada en este navegador. Al recargar se recupera en pausa.':'No se pudo guardar: puedes continuar, pero se perderá al cerrar esta página.';
  }
  function stopTimer() { if(interval!==null) clearInterval(interval); interval=null; if(session) session.running=false; }
  function tick() {
    if(!session||!session.running) return;
    session.remaining=Math.max(0,Math.ceil((session.deadline-Date.now())/1000));
    $('#courtClock').textContent=clock(session.remaining); persist();
    if(session.remaining===0){stopTimer();$('#toggleTimer').textContent='Tiempo terminado';$('#toggleTimer').disabled=true;$('#courtStatus').textContent='Bloque terminado. Descansa o pasa al siguiente cuando estés preparado.';}
  }
  function toggleTimer(){
    if(!session||session.remaining===0) return;
    if(session.running){tick();stopTimer();if(!session.remaining)return;}else{stopRest();$('#restStatus').textContent='';session.running=true;session.deadline=Date.now()+session.remaining*1000;interval=setInterval(tick,1000);}
    $('#toggleTimer').textContent=session.running?'Pausar':'Continuar';$('#courtStatus').textContent=session.running?'Cronómetro en marcha. Puedes pausarlo cuando lo necesites.':'Sesión en pausa.';persist();
  }
  const routes=document.createElement('section'); routes.id='objetivos';routes.className='section goal-section';
  routes.innerHTML=`<div class="section-heading"><div><div class="eyebrow">TU OBJETIVO, TU SIGUIENTE PASO</div><h2>¿Qué quieres mejorar hoy?</h2></div><p>Elige una ruta, entiende sus claves<br>y llévatela a la pista.</p></div><div class="goal-grid">${goals.map(g=>`<button type="button" class="goal-card" data-goal="${g.id}" aria-pressed="false"><img src="${lessonVisuals.core[g.image].src}" alt="" loading="lazy" width="1200" height="800"><span class="goal-copy"><small>${g.tag}</small><strong>${g.title}</strong><span>${g.text}</span><span class="route-count" data-route-count="${g.id}"></span></span></button>`).join('')}</div><div id="routeDetail" class="route-detail"></div>`;
  $('#rutas').after(routes);
  const heroAction=$('.actions .primary');heroAction.href='#objetivos';heroAction.innerHTML='Encuentra tu objetivo <span aria-hidden="true">↗</span>';
  const practice=$('#practica');practice.className='section training-section';
  practice.innerHTML=`<div class="section-heading"><div><div class="eyebrow">DE LA IDEA AL ENTRENAMIENTO</div><h2>Tu próxima sesión,<br>con un objetivo claro.</h2></div><p>Planifica 20, 40 o 60 minutos.<br>Sin cuenta. A tu ritmo.</p></div><div class="training-layout"><form id="trainingForm" class="training-form"><label>Quiero trabajar<select name="goal" id="trainingGoal">${goals.map(g=>`<option value="${g.id}">${g.title}</option>`).join('')}</select></label><fieldset><legend>Tiempo disponible</legend><div class="option-row">${durations.map(n=>`<label><input type="radio" name="minutes" value="${n}" ${n===40?'checked':''}><span>${n} min</span></label>`).join('')}</div></fieldset><label>Mi punto de partida<select name="level"><option value="0">Base · preparar y controlar</option><option value="1">Desarrollo · añadir movimiento</option><option value="2">Profundizar · decidir con incertidumbre</option></select></label><label>¿Cuántos entrenamos?<select name="players"><option value="2">2 jugadores</option><option value="1">Solo · preparación y lectura</option><option value="4">4 jugadores</option></select></label><p class="form-help">Necesitas pala, pelotas y pista disponible para los ejercicios con pelota. Los bloques incluyen descansos. Son propuestas ajustables, no una evaluación oficial de nivel.</p><button class="primary" type="submit" id="planBtn">Preparar mi sesión <span aria-hidden="true">↗</span></button><p id="planError" role="alert"></p></form><div id="planResult" class="plan-result" aria-live="polite"><div class="empty-plan"><span aria-hidden="true">✳</span><h3>Menos improvisar.<br>Más entrenar.</h3><p>Elige objetivo, tiempo y compañía. Te proponemos una sesión con activación, práctica, aplicación y reflexión.</p></div></div></div><div id="courtPanel" class="court-panel" hidden></div><div class="training-history"><h3>Lo que te llevas de la pista</h3><p>Las últimas 30 sesiones y tus notas se guardan solo en este navegador y dispositivo.</p><div id="trainingHistory"></div></div>`;
  function renderRoutes(){
    goals.forEach(g=>{const complete=g.lessons.filter(([l,i])=>done.includes(l+'-'+i)).length;const card=$(`[data-goal="${g.id}"]`);card.setAttribute('aria-pressed',String(selected===g.id));$(`[data-route-count="${g.id}"]`).textContent=`${complete}/${g.lessons.length} lecciones marcadas · Ver ruta →`;});
    const goal=goals.find(g=>g.id===selected);
    $('#routeDetail').innerHTML=`<div><span class="eyebrow">RUTA · ${goal.lessons.length} PASOS</span><h3>${goal.title}</h3><p>${goal.cue} Marca las lecciones desde su ficha cuando las hayas trabajado. Esto no acredita dominio del golpe.</p><button class="primary" id="trainRoute">Entrenar este objetivo ↗</button></div><ol class="route-lessons">${goal.lessons.map(([l,i])=>`<li><button type="button" data-route-lesson="${l}-${i}"><span aria-hidden="true">${done.includes(l+'-'+i)?'✓':'○'}</span><span>${courses[l][i][0]}<small>${courses[l][i][1]} · ${done.includes(l+'-'+i)?'Marcada como completada':'Abrir explicación'}</small></span><b aria-hidden="true">↗</b></button></li>`).join('')}</ol>`;
    $('#trainRoute').onclick=()=>{$('#trainingGoal').value=selected;practice.scrollIntoView({behavior:'smooth'});$('#trainingGoal').focus({preventScroll:true});};
    document.querySelectorAll('[data-route-lesson]').forEach(b=>b.onclick=()=>{const [l,i]=b.dataset.routeLesson.split('-').map(Number);select(l);openLesson(i);});
  }
  document.querySelectorAll('[data-goal]').forEach(b=>b.onclick=()=>{selected=b.dataset.goal;renderRoutes();});
  modal.addEventListener('close',renderRoutes);
  function renderHistory(){
    const entries=validHistory(load('padelx-training-history',[]));
    $('#trainingHistory').innerHTML=entries.length?entries.slice().reverse().slice(0,5).map(x=>`<article class="history-entry"><strong>${goals.find(g=>g.id===x.goal).title}</strong><span>${escape(new Date(x.at).toLocaleDateString('es-ES'))} · Plan de ${x.minutes} min · ${x.players} jugador${x.players===1?'':'es'}</span><p>${({repetir:'Quiero repetir',mejor:'Me he sentido con más control',dificil:'Necesito simplificar'})[x.feeling]}${x.note?' · '+escape(x.note):''}</p></article>`).join(''):'<p>Tu primera sesión empieza con un objetivo. Al terminar podrás guardar qué quieres repetir.</p>';
    window.PadelProgress?.refresh();
  }
  function prepare(settings){
    if(session){$('#planError').textContent='Tienes una sesión en curso. Termínala o descártala antes de preparar otra.';practice.scrollIntoView({behavior:'smooth'});return false;}
    try{const plan=buildPlan(settings);for(const [name,value] of Object.entries(plan.settings)){if(name==='minutes')$(`#trainingForm input[value="${value}"]`).checked=true;else $(`#trainingForm [name="${name}"]`).value=value;}save('padelx-plan-settings',plan.settings);renderPlan(plan);$('#planError').textContent='Plan cargado. Puedes ajustarlo antes de abrir el modo pista.';practice.scrollIntoView({behavior:'smooth'});$('#trainingGoal').focus({preventScroll:true});return true;}
    catch{$('#planError').textContent='No se pudo cargar este plan. Prepara una nueva sesión.';return false;}
  }
  function renderPlan(plan){
    $('#planResult').innerHTML=`<span class="eyebrow">SESIÓN PROPUESTA</span><h3>${plan.title}</h3><p>${plan.settings.minutes} minutos · ${plan.settings.players} jugador${plan.settings.players===1?'':'es'} · ${['Base','Desarrollo','Profundizar'][plan.settings.level]}</p><ol class="plan-blocks">${plan.blocks.map(b=>`<li><span>${b.minutes} min</span><div><strong>${b.title}</strong><p>${b.instruction}</p></div></li>`).join('')}</ol><p class="form-help">Adapta la intensidad y detente ante dolor. El cronómetro avisa al finalizar cada bloque; tú decides cuándo avanzar.</p><button class="primary" id="startCourt" type="button">${session?'Volver a la sesión':'Abrir modo pista'} ↗</button><button class="quiet-button" id="printPlan" type="button">Imprimir plan</button>`;
    $('#startCourt').onclick=()=>{if(!session){session={id:'session-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),plan,index:0,remaining:plan.blocks[0].minutes*60,reps:plan.blocks.map(()=>0),running:false,deadline:0};persist();}renderCourt();$('#courtPanel').scrollIntoView({behavior:'smooth'});};
    $('#printPlan').onclick=()=>{document.body.classList.add('printing-training');window.print();document.body.classList.remove('printing-training');};
  }
  function renderCourt(){
    if(!session)return; const b=session.plan.blocks[session.index],panel=$('#courtPanel');panel.hidden=false;
    panel.innerHTML=`<div class="court-toolbar"><span class="eyebrow">MODO PISTA · BLOQUE ${session.index+1}/${session.plan.blocks.length}</span><button class="court-quiet" id="discardSession" type="button">Descartar sesión</button></div><h3 tabindex="-1" id="courtHeading">${b.title}</h3><p class="court-cue">${session.plan.cue}</p><div class="court-main"><div><div class="court-clock" id="courtClock" role="timer" aria-label="Tiempo restante">${clock(session.remaining)}</div><button class="primary" id="toggleTimer" type="button" ${session.remaining===0?'disabled':''}>${session.remaining===0?'Tiempo terminado':session.running?'Pausar':'Continuar'}</button><button class="court-quiet" type="button" id="restTimer">Descansar 60 s</button></div><div><p class="court-instruction">${b.instruction}</p><details><summary>Hazlo más fácil</summary><p>${b.easier}</p></details><div class="rep-counter"><span>Repeticiones de este bloque: <strong id="repCount">${session.reps[session.index]}</strong></span><button type="button" id="minusRep" aria-label="Quitar una repetición">−</button><button type="button" id="plusRep" aria-label="Añadir una repetición">+1</button></div></div></div><p id="courtStatus" role="status">${session.running?'Cronómetro en marcha.':'Sesión en pausa. Pulsa Continuar cuando estés preparado.'}</p><p id="restStatus" role="status"></p><button class="primary" id="nextBlock" type="button">${session.index===session.plan.blocks.length-1?'Terminar y anotar':'Pasar al siguiente bloque'} →</button><p class="court-storage" id="sessionStorage"></p><div id="discardPrompt"></div>`;
    $('#toggleTimer').onclick=toggleTimer;
    $('#plusRep').onclick=()=>{session.reps[session.index]=Math.min(9999,session.reps[session.index]+1);$('#repCount').textContent=session.reps[session.index];persist();};
    $('#minusRep').onclick=()=>{session.reps[session.index]=Math.max(0,session.reps[session.index]-1);$('#repCount').textContent=session.reps[session.index];persist();};
    $('#restTimer').onclick=startRest;
    $('#nextBlock').onclick=()=>{stopRest();stopTimer();if(session.index===session.plan.blocks.length-1){renderReflection();return;}session.index++;session.remaining=session.plan.blocks[session.index].minutes*60;persist();renderCourt();$('#courtHeading').focus();};
    $('#discardSession').onclick=()=>{if(session.running)toggleTimer();stopRest();$('#discardPrompt').innerHTML='<p>Se perderá el avance de esta sesión. Tus sesiones anteriores se conservan.</p><button class="court-quiet" type="button" id="confirmDiscard">Sí, descartar esta sesión</button><button class="court-quiet" type="button" id="keepSession">Seguir entrenando</button>';$('#confirmDiscard').onclick=()=>{stopTimer();session=null;save('padelx-active-session',null);panel.hidden=true;$('#planError').textContent='Sesión descartada. Ya puedes preparar otra.';$('#trainingGoal').focus();renderPlan(buildPlan(Object.fromEntries(new FormData($('#trainingForm')))));};$('#keepSession').onclick=()=>$('#discardPrompt').replaceChildren();};persist();
  }
  let restInterval=null,restDeadline=0;
  function stopRest(){if(restInterval!==null)clearInterval(restInterval);restInterval=null;}
  function startRest(){
    if(session.running)toggleTimer();stopRest();restDeadline=Date.now()+60000;
    const update=()=>{const remaining=Math.max(0,Math.ceil((restDeadline-Date.now())/1000));$('#restStatus').textContent=remaining?'Descanso · '+clock(remaining):'Descanso terminado. Pulsa Continuar cuando estés preparado.';if(!remaining)stopRest();};update();restInterval=setInterval(update,1000);
  }
  function renderReflection(){
    const panel=$('#courtPanel');panel.innerHTML=`<span class="eyebrow">UNA SESIÓN, UNA IDEA PARA SEGUIR</span><h3 tabindex="-1" id="reflectionHeading">¿Qué te llevas de hoy?</h3><p>Plan de ${session.plan.settings.minutes} minutos. Los bloques se avanzan manualmente: este registro no mide el tiempo real ni acredita dominio.</p><form id="reflectionForm"><label>Sensación de la sesión<select name="feeling"><option value="repetir">Quiero repetir</option><option value="mejor">Me he sentido con más control</option><option value="dificil">Necesito simplificar</option></select></label><label>Una cosa para la próxima vez<textarea name="note" maxlength="240" rows="3" placeholder="Por ejemplo: preparar antes y bajar el ritmo."></textarea></label><button class="primary" type="submit">Guardar sesión</button><p id="reflectionError" role="alert"></p></form><button class="court-quiet" id="backToCourt" type="button">Volver al último bloque</button>`;
    $('#reflectionHeading').focus();$('#backToCourt').onclick=renderCourt;
    $('#reflectionForm').onsubmit=e=>{e.preventDefault();const form=Object.fromEntries(new FormData(e.target));if(!['repetir','mejor','dificil'].includes(form.feeling)||typeof form.note!=='string'||form.note.length>240)return;const logs=validHistory(load('padelx-training-history',[]));const entry={id:session.id,at:new Date().toISOString(),...session.plan.settings,feeling:form.feeling,note:form.note.trim(),reps:session.reps};if(!save('padelx-training-history',[...logs.filter(x=>x.id!==session.id),entry].slice(-30))){$('#reflectionError').textContent='No se pudo guardar. Tu nota sigue aquí: puedes copiarla e intentarlo otra vez.';return;}save('padelx-active-session',null);session=null;panel.innerHTML='<h3>Un paso más en tu juego.</h3><p>Sesión guardada. Vuelve a practicar el mismo objetivo antes de añadir dificultad.</p><a class="primary" href="#practica">Preparar otra sesión ↑</a>';renderHistory();};
  }
  $('#trainingForm').onsubmit=e=>{e.preventDefault();if(session){$('#planError').textContent='Tienes una sesión en curso. Termínala o descártala en modo pista antes de preparar otra.';return;}try{const plan=buildPlan(Object.fromEntries(new FormData(e.target)));$('#planError').textContent='';save('padelx-plan-settings',plan.settings);renderPlan(plan);}catch(error){$('#planError').textContent=error.message;}};
  const initial=load('padelx-plan-settings',null);if(initial){try{const plan=buildPlan(initial);for(const [name,value] of Object.entries(plan.settings)){if(name==='minutes')$(`#trainingForm input[value="${value}"]`).checked=true;else $(`#trainingForm [name="${name}"]`).value=value;}renderPlan(plan);}catch{}}
  session=restore(load('padelx-active-session',null));if(session){selected=session.plan.settings.goal;renderPlan(session.plan);renderCourt();}
  renderRoutes();renderHistory();
  window.addEventListener('pagehide',()=>{if(session?.running)tick();stopTimer();stopRest();persist();});
  window.addEventListener('pageshow',()=>{if(session)renderCourt();});
  // API de lógica pura compartida con las comprobaciones del repositorio.
  window.PadelTraining={buildPlan,restore,validHistory,goals,prepare,refresh(){renderRoutes();renderHistory();}};
})();
