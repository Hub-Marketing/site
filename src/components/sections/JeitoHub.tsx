"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ChannelScenes } from "@/components/channels/ChannelScenes";
import { marqueeWords } from "@/lib/content";
import { Marquee, MarqueeWord } from "./Marquee";
import { displayTitle, eyebrow, lead } from "./styles";

/**
 * Jeito HUB em duas telas cheias, trocadas pela rolagem.
 * 1. A tese ("Instagram não fecha venda") fica presa sob o header (sticky).
 * 2. A tela dos canais sobe por cima dela como uma folha. Enquanto sobe, a tese
 *    recua mais devagar que a rolagem e sai de foco (o inverso da entrada da página),
 *    e os cards chegam em velocidades diferentes até assentarem juntos.
 * Com movimento reduzido, a troca é só a rolagem, sem parallax.
 */
/** A folha encosta no header um pouco antes do fim do progresso (que conta até o topo da janela). */
const DOCK = 0.88;

export function JeitoHub() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const still = useReducedMotion() ?? false;

  // 0 = a folha encosta na base da tela; 1 = a folha encosta no header.
  const { scrollYProgress: enter } = useScroll({ target: sheetRef, offset: ["start end", "start start"] });
  const thesisY = useTransform(enter, [0, DOCK], still ? ["0vh", "0vh"] : ["0vh", "-24vh"]);
  const thesisOpacity = useTransform(enter, [0, DOCK], still ? [1, 1] : [1, 0.12]);
  const thesisScale = useTransform(enter, [0, DOCK], still ? [1, 1] : [1, 0.96]);
  const thesisBlur = useTransform(enter, [0.2, DOCK], still ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(8px)"]);
  const subtitleY = useTransform(enter, [0, DOCK], still ? [0, 0] : [72, 0]);
  // Progresso já normalizado até o encaixe, para o parallax dos cards.
  const settle = useTransform(enter, [0, DOCK], [0, 1]);

  // Tela 2 cabe inteira no desktop: os mockups encolhem (zoom) quando a altura da janela não comporta 440px.
  useEffect(() => {
    const screen = screenRef.current;
    const inner = innerRef.current;
    if (!screen || !inner) return;
    const FRAME = 442;
    let zoom = 1;
    const fit = () => {
      if (window.innerWidth < 1024) zoom = 1;
      else {
        const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 69;
        const cs = getComputedStyle(screen);
        const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const other = inner.offsetHeight - FRAME * zoom;
        zoom = Math.min(1, Math.max(0.62, (window.innerHeight - headerH - pad - other) / FRAME));
      }
      screen.style.setProperty("--mock-zoom", zoom.toFixed(3));
    };
    // Recalcula quando o conteúdo muda de altura (fontes carregando, quebra dos textos)
    // e quando a janela muda; o resultado é estável, então o próprio zoom não realimenta.
    const ro = new ResizeObserver(fit);
    ro.observe(inner);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <section id="jeito-hub" aria-labelledby="s2-title" className="relative bg-surface scroll-mt-[var(--header-h,69px)]">
      {/* Tela 1: a tese, presa sob o header enquanto a tela dos canais sobe. */}
      <div className="sticky top-[var(--header-h,69px)] z-0 min-h-[calc(100svh-var(--header-h,69px))] flex flex-col justify-center overflow-hidden">
        <motion.div
          style={{ y: thesisY, opacity: thesisOpacity, scale: thesisScale, filter: thesisBlur }}
          className="w-full max-w-[1264px] mx-auto py-[clamp(48px,7vw,96px)] px-[clamp(16px,4vw,32px)] box-border flex flex-col origin-top will-change-transform"
        >
          <span data-reveal="" className={`${eyebrow} text-magenta`}>O jeito HUB de enxergar marketing</span>
          <h2
            id="s2-title"
            data-reveal=""
            className={`${displayTitle} mt-[16px] text-[clamp(40px,6.4vw,88px)] leading-[1.04] tracking-[-0.022em] text-ink text-balance max-w-[1000px]`}
          >
            <span className="block">Instagram não fecha venda.</span>{" "}
            <span data-beat="" className="block">E tudo bem.</span>
          </h2>
          <p data-reveal="" className={`m-0 mt-[clamp(32px,5vw,64px)] ${lead} text-ink-2 max-w-[560px] min-[860px]:self-end`}>
            Nenhum cliente vai te dizer “te achei pelo Instagram”. Ele vai dizer que veio por indicação, e veio mesmo. Mas antes de te chamar, ele abriu seu perfil, pesquisou seu nome no Google e decidiu em segundos se confiava em você.
          </p>
        </motion.div>
      </div>

      {/* Tela 2: a folha dos canais, que cobre a tese ao encostar no header. */}
      <div
        ref={sheetRef}
        className="relative z-10 bg-surface rounded-t-[32px] [box-shadow:0_-24px_60px_rgba(32,35,63,0.10)]"
      >
        <div
          ref={screenRef}
          className="min-h-[calc(100svh-var(--header-h,69px))] box-border flex flex-col justify-center py-[clamp(32px,4vw,48px)]"
        >
          <div ref={innerRef} className="w-full max-w-[1264px] mx-auto px-[clamp(16px,4vw,32px)] box-border flex flex-col gap-[clamp(28px,3.5vw,44px)]">
            {/*
              Dois tempos: a negação recua (500, text-muted) e a afirmação assume (600, ink), cada uma na sua linha.
              A afirmação mede ~30× o corpo, então 2.8vw (teto de 36px) a mantém numa linha só a partir de 1024px.
            */}
            <motion.p
              style={{ y: subtitleY }}
              className="m-0 font-display italic text-[clamp(26px,2.8vw,36px)] leading-[1.18] tracking-[-0.012em] text-balance"
            >
              <span className="block font-medium text-muted">Por isso a gente não vende canais.</span>{" "}
              <span className="block font-semibold text-ink">A gente monta um sistema em que cada canal tem uma função clara.</span>
            </motion.p>
            <ChannelScenes enter={settle} still={still} />
          </div>
        </div>

        <div className="max-w-[1264px] mx-auto px-[clamp(16px,4vw,32px)] pt-[clamp(24px,4vw,48px)] pb-[clamp(64px,9vw,112px)] box-border">
          <p data-reveal="" className="my-0 mx-auto max-w-[900px] text-center font-display italic font-medium text-[clamp(28px,3.8vw,46px)] leading-[1.1] tracking-[-0.02em] text-ink text-balance">
            Um canal sozinho não segura uma venda. <span data-beat="" className="text-magenta">Os três juntos, sim.</span>
          </p>
        </div>

        {/* Os canais em faixa, no gradiente da marca, logo depois da frase que os junta. */}
        <div aria-hidden="true" className="w-full overflow-hidden py-[20px] bg-(image:--grad-brand)">
          <Marquee items={marqueeWords.map((w) => <MarqueeWord key={w} inkClass="text-white">{w}</MarqueeWord>)} />
        </div>
      </div>
    </section>
  );
}
