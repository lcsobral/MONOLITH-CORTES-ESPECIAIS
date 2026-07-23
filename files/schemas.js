/* ---------------------------------------------------------
   ICONS (simple blueprint-style floor plan outlines)
--------------------------------------------------------- */
const ICONS = {
  ilha: {
    plan: `<svg viewBox="0 0 100 78" fill="none" stroke="currentColor" stroke-linejoin="round">
    <g stroke="#2451D6" stroke-width="1.1">
      <line x1="22.0" y1="12.0" x2="86.0" y2="12.0"/>
      <line x1="22.0" y1="8.0" x2="22.0" y2="16.0"/>
      <line x1="86.0" y1="8.0" x2="86.0" y2="16.0"/>
      <line x1="12.0" y1="22.0" x2="12.0" y2="64.0"/>
      <line x1="8.0" y1="22.0" x2="16.0" y2="22.0"/>
      <line x1="8.0" y1="64.0" x2="16.0" y2="64.0"/>
    </g>
    <polygon points="22.0,22.0 86.0,22.0 86.0,64.0 22.0,64.0" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="86.0,22.0 86.0,64.0 79.0,64.0 79.0,22.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="22.0,64.0 22.0,22.0 29.0,22.0 29.0,64.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="42.0,32.0 66.0,32.0 66.0,52.0 42.0,52.0" fill="none" stroke-width="1.3"/>
    <circle cx="54.0" cy="55.0" r="2" stroke-width="1.2"/>
    <g stroke="#3D8A5A" stroke-width="1">
      <line x1="22.0" y1="25.0" x2="42.0" y2="25.0"/>
      <line x1="22.0" y1="22.0" x2="22.0" y2="28.0"/>
      <line x1="42.0" y1="22.0" x2="42.0" y2="28.0"/>
      <line x1="35.0" y1="22.0" x2="35.0" y2="32.0"/>
      <line x1="32.0" y1="22.0" x2="38.0" y2="22.0"/>
      <line x1="32.0" y1="32.0" x2="38.0" y2="32.0"/>
    </g>
</svg>`,
    iso: `<svg viewBox="0 0 176 116" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
    <polygon points="65.5,76.2 147.1,29.1 147.1,40.9 65.5,88.0" fill="#F7F6F3"/>
    <polygon points="12.0,45.3 65.5,76.2 65.5,88.0 12.0,57.1" fill="url(#hatchIso)"/>
    <polygon points="65.5,76.2 147.1,29.1 93.6,-1.8 12.0,45.3" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="78.3,54.2 108.9,36.5 83.4,21.8 52.8,39.4" fill="#EFEDE7" stroke-width="1.2"/>
    <ellipse cx="64.3" cy="28.4" rx="3.2" ry="1.6" transform="rotate(-20 64.3 28.4)" stroke-width="1.2"/>
</svg>`
  },
  reta: {
    plan: `<svg viewBox="0 0 124 52" fill="none" stroke="currentColor" stroke-linejoin="round">
    <g stroke="#2451D6" stroke-width="1.1">
      <line x1="22.0" y1="12.0" x2="110.0" y2="12.0"/>
      <line x1="22.0" y1="8.0" x2="22.0" y2="16.0"/>
      <line x1="110.0" y1="8.0" x2="110.0" y2="16.0"/>
      <line x1="12.0" y1="22.0" x2="12.0" y2="38.0"/>
      <line x1="8.0" y1="22.0" x2="16.0" y2="22.0"/>
      <line x1="8.0" y1="38.0" x2="16.0" y2="38.0"/>
    </g>
    <polygon points="22.0,22.0 110.0,22.0 110.0,38.0 22.0,38.0" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="110.0,22.0 110.0,38.0 103.0,38.0 103.0,22.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="22.0,38.0 22.0,22.0 29.0,22.0 29.0,38.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="44.0,25.0 64.0,25.0 64.0,35.0 44.0,35.0" fill="none" stroke-width="1.3"/>
    <circle cx="54.0" cy="36.5" r="2" stroke-width="1.2"/>
    <g stroke="#3D8A5A" stroke-width="1">
      <line x1="22.0" y1="18.0" x2="44.0" y2="18.0"/>
      <line x1="22.0" y1="15.0" x2="22.0" y2="21.0"/>
      <line x1="44.0" y1="15.0" x2="44.0" y2="21.0"/>
      <line x1="37.0" y1="22.0" x2="37.0" y2="25.0"/>
      <line x1="34.0" y1="22.0" x2="40.0" y2="22.0"/>
      <line x1="34.0" y1="25.0" x2="40.0" y2="25.0"/>
    </g>
</svg>`,
    iso: `<svg viewBox="0 0 176 116" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
    <polygon points="32.8,76.0 147.1,10.0 147.1,22.0 32.8,88.0" fill="#F7F6F3"/>
    <polygon points="12.0,64.0 32.8,76.0 32.8,88.0 12.0,76.0" fill="url(#hatchIso)"/>
    <polygon points="32.8,76.0 147.1,10.0 126.3,-2.0 12.0,64.0" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="57.5,57.2 83.4,42.2 70.5,34.8 44.5,49.8" fill="#EFEDE7" stroke-width="1.2"/>
    <ellipse cx="55.5" cy="41.1" rx="3.2" ry="1.6" transform="rotate(-20 55.5 41.1)" stroke-width="1.2"/>
</svg>`
  },
  l: {
    plan: `<svg viewBox="0 0 112 82" fill="none" stroke="currentColor" stroke-linejoin="round">
    <g stroke="#2451D6" stroke-width="1.1">
      <line x1="22.0" y1="12.0" x2="98.0" y2="12.0"/>
      <line x1="22.0" y1="8.0" x2="22.0" y2="16.0"/>
      <line x1="98.0" y1="8.0" x2="98.0" y2="16.0"/>
      <line x1="12.0" y1="22.0" x2="12.0" y2="68.0"/>
      <line x1="8.0" y1="22.0" x2="16.0" y2="22.0"/>
      <line x1="8.0" y1="68.0" x2="16.0" y2="68.0"/>
    </g>
    <polygon points="22.0,22.0 98.0,22.0 98.0,44.0 50.0,44.0 50.0,68.0 22.0,68.0" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="98.0,22.0 98.0,44.0 91.0,44.0 91.0,22.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="50.0,44.0 50.0,68.0 57.0,68.0 57.0,44.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="22.0,68.0 22.0,22.0 29.0,22.0 29.0,68.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="64.0,26.0 84.0,26.0 84.0,40.0 64.0,40.0" fill="none" stroke-width="1.3"/>
    <circle cx="74.0" cy="41.5" r="2" stroke-width="1.2"/>
    <g stroke="#3D8A5A" stroke-width="1">
      <line x1="22.0" y1="19.0" x2="64.0" y2="19.0"/>
      <line x1="22.0" y1="16.0" x2="22.0" y2="22.0"/>
      <line x1="64.0" y1="16.0" x2="64.0" y2="22.0"/>
      <line x1="57.0" y1="22.0" x2="57.0" y2="26.0"/>
      <line x1="54.0" y1="22.0" x2="60.0" y2="22.0"/>
      <line x1="54.0" y1="26.0" x2="60.0" y2="26.0"/>
    </g>
</svg>`,
    iso: `<svg viewBox="0 0 176 116" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
    <polygon points="67.8,67.4 160.0,14.2 160.0,25.4 67.8,78.6" fill="#F7F6F3"/>
    <polygon points="133.3,-1.2 75.1,32.4 75.1,43.6 133.3,10.0" fill="#F7F6F3"/>
    <polygon points="75.1,32.4 46.0,15.6 46.0,26.8 75.1,43.6" fill="url(#hatchIso)"/>
    <polygon points="12.0,35.2 67.8,67.4 67.8,78.6 12.0,46.4" fill="url(#hatchIso)"/>
    <polygon points="67.8,67.4 160.0,14.2 133.3,-1.2 75.1,32.4 46.0,15.6 12.0,35.2" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="113.9,35.2 138.2,21.2 121.2,11.4 96.9,25.4" fill="#EFEDE7" stroke-width="1.2"/>
    <ellipse cx="107.2" cy="17.4" rx="3.2" ry="1.6" transform="rotate(-20 107.2 17.4)" stroke-width="1.2"/>
</svg>`
  },
  u: {
    plan: `<svg viewBox="0 0 128 98" fill="none" stroke="currentColor" stroke-linejoin="round">
    <g stroke="#2451D6" stroke-width="1.1">
      <line x1="22.0" y1="12.0" x2="114.0" y2="12.0"/>
      <line x1="22.0" y1="8.0" x2="22.0" y2="16.0"/>
      <line x1="114.0" y1="8.0" x2="114.0" y2="16.0"/>
      <line x1="12.0" y1="22.0" x2="12.0" y2="84.0"/>
      <line x1="8.0" y1="22.0" x2="16.0" y2="22.0"/>
      <line x1="8.0" y1="84.0" x2="16.0" y2="84.0"/>
    </g>
    <polygon points="22.0,22.0 44.0,22.0 44.0,56.0 92.0,56.0 92.0,22.0 114.0,22.0 114.0,84.0 22.0,84.0" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="44.0,22.0 44.0,56.0 51.0,56.0 51.0,22.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="92.0,56.0 92.0,22.0 85.0,22.0 85.0,56.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="114.0,22.0 114.0,84.0 107.0,84.0 107.0,22.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="22.0,84.0 22.0,22.0 29.0,22.0 29.0,84.0" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="58.0,66.0 78.0,66.0 78.0,80.0 58.0,80.0" fill="none" stroke-width="1.3"/>
    <circle cx="68.0" cy="82.0" r="2" stroke-width="1.2"/>
    <g stroke="#3D8A5A" stroke-width="1">
      <line x1="22.0" y1="59.0" x2="58.0" y2="59.0"/>
      <line x1="22.0" y1="56.0" x2="22.0" y2="62.0"/>
      <line x1="58.0" y1="56.0" x2="58.0" y2="62.0"/>
      <line x1="51.0" y1="22.0" x2="51.0" y2="66.0"/>
      <line x1="48.0" y1="22.0" x2="54.0" y2="22.0"/>
      <line x1="48.0" y1="66.0" x2="54.0" y2="66.0"/>
    </g>
</svg>`,
    iso: `<svg viewBox="0 0 176 116" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
    <polygon points="66.4,79.9 85.7,68.8 85.7,76.9 66.4,88.0" fill="#F7F6F3"/>
    <polygon points="127.8,44.4 147.1,33.3 147.1,41.4 127.8,52.5" fill="#F7F6F3"/>
    <polygon points="85.7,68.8 55.9,51.5 55.9,59.6 85.7,76.9" fill="url(#hatchIso)"/>
    <polygon points="12.0,48.5 66.4,79.9 66.4,88.0 12.0,56.6" fill="url(#hatchIso)"/>
    <polygon points="66.4,79.9 85.7,68.8 55.9,51.5 98.0,27.2 127.8,44.4 147.1,33.3 92.7,1.9 12.0,48.5" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="59.4,39.4 76.9,29.2 64.6,22.2 47.1,32.3" fill="#EFEDE7" stroke-width="1.2"/>
    <ellipse cx="54.1" cy="26.2" rx="3.2" ry="1.6" transform="rotate(-20 54.1 26.2)" stroke-width="1.2"/>
</svg>`
  },
  especial: {
    plan: `<svg viewBox="0 0 116 96" fill="none" stroke="currentColor" stroke-linejoin="round">
    <g stroke="#2451D6" stroke-width="1.1">
      <line x1="22.0" y1="12.0" x2="102.0" y2="12.0"/>
      <line x1="22.0" y1="8.0" x2="22.0" y2="16.0"/>
      <line x1="102.0" y1="8.0" x2="102.0" y2="16.0"/>
      <line x1="12.0" y1="22.0" x2="12.0" y2="82.0"/>
      <line x1="8.0" y1="22.0" x2="16.0" y2="22.0"/>
      <line x1="8.0" y1="82.0" x2="16.0" y2="82.0"/>
    </g>
    <polygon points="24.0,36.0 70.0,22.0 102.0,40.0 90.0,70.0 54.0,82.0 22.0,62.0" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="102.0,40.0 90.0,70.0 83.5,67.4 95.5,37.4" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="22.0,62.0 24.0,36.0 31.0,36.5 29.0,62.5" fill="url(#hatchPlan)" stroke-width="1.4"/>
    <polygon points="50.0,42.0 74.0,42.0 74.0,60.0 50.0,60.0" fill="none" stroke-width="1.3"/>
    <circle cx="62.0" cy="39.0" r="2" stroke-width="1.2"/>
    <g stroke="#3D8A5A" stroke-width="1">
      <line x1="22.0" y1="35.0" x2="50.0" y2="35.0"/>
      <line x1="22.0" y1="32.0" x2="22.0" y2="38.0"/>
      <line x1="50.0" y1="32.0" x2="50.0" y2="38.0"/>
      <line x1="43.0" y1="22.0" x2="43.0" y2="42.0"/>
      <line x1="40.0" y1="22.0" x2="46.0" y2="22.0"/>
      <line x1="40.0" y1="42.0" x2="46.0" y2="42.0"/>
    </g>
</svg>`,
    iso: `<svg viewBox="0 0 176 116" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
    <polygon points="49.8,75.5 130.9,50.6 130.9,63.0 49.8,88.0" fill="#F7F6F3"/>
    <polygon points="130.9,50.6 149.8,11.6 149.8,24.0 130.9,63.0" fill="#F7F6F3"/>
    <polygon points="12.0,56.8 49.8,75.5 49.8,88.0 12.0,69.3" fill="url(#hatchIso)"/>
    <polygon points="49.8,75.5 130.9,50.6 149.8,11.6 93.1,-2.5 28.2,16.2 12.0,56.8" fill="#FCFCFA" stroke-width="2"/>
    <polygon points="76.8,50.6 109.3,31.8 85.0,17.8 52.5,36.5" fill="#EFEDE7" stroke-width="1.2"/>
    <ellipse cx="97.1" cy="43.5" rx="3.2" ry="1.6" transform="rotate(-20 97.1 43.5)" stroke-width="1.2"/>
</svg>`
  },
  wc: {
    plan: `<svg viewBox="0 0 116 54" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12.0,28.0 28.0,28.0 28.0,12.0 104.0,12.0 104.0,42.0 12.0,42.0"/><polygon points="28.0,28.0 28.0,12.0 33.0,12.0 33.0,28.0" fill="url(#hatchPlan)" stroke-width="1.4"/><polygon points="12.0,42.0 12.0,28.0 17.0,28.0 17.0,42.0" fill="url(#hatchPlan)" stroke-width="1.4"/></svg>`,
    iso: `<svg viewBox="0 0 150 93" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><polygon points="28.2,64.6 44.4,55.3 44.4,64.6 28.2,74.0" fill="#F7F6F3"/><polygon points="60.6,64.6 137.6,20.2 137.6,29.5 60.6,74.0" fill="#F7F6F3"/><polygon points="44.4,55.3 60.6,64.6 60.6,74.0 44.4,64.6" fill="url(#hatchIso)"/><polygon points="14.0,56.5 28.2,64.6 28.2,74.0 14.0,65.8" fill="url(#hatchIso)"/><polygon points="28.2,64.6 44.4,55.3 60.6,64.6 137.6,20.2 107.2,2.6 14.0,56.5" fill="#FCFCFA" stroke-width="2"/></svg>`
  },
};

