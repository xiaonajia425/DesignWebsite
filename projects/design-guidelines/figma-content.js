const FIGMA_BOARD_CONTENT = {
  color: [
    {k:'03 / COLOR SYSTEM',t:'语义颜色引用',d:'语义变量表达“用在哪里”。页面与组件使用语义颜色，模式切换由同名语义映射完成。',i:[['Background','bg/canvas · bg/surface · bg/surface-elevated · bg/brand-subtle'],['Text','text/primary · text/secondary · text/tertiary · text/brand'],['Icon','icon/primary · icon/secondary · icon/brand · icon/disabled'],['Border','border/subtle · border/default · border/focus · border/selected']]},
    {k:'04 / COLOR SYSTEM',t:'交互状态规范',d:'状态变化需要在背景、文字、图标和描边之间协同，不只改变单一属性。',i:[['Default · 默认','使用组件基础语义颜色'],['Hover · 悬停','适度增强背景或描边反馈'],['Pressed · 按下','在 Hover 基础上进一步加深或增强'],['Focus · 聚焦','使用清晰的聚焦描边或焦点环'],['Selected · 选中','使用品牌色或品牌弱背景表达持续状态'],['Disabled · 禁用','同时降低背景、文字、图标和描边强调度'],['Loading · 加载中','保留识别度并弱化重复操作'],['Read-only · 只读','与 Disabled 区分并保持内容可读']]},
    {k:'05 / COLOR SYSTEM',t:'状态颜色组合',d:'每一种状态都应包含强调色、浅色背景、文字、图标和描边，不能只有一个状态主色。',i:[['Info · 信息','status/info/default'],['Success · 成功','status/success/default'],['Warning · 警告','status/warning/default'],['Danger · 错误','status/danger/default'],'状态文字必须具有足够对比度','成功与错误信息需配合图标或文案','风险色只用于真正需要提醒或阻断的场景']},
    {k:'06 / COLOR SYSTEM',t:'透明度与遮罩',d:'不要临时手动调整透明度。叠加场景优先使用已经定义的黑、白、主题蓝透明度与遮罩变量。',i:[['Black Alpha','a00 · a04 · a08 · a12 · a16 · a24 · a32 · a40 · a48 · a60 · a72'],['White Alpha','反色与高光'],['Blue Alpha','Hover 与 Selected'],['遮罩语义','mask/transparent · mask/subtle · mask/default · mask/strong · mask/heavy']]},
    {k:'07 / COLOR SYSTEM',t:'主题渐变',d:'主题渐变由主题蓝到主题紫组成。方向与端点位置固定，通过 Paint Style 统一维护。',i:[['水平填充','Gradient/Theme/Fill/Horizontal'],['垂直填充','Gradient/Theme/Fill/Vertical'],['水平描边','Gradient/Theme/Stroke/Horizontal'],['垂直描边','Gradient/Theme/Stroke/Vertical'],['起点','主题蓝 #2361FF · 0%'],['终点','主题紫 #6D5DFB · 100%'],['类型','Linear · 100% · Normal']]},
    {k:'08 / COLOR SYSTEM',t:'无障碍与对比度',d:'颜色必须服务于信息理解。状态不能只依赖颜色，文字与关键控件需要满足最低对比度。',i:[['4.5:1','普通文字、正文与长文本'],['3:1','大号文字、图标、描边与关键控件'],['渐变背景','检查整段渐变中对比度最低的位置'],'状态配合图标','提供文字说明','使用形状或描边变化','通过位置和层级强化差异']},
    {k:'09 / COLOR SYSTEM',t:'Color Do / Don’t',d:'所有颜色选择都应可追溯到语义变量或受控的渐变样式。',i:['✓ 使用 text/primary 表达主要文字','✓ 使用完整的状态背景、文字、图标和描边组合','✓ 从 Paint Styles 中选择主题渐变','✓ 使用既有透明度变量创建交互与遮罩','× 不在组件内直接填写 Hex','× 不解绑变量后手动调整颜色','× 不将错误红或成功绿作为普通装饰色']},
    {k:'10 / COLOR SYSTEM',t:'Figma 使用与开发交付',d:'变量命名是设计与代码之间的共同语言：基础色阶负责维护，语义 Token 负责消费。',i:[['text/primary','var(--color-text-primary) · 标题、核心数据、正文'],['bg/surface','var(--color-bg-surface) · 卡片与基础容器'],['border/focus','var(--color-border-focus) · 输入与键盘焦点'],['status/danger/default','var(--color-status-danger) · 错误与危险操作'],'设计侧从语义变量选择背景、文字、图标和描边','开发侧组件引用语义 Token，不直接引用基础色阶或 Hex']},
    {k:'11 / COLOR SYSTEM',t:'新增颜色决策与交付检查',d:'只有现有变量无法表达新的视觉层级、状态或业务含义时，才新增语义颜色。',i:['现有语义变量是否已经表达相同用途？','是否只是现有颜色在另一组件中的重复使用？','是否确实存在新的视觉层级、状态或业务含义？','需要新增基础色阶，还是只需要新增语义映射？','新颜色是否满足对比度和无障碍要求？','是否同步补充 Figma 变量、代码 Token 和使用说明？']}
  ],
  typography: [
    {k:'01 / TYPOGRAPHY',t:'字体家族',d:'中文以 PingFang SC 为规范字体，英文与数字优先 Inter，代码与等宽内容使用 Roboto Mono。',i:[['PingFang SC / 苹方','中文界面主字体 · Regular / Medium / Bold'],['Inter','英文、数字、指标与数据展示'],['Roboto Mono','代码、序列号、等宽对齐内容']]},
    {k:'02 / TYPOGRAPHY',t:'字体基础变量',d:'变量是排版系统的最小原子。组件不直接写死数值。',i:[['Font Family','PingFang SC · Inter · Roboto Mono'],['Font Size','12 · 13 · 14 · 16 · 20 · 24 · 32'],['Line Height','20 · 22 · 24 · 28 · 32 · 40'],['Font Weight','Regular 400 · Medium 500 · Bold 600'],['Letter Spacing','Default 0% · Caps 4%']]},
    {k:'04 / TYPOGRAPHY',t:'数字文本样式',d:'指标、金额、百分比与编号使用独立数字样式，保持数字宽度和视觉节奏稳定。',i:[['Number / Large','12,481.06 · 32 / 40 / Bold'],['Number / Default','12,481.06 · 14 / 22 / Medium'],['Number / Small','12,481.06 · 12 / 20 / Medium'],['金额','¥ 12,481.06 · 千分位 + 两位小数'],['百分比','+12.48% · 符号与数值不拆行'],['缺省值','— · 不使用 0 代替未知值']]},
    {k:'05 / TYPOGRAPHY',t:'组件语义映射',d:'文字进入组件时保持唯一映射，避免同一层级在不同模块出现不同视觉权重。',i:[['页面标题 / 面包屑终点','Heading / Page · text/primary'],['卡片、抽屉、弹窗标题','Heading / Card · text/primary'],['表单标签 / 筛选项','Label / Default · text/primary'],['输入值 / 表格正文','Body / Default · text/primary'],['帮助、补充说明','Description / Small · text/secondary'],['占位符 / 弱提示','Hint / Default · text/placeholder'],['主指标 / KPI','Number / Large · text/primary']]},
    {k:'06 / TYPOGRAPHY',t:'Typography 使用原则',d:'以下规则优先于单个页面的局部偏好，用于保证后台系统的信息密度、可读性与一致性。',i:[['正文默认 14px','常规阅读内容统一使用 14 / 22'],['紧凑场景最低 12px','仅用于标签、表格辅助信息和弱提示'],['字重不滥用','正文 400，重点 500，标题 600'],['按钮使用 Medium','保证操作文本识别度，同时避免过重'],['数字样式独立','金额、百分比、指标与编号统一调用数字样式'],['颜色引用语义变量','按状态绑定语义色，不写死业务颜色']]},
    {k:'07 / TYPOGRAPHY',t:'混排、截断与数据可读性',d:'对中英文、数字和长文本采用一致的断行与溢出策略。',i:[['中英文混排','中文标点使用全角；品牌名保持官方大小写'],['单行截断','表格、筛选器和紧凑卡片采用单行省略'],['多行说明','建议最多 2–3 行，超过后折叠'],['数据对齐','同列数字右对齐；小数位一致；单位与数值不拆行']]},
    {k:'08 / TYPOGRAPHY',t:'无障碍与交付检查',d:'设计评审和开发验收都应覆盖可读性、语义映射、变量绑定及字体回退。',i:['正文与背景满足 WCAG AA 对比度','关键内容不只依赖颜色表达','缩放 200% 后仍保持阅读顺序','文本不得被固定高度容器裁切','全部引用 Typography Variables','数字使用独立数字样式','中文规范字体为 PingFang SC']}
  ],
  spacing: [
    {k:'01 / SPACING',t:'间距体系',d:'以 4px 为基础单位，通过数值尺度、语义 Token 与密度模式构成统一的空间语言。',i:[['基础单位','4px；2px 仅用于边框、光学微调或极小控件'],['推荐阶梯','4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64'],['关系原则','同组元素靠近，跨组元素拉开'],['层级范围','内容 4–8 · 组件 8–16 · 模块 16–24 · 区块 24–32 · 页面 32–64']]},
    {k:'02 / SPACING',t:'间距基础变量',d:'基础尺度用于变量映射，不直接表达业务含义；优先使用语义 Token。',i:[['spacing/0','0 · 无间距、叠合、分割线贴边'],['spacing/1','4 · 图标与文字、徽标内部'],['spacing/2','8 · 按钮组、输入框内部'],['spacing/3','12 · 紧凑卡片、字段辅助信息'],['spacing/4','16 · 表单项、标准卡片'],['spacing/6','24 · 模块间、弹窗内容'],['spacing/8','32 · 页面区块、重要模块'],['spacing/12','48 · 大区段、复杂页面章节'],['spacing/16','64 · 桌面端页面外边距']]},
    {k:'03 / SPACING',t:'间距语义层级',d:'间距越小，关联越强；间距越大，层级边界越明确。',i:[['gap/icon-text','4px · 图标＋文字'],['gap/button-group','8px · 并列操作'],['gap/form-item','16px · 字段之间'],['gap/module','24px · 模块之间'],['gap/section','32px · 章节之间']]},
    {k:'04 / SPACING',t:'信息密度',d:'同一信息架构下，通过紧凑、标准、宽松三档密度适配不同任务场景。',i:[['Compact · 紧凑','控件 28–32 · 表格行 32–36 · 卡片内边距 12\n适用于高密度表格、工具栏和复杂筛选'],['Default · 标准','控件 32–40 · 表格行 40–48 · 卡片内边距 16\n适用于常规表单、列表和后台页面'],['Comfortable · 宽松','控件 40–48 · 表格行 48–56 · 卡片内边距 24\n适用于展示、阅读、空状态和引导页']]},
    {k:'05 / SPACING',t:'密度调整规则',d:'密度改变应成组切换组件高度、内边距与元素间距，避免局部压缩。',i:[['页面左右边距','16 / 24 / 32'],['卡片内边距','12 / 16 / 24'],['表单项间距','12 / 16 / 20–24'],['控件高度','28–32 / 32–40 / 40–48'],['表格行高','32–36 / 40–48 / 48–56']]},
    {k:'06 / SPACING',t:'内边距体系',d:'内边距定义内容与容器边界的安全距离，并随组件层级保持稳定。',i:[['Page','padding/page/compact · 16\npadding/page/default · 24\npadding/page/wide · 32\n页面边缘与主内容'],['Card','padding/card/compact · 12\npadding/card/default · 16\npadding/card/spacious · 24\n卡片与模块容器'],['Control','padding/control/small · 8\npadding/control/medium · 12\npadding/control/large · 16\n按钮、输入框、筛选项'],['Modal','padding/modal/default · 24\n弹窗主体内容区'],['层级关系','页面 32 / 24 / 16 ≥ 区块 24 ≥ 卡片 16 / 12 ≥ 控件 12 / 8 ≥ 内容 4 / 0\n外层间距应大于或等于内层间距']]},
    {k:'07 / SPACING',t:'元素间距映射',d:'根据元素关系选择间距：同组、跨组、跨模块、跨章节逐级递增。',i:[['图标 ↔ 文字','gap/icon-text · 4'],['按钮 ↔ 按钮','gap/button-group · 8'],['标题 ↔ 描述','spacing/2 · 8'],['字段 ↔ 字段','gap/form-item · 16'],['内容组 ↔ 内容组','spacing/6 · 24'],['模块 ↔ 模块','gap/module · 24'],['章节 ↔ 章节','gap/section · 32']]},
    {k:'08 / SPACING',t:'典型场景',d:'将间距 Token 落到表单、表格、卡片、弹窗和筛选区等 B 端高频场景。',i:[['表单 Form','label-control 8 · field-field 16 · group-group 24'],['表格 Table','cell-x 12–16 · row 32/40/48 · toolbar-table 16'],['卡片 Card','padding 12/16/24 · title-body 8 · content-group 16'],['弹窗 Modal','body padding 24 · section 24 · action group 8'],['筛选区 Filter','控件间 8–12 · 行间 12–16 · 与结果区 16–24'],['仪表盘 Dashboard','卡片网格 16–24 · 区域间 24–32']]},
    {k:'09 / SPACING',t:'页面空间结构',d:'从页面边距到区块、模块、组件和内容，形成可追溯的空间层级。',i:[['Page · 页面','padding/page/wide = 32\n页面边缘与第一个内容区'],['Section · 区块','gap/section = 32\n不同业务章节之间'],['Module · 模块','spacing/6 = 24\n同一区块内的独立模块'],['Content Group · 内容组','title-body = 8 · item-item = 4\n标题、说明与同组元素'],'页面边距 ≥ 区块间距 ≥ 模块间距 ≥ 内容组间距 ≥ 元素间距']},
    {k:'10 / SPACING',t:'Spacing 使用规则',d:'用语义、关系和层级驱动间距选择，而不是逐像素试错。',i:['✓ 使用语义 Token','✓ 相同层级保持一致','✓ 密度模式成组切换','✓ 外层间距大于内层','✓ 用 Auto Layout 管理增删内容','× 不为对齐单独写 14 / 18 / 22','× 不用透明矩形或空文本撑间距','× 不混用多档密度']},
    {k:'11 / SPACING',t:'特殊场景与可读性',d:'针对长文本、数据密集、空状态与响应式布局保留必要呼吸空间。',i:[['长文本','段落间 12–16；标题与正文 8'],['数据密集','优先收紧行高、单元格内边距和工具栏间距'],['空状态','图形、标题、说明、操作依次使用 16 / 8 / 24'],['响应式','页面边距 32 → 24 → 16，区块间距 32 → 24'],['触控目标','建议不小于 44 × 44']]},
    {k:'12 / SPACING',t:'禁用规则与交付检查',d:'交付前检查变量绑定、自动布局、密度一致性和异常间距。',i:['不使用未进入变量体系的偶发数值','不用多层空 Frame 叠加间距','同类卡片不使用不同内边距','所有间距来自 spacing / padding / gap 变量','Auto Layout 可承受增删与换行','设计与开发使用相同 Token 名称']}
  ],
  radius: [
    {k:'01 / RADIUS',t:'圆角体系',d:'圆角用于表达交互属性、组件边界和容器层级；在 B 端界面中保持专业、克制与一致。',i:[['专业克制','控件以 2–4px 为主，容器以 6–8px 为主'],['同类一致','一个组件一个 Token'],['层级明确','圆角不是装饰，信息关系仍由间距、背景、边框和阴影表达'],['推荐层级','控件 2–4 · 内容容器 6 · 重点容器 8 · 特殊强调 12 · 身份状态 999']]},
    {k:'02 / RADIUS',t:'圆角基础变量',d:'使用 0、2、4、6、8、12、999 七档标准值，不引入用途重叠的 10px 圆角。',i:[['radius/none','0px · 连续结构、表格单元格'],['radius/xs','2px · 标签、状态块、紧凑控件'],['radius/sm','4px · 按钮、输入框、选择器'],['radius/md','6px · 卡片、菜单、提示框'],['radius/lg','8px · 弹窗、重点容器、大型浮层'],['radius/xl','12px · 特殊强调区域，低频使用'],['radius/full','999px · 头像、胶囊标签、圆形按钮']]},
    {k:'03 / RADIUS',t:'圆角语义层级',d:'圆角通常随容器层级增加，但不与组件尺寸或信息密度等比例变化。',i:[['内部控件','radius/sm · 4'],['普通卡片','radius/md · 6'],['弹窗 / 重点容器','radius/lg · 8'],['特殊强调容器','radius/xl · 12']]},
    {k:'04 / RADIUS',t:'组件圆角映射',d:'为输入、按钮、标签、卡片、弹窗等高频组件建立明确且可复用的映射。',i:[['按钮 / 输入框 / 选择器','radius/sm · 4px'],['标签 Tag / 状态块','radius/xs · 2px'],['胶囊状态标签','radius/full · 999px'],['表格外容器 / 普通卡片','radius/md · 6px'],['Modal','radius/lg · 8px'],['Drawer','radius/none · 0px'],['头像 / 圆形图标按钮','radius/full · 999px']]},
    {k:'05 / RADIUS',t:'容器与浮层',d:'根据容器层级、是否悬浮及边界连续性选择 0、6、8 或 12px。',i:[['连续区域','0px · 表格内部、全宽结构、Drawer'],['常规容器','6px · 卡片、菜单、Alert、Popover'],['重点浮层','8px · Modal、复杂浮层、关键任务容器'],['特殊强调','12px · 头图、品牌化强调区']]},
    {k:'06 / RADIUS',t:'嵌套圆角',d:'内外容器同时有圆角时，依据内边距保持曲线连续，避免内层圆角过大。',i:[['推荐','外 8 · 距离 4 · 内 4'],['推荐','外 12 · 距离 4 · 内 8'],['避免','外 8 · 距离 4 · 内 12'],['原则','内层圆角不应大于外层圆角']]},
    {k:'07 / RADIUS',t:'连续组合与方向圆角',d:'相邻控件形成整体时，连接边圆角归零，仅保留外轮廓圆角。',i:[['输入框＋按钮','组合外轮廓 4px，中间连接边为 0'],['分段控制器','仅两端保留 4px，中间项为 0'],['表格表头','仅顶部保留 6px，底部与表体连续']]},
    {k:'08 / RADIUS',t:'尺寸、密度与状态',d:'组件大小、紧凑度与交互状态变化时，圆角 Token 保持稳定。',i:[['Compact / Default / Comfortable','高度与内边距变化，radius/sm 保持 4px'],['Default / Hover / Focus / Disabled','交互状态不改变圆角']]},
    {k:'09 / RADIUS',t:'典型场景',d:'将圆角规则应用于表单、表格、卡片、弹窗、抽屉和状态组件。',i:[['输入与按钮','radius/sm · 4px'],['标签 Tag','radius/xs · 2px'],['胶囊状态','radius/full · 999px'],['普通卡片','radius/md · 6px'],['Modal','radius/lg · 8px'],['Drawer','radius/none · 0px']]},
    {k:'10 / RADIUS',t:'Radius 使用规则',d:'用组件语义和容器层级驱动圆角选择，避免以视觉偏好临时取值。',i:['✓ 从组件类型选择 radius Token','✓ 同类组件跨页面保持一致','✓ 外层圆角通常大于内层','✓ 连续组合仅保留外轮廓','× 不使用 3 / 5 / 7 / 10 等非标准值','× 不因组件变大就自动增大圆角','× Hover / Focus 时不改变圆角']},
    {k:'11 / RADIUS',t:'禁用规则与交付检查',d:'交付前检查标准值、变量绑定、嵌套连续性和状态一致性。',i:['圆角来自 radius/* 变量','同类组件映射唯一且稳定','嵌套曲线连续、外大内小','组合控件连接边为 0','密度、尺寸和状态不改变 Token','设计与开发使用相同命名']}
  ],
  effects: [
    {k:'01 / EFFECT SYSTEM',t:'效果类型',d:'效果用于表达界面层级、聚焦关系和内容与背景之间的空间关系，不作为无目的装饰。',i:[['投影 Shadow','表达组件相对页面的悬浮高度与临时性'],['背景模糊 Background Blur','弱化后方内容，同时保留环境感知'],['渐进模糊 Progressive Blur','处理滚动内容与固定导航之间的过渡'],['毛玻璃 Glass','透明填充、模糊、描边与投影的组合'],['背景遮罩 Overlay','聚焦弹窗、抽屉与关键任务']]},
    {k:'02 / EFFECT TOKENS',t:'效果基础参数',d:'效果参数由系统变量与 Styles 统一维护，组件和页面不单独创建近似数值。',i:[['Shadow Levels','XS / SM / MD / LG / XL'],['Blur Radius','4 / 8 / 16 / 24 / 40px'],['Progressive','Max 32px · Vertical'],['Glass Recipe','Fill + Blur + Border + Shadow'],['Overlay','Subtle / Default / Strong']]},
    {k:'03 / SHADOW',t:'投影样式',d:'投影强度与界面层级对应。越临时、越需要聚焦的内容，投影等级越高。',i:[['Shadow/XS','静态小卡片 · 分隔、轻微抬升'],['Shadow/SM','可点击容器 · 卡片、按钮组'],['Shadow/MD','悬浮工具 · 菜单、选择器'],['Shadow/LG','对话框 · 抽屉、浮层'],['Shadow/XL','关键通知 · 最高层级']]},
    {k:'04 / BACKGROUND BLUR',t:'背景模糊样式',d:'Background Blur 只模糊对象后方内容，不模糊容器自身的文字和图标。',i:[['Blur/Background/SM','4px · 悬浮提示'],['Blur/Background/MD','8px · 遮罩、轻导航'],['Blur/Background/LG','16px · 标准毛玻璃'],['Blur/Background/XL','24px · 高可读玻璃'],['Blur/Background/2XL','40px · 氛围背景']]},
    {k:'05 / PROGRESSIVE BLUR',t:'渐进模糊',d:'渐进方向必须与固定导航的位置一致，用于处理滚动内容进入固定区域时的视觉过渡。',i:[['Top Navigation','顶部 32px → 底部 0px'],['Bottom Navigation','顶部 0px → 底部 32px'],['适用','固定顶部导航、标题栏、列表头部、底部菜单与浮动操作栏']]},
    {k:'06 / GLASS',t:'毛玻璃 Glass',d:'毛玻璃由半透明填充、背景模糊、半透明描边和轻量投影共同建立。',i:[['Glass/Subtle','Blur 4px · 图片标签、轻量操作'],['Glass/Default','Blur 16px · 导航栏、工具面板、浮层'],['Glass/Strong','Blur 24px · 弹窗、长文本、复杂背景']]},
    {k:'07 / OVERLAY',t:'背景遮罩 Overlay',d:'遮罩降低当前任务之外内容的视觉权重，使用户聚焦于前景操作。',i:[['Overlay/Subtle','Dialog · 非阻断提示、弱聚焦'],['Overlay/Default','普通弹窗、抽屉'],['Overlay/Strong','关键确认、危险操作']]},
    {k:'08 / SEMANTIC MAPPING',t:'组件语义映射',d:'相同组件角色使用统一效果样式，避免不同页面之间产生层级漂移。',i:[['静态卡片','Shadow/XS'],['可点击卡片','Shadow/SM'],['下拉菜单、日期选择器','Shadow/MD'],['抽屉、普通弹窗','Shadow/LG + Overlay/Default'],['关键弹窗、全局通知','Shadow/XL + Overlay/Strong'],['顶部固定导航','Blur/Progressive/Top Navigation']]},
    {k:'09 / USAGE RULES',t:'Effects 使用规则',d:'使用系统样式维持产品中的层级秩序、视觉一致性和实现一致性。',i:['同层组件使用相同 Effect Style','交互最多提升一级','投影不表达内容重要性','模糊不替代背景填充','渐进方向匹配导航位置','模态场景必须使用遮罩','效果关闭后仍可阅读和操作']},
    {k:'10 / QUALITY',t:'组合、性能与可读性',d:'效果需要同时满足层级表达、文字可读、运行性能与兼容降级要求。',i:[['层级组合','先背景与描边，再通过投影强化前后层级'],['复杂背景','提高玻璃填充不透明度，不无限增加模糊半径'],['性能控制','不高频动画模糊半径，控制大面积模糊使用'],['降级方案','不支持 Blur 时使用高不透明填充']]},
    {k:'11 / DO & DON’T',t:'Do / Don’t 与交付检查',d:'设计、代码与规范需要使用同一套 Effects 语义。',i:['✓ 使用系统中已有的 Effect Style','✓ 根据组件层级选择投影等级','✓ 根据导航位置选择渐进方向','✓ 为不支持模糊的环境提供降级方案','× 不为每个页面手动创建近似效果','× 不用更深投影表达内容重要程度','× 不只降低白色透明度冒充毛玻璃']}
  ],
  button: [
    {k:'01 / COMPONENT ANATOMY',t:'组件说明',d:'按钮分为标准、危险和按钮组。',i:[['Button / Standard','Primary / Secondary / Text · Label / Icon Only'],['Button / Danger','删除、移除、停用、终止；需要明确风险说明'],['Button Group','2–4 个强关联操作 · Hug / Fill · 组内间距 8px']]},
    {k:'02 / USAGE PRINCIPLES',t:'核心使用原则',d:'按钮层级由任务优先级和风险决定。业务页面应使用组件实例。',i:[['01 单一主操作','一个操作区域原则上只保留一个 Primary'],['02 语义优先','根据任务重要性和风险选择类型'],['03 复用组件','颜色、间距、圆角和图标颜色由组件管理'],['04 内容自适应','宽度随文字、图标和 Size 变化'],['05 状态完整','覆盖 Default、Hover、Pressed、Focus、Disabled'],['06 无障碍','Icon Only 必须提供准确的 Accessible Name']]},
    {k:'03 / TYPE & SIZE',t:'类型与尺寸',d:'一个区域最多一个 Primary。Danger 表达风险语义，页面默认使用 Medium。',i:[['Primary','保存 / 创建 · 当前区域主要操作'],['Secondary','取消 / 预览 · 重要性低于主操作'],['Text','查看 / 编辑 · 行内及卡片辅助操作'],['Danger','删除 / 终止 · 高风险或不可逆操作'],['Small','24px · padding 8px · icon 16px'],['Medium','32px · padding 12px · icon 16px'],['Large','40px · padding 16px · icon 20px']]},
    {k:'04 / CONTENT & STATE',t:'内容、图标与交互状态',d:'按钮文案优先使用“动词”或“动词 + 对象”。',i:[['Label','默认形式；中文建议 2–6 个字'],['Label + Icon','图标与文字间距 4px'],['Icon Only','4px 圆角矩形，必须填写 Accessible Name'],['Default / Hover / Pressed','真实交互驱动'],['Focus','焦点样式必须清晰可见'],['Disabled','同时阻止鼠标、键盘和重复提交']]},
    {k:'05 / COMPONENT PLAYGROUND',t:'组件预览区域',d:'以下均为真实组件实例。选择实例后，可在 Figma 属性面板切换 Type、Content、Size、State、Label、图标及按钮数量。',i:[['Button / Standard','Type · Content · Size · State · Label · Show Icon'],['Button / Danger','Content · Size · State'],['Button Group','Size · Distribution · Show Button 3 · Show Button 4']]},
    {k:'06 / COMPONENT GALLERY',t:'全部组件内容',d:'按照组件属性矩阵展示全部变体。以下按钮均为组件实例，可用于检查类型、内容、尺寸和状态覆盖。',i:[['Button / Standard','Type 3 × Content 2 × Size 3 × State 5 = 90 Variants'],['Button / Danger','Content 2 × Size 3 × State 5 = 30 Variants'],['Button Group','Size 3 × Distribution 2 = 6 Variants；按钮数量通过组件属性控制']]},
    {k:'07 / COMMON SCENARIOS',t:'常见业务场景',d:'根据操作密度、上下文和风险选择按钮类型。',i:[['页面主操作区','Secondary 导入 + Primary 新建项目'],['表单 / 弹窗底部','Secondary 取消 + Primary 保存'],['表格行内操作','Text 查看 / 编辑 / 更多'],['危险确认','Secondary 取消 + Danger 删除'],['紧凑工具栏','Icon Only 添加 / 刷新 / 下载'],['按钮数量','2–4 个强关联操作；超过 4 个进入更多菜单']]},
    {k:'08 / DO & DON’T',t:'Do / Don’t',d:'保持按钮层级简洁、语义稳定。',i:['✓ 一个操作区域只保留一个 Primary','✓ 按钮宽度随内容和 Size 变化','✓ 危险操作使用 Danger 并说明后果','✓ Icon Only 提供 Accessible Name','× 不同一区域排列多个 Primary','× 不用红色表达普通强调','× 不手工覆盖按钮或图标颜色']},
    {k:'09 / ACCESSIBILITY & QA',t:'无障碍与验收',d:'按钮需要同时满足视觉、交互、键盘操作和辅助技术要求。',i:['所有按钮具有可被读取的名称','Tab 可聚焦，Enter 或 Space 可触发','Focus 清晰可见，不移除焦点轮廓','文字对比度不低于 4.5:1','使用现有 Button 或 Button Group 实例','图标颜色继承按钮前景色','Hover、Pressed、Focus 由真实交互驱动']}
  ],
  icon: [
    {k:'01 / ICON GUIDELINES',t:'组件说明',d:'以 Remix Icon 4.9.1 为基础，图标资产保留统一网格、分类路径和组件实例关系。',i:[['源组件','24 × 24 基准网格'],['资产形式','110 个独立 Component'],['默认风格','优先使用 -line 版本'],['使用方式','通过 Swap instance 快速替换']]},
    {k:'02 / ICON GUIDELINES',t:'核心使用原则',d:'优先表达含义，其次才是装饰。',i:[['语义唯一','同一图标在同一产品内只表达一种主要含义'],['线性优先','填充图标仅用于强选中或品牌强调'],['图文配对','低频、不可逆或专业操作必须配文字或 Tooltip'],['避免混搭','同一控件组内保持相同尺寸、风格、笔画感和颜色层级']]},
    {k:'03 / ICON GUIDELINES',t:'尺寸与光学校准',d:'所有源组件保留 24 × 24 基准网格，使用时按场景等比缩放。',i:[['12 px','极密辅助信息'],['14 px','紧凑表格'],['16 px','默认控件'],['20 px','导航 / 按钮'],['24 px','标题 / 独立入口'],['32 px','展示型图标'],'视觉中心偏移时调整外部容器，不修改原图标路径']},
    {k:'04 / ICON GUIDELINES',t:'语义颜色',d:'图标颜色必须绑定语义变量，使浅色/深色主题与交互状态统一切换。',i:[['Primary','icon/primary · 默认正文图标'],['Secondary','icon/secondary · 弱化操作与辅助信息'],['Interactive','icon/interactive · 可点击入口与链接动作'],['Selected','icon/selected · 导航或筛选选中态'],['Disabled','icon/disabled · 禁用且不可操作'],['Status','icon/status/success · warning · danger']]},
    {k:'05 / ICON GUIDELINES',t:'快速切换图标',d:'选中图标实例后，在右侧实例属性中使用“交换实例”。',i:[['1 选中实例','只选中 Icon 实例，不进入矢量路径'],['2 交换实例','点击当前组件名称或 Swap instance'],['3 搜索筛选','输入 Action、Status 或具体 Remix 名称'],['4 点击缩略图','容器尺寸和布局保持不变'],['分类示例','Action / Status / File / Navigation / Data']]},
    {k:'06 / ICON GUIDELINES',t:'常见业务场景',d:'以控件密度和信息层级决定图标尺寸与颜色。',i:[['侧边导航','20 px · icon/secondary；选中后 icon/selected'],['表格操作','16 px · icon/interactive；高风险使用 danger'],['筛选工具栏','16–20 px · 与文字间距使用 gap/icon-text'],['状态反馈','16 px · status token；必须配状态文案'],['空状态入口','24–32 px · primary / secondary']]},
    {k:'07 / ICON GUIDELINES',t:'Do / Don’t',d:'判断是否使用了正确语义、统一尺寸、合适颜色，以及图标是否仍然可理解。',i:['✓ 用图标增强识别','✓ 状态图标配合文字','✓ 同一工具栏统一为 16 或 20 px','× 不只放陌生图标','× 不只依赖颜色表达状态','× 不手动拉伸或位移图标']},
    {k:'08 / ICON GUIDELINES',t:'无障碍与验收',d:'交付前同时检查可感知性、可操作性和设计资产完整性。',i:['低频操作有文字或 Tooltip','不可逆操作有二次确认','点击热区不少于 32 × 32','纯图标按钮具备可访问名称','保持 Component Instance','颜色绑定语义变量而非色值','设计稿不包含脱离组件的复制矢量']},
    {k:'09 / ICON GUIDELINES',t:'图标目录与命名',d:'当前预录 110 个独立组件，按七类整理。',i:[['Navigation','16 · 导航、方向、折叠与更多'],['Action','22 · 增删改查、上传下载与设置'],['Status','14 · 结果、告警、可见性与通知'],['UserAccess','用户、组织、权限与登录'],['File','文件、文件夹、附件与媒体'],['Data','表格、图表、数据库与选择'],['Collaboration','12 · 消息、日历、任务与沟通']]}
  ],
  input: [
    {k:'01 / OVERVIEW',t:'组件说明',d:'基础输入框分为标准与错误两类。默认使用 Standard；校验失败时切换到 Error。',i:[['Input/Standard','30 个变体，三种尺寸、两类内容与五种交互状态'],['Input/Error','12 个变体，覆盖 Default 与 Focus 错误状态'],['使用边界','不包含 Label、Helper、密码切换、数字步进、多行输入与加载状态']]},
    {k:'02 / ANATOMY',t:'结构与组件树',d:'所有示例均为最终组件实例。图标保持实例关系，文本和显隐通过组件属性控制。',i:[['Input/Standard','Leading Icon（可选） · Text · Trailing Icon（可选）'],['Input/Error','尾部固定 error-warning-line；前置图标仍由 Leading Icon 控制']]},
    {k:'03 / PROPERTIES',t:'组件属性',d:'公开属性名称与 Figma 面板保持一致。',i:[['Text','String · 默认“请输入内容”'],['Show Leading Icon','Boolean · False'],['Leading Icon','Instance swap · search-line'],['Show Trailing Icon','Boolean · False'],['Trailing Icon','Instance swap · close-circle-line'],['Accessible Name','描述输入目的，不复制占位文案'],['Size','Small / Medium / Large'],['Content','Placeholder / Value'],['State','Standard 五种；Error 两种']]},
    {k:'04 / VARIANTS',t:'Variant 架构',d:'Standard 为 3 × 2 × 5，共 30 个变体；Error 为 3 × 2 × 2，共 12 个变体。',i:[['Input/Standard','Size × Content × State · 3 × 2 × 5 = 30'],['Input/Error','Size × Content × State · 3 × 2 × 2 = 12']]},
    {k:'05 / STATES',t:'状态',d:'状态由交互或校验结果驱动，不要用手工改色模拟状态。',i:[['Standard','Default · Hover · Focus · Disabled · Read-only'],['Error','Default · Focus'],['Focus','使用 2px 视觉强调'],['Error','危险语义边框 + 状态图标 + 外部错误说明']]},
    {k:'06 / SIZES',t:'尺寸',d:'三种高度与横向内边距均绑定 Input 组件变量，默认使用 Medium。',i:[['Small','高度 24px · 横向内边距 8px'],['Medium','高度 32px · 横向内边距 12px'],['Large','高度 40px · 横向内边距 16px']]},
    {k:'07 / TOKEN MAPPING',t:'变量与 Token 映射',d:'组件级变量位于 07 · Component/Input，并别名到现有语义与尺寸变量。',i:[['颜色','standard/background/* · content/* · icon/* · border/* · error/*'],['结构','radius 4px · icon-text gap 4px · stroke 1px · focus ring 2px'],['尺寸','small 24/8/16 · medium 32/12/16 · large 40/16/20'],['字体','Noto Sans SC Regular · 14px / 22px']]},
    {k:'08 / ICON USAGE',t:'图标使用',d:'图标必须来自共享组件实例。前后图标用于表达输入目的或可执行操作；Error 状态图标用于表达校验失败。',i:[['前置图标','search-line · 提示输入类型或上下文'],['尾部图标','close-circle-line · 提供清空等相关操作'],['错误图标','error-warning-line · 固定表达错误状态']]},
    {k:'09 / CONTENT',t:'内容规范',d:'占位文本只提供输入提示，不代替永久标签。',i:['使用简洁、可执行的占位提示，例如“请输入邮箱地址”','值内容保持原始语义，不添加装饰性前后缀','长文本保持单行并截断，不撑高组件','不要用占位文本替代字段标签']},
    {k:'10 / ACCESSIBILITY',t:'无障碍',d:'输入框必须拥有可被辅助技术识别的名称，并通过文字说明错误原因。',i:['Accessible Name 描述字段目的，而不是“请输入内容”','Error 与外部错误说明关联','颜色与图标不能作为唯一反馈','Disabled 与 Read-only 语义不同','键盘聚焦时使用 Focus 变体和清晰的 2px 强调']},
    {k:'11 / DO & DON’T',t:'Do / Don’t',d:'优先通过组件属性与 Variant 配置实例。',i:['✓ 使用组件属性控制文本、图标与状态','✓ 校验失败时使用 Error，并补充明确错误说明','× 不分离实例或手工改色模拟状态','× 不仅依赖占位文案或红色边框传达含义']},
    {k:'12 / EXAMPLES',t:'示例与限制',d:'输入框默认宽度为 240px，可在父级自动布局中横向拉伸。',i:[['基础输入','Standard / Medium / Default'],['带图标','Leading / Trailing icon'],['错误','Error / Default 或 Focus'],['Fill 宽度','在父级 Auto Layout 中横向拉伸'],['当前不包含','Label 与 Helper 组合、Textarea、密码显隐、数字步进、Success、Loading 与前后缀文本']]}
  ]
};

