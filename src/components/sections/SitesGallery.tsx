"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { siteCases, type SiteCase } from "@/lib/content";
import { whatsappUrl } from "@/lib/site-config";
import { caption, ctrlNext, ctrlPrev, waLink } from "./styles";

const siteMessage = (s: SiteCase) =>
  `Olá! Vi o site que vocês fizeram para ${s.client} e quero um site assim para a minha empresa.`;

/** A lista vai duas vezes no trilho: em tela muito larga, uma volta só não basta para o loop fechar. */
const COPIES = 2;
const slides = Array.from({ length: COPIES }, (_, c) => siteCases.map((s, i) => ({ s, i, copy: c > 0 }))).flat();

/**
 * Galeria dos sites entregues: vários lado a lado, cada um numa janela de
 * navegador. Com o mouse em cima, a página rola sozinha até o fim; o clique abre
 * o site em foco (SiteViewer), com rolagem livre e o WhatsApp a um toque.
 *
 * O trilho (Embla, em loop infinito) ocupa a largura toda da tela, mas o site em
 * foco encaixa na borda da coluna do conteúdo, alinhado ao título da seção: o
 * vizinho anterior aparece na margem como trilho que continua, e nada encosta no
 * pixel 0 da tela.
 */
export function SitesGallery() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: true,
      // Distância da borda do viewport (que começa na borda da tela) até a borda da coluna.
      // O Embla refaz o encaixe no resize.
      align: () => {
        const col = rootRef.current?.getBoundingClientRect().left ?? 0;
        const view = viewportRef.current?.getBoundingClientRect().left ?? 0;
        return Math.max(0, col - view);
      },
    },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })],
  );
  const setViewport = useCallback(
    (el: HTMLDivElement | null) => {
      viewportRef.current = el;
      emblaRef(el);
    },
    [emblaRef],
  );
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap() % siteCases.length);
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const n = siteCases.length;

  return (
    <div ref={rootRef} className="flex flex-col gap-[24px]">
      <p className={`m-0 ${caption} text-muted flex items-center gap-[8px]`}>
        <Icon name="mouse" size={18} className="shrink-0 text-magenta [@media(hover:none)]:hidden" />
        <span className="[@media(hover:none)]:hidden">Passe o mouse sobre um site para ver a página inteira rolar. Arraste para o lado para ver os outros.</span>
        <Icon name="maximize" size={16} className="shrink-0 text-magenta [@media(hover:hover)]:hidden" />
        <span className="[@media(hover:hover)]:hidden">Toque num site para abrir a página inteira.</span>
      </p>

      {/* Viewport na largura da tela, sangrando dos dois lados da coluna; a seção corta o excesso. */}
      <div
        ref={setViewport}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Sites feitos pela HUB"
        className="relative w-screen ml-[calc(50%-50vw)] cursor-grab active:cursor-grabbing"
      >
        <ul className="list-none m-0 p-0 pt-[8px] pb-[48px] -mb-[36px] flex [touch-action:pan-y_pinch-zoom]">
          {slides.map(({ s, i, copy }, k) => (
            <li
              key={s.id + "-" + k}
              aria-hidden={copy ? "true" : undefined}
              className="flex-[0_0_auto] w-[min(78vw,340px)] pr-[24px] flex flex-col"
            >
              <SiteCard site={s} copy={copy} onOpen={() => setOpen(i)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-[24px] gap-y-[16px]">
        <div className="flex items-center gap-[16px] flex-[1_1_280px] min-w-0">
          <span className="text-[14px] font-semibold text-ink tabular-nums whitespace-nowrap">
            {String(selected + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            <span className="sr-only"> sites</span>
          </span>
          <div aria-hidden="true" className="relative flex-1 h-[2px] bg-line rounded-[2px] overflow-hidden">
            <div
              className="absolute top-0 h-full bg-magenta rounded-[2px] [transition:left_400ms_var(--ease-hub)]"
              style={{ width: `${100 / n}%`, left: `${(selected * 100) / n}%` }}
            />
          </div>
        </div>
        <div className="flex gap-[8px] max-[520px]:w-full max-[520px]:justify-end">
          <button type="button" aria-label="Site anterior" onClick={() => embla?.scrollPrev()} className={ctrlPrev}>
            <Icon name="chevron-left" size={20} />
          </button>
          <button type="button" aria-label="Próximo site" onClick={() => embla?.scrollNext()} className={ctrlNext}>
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      </div>

      <SiteViewer index={open} onChange={setOpen} />
    </div>
  );
}

function SiteCard({ site, onOpen, copy = false }: { site: SiteCase; onOpen: () => void; copy?: boolean }) {
  const ratio = site.image.height / site.image.width;
  // Páginas mais longas rolam por mais tempo, para a velocidade parecer a mesma.
  const vars = {
    "--scroll-dur": `${Math.min(14, Math.max(4, ratio * 1.6)).toFixed(1)}s`,
    "--thumb": `${Math.min(60, (130 / ratio)).toFixed(1)}%`,
  } as CSSProperties;

  return (
    <article className="flex flex-col flex-1">
      <button
        type="button"
        onClick={onOpen}
        tabIndex={copy ? -1 : undefined}
        aria-label={`Abrir o site de ${site.client} em tela cheia`}
        style={vars}
        className="group/frame relative block w-full p-0 text-left font-[inherit] cursor-pointer bg-white border border-line rounded-[16px] overflow-hidden [box-shadow:0_16px_40px_rgba(32,35,63,0.08)] [transition:transform_200ms_var(--ease-hub),box-shadow_200ms] hover:[transform:translateY(-3px)] hover:[box-shadow:0_20px_44px_rgba(32,35,63,0.14)]"
      >
        {/* Barra do navegador: dá a leitura de "isto é um site no ar" sem inventar endereço. */}
        <span className="flex items-center gap-[6px] h-[36px] px-[14px] border-b border-line bg-surface">
          <span className="w-[8px] h-[8px] rounded-[999px] bg-line-strong" />
          <span className="w-[8px] h-[8px] rounded-[999px] bg-line-strong" />
          <span className="w-[8px] h-[8px] rounded-[999px] bg-line-strong" />
          <span className="ml-auto inline-flex items-center gap-[6px] text-[12px] font-semibold text-ink-2 group-hover/frame:text-magenta [transition:color_120ms]">
            Ver inteiro
            <Icon name="maximize" size={14} />
          </span>
        </span>
        <span className="relative block h-[clamp(340px,30vw,400px)] overflow-hidden bg-surface [container-type:size]">
          <Image
            src={site.image.src}
            alt={`Página inicial do site de ${site.client}`}
            width={site.image.width}
            height={site.image.height}
            sizes="(max-width: 520px) 78vw, 340px"
            className="hub-site-scroll absolute left-0 top-0 w-full h-auto [transition:transform_900ms_var(--ease-hub)] group-hover/frame:[transform:translateY(calc(-100%_+_100cqh))] group-hover/frame:[transition:transform_var(--scroll-dur)_cubic-bezier(.45,0,.55,1)_150ms] group-focus-visible/frame:[transform:translateY(calc(-100%_+_100cqh))] group-focus-visible/frame:[transition:transform_var(--scroll-dur)_cubic-bezier(.45,0,.55,1)_150ms]"
          />
          {/* Barra de rolagem fina: mostra onde a página está enquanto ela desce. */}
          <span
            aria-hidden="true"
            className="absolute right-[6px] top-[8px] bottom-[8px] w-[3px] rounded-[3px] bg-[rgba(32,35,63,0.14)] opacity-0 [transition:opacity_200ms] group-hover/frame:opacity-100 group-focus-visible/frame:opacity-100 [container-type:size]"
          >
            <span
              className="hub-site-scroll absolute left-0 top-0 w-full rounded-[3px] bg-magenta [transition:transform_900ms_var(--ease-hub)] group-hover/frame:[transform:translateY(calc(100cqh_-_100%))] group-hover/frame:[transition:transform_var(--scroll-dur)_cubic-bezier(.45,0,.55,1)_150ms] group-focus-visible/frame:[transform:translateY(calc(100cqh_-_100%))] group-focus-visible/frame:[transition:transform_var(--scroll-dur)_cubic-bezier(.45,0,.55,1)_150ms]"
              style={{ height: "var(--thumb)" }}
            />
          </span>
          {/* A página continua: uma sombra navy na base diz que tem mais embaixo. */}
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[72px] bg-[linear-gradient(to_top,rgba(32,35,63,0.22),rgba(32,35,63,0))] pointer-events-none" />
        </span>
      </button>

      <div className="flex flex-col gap-[4px] pt-[18px]">
        <h3 className="m-0 font-display italic font-semibold text-[24px] leading-[1.15] tracking-[-0.01em] text-ink">{site.client}</h3>
        <p className={`m-0 ${caption} text-muted`}>{site.segment}</p>
        <a href={whatsappUrl(siteMessage(site))} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined} className={`${waLink} self-start mt-[4px]`}>
          <Icon name="whatsapp" size={18} />
          Quero um site assim
          <span className="sr-only">, como o de {site.client} (abre o WhatsApp em nova aba)</span>
        </a>
      </div>
    </article>
  );
}

/**
 * Site em foco: a página inteira numa janela que rola livre, com o WhatsApp
 * sempre à mão e a troca de site sem precisar fechar (setas, miniaturas, teclado).
 */
function SiteViewer({ index, onChange }: { index: number | null; onChange: (i: number | null) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Progresso guardado junto do site a que pertence: trocar de site já começa do zero.
  const [scrolled, setScrolled] = useState({ i: index, v: 0 });
  const scroll = scrolled.i === index ? scrolled.v : 0;
  const site = index === null ? null : siteCases[index];
  const n = siteCases.length;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
      frameRef.current?.focus({ preventScroll: true });
    }
    if (index === null && d.open) d.close();
  }, [index]);

  // Troca de site: volta ao topo da página nova.
  useEffect(() => {
    if (frameRef.current) frameRef.current.scrollTop = 0;
  }, [index]);

  const go = (dir: 1 | -1) => index !== null && onChange((index + dir + n) % n);
  const close = () => onChange(null);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const onFrameScroll = () => {
    const el = frameRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrolled({ i: index, v: max > 0 ? el.scrollTop / max : 0 });
  };

  const counter = index === null ? "" : String(index + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");
  const darkCtrl =
    "w-[48px] h-[48px] shrink-0 rounded-[999px] flex items-center justify-center cursor-pointer p-0 font-[inherit] active:[transform:translateY(1px)] [transition:background_120ms,border-color_120ms,color_120ms]";
  const darkPrev = `${darkCtrl} border border-[rgba(255,255,255,0.32)] bg-transparent text-white hover:bg-[rgba(255,255,255,0.08)] hover:border-white`;
  const darkNext = `${darkCtrl} border border-white bg-white text-navy hover:bg-[rgba(255,255,255,0.88)]`;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="site-viewer-title"
      data-surface="dark"
      onClose={() => {
        document.documentElement.style.overflow = "";
        onChange(null);
      }}
      onKeyDown={onKey}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 m-0 p-0 border-0 w-screen h-[100dvh] max-w-none max-h-none bg-transparent text-white overflow-hidden backdrop:bg-navy open:animate-[hub-viewer-in_420ms_var(--ease-hub)] backdrop:animate-[hub-fade-in_300ms_ease-out]"
    >
      {site && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          className="h-full max-w-[1440px] mx-auto box-border grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] lg:grid-rows-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-x-[40px] gap-y-[12px] p-[12px] lg:py-[28px] lg:px-[40px]"
        >
          {/* Celular: barra de cima com nome e fechar. */}
          <div className="lg:hidden flex items-center gap-[12px] pl-[4px]">
            <div className="min-w-0 flex-1">
              <p className="m-0 font-display italic font-semibold text-[24px] leading-[1.15] truncate">{site.client}</p>
              <p className="m-0 text-[13px] leading-[1.4] text-[rgba(255,255,255,0.8)] truncate">
                <span className="tabular-nums">{counter}</span> · {site.segment}
              </p>
            </div>
            <button type="button" onClick={close} aria-label="Fechar" className={darkPrev}>
              <Icon name="x" size={20} />
            </button>
          </div>

          {/* A janela do site: rola livre, com barra de progresso magenta no topo. */}
          <div className="min-h-0 flex flex-col rounded-[16px] overflow-hidden bg-white [box-shadow:0_24px_64px_rgba(10,12,30,0.45)]">
            <div className="relative flex items-center gap-[6px] h-[36px] shrink-0 px-[14px] bg-surface border-b border-line">
              <span className="w-[8px] h-[8px] rounded-[999px] bg-line-strong" />
              <span className="w-[8px] h-[8px] rounded-[999px] bg-line-strong" />
              <span className="w-[8px] h-[8px] rounded-[999px] bg-line-strong" />
              <span className="ml-[10px] text-[12px] font-semibold text-ink-2 truncate">{site.client}</span>
              <span aria-hidden="true" className="absolute left-0 bottom-[-1px] h-[2px] bg-magenta origin-left w-full" style={{ transform: `scaleX(${scroll})` }} />
            </div>
            <div
              ref={frameRef}
              tabIndex={0}
              role="region"
              aria-label={`Página inteira do site de ${site.client}`}
              onScroll={onFrameScroll}
              className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain outline-none focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-magenta-light focus-visible:outline-offset-[-3px] [scrollbar-width:thin] [scrollbar-color:rgba(32,35,63,0.35)_transparent]"
            >
              <Image
                key={site.id}
                src={site.image.src}
                alt={`Página inteira do site de ${site.client}`}
                width={site.image.width}
                height={site.image.height}
                sizes="(max-width: 1024px) 100vw, 1060px"
                loading="eager"
                className="block w-full h-auto animate-[hub-fade-in_360ms_ease-out]"
              />
            </div>
            {/* Dica de rolagem: some quando a pessoa começa a rolar. */}
            <div aria-hidden="true" className="relative h-0">
              <span
                className={`absolute left-1/2 bottom-[16px] -translate-x-1/2 inline-flex items-center gap-[8px] whitespace-nowrap py-[8px] px-[14px] rounded-[999px] bg-navy text-white text-[13px] font-semibold [box-shadow:0_8px_20px_rgba(32,35,63,0.25)] [transition:opacity_300ms_var(--ease-hub)] pointer-events-none ${
                  scroll > 0.02 ? "opacity-0" : "opacity-100"
                }`}
              >
                <Icon name="chevron-down" size={16} />
                Role para ver a página inteira
              </span>
            </div>
          </div>

          {/* Celular: anterior, WhatsApp e próximo, sempre no alcance do polegar. */}
          <div className="lg:hidden flex items-center gap-[8px]">
            <button type="button" onClick={() => go(-1)} aria-label="Site anterior" className={darkPrev}>
              <Icon name="chevron-left" size={20} />
            </button>
            <Button
              href={whatsappUrl(siteMessage(site))}
                variant="gold"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="flex-1 min-w-0 box-border px-[16px] text-[16px] whitespace-nowrap"
              leadingIcon={<Icon name="whatsapp" size={20} />}
            >
              Quero um site assim
              <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
            </Button>
            <button type="button" onClick={() => go(1)} aria-label="Próximo site" className={darkNext}>
              <Icon name="chevron-right" size={20} />
            </button>
          </div>

          {/* Desktop: painel lateral com o case, o WhatsApp e os outros sites. */}
          <aside className="hidden lg:flex flex-col gap-[28px] min-h-0">
            <div className="flex items-center gap-[8px]">
              <button type="button" onClick={() => go(-1)} aria-label="Site anterior" className={darkPrev}>
                <Icon name="chevron-left" size={20} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Próximo site" className={darkNext}>
                <Icon name="chevron-right" size={20} />
              </button>
              <span className="ml-[8px] text-[14px] font-semibold tabular-nums text-[rgba(255,255,255,0.8)]">{counter}</span>
              <button type="button" onClick={close} aria-label="Fechar" className={`${darkPrev} ml-auto`}>
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-[8px]">
              <h2 id="site-viewer-title" className="m-0 font-display italic font-semibold text-[clamp(32px,3vw,42px)] leading-[1.05] tracking-[-0.02em] text-balance">
                {site.client}
              </h2>
              <p className={`m-0 ${caption} text-[rgba(255,255,255,0.8)]`}>{site.segment}</p>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Button
                href={whatsappUrl(siteMessage(site))}
                variant="gold"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                fullWidth
                className="box-border"
                leadingIcon={<Icon name="whatsapp" size={20} />}
              >
                Quero um site assim
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </Button>
              <p className="m-0 text-[13px] leading-[1.5] text-[rgba(255,255,255,0.8)]">
                Abre o WhatsApp com a mensagem pronta, citando este site.
              </p>
            </div>

            <div className="flex flex-col gap-[12px] min-h-0 flex-1">
              <p className="m-0 text-[12px] font-semibold tracking-[0.14em] uppercase text-[rgba(255,255,255,0.8)]">Outros sites</p>
              <ul className="list-none m-0 p-0 flex flex-col gap-[4px] overflow-y-auto min-h-0 -mx-[8px] px-[8px] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_transparent]">
                {siteCases.map((s, i) => {
                  const on = i === index;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => onChange(i)}
                        aria-current={on ? "true" : undefined}
                        className={`w-full flex items-center gap-[14px] p-[8px] rounded-[12px] border-0 text-left font-[inherit] cursor-pointer [transition:background_120ms] ${
                          on ? "bg-[rgba(255,255,255,0.12)]" : "bg-transparent hover:bg-[rgba(255,255,255,0.06)]"
                        }`}
                      >
                        <span className={`relative shrink-0 w-[72px] h-[54px] rounded-[8px] overflow-hidden bg-white ${on ? "[box-shadow:0_0_0_2px_var(--magenta-light)]" : ""}`}>
                          <Image src={s.image.src} alt="" width={s.image.width} height={s.image.height} sizes="72px" className="absolute left-0 top-0 w-full h-auto" />
                        </span>
                        <span className="min-w-0 flex flex-col">
                          <span className="text-[16px] font-semibold leading-[1.3] text-white truncate">{s.client}</span>
                          <span className="text-[13px] leading-[1.4] text-[rgba(255,255,255,0.8)] truncate">{s.segment}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </dialog>
  );
}
