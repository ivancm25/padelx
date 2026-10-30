# PadelX · memoria y plan de lanzamiento

Actualizado: 29/10/2026. Documento vivo para decidir, construir y comprobar cada fase. Este plan propone prioridades; ninguna función futura se presenta como disponible hoy.

## Punto de partida y objetivo

La web actual es estática: 12 lecciones iniciales, 15 fichas técnicas, filtros, animaciones conceptuales y prácticas guardadas en `localStorage`. No hay cuentas, sincronización entre dispositivos, reservas, pagos ni vídeos profesionales. Las fichas necesitan revisión de un entrenador antes de venderse como formación técnica. El objetivo inicial es ayudar a jugadores recreativos hispanohablantes a entender una situación de juego, practicarla en pista y comprobar si mejoran; la propuesta comercial se validará con usuarios antes de construir funciones costosas.

## Principios de producto

- Una función entra en el plan si ayuda a **aprender, practicar, decidir, jugar con otros o recibir ayuda real**. Evitar añadir apartados solo por volumen.
- Distinguir reglas oficiales, evidencia científica, criterio de entrenadores y ejercicios propuestos por PadelX. No prometer resultados, niveles oficiales ni prevención de lesiones sin respaldo.
- Diseñar primero para móvil, sesiones cortas y consulta junto a la pista. Mantener una ruta gratuita completa que demuestre valor.
- Medir utilidad con personas reales y ajustar el orden de fases. Las fechas y precios se decidirán tras medir esfuerzo, demanda y capacidad de soporte.

## Fase 0 · Base fiable y coordinación (antes de nuevas funciones)

**Entregables:** inventario de pantallas y contenido; corrección de errores; navegación, enlaces, búsqueda, modales y guardado local revisados; pruebas en móvil y escritorio; accesibilidad con teclado, contraste, foco y textos alternativos; rendimiento y SEO técnico básicos. Añadir una matriz de contenido con identificador, nivel, fuente, autor/revisor, fecha de revisión y estado. Definir analítica mínima y respetuosa con la privacidad, sin activar rastreadores innecesarios.

**Salida:** las rutas principales funcionan sin errores de consola; las comprobaciones de `AGENTS.md` pasan; un jugador puede encontrar una clase, completar un ejercicio y recuperar su registro; los problemas críticos de accesibilidad y móvil están resueltos. Registrar incidencias y prioridades en GitHub.

## Fase 1 · Contenido verificado y experiencia de aprendizaje

**Entregables:** revisar con entrenador cualificado las 27 piezas existentes, empezando por seguridad, reglas, saque, paredes y golpes aéreos. Convertir las clases en una plantilla consistente: situación de partido, objetivo, cuándo usar el recurso, preparación, contacto, decisión, error frecuente, ejercicio graduado, criterio observable y siguiente paso. Crear rutas por objetivos (primer partido, defender cristal, ganar la red, jugar en pareja), no solo por supuesto nivel. Añadir glosario visual, reglas con ejemplos y fecha de vigencia, subtítulos/transcripciones y variantes para zurdos cuando estén realmente revisadas.

**Método editorial:** cada afirmación de reglas se contrasta con la FIP vigente; las afirmaciones sobre salud se comprueban con fuentes sanitarias fiables; la táctica y técnica se revisan por entrenador y se presentan como opciones dependientes del contexto. Conservar enlaces a fuentes primarias, fecha de consulta, versión y responsable de revisión. Probar cada clase con principiantes y ajustar lo que no entiendan. Las animaciones actuales se etiquetan como conceptuales; los vídeos futuros requieren revisión del guion, demostración y derechos de imagen/audio.

**Salida:** ninguna ficha pública contiene una regla sin fuente o una demostración presentada como validación biomecánica; al menos una ruta completa se prueba con usuarios y permite pasar de explicación a ejercicio y evaluación.

## Fase 2 · Herramientas útiles en pista (primera versión pública)