const SEMANTIC_COLOR_PREVIEWS = {
  Background: ['#F5F6F8', '#FFFFFF', '#FFFFFF', '#EEF3FF'],
  Text: ['#181B1F', '#5D6470', '#7A808B', '#2361FF'],
  Icon: ['#181B1F', '#5D6470', '#2361FF', '#A5A9B1'],
  Border: ['#EEF0F2', '#DFE1E6', '#2361FF', '#1749DB']
};

const STATUS_COLOR_PREVIEWS = {
  'Info · 信息': ['#2361FF', '#EEF3FF', '#1749DB'],
  'Success · 成功': ['#19A65A', '#EAF8F0', '#117A42'],
  'Warning · 警告': ['#F5A524', '#FFF6E5', '#9A6400'],
  'Danger · 错误': ['#E5484D', '#FFF0F0', '#B4232A']
};

function addColorStrip(cell, colors, className = '') {
  const preview = document.createElement('div');
  preview.className = `color-strip ${className}`.trim();
  colors.forEach((color) => {
    const swatch = document.createElement('i');
    swatch.style.background = color;
    swatch.title = color;
    preview.appendChild(swatch);
  });
  cell.appendChild(preview);
}

function addAlphaPreview(cell, color, dark = false) {
  const preview = document.createElement('div');
  preview.className = `alpha-preview${dark ? ' alpha-dark' : ''}`;
  [0, .04, .08, .12, .16, .24, .32, .4, .48, .6, .72].forEach((alpha, index) => {
    const swatch = document.createElement('i');
    swatch.style.background = color.replace('ALPHA', alpha);
    swatch.title = `a${String(Math.round(alpha * 100)).padStart(2, '0')}`;
    if (index === 0) swatch.classList.add('alpha-zero');
    preview.appendChild(swatch);
  });
  cell.appendChild(preview);
}

