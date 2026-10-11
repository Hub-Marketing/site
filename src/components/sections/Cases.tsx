"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/icons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cases, channels } from "@/lib/content";
import { useAutoplayAllowed } from "@/lib/motion";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { onTablistKey } from "@/lib/tabs";
import { SitesGallery } from "./SitesGallery";
import { body, caption, ctrlNext, ctrlPrev, displayTitle, eyebrow, h2Size, waLink } from "./styles";

export function Cases() {
  // A primeira aba (LinkedIn) abre: o case com antes e depois responde ao título da seção.
  const [tab, setTab] = useState(0);
  const channel = channels[tab];

  return (
    <section id="cases" aria-labelledby="s-cases-title" className="bg-white scroll-mt-[var(--header-h,69px)] overflow-x-clip">
      <div className="max-w-[1200px] mx-auto py-[clamp(64px,9vw,112px)] px-[clamp(16px,4vw,32px)] flex flex-col gap-[clamp(32px,4vw,48px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-[48px] gap-y-[24px]">
          <div className="flex flex-col gap-[16px] max-w-[640px]">
            <span data-reveal="" className={`${eyebrow} text-magenta`}>Cases</span>
            <h2 id="s-cases-title" data-reveal="" className={`${displayTitle} ${h2Size} text-ink text-balance`}>
              O que muda quando cada canal cumpre sua função.
            </h2>
          </div>
          {/* Em tela estreita as abas não cabem numa pílula: viram um trilho com o raio acompanhando as abas. */}
          <div
            role="tablist"
            aria-label="Filtrar cases por canal"
            data-reveal=""
            className="flex flex-wrap gap-[8px] p-[6px] bg-surface rounded-[999px] max-[520px]:grid max-[520px]:grid-cols-3 max-[520px]:gap-[4px] max-[520px]:w-full max-[520px]:box-border"
          >
            {channels.map((label, c) => {
              const on = c === tab;
              return (
                <button
                  key={label}
                  id={`cases-tab-${c}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls="cases-painel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setTab(c)}
                  onKeyDown={(e) => onTablistKey(e, tab, channels.length, setTab)}
                  className={`border-0 cursor-pointer font-[inherit] text-[14px] font-semibold py-[10px] px-[18px] max-[520px]:px-[8px] rounded-[999px] [transition:background_200ms_var(--ease-hub),color_200ms,box-shadow_200ms] ${
                    on ? "bg-ink text-white [box-shadow:0_4px_12px_rgba(32,35,63,0.18)]" : "bg-transparent text-body [box-shadow:none] hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div id="cases-painel" role="tabpanel" aria-labelledby={`cases-tab-${tab}`} data-reveal="">
          {channel === "Site" ? <SitesGallery /> : <CasesCarousel key={channel} channel={channel} />}
        </div>
      </div>
    </section>
  );
}

/** Carrossel dos cases de um canal. O autoplay roda só dentro do canal escolhido. */
function CasesCarousel({ channel }: { channel: Exclude<(typeof channels)[number], "Site"> }) {
  const list = cases.filter((x) => x.channel === channel);
  const [ci, setCi] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Depois que a pessoa navega por conta própria, o autoplay não volta.
  const [userControlled, setUserControlled] = useState(false);
  const autoplayAllowed = useAutoplayAllowed();
  const autoplayOn = siteConfig.casesAutoplay && autoplayAllowed && !userControlled && list.length > 1;
  const paused = hovered || focused;
  const [inView, setInView] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /** Navegação feita pela pessoa: troca o case e desliga o autoplay. */
  const userGo = (fn: () => void) => () => {
    setUserControlled(true);
    fn();
  };
  const nextCase = () => setCi((i) => (i + 1) % list.length);
  const prevCase = () => setCi((i) => (i - 1 + list.length) % list.length);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      userGo(nextCase)();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      userGo(prevCase)();
    }
  };

  const counter = channel + " · " + String(ci + 1).padStart(2, "0") + " / " + String(list.length).padStart(2, "0");
  const counterSr = channel + ": case " + (ci + 1) + " de " + list.length;
  const autoplaying = autoplayOn && !paused && inView;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={`Cases de ${channel}`}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      ref={regionRef}
      className="flex flex-col gap-[24px] rounded-[16px]"
    >
      <div className="grid">
        {list.map((x, i) => {
          const on = i === ci;
          return (
            <article
              key={x.id}
              aria-hidden={on ? "false" : "true"}
              className={`[grid-area:1/1] [transition:opacity_500ms_var(--ease-hub),transform_600ms_var(--ease-hub),visibility_600ms] bg-white border border-line rounded-[16px] [box-shadow:0_16px_40px_rgba(32,35,63,0.08)] p-[clamp(16px,2vw,24px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(24px,3vw,48px)] items-center ${
                on
                  ? "opacity-100 visible [transform:translateX(0)]"
                  : `opacity-0 invisible ${i < ci ? "[transform:translateX(-48px)]" : "[transform:translateX(48px)]"}`
              }`}
            >
              <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-surface">
                <div
                  className={`absolute inset-0 [transition:transform_1200ms_var(--ease-hub)] ${on ? "[transform:scale(1)]" : "[transform:scale(1.06)]"}`}
                >
                  <ImageSlot
                    src={x.image?.src}
                    alt={x.image?.alt}
                    shape="rounded"
                    radius={12}
                    placeholder="Imagem do case (print, peça ou foto do cliente)"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[20px] pt-[clamp(0px,1vw,16px)] pr-[clamp(4px,1.5vw,24px)] pb-[clamp(8px,1vw,16px)] pl-0">
                <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[8px]">
                  <span className="inline-flex items-center gap-[8px] text-[12px] font-semibold tracking-[0.14em] uppercase text-ink bg-[rgba(32,35,63,0.06)] py-[6px] px-[12px] rounded-[999px]">
                    {x.channel}
                  </span>
                  <span className={`${caption} text-muted`}>{x.segment}</span>
                </div>
                <h3 className="m-0 font-display italic font-semibold text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em] text-ink">
                  {x.client}
                </h3>
                <dl className="m-0 grid gap-[14px]">
                  <div className="grid gap-[4px]">
                    <dt className={`${caption} font-semibold text-ink`}>Desafio</dt>
                    <dd className={`m-0 ${body} text-body`}>{x.challenge}</dd>
                  </div>
                  <div className="grid gap-[4px]">
                    <dt className={`${caption} font-semibold text-ink`}>O que fizemos</dt>
                    <dd className={`m-0 ${body} text-body`}>{x.solution}</dd>
                  </div>
                </dl>
                <ul className="list-none m-0 pt-[20px] px-0 pb-0 border-t border-line grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[16px]">
                  {x.metrics.map((m, j) => (
                    <li
                      key={m.l}
                      className={`flex flex-col gap-[4px] [transition:opacity_500ms_var(--ease-hub),transform_500ms_var(--ease-hub)] ${
                        on ? "opacity-100 [transform:translateY(0)]" : "opacity-0 [transform:translateY(12px)]"
                      }`}
                      style={{ transitionDelay: on ? `${250 + j * 110}ms` : "0ms" }}
                    >
                      <span className="font-display italic font-semibold text-[clamp(26px,2.6vw,34px)] leading-none text-magenta tabular-nums">
                        {m.v}
                      </span>
                      <span className="text-[14px] leading-[1.4] text-muted">{m.l}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(`Olá! Vi os cases de ${channel} no site da HUB e quero conversar sobre isso para a minha empresa.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={on ? undefined : -1}
                  className={`${waLink} self-start -mb-[8px]`}
                >
                  <Icon name="whatsapp" size={18} />
                  Quero isso na minha empresa
                  <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Com um case só no canal, contador, pontos e setas não têm o que navegar. */}
      {list.length > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-x-[24px] gap-y-[16px]">
          <div className="flex items-center gap-[16px] flex-[1_1_280px] min-w-0">
            <span aria-hidden="true" className="text-[14px] font-semibold text-ink tabular-nums whitespace-nowrap">
              {counter}
            </span>
            {/* Com autoplay rodando, anunciar a cada troca vira ruído; só anuncia quando a pessoa está no controle. */}
            <span aria-live={autoplaying ? "off" : "polite"} className="sr-only">
              {counterSr}
            </span>
            <div className="relative flex-1 h-[2px] bg-line rounded-[2px] overflow-hidden">
              {autoplayOn && (
                <div
                  key={ci}
                  onAnimationEnd={nextCase}
                  className="absolute inset-0 bg-magenta origin-left animate-[hub-progress_7s_linear_forwards]"
                  style={{ animationPlayState: paused || !inView ? "paused" : "running" }}
                />
              )}
            </div>
          </div>
          {/* Quando quebra para a segunda linha, pontos à esquerda e setas à direita, na largura toda. */}
          <div className="flex items-center gap-[16px] max-[520px]:w-full max-[520px]:justify-between">
            {/* 16px entre os pontos: com o alvo de toque esticado em 8px de cada lado, cada um tem 24px sem encostar no vizinho. */}
            <div className="flex gap-[16px]">
              {list.map((x, k) => {
                const on = k === ci;
                return (
                  <button
                    key={x.id}
                    aria-label={channel + ", case " + (k + 1) + " de " + list.length}
                    aria-current={on ? "true" : undefined}
                    onClick={userGo(() => setCi(k))}
                    className={`relative h-[8px] rounded-[999px] border-0 p-0 cursor-pointer after:content-[''] after:absolute after:-inset-x-[8px] after:-inset-y-[12px] [transition:width_300ms_var(--ease-hub),background_300ms] ${
                      on ? "w-[28px] bg-magenta" : "w-[8px] bg-line-strong"
                    }`}
                  ></button>
                );
              })}
            </div>
            <div className="flex gap-[8px]">
              <button aria-label="Case anterior" onClick={userGo(prevCase)} className={ctrlPrev}>
                <Icon name="chevron-left" size={20} />
              </button>
              <button aria-label="Próximo case" onClick={userGo(nextCase)} className={ctrlNext}>
                <Icon name="chevron-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
