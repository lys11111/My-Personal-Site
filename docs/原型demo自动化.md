# 原型 Demo 自动化

> **定位**：为工作区内的 Web/H5 原型自动启动环境、按剧本操作浏览器并录屏，产出 MP4。  
> **仓库位置**：与本站同仓，目录 [`prototype-demo-toolkit/`](../prototype-demo-toolkit/)。不自动写入 `src/content` 或 `public/videos/`；需要展示时请手动拷贝视频或上传外链。

**最后更新**：2026-05-31

---

## 1. 能做什么 / 不能做什么

| 能做 | 不能做 |
|------|--------|
| 本地 `npm run dev` / 静态 `serve` 后自动打开页面 | 零配置猜测点击位置（必须有 manifest `steps`） |
| 按 YAML 剧本：跳转、等待、点击、按键 | Electron 桌面窗口、Android 原生界面全自动 |
| 输出 `output/demos/*.mp4`（或 ffmpeg 失败时保留 WebM） | 自动写入项目 Markdown / `public/videos/` |
| 覆盖在线 URL（`--url` 或 manifest `url-only`） | 带真实摄像头/登录的完整流程（常需 mock 或手工录） |

---

## 2. 目录结构（本仓库内）

```text
personal-site/
├── docs/
│   └── 原型demo自动化.md          ← 本文
├── prototype-demo-toolkit/
│   ├── package.json
│   ├── demo-manifests/
│   ├── scripts/
│   └── output/demos/              ← 已 gitignore
├── scripts/capture-project-screenshots.mjs   ← 静态截图（另线）
└── src/ ...
```

---

## 3. 前置环境

| 依赖 | 要求 |
|------|------|
| Node.js | >= 22.12 |
| Chromium | `cd prototype-demo-toolkit && npx playwright install chromium` |
| ffmpeg | `npm install` 已含 `ffmpeg-static`；也可使用系统 PATH 中的 ffmpeg |

---

## 4. 快速开始

```bash
cd prototype-demo-toolkit
npm install
npx playwright install chromium

npm run demo:record -- liangxiangzhi
npm run demo:record -- aifit-mobile
npm run demo:record -- idle-cove

npm run demo:record -- liangxiangzhi --url https://你的域名/prototype/index.html
```

成品：`prototype-demo-toolkit/output/demos/<name>.mp4`。

**已验证**：`liangxiangzhi` → `liangxiangzhi-demo.mp4`（约 4s、390×844）。

---

## 5. 你需要提供什么

1. **本地原型路径**（相对 toolkit 的 `../...`，指向工作区兄弟目录）  
2. **3～5 步演示路径**：写在 `demo-manifests/<slug>.yaml` 的 `steps`  
3. 用 Codegen 辅助写 selector：`npm run demo:codegen -- <url>`

---

## 6. Manifest 规范

见 `prototype-demo-toolkit/demo-manifests/` 内示例；支持 `startup.type`：`npm-dev` | `static-serve` | `url-only`；`steps` 支持 `goto` / `wait` / `click` / `fill` / `press` / `screenshot`。

---

## 7. 试点项目

| slug | 说明 |
|------|------|
| `liangxiangzhi` | 静态 serve，启卷页 |
| `aifit-mobile` | Vite，首页→home→training |
| `idle-cove` | 单页 H5，canvas + 空格 |

本地路径见各 YAML 的 `cwd`；工作区对照表见 [`PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md)「关联工作区」。

---

## 8. 与个人站 / Cloudflare 的关系

- **GitHub**：toolkit 随本仓 push，与站点源码一并备份。  
- **Cloudflare Pages**：仅部署 `npm run build` 的 `dist/`，**不会**上传 toolkit 或 `output/demos/`。  
- 若要在项目页播视频：手动放入 `public/videos/`，在 `src/content/projects/*.md` 中加 `<video>`。单文件建议 &lt; 15MB。

---

## 9. 故障排查

| 现象 | 处理 |
|------|------|
| `Timeout waiting for URL` | 检查 `cwd`、`readyUrl`、原型项目是否已 `npm install` |
| `click` 超时 | Codegen 更新 selector |
| 只有 `.webm` | toolkit 内 `npm install` 后重跑 |

---

## 10. 参考

- [Playwright Videos](https://playwright.dev/docs/videos)  
- [`PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md)