function addGradientPreview(cell, label) {
  const preview = document.createElement('div');
  const vertical = label.includes('垂直');
  const stroke = label.includes('描边');
  preview.className = `gradient-preview ${vertical ? 'gradient-vertical' : 'gradient-horizontal'}${stroke ? ' gradient-stroke' : ''}`;
  cell.appendChild(preview);
}

function addTypographyPreview(cell, label) {
  const preview = document.createElement('div');
  preview.className = 'number-type-preview';
  preview.textContent = label === '缺省值' ? '—' : label === '百分比' ? '+12.48%' : label === '金额' ? '¥ 12,481.06' : '12,481.06';
  if (label === 'Number / Large') preview.classList.add('number-large');
  if (label === 'Number / Default') preview.classList.add('number-default');
  if (label === 'Number / Small') preview.classList.add('number-small');
  cell.appendChild(preview);
}

function addSpacingPreview(cell, value) {
  const size = Number.parseInt(value, 10) || 4;
  const preview = document.createElement('div');
  preview.className = 'spacing-preview';
  preview.style.setProperty('--demo-gap', `${Math.max(4, size)}px`);
  preview.innerHTML = '<i></i><span></span><i></i>';
  const measure = preview.querySelector('span');
  measure.textContent = `${size}px`;
  cell.appendChild(preview);
}

