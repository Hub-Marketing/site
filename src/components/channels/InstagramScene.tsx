import type { ReactNode } from "react";
import { Glyph } from "./glyph";

/**
 * Perfil do Instagram (mobile): quem veio pesquisar abre o perfil da "Sua Empresa"
 * (a tela entra pela direita, como no iOS), rola o feed, volta ao topo e toca em "Seguir".
 * Tudo é função de `t` (ms desde o início da rodada).
 */
export const INSTAGRAM_DUR = 7600;
const PUSH = 40;
const S1 = 900;
const S2 = 2350;
const TOP = 3750;
const TAP = 4900;
const FOLLOW = 5060;
const FOLLOWERS = 3412;

const fmt = (n: number) => n.toLocaleString("pt-BR");

/* Posts da grade: a identidade visual consistente que a HUB entrega, em miniatura. */
type Tile = { bg: string; ink: string; text?: string; kind?: "carousel" | "reel"; big?: string };
const TILES: Tile[] = [
  { bg: "#20233F", ink: "#fff", text: "Antes e depois da obra", kind: "carousel" },
  { bg: "#F4F3F6", ink: "#20233F", text: "O que ninguém te conta sobre manutenção" },
  { bg: "var(--grad-brand)", ink: "#fff", text: "Bastidores", kind: "reel" },
  { bg: "#D9A84E", ink: "#20233F", text: "Dica técnica da semana", kind: "carousel" },
  { bg: "#CC1074", ink: "#fff", text: "Entrega da semana" },
  { bg: "#33375A", ink: "#fff", big: "“", text: "Cliente conta como foi" },
  { bg: "#F4F3F6", ink: "#20233F", big: "01", text: "Etapas do projeto", kind: "carousel" },
  { bg: "linear-gradient(160deg,#3A2159,#8A1C68)", ink: "#fff", text: "Equipe em campo", kind: "reel" },
  { bg: "#fff", ink: "#20233F", text: "Perguntas frequentes" },
  { bg: "#8A1C68", ink: "#fff", text: "Como funciona o orçamento", kind: "carousel" },
  { bg: "#20233F", ink: "#E8BE6E", big: "3", text: "passos para pedir orçamento" },
  { bg: "#E9E7EE", ink: "#20233F", text: "Nossa estrutura", kind: "reel" },
];

const HIGHLIGHTS = [
  {
    label: "Obras",
    bg: "#20233F",
    ink: "#fff",
    d: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />,
  },
  {
    label: "Equipe",
    bg: "var(--grad-brand)",
    ink: "#fff",
    d: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />,
  },
  {
    label: "Serviços",
    bg: "#D9A84E",
    ink: "#20233F",
    d: <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />,
  },
  {
    label: "Contato",
    bg: "#CC1074",
    ink: "#fff",
    d: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  },
];

export function InstagramScene({ t, run }: { t: number; run: number }) {
  const live = run > 0;
  const pushing = live && t < 720;

  return (
    <div className="mock-app relative h-full overflow-hidden bg-white text-black">
      {/* Tela anterior (o perfil já seguido) recuando enquanto a nova entra. */}
      {pushing && (
        <div
          className="absolute inset-0 [transition:transform_520ms_cubic-bezier(.2,.8,.2,1),opacity_520ms]"
          style={{ transform: t < PUSH ? "none" : "translateX(-28%)", opacity: t < PUSH ? 1 : 0.7 }}
        >
          <Profile following followers={FOLLOWERS + 1} scrollY={0} />
        </div>
      )}
      <div
        className={`absolute inset-0 bg-white ${live && t >= PUSH ? "[transition:transform_520ms_cubic-bezier(.2,.8,.2,1)]" : ""} ${
          pushing ? "[box-shadow:-10px_0_24px_rgba(0,0,0,0.10)]" : ""
        }`}
        style={{ transform: live && t < PUSH ? "translateX(100%)" : "none" }}
      >
        <Profile
          following={!live || t >= FOLLOW}
          followers={!live || t >= FOLLOW ? FOLLOWERS + 1 : FOLLOWERS}
          rollKey={live && t >= FOLLOW ? run : undefined}
          pressed={live && t >= TAP && t < FOLLOW}
          scrollY={!live || t < S1 ? 0 : t < S2 ? 250 : t < TOP ? 470 : 0}
          smooth={live}
        />
      </div>
    </div>
  );
}

