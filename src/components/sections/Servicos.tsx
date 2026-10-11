import { CtaButton } from "@/components/CtaButton";
import { ServicosBoard } from "./ServicosBoard";
import { container, displayTitle, eyebrow, h2Size } from "./styles";

export function Servicos() {
  return (
    <section id="servicos" aria-labelledby="s3-title" className="bg-white scroll-mt-[var(--header-h,69px)]">
      <div className={`${container} flex flex-col gap-[clamp(36px,5vw,56px)]`}>
        <div className="flex flex-col gap-[16px] max-w-[820px]">
          <span data-reveal="" className={`${eyebrow} text-magenta`}>Serviços</span>
          <h2 id="s3-title" data-reveal="" className={`${displayTitle} ${h2Size} text-ink text-balance`}>
            Tudo o que sua presença digital precisa, com uma pessoa cuidando do todo.
          </h2>
        </div>
        <ServicosBoard />
        <div data-reveal="" className="flex justify-center">
          <CtaButton variant="secondary" size="lg">
            Quero entender o que faz sentido pra minha empresa
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
