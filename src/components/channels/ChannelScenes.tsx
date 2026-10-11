"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { body, cardTitle } from "@/components/sections/styles";
import { pillars } from "@/lib/content";
import { GOOGLE_DUR, GoogleScene } from "./GoogleScene";
import { INSTAGRAM_DUR, InstagramScene } from "./InstagramScene";
import { LINKEDIN_DUR, LinkedInScene } from "./LinkedInScene";

/**
 * Os três canais em revezamento, na ordem da jornada de quem compra:
 * pesquisa no Google, encontra no LinkedIn, confirma no Instagram.
 * Só uma cena roda por vez, e só entre as que estão na tela; com uma só visível
 * (celular), ela repete sozinha. Parado (SSR, movimento reduzido, pausa), cada cena
 * mostra o próprio estado final.
 */
const SCENES: Record<string, { Scene: ComponentType<{ t: number; run: number }>; dur: number }> = {
  google: { Scene: GoogleScene, dur: GOOGLE_DUR },
  linkedin: { Scene: LinkedInScene, dur: LINKEDIN_DUR },
  instagram: { Scene: InstagramScene, dur: INSTAGRAM_DUR },
};
const N = pillars.length;

type Stage = { active: number; runs: number[]; playing: boolean };

const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

/**
 * `enter`: progresso da folha dos canais subindo (0 → 1). Os cards começam mais baixos,
 * cada um um pouco mais que o anterior, e sobem mais rápido que a rolagem até assentarem juntos.
 */
export function ChannelScenes({ enter, still }: { enter: MotionValue<number>; still: boolean }) {
  const lag = (i: number) => (still ? 0 : 90 + i * 70);
  const y0 = useTransform(enter, [0, 1], [lag(0), 0]);
  const y1 = useTransform(enter, [0, 1], [lag(1), 0]);
  const y2 = useTransform(enter, [0, 1], [lag(2), 0]);
  const cardY = [y0, y1, y2];

  const [stage, setStage] = useState<Stage>({ active: 0, runs: pillars.map(() => 0), playing: false });
  const [t, setT] = useState(0);
  const [visible, setVisible] = useState<boolean[]>(pillars.map(() => false));
  // Pausa só com o mouse sobre a cena que está rodando: quem para nela quer ver.
  const [hovered, setHovered] = useState<number | null>(null);

  const stageRef = useRef(stage);
  const visibleRef = useRef(visible);
  const elapsed = useRef(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const commit = useCallback((s: Stage) => {
    stageRef.current = s;
    setStage(s);
  }, []);

  /** Próxima cena visível depois de `from`, em ciclo (inclui a própria, por último). */
  const pick = useCallback((from: number) => {
    for (let k = 1; k <= N; k++) {
      const i = (from + k) % N;
      if (visibleRef.current[i]) return i;
    }
    return null;
  }, []);

  const start = useCallback(
    (i: number) => {
      const s = stageRef.current;
      elapsed.current = 0;
      setT(0);
      commit({ active: i, runs: s.runs.map((r, j) => (j === i ? r + 1 : r)), playing: true });
    },
    [commit],
  );

  // Visibilidade de cada card: decide quem entra no revezamento.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const next = [...visibleRef.current];
        entries.forEach((en) => {
          const i = cardRefs.current.indexOf(en.target as HTMLElement);
          if (i >= 0) next[i] = en.isIntersecting;
        });
        visibleRef.current = next;
        setVisible(next);
        if (!window.matchMedia(MOTION_QUERY).matches) return;

        const s = stageRef.current;
        if (s.playing) {
          // A cena ativa saiu da tela: passa a vez para uma visível, se houver.
          if (!next[s.active]) {
            const n = pick(s.active);
            if (n !== null) start(n);
          }
        } else {
          const n = pick(s.runs.every((r) => r === 0) ? N - 1 : s.active);
          if (n !== null) start(n);
        }
      },
      { threshold: 0.55 },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [pick, start]);

  // Relógio da cena ativa: só anda com ela na tela e sem pausa.
  const ticking = stage.playing && visible[stage.active] && hovered !== stage.active;
  useEffect(() => {
    if (!ticking) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      elapsed.current += Math.min(now - last, 64);
      last = now;
      const s = stageRef.current;
      const dur = SCENES[pillars[s.active].brand].dur;
      if (elapsed.current < dur) {
        setT(elapsed.current);
      } else {
        const n = pick(s.active);
        if (n === null) {
          commit({ ...s, playing: false });
          return;
        }
        start(n);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ticking, stage.active, pick, start, commit]);

  return (
    <div className="grid grid-cols-1 min-[1024px]:grid-cols-3 gap-x-[20px] gap-y-[48px] min-[1024px]:gap-y-[24px] justify-items-center">
      {pillars.map((p, i) => {
        const { Scene, dur } = SCENES[p.brand];
        const isActive = stage.playing && stage.active === i;
        const sceneT = isActive ? t : dur;
        // "Google: quem já está procurando…": o canal em magenta, a função em ink.
        // Palavras de até 2 letras (a, em, te, se) vão presas à seguinte, para não sobrarem no fim da linha.
        const cut = p.title.indexOf(": ");
        const fn = p.title.slice(cut + 1).replace(/ (\S{1,2}) /g, " $1 ");
        return (
          <motion.article
            key={p.brand}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{ y: cardY[i] }}
            className="w-full max-w-[calc(420px*var(--mock-zoom,1))] flex flex-col gap-[24px] min-[1024px]:grid min-[1024px]:grid-rows-subgrid min-[1024px]:row-span-4 min-[1024px]:gap-y-[10px]"
          >
            {/*
              Texto acima do mockup; no desktop o subgrid tem uma linha para o título e outra para a descrição,
              então as três descrições e os três mockups alinham mesmo com títulos de alturas diferentes.
              O card tem a largura do mockup (420px × zoom), então texto, mockup e indicador dividem as mesmas bordas.
            */}
            <div className="flex flex-col gap-[10px] min-[1024px]:contents">
              <h3 className={`m-0 ${cardTitle} text-ink text-balance`}>
                {cut > 0 ? (
                  <>
                    <span className="text-magenta">{p.title.slice(0, cut + 1)}</span>
                    {fn}
                  </>
                ) : (
                  p.title
                )}
              </h3>
              <p className={`channel-desc m-0 ${body} text-body`}>{p.text}</p>
            </div>
            <div
              aria-hidden="true"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
              onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
              className={`relative h-[440px] min-[1024px]:mt-[14px] [zoom:var(--mock-zoom,1)] rounded-[16px] overflow-hidden bg-white border border-line [&_*]:box-border [transition:transform_450ms_var(--ease-hub),box-shadow_450ms_var(--ease-hub)] ${
                isActive
                  ? "[transform:translateY(-3px)] [box-shadow:0_20px_44px_rgba(32,35,63,0.14)]"
                  : "[box-shadow:0_16px_40px_rgba(32,35,63,0.08)]"
              }`}
            >
              <Scene t={sceneT} run={stage.runs[i]} />
            </div>
            {/* Trilho do revezamento: a vez de cada canal, na mesma linguagem da barra dos cases. */}
            <span aria-hidden="true" className="block h-[2px] min-[1024px]:mt-[14px] rounded-full bg-track overflow-hidden">
              <span
                className="block h-full bg-magenta origin-left"
                style={{ transform: `scaleX(${isActive ? Math.min(t / dur, 1) : 0})` }}
              />
            </span>
          </motion.article>
        );
      })}
    </div>
  );
}
