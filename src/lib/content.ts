import type { BrandName } from "@/components/ui/brand-logos";
import type { Testimonial } from "@/components/ui/testimonials-columns-1";
import { ctaUrl } from "./site-config";

export type IconName =
  | "search" | "briefcase" | "instagram" | "messages" | "monitor"
  | "whatsapp" | "mail" | "linkedin";

export const pillars: { brand: BrandName; title: string; text: string }[] = [
  { brand: "google", title: "Google: quem já está procurando te encontra.", text: "Anúncios e site aparecem na hora em que o cliente digita o problema que você resolve." },
  { brand: "linkedin", title: "LinkedIn: você chega em quem decide.", text: "Conteúdo e anúncios que colocam sua empresa na frente de diretores, gestores e donos de empresa." },
  { brand: "instagram", title: "Instagram: a decisão se sustenta.", text: "Quando a pessoa vem pesquisar, ela encontra uma empresa do tamanho que você realmente é." },
];

/** `role`: a função de cada serviço no sistema, na mesma tese dos pilares do Jeito HUB. */
export const services: { icon: IconName; title: string; role: string; text: string }[] = [
  { icon: "messages", title: "Gestão de redes sociais", role: "A decisão se sustenta.", text: "Estratégia, conteúdo e design para o Instagram da sua empresa mostrar o que ela realmente é. Seu serviço técnico vira conteúdo que gera confiança, não post genérico de data comemorativa." },
  { icon: "monitor", title: "Criação de site", role: "Onde o cliente confirma.", text: "Um site rápido, claro e feito para gerar contato. É para onde seus anúncios levam e onde o cliente confirma que está no lugar certo." },
  { icon: "search", title: "Google Ads", role: "Quem procura te encontra.", text: "Sua empresa aparece para quem está procurando agora o que você vende. Campanhas acompanhadas de perto, com relatório que mostra quanto custou cada contato." },
  { icon: "briefcase", title: "LinkedIn e LinkedIn Ads", role: "Você chega em quem decide.", text: "Perfil e página da empresa que mostram a autoridade que vocês já têm, conteúdo para quem decide e anúncios segmentados por cargo, setor e tamanho de empresa. Ideal para quem vende para outras empresas." },
];

export const steps: { label: string; title: string; text: string }[] = [
  { label: "Diagnóstico", title: "Diagnóstico.", text: "Analisamos seu Instagram, LinkedIn, site e presença no Google. Você sai da conversa sabendo onde está perdendo negócios, mesmo que não feche com a gente." },
  { label: "Plano", title: "Plano.", text: "Montamos uma proposta com os canais que fazem sentido para o seu momento. Nada de pacote empurrado." },
  { label: "Implantação", title: "Implantação.", text: "Ajustamos perfis, site e contas de anúncio. As contas ficam no nome da sua empresa, sempre." },
  { label: "Execução", title: "Execução.", text: "Conteúdo, campanhas e otimizações rodando todo mês, sem você precisar cobrar ninguém." },
  { label: "Resultado na mesa", title: "Resultado na mesa.", text: "Uma reunião mensal com números claros: alcance, contatos, custo por contato e o que vamos mudar no mês seguinte." },
];

/**
 * Abas dos cases. "Site" vira galeria; as outras são carrossel. Google Ads volta quando houver case.
 * O LinkedIn abre primeiro: é o case B2B com antes e depois, o que o título da seção promete.
 */
export const channels = ["LinkedIn", "Redes sociais", "Site"] as const;
export type Channel = (typeof channels)[number];

export type CaseItem = {
  id: string;
  channel: Exclude<Channel, "Site">;
  client: string;
  segment: string;
  challenge: string;
  solution: string;
  metrics: { v: string; l: string }[];
  /** Print do perfil em 4:3 (public/uploads/cases). Sem ela, o card mostra o espaço vazio. */
  image?: { src: string; alt: string };
};

/**
 * Cases dos canais de carrossel, um por canal por enquanto.
 * OrdecarGO: relatório de 18/09/2026 (LinkedIn Analytics). Perfil do Jonathan em 90 dias contra os
 * 90 anteriores; página de 19/06 a 16/09, comparando julho com setembro (setembro só até o dia 16).
 * Cristiane Costa: relatório de 28/05 a 24/08/2026 (Instagram Insights), em média mensal contra o
 * diagnóstico inicial. Nenhum dos dois relatórios traz lead fechado, então as métricas são de alcance.
 */
