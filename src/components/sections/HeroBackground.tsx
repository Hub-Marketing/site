import { siteConfig } from "@/lib/site-config";

const blobBase = "absolute rounded-[50%] [filter:blur(80px)] will-change-transform";

const darkBlobs = [
  "w-[60vw] h-[60vw] -left-[10vw] -top-[25vw] bg-plum-deep opacity-[0.9] animate-[hub-b1_22s_ease-in-out_infinite]",
  "w-[50vw] h-[50vw] -right-[12vw] -top-[5vw] bg-magenta opacity-[0.4] animate-[hub-b2_18s_ease-in-out_infinite]",
  "w-[42vw] h-[42vw] right-[10vw] -bottom-[20vw] bg-magenta-deep opacity-[0.7] animate-[hub-b3_26s_ease-in-out_infinite]",
  "w-[22vw] h-[22vw] left-[35vw] -bottom-[6vw] bg-gold opacity-[0.28] animate-[hub-b4_20s_ease-in-out_infinite]",
];

/*
 * Hero claro: o degradê é o visual da dobra. Os blobs moram num campo preso ao
 * canto inferior direito e derivam devagar (keyframes hub-g*, em % do próprio blob),
 * então o brilho sobe por trás do CTA e do marquee sem invadir a manchete.
 */
const glowBlobs = [
  "w-[56%] aspect-square left-[28%] top-[26%] bg-plum-deep opacity-[0.40] animate-[hub-g1_26s_ease-in-out_infinite]",
  "w-[46%] aspect-square left-[50%] top-[6%] bg-magenta opacity-[0.30] animate-[hub-g2_22s_ease-in-out_infinite]",
  "w-[36%] aspect-square left-[16%] top-[46%] bg-gold opacity-[0.32] animate-[hub-g3_30s_ease-in-out_infinite]",
  "w-[30%] aspect-square left-[64%] top-[48%] bg-magenta-deep opacity-[0.36] animate-[hub-g1_34s_ease-in-out_infinite_reverse]",
];

/** Fundo do hero: vídeo (se configurado), blobs sobre navy (escuro) ou brilho em degradê sobre branco (claro). */
export function HeroBackground({ dark }: { dark: boolean }) {
  const vid = siteConfig.heroVideo.trim();
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {vid ? (
        <video src={vid} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      ) : dark ? (
        darkBlobs.map((cls, i) => <div key={i} className={`${blobBase} ${cls}`} />)
      ) : (
        <>
          {/* O brilho floresce devagar enquanto a manchete sobe. */}
          <div className="hub-bloom [--load-delay:200ms] absolute w-[max(1240px,150vw)] md:w-[min(1320px,96vw)] aspect-[1.25] -right-[45%] md:-right-[14%] -bottom-[180px] md:-bottom-[34%]">
            {glowBlobs.map((cls, i) => (
              <div key={i} className={`absolute rounded-[50%] [filter:blur(90px)] will-change-transform ${cls}`} />
            ))}
          </div>
          {/* Véu de leitura: branco limpo onde a manchete mora (alto no mobile, alto-esquerda no desktop). */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff_0%,#fff_66%,rgba(255,255,255,0)_92%)] md:bg-[linear-gradient(180deg,#fff_0%,rgba(255,255,255,0.85)_30%,rgba(255,255,255,0)_62%),linear-gradient(95deg,#fff_0%,rgba(255,255,255,0.9)_32%,rgba(255,255,255,0)_58%)]" />
          {/* Base: o brilho se dissolve no cinza-lavanda da seção seguinte, sem corte na emenda. */}
          <div className="absolute inset-x-0 bottom-0 h-[clamp(220px,34%,340px)] bg-[linear-gradient(180deg,rgba(244,243,246,0)_0%,rgba(244,243,246,0.55)_45%,rgba(244,243,246,0.92)_80%,#F4F3F6_100%)]" />
        </>
      )}
      {dark && (
        <div
          className={`absolute inset-0 ${
            vid
              ? "bg-[linear-gradient(125deg,rgba(32,35,63,0.92)_0%,rgba(58,33,89,0.78)_40%,rgba(138,28,104,0.6)_75%,rgba(179,25,110,0.45)_100%)]"
              : "bg-[linear-gradient(90deg,rgba(32,35,63,0.55)_0%,rgba(32,35,63,0)_60%)]"
          }`}
        />
      )}
    </div>
  );
}
