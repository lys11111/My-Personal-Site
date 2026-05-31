# personal-site

龙文广的个人展示网站 — 学习笔记、Vibe Coding 项目与简历补充内容。

> **跨设备 / 新环境上手**：请先阅读 [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) 的 **「快速本地开始」** 一节  
> **完整建站与部署记录**：见 [`docs/建站与部署全记录.md`](./docs/建站与部署全记录.md)

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
title: "项目名称"
description: "一句话描述"
date: 2026-05-29
status: "prototype"   # demo | prototype | archived
tags: ["React"]
demoUrl: "https://..."   # 可选
repoUrl: "https://github.com/..."   # 可选
featured: true
techStack: ["React", "TypeScript"]
draft: false
---
```

### 草稿模式

设置 `draft: true` 可在本地 `npm run dev` 预览，但 `npm run build` 时不会发布。

### 图片 / 视频 / 文件

静态资源放 `public/images/`、`public/videos/`、`public/files/`，在 Markdown 正文引用（如 `![说明](/images/xxx.png)`）。项目页还可在 frontmatter 填 `demoUrl` / `repoUrl` 显示顶部按钮。完整说明见 **[PROJECT_CONTEXT.md — 放置图片、视频、文件与外链](./PROJECT_CONTEXT.md#放置图片视频文件与外链)**。

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
│   ├── learning/     # 学习笔记
│   ├── projects/     # 项目展示
│   └── notes/        # 随笔
├── components/       # UI 组件
├── layouts/          # 页面布局
├── pages/            # 路由页面
└── styles/           # 全局样式
```