function Profile({
  following,
  followers,
  scrollY,
  pressed = false,
  smooth = false,
  rollKey,
}: {
  following: boolean;
  followers: number;
  scrollY: number;
  pressed?: boolean;
  smooth?: boolean;
  rollKey?: number;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none flex items-center gap-[12px] h-[44px] px-[12px] bg-white z-10">
        <Glyph size={24} sw={2}>
          <path d="m15 18-6-6 6-6" />
        </Glyph>
        <span className="flex-1 text-[16px] font-bold tracking-[-0.01em]">suaempresa</span>
        <Glyph size={22} sw={1.9}>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />
        </Glyph>
        <Glyph size={22} sw={0} fill="currentColor">
          <circle cx="5" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="19" cy="12" r="1.8" />
        </Glyph>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div
          className={smooth ? "[transition:transform_1100ms_cubic-bezier(.12,.7,.18,1)]" : ""}
          style={{ transform: `translateY(${-scrollY}px)` }}
        >
          <div className="flex items-center gap-[16px] px-[16px] pt-[6px]">
            {/* Anel de stories com o degradê do Instagram. */}
            <span className="flex-none w-[80px] h-[80px] rounded-full p-[3px] bg-[linear-gradient(45deg,#F9CE34,#EE2A7B,#6228D7)]">
              <span className="block w-full h-full rounded-full border-[3px] border-white bg-(image:--grad-brand) flex items-center justify-center text-white font-sans font-bold text-[20px] tracking-[-0.02em]">
                SE
              </span>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
              <span className="text-[15px] font-semibold">Sua Empresa</span>
              <div className="flex justify-between gap-[6px] leading-[1.2]">
                <Stat n="248" label="posts" />
                <span className="flex flex-col">
                  <span className="relative block h-[18px] overflow-hidden text-[15px] font-bold">
                    <span key={rollKey} className={rollKey !== undefined ? "block animate-[hub-roll-in_380ms_cubic-bezier(.2,.8,.2,1)]" : "block"}>
                      {fmt(followers)}
                    </span>
                  </span>
                  <span className="text-[12px]">seguidores</span>
                </span>
                <Stat n="186" label="seguindo" />
              </div>
            </div>
          </div>

          <div className="px-[16px] mt-[10px] text-[13px] leading-[1.35]">
            <span className="block text-[#737373]">Serviços para empresas</span>
            <span className="block">Soluções técnicas para indústria e comércio.</span>
            <span className="block">Atendimento em todo o Brasil.</span>
            <span className="flex items-center gap-[4px] font-semibold text-[#00376B]">
              <Glyph size={13} sw={2.4}>
                <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
              </Glyph>
              suaempresa.com.br
            </span>
          </div>

          <div className="flex gap-[6px] px-[16px] mt-[12px] h-[32px] text-[14px] font-semibold">
            <span
              className={`flex-1 rounded-[8px] flex items-center justify-center gap-[4px] transition-[background-color,color,opacity] duration-150 ${
                following ? "bg-[#EFEFEF] text-black" : "bg-[#0095F6] text-white"
              } ${pressed ? "opacity-60" : ""}`}
            >
              {following ? "Seguindo" : "Seguir"}
              {following && (
                <Glyph size={14} sw={2.4}>
                  <path d="m6 9 6 6 6-6" />
                </Glyph>
              )}
            </span>
            <span className="flex-1 rounded-[8px] bg-[#EFEFEF] flex items-center justify-center">Mensagem</span>
            <span className="flex-none w-[32px] rounded-[8px] bg-[#EFEFEF] flex items-center justify-center">
              <Glyph size={16} sw={2.2}>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M19 8v6M22 11h-6" />
                <circle cx="9" cy="7" r="4" />
              </Glyph>
            </span>
          </div>

          <div className="flex gap-[14px] px-[16px] mt-[14px]">
            {HIGHLIGHTS.map((h) => (
              <span key={h.label} className="flex flex-col items-center gap-[4px] w-[60px]">
                <span className="w-[58px] h-[58px] rounded-full border border-[#DBDBDB] p-[3px]">
                  <span className="w-full h-full rounded-full flex items-center justify-center" style={{ background: h.bg }}>
                    <Glyph size={20} color={h.ink} sw={1.9}>
                      {h.d}
                    </Glyph>
                  </span>
                </span>
                <span className="text-[12px]">{h.label}</span>
              </span>
            ))}
          </div>

          <div className="flex mt-[12px] border-t border-[#DBDBDB]">
            {[
              <path key="g" d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />,
              <path key="r" d="M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5zM2 8h20M8 2l3 6M14 2l3 6M10 12l5 3-5 3z" />,
              <path key="t" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />,
            ].map((d, i) => (
              <span
                key={i}
                className={`flex-1 h-[44px] flex items-center justify-center border-b ${i === 0 ? "border-black text-black" : "border-transparent text-[#737373]"}`}
              >
                <Glyph size={22} sw={1.8}>
                  {d}
                </Glyph>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-[2px]">
            {TILES.map((tile, i) => (
              <TileView key={i} tile={tile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <span className="flex flex-col">
      <span className="text-[15px] font-bold">{n}</span>
      <span className="text-[12px]">{label}</span>
    </span>
  );
}

function TileView({ tile }: { tile: Tile }) {
  const icon: ReactNode =
    tile.kind === "carousel" ? (
      <path d="M8 3h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM3 7v12a2 2 0 0 0 2 2h12" />
    ) : tile.kind === "reel" ? (
      <path d="M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5zM2 8h20M8 2l3 6M14 2l3 6M10 12l5 3-5 3z" />
    ) : null;
  return (
    <span
      className={`relative aspect-[3/4] flex flex-col justify-end p-[8px] overflow-hidden ${tile.bg === "#fff" ? "[box-shadow:inset_0_0_0_1px_#EFEFEF]" : ""}`}
      style={{ background: tile.bg, color: tile.ink }}
    >
      {icon && (
        <Glyph size={15} color="#fff" sw={2.2} className="absolute top-[7px] right-[7px] [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.35))]">
          {icon}
        </Glyph>
      )}
      {tile.big && <span className="font-display italic font-semibold text-[34px] leading-[0.9] mb-[4px]">{tile.big}</span>}
      <span className="font-display italic font-semibold text-[13px] leading-[1.1] text-balance">{tile.text}</span>
    </span>
  );
}
