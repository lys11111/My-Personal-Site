# personal-site

龙文广的个人展示网站 — 学习笔记、Vibe Coding 项目与简历补充内容。

> **跨设备 / 新环境上手**：请先阅读 [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md)（含 **项目总览** 与快速本地开始）  
> **完整建站与部署记录**：见 [`docs/建站与部署全记录.md`](./docs/建站与部署全记录.md)  
> **原型 Demo 录屏**：见 [`docs/原型demo自动化.md`](./docs/原型demo自动化.md)

## 当前项目（7）

| 分区 | 项目 | 要点 |
|------|------|------|
| 安卓端 | EmoVision · 闺蜜眼镜 | 穿戴 + 情绪识别；详情页可播宣传视频 |
| 安卓端 | AIFIT · AI 健身 App | 姿态识别移动端原型；[GitHub](https://github.com/lys11111/AI-Fit) |
| 安卓端 | Tidegrain Bay · 穗潮湾 | 陀螺仪 H5 轻经营；详情页 Demo 视频 |
| 安卓端 | Idle Cove · 摸鱼海湾 | 单文件 Canvas 钩钓；详情页 Demo 视频 |
| 安卓端 | Liangxiangzhi · 两相知 | H5 文创关系签 |
| Web 端 | Shiki · 桌宠 Agent | Electron + LLM 桌宠 |
| Web 端 | Auto Short Drama · 短剧创作工作台 | 对话式 AIGC 短剧三阶段 Skill |

学习笔记 4 篇、随笔 4 篇。完整 slug / 媒体 / 本地路径见 [`PROJECT_CONTEXT.md` — 项目总览](./PROJECT_CONTEXT.md#项目总览2026-05-31)。

## 日常流程

在 vibe coding 工作区根目录下（已克隆本仓库则跳过 `cd`）：

```bash
cd personal-site
npm run dev          # 本地预览 http://localhost:4321
# 编辑 src/content/learning|projects|notes/*.md
git add . && git commit -m "content: 描述" && git push   # 推送到 main 后自动部署
```

首次在本机需先 `npm install`。线上地址：https://lys11111-personal-site.pages.dev

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:4321

## 构建

```bash
npm run build
npm run preview
```

## 发布内容

### 新增学习笔记

在 `src/content/learning/` 创建 `.md` 文件：

```yaml
---
title: "文章标题"
description: "一句话摘要"
date: 2026-05-29
category: "AI产品"
tags: ["Prompt"]
featured: false
draft: false
---
```

### 新增项目

在 `src/content/projects/` 创建 `.md` 文件：

```yaml
---
title: "English Name · 中文名"
description: "一句话描述"
date: 2026-05-29
status: "prototype"   # demo | prototype | archived
tags: ["React"]
platform: "web"       # android | web — 列表页分组
listLayout: "stack"   # stack | split（列表页按 platform 分区覆盖）
cover: "/images/projects/xxx-cover.png"
coverVideo: "/videos/projects/xxx-demo.mp4"  # 可选，详情页头图视频
demoUrl: "https://..."   # 可选
repoUrl: "https://github.com/..."   # 可选
featured: true
techStack: ["React", "TypeScript"]
draft: false
---
```

新增 slug 后还需写入 [`src/lib/projects.ts`](./src/lib/projects.ts) 对应 `androidProjectIds` / `webProjectIds`。

### 封面截图

```bash
node scripts/capture-project-screenshots.mjs   # AIFIT / 两相知 / Shiki
node scripts/capture-auto-short-drama.mjs      # 短剧工作台
```

需 [`prototype-demo-toolkit`](./prototype-demo-toolkit) 内 Playwright（`npm install` + `npx playwright install chromium`）。

### 草稿模式

设置 `draft: true` 可在本地 `npm run dev` 预览，但 `npm run build` 时不会发布。

### 图片 / 视频 / 文件

- 静图：`public/images/projects/` → frontmatter `cover` 或正文 `![...](/images/...)`
- 详情页视频：`public/videos/projects/` → frontmatter `coverVideo`（列表仍用 `cover` 作 poster）
- 下载：`public/files/`

完整说明见 **[PROJECT_CONTEXT.md — 放置图片、视频、文件与外链](./PROJECT_CONTEXT.md#放置图片视频文件与外链)**。

## Cloudflare Pages 部署

已配置 GitHub Actions 自动部署。完整步骤见 **[DEPLOY.md](./DEPLOY.md)**。

**快速开始：**

1. 在 Cloudflare 创建 API Token（Pages Edit 权限）
2. 在 GitHub 仓库 Settings → Secrets 添加：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. 推送代码到 `main`，Actions 会自动部署

部署成功后访问：**https://lys11111-personal-site.pages.dev**

## 目录结构

```
src/
├── content/          # Markdown 内容
│   ├── learning/     # 学习笔记（4）
│   ├── projects/     # 项目展示（7）
│   └── notes/        # 随笔（3，含摄影专栏）
├── components/       # UI 组件
├── layouts/          # 页面布局（ArticleLayout 支持 coverVideo）
├── pages/            # 路由页面
├── lib/              # content.ts、projects.ts、badges.ts
└── styles/           # 全局样式（含 prose 表格全宽）
public/
├── images/projects/
└── videos/projects/
scripts/              # Playwright 封面截图
prototype-demo-toolkit/  # 原型 Demo 录屏（可选）
docs/                 # 建站记录、原型 demo 自动化说明
```
