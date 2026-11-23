(() => {
  const current = location.pathname.replace(/\/$/, "/index.html");
  document.querySelectorAll(".navbar a.nav-link").forEach(link => {
    const path = new URL(link.getAttribute("href"), location.href).pathname;
    if (path === current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll("[data-inquiry-form]").forEach(form => {
    const result = form.querySelector(".form-result");
    const message = form.querySelector("[data-result-message]");
    const output = form.querySelector("[data-result-text]");
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const labels = form.dataset.inquiryForm === "clases"
        ? [["nombre","Nombre"],["apellido","Apellido"],["telefono","Teléfono"],["email","Correo"],["ubicacion","Ubicación"],["mensaje","Consulta"]]
        : [["institucion","Nombre o institución"],["modalidad","Modalidad"],["telefono","Teléfono"],["lugar","Lugar"],["fecha","Fecha propuesta"],["email","Correo"],["comentario","Detalles"]];
      output.value = [(form.dataset.inquiryForm === "clases" ? "Consulta por clases de canto" : "Invitación musical") + " - Tamy Castillo", "", ...labels.map(([key,label]) => label + ": " + (data.get(key) || "No indicado"))].join("\n");
      message.textContent = "Mensaje preparado. No fue enviado: copialo y compartilo por tu medio de contacto habitual.";
      result.classList.add("is-visible");
      output.focus();
    });
    form.querySelector("[data-copy-result]").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(output.value); message.textContent = "Mensaje copiado. Ahora podés pegarlo donde quieras enviarlo."; }
      catch { output.focus(); output.select(); message.textContent = "Seleccionamos el mensaje para que puedas copiarlo manualmente."; }
    });
  });
})();