**Prioridad alta:** planificador de sesiones de 20/40/60 minutos según objetivo, pareja y espacio; tarjetas de ejercicios con material, número de jugadores, progresión y alternativa fácil; registro de práctica con exportación/importación de datos y tendencias por ejercicio; autoevaluación antes/después y recordatorio de repetir una habilidad; calculadora de tanteo y guía interactiva de reglas con casos habituales. Todas deben funcionar sin cuenta al principio y explicar claramente dónde se guardan los datos.

**Prioridad media:** pizarra táctica sencilla para pareja (posición, trayectoria y decisión), creador de rutinas personalizadas, comparador de sesiones equivalentes y lista de preparación para partido. Probar primero prototipos con jugadores; construir solo lo que usen de forma repetida.

**Salida:** usuarios de prueba completan una sesión real con la herramienta, entienden qué practicar después y pueden conservar sus datos. Medir activación, sesiones completadas, retorno voluntario y utilidad declarada; no equiparar clics con aprendizaje.

## Fase 3 · Comunidad y servicios reales

**Opciones a validar:** perfiles y progreso entre dispositivos; agenda de clases con disponibilidad real; reserva y cancelación; solicitud de revisión de vídeo a entrenadores; retos cooperativos de pareja; búsqueda de compañeros o partidos; recomendaciones de ejercicios según errores registrados. Priorizar reservas o revisión solo si hay entrenadores, plazas y capacidad de respuesta verificables. Las recomendaciones deben ser explicables y revisables, sin atribuirse diagnóstico técnico automático.

**Condiciones:** cuentas y permisos en servidor, exportación/borrado de datos, consentimiento y controles de privacidad, moderación de contenido generado por usuarios, protección de menores si se les permite entrar, soporte y procedimientos para incidencias. No mostrar disponibilidad o servicios ficticios.

**Salida:** piloto cerrado con prestación real, tiempos de respuesta medidos y usuarios capaces de gestionar sus datos y reservas.

## Fase 4 · Modelo de negocio y lanzamiento ampliado

Validar demanda con entrevistas y pilotos antes de fijar precios. Posibles ofertas: biblioteca abierta; plan de entrenamiento con rutas y seguimiento; acompañamiento con entrenador solo cuando exista capacidad real; clases o eventos reservables. Definir qué recibe el cliente, frecuencia, límites, cancelación y soporte. Implementar pagos y estado de suscripción en servidor, facturación e impuestos según asesoramiento profesional; comprobar contratos, derechos audiovisuales, privacidad, cookies y términos antes del cobro. Evitar un muro de pago solo en JavaScript.

**Salida:** propuesta y precio probados con clientes, cobro y cancelación ensayados, soporte preparado, políticas publicadas y métricas de retención/valor suficientes para ampliar inversión.

## Fase 5 · Mejoras posteriores, según evidencia de uso

Vídeos por golpe y lateralidad, análisis de vídeo asistido con revisión humana, planes de equipo, torneos y ligas locales, integración con clubes, calendario de entrenamiento, versión multilingüe y app instalable. Cada iniciativa requiere hipótesis, coste, responsable, piloto y decisión explícita de continuar o descartarla. La visión artificial no debe dar correcciones biomecánicas concluyentes sin validación.

## Control transversal para cada entrega

1. Leer `AGENTS.md`, consultar `git status`, hacer `git fetch origin`, revisar cambios nuevos y crear/actualizar una rama de tarea.
2. Definir problema del usuario, alcance, criterio de aceptación y fuente para cualquier afirmación factual.
3. Implementar una entrega pequeña; ejecutar comprobaciones de código y recorrido manual móvil/escritorio; revisar accesibilidad, privacidad y contenido afectado.
4. Consultar otra vez el remoto, integrar cambios de compañeros, revisar diff y subir la rama/PR sin forzar historial.
5. Sincronizar en Sites exactamente la versión revisada y comprobar el despliegue. Si publicación o verificación falla, registrar el estado y no afirmar que está publicado.

## Indicadores y decisiones

