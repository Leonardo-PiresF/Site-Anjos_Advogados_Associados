# Ficha de direção · Anjos Advogados Associados

Reler antes de cada sessão. Mudar de direção a partir daqui significa recomeçar.

## Tese

**Traço + Margem.** O A com asa do logo se desenha no hero, e a asa continua descendo pela página como o Rio Corrente. O escritório é de Santa Maria da Vitória e atua até Brasília.

Manchete: "Da margem do Corrente aos tribunais de Brasília."

Cruzamento escolhido: hero da direção B (escuro, A gigante, Bodoni + Jost), texto do hero da C, sem foto no hero. Organização em linhas numeradas herdada da A.

## Cor

| Token | Hex | Uso |
|---|---|---|
| `--carvao` | #151614 | fundo das seções escuras |
| `--carvao-2` | #1E1F1C | superfície sobre o escuro |
| `--filete-escuro` | #33342F | linhas de 1px no escuro |
| `--pedra` | #8E8B84 | texto secundário no escuro |
| `--osso` | #ECE8E0 | fundo das seções claras, texto no escuro |
| `--osso-2` | #E2DDD3 | superfície sobre o claro |
| `--filete-claro` | #CFC8BC | linhas de 1px no claro |
| `--tinta` | #1D1E1B | texto no claro |
| `--tinta-2` | #5C5A54 | texto secundário no claro |
| `--laterita` | #9A4A2A | **único destaque**: números das áreas, hover de link, seleção. Só sobre fundo claro |

Neutros puxados para o quente, sem preto nem branco puros.

## Ritmo de fundo

Pedido do cliente: alternar claro e escuro. Hero (escuro), Áreas (claro), Equipe (escuro), Escritório (claro), Contato + rodapé (escuro).
O que tira a cara de template: o rio atravessa todas as viradas e troca de cor sozinho (`mix-blend-mode: difference`), e cada seção tem padding diferente.

## Tipografia

- **Bodoni Moda** 400/500: títulos. O contraste de haste fina e grossa conversa com o A que afina na asa.
- **Jost** 300/400/500: texto e rótulos. Geométrica e fina como o "ADVOGADOS ASSOCIADOS" do logo.
- Escala 1.414: 16 · 22.6 · 32 · 45 · 64 · 90 px (display com clamp).
- Display: entrelinha 1.02, tracking -0.02em. Corpo: 18px, entrelinha 1.7, medida máxima de 62ch.
- Rótulos: Jost 400, caixa alta, tracking +0.22em.

## Forma

- Raio zero em tudo.
- Sem sombra. A separação é feita com filete de 1px.
- Primitivo: **linha numerada com filete** (áreas, dados do escritório, equipe associada). Cada seção encosta numa linha horizontal, como a barra do logo.

## Movimento

- Assinatura única: o A se desenha no carregamento (pernas, barra, asa; 1,6s no total, `cubic-bezier(.65,0,.25,1)`) e a ponta da asa vira o rio, que se desenha conforme a rolagem.
- Entrada do texto do hero: rótulo 900ms, título 1200ms, parágrafo 1000ms, com atrasos de 250, 420 e 900ms. Curva `cubic-bezier(.2,.7,.2,1)`.
- Hover: 160ms, só cor e sublinhado.
- `prefers-reduced-motion`: tudo aparece desenhado e parado.

## Bibliotecas

Nenhuma. Camada 0:
- SVG com `stroke-dasharray` para o A.
- Um script de cerca de 2KB para o rio acompanhar a rolagem (funciona também no Safari, que ainda não tem scroll-driven animations estáveis) e para o menu mobile.
- Tailwind via CDN removido: CSS próprio, sem etapa de build, pronto para GitHub Pages.

## Fotografia

Duotone carvão e osso, retrato 4:5, WebP em 440 e 800px. Esconde a diferença de luz e fundo entre as fotos de celular. Nada de P&B que fica colorido no hover.

## Não fazer neste projeto

- Dourado, balança, martelo, coluna, Material Icons
- Cards de área com ícone
- Palavra em itálico no meio do título
- "Excelência", "Compromisso", "Resultados comprovados", números sem fonte
- Fade-up igual em tudo, `transition-all`, `animate-bounce`
- Botão pill, `rounded` em qualquer coisa
- Formulário de contato (o contato é pelo WhatsApp)
- `zoom` no body

## Pendências com o cliente

- Bios de Kleysa, Elvis e Maria Luíza (lorem ipsum até a Kleysa mandar as informações)
- Confirmar se Trabalhista e Tributário entram como áreas (estavam no rodapé antigo)
- Número do WhatsApp para o dado estruturado (hoje o link é `contate.me/ios/anjosadvassociados`)
- LinkedIn da Maria Luíza
- Foto da fachada ou da passarela sobre o Corrente, se possível
