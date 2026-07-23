const COS30 = Math.cos(Math.PI/6);
const SIN30 = 0.5;

function isoProject(x, y, z, ox, oy, s){
  return [ ox + (x - y) * COS30 * s, oy - (x + y) * SIN30 * s - z * s ];
}
function polyCentroid(pts){
  let cx=0, cy=0;
  pts.forEach(p => { cx+=p[0]; cy+=p[1]; });
  return [cx/pts.length, cy/pts.length];
}
function classifyEdges(planPts, ox, oy, s, H){
  const top = planPts.map(([x,y]) => isoProject(x,y,H,ox,oy,s));
  const [cx,cy] = polyCentroid(top);
  const n = top.length;
  const edges = [];
  for (let i=0;i<n;i++){
    const p1 = top[i], p2 = top[(i+1)%n];
    const dx = p2[0]-p1[0], dy = p2[1]-p1[1];
    const n1 = [dy, -dx], n2 = [-dy, dx];
    const mid = [(p1[0]+p2[0])/2, (p1[1]+p2[1])/2];
    const toC = [cx-mid[0], cy-mid[1]];
    const d1 = n1[0]*toC[0] + n1[1]*toC[1];
    const outward = d1 < 0 ? n1 : n2;
    const length = Math.hypot(dx,dy);
    const visible = outward[1] > 0.2*length;
    const pdx = planPts[(i+1)%n][0]-planPts[i][0];
    const pdy = planPts[(i+1)%n][1]-planPts[i][1];
    const isEnd = Math.abs(pdy) > Math.abs(pdx);
    edges.push({p1:planPts[i], p2:planPts[(i+1)%n], top1:p1, top2:p2, visible, isEnd, length});
  }
  return {edges, top};
}

function num(v, fallback){
  if (v === undefined || v === null || v === '') return fallback;
  const n = parseFloat(String(v).replace(',', '.'));
  return (isFinite(n) && n > 0) ? n : fallback;
}