- **Valor:** porcentaje de usuarios que completan una práctica y vuelven a usar una ruta; entrevistas sobre claridad y aplicación en pista.
- **Calidad:** fichas revisadas, errores de reglas detectados, incidencias de accesibilidad, fallos de guardado y tiempo de carga móvil.
- **Servicio:** solicitudes atendidas, tiempo de respuesta, reservas efectivas y cancelaciones.
- **Negocio:** conversión a prueba/pago, retención y coste real de contenido, entrenador y soporte. No usar métricas de vanidad como único criterio.

Revisar el plan tras cada piloto. Priorizar la fase siguiente por evidencia de uso y capacidad operativa, no por cantidad de funciones.

## Fuentes base consultadas el 29/10/2026

- [FIP, documentos oficiales y Reglas del Pádel](https://www.padelfip.com/es/documents/): referencia primaria para reglas; comprobar la versión vigente antes de publicar cambios.
- [FIP, Reglas del Pádel con aplicación 01/01/2026](https://www.padelfip.com/wp-content/uploads/2025/12/FIP_Rules-of-Padel-1.pdf): base consultada para la planificación, no sustituye la revisión de cada ficha.
- [OMS, recomendaciones de actividad física](https://www.who.int/initiatives/behealthy/physical-activity/): marco de salud general; no prueba beneficios específicos ni seguridad de un ejercicio de pádel.
- [W3C, WCAG 2.2](https://www.w3.org/TR/WCAG22/): referencia para accesibilidad web.
- [AEPD, protección de datos por defecto](https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/proteccion-de-datos-por-defecto) y [guía de cookies](https://www.aepd.es/es/documento/guia-cookies.pdf): referencia inicial de privacidad; revisar requisitos concretos antes de recoger datos o activar analítica.
- [OWASP ASVS](https://asvs.owasp.org/): marco para verificar seguridad al añadir cuentas, pagos o datos compartidos.


## Entrega implementada · Rutas y sesiones en pista (30/10/2026)

### Alcance acordado con Iván

Convertir la biblioteca existente en un recorrido: elegir objetivo → consultar las lecciones relacionadas → preparar sesión → entrenar con modo pista → anotar qué repetir. Esta entrega no incorpora cuentas, pagos, IA conectada ni servicios de entrenador.

- Cuatro rutas: primer partido, defensa de pared, construcción en red y coordinación de pareja. Enlazan lecciones existentes y reflejan su progreso local; completarlas no acredita dominio técnico.
- Planificador determinista de 20, 40 o 60 minutos, nivel base/desarrollo/profundización y 1, 2 o 4 jugadores. Duración repartida entre activación, práctica con descansos, aplicación y reflexión. En solitario se adapta a preparación y lectura; con dos personas se evita simular coordinación real de dobles.
- Modo pista con instrucciones grandes, alternativa fácil, cronómetro por bloque, pausa, descanso de 60 segundos y contador manual de repeticiones. El avance de bloque es manual; no registra tiempo real de entrenamiento.
- Recuperación de sesión en pausa tras recargar, descarte explícito y protección ante sustitución accidental de una sesión abierta.
- Cierre con sensación y nota de hasta 240 caracteres. Conserva hasta 30 sesiones en este navegador y muestra las cinco últimas. No hay sincronización entre dispositivos.
- Impresión del plan, navegación con teclado y diseño adaptable a móvil.

### Archivos y coordinación para el compañero y su IA

Implementación añadida en dist/training.js y dist/training.css; dist/index.html carga ambos después de los módulos existentes. La biblioteca y sus animaciones siguen en academy.js. Las comprobaciones de esta entrega están en check-training.cjs y las anteriores en check.cjs.

Claves de almacenamiento nuevas: padelx-plan-settings, padelx-active-session y padelx-training-history. Se conservan padelx-done y padelx-practices. No renombrar o borrar claves compartidas sin migración. El generador y la validación de recuperación se exponen en window.PadelTraining para comprobación automática.

Antes de editar o subir: leer AGENTS.md, consultar main y las ramas remotas, revisar los cambios del otro colaborador y preservar el historial. GitHub es la fuente compartida; el remoto de Sites es independiente. Si fetch falla, consultar la API de GitHub y verificar los archivos por su SHA. No afirmar que un despliegue está publicado sin resultado succeeded de Sites.

### Criterios de aceptación

1. Las cuatro rutas abren las lecciones correctas y reflejan sus marcas de progreso.
2. Todas las combinaciones admitidas de objetivo, tiempo, jugadores y nivel generan bloques positivos que suman exactamente el tiempo elegido; las entradas inválidas se rechazan.
3. Una persona no recibe ejercicios que necesitan alimentador; las adaptaciones de dos y cuatro jugadores se explican.
4. Pausar, descansar, finalizar bloque, anotar y recuperar tras recarga funcionan; el reloj no acumula retrasos por contar intervalos y nunca avanza automáticamente al siguiente ejercicio.
5. Datos locales dañados y almacenamiento bloqueado no rompen la página; los fallos de guardado se muestran y las notas se conservan para reintentar.
6. Pasan node --check en los archivos JavaScript, node check.cjs y node check-training.cjs. Revisar móvil y escritorio cuando el navegador esté disponible; registrar cualquier límite de verificación.

### Estado y publicación

Implementación integrada en main mediante la PR #5: https://github.com/ivancm25/padelx/pull/5 (merge 5684db6d0b1c4a60f3dfcaa3c445648064bea9ae). No quedan cambios de esta entrega pendientes de integrar. Verificaciones realizadas: sintaxis de los cuatro scripts, node check.cjs y node check-training.cjs. Pasan 108 combinaciones del planificador y comprobaciones de rutas, entradas inválidas, reloj, pausas, descanso, recuperación, repeticiones, cierre, almacenamiento bloqueado, escape de notas y descarte. No se ha realizado revisión visual en navegador en esta sesión: no hay herramienta de navegador disponible. Sites sigue en versión 1, verificado al cerrar esta entrega. No confundir los merges en GitHub con una publicación. Bloqueo observado: Git en el ejecutor Windows devuelve getaddrinfo() thread failed to start al conectar con GitHub y con el remoto de Sites. Reintentar el flujo oficial con credencial renovada, diagnosticar el error concreto y mantener los permisos de acceso existentes. Diagnóstico adicional de esta sesión: curl no resuelve github.com; Resolve-DnsName devuelve «Acceso denegado» y la resolución DNS de .NET falla también. El fallo no es exclusivo de Git ni de la aplicación. La sesión tiene acceso de red restringido y no puede cambiar sus permisos desde el código del proyecto. No se ha publicado esta entrega; completar sincronización y publicación desde una sesión con conectividad autorizada. No desactivar TLS, cambiar accesos del Site ni reescribir historial para sortearlo.

### Propuestas para las siguientes entregas (pendientes, no implementadas)

Prioridad inmediata tras probar esta versión con jugadores:

- Exportar/importar los datos personales para poder conservarlos y trasladarlos de dispositivo.
- Favoritos y próxima práctica: guardar una selección de ejercicios con un objetivo.
- Comparar sesiones del mismo ejercicio, separando dificultad y tipo de alimentación; evitar indicadores que confundan volumen con aprendizaje.
- Entrada por problema: «mis globos se quedan cortos» → explicación y ejercicio revisados. Puede empezar con reglas explícitas sin IA.
- Pizarra táctica interactiva y situaciones «decide el siguiente golpe», con explicación contextual revisada por entrenador.
- Mejorar impresión, uso sin conexión y acceso desde móvil tras medir el rendimiento de las imágenes.

Después, solo si existe necesidad demostrada: cuenta y sincronización, plan semanal, vídeos reales revisados, revisión humana por entrenador, reservas y modelo de pago. No simular servicios, disponibilidad o correcciones biomecánicas automáticas.
