import type { ReactNode } from "react";
import { BrandLogo } from "@/components/ui/brand-logos";
import { Glyph, Monogram } from "./glyph";

/**
 * Feed do LinkedIn (mobile): o feed rola até o post patrocinado da "Sua Empresa",
 * quem decide segura "Gostei", desliza pelo seletor de reações e solta em "Genial".
 * Tudo é função de `t` (ms desde o início da rodada); `run` troca o post a cada rodada.
 */
const POSTS = [
  {
    text: "Seu fornecedor atrasa a entrega e ninguém explica o porquê? Separamos o que avaliar antes de trocar.",
    art: "Como escolher um fornecedor técnico",
    ctaTitle: "Baixe o guia gratuito",
    cta: "Baixar",
    count: 86,
    comments: 12,
  },
  {
    text: "Bastidores de uma implantação: do diagnóstico à entrega, sem surpresa no meio do caminho.",
    art: "Do diagnóstico à entrega, sem surpresa",
    ctaTitle: "Conheça nosso processo",
    cta: "Saiba mais",
    count: 142,
    comments: 23,
  },
  {
    text: "Três perguntas que todo diretor deveria fazer antes de contratar um prestador de serviço.",
    art: "3 perguntas antes de contratar",
    ctaTitle: "Leia o artigo completo",
    cta: "Ler",
    count: 64,
    comments: 9,
  },
];

type Reaction = { label: string; color: string; ink: string; glyph: ReactNode };

/* Ordem e nomes do seletor do LinkedIn em português. */
const REACTIONS: Reaction[] = [
  {
    label: "Gostei",
    color: "#378FE9",
    ink: "#378FE9",
    glyph: <path d="M7 10v11M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9Z" />,
  },
  {
    label: "Parabéns",
    color: "#6DAE4F",
    ink: "#44712E",
    glyph: (
      <>
        <path d="M5.8 11.3 2 22l10.7-3.8" />
        <path d="M11 13c1.9 1.9 2.8 4.2 2 5-.8.8-3.1-.1-5-2-1.9-1.9-2.8-4.2-2-5 .8-.8 3.1.1 5 2Z" />
        <path d="m22 2-2.2.8a2.9 2.9 0 0 0-2 3.1c.1.9-.6 1.6-1.4 1.6h-.4c-.9 0-1.6.6-1.8 1.4L14 10" />
        <path d="M15 2h.01M22 8h.01M22 20h.01M4 3h.01" />
      </>
    ),
  },
  {
    label: "Apoio",
    color: "#A872E8",
    ink: "#715E86",
    glyph: (
      <>
        <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
        <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.9l-4.2 3.9" />
        <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.7 2.7 0 0 0 16 4a2.8 2.8 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
      </>
    ),
  },
  {
    label: "Amei",
    color: "#DF704D",
    ink: "#B24020",
    glyph: <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />,
  },
  {
    label: "Genial",
    color: "#F5BB5C",
    ink: "#915907",
    glyph: (
      <>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6M10 22h4" />
      </>
    ),
  },
  {
    label: "Engraçado",
    color: "#44BFD3",
    ink: "#1A707E",
    glyph: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M18 13a6 6 0 0 1-12 0Z" />
        <path d="M9 9h.01M15 9h.01" />
      </>
    ),
  },
];
const PICK = 4;

function Badge({ r, size, ring = false, className }: { r: Reaction; size: number; ring?: boolean; className?: string }) {
  return (
    <span
      className={`flex-none rounded-full flex items-center justify-center ${ring ? "[box-shadow:0_0_0_1.5px_#fff]" : ""} ${className ?? ""}`}
      style={{ width: size, height: size, background: r.color }}
    >
      <Glyph size={Math.round(size * 0.58)} color="#fff" sw={2.4}>
        {r.glyph}
      </Glyph>
    </span>
  );
}

export const LINKEDIN_DUR = 7600;
const SCROLL = 60;
const PRESS = 1650;
const PICKER = 1950;
const SLIDE = 2350;
const SLIDE_STEP = 150;
const RELEASE = 3450;
/** Altura fixa do post: o feed rola exatamente um post + o respiro entre eles. */
const POST_H = 384;
const GAP = 8;

