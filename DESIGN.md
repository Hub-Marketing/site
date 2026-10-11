---
name: HUB Marketing
description: Landing da HUB Marketing — presença digital que confirma a reputação que a indicação já construiu.
colors:
  navy-diretoria: "#20233F"
  navy-hover: "#33375A"
  navy-press: "#1B1E37"
  magenta-hub: "#CC1074"
  magenta-light: "#E85FA8"
  magenta-hover: "#A80D5F"
  magenta-button-hover: "#B3196E"
  magenta-deep: "#8A1C68"
  plum-deep: "#3A2159"
  ouro-destaque: "#D9A84E"
  gold-highlight: "#E8BE6E"
  gold-bright: "#F2C879"
  gold-light: "#E8B36A"
  gold-ink: "#C9973A"
  ink-2: "#3E4160"
  text-body: "#4A4D68"
  text-muted: "#5E6178"
  line: "#E9E7EE"
  line-strong: "#D5D3DD"
  track: "#E2E0E8"
  surface: "#F4F3F6"
  paper: "#FFFFFF"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(42px, 6.6vw, 92px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(34px, 4.6vw, 56px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(72px, 9vw, 120px)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  quote:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(26px, 3vw, 38px)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title-lg:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(24px, 2.4vw, 30px)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
  lead:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(18px, 1.6vw, 20px)"
    fontWeight: 400
    lineHeight: 1.65
  body-lg:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.14em"
  label-sm:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.14em"
  button:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  sm: "8px"
  button-md: "10px"
  md: "12px"
  lg: "16px"
  sheet: "32px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  card-gap: "20px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  gutter: "clamp(16px, 4vw, 32px)"
  section-y: "clamp(64px, 9vw, 112px)"
  section-y-final: "clamp(72px, 10vw, 128px)"
  card-padding: "clamp(28px, 3vw, 40px)"
components:
  button-primary:
    backgroundColor: "{colors.magenta-hub}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "13px 30px"
  button-primary-hover:
    backgroundColor: "{colors.magenta-button-hover}"
  button-primary-active:
    backgroundColor: "{colors.magenta-deep}"
  # O fundo real é o gradiente da marca (--grad-brand); o navy é a primeira parada da rampa. Ver .impeccable/design.json.
  button-secondary:
    backgroundColor: "{colors.navy-diretoria}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "13px 30px"
  button-gold:
    backgroundColor: "{colors.ouro-destaque}"
    textColor: "{colors.navy-diretoria}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "13px 30px"
  button-gold-hover:
    backgroundColor: "{colors.gold-light}"
  button-gold-active:
    backgroundColor: "{colors.gold-ink}"
  button-md:
    rounded: "{rounded.button-md}"
    padding: "9px 22px"
  button-sm:
    rounded: "{rounded.sm}"
    padding: "6px 16px"
  button-header:
    backgroundColor: "{colors.navy-diretoria}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "6px 16px"
    height: "44px"
  nav-link:
    textColor: "{colors.navy-diretoria}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  # Também no gradiente da marca, como o button-secondary.
  card-final-step:
    backgroundColor: "{colors.navy-diretoria}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "clamp(32px, 4vw, 56px)"
  card-testimonial:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "32px"
    width: "320px"
  channel-mock:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    width: "420px"
    height: "440px"
  filter-tabs:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "6px"
  filter-tab:
    textColor: "{colors.text-body}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  filter-tab-active:
    backgroundColor: "{colors.navy-diretoria}"
    textColor: "{colors.paper}"
  chip-channel:
    textColor: "{colors.navy-diretoria}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  carousel-control:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy-diretoria}"
    rounded: "{rounded.pill}"
    size: "48px"
  carousel-control-next:
    backgroundColor: "{colors.navy-diretoria}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "48px"
  # Ativo na cor da etapa (rampa navy → ameixa → magenta profundo → magenta); a chegada é ouro com número navy.
  step-marker-active:
    backgroundColor: "{colors.magenta-hub}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "36px"
---

# Design System: HUB Marketing

> **Paleta revisada (2026-10-09).** O roxo `#8D369A` saiu do sistema. O navy `#20233F` voltou a ser a cor principal (superfície e tinta), o magenta é o acento padrão, o ouro é o acento raro e o gradiente da marca `linear-gradient(125deg, #20233F, #3A2159, #8A1C68, #B3196E)` entrou como token `--grad-brand` em `src/app/globals.css`.

## Overview

**Creative North Star: "A Reputação Confirmada"**

O visual da HUB existe para confirmar o que a indicação já construiu. Quem chega ao site já ouviu falar bem da empresa e está checando se ela é do tamanho que dizem. Toda decisão de design responde a uma pergunta: *isso faz a empresa parecer do tamanho que ela realmente é?* Na dúvida, vence a opção mais segura, mais clara e mais humana, e não a mais chamativa.

O clima é **próximo, humano e seguro**. O navy é a cor dona da marca: escreve todo o texto forte e ocupa os campos de cor sólidos (depoimentos, rodapé, controles do carrossel, o disco do nó da HUB), dando peso de diretoria ao site. O magenta é o destaque: frase-acento das manchetes, eyebrows, marcadores, métricas, links e foco. O ouro faz o mesmo papel do magenta, só que raro: aparece em poucos momentos escolhidos para variar o ritmo da página. O gradiente da marca é a assinatura emocional e marca os dois pontos de chegada da narrativa (a etapa "Resultado na mesa" e o CTA final). A segurança vem da estrutura previsível (fundos que se alternam por seção, grids que se reorganizam sozinhos, estados inconfundíveis). A proximidade vem da manchete em serifa itálica, que soa como alguém falando e não como um slogan, e das fotos humanas e quentes. A densidade é baixa: seções com 64 a 112px de respiro vertical e no máximo duas ideias por bloco.

O site rejeita dois mundos: a **agência genérica de template** (gradiente neon, ícone 3D, mockup flutuando, promessa em letra gigante) e a **startup tech / SaaS genérico** (hero de vidro, cards de glassmorphism, métrica inventada em destaque). O navy é campo de cor sólido e editorial; o gradiente da marca é profundo (começa no navy) e nunca neon. Gradientes e blur têm lugar fixo e não se espalham.

**Key Characteristics:**
- Navy como cor primária: tinta do texto sobre o claro e campo de cor sólido.
- Magenta como acento padrão; ouro como acento raro, para dar dinamismo.
- Gradiente da marca nos dois momentos de chegada: card final das etapas e CTA final.
- Manchetes em Fraunces itálico; todo o resto em Poppins.
- Fundos alternados por seção (branco, cinza-lavanda, navy e gradiente) no lugar de divisórias.
- Cards claros com sombra ambiente e lift de 3px no hover.
- Componentes claros e funcionais: cada estado ativo muda o preenchimento, não só a cor do texto.
- Movimento editorial e lento nas transições de conteúdo; rápido (120ms) nos controles.

## Colors

O navy escreve e ocupa os campos sólidos, o magenta destaca, o ouro aparece de vez em quando e o gradiente da marca marca as chegadas.

### Primary
- **Navy Diretoria** (`navy-diretoria`, `#20233F`): a cor da marca. É a tinta de todos os títulos e textos fortes sobre fundo claro e o campo sólido da seção de depoimentos e do rodapé. Preenche o controle "próximo" do carrossel e o disco do nó da HUB (na órbita do hero e em Serviços). Com branco dá 15.6:1. A 6% vira lavagem: fundo do chip de canal e hover do controle "anterior".
- **Navy Hover** (`navy-hover`, `#33375A`) e **Navy Press** (`navy-press`, `#1B1E37`): estados do botão e dos controles navy (valores do DS original).

### Accent
- **Magenta HUB** (`magenta-hub`): o destaque padrão. Segunda frase das manchetes, eyebrows, links, marcador ativo e trilho das etapas, números das métricas, barra de progresso e ponto ativo dos cases, anel de foco e hover dos ícones sociais do rodapé. Os estados vêm em duas famílias: `magenta-hover` para links e `magenta-button-hover` → `magenta-deep` para o botão `primary`.
- **Magenta Claro** (`magenta-light`, `#E85FA8`): o magenta sobre navy. O magenta puro dá só 2.8:1 sobre navy; o claro dá 5:1. Usado no anel de 2px dos avatares dos depoimentos.
- **Ouro de Destaque** (`ouro-destaque`): mesmo papel do magenta, mas raro. Fora do gradiente vive em poucos lugares: os pontos do marquee e um dos blobs do brilho do hero. **Dentro de um container, card ou seção com o gradiente da marca, o ouro é o destaque**: tudo o que seria magenta sobre o claro vira ouro ali (botão do CTA final, numeral do card "Resultado na mesa", destaque da manchete do CTA final, função dos cards em gradiente de Serviços). Como texto sobre o gradiente usa-se o **Ouro Claro** (`gold-highlight`) a partir de 24px e o **Ouro Brilhante** (`gold-bright`, token `text-gold-bright`) abaixo disso, porque o ouro claro cai para 4.3:1 na ponta magenta da rampa e o brilhante segura 4.8:1. O `gold-ink` fica para bordas sobre fundo claro, como o selo de conteúdo pendente no FAQ.

### Gradiente da marca
- `linear-gradient(125deg, #20233F, #3A2159, #8A1C68, #B3196E)`, token `--grad-brand` (em Tailwind, `bg-(image:--grad-brand)`). Vai do navy à ameixa, ao magenta profundo e ao magenta. Branco a 80% ou mais e ouro claro em manchete passam o contraste em toda a extensão. O véu do hero escuro com vídeo usa a mesma rampa em transparência.
- **Ameixa Profunda** (`plum-deep`) e **Magenta Profundo** (`magenta-deep`): as paradas do meio do gradiente. Também colorem os blobs do brilho do hero claro (ameixa a 40%, magenta profundo a 36%, magenta a 30%, ouro a 32%). Não são usadas como cor de texto nem de UI.

### Neutral
- **Papel** (`paper`): fundo das seções brancas e dos cards.
- **Cinza-Lavanda** (`surface`): fundo das seções alternadas (Jeito HUB, Como trabalhamos, FAQ), do trilho das abas de filtro e dos slots de imagem vazios.
- **Texto corrido** (`text-body`): parágrafos de cards e respostas. O `ink-2` é um tom mais escuro, reservado ao parágrafo de tese da seção Jeito HUB.
- **Texto secundário** (`text-muted`): legendas, segmento do case, rótulo das métricas.
- **Texto apagado** (`text-subtle`): aposentado. Com 3.6:1 sobre `surface` não passava no contraste; as etapas ainda não alcançadas usam `text-muted`.
- **Linha** (`line`), **Linha forte** (`line-strong`), **Trilho** (`track`): hairlines de card e do FAQ, borda dos controles e pontos inativos, trilho vertical das etapas.
- **Sobre navy ou gradiente**, o texto usa branco: 100% em títulos, 82 a 88% no corpo e **no mínimo 80%** em legendas. As bordas usam branco entre 0.12 e 0.28.

### Named Rules
**The Navy Manda Rule.** O navy é a única cor de campo sólido grande (depoimentos e rodapé) e a tinta de todo texto forte. Nenhum outro matiz sólido ocupa área de seção; o hero é branco, com o brilho em degradê.

**The Magenta Destaca, Ouro Pontua Rule.** O magenta é o acento por padrão, sobre o claro e (em `magenta-light`) sobre navy. O ouro tem a mesma função, mas aparece pouco e em momentos escolhidos, para quebrar a repetição: duas seções vizinhas não usam ouro em destaque. A exceção é o gradiente da marca: dentro dele o destaque é sempre ouro, nunca magenta nem `magenta-light`, mesmo que a seção vizinha também tenha ouro. Magenta e ouro nunca destacam o mesmo título.

**The Fundos Alternados Rule.** As seções se separam pela troca de fundo, nunca por linha divisória: branco com brilho (hero) → cinza → branco → cinza (card final em gradiente) → branco → navy (depoimentos) → cinza → gradiente (CTA final) → navy (rodapé). Uma seção nova entra nessa alternância sem repetir o fundo da vizinha.

**The Gradiente de Chegada Rule.** O gradiente da marca marca as chegadas da narrativa: o card "Resultado na mesa" (o fim das etapas) e a seção de agendamento em sangria total. Fora das chegadas há três exceções: o marquee na base do hero, que assina a abertura, os cards alternados da seção Serviços (dois dos quatro, ao redor do nó da HUB) e o CTA principal (variante `secondary` do Button). Sempre com a rampa exata e a 125°. Não vira ícone, texto ou card comum.

## Typography

**Display Font:** Fraunces, sempre itálico, eixo `opsz` variável (com Georgia como fallback)
**Body Font:** Poppins 400–700 (com system-ui como fallback)

**Character:** A Fraunces itálica é a voz falada da HUB: manchetes que parecem uma frase dita em reunião, não um slogan. A Poppins é a mão que organiza tudo, com geometria limpa e peso semibold ou bold em tudo o que é funcional.

### Hierarchy
- **Display** (Fraunces itálico 600, `clamp(42px, 6.6vw, 92px)`, 1.04, -0.022em): só a manchete do hero, com `text-wrap: balance`. A afirmação e o destaque ficam em linhas próprias (dois `span` em bloco), então a manchete corre em três linhas no desktop. A partir de 1024px, com a órbita ao lado, o tamanho cai para `clamp(46px, 4.4vw, 62px)`.
- **Headline** (Fraunces itálico 600, `clamp(34px, 4.6vw, 56px)`, 1.05): o h2 de cada seção. A tese do Jeito HUB sobe para `clamp(40px, 6.4vw, 88px)`, com 1.04 e -0.022em, como o display, e a do CTA final para `clamp(36px, 5.4vw, 66px)`.
- **Numeral** (Fraunces itálico 600, `clamp(72px, 9vw, 120px)`, 0.9): o número de cada etapa (01, 02…). Nas métricas dos cases o mesmo estilo cai para `clamp(26px, 2.6vw, 34px)`, em magenta e com `tabular-nums`.
- **Quote** (Fraunces itálico 500, `clamp(26px, 3vw, 38px)`, 1.25): citações de depoimento e frases de fecho, como "Um canal sozinho não segura uma venda." (500, `clamp(28px, 3.8vw, 46px)`, 1.1). O nome do case também usa Fraunces 600 em `clamp(28px, 3vw, 40px)`. Nos cards estreitos das colunas de depoimento, a citação desce para 20px, com 1.4 e -0.01em, e o nome e o cargo seguem em Poppins (16px 600 e 14px a 80%), sem tracking negativo.
- **Title** (Poppins 700, 20px, 1.3): título de card, igual no serviço e na cena de cada canal. Na cena do canal, o nome antes dos dois-pontos ("Google:") vem em magenta e a função em `ink`, com `text-wrap: balance` e as palavras de até duas letras presas à seguinte por espaço inseparável; no desktop o subgrid dá uma linha ao título e outra à descrição, então as três descrições começam na mesma altura. O **Title-lg** (Poppins 700, `clamp(24px, 2.4vw, 30px)`, 1.2) é o título das etapas.
- **Lead** (Poppins 400, `clamp(18px, 1.6vw, 20px)`, 1.65): abertura do hero e do CTA final, até ~640px de largura.
- **Body-lg** (Poppins 400, 18px, 1.65): parágrafos de seção e das etapas, até ~540px de largura. A pergunta do FAQ usa o mesmo tamanho em 600, com 1.4.
- **Body** (Poppins 400, 16px, 1.65): texto de cards, cases e respostas do FAQ, até ~620px de largura. É o piso de leitura: nenhum parágrafo fica abaixo de 16px.
- **Caption** (Poppins 400, 14px, 1.55): microcopy embaixo dos CTAs ("Sem compromisso…"), contador, segmento, cargo e rótulo de métrica. Em 600 e navy vira rótulo de campo ("Desafio", "O que fizemos").
- **Label** (Poppins 600, 13px, 0.14em, MAIÚSCULAS): eyebrow acima de cada h2; o chip de canal usa o **Label-sm** (12px). É o único texto em caixa alta do site. Sobre navy, é branco.

Os papéis em Poppins vivem como classes em `src/components/sections/styles.ts` (`lead`, `bodyLg`, `body`, `cardTitle`, `caption`). Entre degraus vizinhos há pelo menos 2px (14 → 16 → 18 → 20), para o papel se ler sem ler o texto. Lead, Body-lg e Body fecham a entrelinha para 1.55 abaixo de 720px (com ~32 caracteres por linha, o 1.65 solta as linhas) e trazem `text-wrap: pretty` no próprio papel. Toda Fraunces ganha `word-spacing: 0.04em` (regra em `globals.css`): o tracking negativo das manchetes também aperta o espaço entre palavras. As fontes carregam só o subset `latin`, que cobre o português inteiro.

### Named Rules
**The Voz Itálica Rule.** A Fraunces aparece só em manchetes, numerais, citações, nomes de case e no marquee, e sempre em itálico. Botão, rótulo, parágrafo e navegação são sempre Poppins.

**The Segunda Frase Rule.** As manchetes de abertura e de fecho seguem o padrão "afirmação. *destaque.*": a segunda frase vem em cor de acento (magenta sobre o claro, ouro claro no CTA final). É uma frase por manchete, e não vale para todo h2.

## Layout

- **Container:** 1200px de largura máxima, centralizado. O padding lateral é `clamp(16px, 4vw, 32px)` e o vertical da seção é `clamp(64px, 9vw, 112px)`. O CTA final estreita para 960px, fica centralizado e ganha mais respiro (`clamp(72px, 10vw, 128px)`).
- **Grid sem breakpoint:** quase toda composição usa `grid-template-columns: repeat(auto-fit, minmax(min(100%, Npx), 1fr))`, com N entre 280 e 440px. As colunas se reorganizam sozinhas. Só existem dois breakpoints explícitos: 720px esconde a navegação do header e 860px desliga o sticky e a navegação lateral das etapas.
- **Ritmo interno:** eyebrow → h2 com 16px de distância; cabeçalho de seção → conteúdo com `clamp(36px, 5vw, 64px)`; gap entre cards de 20px; colunas de texto e imagem com `clamp(40px, 6vw, 96px)`.
- **Hero:** sem foto. A partir de 1024px são duas colunas (`1.22fr / 0.78fr`): manchete, lead (até 560px) e CTA à esquerda, e a órbita dos canais à direita, sobre o brilho em degradê. Abaixo de 1024px a órbita desce para baixo da legenda, centralizada e com até 420px. A partir de 768px a altura mínima é `min(100svh, 920px)`; no mobile a seção tem a altura do conteúdo. O padding superior é a altura medida do header (`--header-h`) e o marquee fica preso à base.
- **Etapas:** a coluna esquerda é sticky abaixo do header e a coluna direita tem um card por etapa, cada um com 62vh de altura mínima. A rolagem conduz a narrativa.
- **Âncoras:** toda seção tem `scroll-margin-top: var(--header-h)`. A seção encosta na base do header, sem deixar uma faixa da vizinha à mostra, e o próprio padding da seção dá o respiro.

### Named Rules
**The Grid Que Se Ajusta Rule.** Um layout novo usa grid `auto-fit` com mínimo em `min(100%, Npx)` antes de recorrer a media query. Breakpoint fixo só entra quando um componente muda de comportamento, não só de colunas.

## Elevation & Depth

O sistema é de **sombra ambiente com lift no hover**. Em repouso, os cards ficam quase colados ao fundo, com sombra de baixíssima opacidade. A interação os faz subir. A profundidade maior vem dos campos navy alternados e do gradiente; a sombra só reforça. As sombras são tingidas da tinta navy, `rgba(32,35,63,·)`. A única exceção fica dentro dos mockups dos canais, que reproduzem as sombras de cada plataforma.

### Shadow Vocabulary
- **Card em repouso** (`box-shadow: 0 4px 16px rgba(32,35,63,0.06)`): cards brancos de Serviços.
- **Card no hover** (`box-shadow: 0 16px 32px rgba(32,35,63,0.10)` + `translateY(-3px)`, 200ms): lift padrão de card interativo.
- **Painel** (`box-shadow: 0 16px 40px rgba(32,35,63,0.08)`): cards de etapa e de case e a moldura dos mockups dos canais, que são superfícies grandes de leitura.
- **Mockup ativo** (`box-shadow: 0 20px 44px rgba(32,35,63,0.14)` + `translateY(-3px)`, 450ms): a moldura do canal cuja cena está rodando.
- **Flutuante** (`box-shadow: 0 16px 40px rgba(32,35,63,0.10)`): tiles, sinais e nó branco da órbita do hero, que flutuam sobre o brilho.
- **Disco do nó** (`box-shadow: 0 12px 28px rgba(32,35,63,0.22)`): o disco navy com a logo, na órbita e em Serviços.
- **Folha** (`box-shadow: 0 -24px 60px rgba(32,35,63,0.10)`): sombra para cima da folha dos canais no Jeito HUB, que cobre a tese.
- **Painel de cor** (`box-shadow: 0 16px 40px rgba(32,35,63,0.18)`): card final (gradiente) das etapas.
- **Aba ativa** (`box-shadow: 0 4px 12px rgba(32,35,63,0.10)`): a pílula branca selecionada no filtro de cases.
- **Controle primário** (`box-shadow: 0 8px 20px rgba(32,35,63,0.20)`): botão "próximo" do carrossel.
- **Botão secundário e gold** (`box-shadow: 0 2px 8px rgba(32,35,63,0.08)`).
- **Brilho magenta** (`box-shadow: 0 12px 30px rgba(204,16,116,0.28)`): só embaixo do botão primário.
- **Sem sombra:** os cards de depoimento, sobre o navy, se separam só pela hairline branca a 14%.

### Named Rules
**The Lift Contido Rule.** O card sobe 3px e o botão desce 1px no press. Nada escala, gira ou quica. Sombra nova é sempre navy translúcida.

**The Sem Vidro Rule.** Nenhuma superfície usa `backdrop-filter`. O header fixo é branco sólido para ficar legível sobre qualquer seção; cards e painéis também são opacos.

## Shapes

As formas são suavemente arredondadas, sem quina viva e sem bolha. A escala:
- **8px** em links do header, botão pequeno e anel de foco.
- **10px** no botão médio.
- **12px** em botão grande e imagem do case.
- **16px** em todos os cards (inclusive os de depoimento), na moldura dos mockups dos canais e nos tiles da órbita do hero.
- **32px** só no topo da folha dos canais no Jeito HUB, que sobe por cima da tese como uma página.
- **999px** em pílulas: abas de filtro, chip de canal, controles do carrossel, ícones sociais, marcadores das etapas, pontos do carrossel e do marquee, e avatares.

As bordas são hairlines de 1px em `line` (no claro) ou em branco translúcido (sobre navy). O botão outline usa 1.5px, assim como o marcador das etapas. Os slots de imagem vazios mostram um anel tracejado de 1.5px enquanto não chega foto real.

## Components

### Buttons
Claros e funcionais: semibold, sentence case, ação dita por extenso ("Quero meu diagnóstico gratuito").
- **CTA do diagnóstico (`CtaButton`):** todo botão que leva ao diagnóstico abre o WhatsApp com a mensagem pronta, em nova aba, e por isso leva o ícone do WhatsApp à esquerda (Lucide, 20px no grande e 16px no pequeno). Sair do site para uma conversa não pode ser surpresa. Só existem dois rótulos: "Quero meu diagnóstico gratuito" no caminho (header, hero e Serviços) e "Agendar meu diagnóstico" na chegada (seção Agendar). A microcopy embaixo do botão do hero e do Agendar diz "O botão abre o WhatsApp com a mensagem pronta". Os links de contexto ("Quero isso na minha empresa" nos cases, "Quero um site assim" na galeria) são outra ação, com mensagem própria, e seguem como link com ícone.
- **Shape:** depende do tamanho. Pequeno 8px (`6px 16px`, 14px), médio 10px (`9px 22px`, 15px), grande 12px (`13px 30px`, 17px), todos com borda transparente de 1px e entrelinha de 1.25 para o rótulo poder quebrar. Os CTAs de seção usam o grande; a landing não usa o médio.
- **Secondary (gradiente):** variante `secondary` do Button, com fundo no gradiente da marca (`--grad-brand` com `background-size` de 130%) e texto branco. No hover a rampa desliza para o lado magenta (`background-position` de 0% a 100%). É o CTA padrão sobre fundo claro (header, seção Serviços, hero claro).
- **Primary (magenta):** fundo Magenta HUB, texto branco e brilho magenta embaixo. Só sobre fundo claro; a landing não usa.
- **Gold:** fundo Ouro de Destaque e texto navy. É o CTA sobre o gradiente (CTA final) e sobre o hero escuro.
- **Hover / Press:** o fundo escurece em 120ms com `ease-standard` (`cubic-bezier(0.22, 0.61, 0.36, 1)`). No press o botão desce 1px. Desabilitado fica com opacidade 0.45 e sem interação.
- **Outline / Ghost:** existem no componente do DS (borda magenta de 1.5px com lavagem magenta a 6%; texto navy com fundo cinza no hover), mas a landing não usa.
- **Focus:** contorno global de 2px em Magenta HUB com 3px de afastamento (`outline`, não `box-shadow`, para não ser anulado pelas sombras dos botões e cards). Segue o raio do próprio elemento. Em superfícies escuras (`data-surface="dark"`: hero escuro, depoimentos, CTA final, rodapé) o contorno fica branco.

### Chips
- **Chip de canal:** pílula com fundo navy a 6%, texto Navy Diretoria em 12px, semibold, MAIÚSCULAS com tracking de 0.14em e padding `6px 12px`. Identifica o canal do case.
- **Selo pendente:** fundo ouro a 16%, borda tracejada `gold-ink` e raio de 6px. Marca conteúdo provisório no FAQ e some quando o texto real entra.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** branco sobre seções cinza ou brancas. O card final das etapas usa o gradiente da marca.
- **Shadow Strategy:** ambiente em repouso e lift no hover (ver Elevation & Depth).
- **Border:** hairline `line` de 1px, ou transparente no card final.
- **Internal Padding:** serviço com `clamp(28px, 3vw, 40px)` (44px no 2×2), etapa com `clamp(32px, 4vw, 56px)`, case com `clamp(16px, 2vw, 24px)`, depoimento com 32px.
- **Sem ícone-tile:** os cards de Serviços e as cenas dos canais não levam ícone decorativo. O canal aparece pelo próprio mockup ou pelo logo oficial na órbita.

### Navigation
- **Header fixo**, com altura medida e exposta em `--header-h`. Sempre branco sólido, em toda a página: fundo branco opaco, hairline `rgba(32,35,63,0.08)` na base e logo base (`logo-base.svg`). Não troca de cor sobre o hero escuro e não usa vidro: qualquer translucidez puxa a ameixa e o magenta dos blobs e o branco vira lilás.
- **Links:** Poppins 500, 14px, padding `8px 12px`, raio de 8px. No hover ganham uma lavagem neutra (`rgba(127,127,140,0.12)`), sem sublinhado. Abaixo de 720px os links somem e só o CTA fica.
- **CTA do header:** botão pequeno (14px, raio de 8px), sempre secondary (gradiente), com altura mínima de 44px: é o alvo de toque confortável e a mesma altura da logo, então o header não cresce. Abaixo de 420px, o rótulo vira "Quero meu diagnóstico" e o ícone do WhatsApp sai, para o botão caber numa linha ao lado da logo. Como o site não tem preflight, o `min-height` vem com `box-sizing: border-box`.

### Abas de filtro (cases)
Um trilho em pílula cinza (`surface`, padding de 6px) com abas de 14px semibold. A aba ativa vira uma pílula navy sólida com texto branco e sombra `0 4px 12px rgba(32,35,63,0.18)`; a inativa fica transparente com texto `text-body`, que passa a navy no hover. A troca leva 200ms com `ease-hub`. A ordem é LinkedIn, Redes sociais e Site, e a seção abre no LinkedIn: o case B2B com antes e depois responde ao título ("O que muda quando cada canal cumpre sua função."), e a galeria de sites, sem números, fica por último.

### Etapas com scroll (signature)
É a navegação das cinco etapas. **A rampa é a jornada:** cada etapa assume uma parada do gradiente da marca, do navy (onde a empresa está) ao magenta, e a chegada fica no ouro. Diagnóstico é `navy-diretoria`, Plano é `plum-deep`, Implantação é `magenta-deep`, Execução é `magenta-hub` e Resultado na mesa é ouro. A parada pinta o numeral do card (Fraunces, sobre branco: todas passam de 5:1) e o marcador da etapa. Um trilho vertical (`track`, 2px) recebe a barra com a rampa (navy → ameixa → magenta profundo → magenta, com cada cor na altura do próprio marcador), revelada por `clip-path` em 450ms até a etapa ativa: o recorte anda e as cores ficam no lugar. Os marcadores são círculos de 36px: o ativo é sólido na cor da etapa com número branco (o da chegada é ouro com número navy), os passados ficam brancos com borda e número na cor da etapa, e os futuros ficam cinza com borda `line-strong`. Os cards à direita entram com opacidade e translate (900ms, `ease-hub`, 150ms de atraso). O card ativo fica a 100%, os já vistos a 0.35 e os próximos a 0.2. A última etapa ("Resultado na mesa") é o card no gradiente da marca, com numeral em ouro claro. No celular, sem a navegação, a rampa segue nos numerais. A rampa vale só aqui: não é paleta de categorias para outros componentes.

### Jeito HUB em duas telas (signature)
A tese vira cena (`src/components/sections/JeitoHub.tsx`, em motion). **Tela 1:** eyebrow, a tese em Fraunces (`clamp(40px, 6.4vw, 88px)`, "Instagram não fecha venda. *E tudo bem.*", com a segunda frase em `data-beat`) e o lead em `ink-2`, que a partir de 860px se alinha à direita. A tela fica presa sob o header (sticky) com a altura da janela. **Tela 2:** uma folha `surface` com o topo arredondado em 32px e a sombra Folha sobe por cima da tese. Enquanto ela sobe, a tese recua mais devagar que a rolagem (até -24vh), encolhe para 0.96, sai de foco (blur até 8px) e desbota até 0.12, o inverso da entrada da página. A frase de abertura da folha chega 72px mais baixa e assenta junto. Ela vem em dois tempos, cada um na sua linha, em Fraunces `clamp(26px, 2.8vw, 36px)` com 1.18: a negação ("Por isso a gente não vende canais.") recua em 500 e `text-muted`, e a afirmação ("A gente monta um sistema em que cada canal tem uma função clara.") assume em 600 e `ink`. A afirmação mede ~30× o corpo, então o teto de 36px a mantém numa linha só a partir de 1024px. Embaixo vêm as cenas dos canais, a frase de fecho centralizada ("Um canal sozinho não segura uma venda. *Os três juntos, sim.*") e a faixa do marquee dos canais. A partir de 1024px, a tela 2 cabe inteira na janela: os mockups encolhem por `zoom` (de 1 até 0.62), e em notebooks com até 820px de altura a descrição de cada canal sai para eles caberem. Com movimento reduzido, a troca é só a rolagem, sem parallax.

### Cenas dos canais (signature)
Os três canais na ordem da jornada de quem compra: pesquisa no Google, encontra no LinkedIn, confirma no Instagram (`src/components/channels/`). Cada cena tem o título (Title) e a descrição (Body) acima de um mockup de 440px de altura e até 420px de largura, numa moldura branca de 16px de raio, hairline `line` e sombra Painel. Embaixo, um trilho `track` de 2px com uma barra magenta mostra a vez de cada canal, na mesma linguagem da barra dos cases. A partir de 1024px são três colunas, alinhadas por subgrid, que sobem com a folha em velocidades diferentes (atrasos de 90, 160 e 230px) até assentarem juntas. No celular as cenas empilham. **Revezamento:** só uma cena roda por vez, e só entre as que estão a 55% ou mais na tela; com uma só visível, ela repete sozinha. A cena ativa ganha a sombra Mockup ativo e sobe 3px. Com o mouse sobre ela, a cena pausa. Parado (SSR, sem JS, movimento reduzido), cada mockup mostra o próprio estado final. **Fidelidade:** dentro da moldura valem a tipografia, as cores, os ícones e as sombras de cada plataforma (`.mock-google` em Arial, `.mock-app` na fonte do sistema), não as da HUB. Os mockups são decorativos (`aria-hidden`): o conteúdo que conta está no título e na descrição.

### Serviços em volta do nó (signature)
A manchete promete "uma pessoa cuidando do todo", e os cards mostram isso (`src/components/sections/ServicosBoard.tsx`, em GSAP + ScrollTrigger). Os cards não têm ícone e seguem em sentido horário, também no DOM (redes → site → LinkedIn → Google). Eles alternam entre gradiente da marca e branco: no 2×2 o gradiente cai na diagonal (redes e LinkedIn) e, na pilha do celular, intercala. O card em gradiente usa `--grad-brand` com `background-size` de 180%, sombra de painel de cor, título branco, função em `gold-bright` e corpo branco a 86%, e o gradiente corre devagar com a rolagem. O card branco segue o card padrão. A partir de 900px, os quatro formam um 2×2 com linhas de altura igual e padding de 44px. No cruzamento fica o nó da HUB: um círculo branco de 128px com hairline `line`, que recorta o canto interno de cada card, um anel `track` e um disco navy de 94px com a logo branca. A rolagem traz os cards de fora para dentro, na mesma ordem. Cada um entra em foco (blur de 8px → 0) e o anel ganha um quarto em magenta. Com os quatro, o anel fecha. Abaixo de 900px os cards empilham sem o nó e cada um entra em foco ao cruzar a tela. Tudo é conduzido pela rolagem (scrub), sem pin. Abaixo do título, cada card traz a função do serviço no sistema em Fraunces itálico 500, 20px (campo `role` em `content.ts`): magenta no card branco, ouro brilhante no gradiente. Com movimento reduzido ou sem JS, a seção já aparece encaixada.

### Carrossel de cases (signature)
Os cards ficam empilhados no mesmo grid e se cruzam por opacidade + translateX de ±48px (500 a 600ms). A imagem do case faz um zoom-out lento, de 1.06 para 1, em 1200ms. As três métricas sobem em sequência (250ms + 110ms por métrica). Embaixo ficam o contador tabular, uma barra de progresso magenta de 7s que pausa no hover, no foco e fora da viewport, pontos que se esticam de 8 para 28px no ativo (magenta), com 16px entre eles e alvo de toque de 24px e os controles circulares de 48px (anterior com contorno, próximo navy sólido). O autoplay só roda em telas acima de 860px e sem movimento reduzido, e para de vez quando a pessoa usa abas, pontos, setas ou o teclado.

### Colunas de depoimentos
A seção tem fundo Navy Diretoria, com eyebrow, h2 e lead centralizados (até 640px). Embaixo, as colunas de cards (`src/components/sections/DepoimentosColunas.tsx` sobre `src/components/ui/testimonials-columns-1.tsx`) sobem sem parar, em CSS (`hub-scroll-up`, com a duração em `--column-dur`), dentro de uma janela de até 740px que some em degradê em cima e embaixo (`mask-image`). **Nenhuma citação aparece duas vezes na tela:** no celular é uma coluna com todas as avaliações (55s); a partir de 768px são duas colunas de 360px, cada uma com metade, sem repetir nenhuma. A divisão vai pela coluna mais curta até ali, pesando o tamanho do texto, para as duas subirem com alturas parecidas, e em ritmos diferentes (34 e 39s). Cada coluna precisa ser mais alta que a janela para o loop não abrir buraco; com menos de seis avaliações, revisar. Cada card tem até 320px de largura no celular (`--testimonial-w`), padding de 32px, raio de 16px, hairline branca a 14% e fundo branco a 4%, sem sombra. A citação vem em Fraunces itálico 500 de 20px, e embaixo dela ficam o avatar de 40px com anel de 2px em magenta claro, o nome (16px, 600) e o cargo (14px, branco a 80%). **Pausa (WCAG 2.2.2):** a rolagem para com o mouse sobre um card (no vão entre as colunas ou fora delas, ela segue), com o foco do teclado na janela (ela é uma região focável, e o degradê fica num filho para não apagar o anel), e com um toque ou clique num card, que alterna entre parar e retomar. Não há botão de pausa visível. Com movimento reduzido, as colunas ficam paradas e a cópia do loop some. A cópia nunca vai para o leitor de tela.

### Marquee
Duas faixas iguais. Na base do hero, os logos das empresas que trabalham com a HUB (`clientLogos`, arquivos em `public/uploads/clientes`, pintados de branco por filtro e com altura ajustada a olho para terem o mesmo peso), com a legenda visível "Empresas que trabalham com a HUB" no estilo Label-sm branco: a partir de 768px ela fica parada à esquerda, alinhada à coluna do conteúdo, e os logos passam por trás entrando num degradê de 72px; abaixo disso, ela fica centralizada acima dos logos (sem legenda, logo branco rolando lê como enfeite, não como cliente); no fim do Jeito HUB, logo depois de "Os três juntos, sim.", os canais (`marqueeWords`). Cada uma é uma faixa em sangria total no gradiente da marca (`--grad-brand`, nos dois temas do hero), com as palavras em Fraunces itálico branco (`clamp(22px, 2.6vw, 32px)`) separadas por pontos dourados de 8px, rolando em 120s linear (`hub-marquee`, a faixa é repetida 8 vezes e anda metade da largura por volta). Com movimento reduzido, para. Sem hairline: o gradiente já fecha o hero.

### Hero com brilho em degradê
O hero tem fundo branco (`heroStyle: "claro"` em `src/lib/site-config.ts`). O visual da dobra é um campo preso ao canto inferior direito com quatro blobs desfocados (blur de 90px) nas cores do gradiente da marca: ameixa a 40%, magenta profundo a 36%, magenta a 30% e ouro a 32%. Eles derivam devagar, em ciclos de 22 a 34s (keyframes `hub-g1` a `hub-g3`, medidos no próprio blob para não invadir a manchete). Um véu branco (de cima, e da esquerda no desktop) mantém a manchete, o lead e a legenda sobre branco limpo, com o contraste do claro. Na base, uma faixa de 220 a 340px dissolve o brilho no cinza-lavanda (`surface`) da seção seguinte, e a faixa do marquee, no gradiente da marca, fecha o hero antes do Jeito HUB. Com movimento reduzido, o brilho fica parado. A variante `escuro` (campo navy com blobs e véu navy) segue disponível; quando houver vídeo configurado, ele substitui o fundo, com overlay no gradiente da marca.

### Órbita dos canais no hero (signature)
A HUB é, literalmente, o hub (`src/components/sections/HeroOrbit.tsx`, em motion). O nó de Serviços (círculo branco, anel `track` e disco navy com a logo branca) fica no centro de uma órbita tracejada em `line-strong`. Em volta, quatro tiles brancos de 16px de raio (`clamp(54px, 15.5cqw, 80px)`, sombra de painel) com os logos oficiais em sentido horário: Google, Instagram, LinkedIn e Site. Na abertura, a partir de 550ms, o nó entra em foco, os canais chegam de fora, desfocados (blur de 10px), e encaixam a cada 160ms. Cada um puxa a própria linha até o nó e fecha um quarto do anel magenta, como em Serviços. Depois entram, em foco, três sinais do sistema funcionando: a busca "sua empresa" digitada letra a letra (com cursor magenta), "Diretor de compras viu o perfil da sua empresa" (LinkedIn) e uma mensagem nova no WhatsApp ("Vi o Instagram de vocês. Podemos conversar?"). Esses sinais não trazem número nem nome de cliente. Em repouso, tiles e sinais flutuam 8px em ciclos de 7 a 10s, a órbita gira em 160s e um pulso magenta corre de cada canal até o nó a cada 3,6s, com 0,9s entre um canal e o próximo. As voltas são CSS (`hub-float`, `hub-spin`, `hub-signal`) e param quando o hero sai da tela (`data-paused`). Com movimento reduzido, as entradas viram só fade e as voltas param. O conjunto é decorativo (`aria-hidden`).

### Entradas (signature)
A tese: tudo chega **entrando em foco** (desfoque → nítido), como o digital confirmando o que a indicação já disse, e a frase-destaque de cada manchete chega **um compasso depois**, como a pausa de quem fala. As regras vivem em `src/app/globals.css` (bloco "Entradas"), com `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Abertura (CSS, no carregamento):** o header desce (700ms). Cada linha da manchete do hero sobe pela própria base, por máscara (`hub-line`, 1100ms; a segunda linha 300ms depois). O brilho floresce de 0.88 a 1 (2.2s), lead e CTA entram em foco (760 e 900ms) e a faixa do marquee sobe da base (1000ms).
- **Rolagem:** `data-reveal` marca o elemento, e `src/components/RevealOnScroll.tsx` aplica `data-revealed` quando ele entra na tela: opacidade, 18px de subida e blur de 8px → 0, em 1000ms. O que entra no mesmo lote ganha stagger de 90ms em ordem de leitura, com teto de 450ms. `data-beat` numa frase da manchete atrasa só ela em 480ms ("E tudo bem.", "Os três juntos, sim.", "Falta o digital confirmar."). `data-reveal="narrow"` vale só até 860px (cards das etapas, que no desktop já são conduzidos pela rolagem).
- **Segurança:** o modo só liga com `html[data-motion]`, posto por um script no `<head>`; sem JS, com movimento reduzido ou na impressão, tudo fica visível. Se o JS não subir em 4s, o script desliga o modo. As animações usam `backwards`, então não brigam com o lift de hover dos cards.
- Não entram: o carrossel de cases por dentro e os cards de depoimento (já têm o próprio movimento; o cabeçalho e a janela das colunas entram por `data-reveal`), e nada de entrada em seção nova sem passar por `data-reveal`.

### FAQ (acordeão)
Os itens ficam entre hairlines `line`, com pergunta em 18px semibold que fica magenta no hover. O chevron (20px) fica num círculo de 36px com borda `line-strong` de 1.5px, que fica magenta no hover. No item aberto, o círculo vira magenta cheio com chevron branco, girado 180°: o estado muda de forma, não só de cor. A abertura anima `grid-template-rows` de 0fr para 1fr em 280ms. Só um item fica aberto por vez.

### Rodapé
Fundo Navy Diretoria com a logo branca (52px). Ao lado da logo, um `<address>` em 14px com a linha institucional (`companyLocation`: "Belo Horizonte, MG · Atendimento online para todo o Brasil", branco a 80%) e o e-mail de contato (`contactEmail`) como link branco sublinhado (sublinhado branco a 40%, inteiro no hover). É o contato por escrito, a alternativa visível ao WhatsApp. Os ícones sociais (WhatsApp, e-mail, Instagram e LinkedIn, em `socialLinks`) são círculos de 44px com borda branca a 18% que ficam magenta sólido com ícone branco no hover. **Link morto não vai ao ar:** um `href` vazio ou `#` esconde o ícone, e um e-mail vazio esconde a linha. Abaixo de ~900px, logo, endereço e ícones empilham à esquerda. A linha de copyright tem 13px, em branco a 80%, com o ano corrente.

## Do's and Don'ts

### Do:
- **Do** use o Navy Diretoria (`#20233F`) como cor principal: tinta de todo texto forte e campo sólido de depoimentos e rodapé.
- **Do** use o magenta como destaque padrão; sobre navy, use `magenta-light` (`#E85FA8`).
- **Do** use o ouro com parcimônia, como variação do magenta, em momentos escolhidos e nunca em seções vizinhas.
- **Do** use ouro para destacar texto ou elemento dentro de qualquer container, card ou seção com o gradiente da marca: `gold-highlight` a partir de 24px, `gold-bright` abaixo, botão `gold`.
- **Do** use o gradiente da marca exato (`linear-gradient(125deg, #20233F, #3A2159, #8A1C68, #B3196E)`) nos momentos de chegada (card final das etapas e CTA final), na faixa do marquee do hero, nos cards alternados de Serviços e no CTA principal.
- **Do** separe as seções pela alternância de fundo (branco / `surface` / navy / gradiente), nunca por linha divisória.
- **Do** escreva texto sobre o claro em navy e sobre navy ou gradiente em branco, nunca abaixo de 80% de opacidade.
- **Do** escreva manchetes em Fraunces itálico 600 com `line-height: 1.05`, `letter-spacing: -0.02em` e `text-wrap: balance`. Todo o resto é Poppins.
- **Do** coloque um eyebrow em MAIÚSCULAS (13px, 600, 0.14em) acima de cada h2 de seção.
- **Do** use cards brancos com raio de 16px, hairline `line` e sombra `0 4px 16px rgba(32,35,63,0.06)`, subindo 3px no hover.
- **Do** mostre o estado ativo com mudança de preenchimento ou de forma (pílula branca, círculo magenta, ponto esticado), além da cor.
- **Do** use `ease-hub` (`cubic-bezier(.2,.8,.2,1)`) nas transições de conteúdo e 120ms nos hovers de controle.
- **Do** use ícones Lucide de contorno com traço de 2px em `currentColor`, inline.
- **Do** use fotos humanas e quentes. Enquanto não houver foto real, mantenha o slot vazio tracejado.
- **Do** use a logo base sobre fundo claro e a logo branca sólida sobre navy (ambas em `public/uploads/`).

### Don't:
- **Don't** volte a usar o roxo `#8D369A` nem a família `roxo-*`: saíram do sistema.
- **Don't** use magenta puro como texto sobre navy (2.8:1); use `magenta-light`.
- **Don't** use ouro como texto abaixo de 24px sobre navy, nem `gold-highlight` abaixo de 24px sobre o gradiente (ali o pequeno é `gold-bright`). Eyebrow e legenda sobre navy são brancos.
- **Don't** destaque nada em magenta ou `magenta-light` sobre o gradiente da marca.
- **Don't** espalhe o ouro: se ele aparece em toda seção, deixa de dar dinamismo e vira ruído.
- **Don't** use o navy como vidro nem o gradiente como neon. Navy é campo sólido; o gradiente é profundo e tem lugar fixo.
- **Don't** pareça agência genérica de template: nada de gradiente neon, ícone 3D, mockup flutuando ou promessa em letra gigante.
- **Don't** pareça startup tech ou SaaS genérico: nada de card de vidro (glassmorphism), hero de vidro ou métrica em destaque sem número real por trás.
- **Don't** leve o gradiente da marca para botões, ícones, texto ou cards comuns. Ele vive no card final das etapas, na faixa do marquee, nos cards alternados de Serviços e em sangria total no CTA final.
- **Don't** use `backdrop-filter` nem header translúcido.
- **Don't** use Fraunces reta (não itálica) nem em texto corrido, botão ou rótulo.
- **Don't** destaque o mesmo título com magenta e ouro ao mesmo tempo.
- **Don't** use sombra preta ou dura. Toda sombra é navy translúcida, com exceção das que imitam cada plataforma dentro dos mockups dos canais.
- **Don't** escale, gire ou faça quicar elementos interativos. O máximo é 3px de lift e 1px de press.
- **Don't** use `text-subtle` (`#7C7F96`) como cor de texto: não atinge 4.5:1 sobre `surface`.
- **Don't** use emoji como ícone ou ornamento.
