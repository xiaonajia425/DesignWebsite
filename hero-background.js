(() => {
  const hero = document.querySelector('.hero');
  const grid = hero?.querySelector('.hero-blueprint');
  if (!hero || !grid) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 996px)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const cellSize = 1314 / 15;
  const cells = [];
  const byPosition = new Map();
  let visible = true;
  let layoutFrame = 0;
  let pointerFrame = 0;
  let pointer = null;
  let lastPointerCell = null;
  let sequence = 0;

  const pointPattern = Array.from({length:16}, (_,i) => `<circle class="matrix-dot" cx="${9+(i%4)*18}" cy="${9+Math.floor(i/4)*18}" r=".85"/>`).join('');
  const diagrams = [
    '<rect class="matrix-square" x="31" y="13" width="10" height="10"/><rect class="matrix-square" style="--order:1" x="49" y="31" width="10" height="10"/><rect class="matrix-square" style="--order:2" x="31" y="49" width="10" height="10"/><rect class="matrix-square" style="--order:3" x="13" y="31" width="10" height="10"/><path class="matrix-link" d="M23 18h8M36 23v26M54 41v12"/>',
    '<rect class="matrix-square" x="49" y="13" width="10" height="10"/><rect class="matrix-square" style="--order:1" x="31" y="31" width="10" height="10"/><rect class="matrix-square" style="--order:2" x="11" y="47" width="14" height="14"/><path class="matrix-link" d="M23 18h26M36 41v13M18 41v6"/>',
    '<rect class="matrix-square" x="31" y="13" width="10" height="10"/><rect class="matrix-square" style="--order:1" x="49" y="13" width="10" height="10"/><rect class="matrix-square" style="--order:2" x="31" y="31" width="10" height="10"/><rect class="matrix-square" style="--order:3" x="49" y="49" width="10" height="10"/><path class="matrix-link" d="M23 18h8M41 18h8M36 23v8M54 59v8"/>'
  ];

  function buildGrid() {
    layoutFrame = 0;
    if (!wide.matches) { hero.style.minHeight = ''; return; }
    const naturalHeight = Math.max(hero.scrollHeight, hero.getBoundingClientRect().height);
    const rows = Math.max(8, Math.ceil((naturalHeight - 1) / cellSize));
    if (grid.dataset.rows === String(rows)) return;
    grid.dataset.rows = rows;
    grid.style.height = Math.round(rows * cellSize) + 'px';
    hero.style.minHeight = Math.round(rows * cellSize) + 'px';
    grid.replaceChildren(); cells.length = 0; byPosition.clear();
    const tiles = [];
    for (let row = 0; row < rows; row++) {
      if (row === 0 || row === rows-1) {
        [0,1,2].forEach(col => tiles.push([col,row,1]));
        tiles.push([3,row,9]);
        [12,13,14].forEach(col => tiles.push([col,row,1]));
      } else {
        const outer = row%4 === 2 || row%4 === 3;
        if (outer) tiles.push([0,row,1]);
        [1,2,12,13].forEach(col => tiles.push([col,row,1]));
        if (outer) tiles.push([14,row,1]);
      }
    }
    const fragment = document.createDocumentFragment();
    tiles.forEach(([col,row,span]) => {
      const tile = document.createElement('span');
      tile.className = 'hero-tile';
      tile.style.left = Math.round(col*cellSize)+'px';
      tile.style.top = Math.round(row*cellSize)+'px';
      tile.style.width = Math.round((col+span)*cellSize)-Math.round(col*cellSize)+1+'px';
      tile.style.height = Math.round((row+1)*cellSize)-Math.round(row*cellSize)+1+'px';
      if (span === 1) {
        const variant = (col+row)%diagrams.length;
        tile.innerHTML = `<svg class="hero-cell-diagram" viewBox="0 0 72 72">${pointPattern}${diagrams[variant]}</svg><i class="hero-cell-anchor"></i>`;
        const cell = {tile,col,row,busy:false};
        cells.push(cell); byPosition.set(`${col}:${row}`,cell);
      }
      fragment.append(tile);
    });
    grid.append(fragment);
    lastPointerCell = null;
    if (!reduced.matches) {
      [[1,2],[13,4],[2,6],[12,1]].forEach(([col,row],i) => {
        const cell = byPosition.get(`${col}:${row}`);
        if (cell) setTimeout(() => play(cell, i%3 === 2 ? 'grow' : 'matrix'), 200+i*380);
      });
    }
  }

  function play(cell, mode) {
    if (!cell || cell.busy || !wide.matches || reduced.matches || !visible || document.hidden) return;
    cell.busy = true;
    const selected = mode || ['matrix','matrix','grow','corner'][sequence++%4];
    cell.tile.classList.add('is-playing');
    if (selected !== 'matrix') cell.tile.classList.add('is-'+selected);
    cell.tile.dataset.animation = selected;
    setTimeout(() => {
      cell.tile.classList.remove('is-playing','is-grow','is-corner');
      delete cell.tile.dataset.animation;
      cell.busy = false;
    }, 4950);
  }

  const idleTimer = setInterval(() => {
    if (!visible || document.hidden || reduced.matches || !wide.matches) return;
    if (cells.filter(cell => cell.busy).length >= 4) return;
    const available = cells.filter(cell => !cell.busy);
    play(available[Math.floor(Math.random()*available.length)]);
  }, 1250);

  function updateGridPointer() {
    pointerFrame = 0;
    if (!pointer || !wide.matches || reduced.matches) return;
    const rect = grid.getBoundingClientRect();
    const x = pointer.x-rect.left, y = pointer.y-rect.top;
    const col = Math.floor(x/cellSize), row = Math.floor(y/cellSize);
    const cell = byPosition.get(`${col}:${row}`);
    if (cell !== lastPointerCell) { play(cell); lastPointerCell = cell; }
    cells.forEach(item => {
      const distance = Math.hypot(x-(item.col+.5)*cellSize,y-(item.row+.5)*cellSize);
      item.tile.classList.toggle('is-active',distance<88);
      item.tile.classList.toggle('is-nearby',distance>=88 && distance<160);
    });
  }
  function resetGridPointer() {
    pointer = null; lastPointerCell = null;
    cells.forEach(({tile}) => tile.classList.remove('is-active','is-nearby'));
  }
  hero.addEventListener('pointermove',event => {
    if (!fine.matches || (event.pointerType && event.pointerType!=='mouse')) return;
    pointer = {x:event.clientX,y:event.clientY};
    if (!pointerFrame) pointerFrame = requestAnimationFrame(updateGridPointer);
  },{passive:true});
  hero.addEventListener('pointerleave',resetGridPointer,{passive:true});
  function queueLayout() {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(buildGrid);
  }
  new ResizeObserver(queueLayout).observe(hero);
  window.addEventListener('resize',() => {
    hero.style.minHeight = ''; grid.dataset.rows = ''; queueLayout();
  },{passive:true});
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) resetGridPointer();
  },{threshold:.01}).observe(hero);
  wide.addEventListener('change',queueLayout);
  reduced.addEventListener('change',() => {resetGridPointer(); queueLayout();});
  document.addEventListener('visibilitychange',() => {if(document.hidden) resetGridPointer();});
  window.addEventListener('pagehide',() => clearInterval(idleTimer),{once:true});
  buildGrid();

  // Pink ASCII noise sits behind the action row, as in the reference hero.
  const ascii = hero.querySelector('.hero-ascii');
  const ctx = ascii?.getContext('2d');
  if (ctx) {
    const width = 686, height = 180, ratio = Math.min(devicePixelRatio || 1,2);
    ascii.width = width*ratio; ascii.height = height*ratio;
    ctx.scale(ratio,ratio); ctx.font = '9px monospace'; ctx.textBaseline = 'top';
    const glyphs = ['.',':','-','+','*'];
    function drawAscii(now) {
      ctx.clearRect(0,0,width,height);
      for (let row=0;row<17;row++) for (let col=0;col<106;col++) {
        const x=col*6.5, y=row*11;
        const envelope = Math.max(0,1-Math.abs(col-52.5)/52.5);
        const wave = .5+.28*Math.sin(col*.49+row*.87+now*.0009)+.2*Math.cos(col*.21-row*.83-now*.0007);
        const density = Math.sin(col*12.9898+row*78.233)*43758.5453;
        const noise = density-Math.floor(density);
        if (noise > envelope*.6 || wave < .33) continue;
        ctx.fillStyle = `rgba(62,82,214,${(.10+wave*.18)*envelope})`;
        ctx.fillText(glyphs[Math.min(4,Math.floor(wave*5))],x,y);
      }
    }
    drawAscii(0);
    const asciiTimer = setInterval(() => {
      if (visible && !document.hidden && !reduced.matches && ascii.offsetWidth) drawAscii(performance.now());
    },95);
    window.addEventListener('pagehide',()=>clearInterval(asciiTimer),{once:true});
  }

})();