/* ---------------------------------------------------------
   SCHEMA
--------------------------------------------------------- */
const fechamentos = (n) => {
  const labels = ['uma lateral','duas laterais','três laterais','quatro laterais'];
  return labels.slice(0,n).map((l,i)=>({
    id:`fechamento_${i+1}`, label:`Fechamento em ${l}`, type:'boolText',
    textLabel:`Descreva o fechamento em ${l}`
  }));
};

const areasRecortes = [
  {id:'area_molhada', label:'Área molhada', type:'text'},
  {id:'area_seca', label:'Área seca', type:'text'},
];

const recortesTorneiras = [
  {id:'recorte_cuba', label:'Recorte de cuba', type:'boolText', textLabel:'Descreva o recorte de cuba'},
  {id:'recorte_cooktop', label:'Recorte de cooktop', type:'boolText', textLabel:'Descreva o recorte de cooktop'},
  {id:'recorte_calha_umida', label:'Recorte de calha úmida', type:'boolText', textLabel:'Descreva o recorte de calha úmida'},
  {id:'torneira_bancada', label:'Torneira de bancada', type:'boolText', textLabel:'Descreva a torneira de bancada'},
  {id:'torneira_pe', label:'Torneira de parede', type:'boolText', textLabel:'Descreva a torneira de parede'},
];

