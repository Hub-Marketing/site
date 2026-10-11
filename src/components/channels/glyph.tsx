import type { CSSProperties, ReactNode } from "react";

/** Ícone de traço (paths Lucide) para os mockups das plataformas. */
export function Glyph({
  size = 20,
  color = "currentColor",
  sw = 2,
  fill = "none",
  className,
  style,
  children,
}: {
  size?: number;
  color?: string;
  sw?: number;
  fill?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}

/** Monograma da "Sua Empresa" fictícia dos mockups, no gradiente da marca. */
export function Monogram({ size, radius, text = 13 }: { size: number; radius: string; text?: number }) {
  return (
    <span
      className="flex-none flex items-center justify-center bg-(image:--grad-brand) text-white font-sans font-bold tracking-[-0.02em]"
      style={{ width: size, height: size, borderRadius: radius, fontSize: text }}
    >
      SE
    </span>
  );
}
