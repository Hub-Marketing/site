"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { services } from "@/lib/content";
import { body, cardLift, cardTitle } from "./styles";

/**
 * Os quatro serviços em volta de um nó só: "uma pessoa cuidando do todo".
 * Os cards seguem em sentido horário (redes → site → LinkedIn → Google) e alternam
 * branco e gradiente da marca: no 2×2 do desktop o gradiente fica na diagonal, na
 * pilha do celular ele intercala.
 * No desktop (≥900px) o nó da HUB fica no cruzamento, e a rolagem traz os cards de
 * fora para dentro, um por vez. Cada card entra em foco ao encaixar e o anel do nó
 * ganha o quarto daquele card; com os quatro, o anel fecha. O gradiente dos cards
 * escuros corre devagar com a rolagem.
 * No celular, cada card entra em foco ao cruzar a tela, conduzido pela rolagem.
 * O estado de repouso (SSR, sem JS, movimento reduzido) é o encaixe final.
 */

/** Sentido horário a partir do canto superior esquerdo: TL, TR, BR, BL. */
const CLOCKWISE = [0, 1, 3, 2];
const items = CLOCKWISE.map((i) => services[i]);
/** Direção de fuga de cada posição, na mesma ordem. */
const OUT: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
/** No 2×2, as duas últimas posições trocam de coluna para fechar o giro (BR, depois BL). */
const PLACE = ["", "", "min-[900px]:col-start-2 min-[900px]:row-start-2", "min-[900px]:col-start-1 min-[900px]:row-start-2"];

/** Anel do nó: centro (64,64), raio 55, um quarto por card com 5° de folga de cada lado. */
const R = 55;
const pt = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(64 + R * Math.cos(a)).toFixed(2)} ${(64 + R * Math.sin(a)).toFixed(2)}`;
};
/** Quartos em sentido horário a partir das 9h (ângulos SVG: 0° à direita, crescendo para baixo). */
const ARCS = [180, 270, 0, 90].map((s) => `M ${pt(s + 5)} A ${R} ${R} 0 0 1 ${pt(s + 85)}`);

export function ServicosBoard() {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        wide: "(min-width: 900px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { wide, motion } = ctx.conditions as { wide: boolean; motion: boolean };
        if (!motion) return;
        const q = gsap.utils.selector(board);
        const cells = q("[data-svc-cell]");
        const arcs = q("[data-svc-arc]");
        const node = q("[data-svc-node]");
        const grads = q("[data-svc-grad]");
        const blurred = { autoAlpha: 0.12, filter: "blur(8px)" };
        const sharp = { autoAlpha: 1, filter: "blur(0px)" };

        // O gradiente dos cards escuros corre da esquerda para a direita enquanto a seção passa.
        gsap.fromTo(
          grads,
          { backgroundPosition: "0% 50%" },
          { backgroundPosition: "100% 50%", ease: "none", scrollTrigger: { trigger: board, start: "top bottom", end: "bottom top", scrub: true } },
        );

        if (wide) {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: board, start: "top 88%", end: "center 62%", scrub: 0.8 },
          });
          tl.fromTo(node, { scale: 0.55, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3 }, 0);
          cells.forEach((cell, k) => {
            const at = 0.12 + k * 0.2;
            tl.fromTo(cell, { x: OUT[k][0] * 64, y: OUT[k][1] * 48, ...blurred }, { x: 0, y: 0, ...sharp, duration: 0.42 }, at)
              .fromTo(arcs[k], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2, ease: "none" }, at + 0.24);
          });
          return;
        }

        cells.forEach((cell) => {
          gsap.fromTo(
            cell,
            { y: 40, ...blurred },
            { y: 0, ...sharp, ease: "power2.out", scrollTrigger: { trigger: cell, start: "top 96%", end: "top 58%", scrub: 0.6 } },
          );
        });
      },
    );

    // As seções acima mudam de altura depois da hidratação (fontes, zoom dos mockups
    // do Jeito HUB); sem recalcular, os gatilhos ficariam deslocados.
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <div ref={boardRef} className="relative grid grid-cols-1 gap-[20px] min-[900px]:grid-cols-2 min-[900px]:auto-rows-fr">
      {items.map((s, k) => {
        const dark = k % 2 === 0;
        return (
          <div key={s.title} data-svc-cell="" className={`min-w-0 ${PLACE[k]}`}>
            <article
              data-surface={dark ? "dark" : undefined}
              data-svc-grad={dark ? "" : undefined}
              className={`h-full box-border rounded-[16px] p-[clamp(28px,3vw,40px)] min-[900px]:p-[44px] flex flex-col ${cardLift} ${
                dark
                  ? "bg-(image:--grad-brand) bg-size-[180%_180%] bg-[position:0%_50%] bg-origin-border bg-no-repeat border border-transparent [box-shadow:0_16px_40px_rgba(32,35,63,0.18)]"
                  : "bg-white border border-line [box-shadow:0_4px_16px_rgba(32,35,63,0.06)]"
              }`}
            >
              <h3 className={`m-0 ${cardTitle} ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
              <p
                className={`m-0 mt-[6px] font-display italic font-medium text-[20px] leading-[1.3] tracking-[-0.01em] ${
                  dark ? "text-gold-bright" : "text-magenta"
                }`}
              >
                {s.role}
              </p>
              <p className={`m-0 mt-[16px] ${body} max-w-[620px] ${dark ? "text-white/[0.86]" : "text-body"}`}>{s.text}</p>
            </article>
          </div>
        );
      })}

      {/* O nó: a HUB no cruzamento dos quatro serviços. O anel fecha um quarto por card. */}
      <div aria-hidden="true" className="hidden min-[900px]:flex absolute inset-0 items-center justify-center pointer-events-none">
        <div
          data-svc-node=""
          className="relative w-[128px] h-[128px] box-border rounded-full bg-white border border-line flex items-center justify-center"
        >
          <svg viewBox="0 0 128 128" className="absolute inset-[-1px] w-[128px] h-[128px]" fill="none">
            <circle cx="64" cy="64" r={R} stroke="#E2E0E8" strokeWidth="2" />
            {ARCS.map((d) => (
              <path
                key={d}
                data-svc-arc=""
                d={d}
                pathLength={1}
                stroke="#CC1074"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1"
                strokeDashoffset="0"
              />
            ))}
          </svg>
          <span className="w-[94px] h-[94px] rounded-full bg-navy flex items-center justify-center [box-shadow:0_12px_28px_rgba(32,35,63,0.22)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uploads/logo-branca.svg" alt="" width={56} height={37} className="block w-[56px] h-auto" />
          </span>
        </div>
      </div>
    </div>
  );
}