export function LinkedInScene({ t, run }: { t: number; run: number }) {
  const n = POSTS.length;
  const live = run > 0;
  const scrolled = !live || t >= SCROLL;

  return (
    <div className="mock-app relative h-full flex flex-col bg-[#F4F2EE] text-[rgba(0,0,0,0.9)]">
      <div className="flex-none flex items-center gap-[10px] h-[48px] px-[12px] bg-white border-b border-[#E8E8E8] z-10">
        <span className="flex-none w-[28px] h-[28px] rounded-full bg-[#D9D4CC]" />
        <span className="flex-1 min-w-0 flex items-center gap-[8px] h-[32px] px-[10px] rounded-[4px] bg-[#EDF3F8] text-[14px] text-[rgba(0,0,0,0.6)]">
          <Glyph size={16} color="rgba(0,0,0,0.6)" sw={2.2}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </Glyph>
          Pesquisar
        </span>
        <BrandLogo name="linkedin" size={22} className="flex-none" />
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div
          className={scrolled && live ? "[transition:transform_900ms_cubic-bezier(.2,.8,.2,1)]" : ""}
          style={{ transform: `translateY(${scrolled ? -(POST_H + GAP) : 0}px)` }}
        >
          <Post v={POSTS[(run + n - 1) % n]} reacted t={Infinity} run={run} live={false} />
          <div style={{ height: GAP }} />
          <Post v={POSTS[run % n]} reacted={!live || t >= RELEASE} t={t} run={run} live={live} />
        </div>
      </div>
    </div>
  );
}

