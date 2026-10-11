"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CtaButton } from "@/components/CtaButton";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-trabalhamos", label: "Como trabalhamos" },
  { href: "#cases", label: "Cases" },
];

export function Header() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;

    // Altura medida do header -> --header-h (padding do hero, sticky das etapas).
    const measure = () => {
      const hh = Math.round(el.getBoundingClientRect().height);
      if (hh) root.style.setProperty("--header-h", hh + "px");
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();

    return () => ro.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      data-hub-header=""
      className="hub-drop fixed top-0 left-0 right-0 z-50 border-b bg-white border-b-[rgba(32,35,63,0.08)]"
    >
      <a
        href="#topo"
        className="absolute left-[16px] top-[12px] z-1 py-[10px] px-[16px] rounded-[8px] bg-white text-ink text-[14px] font-semibold no-underline [box-shadow:0_8px_24px_rgba(32,35,63,0.16)] [transform:translateY(-200%)] focus-visible:[transform:none] hover:text-ink"
      >
        Pular para o conteúdo
      </a>
      <div className="max-w-[1200px] mx-auto py-[12px] px-[clamp(16px,4vw,32px)] flex flex-wrap items-center justify-between gap-x-[16px] gap-y-[8px]">
        <a href="#topo" aria-label="HUB Marketing, início" className="flex items-center flex-none">
          <Image
            src="/uploads/logo-base.svg"
            alt="HUB Marketing"
            width={1789}
            height={1168}
            unoptimized
            priority
            className="h-[44px] w-auto block"
          />
        </a>
        <div className="flex items-center gap-x-[16px] gap-y-[8px] min-w-0">
          <nav
            aria-label="Seções da página"
            className="flex gap-[4px] overflow-x-auto [scrollbar-width:none] min-w-0 [&::-webkit-scrollbar]:hidden max-[720px]:hidden!"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-[8px] px-[12px] rounded-[8px] text-[14px] font-medium whitespace-nowrap no-underline text-ink [transition:color_120ms,background_120ms] hover:bg-[rgba(127,127,140,0.12)] hover:no-underline"
              >
                {l.label}
              </a>
            ))}
          </nav>
          {/* 44px de altura: alvo de toque confortável e a mesma altura da logo, então o header não cresce. */}
          <CtaButton variant="secondary" size="sm" className="whitespace-nowrap box-border min-h-[44px]">
            {/* Rótulo curto em telas estreitas para o header não quebrar em duas linhas. */}
            <span>
              Quero meu diagnóstico<span className="max-[419px]:hidden"> gratuito</span>
            </span>
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
