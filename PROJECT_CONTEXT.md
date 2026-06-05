# PROJECT_CONTEXT — 项目上下文速览

> **用途**：在新 IDE、新电脑或其他设备上打开本项目时，快速了解「这是什么、改哪里、怎么跑、怎么发」。  
> **维护者**：龙文广  
> **最后更新**：2026-05-31

---

## 快速本地开始

### 1. 加载环境（3 步）

| 步骤 | 说明 |
|------|------|
| **进入项目** | 本地：`z:\Desktop\vibe coding项目\personal-site`<br>新设备克隆：`git clone git@github.com:lys11111/My-Personal-Site.git` → `cd My-Personal-Site` |
| **Node 版本** | **>= 22.12**（见 [`.node-version`](./.node-version)，当前为 `22`） |
| **安装并启动** | `npm install` → `npm run dev` → http://localhost:4321 |

环境说明：

- **无需 `.env`**：本地开发零配置，无环境变量文件
- **无需配置 Cloudflare**：部署 Secrets 在 GitHub 仓库侧，本地不用管
- **构建验证**（部署前建议）：`npm run build`（产物 `dist/`，已 gitignore）→ `npm run preview`

### 2. 改内容：只动这些路径

```text
src/content/
├── learning/*.md     →  /learning/{文件名}
├── projects/*.md     →  /projects/{文件名}
└── notes/*.md        →  /notes/{文件名}
```

- 文件名 = URL slug（小写英文 + 连字符，不要用中文文件名）
- frontmatter 规范见 [`src/content.config.ts`](./src/content.config.ts)
- 模板与 draft 规则详见下文「内容编辑规则」

### 3. 改页面 / 样式：常用路径

| 任务 | 路径 |
|------|------|
| 首页 | `src/pages/index.astro` |
| 关于 / 联系方式 | `src/pages/about.astro` |
| 顶部导航 / 下拉菜单 | `src/components/Navbar.astro` + `NavDropdown.astro` |
| 列表页锚点滚动 | `src/components/HashScroll.astro`（projects / learning / notes 列表页已接入） |
| 页脚 | `src/components/Footer.astro` |
| 主题色 / 字体 | `src/styles/global.css` |
| 项目卡片 / 列表项 | `ProjectCard.astro`（首页）· `ProjectListItem.astro`（列表页） |
| 状态徽章 | `Badge.astro` + `src/lib/badges.ts` |
| 内容排序工具 | `src/lib/content.ts` → `sortPublishedByDate()` |
| 随笔分类分组 | `src/lib/notes.ts` → `groupNotesByCategory()`、`getPhotographyProfileUrl()` |
| 内容 schema | `src/content.config.ts` |
| 静态资源（favicon、简历 PDF） | `public/` |
| 部署流水线 | `.github/workflows/deploy-cloudflare-pages.yml` |

完整目录说明见下文「目录地图」。

### 4. 日常编辑流程（复制即用）

在 **vibe coding 工作区** 下从根目录开始；若已 `cd` 进本仓库，可跳过第一行。

```bash
cd personal-site
npm run dev          # 本地预览 http://localhost:4321
# 编辑 src/content/learning|projects|notes/*.md
git add . && git commit -m "content: 描述" && git push   # 推送到 main 后自动部署
```

- 首次在本机：先执行 `npm install`（见上文 §1）
- 部署前可选：`npm run build` 确认能通过构建
- 线上约 1～2 分钟更新：https://lys11111-personal-site.pages.dev  
- 部署状态：https://github.com/lys11111/My-Personal-Site/actions  

更多发布说明见下文「发布流程」。

---

## 30 秒了解

| 项 | 值 |
|----|-----|
| **是什么** | 个人展示网站（简历补充），展示学习笔记 + Vibe Coding 项目 |
| **技术栈** | Astro 6 · Tailwind CSS 4 · Markdown Content Collections |
| **内容怎么写** | 编辑 `src/content/` 下的 `.md` 文件，**不是**改数据库或后台 |
| **怎么发布** | `git push` 到 `main` → GitHub Actions 自动构建部署到 Cloudflare |
| **线上地址** | https://lys11111-personal-site.pages.dev |
| **代码仓库** | https://github.com/lys11111/My-Personal-Site |

**大多数日常操作 = 改 Markdown → 本地预览 → push，无需碰 Cloudflare。**  
本地启动与环境加载见上文「快速本地开始」。

