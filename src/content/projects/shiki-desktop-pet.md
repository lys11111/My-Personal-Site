---
title: "Shiki 桌宠 Agent"
description: "Windows 桌面宠物 + LLM 对话，支持角色包生成与 Atlas 动画渲染"
date: 2025-12-01
status: "prototype"
tags: ["Electron", "AI Agent", "Desktop"]
featured: true
techStack: ["Electron", "Vite", "React", "Python", "FastAPI"]
draft: false
---

## 项目简介

Shiki 是一款面向 Windows 的桌面宠物 Agent：前端用 Electron 承载透明窗口与宠物动画，后端用 FastAPI 提供对话、搜索与角色包（Character Pack）管理能力。

## 核心能力

- **桌面宠物渲染**：基于 Atlas 精灵图的多状态动画（idle、walk、run 等）
- **LLM 对话**：可配置模型 Provider，支持流式回复
- **角色孵化（Hatch Pet）**：通过图像生成管线创建新宠物外观与动画包
- **本地运行时**：SQLite 存储设置与生成记录，支持离线调试

## 技术架构

```
Electron (React UI)
    ↕ HTTP
FastAPI (Python)
    ↕
SQLite + 本地文件 (角色包 / 生成资源)
```

## 我在其中的工作

- 搭建 Electron + Vite + Python 双进程开发环境
- 设计角色包 manifest 契约与动画预览管线
- 实现对话、设置、Bootstrap 等 API 路由

## 本地运行

```bash
cd 桌宠开发-shiki
npm install
npm run dev
```

> 需要配置 LLM API Key，详见项目 `docs/` 目录。
