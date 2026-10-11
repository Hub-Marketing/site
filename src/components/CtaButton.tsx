import type { ReactNode } from "react";
import { Button, type ButtonOwnProps } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { ctaUrl } from "@/lib/site-config";

type CtaProps = ButtonOwnProps & { children: ReactNode; className?: string; iconClassName?: string };

/**
 * Link com cara de botão do DS. Todo CTA abre o WhatsApp (`ctaUrl`) em nova aba, e o
 * ícone do WhatsApp avisa isso antes do clique: sair do site para uma conversa não pode
 * ser surpresa. Rótulos: "Quero meu diagnóstico gratuito" no caminho, "Agendar meu
 * diagnóstico" na chegada (seção Agendar).
 */
export function CtaButton({ children, iconClassName = "", size, ...props }: CtaProps) {
  return (
    <Button
      {...props}
      size={size}
      href={ctaUrl}
      target="_blank"
      rel="noopener noreferrer"
      leadingIcon={<Icon name="whatsapp" size={size === "lg" ? 20 : 16} className={`flex-none ${iconClassName}`} />}
    >
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </Button>
  );
}
