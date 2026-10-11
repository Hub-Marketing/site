---
target: landing page (src/app/page.tsx)
total_score: 22
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:C:\\dev\\hub-marketing\\site\\v2\\src\\app\\page.tsx"
target_fingerprint: "sha256:77c5c46d126ce85c165ea5e5aea51875b455c2b36370aba8cba2138740fedf52"
target_path: "C:\\dev\\hub-marketing\\site\\v2\\src\\app\\page.tsx"
timestamp: 2026-10-11T20-46-13Z
slug: src-app-page-tsx
---
Method: dual-agent (A: revisão de design · B: detector + navegador)

## Saúde do design
| # | Heurística | Nota | Problema principal |
|---|---|---|---|
| 1 | Visibilidade do status | 3 | CTA abre WhatsApp em nova aba; aviso só em sr-only (CtaButton.tsx:14) |
| 2 | Mundo real | 3 | Métricas dos cases em língua de plataforma, não "contatos / custo por contato" |
| 3 | Controle e liberdade | 2 | Depoimentos rolam sem pausa no toque/teclado (globals.css:329) |
| 4 | Consistência | 2 | 5 rótulos de CTA; ícone WhatsApp só nos secundários |
| 5 | Prevenção de erros | 2 | Rodapé com href="#" (content.ts:184-186) |
| 6 | Reconhecimento | 3 | Nav com 3 âncoras; "Quanto custa?" a ~10 telas |
| 7 | Flexibilidade | n/a | Persuasão de caminho único |
| 8 | Estética e minimalismo | 2 | 11.122px; Como trabalhamos ~3.000px para cinco frases |
| 9 | Recuperação de erros | 2 | Sem plano B se o WhatsApp falhar |
| 10 | Ajuda | 3 | FAQ sem "o que acontece no diagnóstico", quem conduz, fidelidade |
| **Total** | | **22/36** | **Aceitável (61%)** |

## Veredito de especificidade
~70% específica: órbita do hero, tese, mockups B2B, nó dos serviços, rampa das etapas. De Cases para baixo vira categoria (eyebrow "Cases de sucesso", colunas de depoimento de biblioteca, FAQ, rodapé). Detector: page.tsx limpo; components 20 advisory (12 font-size, 8 color), quase todos falsos positivos nos mockups de canal (channels/*); reais pequenos em SitesGallery.tsx:265 e :396. Navegador: italic-serif-display (8) e kicker-above-heading (5) são exigências do DESIGN.md; nested-cards (3) e low-contrast (1) dentro dos mockups aria-hidden; blinking-cursor do hero é escolha.

## Problemas prioritários
- [P1] A prova não confirma o tamanho: logos sem legenda visível no marquee; aba padrão de Cases é Site (Cases.tsx:15); métricas só de alcance; "dono" vs "Gerente de Logística" (content.ts:61); depoimentos sem cargo/empresa e duplicados em 1440; sites fora do perfil na galeria. → clarify, layout
- [P1] Rodapé vazio e links # numa agência de presença digital; sem CNPJ, cidade, e-mail. → harden
- [P1] CTA de alto risco não avisa (nova aba / WhatsApp) nem tranquiliza; 5 rótulos. → clarify
- [P2] Página longa (etapas 62vh, ComoTrabalhamos.tsx:106; ~3.200px de mockups no mobile) e chegadas sem CTA. → distill, layout
- [P2] Galeria de sites encosta em x=0 (SitesGallery.tsx:36, :76). → polish

## Sinais de alerta por persona
- Jordan: não sabe o que recebe no diagnóstico; preço longe e "Depende"; nenhum rosto.
- Riley: links #, card cortado em x=0, citações duplicadas, dono/gerente, linha cortada sob o header em 1440×900.
- Casey: ~3.200px de mockups; depoimentos sem pausa no toque (WCAG 2.2.2).
- Dono B2B indicado: logos sem case, números pequenos, depoimentos de pessoa física, rodapé sem CNPJ e redes quebradas → "é pequena".

## Observações menores
Papéis dos serviços repetem os pilares; gradiente em ~9 superfícies; botão primary magenta no viewer mobile; FAQ sem eyebrow; anel de foco ~1.6px no CTA do header; 36 imagens lazy sem dimensões; depoimento "Keven Pacheco" (content.ts:146) pode ser interno.

## Perguntas
- Por que 11 mil pixels para um visitante que já confia?
- Onde está a pessoa que "cuida do todo"?
- Logos sem case confirmam ou levantam suspeita?
- O que ainda marca a chegada se o gradiente está em nove lugares?
