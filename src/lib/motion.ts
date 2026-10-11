"use client";

import { useSyncExternalStore } from "react";

/**
 * Autoplay dos carrosséis só em telas largas e sem movimento reduzido.
 * No celular o card do case passa de uma tela de altura: trocar sozinho
 * no meio da leitura tira o controle de quem está lendo.
 */
const AUTOPLAY_QUERY = "(min-width: 861px) and (prefers-reduced-motion: no-preference)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(AUTOPLAY_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useAutoplayAllowed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(AUTOPLAY_QUERY).matches,
    () => false,
  );
}
