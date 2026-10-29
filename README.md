# PadelX

Escuela de pádel por niveles con biblioteca técnica, demostraciones animadas, ejercicios y seguimiento local de prácticas.



## Arrancar

No hay dependencias ni paso de compilación. Sirve la carpeta `dist` con un servidor estático, por ejemplo:

```sh
python -m http.server 4173 --directory dist
```

Abre http://localhost:4173. También puede abrirse `dist/index.html` directamente, aunque se recomienda HTTP para un comportamiento consistente.

## Estructura

- `dist/index.html` y `dist/style.css`: interfaz principal.
- `dist/app.js`: rutas iniciales, lecciones y progreso local.
- `dist/academy.js` y `dist/academy.css`: biblioteca, animaciones y registro de prácticas.
- `check.cjs`: comprobaciones de lógica sin navegador.
- `PLAN_EDITORIAL.md`: análisis pedagógico, rutas y producto futuro.
- `AGENTS.md`: instrucciones obligatorias de coordinación para asistentes.


Las imágenes y tipografías externas necesitan conexión. El progreso y las prácticas se guardan en localStorage del navegador y no se sincronizan entre usuarios.

## Comprobar

```sh
node --check dist/app.js
node --check dist/academy.js
node check.cjs
```

## Trabajar entre dos

Lee `AGENTS.md`. Antes de editar y antes de subir, consulta siempre los cambios remotos. Trabaja en una rama por tarea y comparte mediante pull request. No uses force push. Para aportar, el propietario debe invitar al colaborador en Settings → Collaborators y este debe aceptar.

## Estado de producto

Incluye 12 lecciones iniciales y 15 fichas técnicas adicionales, filtros, animaciones conceptuales y narración opcional del navegador. No incluye pagos, cuentas propias, vídeo profesional ni revisión biomecánica. Los criterios de aprendizaje son propuestas pedagógicas y requieren revisión técnica antes de su comercialización.

## Desplegar

GitHub guarda el código compartido. Subir cambios aquí no actualiza automáticamente el sitio de Sites. La publicación usa el flujo de Sites y su repositorio de fuente independiente. La configuración del despliegue se mantiene fuera de este repositorio público. Sincroniza primero los cambios de GitHub.
