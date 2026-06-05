---
title: "这个网站是怎么运作的"
description: "个人展示站的技术选型与内容发布流程说明"
date: 2026-05-29
category: "站点"
tags: ["Meta", "Astro"]
draft: false
---

## 为什么做这个站

简历只有一页，装不下每个项目的细节、Demo 和学习笔记。这个站是简历的「补充说明书」——给面试官和合作方一个可以深入了解的入口。

## 技术栈

- **Astro 6** — 静态站点生成，Markdown 原生支持
- **Tailwind CSS 4** — 样式
- **Content Collections** — frontmatter 类型校验
- **Cloudflare Pages** — 免费托管 + 全球 CDN

## 怎么发内容

1. 在 `src/content/` 下新建 `.md` 文件
2. 填写 frontmatter（标题、日期、标签等）
3. `npm run dev` 本地预览
4. `git push` 自动部署

设置 `draft: true` 可以本地预览但不发布。
