# 缝合设计

一个面向 AI 编程助手的网页与简历设计 Skill。

它的目标不是提供一套固定模板，而是让 AI 在设计网站、优化页面、生成简历 HTML、制作作品集、准备可打印 PDF 前，先建立设计判断：场景是什么、内容密度多高、用户如何阅读、中文和英文如何排版、哪些视觉套路应该避免。

## 适用场景

- 设计或优化个人网站、作品集、产品页面、Landing Page
- 生成更有设计感的 HTML / CSS
- 设计中文简历、英文简历或中英混排简历 HTML
- 把网页内容整理成更清晰的视觉系统
- 为长期项目创建 `DESIGN.md`
- 在 HTML 转 PDF 前先检查字体、版式、断页和留白

## 核心思路

### 1. 把设计请求拆成可执行模式

这个 Skill 不是只说“参考 Impeccable”，而是把它的设计工作方式内化成模式：

- `shape`：方向不清时先定设计判断
- `craft`：从零做页面或 HTML
- `critique`：先指出问题再改
- `polish`：在保留意图的前提下打磨现有页面
- `harden`：用真实和极端内容检查稳定性
- `typeset`：处理中文、中英混排、简历和打印阅读
- `layout`：处理层级、栅格、密度和节奏
- `colorize`：处理色彩角色和对比

### 2. 先判断场景，再做设计

网站、App 工具、简历、Dashboard、作品集、报告、打印 PDF 的设计密度不同。这个 Skill 要求先判断页面的真实用途，而不是直接生成一个通用模板。

### 3. 用 DESIGN.md 沉淀可复用设计系统

生成 HTML 前，需要先确定：

- 字体层级
- 色彩角色
- 栅格与间距
- 组件状态
- 响应式行为
- 打印或 PDF 约束

如果项目会被持续维护，应创建或读取 `DESIGN.md`，把主题、颜色角色、字体规则、组件规范、响应式行为和 AI 后续编辑规则写成项目合约，而不是只在聊天里描述。

### 4. 反通用 AI 模板感

Skill 明确避免：

- 默认 AI SaaS 页面风格
- 一整页紫蓝渐变
- 装饰性光斑、圆球、背景 blob
- 渐变字作为主要层级
- 侧边色条卡片作为默认样式
- 玻璃拟态作为装饰
- 所有内容都包成卡片
- 卡片套卡片
- 灰字压在彩色背景上
- 只追求好看但不利于阅读和使用

### 5. 重视中文与中英混排

这个 Skill 特别关注：

- 中文标题断词
- 中英混排换行
- 数字、URL、英文长词溢出
- 中文简历的信息密度
- 移动端中文长句阅读
- PDF 中字号、行高、留白和断页

### 6. HTML 转 PDF 必须视觉校验

如果任务涉及 HTML 转 PDF，应配合 `html-to-pdf-qa` 工作流：

- 先完成 HTML 设计
- 导出 PDF
- 将 PDF 每一页渲染为图片
- 检查每页字号、断页、留白、裁切和可读性
- 不默认一页或两页，页数服从内容、目的和美观性

## 目录结构

```text
skills/designed-html-builder/
├── SKILL.md
├── agents/openai.yaml
└── references/
    ├── design-md-contract.md
    ├── design-md-template.md
    ├── design-rubric.md
    ├── impeccable-internalized.md
    └── resume-html-design.md
```

## 安装方式

把 `skills/designed-html-builder` 复制到你的 Codex skills 目录中即可。

```bash
cp -R skills/designed-html-builder ~/.codex/skills/
```

## 已内化的方法

这个 Skill 的设计吸收并内化了三个方向：

- `pbakaus/impeccable`：不是只引用名称，而是内化为 mode routing、preflight gates、critique/polish/harden、anti-pattern 和 visual QA 规则。
- `VoltAgent/awesome-design-md`：不是只引用名称，而是内化为 `DESIGN.md` 合约、语义 token、组件状态、响应式和 agent prompt guide。
- `fonted-design`：作为字体、排版和中英混排层处理，强调字体层级、行长、行高、数字/URL/英文长词换行和打印可读性。

## License

MIT
