// Ilustraciones conceptuales: el texto de cada ficha conserva la explicación técnica.
const lessonVisuals={
core:[
  {src:'images/lessons/01-grip-ready.jpg',alt:'Muñeco PadelX en posición de espera con la pala delante y un detalle de la mano en el puño.',cue:'Observa la mano relajada, la pala delante y los pies separados para reaccionar.'},
  {src:'images/lessons/02-groundstrokes.jpg',alt:'Muñeco PadelX preparando golpes de derecha y revés con el cuerpo orientado hacia la pelota.',cue:'Gira pronto, ajusta la distancia con los pies y busca un contacto cómodo.'},
  {src:'images/lessons/03-serve.jpg',alt:'Muñeco PadelX preparando un saque bajo desde detrás de la línea de servicio.',cue:'Bota la pelota antes de golpear y empieza el punto con equilibrio.'},
  {src:'images/lessons/04-pair-position.jpg',alt:'Dos jugadores coordinan su posición en una pista de pádel.',cue:'Muévete con tu pareja y deja el centro cubierto según la posición de la pelota.'},
  {src:'images/lessons/05-back-glass.jpg',alt:'Muñeco PadelX observa la pelota junto al cristal de fondo y se coloca con espacio.',cue:'Lee el rebote y conserva espacio entre tu cuerpo y el cristal.'},
  {src:'images/lessons/06-volley-build.jpg',alt:'Muñeco PadelX volea delante del cuerpo cerca de la red.',cue:'Prepara corto, contacta delante y recupera el equilibrio para la siguiente pelota.'},
  {src:'images/lessons/07-lob.jpg',alt:'Muñeco PadelX juega un globo desde el fondo de la pista.',cue:'Busca altura y profundidad; avanza solo si la respuesta rival te da tiempo.'},
  {src:'images/lessons/08-bandeja.jpg',alt:'Muñeco PadelX se coloca de lado para una bandeja ante un globo cómodo.',cue:'Gira de lado, llega con tiempo y vuelve a una posición útil tras el golpe.'},
  {src:'images/lessons/09-shot-decision.jpg',alt:'Escenas del muñeco PadelX en situaciones de defensa, control y ataque.',cue:'La altura de la pelota y tu equilibrio ayudan a decidir cuánto arriesgar.'},
  {src:'images/lessons/10-bajada.jpg',alt:'Muñeco PadelX se prepara para jugar una salida alta después del cristal.',cue:'Ataca solo si el rebote sale alto y puedes contactar con control.'},
  {src:'images/lessons/11-vibora.jpg',alt:'Muñeco PadelX se orienta de lado para un golpe aéreo con efecto.',cue:'Prepara el cuerpo y evita buscar el efecto con un gesto brusco de muñeca.'},
  {src:'images/lessons/12-pressure.jpg',alt:'Dos compañeros de pádel hablan entre puntos y acuerdan una jugada.',cue:'Elige con tu pareja una intención sencilla antes del siguiente punto.'}
],
library:[
  {src:'images/lessons/13-forehand.jpg',alt:'Muñeco PadelX golpea de derecha desde el fondo con la pala delante del cuerpo.',cue:'Observa el giro, la distancia lateral y la recuperación.'},
  {src:'images/lessons/14-backhand.jpg',alt:'Muñeco PadelX prepara un revés de fondo con ayuda de la mano libre.',cue:'La mano libre ayuda a preparar; ajusta los pies antes del contacto.'},
  {src:'images/lessons/15-forehand-volley.jpg',alt:'Muñeco PadelX ejecuta una volea de derecha cerca de la red.',cue:'Mantén la pala delante y usa un recorrido corto.'},
  {src:'images/lessons/16-backhand-volley.jpg',alt:'Muñeco PadelX ejecuta una volea de revés cerca de la red.',cue:'Gira los hombros sin llevar la pala muy atrás.'},
  {src:'images/lessons/17-control-smash.jpg',alt:'Muñeco PadelX se coloca para un remate de control con pelota cómoda.',cue:'Llega con equilibrio y deja espacio para recuperar tras el golpe.'},
  {src:'images/lessons/18-return.jpg',alt:'Muñeco PadelX espera el bote del saque antes de restar.',cue:'En el resto, deja botar y prepara un gesto compacto.'},
  {src:'images/lessons/19-wall-exit.jpg',alt:'Muñeco PadelX observa una pelota tras el rebote en el cristal de fondo.',cue:'Acompaña el rebote y busca el contacto delante, con espacio.'},
  {src:'images/lessons/20-double-wall.jpg',alt:'Muñeco PadelX observa la pelota cerca de la esquina formada por dos cristales.',cue:'Identifica primero el recorrido; la ilustración no marca una secuencia exacta de rebotes.'},
  {src:'images/lessons/21-lob-choices.jpg',alt:'Muñeco PadelX compara dos situaciones de globo desde el fondo.',cue:'Adapta la altura y profundidad a la pelota que recibes.'},
  {src:'images/lessons/22-bandeja-library.jpg',alt:'Muñeco PadelX prepara una bandeja de control cerca de la red.',cue:'Lee pronto el globo y recupera con tu pareja.'},
  {src:'images/lessons/23-vibora-library.jpg',alt:'Muñeco PadelX se coloca lateralmente para una víbora.',cue:'Busca una pelota cómoda y mantén la estabilidad antes de añadir velocidad.'},
  {src:'images/lessons/24-bajada-library.jpg',alt:'Muñeco PadelX juega una pelota alta tras salir del cristal.',cue:'Distingue la salida alta que permite atacar de la baja que pide control.'},
  {src:'images/lessons/25-chiquita.jpg',alt:'Muñeco PadelX dirige una pelota baja hacia los pies rivales y avanza.',cue:'La transición depende de la calidad de la pelota: frena antes del golpe rival.'},
  {src:'images/lessons/26-pair-center.jpg',alt:'Pareja de pádel se coordina ante una pelota central.',cue:'Comunica quién juega la pelota y ajusta la posición con tu compañero.'},
  {src:'images/lessons/27-gancho.jpg',alt:'Muñeco PadelX se orienta para un golpe aéreo lateral ante un globo.',cue:'Lee la altura y tu posición antes de elegir un golpe aéreo avanzado.'}
]};

function lessonVisualFigure(visual){return `<figure class="lesson-visual"><img src="${visual.src}" alt="${visual.alt}" width="1200" height="800" decoding="async"><figcaption><strong>Fíjate en esto:</strong> ${visual.cue}<small>Ilustración conceptual. Adapta el gesto con un entrenador.</small></figcaption></figure>`}