// Returns { pts, dims, W, D, walls } where walls = { fundo:[[p1,p2],...], esquerda:[[p1,p2],...], direita:[[p1,p2],...] }
function buildFootprint(type, answers){
  if (type === 'ilha'){
    const w = num(answers.largura, 200);
    const d = num(answers.profundidade, 60);
    return {
      pts: [[0,0],[w,0],[w,d],[0,d]],
      dims: [ {id:'largura', value:w, edge:[[0,0],[w,0]]}, {id:'profundidade', value:d, edge:[[0,0],[0,d]]} ],
      W:w, D:d,
      walls: null // island: no walls ever
    };
  }
  if (type === 'reta'){
    const w = num(answers.largura, 250);
    const d = num(answers.profundidade, 60);
    return {
      pts: [[0,0],[w,0],[w,d],[0,d]],
      dims: [ {id:'largura', value:w, edge:[[0,0],[w,0]]}, {id:'profundidade', value:d, edge:[[0,0],[0,d]]} ],
      W:w, D:d,
      walls: {
        direita: [[[w,0],[w,d]]],
        fundo: [[[w,d],[0,d]]],
        esquerda: [[[0,d],[0,0]]]
      }
    };
  }
  if (type === 'l'){
    const La = num(answers.largura_esquerda, 150);
    const Lb = num(answers.largura_direita, 150);
    const Da = num(answers.profundidade_esquerda, 60);
    const Db = num(answers.profundidade_direita, 60);
    const pts = [[0,0],[La,0],[La,Da],[Db,Da],[Db,Lb],[0,Lb]];
    return {
      pts,
      dims: [
        {id:'largura_esquerda', value:La, edge:[[0,0],[La,0]]},
        {id:'profundidade_esquerda', value:Da, edge:[[La,0],[La,Da]]},
        {id:'profundidade_direita', value:Db, edge:[[0,0],[Db,0]]},
        {id:'largura_direita', value:Lb, edge:[[0,0],[0,Lb]]}
      ],
      W: Math.max(La,Db), D: Math.max(Lb,Da),
      walls: {
        direita: [[[La,0],[La,Da]]],
        fundo: [[[La,Da],[Db,Da]], [[Db,Lb],[0,Lb]]],
        esquerda: [[[0,Lb],[0,0]]]
      }
    };
  }
  if (type === 'u'){
    const Pe = num(answers.profundidade_esquerda, 60);
    const Pd = num(answers.profundidade_direita, 60);
    const Gf = num(answers.largura_fundo, 120);
    const Pf = num(answers.profundidade_fundo, 60);
    const Le = num(answers.largura_esquerda, 200);
    const Ld = num(answers.largura_direita, 200);
    const Dtot = Math.max(Le, Ld, Pf+10);
    const notchFront = Math.max(0, Dtot - Pf);
    const W = Pe + Gf + Pd;
    const pts = [[0,0],[Pe,0],[Pe,notchFront],[Pe+Gf,notchFront],[Pe+Gf,0],[W,0],[W,Dtot],[0,Dtot]];
    return {
      pts,
      dims: [
        {id:'profundidade_esquerda', value:Pe, edge:[[0,0],[Pe,0]]},
        {id:'largura_fundo', value:Gf, edge:[[Pe,0],[Pe+Gf,0]]},
        {id:'profundidade_direita', value:Pd, edge:[[Pe+Gf,0],[W,0]]},
        {id:'largura_esquerda', value:Dtot, edge:[[0,0],[0,Dtot]]},
        {id:'profundidade_fundo', value:Pf, edge:[[Pe,notchFront],[Pe,Dtot]]}
      ],
      W, D: Dtot,
      walls: {
        direita: [[[W,0],[W,Dtot]]],
        fundo: [[[W,Dtot],[0,Dtot]]],
        esquerda: [[[0,Dtot],[0,0]]]
      }
    };
  }
  if (type === 'especial'){
    const we = num(answers.largura_esquerda, 80);
    const wc = num(answers.largura_centro, 80);
    const wd = num(answers.largura_direita, 80);
    const de = num(answers.profundidade_esquerda, 50);
    const dc = num(answers.profundidade_centro, 65);
    const dd = num(answers.profundidade_direita, 50);
    const W = we+wc+wd;
    const pts = [
      [0,0],[W,0],[W,dd],[we+wc,dd],[we+wc,dc],[we,dc],[we,de],[0,de]
    ];
    return {
      pts,
      dims: [
        {id:'largura_esquerda', value:we, edge:[[0,0],[we,0]]},
        {id:'largura_centro', value:wc, edge:[[we,0],[we+wc,0]]},
        {id:'largura_direita', value:wd, edge:[[we+wc,0],[W,0]]},
        {id:'profundidade_esquerda', value:de, edge:[[0,0],[0,de]]},
        {id:'profundidade_centro', value:dc, edge:[[we,dc],[we,0]]},
        {id:'profundidade_direita', value:dd, edge:[[we+wc,dd],[we+wc,0]]}
      ],
      W, D: Math.max(de,dc,dd),
      walls: {
        direita: [[[W,0],[W,dd]]],
        fundo: [[[W,dd],[we+wc,dd]], [[we+wc,dc],[we,dc]], [[we,de],[0,de]]],
        esquerda: [[[0,de],[0,0]]]
      }
    };
  }
  if (type === 'wc'){
    const W = num(answers.largura, 144.1);
    const D = num(answers.profundidade, 45);
    const abaW = num(answers.largura_aba, 15);
    const abaD = num(answers.profundidade_aba, 15);
    const A=[0,D-abaD], B=[abaW,D-abaD], C=[abaW,0], Dp=[abaW+W,0], E=[abaW+W,D], F=[0,D];
    const pts = [A,B,C,Dp,E,F];
    return {
      pts,
      dims: [
        {id:'largura', value:W, edge:[C,Dp]},
        {id:'largura_aba', value:abaW, edge:[A,B]},
        {id:'profundidade', value:D, edge:[F,A]},
        {id:'profundidade_aba', value:abaD, edge:[B,C]}
      ],
      W: abaW+W, D,
      walls: {
        direita: [[Dp,E]],
        fundo: [[E,F]],
        esquerda: [[F,A]]
      },
      // generic centroid-based visibility misjudges this stepped shape, so the
      // visible/hatched iso edges are given explicitly here instead
      isoOverride: {
        visible: [[A,B],[B,C],[C,Dp],[F,A]],
        hatch: [[B,C],[F,A]]
      }
    };
  }
  return { pts:[[0,0],[100,0],[100,60],[0,60]], dims:[], W:100, D:60, walls:null };
}

