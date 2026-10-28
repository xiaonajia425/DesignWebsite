const views = {
  'ops-agent': {
    type:'核心项目 · AI PRODUCT',
    title:'AI智能体平台',
    src:'./projects/ops-agent/index.html?v=2026102721'
  },
  'security-ops': {
    type:'核心项目 · SECURITY OPS',
    title:'启明星安全运维平台',
    src:'./projects/security-ops/index.html?v=2026102721'
  },
  'ai-workflow': {
    type:'核心项目 · AI WORKFLOW',
    title:'AI设计交付流程',
    src:'./projects/ai-workflow/index.html?v=2026102319'
  },
  'other-projects': {
    type:'其他项目 · SELECTED WORK',
    title:'其他项目',
    src:'./projects/other-projects/index.html?v=2026102725'
  },
  'attack-defense': {
    type:'设计资产 · INTERACTIVE DEMO',
    title:'红蓝攻防态势大屏',
    src:'./projects/attack-defense/index.html?v=2026102319'
  },
  'design-guidelines': {
    type:'设计资产 · WEB GUIDE',
    title:'B 端设计规范',
    src:'./projects/design-guidelines/index.html?v=2026102319'
  },
  'figma-guidelines': {
    type:'设计资产 · SOURCE FILE',
    title:'Figma 设计规范',
    src:'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FQ9Qjs2uz7YXB39M8RAgfmh%2F%25E8%25AE%25BE%25E8%25AE%25A1%25E8%25A7%2584%25E8%258C%2583%3Fnode-id%3D155-2%26p%3Df'
  },
  'markdown-docs': {
    type:'设计资产 · DOCUMENTATION',
    title:'Markdown 文档中心',
    src:'./projects/markdown-docs/index.html?v=2026102319'
  },
  resume: {
    type:'关于我 · RESUME',
    title:'李丹个人简历',
    src:'./resume-li-dan.pdf?v=2026102722'
  }
};

const params = new URLSearchParams(location.search);
const viewKey = views[params.get('view')] ? params.get('view') : 'ops-agent';
const view = views[viewKey];

const projectSwitch = [
  ['ops-agent','AI智能体平台'],
  ['security-ops','启明星运维平台'],
  ['ai-workflow','AI设计交付流程'],
  ['other-projects','其他项目']
];

document.querySelector('#detail-switch').innerHTML = projectSwitch.map(([key,label]) => {
  const current = key === viewKey ? ' aria-current="page"' : '';
  return `<a href="./detail.html?view=${key}"${current}>${label}</a>`;
}).join('');
document.querySelector('#detail-switch a[aria-current="page"]')?.scrollIntoView({block:'nearest',inline:'nearest'});
document.querySelector('#detail-frame').src = view.src;
document.title = `${view.title} · 李丹作品集`;
