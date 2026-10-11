"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/lib/content";
import { scrollToCenter } from "@/lib/scroll";
import { bodyLg, displayTitle, eyebrow, h2Size } from "./styles";

export function ComoTrabalhamos() {
  const [step, setStep] = useState(0);
  const stepEls = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = stepEls.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const i = els.indexOf(en.target as HTMLLIElement);
          if (i >= 0) setStep(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const last = steps.length - 1;

  return (
    <section id="como-trabalhamos" aria-labelledby="s4-title" className="bg-surface scroll-mt-[var(--header-h,69px)]">
      <div className="max-w-[1200px] mx-auto py-[clamp(64px,9vw,112px)] px-[clamp(16px,4vw,32px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(32px,6vw,96px)] items-start">
        <div
          data-hub-steps-aside=""
          className="sticky top-[var(--header-h,69px)] flex flex-col gap-[40px] py-[24px] px-0 max-[860px]:static! max-[860px]:p-0!"
        >
          <div className="flex flex-col gap-[16px]">
            <span data-reveal="" className={`${eyebrow} text-magenta`}>Como trabalhamos</span>
            <h2 id="s4-title" data-reveal="" className={`${displayTitle} ${h2Size} text-ink text-balance`}>
              Você sabe o que vai acontecer em cada etapa.
            </h2>
          </div>
          <div data-hub-steps-nav="" data-reveal="" className="relative max-[860px]:hidden!">
            <span aria-hidden="true" className="absolute left-[17px] top-[24px] bottom-[24px] w-[2px] bg-track rounded-[2px]"></span>
            <span
              aria-hidden="true"
              className="absolute left-[17px] top-[24px] w-[2px] bg-magenta rounded-[2px] [transition:height_450ms_var(--ease-hub)]"
              style={{ height: `calc((100% - 48px) * ${step / last})` }}
            ></span>
            <ol className="list-none m-0 p-0 flex flex-col gap-[12px]">
              {steps.map((s, i) => (
                <li key={s.label}>
                  <button
                    aria-current={i === step ? "step" : undefined}
                    onClick={() => {
                      const el = stepEls.current[i];
                      if (el) scrollToCenter(el);
                    }}
                    className={`flex items-center gap-[16px] [background:none] border-0 py-[6px] px-0 cursor-pointer font-[inherit] text-left [transition:color_300ms_ease-out] ${
                      i <= step ? "text-ink" : "text-muted"
                    }`}
                  >
                    <span
                      className={`relative z-1 w-[36px] h-[36px] flex-none rounded-[999px] flex items-center justify-center text-[13px] font-semibold border-[1.5px] [transition:background_300ms_ease-out,color_300ms_ease-out,border-color_300ms_ease-out] ${
                        i <= step ? "border-magenta" : "border-line-strong"
                      } ${i === step ? "bg-magenta text-white" : i < step ? "bg-white text-ink" : "bg-surface text-muted"}`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[16px] font-semibold">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <ol className="list-none m-0 p-0 flex flex-col">
          {steps.map((s, i) => {
            const final = i === last;
            return (
              <li
                key={s.label}
                ref={(el) => {
                  stepEls.current[i] = el;
                }}
                data-hub-step=""
                // No desktop a própria rolagem já conduz os cards; a entrada vale só no celular.
                data-reveal="narrow"
                className="min-h-[62vh] flex items-center max-[860px]:min-h-0! max-[860px]:py-[10px]"
              >
                <div
                  className={`w-full box-border border rounded-[16px] p-[clamp(32px,4vw,56px)] flex flex-col gap-[16px] [transition:opacity_900ms_var(--ease-hub)_150ms,transform_900ms_var(--ease-hub)_150ms] max-[860px]:opacity-100! max-[860px]:[transform:none]! ${
                    final
                      ? "bg-(image:--grad-brand) border-transparent [box-shadow:0_16px_40px_rgba(32,35,63,0.18)]"
                      : "bg-white border-line [box-shadow:0_16px_40px_rgba(32,35,63,0.08)]"
                  } ${
                    i === step
                      ? "opacity-100 [transform:translateY(0)_scale(1)]"
                      : i < step
                        ? "opacity-[0.35] [transform:translateY(-16px)_scale(0.97)]"
                        : "opacity-[0.2] [transform:translateY(40px)_scale(0.97)]"
                  }`}
                >
                  <span
                    className={`font-display italic font-semibold text-[clamp(72px,9vw,120px)] leading-[0.9] tracking-[-0.02em] ${
                      final ? "text-gold-hl" : "text-ink"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`mt-[8px] mb-0 mx-0 text-[clamp(24px,2.4vw,30px)] leading-[1.2] font-bold ${final ? "text-white" : "text-ink"}`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`m-0 ${bodyLg} max-w-[520px] ${
                      final ? "text-[rgba(255,255,255,0.82)]" : "text-body"
                    }`}
                  >
                    {s.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
