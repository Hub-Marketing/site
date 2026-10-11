import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { companyLocation, contactEmail, socialLinks } from "@/lib/content";

/** Link vazio ou "#" não vai ao ar: num site de presença digital, ícone morto é o pior sinal. */
const liveLinks = socialLinks.filter((s) => s.href && s.href !== "#");

export function Footer() {
  return (
    <footer data-surface="dark" className="bg-navy text-[rgba(255,255,255,0.8)]">
      <div className="max-w-[1200px] mx-auto py-[48px] px-[clamp(16px,4vw,32px)] flex flex-wrap items-center justify-between gap-[24px]">
        <div data-reveal="" className="flex flex-wrap items-center gap-x-[clamp(24px,3vw,40px)] gap-y-[20px] min-w-0">
          <a href="#topo" aria-label="HUB Marketing, voltar ao início" className="block flex-none rounded-[8px]">
            <Image
              src="/uploads/logo-branca.svg"
              alt=""
              width={1789}
              height={1168}
              unoptimized
              className="h-[52px] w-auto block"
            />
          </a>
          {/* Contato por escrito: a alternativa visível quando o WhatsApp não é o caminho. */}
          <address className="not-italic flex flex-col gap-[4px] min-w-0 text-[14px] leading-[1.55]">
            <span className="text-pretty">{companyLocation}</span>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="self-start text-white underline decoration-[rgba(255,255,255,0.4)] underline-offset-[0.2em] [overflow-wrap:anywhere] [transition:text-decoration-color_120ms] hover:text-white hover:decoration-white"
              >
                {contactEmail}
              </a>
            )}
          </address>
        </div>
        {liveLinks.length > 0 && (
          <nav aria-label="Contato e redes sociais" data-reveal="" className="flex gap-[8px]">
            {liveLinks.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={external ? s.label + " (abre em nova aba)" : s.label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-[44px] h-[44px] rounded-[999px] border border-[rgba(255,255,255,0.18)] text-white flex items-center justify-center [transition:background_120ms,border-color_120ms,color_120ms] hover:bg-magenta hover:border-magenta hover:text-white"
                >
                  <Icon name={s.icon} size={20} />
                </a>
              );
            })}
          </nav>
        )}
      </div>
      <div className="border-t border-t-[rgba(255,255,255,0.12)]">
        <p className="max-w-[1200px] mx-auto my-0 py-[20px] px-[clamp(16px,4vw,32px)] text-center text-[13px] leading-[1.6]">
          © {new Date().getFullYear()} HUB Marketing. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
