"use client";

import { useEffect } from "react";

/** Intervalo do stagger entre elementos que entram na tela no mesmo lote, e o teto. */
const STEP = 90;
const MAX_DELAY = 450;

/**
 * Entradas por rolagem (globals.css › Entradas). O script do <head> liga
 * html[data-motion] antes da primeira pintura; aqui, depois da hidratação,
 * cada [data-reveal] ganha data-revealed ao entrar na tela. Os que entram juntos
 * (uma fileira de cards, eyebrow + manchete) recebem atraso em ordem de leitura.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-motion")) return;
    root.setAttribute("data-motion-ready", "");

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((en) => en.isIntersecting)
          .sort(
            (a, b) =>
              Math.round(a.boundingClientRect.top) - Math.round(b.boundingClientRect.top) ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )
          .forEach((en, i) => {
            const el = en.target as HTMLElement;
            el.style.setProperty("--reveal-delay", Math.min(i * STEP, MAX_DELAY) + "ms");
            el.setAttribute("data-revealed", "");
            io.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
