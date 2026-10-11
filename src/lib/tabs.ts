import type { KeyboardEvent } from "react";

/**
 * Teclado de um tablist (padrão WAI-ARIA): setas trocam de aba, Home/End
 * vão às pontas. Seleciona a aba nova e leva o foco até ela.
 */
export function onTablistKey(e: KeyboardEvent<HTMLElement>, current: number, count: number, select: (i: number) => void) {
  const keys: Record<string, number> = {
    ArrowRight: current + 1,
    ArrowDown: current + 1,
    ArrowLeft: current - 1,
    ArrowUp: current - 1,
    Home: 0,
    End: count - 1,
  };
  if (!(e.key in keys)) return;
  e.preventDefault();
  const next = (keys[e.key] + count) % count;
  select(next);
  const tabs = e.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
  tabs?.[next]?.focus();
}
