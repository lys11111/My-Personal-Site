# personal-site

龙文广的个人展示网站 — 学习笔记、Vibe Coding 项目与简历补充内容。

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

## Cloudflare Pages 部署

1. 将本仓库推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create → Connect to Git
3. 选择仓库，配置构建设置：

| 设置项 | 值 |
|--------|-----|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` 或 `22` |

4. 保存后每次 `git push` 到主分支会自动部署

免费子域名格式：`your-project.pages.dev`

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
