/* sl-acordeon: una fila abierta a la vez por grupo (respaldo para navegadores sin details[name]). */
document.addEventListener('toggle', (e) => {
  const d = e.target;
  if (!(d instanceof HTMLDetailsElement) || !d.classList.contains('sl-acordeon') || !d.open || !d.name) return;
  document.querySelectorAll(`details.sl-acordeon[name="${d.name}"][open]`).forEach((o) => { if (o !== d) o.open = false; });
}, true);
