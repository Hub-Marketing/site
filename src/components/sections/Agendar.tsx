import { CtaButton } from "@/components/CtaButton";
import { siteConfig } from "@/lib/site-config";
import { caption, lead } from "./styles";

export function Agendar() {
  return (
    <section
      id="agendar"
      data-surface="dark"
      aria-labelledby="s6-title"
      className="bg-(image:--grad-brand) text-white scroll-mt-[var(--header-h,69px)]"
    >
      <div className="max-w-[960px] mx-auto py-[clamp(72px,10vw,128px)] px-[clamp(16px,4vw,32px)] flex flex-col items-center text-center gap-[28px]">
        <h2 id="s6-title" data-reveal="" className="m-0 font-display italic font-semibold text-[clamp(36px,5.4vw,66px)] leading-[1.05] tracking-[-0.02em] text-white text-balance">
          Quem te indica já fala bem de você. <span data-beat="" className="text-gold-hl">Falta o digital confirmar.</span>
        </h2>
        <p data-reveal="" className={`m-0 ${lead} text-[rgba(255,255,255,0.88)] max-w-[640px]`}>
          Diagnóstico gratuito, online, em 40 minutos. A gente analisa seu Instagram, LinkedIn, site e Google, e você sai sabendo onde está perdendo negócios e o que dá pra resolver primeiro.
        </p>
        {/* Botão e microcopy formam um grupo só, com o mesmo aperto de 14px do hero. */}
        <div data-reveal="" className="flex flex-col items-center gap-[14px]">
          <CtaButton variant={siteConfig.finalButton} size="lg">
            Agendar meu diagnóstico
          </CtaButton>
          <p className={`m-0 ${caption} text-[rgba(255,255,255,0.8)] max-w-[520px] text-balance`}>
            Sem compromisso. O botão abre o WhatsApp com a mensagem pronta, e o diagnóstico é seu mesmo que você não feche com a HUB.
          </p>
        </div>
      </div>
    </section>
  );
}
