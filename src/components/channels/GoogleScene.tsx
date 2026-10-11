import { BrandLogo } from "@/components/ui/brand-logos";
import { Glyph, Monogram } from "./glyph";

/**
 * Busca no Google (mobile): o comprador apaga a busca anterior, digita a nova,
 * escolhe a sugestão do autocompletar e toca no anúncio da "Sua Empresa".
 * Tudo é função de `t` (ms desde o início da rodada); `run` troca a busca a cada rodada.
 */
const QUERIES = [
  {
    q: "manutenção industrial em bh",
    title: "Manutenção Industrial em BH | Sua Empresa",
    desc: "Equipe técnica própria e atendimento para indústrias. Peça um orçamento sem compromisso.",
  },
  {
    q: "consultoria tributária para empresas",
    title: "Consultoria Tributária para Empresas | Sua Empresa",
    desc: "Planejamento tributário para empresas de médio porte. Fale com um especialista.",
  },
  {
    q: "engenharia elétrica industrial",
    title: "Engenharia Elétrica Industrial | Sua Empresa",
    desc: "Projetos, laudos e manutenção para indústrias de todo o Brasil. Solicite uma visita técnica.",
  },
].map((v) => {
  // Ritmo de quem digita no celular: irregular, com pausa depois de cada palavra.
  const times: number[] = [];
  let acc = 0;
  for (let i = 0; i < v.q.length; i++) {
    acc += 58 + ((i * 37) % 5) * 11 + (v.q[i] === " " ? 90 : 0);
    times.push(acc);
  }
  return { ...v, times, suggestions: [v.q, `${v.q} preço`, `${v.q} perto de mim`] };
});

export const GOOGLE_DUR = 8200;
const FOCUS = 280;
const CLEAR = 460;
const TYPE_START = 760;