function addDensityPreview(cell, label) {
  const level = label.startsWith('Compact') ? 'compact' : label.startsWith('Comfortable') ? 'comfortable' : 'default';
  const preview = document.createElement('div');
  preview.className = `density-mini-preview density-${level}`;
  preview.innerHTML = '<div class="density-toolbar"><i></i><i></i><button type="button" tabindex="-1">操作</button></div><div class="density-table"><span></span><span></span><span></span></div>';
  preview.setAttribute('aria-hidden', 'true');
  cell.appendChild(preview);
}

function addPaddingPreview(cell, label) {
  if (label === '层级关系') {
    const preview = document.createElement('div');
    preview.className = 'padding-hierarchy-preview';
    preview.innerHTML = '<div class="level-page">页面 32<div class="level-section">区块 24<div class="level-card">卡片 16<div class="level-control">控件 12<div class="level-content">内容 4</div></div></div></div></div>';
    cell.appendChild(preview);
    return;
  }
  const pad = {Page: 24, Card: 16, Control: 12, Modal: 24}[label] || 16;
  const preview = document.createElement('div');
  preview.className = `padding-preview padding-${label.toLowerCase()}`;
  preview.style.setProperty('--padding-demo', `${Math.max(8, Math.min(pad, 24))}px`);
  preview.innerHTML = `<span>${pad}px</span><div>${label === 'Control' ? '控件内容' : label === 'Modal' ? '弹窗内容' : label === 'Card' ? '卡片内容' : '页面内容'}</div>`;
  cell.appendChild(preview);
}

