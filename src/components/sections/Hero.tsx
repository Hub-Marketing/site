import { CtaButton } from "@/components/CtaButton";
import { clientLogos } from "@/lib/content";
import { heroIsDark, siteConfig } from "@/lib/site-config";
import { HeroBackground } from "./HeroBackground";
import { HeroOrbit } from "./HeroOrbit";
import { Marquee, MarqueeLogo } from "./Marquee";
import { caption, lead } from "./styles";

const themes = {
  dark: {
    base: "bg-navy",
    ink: "text-white",
    hl: "text-gold-hl",
    body: "text-[rgba(255,255,255,0.86)]",
    muted: "text-[rgba(255,255,255,0.8)]",
    btn: "gold" as const,
  },
  light: {
    base: "bg-white",
    ink: "text-ink",
    hl: "text-magenta",
    body: "text-body",
    muted: "text-muted",
    btn: "secondary" as const,
  },
};

/*
 * Sem foto: o visual da dobra é a órbita dos canais em volta do nó da HUB, sobre o
 * brilho em degradê. No desktop o texto fica à esquerda e a órbita à direita; abaixo
 * de 1024px a órbita desce para baixo do CTA.
 */
export function Hero() {
  const t = heroIsDark ? themes.dark : themes.light;
  return (
    <section
      data-hub-hero=""
      data-surface={heroIsDark ? "dark" : undefined}
      aria-labelledby="hero-title"
      className={`relative overflow-hidden isolate md:min-h-[min(100svh,920px)] pt-[var(--header-h,69px)] box-border flex flex-col ${t.base}`}
    >
      <HeroBackground dark={heroIsDark} />
      <div className="relative z-1 flex-1 grid grid-cols-1 content-center items-center lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)] w-full box-border max-w-[1200px] mx-auto pt-[clamp(40px,7vw,88px)] lg:pt-[clamp(32px,4vw,56px)] pb-[clamp(64px,8vw,104px)] lg:pb-[clamp(56px,6vw,88px)] px-[clamp(16px,4vw,32px)] gap-x-[clamp(32px,4vw,64px)] gap-y-[clamp(56px,9vw,72px)]">
        <div className="flex flex-col gap-[clamp(28px,3.4vw,44px)]">
          <h1
            id="hero-title"
            className={`m-0 font-display italic font-semibold text-[clamp(42px,6.6vw,92px)] lg:text-[clamp(46px,4.4vw,62px)] leading-[1.04] tracking-[-0.022em] text-balance ${t.ink}`}
          >
            {/* Abertura: cada linha sobe pela própria base; a frase-destaque vem um compasso depois. */}
            <span className="block hub-line [--load-delay:120ms]">Sua empresa já cresceu.</span>
            <span className={`block hub-line [--load-delay:420ms] ${t.hl}`}>Sua presença digital ainda não acompanhou.</span>
          </h1>
          <div className="flex flex-col gap-[clamp(24px,2.6vw,32px)] max-w-[560px]">
            <p className={`m-0 hub-load [--load-delay:760ms] ${lead} ${t.body}`}>
              Redes sociais, site, Google Ads e LinkedIn trabalhando juntos para que o cliente certo encontre sua empresa, confie nela e feche com você.
            </p>
            <div className="flex flex-col items-start gap-[14px] hub-load [--load-delay:900ms]">
              <CtaButton variant={t.btn} size="lg">
                Quero meu diagnóstico gratuito
              </CtaButton>
              <p className={`m-0 ${caption} max-w-[440px] ${t.muted}`}>
                Uma conversa online de 40 minutos para entender onde sua presença digital está perdendo negócios. Sem compromisso. O botão abre o WhatsApp com a mensagem pronta.
              </p>
            </div>
          </div>
        </div>
        <HeroOrbit />
      </div>
      {siteConfig.showMarquee && (
        /* A faixa leva o gradiente da marca nos dois temas, então a tinta é sempre branca. */
        /*
         * A legenda fica parada, alinhada à coluna do conteúdo, e os logos passam por trás dela
         * entrando num degradê: sem legenda, logo branco rolando lê como enfeite, não como experiência.
         */
        <div className="relative z-1 w-full overflow-hidden py-[20px] bg-(image:--grad-brand) hub-wipe-up [--load-delay:1000ms] flex items-center gap-[24px] max-md:flex-col max-md:gap-[12px] max-md:pt-[16px]">
          <p className="m-0 flex-none text-[12px] leading-[1.4] font-semibold tracking-[0.14em] uppercase text-white max-w-[190px] text-balance pl-[max(clamp(16px,4vw,32px),calc(50%-600px+clamp(16px,4vw,32px)))] max-md:max-w-none max-md:px-[16px] max-md:text-center">
            Experiência com marcas como
            <span className="sr-only">: {clientLogos.map((c) => c.name).join(", ")}.</span>
          </p>
          <div aria-hidden="true" className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_72px)] max-md:w-full max-md:[mask-image:none]">
            <Marquee items={clientLogos.map((c) => <MarqueeLogo key={c.name} src={c.src} h={c.h} />)} />
          </div>
        </div>
      )}
    </section>
  );
}
