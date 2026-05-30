---
title: "AIFIT · AI 健身 App"
description: "基于姿态识别的移动端健身原型，含课程、打卡与进度追踪"
date: 2025-10-15
status: "prototype"
tags: ["React", "Mobile", "Computer Vision"]
featured: true
techStack: ["React", "Vite", "Tailwind", "Radix UI", "MediaPipe"]
draft: false
---

## 项目简介

AIFIT 是一款 AI 健身移动 App 原型，聚焦「动作识别 + 训练反馈」的体验闭环。前端采用 React + Tailwind 构建移动端 UI，姿态检测实验基于 MediaPipe。

## 产品亮点

- **移动端优先**：Mobile Frame 组件模拟真机视口，路由覆盖首页、训练、进度等核心页面
- **设计系统**：独立 design tokens 与组件库，支持快速迭代原型
- **姿态实验**：`mediapipe_frame.ipynb` 验证关键点检测可行性

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | React 19 + Vite + React Router |
| UI | Tailwind CSS 4 + Radix UI + Motion |
| CV 实验 | MediaPipe Pose |

## 相关文档

工作区路径：`AI项目/AI健身/AI健身app/aifit-mobile-app/`

- `docs/project-context.md` — 项目背景
- `docs/design-tokens.md` — 设计规范
- `docs/prototype-route-audit.md` — 路由审计