function addSpaceStructurePreview(cell, label) {
  if (!label.startsWith('Page')) return;
  cell.classList.add('space-structure-lead');
  const preview = document.createElement('div');
  preview.className = 'space-structure-preview';
  preview.innerHTML = '<span>Page · 32</span><div class="structure-section"><b>Section · 32</b><div class="structure-module"><b>Module · 24</b><div class="structure-content"><b>Content Group</b><i>标题 ↔ 正文 8</i><i>项目 ↔ 项目 4</i></div></div></div>';
  cell.appendChild(preview);
}

function addRadiusSample(cell, label, value) {
  const radius = Number.parseInt(value, 10) || (label === '特殊强调' ? 12 : 0);
  const preview = document.createElement('div');
  preview.className = 'radius-sample-preview';
  preview.style.setProperty('--sample-radius', `${Math.min(radius, 18)}px`);
  preview.innerHTML = `<div><span>${radius}px</span></div>`;
  cell.appendChild(preview);
}

function addNestedRadiusPreview(cell, label, value) {
  const numbers = value.match(/\d+/g)?.map(Number) || [];
  const outer = numbers[0] ?? 12;
  const inner = numbers[2] ?? 8;
  const preview = document.createElement('div');
  preview.className = `nested-radius-preview${label === '避免' ? ' nested-radius-bad' : ''}`;
  preview.style.setProperty('--outer-radius', `${outer}px`);
  preview.style.setProperty('--inner-radius', `${inner}px`);
  preview.innerHTML = `<div><span>外 ${outer}</span><div><span>内 ${inner}</span></div></div>`;
  cell.appendChild(preview);
}

