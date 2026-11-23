import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const pages = [
  "index.html",
  "Page/Biografia.html", "Page/Canciones.html",
  "Page/Cancion1.html", "Page/Cancion2.html", "Page/Cancion3.html",
  "Page/Galeria.html", "Page/Eventos.html",
  "Page/Invitaciones.html", "Page/Contactos.html",
];
const errors = [];

for (const page of pages) {
  const full = path.join(root, page);
  assert.ok(fs.existsSync(full), "Falta la página " + page);
  const html = fs.readFileSync(full, "utf8");
  if (!html.includes('<html lang="es-AR">')) errors.push(page + ": falta lang es-AR");
  if (!html.includes('id="contenido"')) errors.push(page + ": falta destino del enlace de salto");
  if (!html.includes("css/modern.css")) errors.push(page + ": falta hoja de estilo");
  if ((html.match(/<main\b/g) || []).length !== 1) errors.push(page + ": debe existir exactamente un <main>");
  if ((html.match(/<\/main>/g) || []).length !== 1) errors.push(page + ": cierre de main inválido");
  if ((html.match(/<form\b/g) || []).length > 1) errors.push(page + ": formularios anidados o múltiples inesperados");

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt="[^"]*"/.test(match[0])) errors.push(page + ": imagen sin atributo alt");
  }
  for (const [, url] of html.matchAll(/\b(?:src|href|data-gallery-image)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/i.test(url)) continue;
    if (url.startsWith("/")) {
      errors.push(page + ": ruta absoluta no apta para GitHub Pages: " + url);
      continue;
    }
    const [relative, fragment] = url.split("#");
    let target = full;
    if (relative) {
      target = path.resolve(root, path.dirname(page), relative.split("?")[0]);
      if (!target.startsWith(root + path.sep)) {
        errors.push(page + ": ruta fuera del repositorio " + url);
        continue;
      }
      if (!fs.existsSync(target)) errors.push(page + ": recurso inexistente " + url);
    }
    if (fragment && fs.existsSync(target) && path.extname(target).toLowerCase() === ".html") {
      const content = fs.readFileSync(target, "utf8");
      if (!content.includes('id="' + decodeURIComponent(fragment) + '"')) {
        errors.push(page + ": enlace a sección sin destino " + url);
      }
    }
  }
}

if (errors.length) {
  console.error("Errores encontrados:\n" + errors.map(x => " - " + x).join("\n"));
  process.exitCode = 1;
} else {
  console.log("✓ " + pages.length + " páginas HTML validadas y rutas locales existentes.");
}
