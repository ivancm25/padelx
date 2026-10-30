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