export function GoogleScene({ t, run }: { t: number; run: number }) {
  const n = QUERIES.length;
  const cur = QUERIES[run % n];
  const prev = QUERIES[(run + n - 1) % n];
  const live = run > 0;

  const typeEnd = TYPE_START + cur.times[cur.times.length - 1];
  const pick = typeEnd + 360;
  const submit = typeEnd + 640;
  const results = submit + 460;
  const tap = results + 1500;

  let typed = cur.q;
  if (live && t < CLEAR) typed = prev.q;
  else if (live) {
    let k = 0;
    while (k < cur.times.length && TYPE_START + cur.times[k] <= t) k++;
    typed = cur.q.slice(0, k);
  }

  const focused = live && t >= FOCUS && t < submit;
  const typing = live && t >= TYPE_START && t < typeEnd;
  const suggest = focused && t >= TYPE_START && typed.length >= 2;
  const showResults = !live || t < CLEAR || t >= results;
  const shown = live && t < CLEAR ? prev : cur;
  const visited = live && (t < CLEAR ? run > 1 : t >= tap + 160);

  return (
    <div className="mock-google relative h-full bg-white text-[#202124]">
      {/* Barra de carregamento do navegador depois do Enter. */}
      {live && t >= submit && t < submit + 900 && (
        <span key={run} className="absolute top-0 left-0 right-0 h-[3px] bg-[#1A73E8] origin-left z-20 animate-[hub-g-load_820ms_cubic-bezier(.2,.8,.2,1)_forwards]" />
      )}

      <div className="flex items-center gap-[10px] pt-[12px] pb-[8px] px-[12px]">
        <BrandLogo name="google" size={24} className="flex-none" />
        <div
          className={`flex-1 min-w-0 flex items-center gap-[8px] h-[44px] pl-[16px] pr-[12px] rounded-[22px] border transition-[box-shadow,border-color] duration-200 ${
            focused
              ? "border-transparent [box-shadow:0_1px_6px_rgba(32,33,36,0.28)]"
              : "border-[#DFE1E5] [box-shadow:none]"
          }`}
        >
          {/* Em foco, o campo acompanha o fim do texto (como um input real); fora dele, mostra o começo. */}
          <span className={`flex-1 min-w-0 flex overflow-hidden ${focused ? "justify-end" : "justify-start"}`}>
            <span className="flex-none min-w-full flex items-center whitespace-nowrap text-[16px]">
              <span>{typed}</span>
              {focused && (
                <span
                  className={`flex-none w-[2px] h-[20px] ml-[1px] bg-[#1A73E8] ${typing ? "" : "animate-[hub-caret_1s_steps(1)_infinite]"}`}
                />
              )}
            </span>
          </span>
          {typed && (
            <Glyph size={20} color="#5F6368" sw={2} className="flex-none">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </Glyph>
          )}
          <span className="flex-none w-px h-[24px] bg-[#DADCE0]" />
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="flex-none">
            <path fill="#4285F4" d="M12 15c1.66 0 3-1.31 3-2.97V6.03C15 4.37 13.66 3 12 3S9 4.37 9 6.03v5.99C9 13.69 10.34 15 12 15z" />
            <path fill="#34A853" d="M11 18.92h2V22h-2z" />
            <path fill="#F4B400" d="M7 12H5c0 1.97.71 3.77 1.89 5.17l1.42-1.42C7.5 14.72 7 13.42 7 12z" />
            <path fill="#EA4335" d="M12 17c-1.42 0-2.72-.5-3.74-1.32l-1.42 1.42A7.96 7.96 0 0 0 12 19c2.21 0 4.21-.9 5.66-2.34l-1.42-1.42A5.97 5.97 0 0 1 12 17z" />
            <path fill="#4285F4" d="M17 12c0 1.38-.56 2.63-1.46 3.54l1.42 1.42A7.96 7.96 0 0 0 19 12h-2z" />
          </svg>
        </div>
        <span className="flex-none w-[30px] h-[30px] rounded-full bg-[#E8EAED] flex items-end justify-center overflow-hidden">
          <Glyph size={24} color="#9AA0A6" fill="#9AA0A6" sw={0} className="translate-y-[4px]">
            <circle cx="12" cy="8" r="4.5" />
            <path d="M3.5 22c0-4.7 3.8-8 8.5-8s8.5 3.3 8.5 8z" />
          </Glyph>
        </span>
      </div>

      <div className="flex gap-[20px] px-[16px] border-b border-[#EBEBEB] text-[13px] text-[#5F6368] whitespace-nowrap overflow-hidden">
        {["Todas", "Imagens", "Vídeos", "Notícias", "Maps"].map((tab, i) => (
          <span
            key={tab}
            className={`py-[10px] border-b-[3px] ${i === 0 ? "border-[#1F1F1F] text-[#1F1F1F] font-bold" : "border-transparent"}`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div
        className={`px-[16px] pt-[16px] transition-[opacity,transform] ${
          showResults ? "opacity-100 translate-y-0 duration-[380ms] ease-out" : "opacity-0 translate-y-[8px] duration-150"
        }`}
      >
        <span className="block text-[12px] font-bold">Patrocinado</span>
        <div className="flex items-center gap-[10px] mt-[8px]">
          <span className="flex-none w-[28px] h-[28px] rounded-full bg-[#F1F3F4] border border-[#E3E3E3] flex items-center justify-center">
            <Monogram size={18} radius="5px" text={8} />
          </span>
          <span className="flex-1 min-w-0 flex flex-col leading-[1.3]">
            <span className="text-[14px]">Sua Empresa</span>
            <span className="text-[12px] text-[#4D5156] truncate">https://www.suaempresa.com.br</span>
          </span>
          <Glyph size={18} color="#4D5156" fill="#4D5156" sw={0} className="flex-none">
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </Glyph>
        </div>
        <span className="relative block mt-[8px] -mx-[6px] px-[6px] rounded-[6px] overflow-hidden">
          <span
            className={`block text-[18px] leading-[1.3] transition-colors duration-150 ${visited ? "text-[#681DA8]" : "text-[#1A0DAB]"} ${
              live && t >= tap && t < tap + 520 ? "underline" : ""
            }`}
          >
            {shown.title}
          </span>
          {live && t >= tap && t < tap + 700 && (
            <span
              key={run}
              className="absolute left-[34%] top-1/2 w-[260px] h-[260px] -ml-[130px] -mt-[130px] rounded-full bg-[rgba(32,33,36,0.12)] animate-[hub-ripple_640ms_cubic-bezier(.2,.8,.2,1)_forwards]"
            />
          )}
        </span>
        <p className="m-0 mt-[4px] text-[14px] leading-[1.55] text-[#4D5156] line-clamp-2">{shown.desc}</p>
        <div className="flex gap-[8px] mt-[12px] overflow-hidden">
          {["Orçamento", "Serviços", "Contato"].map((s) => (
            <span key={s} className="flex-none px-[14px] py-[6px] rounded-full border border-[#DADCE0] text-[13px] text-[#1A0DAB]">
              {s}
            </span>
          ))}
        </div>
        <div aria-hidden="true" className="flex flex-col gap-[8px] mt-[22px] pt-[18px] border-t border-[#EBEBEB] opacity-70">
          <span className="flex items-center gap-[10px]">
            <span className="w-[28px] h-[28px] rounded-full bg-[#F1F3F4]" />
            <span className="h-[9px] w-[38%] rounded-full bg-[#E8EAED]" />
          </span>
          <span className="h-[11px] w-[72%] rounded-full bg-[#D2D7F4]" />
          <span className="h-[8px] w-[94%] rounded-full bg-[#ECEDEF]" />
          <span className="h-[8px] w-[66%] rounded-full bg-[#ECEDEF]" />
        </div>
      </div>

      {/* Autocompletar: o trecho digitado fica normal e o complemento em negrito, como no Google. */}
      <div
        className={`absolute left-0 right-0 top-[64px] bottom-0 bg-white z-10 pt-[6px] transition-opacity duration-150 ${
          suggest ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {cur.suggestions.map((s, i) => (
          <div
            key={s}
            className={`flex items-center gap-[14px] h-[48px] px-[18px] transition-colors duration-100 ${
              i === 0 && live && t >= pick ? "bg-[#F1F3F4]" : ""
            }`}
          >
            <Glyph size={18} color="#9AA0A6" sw={2.2} className="flex-none">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </Glyph>
            <span className="flex-1 min-w-0 truncate text-[15px]">
              {typed}
              <b className="font-bold">{s.startsWith(typed) ? s.slice(typed.length) : s}</b>
            </span>
            <Glyph size={18} color="#9AA0A6" sw={2} className="flex-none">
              <path d="M7 17V7h10" />
              <path d="M7 7l10 10" />
            </Glyph>
          </div>
        ))}
      </div>
    </div>
  );
}
