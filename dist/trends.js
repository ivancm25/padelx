/* Comparaciones locales: solo registros con el mismo ejercicio y contexto. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const difficulties = {base:'Base',desarrollo:'Desarrollo',profundizar:'Profundizar'};
  const feeds = {cesta:'Lanzamiento cómodo',peloteo:'Peloteo cooperativo',punto:'Punto con oposición'};
  function normalizeContext(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || typeof value.exercise !== 'string' || !value.exercise.trim() || value.exercise.length > 80 || !Object.hasOwn(difficulties,value.difficulty) || !Object.hasOwn(feeds,value.feed)) throw Error('Revisa el ejercicio, la dificultad y la alimentación.');
    return {exercise:value.exercise.trim(),difficulty:value.difficulty,feed:value.feed};
  }
  function day(value) {
    if (typeof value !== 'string') return null;
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
    if (!match) return null;
    const [d,m,y] = match.slice(1).map(Number), date = new Date(Date.UTC(y,m-1,d));
    return date.getUTCFullYear()===y && date.getUTCMonth()===m-1 && date.getUTCDate()===d ? date.getTime() : null;
  }
  function groups(logs) {
    const result = new Map(); let legacy = 0;
    for (const [index, log] of logs.entries()) {
      if (!log || !extraLessons.some(x=>x.title===log.shot) || !Number.isInteger(log.attempts) || log.attempts<1 || log.attempts>1000 || !['success','net','out'].every(k=>Number.isInteger(log[k])) || !['success','net','out','decisions','recovery'].every(k=>Number.isInteger(log[k]??0)&&(log[k]??0)>=0&&(log[k]??0)<=log.attempts) || log.success+log.net+log.out>log.attempts) continue;
      let context; try {context=normalizeContext(log.context);} catch {legacy++;continue;}
      const at=day(log.date); if(at===null){legacy++;continue;}
      const key=JSON.stringify([log.shot,context.exercise,context.difficulty,context.feed]);
      if (!result.has(key)) result.set(key,{key,shot:log.shot,context,entries:[]});
      result.get(key).entries.push({...log,at,index});
    }
    for(const group of result.values()) group.entries.sort((a,b)=>a.at-b.at||a.index-b.index);
    return {groups:[...result.values()],legacy};
  }
  function compare(group) {
    if(group.entries.length<2) return null;
    const [before,after]=group.entries.slice(-2);
    const rate=(x,k)=>100*(x[k]??0)/x.attempts;
    return {before,after,changes:Object.fromEntries(['success','net','out','decisions','recovery'].map(k=>[k,rate(after,k)-rate(before,k)]))};
  }
  const area=document.createElement('section');area.id='evolucion';area.className='section trends-section';
  area.innerHTML=`<div class="section-heading"><div><div class="eyebrow">OBSERVA, AJUSTA, REPITE</div><h2>Compara lo que<br>has practicado.</h2></div><p>El mismo ejercicio, con la misma dificultad<br>y el mismo tipo de alimentación.</p></div><div class="trends-panel"><label for="trendGroup">Ejercicio y condiciones</label><select id="trendGroup"></select><p id="trendStatus" role="status"></p><div id="trendResult"></div><button id="trendLog" class="primary" type="button">Registrar una práctica ↗</button><p class="form-help">Registros personales de este navegador. Un porcentaje distinto no demuestra aprendizaje: revisa varias sesiones y su aplicación al juego. Si cambias distancia, objetivo o material, usa otro nombre de ejercicio.</p></div>`;
  $('#mi-espacio').after(area);
  const labels={success:'Golpes válidos',net:'Errores de red',out:'Errores de fondo',decisions:'Decisiones adecuadas',recovery:'Recuperaciones equilibradas'};
  function refresh() {
    let data;
    try {const logs=JSON.parse(localStorage.getItem('padelx-practices')||'[]');if(!Array.isArray(logs))throw Error();data=groups(logs);}
    catch {$('#trendStatus').textContent='No se pueden leer tus prácticas. Conserva tus datos y revisa el almacenamiento antes de continuar.';$('#trendResult').innerHTML='';$('#trendGroup').innerHTML='';$('#trendGroup').disabled=true;return;}
    $('#trendGroup').disabled=!data.groups.length;
    $('#trendGroup').innerHTML=data.groups.map((g,i)=>`<option value="${i}">${escape(g.shot)} · ${escape(g.context.exercise)} · ${difficulties[g.context.difficulty]} · ${feeds[g.context.feed]}</option>`).join('');
    // El valor del selector es un índice; se conserva por clave al guardar/importar.
    const priorKey=refresh.selectedKey;
    const index=data.groups.findIndex(g=>g.key===priorKey);$('#trendGroup').value=String(index<0?0:index);
    $('#trendStatus').textContent=data.groups.length?`${data.groups.length} ejercicio(s) con contexto. ${data.legacy?`${data.legacy} registro(s) antiguo(s) o sin contexto comparable se conservan fuera de la comparación.`:''}`:'Registra tu primera práctica con ejercicio, dificultad y alimentación. Los registros antiguos se conservan; no se les asignan condiciones supuestas.';
    function render() {
      const group=data.groups[Number($('#trendGroup').value)];if(!group){$('#trendResult').innerHTML='';return;}refresh.selectedKey=group.key;
      const result=compare(group);
      if(!result){$('#trendResult').innerHTML='<p class="trend-empty">Ya tienes una práctica. Registra otra en las mismas condiciones para compararlas.</p>';return;}
      const {before,after,changes}=result;
      $('#trendResult').innerHTML=`<h3>Las dos últimas prácticas equivalentes</h3><p>${group.entries.length} registros en este grupo. ${escape(before.date)} → ${escape(after.date)}${before.date===after.date?' · mismo día, en orden de registro':''}.</p><div class="trend-table"><table><caption>Resultados e intentos de cada práctica</caption><thead><tr><th scope="col">Medida</th><th scope="col">Anterior (${before.attempts} intentos)</th><th scope="col">Última (${after.attempts} intentos)</th><th scope="col">Cambio</th></tr></thead><tbody>${Object.entries(labels).map(([k,label])=>`<tr><th scope="row">${label}</th><td>${before[k]??0}/${before.attempts} · ${Math.round(100*(before[k]??0)/before.attempts)} %</td><td>${after[k]??0}/${after.attempts} · ${Math.round(100*(after[k]??0)/after.attempts)} %</td><td>${changes[k]>0?'+':''}${changes[k].toFixed(1)} pp</td></tr>`).join('')}</tbody></table></div><p class="form-help">pp = puntos porcentuales. Las decisiones y recuperaciones se observan por separado de los aciertos. El orden entre prácticas del mismo día puede cambiar al combinar copias de dispositivos distintos.</p><details><summary>Ver las últimas 10 prácticas de este ejercicio</summary><ol>${group.entries.slice(-10).reverse().map(x=>`<li>${escape(x.date)} · ${x.success}/${x.attempts} válidos (${Math.round(100*x.success/x.attempts)} %)</li>`).join('')}</ol></details>`;
    }
    $('#trendGroup').onchange=render;render();
  }
  const oldLog=$('#logPractice').onclick;
  $('#logPractice').onclick=()=>{oldLog();$('#logForm').insertAdjacentHTML('afterbegin',`<fieldset class="practice-context"><legend>Para comparar esta práctica</legend><label for="practiceExercise">Nombre del ejercicio</label><input id="practiceExercise" maxlength="80" required placeholder="Por ejemplo: derecha cruzada a zona profunda"><p class="form-help">Conserva el mismo nombre si repites objetivo y condiciones.</p><label for="practiceDifficulty">Dificultad</label><select id="practiceDifficulty" required><option value="">Selecciona la dificultad</option>${Object.entries(difficulties).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select><label for="practiceFeed">Alimentación de pelota</label><select id="practiceFeed" required><option value="">Selecciona la alimentación</option>${Object.entries(feeds).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></fieldset>`);};
  function readContext() {
    try {return normalizeContext({exercise:$('#practiceExercise').value,difficulty:$('#practiceDifficulty').value,feed:$('#practiceFeed').value});}
    catch(error){$('#logError').textContent=error.message;return false;}
  }
  $('#trendLog').onclick=()=>$('#logPractice').onclick();
  const oldHistory=history;history=function(){oldHistory();refresh();};
  window.addEventListener('storage',event=>{if(event.key==='padelx-practices'||event.key===null)refresh();});
  window.PadelTrends={normalizeContext,groups,compare,refresh,readContext};refresh();
})();