function addConnectedRadiusPreview(cell, label) {
  const preview = document.createElement('div');
  preview.className = 'connected-radius-preview';
  if (label === '输入框＋按钮') preview.innerHTML = '<span class="input-part">输入内容</span><span class="button-part">确定</span>';
  if (label === '分段控制器') preview.innerHTML = '<span>日</span><span class="middle">周</span><span>月</span>';
  if (label === '表格表头') preview.innerHTML = '<div class="table-cap"><b>名称</b><b>状态</b></div><div class="table-body"></div>';
  cell.appendChild(preview);
}

function addRadiusStabilityPreview(cell, label) {
  const preview = document.createElement('div');
  if (label.startsWith('Compact')) {
    preview.className = 'radius-density-preview';
    preview.innerHTML = '<span class="size-sm"></span><span class="size-md"></span><span class="size-lg"></span>';
  } else {
    preview.className = 'radius-state-preview';
    preview.innerHTML = '<span>Default</span><span>Hover</span><span>Focus</span><span>Disabled</span>';
  }
  cell.appendChild(preview);
}

function addShadowPreview(cell, label) {
  const level = label.split('/')[1]?.toLowerCase() || 'xs';
  const preview = document.createElement('div');
  preview.className = `effect-shadow-preview effect-shadow-${level}`;
  preview.innerHTML = '<span>Layer</span>';
  cell.appendChild(preview);
}

