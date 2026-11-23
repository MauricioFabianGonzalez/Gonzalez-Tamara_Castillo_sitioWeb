# Sitio web de Tamy Castillo

Sitio estático de Tamara Castillo, artista de música cristiana de Trelew, Chubut. Contiene portada, biografía, canciones, galería, eventos, invitaciones y consultas por clases.

## Cómo ver y publicar el sitio
Abrí `index.html` en un navegador o servilo con cualquier servidor de archivos estáticos. Para GitHub Pages, tras aprobar la rama, entrá a **Settings → Pages**, elegí **Deploy from a branch**, seleccioná `main` y `/(root)`. Todas las páginas principales usan rutas relativas para funcionar en un subdirectorio de Pages.

## Cambios propuestos
- Ajustes de diseño adaptable para dispositivos móviles, navegación con teclado y contenidos multimedia.
- Corrección de rutas internas de páginas e imágenes.
- Formularios HTML válidos para consultas de clases e invitaciones. **No envían ni almacenan datos:** preparan texto para copiar y enviar manualmente.
- Corrección del marcado de una celda de eventos y señalización de las fechas de 2022 como historial.
- Año de copyright dinámico y mejoras de metadatos y accesibilidad.

## Pendientes antes de presentarlo como sitio oficial
- Definir y configurar, con autorización, un correo de destino o proveedor seguro de formularios, prevención de spam y política de privacidad.
- Confirmar perfiles oficiales en redes sociales. Los íconos originales sin URL verificada permanecen sin destino; no deben confundirse con enlaces funcionales.
- Confirmar próximas presentaciones, lanzamientos, disponibilidad de clases y fotografías autorizadas.
- Probar el sitio en navegadores y celulares reales y verificar los recursos externos.

### Archivos
`index.html` es la portada; `Page/` reúne las páginas internas; `Img/` contiene fotos originales; `css/style.css` se usa en producción; `js/site.js` controla el año, la navegación y los formularios. `SCSS/` guarda los archivos originales de estilos; los ajustes nuevos se agregaron a CSS directamente, por lo que deben portarse a SCSS si se vuelve a compilar.
