import { BrandLogo } from "@/components/ui/brand-logos";
import { googleReviews, testimonials } from "@/lib/content";
import { DepoimentosColunas } from "./DepoimentosColunas";
import { displayTitle, eyebrow, h2Size, lead } from "./styles";

export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      data-surface="dark"
      aria-labelledby="s-dep-title"
      className="bg-navy text-white scroll-mt-[var(--header-h,69px)]"
    >
      <div className="max-w-[1200px] mx-auto py-[clamp(64px,9vw,112px)] px-[clamp(16px,4vw,32px)]">
        <div className="flex flex-col items-center max-w-[640px] mx-auto text-center">
          <span data-reveal="" className={`${eyebrow} text-white`}>Depoimentos</span>
          <h2 id="s-dep-title" data-reveal="" className={`${displayTitle} ${h2Size} mt-[16px] text-white text-balance`}>
            Quem trabalha com a HUB conta como foi.
          </h2>
          <p data-reveal="" className={`${lead} m-0 mt-5 text-[rgba(255,255,255,0.8)]`}>
            Avaliações do perfil da HUB no Google, com o texto como cada cliente escreveu.
          </p>
          <a
            data-reveal=""
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] text-[14px] leading-[1.45] text-white no-underline [transition:background-color_200ms] hover:bg-[rgba(255,255,255,0.1)]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <BrandLogo name="google" size={13} />
            </span>
            <span className="font-semibold">{googleReviews.rating}</span>
            <span aria-hidden="true" className="text-gold-bright tracking-[0.08em]">★★★★★</span>
            <span className="sr-only">estrelas,</span>
            <span className="text-[rgba(255,255,255,0.8)]">avaliações no Google</span>
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>

        <DepoimentosColunas testimonials={testimonials} />
      </div>
    </section>
  );
}