export const cases: CaseItem[] = [
  {
    id: "ordecargo",
    channel: "LinkedIn",
    client: "OrdecarGO",
    segment: "Terceirização logística · Belo Horizonte e região",
    challenge:
      "O Jonathan é dono da OrdecarGO, e o perfil pessoal dele no LinkedIn estava parado: tinha aparecido cerca de 13 vezes em 90 dias. A página da empresa quase não aparecia para quem decide sobre a operação de um CD.",
    solution:
      "Diagnóstico, personas e posicionamento antes do primeiro post. Depois, o perfil pessoal do Jonathan virou o motor que abre portas e a página, a prova de que a empresa é séria. Tudo orgânico, sem anúncio.",
    metrics: [
      { v: "1.123", l: "aparições do perfil em 90 dias (antes, cerca de 13)" },
      { v: "8x", l: "mais aparições da página da empresa, de julho a setembro" },
      { v: "73%", l: "das pessoas alcançadas não eram conexões dele" },
    ],
    image: { src: "/uploads/cases/li-ordecargo.webp", alt: "Perfil pessoal de Jonathan Goncalves, dono da OrdecarGO, no LinkedIn" },
  },
  {
    id: "cristiane-costa",
    channel: "Redes sociais",
    client: "Cristiane Costa",
    segment: "Advocacia · Contagem e Belo Horizonte",
    challenge:
      "Perfil parado: chegava a só 10 contas por mês e não tinha nenhuma interação. O alcance era tão baixo que o Instagram nem mostrava quem era o público.",
    solution:
      "Três meses de estratégia e conteúdo no Instagram. Hoje mais de 44% do público está em Contagem e BH, a maior parte mulheres de 35 a 54 anos: justamente quem lida com inventário e sucessão.",
    metrics: [
      { v: "41x", l: "mais pessoas alcançadas por mês" },
      { v: "18x", l: "mais visualizações por mês" },
      { v: "133", l: "interações por mês, partindo de zero" },
    ],
    image: { src: "/uploads/cases/ig-cristiane-costa.webp", alt: "Perfil @cristianecosta_advogada no Instagram" },
  },
];

export type SiteCase = {
  id: string;
  client: string;
  segment: string;
  /** Print da página inteira a 1200px de largura (public/uploads/cases). */
  image: { src: string; width: number; height: number };
};

/** Sites entregues, na ordem da galeria. */
export const siteCases: SiteCase[] = [
  { id: "cruzeiro", client: "Cruzeiro", segment: "Futebol · Belo Horizonte", image: { src: "/uploads/cases/site-cruzeiro.webp", width: 1200, height: 5015 } },
  { id: "setta", client: "Setta Digital Labs", segment: "Indústria 4.0", image: { src: "/uploads/cases/site-setta.webp", width: 1200, height: 6457 } },
  { id: "terrace", client: "Terrace Santa Lúcia", segment: "Lançamento imobiliário · Belo Horizonte", image: { src: "/uploads/cases/site-terrace.webp", width: 1200, height: 6304 } },
  { id: "alta-vista", client: "Alta Vista", segment: "Loteamento · Divinópolis", image: { src: "/uploads/cases/site-alta-vista.webp", width: 1200, height: 3537 } },
  { id: "reserva-do-ouro", client: "Reserva do Ouro", segment: "Condomínio de lotes · Nova Lima", image: { src: "/uploads/cases/site-reserva-do-ouro.webp", width: 1200, height: 3636 } },
  { id: "tadd-system", client: "TADD System", segment: "Biosseguridade no transporte animal", image: { src: "/uploads/cases/site-teddsystem.webp", width: 1200, height: 5125 } },
  { id: "lz-mkt", client: "LZ MKT", segment: "Agência de marketing", image: { src: "/uploads/cases/site-lzmkt.webp", width: 1200, height: 4088 } },
];

/** Perfil da HUB no Google Maps, de onde vêm os depoimentos abaixo. */
export const googleReviews = {
  rating: "5,0",
  url: "https://www.google.com/maps?cid=10670738822642882769",
};

/**
 * Avaliações do perfil da HUB no Google (todas 5 estrelas), com o texto como o cliente
 * escreveu; só o erro de digitação de "Instagram" foi corrigido. A avaliação da Deyse Isidio
 * ficou de fora porque tem só as estrelas, sem texto. Fotos em public/uploads/depoimentos.
 */