function Post({
  v,
  reacted,
  t,
  run,
  live,
}: {
  v: (typeof POSTS)[number];
  reacted: boolean;
  t: number;
  run: number;
  live: boolean;
}) {
  const pressed = live && t >= PRESS && t < RELEASE;
  const pickerOn = live && t >= PICKER && t < RELEASE;
  const pickerMounted = live && t >= PICKER && t < RELEASE + 220;
  const hover = live && t >= SLIDE ? Math.min(PICK, Math.floor((t - SLIDE) / SLIDE_STEP)) : -1;
  const chosen = REACTIONS[PICK];
  const stack = reacted ? [chosen, REACTIONS[0], REACTIONS[1]] : [REACTIONS[0], REACTIONS[1]];

  return (
    <article className="relative flex flex-col bg-white" style={{ height: POST_H }}>
      <div className="flex items-start gap-[8px] px-[12px] pt-[12px]">
        <Monogram size={48} radius="4px" text={15} />
        <span className="flex-1 min-w-0 flex flex-col leading-[1.35]">
          <span className="text-[14px] font-semibold">Sua Empresa</span>
          <span className="text-[12px] text-[rgba(0,0,0,0.6)]">1.248 seguidores</span>
          <span className="text-[12px] text-[rgba(0,0,0,0.6)]">Promovido</span>
        </span>
        <span className="flex-none text-[14px] font-semibold text-[#0A66C2]">+ Seguir</span>
      </div>
      <p className="m-0 px-[12px] mt-[10px] text-[14px] leading-[1.43] line-clamp-2">{v.text}</p>
      <div className="relative flex-1 min-h-0 mt-[10px] bg-(image:--grad-brand) flex items-end p-[16px] overflow-hidden">
        <span className="absolute top-[14px] left-[16px] text-[10px] font-semibold tracking-[0.14em] uppercase text-[rgba(255,255,255,0.8)] font-sans">
          Sua Empresa
        </span>
        <span className="font-display italic font-semibold text-[21px] leading-[1.1] tracking-[-0.01em] text-white max-w-[230px] text-balance">
          {v.art}
        </span>
      </div>
      <div className="flex items-center gap-[10px] px-[12px] py-[8px] bg-[#EEF3F8]">
        <span className="flex-1 min-w-0 flex flex-col leading-[1.35]">
          <span className="text-[14px] font-semibold truncate">{v.ctaTitle}</span>
          <span className="text-[12px] text-[rgba(0,0,0,0.6)]">suaempresa.com.br</span>
        </span>
        <span className="flex-none h-[30px] px-[14px] rounded-full border border-[#0A66C2] text-[#0A66C2] text-[14px] font-semibold flex items-center">
          {v.cta}
        </span>
      </div>
      <div className="flex items-center gap-[6px] px-[12px] h-[34px] text-[12px] text-[rgba(0,0,0,0.6)]">
        <span className="flex -space-x-[4px]">
          {stack.map((r, i) => (
            <Badge
              key={r.label}
              r={r}
              size={16}
              ring
              className={i === 0 && reacted && live ? "animate-[hub-li-pop_420ms_cubic-bezier(.2,.8,.2,1)_backwards]" : ""}
            />
          ))}
        </span>
        <span className="truncate">{reacted ? `Você e outras ${v.count} pessoas` : v.count}</span>
        <span className="ml-auto flex-none">{v.comments} comentários</span>
      </div>
      <div className="flex border-t border-[#E8E8E8] h-[50px]">
        <span
          className={`flex-1 flex flex-col items-center justify-center gap-[3px] text-[11px] font-semibold transition-colors duration-100 ${
            pressed ? "bg-[rgba(0,0,0,0.08)]" : ""
          }`}
          style={{ color: reacted ? chosen.ink : "rgba(0,0,0,0.6)" }}
        >
          {reacted ? (
            <span key={live ? run : 0} className={live ? "animate-[hub-li-bump_460ms_cubic-bezier(.2,.8,.2,1)]" : ""}>
              <Badge r={chosen} size={20} />
            </span>
          ) : (
            <Glyph size={20} sw={1.8}>
              {REACTIONS[0].glyph}
            </Glyph>
          )}
          {reacted ? chosen.label : "Gostei"}
        </span>
        {[
          { label: "Comentar", d: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
          {
            label: "Compartilhar",
            d: <path d="m2 9 3-3 3 3M13 18H7a2 2 0 0 1-2-2V6m17 9-3 3-3-3M11 6h6a2 2 0 0 1 2 2v10" />,
          },
          {
            label: "Enviar",
            d: <path d="M14.5 21.7a.5.5 0 0 0 .9 0l6.5-19a.5.5 0 0 0-.6-.6l-19 6.5a.5.5 0 0 0 0 .9l7.9 3.2a2 2 0 0 1 1.1 1.1zM21.9 2.1 10.9 13.1" />,
          },
        ].map((a) => (
          <span key={a.label} className="flex-1 flex flex-col items-center justify-center gap-[3px] text-[11px] font-semibold text-[rgba(0,0,0,0.6)]">
            <Glyph size={20} sw={1.8}>
              {a.d}
            </Glyph>
            {a.label}
          </span>
        ))}
      </div>

      {/* Seletor de reações: abre com as reações saltando em sequência e acompanha o dedo. */}
      {pickerMounted && (
        <div
          key={run}
          className={`absolute left-[8px] bottom-[52px] flex items-end gap-[4px] p-[6px] rounded-full bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,0.08),0_6px_16px_rgba(0,0,0,0.16)] origin-bottom-left transition-[opacity,transform] duration-200 ${
            pickerOn ? "opacity-100" : "opacity-0 scale-[0.9]"
          }`}
        >
          {REACTIONS.map((r, i) => (
            <span
              key={r.label}
              className="relative animate-[hub-li-pop_380ms_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className="block [transition:transform_180ms_cubic-bezier(.2,.8,.2,1)] origin-bottom"
                style={{ transform: hover === i ? "translateY(-8px) scale(1.32)" : "none" }}
              >
                <Badge r={r} size={34} />
              </span>
              {hover === i && (
                <span className="absolute left-1/2 -top-[38px] -translate-x-1/2 px-[8px] py-[2px] rounded-full bg-[rgba(0,0,0,0.78)] text-white text-[11px] font-semibold whitespace-nowrap">
                  {r.label}
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