function addBlurPreview(cell, value) {
  const amount = Number.parseInt(value, 10) || 4;
  const preview = document.createElement('div');
  preview.className = 'effect-blur-preview';
  preview.style.setProperty('--blur-amount', `${Math.min(amount / 2, 12)}px`);
  preview.innerHTML = '<i></i><i></i><div><span>Glass</span></div>';
  cell.appendChild(preview);
}

function addProgressiveBlurPreview(cell, label) {
  const preview = document.createElement('div');
  preview.className = `progressive-blur-preview ${label.startsWith('Bottom') ? 'progressive-bottom' : 'progressive-top'}`;
  preview.innerHTML = '<i></i><span></span><span></span><span></span><b></b>';
  cell.appendChild(preview);
}

function addOverlayPreview(cell, label) {
  const strength = label.includes('Strong') ? 'strong' : label.includes('Default') ? 'default' : 'subtle';
  const preview = document.createElement('div');
  preview.className = `overlay-preview overlay-${strength}`;
  preview.innerHTML = '<i></i><i></i><i></i><div><b>Dialog</b><span>聚焦内容</span></div>';
  cell.appendChild(preview);
}

function makeButtonDemo({ type = 'primary', size = 'medium', state = 'default', iconOnly = false, danger = false, label = '操作' } = {}) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `component-button-demo button-${danger ? 'danger' : type} button-${size} button-${state}${iconOnly ? ' button-icon-only' : ''}`;
  button.textContent = iconOnly ? '+' : label;
  button.setAttribute('aria-label', iconOnly ? `${label}图标按钮` : label);
  if (state === 'disabled') button.disabled = true;
  return button;
}

function addButtonPlayground(cell, label) {
  const preview = document.createElement('div');
  preview.className = 'button-playground-preview';
  if (label === 'Button / Standard') {
    preview.append(makeButtonDemo({type:'primary',size:'large',label:'主要操作'}), makeButtonDemo({type:'secondary',size:'medium',label:'次要操作'}), makeButtonDemo({type:'text',size:'small',label:'文字按钮'}));
  } else if (label === 'Button / Danger') {
    preview.append(makeButtonDemo({danger:true,size:'large',label:'删除项目'}), makeButtonDemo({danger:true,size:'medium',iconOnly:true,label:'删除'}));
  } else {
    const group = document.createElement('div');
    group.className = 'button-group-demo';
    group.append(makeButtonDemo({type:'secondary',label:'取消'}), makeButtonDemo({type:'secondary',label:'预览'}), makeButtonDemo({type:'primary',label:'保存'}));
    preview.appendChild(group);
  }
  cell.appendChild(preview);
}

function addButtonMatrix(cell, label) {
  cell.classList.add('button-gallery-cell');
  const gallery = document.createElement('div');
  gallery.className = 'button-matrix-gallery';
  const states = ['default', 'hover', 'pressed', 'focus', 'disabled'];
  const stateNames = ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled'];
  const sizes = ['small', 'medium', 'large'];
  const sizeNames = ['Small', 'Medium', 'Large'];

  if (label === 'Button Group') {
    sizes.forEach((size, index) => {
      ['Hug', 'Fill'].forEach((distribution) => {
        const row = document.createElement('div');
        row.className = `button-group-matrix ${distribution === 'Fill' ? 'group-fill' : ''}`;
        const caption = document.createElement('b');
        caption.textContent = `${sizeNames[index]} · ${distribution}`;
        const group = document.createElement('div');
        group.className = 'button-group-demo';
        group.append(makeButtonDemo({type:'secondary',size,label:'取消'}), makeButtonDemo({type:'secondary',size,label:'预览'}), makeButtonDemo({type:'primary',size,label:'保存'}));
        row.append(caption, group);
        gallery.appendChild(row);
      });
    });
    cell.appendChild(gallery);
    return;
  }

  const types = label === 'Button / Danger' ? ['danger'] : ['primary', 'secondary', 'text'];
  const typeNames = label === 'Button / Danger' ? ['Danger'] : ['Primary', 'Secondary', 'Text'];
  ['Label', 'Icon Only'].forEach((content) => {
    const contentTitle = document.createElement('h4');
    contentTitle.textContent = `Content · ${content}`;
    gallery.appendChild(contentTitle);
    sizes.forEach((size, sizeIndex) => {
      const sizeTitle = document.createElement('h5');
      sizeTitle.textContent = sizeNames[sizeIndex];
      gallery.appendChild(sizeTitle);
      types.forEach((type, typeIndex) => {
        const row = document.createElement('div');
        row.className = 'button-matrix-row';
        const typeLabel = document.createElement('b');
        typeLabel.textContent = typeNames[typeIndex];
        row.appendChild(typeLabel);
        states.forEach((state, stateIndex) => {
          const item = document.createElement('div');
          item.className = 'button-matrix-item';
          const caption = document.createElement('small');
          caption.textContent = stateNames[stateIndex];
          item.append(caption, makeButtonDemo({type,size,state,iconOnly:content === 'Icon Only',danger:type === 'danger',label:type === 'danger' ? '删除' : '保存'}));
          row.appendChild(item);
        });
        gallery.appendChild(row);
      });
    });
  });
  cell.appendChild(gallery);
}

function createInputVisual({ state = 'default', size = 'medium', leading = false, trailing = false, error = false, value = '请输入内容' } = {}) {
  const wrap = document.createElement('div');
  wrap.className = `component-input-demo input-${size} input-${error ? 'error' : state}`;
  if (leading) {
    const slot = document.createElement('span');
    slot.className = 'input-icon-slot';
    const icon = document.createElement('img');
    icon.src = './assets/search-line.svg';
    icon.alt = '';
    slot.appendChild(icon);
    wrap.appendChild(slot);
  }
  const text = document.createElement('span');
  text.textContent = value;
  wrap.appendChild(text);
  if (trailing || error) {
    const slot = document.createElement('span');
    slot.className = 'input-icon-slot';
    const icon = document.createElement('img');
    icon.src = error ? './assets/error-warning-line.svg' : './assets/close-circle-line.svg';
    icon.alt = '';
    slot.appendChild(icon);
    wrap.appendChild(slot);
  }
  return wrap;
}

function addInputAnatomy(cell, label) {
  const preview = document.createElement('div');
  preview.className = 'input-anatomy-preview';
  preview.appendChild(createInputVisual({leading:true,trailing:label === 'Input/Standard',error:label === 'Input/Error',value:label === 'Input/Error' ? '邮箱格式不正确' : '搜索项目名称'}));
  const tree = document.createElement('div');
  tree.className = 'input-tree-labels';
  tree.innerHTML = label === 'Input/Standard' ? '<span>Leading Icon</span><span>Text</span><span>Trailing Icon</span>' : '<span>Leading Icon</span><span>Text</span><span>Error Icon</span>';
  preview.appendChild(tree);
  cell.appendChild(preview);
}

function addInputVariantMatrix(cell, label) {
  cell.classList.add('input-variant-cell');
  const matrix = document.createElement('div');
  matrix.className = 'input-variant-matrix';
  const states = label === 'Input/Standard' ? ['default','hover','focus','disabled','readonly'] : ['default','focus'];
  ['small','medium','large'].forEach((size) => {
    ['Placeholder','Value'].forEach((content) => {
      const row = document.createElement('div');
      row.className = 'input-variant-row';
      row.style.gridTemplateColumns = `88px repeat(${states.length}, minmax(96px, 1fr))`;
      const caption = document.createElement('b');
      caption.textContent = `${size[0].toUpperCase()} · ${content}`;
      row.appendChild(caption);
      states.forEach((state) => {
        const item = document.createElement('div');
        item.className = 'input-variant-item';
        const stateLabel = document.createElement('small');
        stateLabel.textContent = state === 'readonly' ? 'Read-only' : state[0].toUpperCase()+state.slice(1);
        item.append(stateLabel, createInputVisual({size,state,error:label === 'Input/Error',value:content === 'Value' ? '已输入内容' : '请输入内容'}));
        row.appendChild(item);
      });
      matrix.appendChild(row);
    });
  });
  cell.appendChild(matrix);
}