function parseSize(text, fallbackW, fallbackD){
  if (!text) return { w: fallbackW, d: fallbackD };
  const m3 = text.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/i);
  if (m3) return { w: parseFloat(m3[1].replace(',','.')), d: parseFloat(m3[3].replace(',','.')) };
  const m2 = text.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/i);
  if (m2) return { w: parseFloat(m2[1].replace(',','.')), d: parseFloat(m2[2].replace(',','.')) };
  return { w: fallbackW, d: fallbackD };
}

function parsePosition(text, totalW, totalD, size){
  const result = { x0:null, x1:null, y0:null, y1:null };
  if (text){
    const re = /(\d+(?:[.,]\d+)?)\s*cm[^\n\d]{0,20}?(lateral\s*esquerda|lateral\s*direita|parte\s*inferior|parte\s*posterior)/gi;
    let m;
    const left=[], right=[], front=[], back=[];
    while ((m = re.exec(text)) !== null){
      const numV = parseFloat(m[1].replace(',', '.'));
      const kw = m[2].toLowerCase().replace(/\s+/g,' ');
      if (kw.includes('lateral esquerda')) left.push(numV);
      else if (kw.includes('lateral direita')) right.push(numV);
      else if (kw.includes('parte inferior')) front.push(numV);
      else if (kw.includes('parte posterior')) back.push(numV);
    }
    if (left.length >= 2){ result.x0 = Math.min(left[0],left[1]); result.x1 = Math.max(left[0],left[1]); }
    else if (left.length === 1 && right.length >= 1){ result.x0 = left[0]; result.x1 = totalW - right[0]; }
    else if (left.length === 1){ result.x0 = left[0]; }
    else if (right.length === 1){ result.x1 = totalW - right[0]; }

    if (front.length >= 1 && back.length >= 1){ result.y0 = front[0]; result.y1 = totalD - back[0]; }
    else if (front.length === 1){ result.y0 = front[0]; }
    else if (back.length === 1){ result.y1 = totalD - back[0]; }
  }
  let { w, d } = size;
  if (result.x0 !== null && result.x1 === null) result.x1 = result.x0 + w;
  if (result.x1 !== null && result.x0 === null) result.x0 = result.x1 - w;
  if (result.x0 === null && result.x1 === null){ result.x0 = (totalW - w)/2; result.x1 = result.x0 + w; }
  if (result.x0 > result.x1) { const t=result.x0; result.x0=result.x1; result.x1=t; }

  if (result.y0 !== null && result.y1 === null) result.y1 = result.y0 + d;
  if (result.y1 !== null && result.y0 === null) result.y0 = result.y1 - d;
  if (result.y0 === null && result.y1 === null){ result.y0 = (totalD - d)/2; result.y1 = result.y0 + d; }
  if (result.y0 > result.y1) { const t=result.y0; result.y0=result.y1; result.y1=t; }

  const margin = Math.min(totalW, totalD) * 0.03;
  result.x0 = Math.max(margin, Math.min(result.x0, totalW - margin - 2));
  result.x1 = Math.max(result.x0 + 5, Math.min(result.x1, totalW - margin));
  result.y0 = Math.max(margin, Math.min(result.y0, totalD - margin - 2));
  result.y1 = Math.max(result.y0 + 5, Math.min(result.y1, totalD - margin));

  return [result.x0, result.y0, result.x1, result.y1];
}

