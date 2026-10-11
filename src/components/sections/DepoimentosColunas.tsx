"use client";

import { useState } from "react";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";

/*
 * Divide as avaliações em duas colunas sem repetir nenhuma: cada uma vai para a coluna
 * mais curta até ali (o texto pesa mais que o card vazio), e dentro da coluna volta à
 * ordem original. Assim as duas sobem com alturas parecidas.
 */
const CARD_WEIGHT = 120;
function splitInTwo(list: Testimonial[]) {
  const cols: number[][] = [[], []];
  const height = [0, 0];
  [...list.keys()]
    .sort((a, b) => list[b].text.length - list[a].text.length)
    .forEach((i) => {
      const c = height[0] <= height[1] ? 0 : 1;
      cols[c].push(i);
      height[c] += list[i].text.length + CARD_WEIGHT;
    });
  return cols.map((idx) => idx.sort((a, b) => a - b).map((i) => list[i]));
}

/**
 * Janela das colunas de depoimentos. No celular, uma coluna com todas; a partir de 768px,
 * duas colunas com metade cada, sem citação repetida na tela. A rolagem para com hover,
 * foco ou toque na janela (WCAG 2.2.2: o que se move sozinho precisa de pausa).
 */
export function DepoimentosColunas({ testimonials }: { testimonials: Testimonial[] }) {
  const [paused, setPaused] = useState(false);
  const [left, right] = splitInTwo(testimonials);

  return (
    <div data-reveal="" data-paused={paused || undefined} className="hub-columns mt-10">
      {/*
       * A janela recebe o foco do teclado (e pausa com ele); o degradê fica num filho,
       * porque a máscara também apagaria o anel de foco. Um toque num card pausa ou retoma.
       */}
      <div
        role="region"
        aria-label="Avaliações em rolagem"
        tabIndex={0}
        onClick={(e) => {
          // Como o hover, o toque só conta em cima de um card.
          if ((e.target as Element).closest("li")) setPaused((p) => !p);
        }}
        className="hub-columns-window w-full rounded-[16px]"
      >
        <div className="flex justify-center gap-6 [--testimonial-w:360px] max-md:[--testimonial-w:320px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={testimonials} className="md:hidden" duration={55} />
          <TestimonialsColumn testimonials={left} className="hidden md:block" duration={34} />
          <TestimonialsColumn testimonials={right} className="hidden md:block" duration={39} />
        </div>
      </div>
    </div>
  );
}
