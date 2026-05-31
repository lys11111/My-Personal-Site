---
title: "EmoVision · 闺蜜眼镜"
description: "南京南客松 S2 优秀作品 — Rokid AI 眼镜第一视角情绪识别 + Web 无硬件演示"
date: 2026-05-02
status: "prototype"
tags: ["AR", "Wearable", "Hackathon"]
cover: "/images/projects/emovision-cover.webp"
featured: true
techStack: ["Next.js", "Kotlin", "Rokid CXR-M", "face-api.js", "TensorFlow Lite"]
listLayout: split
draft: false
---

## 一句话定位

面向社交焦虑场景（恋爱 / 职场）的 **「闺中密友 · 情商助手」** —— 通过 AI 眼镜第一视角看见对方情绪，以 AR 叠加即时反馈，而不是单纯的相机或识别工具。

> 页顶为赛期易拉宝海报完整截图。南京南客松 S2 **优秀作品**；Web 端 `/camera` 可无硬件体验 7 类情绪识别。

## 项目背景

EmoVision（内部代号 **闺蜜眼镜**）基于 **Rokid 乐奇 AI 眼镜** 与 **Insta360 X5 全景相机** 的双硬件设想，构建第一视角的情绪感知系统。产品从 0 到 1 完成：

- 问卷调研 **N=100** + 社媒次级调研，锚定用户 Persona
- **「感知 → 理解 → 建议」** 三层功能架构
- MVP 裁剪为 **7 类情绪识别 + AR 即时反馈** 最小闭环
- 沉淀 **2 万+字** PRD、开发流程与架构文档

## 双端架构

```
┌─────────────────────────┬──────────────────────────────┐
│  Web（emotion-web）      │  Android（emotion-mvp）       │
│  产品展示 + 无硬件体验   │  眼镜连接 → 采集 → 推理 → AR  │
│  face-api.js 浏览器推理  │  Rokid CXR-M SDK + Camera2   │
└─────────────────────────┴──────────────────────────────┘
```

| 端 | 目录 | 已实现 | 规划中 |
|----|------|--------|--------|
| **Web** | `emotion-web/` | Apple 风格产品页、`/camera` 实时 7 类情绪识别、静态导出部署 | WebGPU 加速、与 Android 端 WebSocket 互通 |
| **Android** | `emotion-mvp/` | BLE 扫描、Rokid SDK 连接框架、Camera2 采集、工作流编排 | TFLite 端侧推理、AR 文字叠加、Insta360 接入 |

## 核心链路

### Web 端（已上线体验）

1. 用户访问 `/camera`，授权浏览器摄像头
2. **face-api.js** 加载 TinyFaceDetector + faceExpressionNet（CDN 按需，约 5MB）
3. 实时检测人脸，输出 7 类情绪（平静、开心、悲伤、愤怒、恐惧、厌恶、惊讶）
4. Canvas 叠加边界框、情绪标签与置信度条 —— **全程本地推理，不上传服务器**

### Android 端（MVP 框架）

```
CxrConnectionManager 连接眼镜
    → GlassesCameraManager 采集图像
    → EmotionRecognitionEngine 情绪识别（TFLite 待集成）
    → AROverlayManager AR 叠加反馈（待完善）
```

## 产品亮点

- **无硬件也能演示**：Web 端 face-api.js 让评委与访客无需眼镜即可体验核心交互
- **端云分离思路**：硬件负责采集与 AR 呈现，推理可端侧（TFLite）或浏览器（TensorFlow.js），预留 RAG 话术与决策引擎扩展
- **模块化工程**：Android 各层（蓝牙 / 相机 / 推理 / AR）构造函数注入解耦，便于迭代
- **三阶段路线图**：识别 → 场景理解 → 策略建议，范围冻结后按里程碑推进

## 技术栈

| 层 | Web 端 | Android 端 |
|----|--------|-----------|
| 框架 | Next.js 16 + React 19 + TypeScript | Kotlin + Jetpack Compose |
| 样式 / UI | Tailwind CSS v4 + Framer Motion | Material Design 3 |
| AI 推理 | face-api.js（浏览器端，✅） | TensorFlow Lite + BlazeFace / EmotionNet（🔄 待集成） |
| 硬件 SDK | — | Rokid CXR-M SDK（BLE + AR `sendStream`） |
| 摄像头 | MediaDevices API | Camera2 API |

## 文档与产出

工作区路径：`AI项目与简历整理/南克松S2闺蜜眼镜项目/南京南客松S2/`

| 文档 | 说明 |
|------|------|
| `README.md` | 项目总览与快速开始 |
| `开发流程.md` | 业务模块、时序、里程碑与风险 |
| `开发文档.md` | SDK 配置、face-api 集成、Maven 依赖 |
| `emotion-web/README.md` | Web 端设计与部署 |
| `emotion-mvp/README.md` | Android MVP 模块说明 |

## 本地预览

### Web 演示站

```bash
cd 南京南客松S2/emotion-web
npm install
npm run dev
# 首页 http://localhost:3000
# 摄像头体验 http://localhost:3000/camera
```

### Android MVP

```bash
cd 南京南客松S2/emotion-mvp
# Android Studio 打开，连接手机 + Rokid 眼镜（可选）
./gradlew installDebug
```

## 说明

- **RAG 社交知识库、Insta360 全景融合、宠物识别** 等为扩展路线，赛期 MVP 以情绪识别闭环为主
- 本项目为赛事/内部研发产出，暂无公开 GitHub 与在线 Demo
