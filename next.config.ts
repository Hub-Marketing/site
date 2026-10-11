import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A HostGator só serve arquivos estáticos: o build sai em ./out/ e vai por FTP (.github/workflows/deploy.yml).
  output: "export",
  // Sem servidor não há otimização de imagem sob demanda; o next/image entrega o arquivo como está.
  images: { unoptimized: true },
  // Libera o acesso ao dev server pela rede local (ex.: testar no celular).
  allowedDevOrigins: ["192.168.3.237"],
};

export default nextConfig;
