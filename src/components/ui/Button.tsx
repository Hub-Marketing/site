import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Port do `HubMarketingDesignSystem.Button` (design-export/_ds/.../_ds_bundle.js).
 * Poppins semibold, magenta primário, secundário no gradiente da marca e variante gold.
 * Com `href`, renderiza um link com a mesma aparência.
 */
export type ButtonVariant = "primary" | "secondary" | "gold" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/* leading 1.25 para o rótulo poder quebrar linha; o padding vertical compensa e mantém a altura de uma linha. */
const sizes: Record<ButtonSize, string> = {
  sm: "px-[16px] py-[6px] text-[14px] rounded-[8px]",
  md: "px-[22px] py-[9px] text-[15px] rounded-[10px]",
  lg: "px-[30px] py-[13px] text-[17px] rounded-[12px]",
};

const variants: Record<ButtonVariant, { base: string; states: string }> = {
  primary: {
    base: "bg-(--magenta) text-white border border-transparent shadow-(--shadow-magenta)",
    states: "hover:bg-(--accent-primary-hover) active:bg-(--accent-primary-press)",
  },
  /* Gradiente da marca esticado: no hover a rampa desliza para o lado magenta. */
  secondary: {
    base: "bg-(image:--grad-brand) bg-[length:130%_100%] bg-[position:0%_50%] text-white border border-transparent shadow-(--shadow-sm)",
    states: "hover:bg-[position:100%_50%] active:bg-[position:70%_50%]",
  },
  gold: {
    base: "bg-(--gold) text-(--navy) border border-transparent shadow-(--shadow-sm)",
    states: "hover:bg-(--gold-light) active:bg-(--gold-ink)",
  },
  outline: {
    base: "bg-transparent text-(--magenta) border-[1.5px] border-(--magenta)",
    states: "hover:bg-[rgba(204,16,116,0.06)] active:bg-[rgba(204,16,116,0.12)]",
  },
  ghost: {
    base: "bg-transparent text-(--navy) border border-transparent",
    states: "hover:bg-(--gray-050) active:bg-(--gray-100)",
  },
};

export type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

type ButtonProps =
  | (ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (ButtonOwnProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; disabled?: undefined });

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  className = "",
  ...rest
}: ButtonProps) {
  const v = variants[variant] ?? variants.primary;
  const cls = [
    "inline-flex items-center justify-center gap-[8px] font-sans font-semibold leading-[1.25] text-center no-underline hover:no-underline",
    "[transition:background_var(--dur-fast)_var(--ease-standard),transform_var(--dur-fast)_var(--ease-standard)]",
    fullWidth ? "w-full" : "w-auto",
    sizes[size] ?? sizes.md,
    v.base,
    disabled ? "cursor-not-allowed opacity-45" : `cursor-pointer active:[transform:translateY(1px)] ${v.states}`,
    className,
  ].join(" ");

  if (rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    );
  }
  return (
    <button disabled={disabled} className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
