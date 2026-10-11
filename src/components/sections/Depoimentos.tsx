import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { BrandLogo } from "@/components/ui/brand-logos";
import { googleReviews, testimonials } from "@/lib/content";
import { displayTitle, eyebrow, h2Size, lead } from "./styles";

/*
 * Com poucas avaliações, cada coluna leva todas, começando de um ponto diferente:
 * a rolagem em loop precisa de uma lista mais alta que a janela de 740px para não
 * abrir buraco, e no celular (uma coluna só) o visitante vê todas.
 */
const rotate = (n: number) => [...testimonials.slice(n), ...testimonials.slice(0, n)];
const firstColumn = testimonials;
const secondColumn = rotate(2);
const thirdColumn = rotate(4);

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
            O que nossos clientes dizem sobre o trabalho com a gente.
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

        <div
          data-reveal=""
          className="hub-columns flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={55} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={64} decorative />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={59} decorative />
        </div>
      </div>
    </section>
  );
}
