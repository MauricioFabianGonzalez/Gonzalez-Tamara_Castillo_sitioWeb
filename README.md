# Tamy Castillo — sitio web de artista

Sitio estático de Tamara (Tamy) Castillo, cantante cristiana de Trelew, Chubut, Argentina. Se rediseñó con una estética editorial contemporánea conservando los archivos originales de fotografías y canciones.

## Qué contiene

- **Inicio:** portada fotográfica, repertorio, video musical original, biografía resumida y acceso a la galería.
- **Biografía:** orígenes en Trelew, participación en Cita con la Vida y producción musical de 2021.
- **Canciones:** las cuatro letras publicadas originalmente: A quién iré, Tu mirada, La indiferencia y Podría esperar.
- **Galería:** 25 fotografías de la página original, con ampliación en ventana modal y navegación por teclado.
- **Eventos:** presentaciones de 2022 claramente identificadas como archivo histórico.
- **Invitaciones y clases:** formularios accesibles que preparan textos copiables, **sin enviar ni almacenar datos**.

## Diseño y tecnología

HTML5 + CSS + JavaScript sin frameworks ni procesos de compilación. Se conservaron `Img/`, los antiguos `SCSS/` y `css/style.css` como referencia. El diseño actualizado está en `css/modern.css` y los controles en `js/site.js`. El proyecto usa Google Fonts y un video de YouTube externo.

Diseño adaptable a dispositivos móviles, navegación accesible desde teclado, saltos al contenido, estados de foco, imágenes diferidas y soporte para preferencia de movimiento reducido.

## Desarrollo y verificación

Requiere Node.js 22+ solo para ejecutar las pruebas (no para servir la web):

```bash
npm test
npm run check:js
```

`scripts/validate-site.mjs` revisa las diez páginas HTML, rutas relativas, recursos locales, atributos alternativos de fotografías, enlaces con fragmento y estructura básica. El flujo de GitHub Actions `.github/workflows/site-check.yml` automatiza estas verificaciones en cada push y pull request.

Para verla localmente, serví el directorio raíz con un servidor estático (por ejemplo `python -m http.server 8000`) y abrí `http://localhost:8000`. GitHub Pages puede publicarla desde `main`, carpeta `/(root)`, una vez aprobados los cambios. No se requiere backend para el contenido estático.

## Aspectos que faltan confirmar antes de publicarla como sitio definitivo

1. **Formularios:** hoy preparan un mensaje para copiar, pero no se envía a nadie. Para recibir solicitudes reales se debe autorizar un correo o proveedor, configurar validación antispam y definir tratamiento de datos.
2. **Enlaces a redes:** no se incorporaron perfiles de redes sociales no verificados.
3. **Agenda:** no se inventaron próximas presentaciones. Es necesario confirmar fechas antes de agregarlas.
4. **Contenido:** comprobar actualidad de la información sobre clases, biografía, música y permisos de publicación.
5. **QA visual:** revisar manualmente escritorio, celular, video y galería en navegadores reales. El control automático de archivos no reemplaza esta prueba.

Los cambios de diseño están en una rama independiente y se proponen para revisión; no se han aplicado a `main`.
