import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { socialLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer data-surface="dark" className="bg-navy text-[rgba(255,255,255,0.8)]">
      <div className="max-w-[1200px] mx-auto py-[48px] px-[clamp(16px,4vw,32px)] flex flex-wrap items-center justify-between gap-[24px]">
        <a href="#topo" data-reveal="" aria-label="HUB Marketing, voltar ao início" className="block rounded-[8px]">
          <Image
            src="/uploads/logo-branca.svg"
            alt=""
            width={1789}
            height={1168}
            unoptimized
            className="h-[52px] w-auto block"
          />
        </a>
        <nav aria-label="Contato e redes sociais" data-reveal="" className="flex gap-[8px]">
          {socialLinks.map((s) => {
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
      </div>
      <div className="border-t border-t-[rgba(255,255,255,0.12)]">
        <p className="max-w-[1200px] mx-auto my-0 py-[20px] px-[clamp(16px,4vw,32px)] text-center text-[13px] leading-[1.6]">
          © 2026 HUB Marketing. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
