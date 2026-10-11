"use client";

import { MotionConfig, motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { BrandLogo } from "@/components/ui/brand-logos";
import { Icon } from "@/components/ui/icons";

/**
 * A HUB é, literalmente, o hub: o nó da marca no centro e os quatro canais em volta.
 * Na abertura os canais chegam de fora, desfocados, e encaixam no lugar (sentido
 * horário: Google → Instagram → LinkedIn → Site). Cada um puxa a própria linha até o
 * nó e fecha um quarto do anel, como em Serviços. Depois entram os sinais do que o
 * sistema gera (a busca, quem decide vendo o perfil, a mensagem no WhatsApp), e
 * pulsos magenta seguem correndo dos canais até o nó.
 * As voltas (flutuação, pulsos, órbita) são CSS: param fora da tela e com
 * movimento reduzido. As entradas são motion: com movimento reduzido, só o fade.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
/** A órbita começa enquanto a primeira linha da manchete ainda sobe. */
const T0 = 0.55;
const STEP = 0.16;

type Channel = {
  key: string;
  x: number;
  y: number;
  /** Direção de chegada (de fora para dentro). */
  from: [number, number];
  float: string;
  logo: ReactNode;
};

const channels: Channel[] = [
  { key: "google", x: 24, y: 26, from: [-1, -1], float: "7.2s", logo: <BrandLogo name="google" className="w-[42%] h-[42%]" /> },
  {
    key: "instagram",
    x: 77,
    y: 22,
    from: [1, -1],
    float: "8.4s",
    logo: <BrandLogo name="instagram" gradientId="hub-ig-hero" className="w-[46%] h-[46%]" />,
  },
  { key: "linkedin", x: 79, y: 69, from: [1, 1], float: "6.8s", logo: <BrandLogo name="linkedin" className="w-[42%] h-[42%]" /> },
  { key: "site", x: 23, y: 72, from: [-1, 1], float: "7.8s", logo: <Icon name="monitor" className="w-[44%] h-[44%] text-ink" /> },
];

/** Anel do nó: centro (64,64), raio 55, um quarto por canal com 5° de folga (igual a ServicosBoard). */
const R = 55;
const pt = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(64 + R * Math.cos(a)).toFixed(2)} ${(64 + R * Math.sin(a)).toFixed(2)}`;
};
const ARCS = [180, 270, 0, 90].map((s) => `M ${pt(s + 5)} A ${R} ${R} 0 0 1 ${pt(s + 85)}`);

const landAt = (k: number) => T0 + 0.25 + k * STEP;
const lineAt = (k: number) => landAt(k) + 0.55;
const CHIPS_AT = lineAt(3) + 0.5;
const QUERY = "sua empresa";

const tile =
  "flex items-center justify-center w-[clamp(54px,15.5cqw,80px)] aspect-square box-border rounded-[16px] bg-white border border-line [box-shadow:0_16px_40px_rgba(32,35,63,0.10)]";
const chip = "bg-white border border-line [box-shadow:0_16px_40px_rgba(32,35,63,0.10)] whitespace-nowrap";

function Chip({ at, className, float, children }: { at: number; className: string; float: string; children: ReactNode }) {
  return (
    <div className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: EASE, delay: at }}
      >
        <div className="animate-[hub-float_9s_ease-in-out_infinite]" style={{ animationDuration: float }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function HeroOrbit() {
  const ref = useRef<HTMLDivElement>(null);

  // As voltas param quando o hero sai da tela.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) delete el.dataset.paused;
      else el.dataset.paused = "";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        data-orbit=""
        aria-hidden="true"
        className="@container relative w-full max-w-[min(100%,420px)] lg:max-w-[480px] justify-self-center lg:justify-self-end mb-[56px] lg:mb-0 aspect-square select-none pointer-events-none font-sans"
      >
        {/* Órbita, linhas e pulsos (unidades do viewBox = % da caixa). */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" fill="none">
          <motion.circle
            cx="50"
            cy="50"
            r="37"
            stroke="#D5D3DD"
            strokeWidth="0.3"
            strokeDasharray="0.5 1.5"
            strokeLinecap="round"
            className="hub-orbit-spin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: T0 }}
          />
          {channels.map((c, k) => {
            const d = `M ${c.x} ${c.y} L 50 50`;
            return (
              <g key={c.key}>
                <motion.path
                  d={d}
                  stroke="#D5D3DD"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: lineAt(k) - 0.3 }}
                />
                <path
                  d={d}
                  pathLength={1}
                  stroke="#CC1074"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="0.08 2"
                  className="hub-signal"
                  style={{ animationDelay: `${(CHIPS_AT + 0.6 + k * 0.9).toFixed(2)}s` }}
                />
              </g>
            );
          })}
        </svg>

        {/* O nó: a HUB no centro do sistema. */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(92px,27cqw,140px)] aspect-square">
          <motion.div
            className="relative w-full h-full box-border rounded-full bg-white border border-line flex items-center justify-center [box-shadow:0_16px_40px_rgba(32,35,63,0.10)]"
            initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE, delay: T0 }}
          >
            <svg viewBox="0 0 128 128" className="absolute inset-[-1px] w-[calc(100%+2px)] h-[calc(100%+2px)]" fill="none">
              <circle cx="64" cy="64" r={R} stroke="#E2E0E8" strokeWidth="2" />
              {ARCS.map((d, k) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="#CC1074"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: lineAt(k) }}
                />
              ))}
            </svg>
            <span className="w-[73%] aspect-square rounded-full bg-navy flex items-center justify-center [box-shadow:0_12px_28px_rgba(32,35,63,0.22)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/uploads/logo-branca.svg" alt="" width={56} height={37} className="block w-[58%] h-auto" />
            </span>
          </motion.div>
        </div>

        {/* Os canais: chegam de fora, desfocados, e encaixam na órbita. */}
        {channels.map((c, k) => (
          <div key={c.key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
            <motion.div
              initial={{ opacity: 0, x: c.from[0] * 72, y: c.from[1] * 56, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: EASE, delay: landAt(k) }}
            >
              <div
                className="animate-[hub-float_7s_ease-in-out_infinite]"
                style={{ animationDuration: c.float, animationDelay: `-${k * 1.7}s` }}
              >
                <div className={tile}>{c.logo}</div>
              </div>
            </motion.div>
          </div>
        ))}

        {/* Sinais do sistema funcionando. */}
        <Chip at={CHIPS_AT} float="9s" className="left-[2%] top-[0%]">
          <div className={`${chip} flex items-center gap-[10px] rounded-full pl-[14px] pr-[18px] py-[10px] text-[clamp(12px,3.2cqw,14px)] text-ink`}>
            <Icon name="search" size={16} strokeWidth={2.2} className="flex-none text-muted" />
            <span className="flex items-center">
              {QUERY.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0, delay: CHIPS_AT + 0.5 + i * 0.07 }}
                  className="whitespace-pre"
                >
                  {ch}
                </motion.span>
              ))}
              <span className="ml-[2px] inline-block w-[1.5px] h-[1.15em] bg-magenta animate-[hub-caret_1.05s_steps(1)_infinite]" />
            </span>
          </div>
        </Chip>

        <Chip at={CHIPS_AT + 0.35} float="10.5s" className="right-0 @[460px]:right-[-3%] top-[90%] -translate-y-1/2">
          <div className={`${chip} flex items-center gap-[10px] rounded-[12px] pl-[10px] pr-[16px] py-[9px]`}>
            <span className="relative flex-none w-[34px] h-[34px] rounded-full bg-[rgba(32,35,63,0.06)] flex items-center justify-center text-ink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4.5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <span className="absolute -right-[3px] -bottom-[3px] flex bg-white rounded-[4px] p-[1.5px]">
                <BrandLogo name="linkedin" size={13} />
              </span>
            </span>
            <span className="flex flex-col leading-[1.35]">
              <span className="text-[13px] font-semibold text-ink">Diretor de compras</span>
              <span className="text-[12px] text-muted">viu o perfil da sua empresa</span>
            </span>
          </div>
        </Chip>

        <Chip at={CHIPS_AT + 0.7} float="8.6s" className="left-0 @[460px]:left-[-6%] top-[110%] @[460px]:top-[101%] -translate-y-1/2">
          <div className={`${chip} flex items-center gap-[10px] rounded-[12px] pl-[10px] pr-[16px] py-[9px]`}>
            <span className="flex-none w-[34px] h-[34px] rounded-full bg-[#25D366] flex items-center justify-center">
              <Icon name="whatsapp" size={18} stroke="#fff" />
            </span>
            <span className="flex flex-col leading-[1.35]">
              <span className="text-[13px] font-semibold text-ink">Nova mensagem</span>
              <span className="text-[12px] text-muted whitespace-normal max-w-[188px]">Vi o Instagram de vocês. Podemos conversar?</span>
            </span>
          </div>
        </Chip>
      </div>
    </MotionConfig>
  );
}
