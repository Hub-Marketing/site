import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import "./globals.css";

/* O português cabe inteiro no subset latin; o latin-ext só somava arquivos ao preload. */
const fraunces = Fraunces({
  style: "italic",
  weight: "variable",
  axes: ["opsz"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const title = "HUB Marketing | Redes sociais, site, Google Ads e LinkedIn";
const description =
  "Redes sociais, site, Google Ads e LinkedIn trabalhando juntos para que o cliente certo encontre sua empresa, confie nela e feche com você.";

export const metadata: Metadata = {
  title,
  description,
  // Provisório: a logo inteira como ícone até existir um símbolo quadrado.
  icons: { icon: "/uploads/logo-base.svg" },
  openGraph: { title, description, siteName: "HUB Marketing", locale: "pt_BR", type: "website" },
};

/*
 * Roda antes da primeira pintura: liga as entradas por rolagem (html[data-motion])
 * só sem movimento reduzido. Se o JS da página não subir em 4s, desliga e mostra tudo.
 */
const motionBoot = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.setAttribute('data-motion','');setTimeout(function(){if(!d.hasAttribute('data-motion-ready'))d.removeAttribute('data-motion')},4000)}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-motion entra pelo script antes da hidratação.
    <html lang="pt-BR" className={`${fraunces.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
