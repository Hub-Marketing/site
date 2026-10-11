/** Classes repetidas entre as seções (equivalentes 1:1 aos estilos inline do export). */
export const container = "max-w-[1200px] mx-auto py-[clamp(64px,9vw,112px)] px-[clamp(16px,4vw,32px)]";
export const eyebrow = "text-[13px] font-semibold tracking-[0.14em] uppercase";
export const displayTitle = "m-0 font-display italic font-semibold leading-[1.05] tracking-[-0.02em]";
export const h2Size = "text-[clamp(34px,4.6vw,56px)]";
export const cardLift =
  "[transition:transform_200ms_var(--ease-hub),box-shadow_200ms] hover:[transform:translateY(-3px)] hover:[box-shadow:0_16px_32px_rgba(32,35,63,0.10)]";

/*
 * Escala de texto em Poppins (DESIGN.md › Typography). Cada papel tem um valor só;
 * entre degraus vizinhos há pelo menos 2px, para o papel se ler sem ler o texto.
 * Os parágrafos fecham a entrelinha para 1.55 abaixo de 720px: com ~32 caracteres
 * por linha, o 1.65 do desktop solta as linhas umas das outras. `text-pretty` evita
 * palavra sozinha na última linha.
 */
const prose = "leading-[1.55] min-[720px]:leading-[1.65] text-pretty";
/** Lead: abertura do hero e do CTA final. */
export const lead = `text-[clamp(18px,1.6vw,20px)] ${prose}`;
/** Body-lg: parágrafos de seção e das etapas. */
export const bodyLg = `text-[18px] ${prose}`;
/** Body: texto de card, case e resposta do FAQ. 16px é o piso de leitura. */
export const body = `text-[16px] ${prose}`;
/** Title: título de card (serviço e pilar). */
export const cardTitle = "text-[20px] leading-[1.3] font-bold";
/** Caption: microcopy de CTA, metadado, cargo, rótulo de métrica. */
export const caption = "text-[14px] leading-[1.55]";

/** Controles circulares de 48px dos carrosséis: anterior com contorno, próximo navy sólido. */
const ctrlBase =
  "w-[48px] h-[48px] shrink-0 rounded-[999px] flex items-center justify-center cursor-pointer active:[transform:translateY(1px)] disabled:cursor-default disabled:opacity-40 disabled:active:transform-none";
export const ctrlPrev = `${ctrlBase} border border-line-strong bg-white text-ink [transition:background_120ms,border-color_120ms,color_120ms] enabled:hover:border-navy enabled:hover:text-navy enabled:hover:bg-[rgba(32,35,63,0.06)]`;
export const ctrlNext = `${ctrlBase} border border-navy bg-navy text-white [box-shadow:0_8px_20px_rgba(32,35,63,0.20)] [transition:background_120ms,border-color_120ms,transform_120ms] enabled:hover:bg-navy-hover enabled:hover:border-navy-hover enabled:active:bg-navy-press enabled:active:border-navy-press`;

/** Link de WhatsApp com mensagem do contexto (case, site): um clique até a conversa. */
export const waLink =
  "inline-flex items-center gap-[8px] min-h-[44px] text-[15px] font-semibold text-magenta no-underline hover:text-magenta-hover hover:underline underline-offset-[4px] decoration-[1.5px] [transition:color_120ms]";
