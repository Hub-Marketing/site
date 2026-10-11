import type { ReactNode } from "react";
import { Button, type ButtonOwnProps } from "@/components/ui/Button";
import { ctaUrl } from "@/lib/site-config";

type CtaProps = ButtonOwnProps & { children: ReactNode; className?: string };

/**
 * Link com cara de botão do DS. Todo CTA abre o WhatsApp (`ctaUrl`) em nova aba.
 */
export function CtaButton({ children, ...props }: CtaProps) {
  return (
    <Button {...props} href={ctaUrl} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </Button>
  );
}
