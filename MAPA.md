# Mapa do projeto — Questionário de Bancadas Monolith

Este documento existe para você (ou eu, numa próxima conversa) achar rápido
onde mexer, sem precisar reler o projeto inteiro. Separei tudo em arquivos
menores — cada um cuida de uma coisa só.

## Estrutura de pastas

```
monolith-questionario/
├── index.html          → só a estrutura da página (HTML), sem estilo nem lógica
├── styles.css           → toda a aparência (cores, fontes, espaçamentos, grade)
├── schemas.js           → os 6 tipos de bancada e as perguntas de cada um
├── drawing-engine.js     → o "motor" que calcula e desenha planta/isométrica/elevação
├── app.js               → a lógica da página: navegação, formulário, PDF, cotas editáveis
├── assets/logo.png       → a logo (fundo transparente)
└── MAPA.md               → este arquivo
```

**Importante:** os arquivos `.js` dependem uns dos outros e são carregados nesta
ordem no fim do `index.html`: `schemas.js` → `drawing-engine.js` → `app.js`.
Se precisar adicionar um novo arquivo `.js`, ele deve entrar nessa ordem
(ou depois de `app.js`, nunca antes de `schemas.js`).

Para publicar (GitHub Pages, Netlify etc.), suba a **pasta inteira** — não só
o `index.html`. Os arquivos `.css`/`.js`/`assets/logo.png` precisam estar
juntos, nos mesmos caminhos relativos.

---

## Onde mexer para cada tipo de ajuste

| Quero ajustar... | Arquivo | Onde dentro do arquivo |
|---|---|---|
| Uma pergunta do formulário (texto, tipo de campo, sugestão de preenchimento) | `schemas.js` | objeto `SCHEMAS`, dentro do tipo de bancada (`ilha`, `reta`, `l`, `u`, `especial`, `wc`) |
| Adicionar/remover um tipo de bancada | `schemas.js` | `SCHEMAS` (adicionar bloco) + `TYPE_ORDER` (adicionar chave) + `ICONS` (ícone planta/iso do cartão) |
| Ícone (planta+isométrica) do cartão de seleção de tipo | `schemas.js` | objeto `ICONS`, chave `plan` e `iso` de cada tipo |
| Cores, fontes, tamanho das vistas, espaçamento dos cartões | `styles.css` | procure pela classe (ex.: `.type-card`, `.dim-editor`, `.td-panel`) |
| Fundo da página, tons de cinza, azul de destaque | `styles.css` | seletor `:root` no topo (variáveis `--paper`, `--stone`, `--blue` etc.) |
| Como a planta baixa é desenhada (cotas, hachura, paredes) | `drawing-engine.js` | função `buildPlanSVG` |
| Como a isométrica é desenhada (extrusão 3D, hachura, paredes) | `drawing-engine.js` | função `buildIsoSVG` |
| Como a elevação é desenhada (altura, frontão, saia, parede) | `drawing-engine.js` | função `buildElevationSVG` |
| A forma/geometria de cada tipo de bancada (largura x profundidade, formato do L/U/Especial/WC) | `drawing-engine.js` | função `buildFootprint` |
| Como o sistema lê a posição da cuba/cooktop a partir do texto digitado | `drawing-engine.js` | funções `parseSize` e `parsePosition` |
| Limites mínimo/máximo de cada cota (ex.: largura 10–500cm) | `app.js` | função `getLimits` |
| Textos de sugestão dos campos de texto livre (área molhada, recorte de cuba etc.) | `app.js` | `FIELD_PLACEHOLDERS` |
| O comportamento das cotas editáveis (aparecer antes, sumir se vazia, botão Atualizar) | `app.js` | função `renderDimEditor` |
| A lista de perguntas que aparecem normalmente no formulário (fechamentos, áreas, recortes, torneiras, paredes) | `app.js` | função `renderField` |
| O resumo final (Etapa 3) — o que aparece na "ficha técnica" | `app.js` | função `buildSummary` |
| O desenho técnico dentro do resumo final | `app.js` | função `renderTechDrawing` |
| O conteúdo do PDF gerado | `app.js` | função `buildPDFDoc` |
| O nome do arquivo PDF salvo | `app.js` | função `buildFilename` |
| Validação dos campos Nome/Telefone/E-mail | `app.js` | função `validateContact` |
| Navegação entre as 3 etapas (Tipo → Detalhes → Resumo) | `app.js` | função `goTo` |
| Texto/estrutura fixa da página (títulos, botões, layout das etapas) | `index.html` | procure pelo texto ou `id` do elemento |

---

## Os 6 tipos de bancada (chaves internas)

`ilha`, `reta`, `l`, `u`, `especial`, `wc` — essas chaves aparecem em
`schemas.js` (`SCHEMAS`, `ICONS`, `TYPE_ORDER`) e em `drawing-engine.js`
(`buildFootprint`). Ao editar um tipo, é comum precisar tocar nos dois
arquivos.

## Fluxo geral da aplicação (em `app.js`)

1. `selectType(key)` — usuário escolhe o tipo → zera respostas → `renderForm`
2. `renderForm(key)` — monta o formulário da Etapa 2 a partir do `SCHEMAS`;
   a seção "Dimensões" vira o desenho editável (`renderDimEditor`) em vez de
   campos de texto comuns
3. `renderDimEditor()` — desenha planta/iso/elevação com as cotas tocáveis
4. Botão "Gerar resumo" → `buildSummary()` → monta a ficha técnica e chama
   `renderTechDrawing()` para o desenho final
5. Botão "Salvar PDF" → `buildPDFDoc()` + download

## Testando localmente

Não dá para abrir `index.html` direto do disco em alguns navegadores sem
servidor (por causa dos `<script src="...">` e do CDN do jsPDF). Se for
testar localmente antes de publicar, rode um servidor simples dentro da
pasta, por exemplo:

```
python3 -m http.server 8000
```

e abra `http://localhost:8000` no navegador.
