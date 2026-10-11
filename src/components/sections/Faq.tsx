"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icons";
import { faq } from "@/lib/content";
import { body, displayTitle, h2Size } from "./styles";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="s5-title" className="bg-surface scroll-mt-[var(--header-h,69px)]">
      <div className="max-w-[1200px] mx-auto py-[clamp(64px,9vw,112px)] px-[clamp(16px,4vw,32px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[clamp(32px,5vw,72px)] items-start">
        <h2 id="s5-title" data-reveal="" className={`${displayTitle} ${h2Size} text-ink`}>
          Perguntas frequentes
        </h2>
        <div className="flex flex-col border-t border-line [grid-column:span_1]">
          {faq.map((item, i) => {
            const on = open === i;
            return (
              <div key={item.q} data-reveal="" className="border-b border-line">
                <h3 className="m-0">
                  <button
                    id={`faq-b${i}`}
                    aria-controls={`faq-p${i}`}
                    aria-expanded={on}
                    onClick={() => setOpen((o) => (o === i ? -1 : i))}
                    className="group w-full flex items-center justify-between gap-[16px] py-[22px] px-[4px] [background:none] border-0 cursor-pointer text-left font-[inherit] text-[18px] leading-[1.4] font-semibold text-ink [transition:color_120ms] hover:text-magenta"
                  >
                    {item.q}
                    {/* O item aberto ganha o círculo magenta cheio: o estado muda de forma, não só de cor. */}
                    <span
                      aria-hidden="true"
                      className={`flex-none w-[36px] h-[36px] box-border rounded-[999px] border-[1.5px] flex items-center justify-center [transition:background_200ms_var(--ease-hub),border-color_120ms,color_120ms] ${
                        on ? "bg-magenta border-magenta text-white" : "border-line-strong text-ink group-hover:border-magenta group-hover:text-magenta"
                      }`}
                    >
                      <Icon
                        name="chevron-down"
                        size={20}
                        className={`[transition:transform_200ms] ${on ? "[transform:rotate(180deg)]" : "[transform:none]"}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-p${i}`}
                  role="region"
                  aria-labelledby={`faq-b${i}`}
                  aria-hidden={on ? "false" : "true"}
                  className={`grid [transition:grid-template-rows_280ms_var(--ease-hub),opacity_220ms_ease-out,visibility_280ms] ${
                    on ? "grid-rows-[1fr] opacity-100 visible" : "grid-rows-[0fr] opacity-0 invisible"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className={`pt-0 px-[4px] pb-[24px] ${body} text-body max-w-[620px]`}>
                      {item.pending ? (
                        <span className="bg-[rgba(217,168,78,0.16)] border border-dashed border-gold-ink rounded-[6px] py-[2px] px-[8px] text-ink">
                          {item.a}
                        </span>
                      ) : (
                        item.a
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
