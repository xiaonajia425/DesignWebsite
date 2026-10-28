# 组件规范 Skill · V1.0

## 适用范围

用于按钮、图标和单行输入框的设计、评审与研发验收。

## 按钮

- 一个操作区域最多保留一个 Primary。
- Danger 只表达高风险或不可逆操作，并配合明确后果说明。
- 文案优先使用“动词”或“动词 + 对象”。
- Icon Only 必须提供 Accessible Name。

## 图标

- 源组件保持 24 × 24 基准网格，通过实例替换切换图标。
- 使用 12、14、16、20、24、32px 推荐尺寸。
- 需要光学校准时调整外部容器，不修改源路径。

## 输入框

- Standard 覆盖 Default、Hover、Focus、Disabled、Read-only。
- Error 需要危险语义边框、状态图标与文字错误说明。
- Placeholder 不替代 Label。
- Disabled 与 Read-only 保持不同语义。
