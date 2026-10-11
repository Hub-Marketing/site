import React from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";

export type Testimonial = {
  text: string;
  /** Sem foto, mostra o slot vazio de produção. */
  image?: string;
  name: string;
  /** Cargo · empresa. Avaliações do Google mostram as estrelas no lugar (`stars`). */
  role?: string;
  stars?: number;
};

/**
 * Coluna de depoimentos em rolagem vertical contínua (21st.dev › testimonials-columns-1).
 * A lista é duplicada e sobe 50% em loop, em CSS (`hub-scroll-up`, globals.css), e
 * para com hover, foco ou o botão de pausa da seção. A cópia fica fora do leitor de tela
 * e some com movimento reduzido. A largura do card vem de `--testimonial-w` (padrão 320px).
 */
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  /** Coluna que repete depoimentos de outra: fica fora do leitor de tela. */
  decorative?: boolean;
}) => (
  <div className={props.className} aria-hidden={props.decorative || undefined}>
    {/* Duração por variável, não `animation` inline: o shorthand inline zeraria o play-state das regras de pausa. */}
    <ul
      className="hub-column-track m-0 p-0 list-none flex flex-col gap-6 pb-6 animate-[hub-scroll-up_var(--column-dur)_linear_infinite]"
      style={{ "--column-dur": `${props.duration || 10}s` } as React.CSSProperties}
    >
      {[0, 1].map((index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, image, name, role, stars }, i) => (
            <li
              key={i}
              aria-hidden={index > 0 ? true : undefined}
              className={`box-border p-8 rounded-[16px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] max-w-[var(--testimonial-w,320px)] w-full ${
                index > 0 ? "motion-reduce:hidden" : ""
              }`}
            >
              <figure className="m-0">
                {/* A citação é a voz do cliente: Fraunces itálica, como toda fala no site (The Voz Itálica Rule). */}
                <blockquote className="m-0 font-display italic font-light text-[20px] leading-[1.4] tracking-[-0.01em] text-white text-pretty">
                  {text}
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6">
                  <span className="block h-10 w-10 flex-none rounded-full overflow-hidden [box-shadow:0_0_0_2px_#E85FA8]">
                    <ImageSlot src={image} alt={name} shape="circle" placeholder="" sizes="40px" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[16px] font-semibold leading-[1.35] text-white">{name}</span>
                    {stars ? (
                      <span className="text-[14px] leading-[1.45] tracking-[0.08em] text-gold-bright">
                        <span aria-hidden="true">{"★".repeat(stars)}</span>
                        <span className="sr-only">{stars} estrelas</span>
                      </span>
                    ) : (
                      <span className="text-[14px] leading-[1.45] text-[rgba(255,255,255,0.8)]">{role}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </React.Fragment>
      ))}
    </ul>
  </div>
);
