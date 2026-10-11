import type { ReactNode } from "react";

/** Faixa que rola sem fim: cada item seguido de um ponto dourado. */
export function Marquee({ items }: { items: ReactNode[] }) {
  const row = Array.from({ length: 8 }, (_, k) =>
    items.map((item, j) => (
      <span key={k + "-" + j} className="inline-flex items-center gap-[40px] pr-[40px]">
        {item}
        <span className="w-[8px] h-[8px] rounded-[999px] bg-gold inline-block"></span>
      </span>
    )),
  );
  return (
    <div className="flex w-max whitespace-nowrap animate-hub-marquee">
      {row}
    </div>
  );
}

export function MarqueeWord({ children, inkClass }: { children: ReactNode; inkClass: string }) {
  return (
    <span className={`font-display italic font-semibold text-[clamp(22px,2.6vw,32px)] tracking-[-0.01em] ${inkClass}`}>{children}</span>
  );
}

/** Logo de cliente pintado de branco (o filtro zera as cores e inverte), na altura dada em px. */
export function MarqueeLogo({ src, h }: { src: string; h: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="eager"
      draggable={false}
      style={{ height: `calc(${h}px * var(--logo-scale, 1))` }}
      className="block w-auto max-w-none [filter:brightness(0)_invert(1)] [--logo-scale:0.78] md:[--logo-scale:1]"
    />
  );
}
