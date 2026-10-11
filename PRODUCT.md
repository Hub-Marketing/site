# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Donos e diretores de empresas já estabelecidas, com faturamento acima de R$ 30 mil, em qualquer lugar do Brasil. Muitas vendem para outras empresas (B2B) ou prestam serviços técnicos. Cresceram por indicação, e a presença digital não acompanhou esse crescimento.

O momento em que chegam à HUB: o comprador em potencial pesquisa a empresa no Instagram, no Google e no LinkedIn antes de chamar, e o que ele encontra parece menor do que a empresa realmente é. O que precisam resolver: fazer o digital confirmar a reputação que a indicação já construiu, e ser encontrado por quem está procurando agora.

## Product Purpose

A HUB Marketing é uma agência que monta um sistema de presença digital com quatro serviços: gestão de redes sociais, criação de site, Google Ads, e LinkedIn com LinkedIn Ads. O objetivo é que o cliente certo encontre a empresa, confie nela e feche negócio.

O site existe para levar o visitante a agendar um diagnóstico gratuito de 40 minutos (CTA via WhatsApp, `src/lib/site-config.ts`). Um site bem-sucedido gera diagnósticos agendados com empresas dentro desse perfil.

## Positioning

"A gente não vende canais. A gente monta um sistema em que cada canal tem uma função clara":

- **Google:** quem já está procurando encontra a empresa.
- **LinkedIn:** a empresa chega em quem decide.
- **Instagram:** a decisão de compra se sustenta quando a pessoa vem pesquisar.

A tese é honesta sobre atribuição: "Instagram não fecha venda. E tudo bem." O cliente diz que veio por indicação, e veio mesmo, mas a confiança se decide no digital. "Um canal sozinho não segura uma venda. Os três juntos, sim."

## Operating Context

O atendimento é online, para todo o Brasil, com sede em Belo Horizonte. A jornada tem cinco etapas:

1. **Diagnóstico:** análise de Instagram, LinkedIn, site e Google. O cliente sai sabendo onde está perdendo negócios, mesmo que não feche com a HUB.
2. **Plano:** a proposta traz só os canais que fazem sentido para o momento da empresa, sem pacote empurrado.
3. **Implantação:** ajuste de perfis, site e contas de anúncio.
4. **Execução:** conteúdo, campanhas e otimizações todo mês.
5. **Resultado na mesa:** reunião mensal com alcance, contatos, custo por contato e o que muda no mês seguinte.

## Capabilities and Constraints

- O site atual (v2) é uma landing page única em pt-BR, feita em Next.js 16, React 19 e Tailwind 4, este sem preflight de propósito. A fonte visual é `design-export/HUB Landing Page.html`, e as mudanças de layout precisam preservar fidelidade a esse export.
- Existe uma versão anterior (v1), um tema WordPress em `../v1`.
- O conteúdo editável fica em `src/lib/content.ts`, e os ajustes da landing em `src/lib/site-config.ts`.
- Compromissos de serviço que o site afirma:
  - as contas de anúncio e o site ficam sempre no nome do cliente;
  - não é preciso contratar todos os serviços;
  - o preço só vem depois do diagnóstico, com escopo definido.
- Prazos de resultado declarados:
  - Google Ads costuma gerar contatos no primeiro mês;
  - redes sociais e LinkedIn ganham força a partir do terceiro mês.
- Contato público (`src/lib/content.ts`): e-mail `hubmarketingepublicidade@gmail.com`, Instagram `@hubmarketingagenciaa` e a página da empresa no LinkedIn (`agencia-hub-marketing`). O rodapé não mostra razão social nem CNPJ, por decisão da HUB.

## Brand Commitments

- **Nome:** HUB Marketing. No texto corrido, "HUB".
- **Logos:** em `public/uploads/` (variantes base, branca, preta e branca com gradiente, cada uma com versões para fundo claro e escuro).
- **Voz:** português brasileiro direto e coloquial ("a gente", "dá pra"), com frases curtas e afirmações concretas. Fala com dono de empresa sem jargão de agência e evita promessa vaga.

## Evidence on Hand

Cases de clientes com métricas, depoimentos com nome e cargo, e logos de clientes existem e serão enviados pelo usuário. Até lá, cases e depoimentos em `src/lib/content.ts` continuam como placeholders entre colchetes. Trabalhos futuros nunca inventam clientes, números, depoimentos ou logos.

## Product Principles

1. **Sistema, não pacote.** Cada canal aparece com uma função clara dentro do todo, e nenhum é vendido isolado como solução.
2. **Honestidade antes de promessa.** Prazos realistas, atribuição honesta e contas no nome do cliente. A confiança vem do que se pode comprovar.
3. **O diagnóstico é o produto de entrada.** Tudo conduz a uma conversa de 40 minutos que entrega valor mesmo sem fechamento.
4. **Do tamanho que a empresa realmente é.** A presença digital deve confirmar a reputação que a empresa já construiu por indicação.
5. **Números na mesa.** Resultado se mostra com métricas claras e regulares: contatos, custo por contato e próximos passos.
