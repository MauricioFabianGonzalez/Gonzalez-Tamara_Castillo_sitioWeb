/* Interacciones del sitio estático. No se envían datos a ningún servidor. */
(() => {
  "use strict";
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-main-nav]");
  if (toggle && nav) {
    const close = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(opened));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
    });
  }
  const current = location.pathname.replace(/\/$/, "/index.html");
  document.querySelectorAll("[data-main-nav] a").forEach(link => {
    const target = new URL(link.getAttribute("href"), location.href).pathname;
    if (target === current) link.setAttribute("aria-current", "page");
  });
  document.querySelectorAll("[data-current-year]").forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });
  const modal = document.querySelector("[data-lightbox]");
  if (modal && typeof modal.showModal === "function") {
    const photo = modal.querySelector("[data-lightbox-image]");
    const counter = modal.querySelector("[data-lightbox-caption]");
    const tiles = [...document.querySelectorAll("[data-gallery-image]")];
    let index = 0;
    const show = i => {
      index = (i + tiles.length) % tiles.length;
      const tile = tiles[index];
      photo.src = tile.dataset.galleryImage;
      photo.alt = tile.dataset.galleryAlt || "Fotografía de Tamy Castillo";
      counter.textContent = `Fotografía ${index + 1} de ${tiles.length}`;
    };
    tiles.forEach((tile, i) => tile.addEventListener("click", () => {
      show(i);
      modal.showModal();
    }));
    modal.querySelector("[data-lightbox-close]").addEventListener("click", () => modal.close());
    modal.querySelector("[data-lightbox-prev]").addEventListener("click", () => show(index - 1));
    modal.querySelector("[data-lightbox-next]").addEventListener("click", () => show(index + 1));
    modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
    modal.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }
  document.querySelectorAll("[data-inquiry-form]").forEach(form => {
    const result = form.querySelector("[data-form-result]");
    const message = form.querySelector("[data-result-message]");
    const output = form.querySelector("[data-result-text]");
    const copy = form.querySelector("[data-copy-result]");
    if (!result || !message || !output || !copy) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const kind = form.dataset.inquiryForm;
      const fields = kind === "clases"
        ? [["nombre", "Nombre"], ["apellido", "Apellido"], ["telefono", "Teléfono"], ["email", "Correo"], ["ubicacion", "Localidad"], ["mensaje", "Consulta"]]
        : [["institucion", "Nombre o institución"], ["modalidad", "Modalidad"], ["telefono", "Teléfono"], ["lugar", "Ciudad / lugar"], ["fecha", "Fecha propuesta"], ["email", "Correo"], ["comentario", "Detalles"]];
      const title = kind === "clases" ? "Consulta por clases de canto" : "Invitación a un evento";
      output.value = [title + " — Tamy Castillo", "", ...fields.map(([key, label]) => label + ": " + (data.get(key) || "No indicado"))].join("\n");
      result.classList.add("is-visible");
      message.textContent = "Tu mensaje está preparado. No fue enviado automáticamente: copialo y compartilo por tu canal de contacto habitual.";
      output.focus();
    });
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(output.value);
        message.textContent = "Mensaje copiado. Podés pegarlo en tu aplicación de mensajería o correo.";
      } catch {
        output.focus();
        output.select();
        message.textContent = "Seleccionamos el texto para que puedas copiarlo manualmente.";
      }
    });
  });
})();
