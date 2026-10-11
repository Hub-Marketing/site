import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Agendar } from "@/components/sections/Agendar";
import { Cases } from "@/components/sections/Cases";
import { ComoTrabalhamos } from "@/components/sections/ComoTrabalhamos";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { JeitoHub } from "@/components/sections/JeitoHub";
import { Servicos } from "@/components/sections/Servicos";

export default function Home() {
  return (
    <>
      <Header />
      <main id="topo">
        <Hero />
        <JeitoHub />
        <Servicos />
        <ComoTrabalhamos />
        <Cases />
        <Depoimentos />
        <Faq />
        <Agendar />
      </main>
      <Footer />
    </>
  );
}
