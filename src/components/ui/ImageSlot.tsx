import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Substituto do `<image-slot>` do export: sem `src`, reproduz o estado vazio
 * read-only (ícone + legenda + anel tracejado); com `src`, mostra a imagem
 * cobrindo o slot.
 */
export function ImageSlot({
  src,
  alt = "",
  placeholder = "Imagem pendente",
  shape = "rounded",
  radius = 12,
  sizes = "100vw",
  className = "",
  style,
}: {
  src?: string;
  alt?: string;
  placeholder?: string;
  shape?: "rect" | "rounded" | "circle" | "pill";
  radius?: number;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const borderRadius =
    shape === "circle" ? "50%" : shape === "pill" ? "9999px" : shape === "rect" ? 0 : radius;

  return (
    <span
      className={`relative block w-full h-full aspect-[3/2] text-[13px]/[1.3] font-normal not-italic [font-family:system-ui,-apple-system,sans-serif] ${className}`}
      style={style}
    >
      <span className="block absolute inset-0 overflow-hidden bg-[rgba(127,127,127,.08)]" style={{ borderRadius }}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <>
            {/* Nota interna de produção: visível no layout, mas não lida pelo leitor de tela. */}
            <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-[6px] text-center p-[12px] box-border select-none">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="opacity-45">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span className="block max-w-[90%] font-medium tracking-[.01em] opacity-75">{placeholder}</span>
            </span>
            <span className="block absolute inset-0 pointer-events-none border-[1.5px] border-dashed border-current opacity-35" style={{ borderRadius }} />
          </>
        )}
      </span>
    </span>
  );
}