const paredesEApoio = [
  {id:'parede_fundo', label:'Parede de fundo', type:'bool'},
  {id:'parede_lateral_direita', label:'Parede lateral direita', type:'bool'},
  {id:'parede_lateral_esquerda', label:'Parede lateral esquerda', type:'bool'},
  {id:'recorte_parede', label:'Recorte na parede', type:'boolText', textLabel:'Descreva o recorte na parede'},
  {id:'apoiada_parede', label:'Apoiada na parede', type:'bool'},
  {id:'apoiada_marcenaria', label:'Apoiada na marcenaria', type:'bool'},
];

const SCHEMAS = {
  ilha: {
    name:'Bancada Ilha',
    desc:'Peça isolada, sem encostar em paredes',
    sections:[
      {title:'Dimensões', fields:[
        {id:'largura', label:'Largura', type:'cm'},
        {id:'profundidade', label:'Profundidade', type:'cm'},
        {id:'altura', label:'Altura', type:'cm'},
      ]},
      {title:'Material', fields:[
        {id:'material', label:'Material', type:'text'},
      ]},
      {title:'Fechamentos laterais', fields: fechamentos(4)},
      {title:'Áreas', fields: areasRecortes},
      {title:'Recortes e torneiras', fields: recortesTorneiras},
      {title:'Apoio e acabamento', fields:[
        {id:'apoiada_marcenaria', label:'Apoiada na marcenaria', type:'bool'},
      ]},
    ]
  },
  reta: {
    name:'Bancada Reta',
    desc:'Peça única, em linha reta',
    sections:[
      {title:'Dimensões', fields:[
        {id:'largura', label:'Largura', type:'cm'},
        {id:'altura', label:'Altura', type:'cm'},
        {id:'profundidade', label:'Profundidade', type:'cm'},
        {id:'saia', label:'Saia', type:'cm'},
        {id:'frontao', label:'Frontão', type:'cm'},
      ]},
      {title:'Material', fields:[
        {id:'material', label:'Material', type:'text'},
      ]},
      {title:'Fechamentos laterais', fields: fechamentos(2)},
      {title:'Áreas', fields: areasRecortes},
      {title:'Recortes e torneiras', fields: recortesTorneiras},
      {title:'Paredes e apoio', fields: paredesEApoio},
    ]
  },
  l: {
    name:'Bancada em L',
    desc:'Duas alas formando um ângulo de 90°',
    sections:[
      {title:'Dimensões', fields:[
        {id:'largura_esquerda', label:'Largura — lado esquerdo', type:'cm'},
        {id:'largura_direita', label:'Largura — lado direito', type:'cm'},
        {id:'profundidade_esquerda', label:'Profundidade — lado esquerdo', type:'cm'},
        {id:'profundidade_direita', label:'Profundidade — lado direito', type:'cm'},
        {id:'altura', label:'Altura', type:'cm'},
        {id:'saia', label:'Saia', type:'cm'},
        {id:'frontao', label:'Frontão', type:'cm'},
      ]},
      {title:'Material', fields:[
        {id:'material', label:'Material', type:'text'},
      ]},
      {title:'Fechamentos laterais', fields: fechamentos(4)},
      {title:'Áreas', fields: areasRecortes},
      {title:'Recortes e torneiras', fields: recortesTorneiras},
      {title:'Paredes e apoio', fields: paredesEApoio},
    ]
  },
  u: {
    name:'Bancada em U',
    desc:'Três alas ao longo de três paredes',
    note:'Este tipo não tinha campos detalhados na especificação original — a Monolith preparou a estrutura abaixo espelhando o padrão da Bancada em L e da Bancada Especial (medidas em três segmentos: esquerdo, fundo e direito). Ajuste se necessário.',
    sections:[
      {title:'Dimensões', fields:[
        {id:'largura_esquerda', label:'Largura — lado esquerdo', type:'cm'},
        {id:'largura_fundo', label:'Largura — fundo', type:'cm'},
        {id:'largura_direita', label:'Largura — lado direito', type:'cm'},
        {id:'profundidade_esquerda', label:'Profundidade — lado esquerdo', type:'cm'},
        {id:'profundidade_fundo', label:'Profundidade — fundo', type:'cm'},
        {id:'profundidade_direita', label:'Profundidade — lado direito', type:'cm'},
        {id:'altura', label:'Altura', type:'cm'},
        {id:'saia', label:'Saia', type:'cm'},
        {id:'frontao', label:'Frontão', type:'cm'},
      ]},
      {title:'Material', fields:[
        {id:'material', label:'Material', type:'text'},
      ]},
      {title:'Fechamentos laterais', fields: fechamentos(4)},
      {title:'Áreas', fields: areasRecortes},
      {title:'Recortes e torneiras', fields: recortesTorneiras},
      {title:'Paredes e apoio', fields: paredesEApoio},
    ]
  },
  especial: {
    name:'Bancada Especial',
    desc:'Formato exclusivo, fora do padrão',
    sections:[
      {title:'Dimensões', fields:[
        {id:'largura_esquerda', label:'Largura — lado esquerdo', type:'cm'},
        {id:'largura_centro', label:'Largura — centro', type:'cm'},
        {id:'largura_direita', label:'Largura — lado direito', type:'cm'},
        {id:'profundidade_esquerda', label:'Profundidade — lado esquerdo', type:'cm'},
        {id:'profundidade_centro', label:'Profundidade — centro', type:'cm'},
        {id:'profundidade_direita', label:'Profundidade — lado direito', type:'cm'},
        {id:'altura', label:'Altura', type:'cm'},
        {id:'saia', label:'Saia', type:'cm'},
        {id:'frontao', label:'Frontão', type:'cm'},
      ]},
      {title:'Material', fields:[
        {id:'material', label:'Material', type:'text'},
      ]},
      {title:'Fechamentos laterais', fields: fechamentos(4)},
      {title:'Áreas', fields: areasRecortes},
      {title:'Recortes e torneiras', fields: recortesTorneiras},
      {title:'Paredes e apoio', fields: paredesEApoio},
      {title:'Sobre o projeto', fields:[
        {id:'sobre_projeto', label:'Fale mais sobre seu projeto', type:'text'},
      ]},
    ]
  },
  wc: {
    name:'Bancada WC sob Cx Acoplada',
    desc:'Bancada de banheiro com nicho para caixa acoplada',
    note:'Categoria nova, baseada na referência enviada — a aba mais estreita representa o nicho que contorna a caixa acoplada. Ajuste os campos se sua referência for diferente.',
    sections:[
      {title:'Dimensões', fields:[
        {id:'largura', label:'Largura do tampo principal', type:'cm'},
        {id:'profundidade', label:'Profundidade do tampo principal', type:'cm'},
        {id:'largura_aba', label:'Largura da aba (nicho da caixa acoplada)', type:'cm'},
        {id:'profundidade_aba', label:'Profundidade da aba', type:'cm'},
        {id:'altura', label:'Altura do piso até o tampo', type:'cm'},
        {id:'saia', label:'Saia', type:'cm'},
        {id:'frontao', label:'Frontão', type:'cm'},
      ]},
      {title:'Material', fields:[
        {id:'material', label:'Material', type:'text'},
      ]},
      {title:'Fechamentos laterais', fields: fechamentos(2)},
      {title:'Áreas', fields: areasRecortes},
      {title:'Recortes e torneiras', fields:[
        {id:'recorte_cuba', label:'Recorte de cuba', type:'boolText', textLabel:'Descreva o recorte de cuba'},
        {id:'recorte_calha_umida', label:'Recorte de calha úmida', type:'boolText', textLabel:'Descreva o recorte de calha úmida'},
        {id:'torneira_bancada', label:'Torneira de bancada', type:'boolText', textLabel:'Descreva a torneira de bancada'},
        {id:'torneira_pe', label:'Torneira de parede', type:'boolText', textLabel:'Descreva a torneira de parede'},
      ]},
      {title:'Paredes e apoio', fields: paredesEApoio},
    ]
  },
};

const TYPE_ORDER = ['ilha','reta','l','u','especial','wc'];
