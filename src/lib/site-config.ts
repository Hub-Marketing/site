/**
 * Ajustes da landing (antigos `data-props` do export do Claude Design).
 */
export const siteConfig = {
  /** WhatsApp de todos os CTAs (só dígitos, com DDI e DDD). */
  whatsappNumber: "5531987926808",
  /** Mensagem que já chega digitada no WhatsApp. */
  ctaMessage: "Olá! Vim pelo site da HUB e quero agendar meu diagnóstico gratuito.",
  /** Variante do botão final. */
  finalButton: "gold" as "gold" | "primary",
  /** Faixa de palavras animada no rodapé do hero. */
  showMarquee: true,
  casesAutoplay: true,
  /** "claro": fundo branco com o brilho em degradê animado; "escuro": campo navy com blobs. */
  heroStyle: "claro" as "escuro" | "claro",
  /** URL de vídeo para o fundo do hero (vazio = degradê animado). */
  heroVideo: "",
};

/** Link do WhatsApp da HUB com uma mensagem já digitada. */
export const whatsappUrl = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** Destino de todos os CTAs: WhatsApp com a mensagem pronta. */
export const ctaUrl = whatsappUrl(siteConfig.ctaMessage);

/** Hero escuro quando o estilo é "escuro" ou há vídeo de fundo. */
export const heroIsDark = siteConfig.heroStyle === "escuro" || siteConfig.heroVideo.trim() !== "";

/** Altura inicial do header antes da medição (mesmo default do original). */
export const DEFAULT_HEADER_H = 69;
