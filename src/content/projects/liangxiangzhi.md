---
title: "两相知 · AI 文创关系签"
description: "古籍仪式感 × 本地面相取象 × 关系合参，面向抖音挂载场景的 H5 可演示原型"
date: 2025-08-20
status: "demo"
tags: ["H5", "AIGC", "Hackathon"]
cover: "/images/projects/liangxiangzhi-cover.png"
repoUrl: "https://github.com/Valeera723/liangxiangzhi-prototype"
featured: true
techStack: ["H5", "Canvas", "DeepSeek", "Face Mesh"]
listLayout: split
draft: false
---

## 一句话定位

面向抖音情感、职场挂载场景的「古籍仪式感 × 可分享合拍签」轻产品——**不算命、不颜值打分、不替用户决定分合**。

> 页顶为 H5 启卷页完整截图。在线 Demo 待后续部署；本地预览见文末命令。

## 更多界面

![交互流程](/images/projects/liangxiangzhi-screenshot-intro.png)

## 核心链路

1. **启卷竖排引文** — 把上传照片做成翻卷仪式
2. **双相取点台** — 面部点阵 + 三庭线 + AI 复核镜（≥9s 过程感）
3. **双相小记** — 测量分值与古法术语并排展示
4. **问诊合参** — 6 类关系锚点 × FBTI 14 种温和面相人格
5. **合拍签分享卡** — 破冰话 + 三日小任务，可截图传播

## 合规差异化

- 本地面相取象，非云端颜值评分
- 用「势能 72–92」代替命中注定表述
- 不写相克、克夫、必须分手等敏感措辞

## 链接与下载

- **GitHub**：[Valeera723/liangxiangzhi-prototype](https://github.com/Valeera723/liangxiangzhi-prototype)
- **产品方案**：[下载 PRD（Markdown）](/files/liangxiangzhi-prd.md)
- **生成逻辑手册**：[下载 generation-playbook](/files/liangxiangzhi-generation-playbook.md)

## 产出物

- PRD + 生成逻辑手册（generation-playbook）
- H5 静态可演示原型
- 黑客松答辩一页纸素材

## 本地预览

```bash
cd liangxiangzhi-prototype-main
npx serve -l 5173
# 打开 http://127.0.0.1:5173/prototype/index.html
```