export const testimonials: Testimonial[] = [
  {
    text: "A Gabriela superou as minhas expectativas: remodelou todo o meu Instagram e me deu várias dicas de como me posicionar melhor nas redes sociais. Profissional de extrema qualidade com rapidez e valores que se adequam às necessidades das pessoas. Recomendo fortemente seus serviços. Gratidão!!",
    name: "Eugenia Raposo",
    stars: 5,
    image: "/uploads/depoimentos/eugenia-raposo.png",
  },
  {
    text: "Não tenho nem palavras pra descrever como mudou a história da minha marca. Parabéns. Recomendo muito.",
    name: "Murilo Rodrigues Santana",
    stars: 5,
    image: "/uploads/depoimentos/murilo-santana.png",
  },
  {
    text: "Estou muito satisfeita com o trabalho da agência. Eles entendem minhas necessidades, e sempre trazem ideias que ajudam meu negócio a crescer.",
    name: "B Costa",
    stars: 5,
    image: "/uploads/depoimentos/b-costa.png",
  },
  {
    text: "Uma das pessoas mais competentes que eu já tive o prazer de trabalhar! Competente, dedicada e sempre traz os melhores resultados pro que a gente precisa. Parabéns pela competência!!! Contratarei mais vezes com certeza.",
    name: "Gabrielle Vasconcelos",
    stars: 5,
    image: "/uploads/depoimentos/gabrielle-vasconcelos.png",
  },
  {
    text: "Agência sensacional! Sempre trazem ideias fora da caixa que a gente nem imaginava. Sem contar com o atendimento e suporte, que são incríveis.",
    name: "Keven Pacheco",
    stars: 5,
    image: "/uploads/depoimentos/keven-pacheco.png",
  },
  {
    text: "Melhor de Minas.",
    name: "Luís Felipe",
    stars: 5,
    image: "/uploads/depoimentos/luis-felipe.png",
  },
];

export const faq: { q: string; a: string; pending?: boolean }[] = [
  { q: "Preciso contratar todos os serviços?", a: "Não. O diagnóstico mostra quais canais fazem sentido agora. Algumas empresas começam por um e ampliam depois." },
  { q: "Em quanto tempo vejo resultado?", a: "Google Ads costuma gerar contatos já no primeiro mês. Redes sociais e LinkedIn constroem autoridade, e os efeitos aparecem com mais força a partir do terceiro mês." },
  { q: "As contas de anúncio e o site ficam no meu nome?", a: "Sim, sempre. Se um dia a gente parar de trabalhar juntos, tudo continua sendo da sua empresa." },
  { q: "Como sei se está funcionando?", a: "Todo mês você recebe um relatório e participa de uma reunião com os números: alcance, contatos, custo por contato e o que muda no mês seguinte." },
  { q: "Vocês atendem empresas fora de Belo Horizonte?", a: "Sim. O atendimento é online, para empresas de todo o Brasil. A sede da HUB fica em Belo Horizonte." },
  { q: "Quanto custa?", a: "Depende dos canais e do volume. Você recebe a proposta depois do diagnóstico, já com escopo e valores definidos." },
];

export const marqueeWords = ["Redes sociais", "Site", "Google Ads", "LinkedIn"];

/**
 * Marcas com que a fundadora trabalhou antes da HUB (não são clientes da HUB, por isso a legenda
 * fala em "experiência"), no marquee da base do hero (arquivos em public/uploads/clientes).
 * A faixa pinta todos de branco; `h` é a altura em px, ajustada para os logos terem o mesmo peso visual.
 * O logo da Cotemig é um só e já assina "Colégio e Faculdade".
 */
export const clientLogos: { name: string; src: string; h: number }[] = [
  { name: "Sicoob", src: "/uploads/clientes/sicoob.svg", h: 30 },
  { name: "Colégio e Faculdade Cotemig", src: "/uploads/clientes/cotemig.svg", h: 46 },
  { name: "Lions Mutual", src: "/uploads/clientes/lions-mutual.png", h: 40 },
  { name: "AngloGold Ashanti", src: "/uploads/clientes/anglogold-ashanti.svg", h: 44 },
  { name: "ArcelorMittal", src: "/uploads/clientes/arcelormittal.svg", h: 40 },
];

/** E-mail de contato, visível no rodapé como alternativa ao WhatsApp. Vazio = não aparece. */
export const contactEmail = "hubmarketingepublicidade@gmail.com";

/** Linha institucional do rodapé (a sede e o alcance vêm do FAQ e do PRODUCT.md). */
export const companyLocation = "Belo Horizonte, MG · Atendimento online para todo o Brasil";

/** Ícones do rodapé. Um `href` vazio ou "#" esconde o ícone: link que não leva a lugar nenhum não vai ao ar. */
export const socialLinks: { label: string; icon: IconName; href: string }[] = [
  { label: "Falar com a HUB no WhatsApp", icon: "whatsapp", href: ctaUrl },
  { label: "Enviar e-mail para a HUB", icon: "mail", href: contactEmail ? `mailto:${contactEmail}` : "" },
  { label: "HUB no Instagram", icon: "instagram", href: "https://www.instagram.com/hubmarketingagenciaa/" },
  { label: "HUB no LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/agencia-hub-marketing/" },
];