function fmtN(n){ return (Math.round(n*10)/10).toString(); }
function fmtPts(pts){ return pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '); }
function isEndEdge(p1,p2){
  const dx = p2[0]-p1[0], dy = p2[1]-p1[1];
  return Math.abs(dy) > Math.abs(dx);
}
function centroid2(pts){
  let cx=0,cy=0; pts.forEach(p=>{cx+=p[0];cy+=p[1];});
  return [cx/pts.length, cy/pts.length];
}
function inwardNormal(p1,p2,c){
  const dx=p2[0]-p1[0], dy=p2[1]-p1[1];
  const n1=[dy,-dx], n2=[-dy,dx];
  const mid=[(p1[0]+p2[0])/2,(p1[1]+p2[1])/2];
  const toC=[c[0]-mid[0], c[1]-mid[1]];
  const d1 = n1[0]*toC[0]+n1[1]*toC[1];
  const inward = d1>0 ? n1 : n2;
  const len = Math.hypot(inward[0],inward[1]);
  return [inward[0]/len, inward[1]/len];
}
function outwardNormal(p1,p2,c){
  const [ix,iy] = inwardNormal(p1,p2,c);
  return [-ix,-iy];
}

/* ---------------- PLAN VIEW (with walls) ---------------- */
function buildPlanSVG(pts, dims, sinkRect, cooktopRect, faucetPt, activeWalls, opts){
  opts = opts || {};
  const editable = !!opts.editable;
  const hasValues = opts.hasValues || {};
  const band = 7, margin = 16, extraTop = 34, extraLeft = 34;
  const xs = pts.map(p=>p[0]), ys = pts.map(p=>p[1]);
  const minx=Math.min(...xs), maxx=Math.max(...xs), miny=Math.min(...ys), maxy=Math.max(...ys);
  const shift = [extraLeft-minx, extraTop-miny];
  const spts = pts.map(p => [p[0]+shift[0], p[1]+shift[1]]);
  const c = centroid2(spts);
  const n = spts.length;

  const hatchBands = [];
  for (let i=0;i<n;i++){
    const p1=spts[i], p2=spts[(i+1)%n];
    if (isEndEdge(p1,p2)){
      const [inx,iny] = inwardNormal(p1,p2,c);
      hatchBands.push([p1,p2,[p2[0]+inx*band,p2[1]+iny*band],[p1[0]+inx*band,p1[1]+iny*band]]);
    }
  }

  const vbW = (maxx-minx) + extraLeft + margin;
  const vbH = (maxy-miny) + extraTop + margin;

  let s = `<svg viewBox="0 0 ${vbW.toFixed(0)} ${vbH.toFixed(0)}" fill="none" stroke="currentColor" stroke-linejoin="round">`;

  // WALLS drawn first (behind), offset outward from the counter edge
  if (activeWalls && activeWalls.length){
    activeWalls.forEach(([p1,p2]) => {
      const a = [p1[0]+shift[0], p1[1]+shift[1]];
      const b = [p2[0]+shift[0], p2[1]+shift[1]];
      const [ox,oy] = outwardNormal(a,b,c);
      const wOff = 5;
      const wa = [a[0]+ox*wOff, a[1]+oy*wOff];
      const wb = [b[0]+ox*wOff, b[1]+oy*wOff];
      s += `<line x1="${wa[0].toFixed(1)}" y1="${wa[1].toFixed(1)}" x2="${wb[0].toFixed(1)}" y2="${wb[1].toFixed(1)}" stroke-width="5" stroke="#8A887E" stroke-linecap="square"/>`;
    });
  }

  s += `<polygon points="${fmtPts(spts)}" fill="#FCFCFA" stroke-width="2"/>`;
  hatchBands.forEach(q => { s += `<polygon points="${fmtPts(q)}" fill="url(#hatchPlan)" stroke-width="1.3"/>`; });

  const labels = [];
  dims.forEach(d => {
    const known = editable ? !!hasValues[d.id] : true;
    const [p1,p2] = d.edge;
    const a = [p1[0]+shift[0], p1[1]+shift[1]];
    const b = [p2[0]+shift[0], p2[1]+shift[1]];
    const horiz = Math.abs(a[1]-b[1]) < 0.01;
    const offset = 12;
    let la, lb, tickA, tickB, labelPos, rot=0;
    if (horiz){
      const yy = Math.min(a[1],b[1]) - offset;
      la = [a[0], yy]; lb = [b[0], yy];
      tickA = [[a[0],yy-4],[a[0],yy+4]];
      tickB = [[b[0],yy-4],[b[0],yy+4]];
      labelPos = [(a[0]+b[0])/2, yy-3];
    } else {
      const xx = Math.min(a[0],b[0]) - offset;
      la = [xx, a[1]]; lb = [xx, b[1]];
      tickA = [[xx-4,a[1]],[xx+4,a[1]]];
      tickB = [[xx-4,b[1]],[xx+4,b[1]]];
      labelPos = [xx-5, (a[1]+b[1])/2];
      rot = -90;
    }
    if (!editable || known){
      s += `<g stroke="#2451D6" stroke-width="1">`;
      s += `<line x1="${la[0].toFixed(1)}" y1="${la[1].toFixed(1)}" x2="${lb[0].toFixed(1)}" y2="${lb[1].toFixed(1)}"/>`;
      s += `<line x1="${tickA[0][0].toFixed(1)}" y1="${tickA[0][1].toFixed(1)}" x2="${tickA[1][0].toFixed(1)}" y2="${tickA[1][1].toFixed(1)}"/>`;
      s += `<line x1="${tickB[0][0].toFixed(1)}" y1="${tickB[0][1].toFixed(1)}" x2="${tickB[1][0].toFixed(1)}" y2="${tickB[1][1].toFixed(1)}"/>`;
      s += `</g>`;
    }
    if (!editable){
      s += `<text x="${labelPos[0].toFixed(1)}" y="${labelPos[1].toFixed(1)}" font-size="7" font-family="monospace" fill="#2451D6" stroke="none" text-anchor="middle" ${rot? `transform="rotate(${rot} ${labelPos[0].toFixed(1)} ${labelPos[1].toFixed(1)})"`:''}>${fmtN(d.value)} cm</text>`;
    } else {
      labels.push({ id:d.id, x:labelPos[0], y:labelPos[1], rot, value:d.value, known });
    }
  });

  if (sinkRect){
    const [x0,y0,x1,y1] = sinkRect;
    const p = [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(p=>[p[0]+shift[0],p[1]+shift[1]]);
    s += `<polygon points="${fmtPts(p)}" fill="none" stroke-width="1.2"/>`;
  }
  if (cooktopRect){
    const [x0,y0,x1,y1] = cooktopRect;
    const p = [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(p=>[p[0]+shift[0],p[1]+shift[1]]);
    s += `<polygon points="${fmtPts(p)}" fill="none" stroke-width="1.2" stroke-dasharray="3 2"/>`;
  }
  if (faucetPt){
    const fp = [faucetPt[0]+shift[0], faucetPt[1]+shift[1]];
    s += `<circle cx="${fp[0].toFixed(1)}" cy="${fp[1].toFixed(1)}" r="2.4" stroke-width="1.2"/>`;
  }
  s += '</svg>';
  return { svg:s, vbW, vbH, labels };
}

/* ---------------- ISOMETRIC VIEW (with walls + frontao/saia) ---------------- */
function buildIsoSVG(pts, sinkRect, cooktopRect, faucetPt, H, targetW, targetTopH, activeWalls, frontaoVal, saiaVal, isoOverride){
  H = H || 8;
  const xsRaw = pts.map(([x,y]) => (x-y)*Math.cos(Math.PI/6));
  const ysRaw = pts.map(([x,y]) => -(x+y)*0.5);
  const w = Math.max(...xsRaw)-Math.min(...xsRaw);
  const h = Math.max(...ysRaw)-Math.min(...ysRaw);
  const s = Math.min(targetW/w, targetTopH/h);
  const ox = 14 - Math.min(...xsRaw)*s;
  const oy = 12 - Math.min(...ysRaw)*s;

  const top = pts.map(([x,y]) => isoProject(x,y,H,ox,oy,s));
  const plain = [], hatch = [];

  if (isoOverride){
    const hatchKeys = new Set(isoOverride.hatch.map(([a,b]) => a[0]+','+a[1]+'|'+b[0]+','+b[1]));
    isoOverride.visible.forEach(([p1,p2]) => {
      const top1 = isoProject(p1[0],p1[1],H,ox,oy,s), top2 = isoProject(p2[0],p2[1],H,ox,oy,s);
      const base1 = isoProject(p1[0],p1[1],0,ox,oy,s), base2 = isoProject(p2[0],p2[1],0,ox,oy,s);
      const quad = [top1, top2, base2, base1];
      const key = p1[0]+','+p1[1]+'|'+p2[0]+','+p2[1];
      (hatchKeys.has(key) ? hatch : plain).push(quad);
    });
  } else {
    const { edges } = classifyEdges(pts, ox, oy, s, H);
    const vis = edges.filter(e => e.visible);
    vis.forEach(e => {
      const [x1,y1]=e.p1, [x2,y2]=e.p2;
      const base1 = isoProject(x1,y1,0,ox,oy,s), base2 = isoProject(x2,y2,0,ox,oy,s);
      const quad = [e.top1, e.top2, base2, base1];
      (e.isEnd ? hatch : plain).push(quad);
    });
  }

  let wallExtraH = 0;
  const wallH = 42;
  if (activeWalls && activeWalls.length) wallExtraH = wallH*s*0.55; // walls rise above top face

  let frontExtraH = 0;
  const fVal = frontaoVal||0, sVal = saiaVal||0;
  if (fVal>0 || sVal>0) frontExtraH = (fVal+sVal)*s;

  const totalH = h*s + H*s + 12 + 10 + wallExtraH + frontExtraH;
  const totalW = w*s + 14 + 12;

  let svg = `<svg viewBox="0 0 ${totalW.toFixed(0)} ${totalH.toFixed(0)}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">`;

  // WALLS first (drawn behind the counter block)
  if (activeWalls && activeWalls.length){
    activeWalls.forEach(([p1,p2]) => {
      const top1 = isoProject(p1[0],p1[1],H,ox,oy,s);
      const top2 = isoProject(p2[0],p2[1],H,ox,oy,s);
      const wallTop1 = isoProject(p1[0],p1[1],H+wallH,ox,oy,s);
      const wallTop2 = isoProject(p2[0],p2[1],H+wallH,ox,oy,s);
      svg += `<polygon points="${fmtPts([wallTop1,wallTop2,top2,top1])}" fill="#EDEBF5" stroke="#B9B6C9" stroke-width="1"/>`;
    });
  }

  plain.forEach(q => svg += `<polygon points="${fmtPts(q)}" fill="#F7F6F3"/>`);
  hatch.forEach(q => svg += `<polygon points="${fmtPts(q)}" fill="url(#hatchIso)"/>`);
  svg += `<polygon points="${fmtPts(top)}" fill="#FCFCFA" stroke-width="2"/>`;

  if (sinkRect){
    const [x0,y0,x1,y1] = sinkRect;
    const sp = [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(([x,y]) => isoProject(x,y,H,ox,oy,s));
    svg += `<polygon points="${fmtPts(sp)}" fill="#EFEDE7" stroke-width="1.1"/>`;
  }
  if (cooktopRect){
    const [x0,y0,x1,y1] = cooktopRect;
    const cp = [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(([x,y]) => isoProject(x,y,H,ox,oy,s));
    svg += `<polygon points="${fmtPts(cp)}" fill="#EFEDE7" stroke-width="1.1" stroke-dasharray="3 2"/>`;
  }
  if (faucetPt){
    const [fx,fy] = isoProject(faucetPt[0], faucetPt[1], H, ox, oy, s);
    svg += `<ellipse cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" rx="3" ry="1.5" transform="rotate(-20 ${fx.toFixed(1)} ${fy.toFixed(1)})" stroke-width="1.1"/>`;
  }

  // FRONTAO / SAIA hanging panels on all front (y=0) edges
  if (fVal>0 || sVal>0){
    const frontEdges = [];
    for (let i=0;i<pts.length;i++){
      const p1=pts[i], p2=pts[(i+1)%pts.length];
      if (p1[1]===0 && p2[1]===0) frontEdges.push([p1,p2]);
    }
    frontEdges.forEach(([p1,p2]) => {
      if (fVal>0){
        const t1 = isoProject(p1[0],p1[1],0,ox,oy,s);
        const t2 = isoProject(p2[0],p2[1],0,ox,oy,s);
        const b1 = isoProject(p1[0],p1[1],-fVal,ox,oy,s);
        const b2 = isoProject(p2[0],p2[1],-fVal,ox,oy,s);
        svg += `<polygon points="${fmtPts([t1,t2,b2,b1])}" fill="#F7F6F3" stroke-width="1.3"/>`;
      }
      if (sVal>0){
        const zTop = -fVal;
        const zBot = -(fVal+sVal);
        const t1 = isoProject(p1[0],p1[1],zTop,ox,oy,s);
        const t2 = isoProject(p2[0],p2[1],zTop,ox,oy,s);
        const b1 = isoProject(p1[0],p1[1],zBot,ox,oy,s);
        const b2 = isoProject(p2[0],p2[1],zBot,ox,oy,s);
        svg += `<polygon points="${fmtPts([t1,t2,b2,b1])}" fill="#F0EFEA" stroke-width="1.3"/>`;
      }
    });
    // labels
    const midFront = frontEdges[0];
    if (midFront){
      const [p1,p2] = midFront;
      const midx = (p1[0]+p2[0])/2;
      if (fVal>0){
        const [lx,ly] = isoProject(midx,0,-fVal/2,ox,oy,s);
        svg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="6.5" font-family="monospace" fill="#2451D6" stroke="none" text-anchor="middle">Frontão ${fmtN(fVal)}cm</text>`;
      }
      if (sVal>0){
        const [lx,ly] = isoProject(midx,0,-fVal-sVal/2,ox,oy,s);
        svg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="6.5" font-family="monospace" fill="#2451D6" stroke="none" text-anchor="middle">Saia ${fmtN(sVal)}cm</text>`;
      }
    }
  }

  svg += '</svg>';
  return { svg, vbW: totalW, vbH: totalH };
}

/* ---------------- ELEVATION VIEW (front: width x height-from-floor) ---------------- */
function buildElevationSVG(W, altura, opts){
  opts = opts || {};
  const wallLeft = !!opts.wallLeft, wallRight = !!opts.wallRight;
  const frontaoVal = opts.frontaoVal || 0, saiaVal = opts.saiaVal || 0;
  const editable = !!opts.editable;
  const hasValues = opts.hasValues || {};
  const frontaoApplicable = opts.frontaoApplicable !== false;
  const saiaApplicable = opts.saiaApplicable !== false;
  const thickness = 4; // representative visual thickness (not a collected field)

  const marginL = 34, marginR = 14, marginTop = 14, marginBottom = 14;
  const wallExtra = (wallLeft||wallRight) ? 30 : 0;
  const hangExtra = frontaoVal + saiaVal;

  const vbW = W + marginL + marginR;
  const vbH = altura + thickness + wallExtra + hangExtra + marginTop + marginBottom;
  const floorY = vbH - marginBottom;
  const X = (x) => x + marginL;
  const Y = (hFromFloor) => floorY - hFromFloor;
  const labels = [];

  let s = `<svg viewBox="0 0 ${vbW.toFixed(0)} ${vbH.toFixed(0)}" fill="none" stroke="currentColor" stroke-linejoin="round">`;
  s += `<line x1="${X(-6).toFixed(1)}" y1="${floorY.toFixed(1)}" x2="${X(W+6).toFixed(1)}" y2="${floorY.toFixed(1)}" stroke-width="1.6"/>`;

  const wallTopH = altura + thickness + wallExtra*0.7;
  if (wallLeft){
    const x0=X(-2), x1=X(6);
    s += `<polygon points="${x0.toFixed(1)},${floorY.toFixed(1)} ${x1.toFixed(1)},${floorY.toFixed(1)} ${x1.toFixed(1)},${Y(wallTopH).toFixed(1)} ${x0.toFixed(1)},${Y(wallTopH).toFixed(1)}" fill="url(#hatchPlan)" stroke-width="1.3"/>`;
  }
  if (wallRight){
    const x0=X(W-6), x1=X(W+2);
    s += `<polygon points="${x0.toFixed(1)},${floorY.toFixed(1)} ${x1.toFixed(1)},${floorY.toFixed(1)} ${x1.toFixed(1)},${Y(wallTopH).toFixed(1)} ${x0.toFixed(1)},${Y(wallTopH).toFixed(1)}" fill="url(#hatchPlan)" stroke-width="1.3"/>`;
  }

  const topY = Y(altura), botY = Y(altura - thickness);
  s += `<polygon points="${X(0).toFixed(1)},${topY.toFixed(1)} ${X(W).toFixed(1)},${topY.toFixed(1)} ${X(W).toFixed(1)},${botY.toFixed(1)} ${X(0).toFixed(1)},${botY.toFixed(1)}" fill="#FCFCFA" stroke-width="2"/>`;

  let curH = altura - thickness;
  const frontaoKnown = editable ? !!hasValues.frontao : true;
  const saiaKnown = editable ? !!hasValues.saia : true;
  const alturaKnown = editable ? !!hasValues.altura : true;

  if (frontaoVal > 0 && (!editable || frontaoKnown)){
    const y0 = Y(curH), y1 = Y(curH - frontaoVal);
    s += `<polygon points="${X(0).toFixed(1)},${y0.toFixed(1)} ${X(W).toFixed(1)},${y0.toFixed(1)} ${X(W).toFixed(1)},${y1.toFixed(1)} ${X(0).toFixed(1)},${y1.toFixed(1)}" fill="#F7F6F3" stroke-width="1.3"/>`;
    const midY = (y0+y1)/2;
    if (!editable){
      s += `<text x="${((X(0)+X(W))/2).toFixed(1)}" y="${(midY+2.5).toFixed(1)}" font-size="7" font-family="monospace" fill="#2451D6" stroke="none" text-anchor="middle">Frontão ${fmtN(frontaoVal)}cm</text>`;
    } else {
      labels.push({ id:'frontao', x:(X(0)+X(W))/2, y:midY, rot:0, value:frontaoVal, known:true, prefix:'Frontão' });
    }
    curH -= frontaoVal;
  } else if (editable && !frontaoKnown && frontaoApplicable){
    labels.push({ id:'frontao', x:(X(0)+X(W))/2, y:Y(curH), rot:0, value:0, known:false, prefix:'Frontão' });
  }

  if (saiaVal > 0 && (!editable || saiaKnown)){
    const y0 = Y(curH), y1 = Y(curH - saiaVal);
    s += `<polygon points="${X(0).toFixed(1)},${y0.toFixed(1)} ${X(W).toFixed(1)},${y0.toFixed(1)} ${X(W).toFixed(1)},${y1.toFixed(1)} ${X(0).toFixed(1)},${y1.toFixed(1)}" fill="#F0EFEA" stroke-width="1.3"/>`;
    const midY = (y0+y1)/2;
    if (!editable){
      s += `<text x="${((X(0)+X(W))/2).toFixed(1)}" y="${(midY+2.5).toFixed(1)}" font-size="7" font-family="monospace" fill="#2451D6" stroke="none" text-anchor="middle">Saia ${fmtN(saiaVal)}cm</text>`;
    } else {
      labels.push({ id:'saia', x:(X(0)+X(W))/2, y:midY, rot:0, value:saiaVal, known:true, prefix:'Saia' });
    }
    curH -= saiaVal;
  } else if (editable && !saiaKnown && saiaApplicable){
    labels.push({ id:'saia', x:(X(0)+X(W))/2, y:Y(curH), rot:0, value:0, known:false, prefix:'Saia' });
  }

  const dimX = X(-18);
  const dimMidY = (floorY+topY)/2;
  if (!editable || alturaKnown){
    s += `<g stroke="#2451D6" stroke-width="1">`;
    s += `<line x1="${dimX.toFixed(1)}" y1="${floorY.toFixed(1)}" x2="${dimX.toFixed(1)}" y2="${topY.toFixed(1)}"/>`;
    s += `<line x1="${(dimX-4).toFixed(1)}" y1="${floorY.toFixed(1)}" x2="${(dimX+4).toFixed(1)}" y2="${floorY.toFixed(1)}"/>`;
    s += `<line x1="${(dimX-4).toFixed(1)}" y1="${topY.toFixed(1)}" x2="${(dimX+4).toFixed(1)}" y2="${topY.toFixed(1)}"/>`;
    s += `</g>`;
  }
  if (!editable){
    s += `<text x="${dimX.toFixed(1)}" y="${dimMidY.toFixed(1)}" font-size="7" font-family="monospace" fill="#2451D6" stroke="none" text-anchor="middle" transform="rotate(-90 ${dimX.toFixed(1)} ${dimMidY.toFixed(1)})">${fmtN(altura)} cm</text>`;
  } else {
    labels.push({ id:'altura', x:dimX, y:dimMidY, rot:-90, value:altura, known:alturaKnown, prefix:'' });
  }

  s += '</svg>';
  return { svg: s, vbW, vbH, labels };
}

/* ---------------------------------------------------------
   EDITABLE COTAS — dimensions are entered by tapping the value
   directly on the drawing, then confirmed with "Atualizar
   desenho" (batch update, nothing recalculates as you type).
--------------------------------------------------------- */