---

## 目录地图：想改什么就去哪

```
personal-site/
├── src/content/              ★ 主要编辑区：所有文章/项目正文
│   ├── learning/               学习笔记
│   ├── projects/               项目展示
│   └── notes/                  随笔
├── src/content.config.ts       ★ 内容类型 schema（改 frontmatter 字段来这里）
├── src/pages/                  页面路由（改列表页、关于页等）
├── src/layouts/                页面外壳（导航、文章详情框架）
├── src/components/             卡片、导航下拉、锚点滚动等 UI 组件
│   ├── Navbar.astro            顶栏；自动读取 content 生成「项目/学习/随笔」下拉
│   ├── NavDropdown.astro       下拉菜单（白底、宽度随标题自适应）
│   ├── HashScroll.astro        列表页 `#slug` 锚点平滑滚动
│   ├── ProjectCard.astro       首页精选项目卡片
│   └── ProjectListItem.astro   项目列表页条目（支持 stack / split 布局）
├── src/lib/
│   ├── content.ts              isPublished、sortPublishedByDate、formatDate
│   ├── projects.ts             项目列表 / 导航下拉共用分组与顺序（androidProjectIds 等）
│   └── badges.ts               项目 status 等徽章文案与样式
├── src/styles/global.css       全局样式、主题色、prose 排版
├── public/                     静态文件（images、videos、files、favicon）
├── scripts/                    项目封面批量截图（Playwright）
│   ├── capture-project-screenshots.mjs
│   └── capture-auto-short-drama.mjs
├── prototype-demo-toolkit/     原型 Demo 录屏（见 docs/原型demo自动化.md）
├── astro.config.mjs            Astro + Tailwind + MDX 配置
├── wrangler.toml               Cloudflare 项目名（lys11111-personal-site）
└── .github/workflows/          自动部署流水线（一般不用改）
```

### 常见任务 → 改哪个文件

| 我想… | 去这里 |
|--------|--------|
| 写一篇学习笔记 | `src/content/learning/新文件名.md` |
| 加一个项目 | `src/content/projects/新文件名.md` |
| 写随笔 | `src/content/notes/新文件名.md` |
| 改首页文案/布局 | `src/pages/index.astro` |
| 改关于页、联系方式 | `src/pages/about.astro` |
| 改顶部导航 / 下拉 | `src/components/Navbar.astro`、`NavDropdown.astro` |
| 改列表页锚点跳转 | 各列表页 `index.astro` 的 `id={slug}` + `HashScroll.astro` |
| 改页脚文案 | `src/components/Footer.astro` |
| 改主题色/字体 | `src/styles/global.css`（`@theme` 变量） |
| 改项目列表页分组 / 排序 | `src/lib/projects.ts`（`androidProjectIds` / `webProjectIds`）+ `src/pages/projects/index.astro` |
| 改项目卡片 / 列表样式 | `ProjectCard.astro`、`ProjectListItem.astro` |
| 新增 frontmatter 字段 | `src/content.config.ts` + 对应 layout/页面 |
| 改 Markdown 表格排版 | `src/styles/global.css` → `.prose-content table`（全宽均分列） |
| 改部署/Cloudflare | `.github/workflows/deploy-cloudflare-pages.yml` |

---

## 内容编辑规则

### 文件命名 = URL slug

- 文件 `src/content/projects/shiki-desktop-pet.md` → 网址 `/projects/shiki-desktop-pet`
- 文件名用小写英文 + 连字符，**不要用中文文件名**

### 三种内容类型

**1. 学习笔记** `src/content/learning/*.md`

```yaml
---
title: "标题"
description: "摘要，用于列表和 SEO"
date: 2026-05-29          # YYYY-MM-DD
category: "AI产品"          # 列表页显示的分类
tags: ["Prompt"]
featured: false             # true 会在首页「最近学习」更突出
draft: false                # true：本地可见，上线不可见
---

正文用 Markdown 写在这里。
```

**2. 项目** `src/content/projects/*.md`

```yaml
---
title: "English Name · 中文名"   # 先英文、后中文，中间用「 · 」分隔
description: "一句话"
date: 2026-05-29
status: "prototype"         # demo | prototype | archived
tags: ["Electron"]
demoUrl: "https://..."      # 可选，有则显示「查看 Demo」
repoUrl: "https://github.com/..."  # 可选，有则显示 GitHub 按钮
cover: "/images/projects/xxx-cover.webp"  # 可选，列表/卡片 + 无 coverVideo 时的详情头图
coverVideo: "/videos/projects/xxx-demo.mp4"  # 可选，详情页头图区可播放视频（poster 用 cover）
featured: true                # true 出现在首页「精选项目」
techStack: ["Electron", "Vite"]
platform: "web"              # android | web — 项目列表页分组展示
listLayout: "stack"          # stack=上图下文（Web/桌面）；split=左图右文（H5/竖屏原型）
draft: false
---
```

**项目标题命名**：`title` 统一为 **「英文名 · 中文名」**（先英文、后中文，中间英文间隔号 ` · `）。该标题会同步用于首页卡片、项目详情页、顶部导航下拉等所有展示位，请只在 frontmatter 里维护一处。

**`platform` 分组**

| 值 | 列表页分区 | 当前项目 |
|----|------------|----------|
| `"android"` | **安卓端**（左图右文 `split`） | EmoVision · 闺蜜眼镜、AIFIT · AI 健身 App、Tidegrain Bay · 穗潮湾、Idle Cove · 摸鱼海湾、Liangxiangzhi · 两相知 AI 文创关系签 |
| `"web"` | **Web 端**（上图下文 `stack`） | Shiki · 桌宠 Agent、Auto Short Drama · 短剧创作工作台 |

列表页 **不依赖** frontmatter 的 `listLayout` 字段，而是在 `src/lib/projects.ts` 的 slug 白名单 + `src/pages/projects/index.astro` 固定分组与顺序；导航下拉与列表页共用 `src/lib/projects.ts`。

**`listLayout` 选用建议**（详情页等仍可读 frontmatter；列表页按分区强制覆盖）

| 值 | 适用 | 当前项目示例 |
|----|------|--------------|
| `split` | 手机/H5 竖屏原型、穿戴 Demo | 安卓端全部 5 项 |
| `stack` | 桌面/Web 宽屏、无竖屏封面 | Web 端 2 项 |

**列表页 split 封面尺寸**：`ProjectListItem.astro` 统一为 **280px 宽 × 9:16 比例** 容器 + `object-contain`，避免易拉宝等超高图（如 EmoVision）撑破左栏。

**列表页 stack 封面尺寸**：**16:10 宽屏框** + `object-cover object-top` + 外框 `p-2`，铺满内容区宽度，避免竖长截图在 Web 端列表里缩成「手机窄条」。

**3. 随笔** `src/content/notes/*.md`

```yaml
---
title: "标题"
description: "摘要"
date: 2026-05-29
category: "摄影"              # 可选，分类大标签（如「摄影」「站点」）
tags: ["Meta"]
externalUrl: "https://..."    # 可选，站外链接（专栏页=小红书主页，单篇=对应笔记）
externalLabel: "在小红书查看"  # 可选，外链按钮文案
draft: false
---
```

支持嵌套 slug：`src/content/notes/photography/xxx.md` → `/notes/photography/xxx`。摄影专栏 hub 为 `photography.md` → `/notes/photography`。

### draft 行为

| 环境 | `draft: true` 是否显示 |
|------|------------------------|
| `npm run dev` | 显示 |
| `npm run build` / 线上 | **不显示** |

逻辑在 `src/lib/content.ts` → `isPublished()`。

---

## 放置图片、视频、文件与外链

站点是静态站，**没有后台上传**。资源来自 `public/` 目录里的文件，或正文 / frontmatter 里的 HTTPS 链接。`git push` 后 Cloudflare 会一并部署 `public/` 下的内容。

### 能力对照

| 内容 | 能否展示 | 做法 |
|------|----------|------|
| 网页链接（Demo、GitHub、Notion 等） | 能 | 项目 frontmatter 的 `demoUrl` / `repoUrl`（详情页顶部按钮）；正文 `[文字](https://...)` |
| Demo 图片 | 能 | 放入 `public/images/`，正文 `![说明](/images/xxx.png)`；或外链图床 URL |
| Demo 视频 | 能 | 小视频放 `public/videos/`，正文用 HTML `<video>`；大视频建议 B 站 / YouTube 链接 |
| 可下载文件（PDF、zip 等） | 能 | 放 `public/files/`，正文 `[下载说明](/files/xxx.pdf)` |
| 内嵌在线 Demo | 部分能 | 正文 `<iframe src="https://...">`（目标站须允许嵌入）；否则只用 `demoUrl` 新开标签页 |
| 项目封面 `cover` | 能 | frontmatter；列表/首页卡片；`coverVideo` 存在时作视频 poster |
| 详情页 Demo 视频 `coverVideo` | 能 | frontmatter 填 `/videos/projects/xxx.mp4`；列表仍用 `cover` 静图 |

### 推荐 `public/` 目录

```text
public/
├── images/
│   └── projects/    # 封面与截图（7 个项目，见「项目总览」）
├── videos/
│   └── projects/    # 详情页 coverVideo（穗潮湾 / 闺蜜眼镜 / 摸鱼海湾等）
├── files/           # 可下载 md/PDF 等
└── resume.pdf       # 简历（about 页可链到 /resume.pdf）
```

目录不存在时可自行新建；路径以 `/` 开头，对应 `public/` 根目录。

### 示例（项目 Markdown）

文件：`src/content/projects/shiki-desktop-pet.md`

```markdown
---
title: "Shiki · 桌宠 Agent"
demoUrl: "https://你的在线-demo.com"
repoUrl: "https://github.com/..."
---

![桌宠界面](/images/shiki-screenshot.png)

<video src="/videos/shiki-demo.mp4" controls width="100%"></video>

[下载 Windows 安装包](/files/shiki-setup.zip)

[在线原型](https://example.com/prototype)
```

学习笔记、随笔同样可在正文里插入图片、视频 HTML 与下载链接。

### 内嵌网页（iframe）

```html
<iframe src="https://你的-demo.pages.dev" width="100%" height="480" title="Demo"></iframe>
```

若页面空白或报错，多为目标站禁止 iframe（`X-Frame-Options`）。改用在 frontmatter 填 `demoUrl`，或正文放普通链接。

### 限制与注意

- **Git 仓库体积**：视频、大 PDF 会随仓库变大；超大视频请用外链，不要提交进 repo。
- **Cloudflare Pages**：单文件部署上限约 **25MB**（以 Cloudflare 当前政策为准），超大文件不宜放 `public/`。
- **预览与发布**：`npm run dev` 本地看效果 → 确认无误后按上文「日常编辑流程」`git push` 自动上线。

---

## 导航下拉与列表锚点（2026-05 新增）

顶栏 **项目 / 学习 / 随笔** 为下拉菜单，条目来自 `getCollection()` + `sortPublishedByDate()`，**新增 Markdown 后会自动出现在下拉中**，无需手改导航配置。

| 行为 | 说明 |
|------|------|
| 下拉项链接 | `/projects/#slug`、`/learning/#slug`、`/notes/#slug` |
| 列表页锚点 | 每条内容外包 `<section id="{slug}" class="scroll-mt-24">` |
| 平滑滚动 | 列表页引入 `HashScroll.astro`，进入带 hash 的 URL 时滚到对应条目 |
| 样式 | 下拉白底不透明、`w-max` 宽度随标题单行展示 |

---

## 项目列表页分组（2026-05 更新）

`/projects` 分为 **安卓端**、**Web 端** 两个区块，分组与排序由 `src/lib/projects.ts` 内 slug 白名单决定（列表页与顶栏下拉共用）：

```typescript
// src/lib/projects.ts
export const androidProjectIds = [
  'emovision-glasses',
  'aifit-mobile',
  'tidegrain-bay',
  'idle-cove',
  'liangxiangzhi',
] as const;

export const webProjectIds = ['shiki-desktop-pet', 'auto-short-drama'] as const;
```

| 分区 | 排版 | 导航下拉 |
|------|------|----------|
| 安卓端 | 左图右文（`split`） | 280×9:16 左栏；下拉分组「安卓端」 |
| Web 端 | 上图下文（`stack`） | 16:10 宽屏封面、`p-2` 窄留白；下拉分组「Web 端」 |

新增项目时：在 Markdown 里写 `platform`，并把 slug 加入 `src/lib/projects.ts` 对应数组。

---

## 项目总览（2026-05-31）

本站共 **7 个项目**（全部 `featured: true`），按 **安卓端 H5/穿戴原型** 与 **Web/桌面工具** 分两栏展示。正文以 Markdown 撰写；列表用 `cover` 静图，部分详情页用 `coverVideo` 在头图区直接播放 Demo。

### 一句话定位

| slug | 标题 | 核心方向 |
|------|------|----------|
| `emovision-glasses` | EmoVision · 闺蜜眼镜 | 南客松 S2 优秀 — Rokid 眼镜第一视角情绪识别 + Web 无硬件演示 |
| `aifit-mobile` | AIFIT · AI 健身 App | MediaPipe 姿态识别 + 移动端训练/打卡原型 |
| `tidegrain-bay` | Tidegrain Bay · 穗潮湾 | 陀螺仪 3DoF 全景 H5 轻经营，四场景一日回环 |
| `idle-cove` | Idle Cove · 摸鱼海湾 | 单文件 Canvas 竖屏钩钓，办公室「摸鱼」叙事 |
| `liangxiangzhi` | Liangxiangzhi · 两相知 | 古籍仪式感 H5 + 本地面相取象 + 关系合参 |
| `shiki-desktop-pet` | Shiki · 桌宠 Agent | Electron 透明桌宠 + FastAPI 对话与角色包孵化 |
| `auto-short-drama` | Auto Short Drama · 短剧创作工作台 | 对话式 AIGC 短剧 — 故事方向 → 场景 → 分镜 |

### 媒体与外链

| slug | status | 详情页视频 | GitHub / Demo |
|------|--------|------------|---------------|
| `emovision-glasses` | prototype | `emovision-glasses-demo.mp4`（宣传） | 无公开仓库 |
| `aifit-mobile` | prototype | — | [AI-Fit](https://github.com/lys11111/AI-Fit) |
| `tidegrain-bay` | prototype | `tidegrain-bay-demo.mp4` | [Tidegrain_Bay](https://github.com/lys11111/Tidegrain_Bay) |
| `idle-cove` | demo | `idle-cove-demo.mp4` | 单文件 H5，无仓库 |
| `liangxiangzhi` | demo | — | [liangxiangzhi-prototype](https://github.com/Valeera723/liangxiangzhi-prototype) |
| `shiki-desktop-pet` | prototype | — | 本地 `桌宠开发-shiki/`，无在线 Demo |
| `auto-short-drama` | prototype | — | 本地 `AIGC工作流辅助/auto-short-drama/` |

视频路径：`public/videos/projects/`。单文件建议 **< 20MB**（Cloudflare 上限约 25MB）。

### 封面与截图脚本

| 命令 | 覆盖项目 |
|------|----------|
| `node scripts/capture-project-screenshots.mjs` | AIFIT、两相知、Shiki（需工作区兄弟目录 + Playwright） |
| `node scripts/capture-auto-short-drama.mjs` | 短剧工作台（Vite :4173） |
| `prototype-demo-toolkit` → `npm run demo:record` | Web/H5 自动录屏，见 [`docs/原型demo自动化.md`](./docs/原型demo自动化.md) |

---

## 当前已有内容（清单）

### 项目 `src/content/projects/`（7 篇）

**列表页展示顺序**（与下表 `platform` 一致）：

| 分区 | 顺序 | slug | 标题 |
|------|------|------|------|
| 安卓端 | 1 | `emovision-glasses` | EmoVision · 闺蜜眼镜 |
| 安卓端 | 2 | `aifit-mobile` | AIFIT · AI 健身 App |
| 安卓端 | 3 | `tidegrain-bay` | Tidegrain Bay · 穗潮湾 |
| 安卓端 | 4 | `idle-cove` | Idle Cove · 摸鱼海湾 |
| 安卓端 | 5 | `liangxiangzhi` | Liangxiangzhi · 两相知 AI 文创关系签 |
| Web 端 | 1 | `shiki-desktop-pet` | Shiki · 桌宠 Agent |
| Web 端 | 2 | `auto-short-drama` | Auto Short Drama · 短剧创作工作台 |

| slug | 标题 | platform | 列表排版 | 封面 / 链接 |
|------|------|----------|----------|-------------|
| `emovision-glasses` | EmoVision · 闺蜜眼镜 | android | split | 封面 WebP + **详情页宣传视频** |
| `aifit-mobile` | AIFIT · AI 健身 App | android | split | 封面 + 欢迎/训练截图；[GitHub](https://github.com/lys11111/AI-Fit) |
| `tidegrain-bay` | Tidegrain Bay · 穗潮湾 | android | split | 封面 WebP + **详情页 Demo 视频**；[GitHub](https://github.com/lys11111/Tidegrain_Bay) |
| `idle-cove` | Idle Cove · 摸鱼海湾 | android | split | 封面 WebP + **详情页 Demo 视频** |
| `liangxiangzhi` | Liangxiangzhi · 两相知 AI 文创关系签 | android | split | 封面 + 流程截图；[GitHub](https://github.com/Valeera723/liangxiangzhi-prototype) |
| `shiki-desktop-pet` | Shiki · 桌宠 Agent | web | stack | 封面 + UI 截图（Vite 开发界面） |
| `auto-short-drama` | Auto Short Drama · 短剧创作工作台 | web | stack | 封面 + 设置页截图（Vite 首页） |

静态资源：`public/images/projects/`、`public/videos/projects/`、`public/files/`。

### 学习 `src/content/learning/`（4 篇）

| slug | 标题 | 分类 | 与项目关系 |
|------|------|------|------------|
| `prompt-json-constraints` | Prompt 工程中的 JSON 强约束实践 | AI产品 | 互动叙事 / LLM 结构化输出 |
| `ai-game-mechanics` | AI 互动游戏的产品机制思考 | AI游戏 | 穗潮湾、摸鱼海湾等机制拆解 |
| `game-art-ai-and-genres` | 游戏美术 AI 与玩法类型笔记 | AI游戏 | 美术 AI 三栏、玩法分类、核心循环、市场组合 |
| `ai-film-industry` | AI 时代影视工业的变革 | AIGC | 虚拟制片、3DGS、世界模型与游戏场景启示 |

### 随笔 `src/content/notes/`（3 篇）

| slug | 标题 | 分类 | 说明 |
|------|------|------|------|
| `photography` | 摄影 · 个人笔记 | 摄影 | 专栏 hub，外链小红书主页 |
| `photography/window-light` | 窗边的光 | 摄影 | 首篇示例，详情页链小红书（可替换为单篇 URL） |
| `how-this-site-works` | 这个网站是怎么运作的 | 站点 | Astro 静态站与内容发布流程 |

列表页按 `category` 分组（摄影 → 站点），摄影区块顶部有「查看小红书主页」按钮。分组逻辑见 `src/lib/notes.ts`。

---

## 页面与路由一览

| 路径 | 文件 | 说明 |
|------|------|------|
| `/` | `src/pages/index.astro` | 首页 |
| `/about` | `src/pages/about.astro` | 简介（联系方式在此改） |
| `/projects` | `src/pages/projects/index.astro` | 项目列表 |
| `/projects/[slug]` | `src/pages/projects/[...slug].astro` | 项目详情（自动生成） |
| `/learning` | `src/pages/learning/index.astro` | 学习列表 |
| `/learning/[slug]` | `src/pages/learning/[...slug].astro` | 笔记详情 |
| `/notes` | `src/pages/notes/index.astro` | 随笔列表 |
| `/notes/[slug]` | `src/pages/notes/[...slug].astro` | 随笔详情 |

详情页共用 `src/layouts/ArticleLayout.astro`；列表/静态页用 `PageLayout.astro`。

---

## 设计系统（改样式时参考）

定义在 `src/styles/global.css` 的 `@theme`：

| 变量 | 用途 | 当前值 |
|------|------|--------|
| `--color-bg` | 背景 | `#0a0a0b` |
| `--color-surface` | 卡片背景 | `#141416` |
| `--color-text` | 主文字 | `#e8e6e3` |
| `--color-muted` | 次要文字 | `#9a9690` |
| `--color-accent` | 强调色 | `#d4a574` |
| `--font-serif` | 标题字体 | Noto Serif SC |
| `--font-sans` | 正文字体 | Inter / 系统 sans |

正文区域使用 `.prose-content`：段落约 `max-w-3xl`；**Markdown 表格**全宽、`table-layout: fixed` 均分列，带边框与行 hover（见 `global.css`）。

---

## 发布流程（日常）

与上文「快速本地开始 → 日常编辑流程」相同，拆开写便于单独复制：

```bash
cd personal-site
npm run dev          # 本地预览 http://localhost:4321
# 编辑 src/content/learning|projects|notes/*.md
git add . && git commit -m "content: 新增 xxx 项目说明" && git push
```

- 推送到 `main` 后，GitHub Actions 自动：`npm ci` → `npm run build` → 上传到 Cloudflare
- 约 1～2 分钟后线上更新
- 查看部署状态：https://github.com/lys11111/My-Personal-Site/actions

**不需要**在每台设备上配置 Cloudflare；Secrets 已在 GitHub 仓库里配好一次即可。

手动重跑部署：GitHub → Actions → Deploy to Cloudflare Pages → Run workflow。

---

## 重要约束与踩坑（必读）

1. **Content 配置路径**  
   Astro 6 使用 `src/content.config.ts`，**不是** `src/content/config.ts`。改 schema 只改根下这个文件。

2. **每个 collection 必须有 `loader`**  
   本项目用 `glob` loader 扫描 `src/content/learning` 等目录。

3. **Cloudflare 项目名**  
   固定为 `lys11111-personal-site`（`wrangler.toml` + workflow 里一致）。  
   不要用 `my-personal-site`，该 pages.dev 子域已被他人占用。

4. **frontmatter 必须符合 schema**  
   缺字段或类型错误会导致 `npm run build` 失败；本地 `npm run dev` 也可能报错。

5. **`dist/` 和 `node_modules/` 不要提交**  
   已在 `.gitignore` 中。

6. **关于页联系方式**  
   邮箱与电话见 `src/pages/about.astro`；简历 PDF 可放 `public/resume.pdf`。

---

## 关联工作区（内容素材来源）

本站 Markdown 摘要来自工作区其他项目，**代码并不都在本仓库内**：

| 网站项目 slug | 本地素材路径（工作区相对路径） |
|---------------|-------------------------------|
| shiki-desktop-pet | `../桌宠开发-shiki/` |
| aifit-mobile | `../AI项目与简历整理/AI健身/AI健身app/aifit-mobile-app/` |
| liangxiangzhi | `../AI项目与简历整理/AI面相识别与卦算 两相知/liangxiangzhi-prototype-main/` |
| emovision-glasses | `../AI项目与简历整理/南克松S2闺蜜眼镜项目/` |
| auto-short-drama | `../AIGC工作流辅助/auto-short-drama/` |
| idle-cove | `../AI项目与简历整理/AI 游戏相关/个人复刻摸金小游戏 摸鱼海湾/` |
| tidegrain-bay | `../AI项目与简历整理/AI 游戏相关/AI+抖音游戏  穗潮湾/` |
| 学习笔记素材 | `../AI项目与简历整理/`、`../AI 游戏相关/` 等 |

简历相关文件在 `../AI项目/00-简历与求职/`（与本站分离，不自动同步）。

---

## 文档索引

| 文档 | 内容 |
|------|------|
| **本文** `PROJECT_CONTEXT.md` | 跨设备快速上手；**第一节「快速本地开始」**为环境 + 路径速查 |
| `README.md` | 精简版使用说明 |
| `DEPLOY.md` | Cloudflare / Secrets / 部署故障排查 |
| `docs/建站与部署全记录.md` | 从零建站与部署的完整过程、原理、踩坑 |
| `docs/原型demo自动化.md` | Web/H5 原型录屏工具（`prototype-demo-toolkit/`，不随 Pages 部署） |

---

## 给 AI / 新协作者的提示

若在本项目中继续开发，请优先：

1. **内容变更** → 只改 `src/content/**/*.md`，保持 frontmatter 与 `src/content.config.ts` 一致；新项目会自动进导航下拉  
2. **H5/竖屏项目** → `listLayout: split` + `cover` 指向 `public/images/projects/`  
3. **UI 小改** → 改对应 `.astro` 组件，风格跟随 `global.css` 现有 token；导航下拉改 `Navbar.astro` / `NavDropdown.astro`  
4. **不要**引入数据库、CMS、或 Next.js 式 API 路由，除非明确要求  
5. **不要**改 Cloudflare 项目名或 GitHub Secrets 名称，除非同步改 workflow + wrangler  
6. 改完运行 `npm run build` 确认通过再 push（`main` → Actions 自动部署 Cloudflare）  
7. 部署细节见 `DEPLOY.md`，历史背景见 `docs/建站与部署全记录.md`

---

## 环境要求速查

| 依赖 | 版本 |
|------|------|
| Node.js | >= 22.12（`.node-version` 为 22） |
| 包管理 | npm（有 `package-lock.json`，CI 用 `npm ci`） |
| Git 远程 | `git@github.com:lys11111/My-Personal-Site.git` |
| 分支 | `main`（生产部署分支） |

---

*在新设备打开项目时，先读上文「快速本地开始」→ `npm install && npm run dev` 即可编辑。*
