---
title: "Auto Short Drama · 短剧创作工作台"
description: "对话式 AIGC 短剧工作区 — 从故事方向、场景拓展到分镜拆解的三阶段创作流"
date: 2026-05-04
status: "prototype"
tags: ["AIGC", "Workflow", "LLM"]
cover: "/images/projects/auto-short-drama-cover.png"
featured: true
techStack: ["FastAPI", "React", "TypeScript", "Vite", "LLM"]
platform: "web"
listLayout: stack
draft: false
---

## 一句话定位

面向短剧创作者与 AI 辅助内容团队的 **对话式创作工作台** —— 用一次 Prompt 启动工作区，在聊天中推进「故事方向 → 场景拓展 → 分镜拆解」，中间产物以结构化卡片沉淀，而不是散落在聊天记录里。

> 页顶为本地 Vite 开发界面完整截图（首页创作入口）。完整功能需同时启动 FastAPI 后端并配置 LLM。

## 更多界面

![设置页](/images/projects/auto-short-drama-screenshot-ui.png)

## 项目背景

`AIGC工作流辅助` 文件夹源于对 **短剧 / 动态漫 AIGC 生产管线** 的调研与原型验证。其中：

| 目录 | 角色 |
|------|------|
| **`auto-short-drama/`** | 已落地的 V1 可运行产品（本文档主体） |
| `全自动短剧生产/` | 端到端多 Agent 管线需求与分步实现规划 |
| `short-drama-main/` | 微短剧剧本创作 Skill 包（9 命令 + 编剧知识库） |
| `AIGC/` | 行业工具与开源方案调研报告 |

V1 先聚焦 **前段创作链路**（ ideation → scene → storyboard），为后续视频生成、资产库等模块预留工作区结构。

## 核心用户流

1. 在首页用 Prompt、文件或链接 **创建工作区**
2. 选择三项 Skill 之一：**故事方向** / **场景拓展** / **分镜拆解**
3. 在对话中继续迭代，助手输出写入工作区
4. 右侧 **Artifact 卡片** 展示方向选项与结构化产物
5. 收藏、归档或删除工作区；可 **双击编辑卡片正文** 并保存

## 三阶段 Skill

| Skill | 作用 | 典型产出 |
|-------|------|----------|
| **故事方向** | 基于想法与参考资料生成多条可推进方向 | 多方向选项 + 摘要卡片 |
| **场景拓展** | 将选定方向扩展为关键场景组 | 场景包、情绪与细节补全 |
| **分镜拆解** | 输出适合视频生成的分镜表 | Markdown 分镜 + Prompt 草稿 |

用户可在首页与工作区页 **主动切换 Skill**，而非固定流水线；附件上下文可注入生成（设置页可开关）。

## 产品亮点

- **Chat-first**：以对话为入口，降低「从 0 写剧本」的心理门槛
- **结构化沉淀**：方向（Direction）+ 产物卡片（Artifact Card）双轨存储，便于对比与选用
- **本地持久化**：工作区、消息、附件元数据存于 `backend/data/`，无需云端账号即可完整跑通
- **可配置 LLM**：Provider、Base URL、API Key、模型名及三阶段 bias 均可在设置页调整
- **工作区管理**：进行中 / 收藏 / 归档分组列表

## 技术架构

```
frontend/ (React 18 + TS + Vite + React Router)
    ↕ REST API
backend/ (FastAPI + Pydantic + 本地 JSON 存储)
    ↕
LLM Provider（OpenAI 兼容接口）
```

| 层 | 技术 |
|----|------|
| 前端 | React 18、TypeScript、Vite、Lucide 图标 |
| 后端 | FastAPI、Pydantic、本地 JSON + 附件目录 |
| 推理 | 可配置 OpenAI 兼容 API（`llm.py` 分 Skill 构建 Prompt） |
| 持久化 | `backend/data/workspaces/`、`settings.json` |

业务逻辑集中在 `services.py`；前端 API 类型统一在 `api.ts`。

## V1 范围与边界

**已实现**

- 工作区 CRUD、收藏、归档
- 三 Skill 端到端生成与对话续写
- 附件上传、链接引用、上下文注入
- 右侧卡片复制、内联编辑、删除
- 设置页（仅暴露当前生效项）

**V1 明确不做**

- 多用户协作、鉴权、云存储
- 版本历史、全局搜索、卡片拖拽排序
- 全类型附件深度解析（PDF/DOCX 增强解析在路线图）

## 本地预览

### 后端

```bash
cd auto-short-drama/backend
pip install -r requirements.txt
# 复制 .env.example → .env，填入 Provider 配置
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 前端

```bash
cd auto-short-drama/frontend
npm install
npm run dev
# 默认 http://127.0.0.1:4173
```

凭证放在 `backend/.env`，勿提交；工作区与上传文件为本地运行时数据。

## 相关文档

工作区路径：`AIGC工作流辅助/auto-short-drama/`

| 文档 | 说明 |
|------|------|
| `README.md` | 项目总览与目录结构 |
| `docs/V1_REQUIREMENTS.md` | V1 功能需求与验收标准 |
| `docs/IMPLEMENTATION_PATH.md` | 架构决策与后续迭代顺序 |

同级参考：

- `全自动短剧生产/需求文档.md` — 全链路多 Agent 管线愿景
- `short-drama-main/SKILL.md` — 微短剧剧本创作 Skill（9 命令）
- `AIGC/AIGC调研报告.md` — 行业工具与开源方案调研

## 后续方向

1. 工作区 / 卡片标题内联重命名
2. PDF、DOCX 附件解析增强
3. Service 层测试与 Prompt 质量迭代
4. 对接 `全自动短剧生产` 规划中的视频生成与资产库模块

## 说明

- 本项目为本地研发原型，暂无公开 GitHub 与在线 Demo
- 封面与界面截图：`node scripts/capture-auto-short-drama.mjs`（需 `prototype-demo-toolkit` 已 `npm install`）