function addInputStatePreview(cell, label) {
  const preview = document.createElement('div');
  preview.className = 'input-state-preview';
  if (label === 'Standard') ['default','hover','focus','disabled','readonly'].forEach((state) => preview.appendChild(createInputVisual({state,value:state === 'readonly' ? '只读内容' : '请输入内容'})));
  else if (label === 'Focus') preview.appendChild(createInputVisual({state:'focus',value:'正在输入…'}));
  else preview.append(createInputVisual({error:true,state:'default',value:'邮箱格式不正确'}), createInputVisual({error:true,state:'focus',value:'邮箱格式不正确'}));
  cell.appendChild(preview);
}

function addInputSizePreview(cell, label) {
  const size = label.toLowerCase();
  const preview = document.createElement('div');
  preview.className = 'input-size-preview';
  preview.appendChild(createInputVisual({size,value:`${label} · 输入内容`}));
  cell.appendChild(preview);
}

function addInputIconPreview(cell, label) {
  const preview = document.createElement('div');
  preview.className = 'input-icon-preview';
  preview.appendChild(createInputVisual({leading:label === '前置图标',trailing:label === '尾部图标',error:label === '错误图标',value:label === '前置图标' ? '搜索内容' : label === '尾部图标' ? '可清空内容' : '校验失败'}));
  cell.appendChild(preview);
}

function addInputExamplePreview(cell, label) {
  if (label === '当前不包含') return;
  const preview = document.createElement('div');
  preview.className = `input-example-preview${label === 'Fill 宽度' ? ' input-fill-preview' : ''}`;
  preview.appendChild(createInputVisual({leading:label === '带图标',trailing:label === '带图标',error:label === '错误',state:label === '错误' ? 'focus' : 'default',value:label === '错误' ? '邮箱格式不正确' : label === '带图标' ? '搜索并清空' : '请输入内容'}));
  cell.appendChild(preview);
}

function enhanceVisualCell(cell, board, section, label, value) {
  if (board === 'color' && section.t === '语义颜色引用' && SEMANTIC_COLOR_PREVIEWS[label]) {
    addColorStrip(cell, SEMANTIC_COLOR_PREVIEWS[label], 'semantic-strip');
  }
  if (board === 'color' && section.t === '状态颜色组合' && STATUS_COLOR_PREVIEWS[label]) {
    addColorStrip(cell, STATUS_COLOR_PREVIEWS[label], 'status-strip');
  }
  if (board === 'color' && section.t === '透明度与遮罩') {
    if (label === 'Black Alpha') addAlphaPreview(cell, 'rgba(24,27,31,ALPHA)');
    if (label === 'White Alpha') addAlphaPreview(cell, 'rgba(255,255,255,ALPHA)', true);
    if (label === 'Blue Alpha') addAlphaPreview(cell, 'rgba(35,97,255,ALPHA)');
    if (label === '遮罩语义') addAlphaPreview(cell, 'rgba(24,27,31,ALPHA)');
  }
  if (board === 'color' && section.t === '主题渐变') {
    if (label.includes('填充') || label.includes('描边')) addGradientPreview(cell, label);
    if (label === '起点') addColorStrip(cell, ['#2361FF'], 'endpoint-strip');
    if (label === '终点') addColorStrip(cell, ['#6D5DFB'], 'endpoint-strip');
  }
  if (board === 'typography' && section.t === '数字文本样式') addTypographyPreview(cell, label);
  if (board === 'spacing' && section.t === '间距语义层级') addSpacingPreview(cell, value);
  if (board === 'spacing' && section.t === '信息密度') addDensityPreview(cell, label);
  if (board === 'spacing' && section.t === '内边距体系') addPaddingPreview(cell, label);
  if (board === 'spacing' && section.t === '页面空间结构') addSpaceStructurePreview(cell, label);
  if (board === 'radius' && section.t === '容器与浮层') addRadiusSample(cell, label, value);
  if (board === 'radius' && section.t === '嵌套圆角') addNestedRadiusPreview(cell, label, value);
  if (board === 'radius' && section.t === '连续组合与方向圆角') addConnectedRadiusPreview(cell, label);
  if (board === 'radius' && section.t === '尺寸、密度与状态') addRadiusStabilityPreview(cell, label);
  if (board === 'effects' && section.t === '投影样式') addShadowPreview(cell, label);
  if (board === 'effects' && section.t === '背景模糊样式') addBlurPreview(cell, value);
  if (board === 'effects' && section.t === '渐进模糊' && label !== '适用') addProgressiveBlurPreview(cell, label);
  if (board === 'effects' && section.t === '背景遮罩 Overlay') addOverlayPreview(cell, label);
  if (board === 'button' && section.t === '组件预览区域') addButtonPlayground(cell, label);
  if (board === 'button' && section.t === '全部组件内容') addButtonMatrix(cell, label);
  if (board === 'input' && section.t === '结构与组件树') addInputAnatomy(cell, label);
  if (board === 'input' && section.t === 'Variant 架构') addInputVariantMatrix(cell, label);
  if (board === 'input' && section.t === '状态') addInputStatePreview(cell, label);
  if (board === 'input' && section.t === '尺寸') addInputSizePreview(cell, label);
  if (board === 'input' && section.t === '图标使用') addInputIconPreview(cell, label);
  if (board === 'input' && section.t === '示例与限制') addInputExamplePreview(cell, label);
}

function renderFigmaBoard(target, sections) {
  const board = target.dataset.boardContent;
  const heading = document.createElement('div');
  heading.className = 'board-complete-heading';
  heading.innerHTML = '<span>FIGMA BOARD CONTENT</span><h3>画板完整章节</h3><p>以下内容按 Figma 画板中的章节顺序展开。</p>';
  target.appendChild(heading);

  sections.forEach((section) => {
    const article = document.createElement('article');
    article.className = 'figma-section-card';
    article.dataset.sectionTitle = section.t;
    const header = document.createElement('header');
    const kicker = document.createElement('span');
    kicker.textContent = section.k;
    const title = document.createElement('h3');
    title.textContent = section.t;
    const desc = document.createElement('p');
    desc.textContent = section.d;
    header.append(kicker, title, desc);
    article.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'figma-data-grid';
    section.i.forEach((item) => {
      if (Array.isArray(item)) {
        const cell = document.createElement('div');
        const label = document.createElement('b');
        label.textContent = item[0];
        const value = document.createElement('p');
        value.textContent = item[1];
        if (/[/]|Token|spacing|radius|Shadow|Blur|Overlay|icon\//i.test(item[1])) value.classList.add('token-value');
        cell.append(label, value);
        enhanceVisualCell(cell, board, section, item[0], item[1]);
        grid.appendChild(cell);
      } else {
        const row = document.createElement('div');
        row.className = item.startsWith('×') ? 'rule-item rule-no' : 'rule-item';
        row.textContent = item.replace(/^[✓×]\s*/, '');
        grid.appendChild(row);
      }
    });
    article.appendChild(grid);
    target.appendChild(article);
  });
}

document.querySelectorAll('[data-board-content]').forEach((target) => {
  renderFigmaBoard(target, FIGMA_BOARD_CONTENT[target.dataset.boardContent] || []);
});
