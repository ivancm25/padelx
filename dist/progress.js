/* Copias personales v1. Solo se escriben las claves declaradas; nunca una sesión activa. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const keys = {completedLessons:'padelx-done', practices:'padelx-practices', sessions:'padelx-training-history', favorites:'padelx-favorites', planSettings:'padelx-plan-settings'};
  const catalog = [
    ...courses.flatMap((list,l)=>list.map((lesson,i)=>({id:`core:${l}-${i}`,title:lesson[0],image:lessonVisuals.core[l*4+i].src,level:l,index:i,type:'core'}))),
    ...extraLessons.map((lesson,i)=>({id:`library:${i}`,title:lesson.title,image:lessonVisuals.library[i].src,level:lesson.lvl,index:i,type:'library'}))
  ];
  const ids=new Set(catalog.map(x=>x.id));
  const completedIds=new Set(catalog.filter(x=>x.type==='core').map(x=>`${x.level}-${x.index}`));
  const shots=new Set(extraLessons.map(x=>x.title));
  const maxBytes=2*1024*1024;
  const fail = message => { throw new Error(message); };
  const integer = (n,min,max) => Number.isInteger(n)&&n>=min&&n<=max;
  const text = (s,max) => typeof s==='string'&&s.length<=max;
  const object = x => x!==null&&typeof x==='object'&&!Array.isArray(x);
  const list = (x,max,label) => {if(!Array.isArray(x)||x.length>max)fail(`La lista de ${label} no es válida o supera el límite de ${max}.`);return x;};
  function settings(value){
    if(value===null)return null;
    if(!object(value)||!integer(value.minutes,20,60)||!integer(value.players,1,4)||!integer(value.level,0,2))fail('La configuración de la sesión no es válida.');
    return window.PadelTraining.buildPlan(value).settings;
  }
  function practice(value){
    if(!object(value)||!shots.has(value.shot)||!text(value.date,40)||!value.date||!integer(value.attempts,1,1000)||!['success','net','out'].every(k=>integer(value[k],0,value.attempts))||value.success+value.net+value.out>value.attempts)fail('Hay una práctica con datos inválidos.');
    const decisions=value.decisions??0,recovery=value.recovery??0;
    if(!integer(decisions,0,value.attempts)||!integer(recovery,0,value.attempts))fail('Las decisiones o recuperaciones no pueden superar los intentos.');
    return {shot:value.shot,date:value.date,attempts:value.attempts,success:value.success,net:value.net,out:value.out,decisions,recovery};
  }
  function session(value){
    if(!object(value)||!text(value.id,100)||!value.id||!text(value.at,40)||!Number.isFinite(Date.parse(value.at))||!text(value.note,240)||!['repetir','mejor','dificil'].includes(value.feeling))fail('Hay una sesión con datos inválidos.');
    const plan=settings(value);const reps=value.reps??[0,0,0,0];
    if(!Array.isArray(reps)||reps.length!==4||!reps.every(n=>integer(n,0,9999)))fail('El contador de repeticiones no es válido.');
    return {id:value.id,at:new Date(value.at).toISOString(),...plan,feeling:value.feeling,note:value.note,reps:reps.slice()};
  }
  function normalize(data){
    if(!object(data))fail('Faltan los datos de la copia.');
    const completed=list(data.completedLessons,12,'lecciones').map(id=>completedIds.has(id)?id:fail('La copia contiene una lección desconocida.'));
    const favorites=list(data.favorites,27,'favoritos').map(id=>ids.has(id)?id:fail('La copia contiene un favorito desconocido.'));
    return {completedLessons:[...new Set(completed)],practices:list(data.practices,2000,'prácticas').map(practice),sessions:list(data.sessions,30,'sesiones').map(session),favorites:[...new Set(favorites)],planSettings:settings(data.planSettings)};
  }
  function parseBackup(input){
    if(typeof input!=='string'||new Blob([input]).size>maxBytes)fail('Selecciona una copia JSON de PadelX de hasta 2 MB.');
    let file;try{file=JSON.parse(input);}catch{fail('El archivo no contiene JSON válido.');}
    if(!object(file)||file.app!=='padelx'||file.version!==1||!text(file.exportedAt,40)||!Number.isFinite(Date.parse(file.exportedAt)))fail('No es una copia de PadelX compatible (versión 1).');
    return normalize(file.data);
  }
  function readData(){
    const raw={};for(const [name,key] of Object.entries(keys)){const saved=localStorage.getItem(key);try{raw[name]=saved===null?(name==='planSettings'?null:[]):JSON.parse(saved);}catch{fail('Hay datos locales dañados. Conserva este navegador y revisa el almacenamiento antes de importar.');}}
    return normalize(raw);
  }
  function backup(data){return JSON.stringify({app:'padelx',version:1,exportedAt:new Date().toISOString(),data:normalize(data)},null,2);}
  function mergeData(current,incoming){
    const local=normalize(current),other=normalize(incoming);
    const practices=local.practices.slice(),unmatched=new Map();
    for(const entry of local.practices){const id=JSON.stringify(entry);unmatched.set(id,(unmatched.get(id)||0)+1);}
    for(const entry of other.practices){const id=JSON.stringify(entry),count=unmatched.get(id)||0;if(count)unmatched.set(id,count-1);else practices.push(entry);}
    if(practices.length>2000)fail('La unión supera las 2000 prácticas. No se ha modificado nada.');
    // Ante un mismo ID de sesión, la versión de este dispositivo conserva sus notas.
    const sessions=new Map();for(const entry of [...other.sessions,...local.sessions])sessions.set(entry.id,entry);
    const ordered=[...sessions.values()].sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
    return {data:{completedLessons:[...new Set([...local.completedLessons,...other.completedLessons])],practices,sessions:ordered.slice(-30),favorites:[...new Set([...local.favorites,...other.favorites])],planSettings:local.planSettings??other.planSettings},omittedSessions:Math.max(0,ordered.length-30)};
  }
  function writeMerged(data){
    const normalized=normalize(data),before={},written=[];
    // Leer todas las claves antes de la primera escritura permite fallar sin modificar nada.
    for(const key of Object.values(keys))before[key]=localStorage.getItem(key);
    try{for(const [name,key] of Object.entries(keys)){localStorage.setItem(key,JSON.stringify(normalized[name]));written.push(key);}}
    catch(error){let restored=true;for(const key of written.reverse()){try{if(before[key]===null)localStorage.removeItem(key);else localStorage.setItem(key,before[key]);}catch{restored=false;}}
      fail(restored?'No se pudo guardar la copia. Se han restaurado los datos anteriores.':'No se completó el guardado ni la restauración. Conserva la copia y este navegador; revisa el almacenamiento antes de continuar.');}
    return normalized;
  }
  function favorites(){try{const saved=JSON.parse(localStorage.getItem(keys.favorites)||'[]');return Array.isArray(saved)?[...new Set(saved.filter(id=>ids.has(id)))]:[];}catch{return [];}}
  const area=document.createElement('section');area.id='mi-espacio';area.className='section personal-section';
  area.innerHTML=`<div class="section-heading"><div><div class="eyebrow">GUARDA LO QUE TE AYUDA A MEJORAR</div><h2>Tu espacio para<br>volver a la pista.</h2></div><p>Favoritos, próxima práctica<br>y una copia de tus datos.</p></div><div class="personal-grid"><div class="saved-panel"><h3>Mis lecciones guardadas</h3><p>Abre una lección o una clase y pulsa «Guardar en favoritos» para tenerla aquí.</p><div id="favoriteList"></div></div><div class="backup-panel"><span class="eyebrow">DE UN DISPOSITIVO A OTRO</span><h3>Tu progreso va contigo.</h3><p>Descarga una copia JSON e impórtala en otro navegador. Incluye lecciones marcadas, prácticas, sesiones terminadas, favoritos y preferencias del planificador. La sesión en curso se queda en este dispositivo.</p><button class="primary" id="exportBackup" type="button">Descargar mis datos ↓</button><label class="import-label" for="importBackup">Seleccionar una copia para importar</label><input id="importBackup" type="file" accept=".json,application/json"><p class="form-help">Hasta 2 MB. Contiene tus notas: guárdala donde puedas encontrarla. La importación combina los datos y conserva las notas locales si una sesión ya existe. No hay sincronización automática.</p><p id="backupStatus" role="status"></p><div id="importPreview"></div></div></div><div class="repeat-panel"><div><span class="eyebrow">REPETIR TAMBIÉN ES AVANZAR</span><h3>Tu próxima práctica</h3><p id="repeatDescription"></p></div><button class="primary" id="repeatTraining" type="button">Cargar la última sesión ↗</button></div>`;
  $('#practica').after(area);
  function refresh(){
    const saved=favorites();
    $('#favoriteList').innerHTML=saved.length?saved.map(id=>{const item=catalog.find(x=>x.id===id);return `<article class="favorite-item"><img src="${item.image}" alt="" loading="lazy" width="1200" height="800"><div><button type="button" data-open-favorite="${id}">${escape(item.title)} ↗</button><small>${item.type==='core'?'Lección de la ruta':'Clase de biblioteca'}</small><button class="quiet-button" type="button" data-remove-favorite="${id}" aria-label="Quitar ${escape(item.title)} de favoritos">Quitar de favoritos</button></div></article>`;}).join(''):'<p class="empty-favorites">Aquí aparecerán las lecciones a las que quieras volver.</p>';
    document.querySelectorAll('[data-open-favorite]').forEach(button=>button.onclick=()=>{const item=catalog.find(x=>x.id===button.dataset.openFavorite);if(item.type==='core'){select(item.level);openLesson(item.index);}else openClass(item.index);});
    document.querySelectorAll('[data-remove-favorite]').forEach(button=>button.onclick=()=>{if(toggleFavorite(button.dataset.removeFavorite))$('#exportBackup').focus();});
    let last;try{last=window.PadelTraining.validHistory(JSON.parse(localStorage.getItem(keys.sessions)||'[]')).slice(-1)[0];}catch{}
    $('#repeatDescription').textContent=last?`${window.PadelTraining.goals.find(g=>g.id===last.goal).title} · ${last.minutes} min · ${last.players} jugador${last.players===1?'':'es'}. Puedes ajustar el plan antes de comenzar.`:'Termina y guarda una sesión para volver a cargar aquí su objetivo, duración, nivel y jugadores.';
    $('#repeatTraining').disabled=!last;
    $('#repeatTraining').onclick=()=>{if(!last)return;const ok=window.PadelTraining.prepare(last);if(!ok)$('#backupStatus').textContent='Hay una sesión en curso. Termínala o descártala en modo pista antes de preparar otra.';};
  }
  function toggleFavorite(id){
    if(!ids.has(id))return false;
    const saved=favorites(),next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
    try{localStorage.setItem(keys.favorites,JSON.stringify(next));refresh();return true;}catch{const status=$('#favoriteStatus')||$('#backupStatus');status.textContent='No se pudo guardar el cambio. Tus favoritos anteriores se conservan.';return false;}
  }
  function decorate(id){
    $('#modalBody').insertAdjacentHTML('beforeend','<div class="favorite-action"><button class="quiet-button" id="favoriteLesson" type="button"></button><p id="favoriteStatus" role="status"></p></div>');
    const button=$('#favoriteLesson');const update=()=>{const saved=favorites().includes(id);button.textContent=saved?'Quitar de favoritos':'Guardar en favoritos';button.setAttribute('aria-pressed',String(saved));};update();button.onclick=()=>{if(toggleFavorite(id))update();};
  }
  const oldLesson=openLesson,oldClass=openClass;
  openLesson=function(i){oldLesson(i);decorate(`core:${level}-${i}`);};
  openClass=function(i){oldClass(i);decorate(`library:${i}`);};
  const oldProgress=$('#progressBtn').onclick;
  $('#progressBtn').onclick=()=>{oldProgress();$('#modalBody').insertAdjacentHTML('beforeend','<a class="primary" id="openPersonal" href="#mi-espacio">Mis favoritos y copias de datos ↗</a>');$('#openPersonal').onclick=()=>modal.close();};
  function download(contents){
    const url=URL.createObjectURL(new Blob([contents],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download=`padelx-datos-${new Date().toISOString().slice(0,10)}.json`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('#exportBackup').onclick=()=>{try{download(backup(readData()));$('#backupStatus').textContent='Copia preparada para descargar. Comprueba que el archivo se ha guardado antes de cambiar de dispositivo.';}catch(error){$('#backupStatus').textContent=error.message;}};
  let pending=null,request=0;
  const counts=data=>`${data.completedLessons.length} lecciones marcadas, ${data.practices.length} prácticas, ${data.sessions.length} sesiones y ${data.favorites.length} favoritos`;
  function cancelImport(){request++;pending=null;$('#importPreview').replaceChildren();$('#importBackup').value='';$('#importBackup').focus();}
  $('#importBackup').onchange=async event=>{
    const ticket=++request;pending=null;$('#importPreview').replaceChildren();const file=event.target.files?.[0];if(!file)return;
    try{if(file.size>maxBytes)fail('La copia supera 2 MB. No se ha modificado nada.');const incoming=parseBackup(await file.text());if(ticket!==request)return;const merged=mergeData(readData(),incoming);pending=incoming;
      $('#importPreview').innerHTML=`<div class="import-review"><h4>Revisa antes de combinar</h4><p>La copia contiene ${counts(incoming)}.</p><p>El resultado será: ${counts(merged.data)}. Los registros idénticos no se duplican. ${merged.omittedSessions?`Se conservarán las 30 sesiones más recientes; ${merged.omittedSessions} quedarán fuera del historial.`:'Se conservan las notas de las sesiones existentes en este dispositivo.'}</p><p>La sesión en curso no cambia. Las preferencias locales del planificador tienen prioridad.</p><button class="primary" id="confirmImport" type="button">Combinar estos datos</button><button class="quiet-button" id="cancelImport" type="button">Cancelar</button></div>`;
      $('#backupStatus').textContent='Copia validada. Todavía no se ha modificado ningún dato.';$('#cancelImport').onclick=cancelImport;
      $('#confirmImport').onclick=()=>{if(!pending)return;try{const result=mergeData(readData(),pending);const applied=writeMerged(result.data);done=applied.completedLessons;render();history();window.PadelTraining.refresh();refresh();cancelImport();$('#backupStatus').textContent=`Datos combinados: ${counts(applied)}. La sesión en curso se conserva.`;}catch(error){$('#backupStatus').textContent=error.message;}};
    }catch(error){if(ticket===request){pending=null;$('#backupStatus').textContent=error.message;}}
  };
  window.PadelProgress={parseBackup,normalize,mergeData,writeMerged,readData,backup,refresh,toggleFavorite,catalog};
  refresh();
})();
