/** Altura atual do header fixo (mesma medida usada como offset no original). */
export function headerHeight(): number {
  const el = document.querySelector<HTMLElement>("[data-hub-header]");
  return el ? Math.round(el.getBoundingClientRect().height) : 0;
}

/** Centraliza o elemento na viewport. */
export function scrollToCenter(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  window.scrollTo({ top: r.top + window.scrollY - (window.innerHeight - r.height) / 2, behavior: "smooth" });
}
