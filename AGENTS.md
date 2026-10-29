# Colaboración en PadelX

Repositorio compartido de referencia: https://github.com/ivancm25/padelx (rama principal: main).

## Antes de editar

1. Consulta este archivo y el estado local: `git status --short --branch`.
2. Comprueba SIEMPRE el estado remoto antes de realizar cambios. Ejecuta `git fetch origin` y revisa commits y diferencias con `origin/main`. Si se trabaja por conector, consulta la cabeza remota y los archivos actuales equivalentes.
3. Lee los cambios nuevos de otros colaboradores. Actualiza con fast-forward cuando sea posible; no descartes trabajo local ni sobrescribas cambios remotos. Resuelve divergencias preservando el trabajo de ambos.
4. Si no puedes consultar el remoto, informa del bloqueo; no edites basándote en una copia que podría estar desactualizada.

## Antes de subir

1. Vuelve a consultar el remoto: puede haber cambiado mientras trabajabas.
2. Integra y revisa los cambios nuevos, repite las comprobaciones pertinentes y revisa el diff completo.
3. No uses force push ni reemplaces el historial compartido. Las actualizaciones por API deben comprobar la cabeza esperada y preservar los archivos existentes.
4. Prefiere una rama por tarea y pull requests para revisión. No mezcles cambios ajenos con tu tarea.

## Validación

Sitio estático sin compilación. Sirve `dist/` con un servidor HTTP local. Ejecuta `node --check dist/app.js`, `node --check dist/academy.js` y `node check.cjs`. Revisa visualmente móvil y escritorio cuando el entorno permita navegador. Informa si falta esa comprobación.

## Publicación y contenido

GitHub es el punto compartido del código. El repositorio de fuente de Sites es un destino de publicación independiente: subir a GitHub no despliega automáticamente. Antes de publicar, sincroniza el código compartido y publica exactamente el estado revisado. Conserva la identidad existente en `.openai/hosting.json`.

Nunca subas tokens, credenciales, archivos .env, datos personales de usuarios ni artefactos temporales. No presentes las animaciones conceptuales como vídeos biomecánicos validados. Mantén claras las funciones disponibles y las pendientes.
