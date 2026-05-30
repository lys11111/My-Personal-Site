# Cloudflare Pages 部署指南

仓库：https://github.com/lys11111/My-Personal-Site

## 方式一：GitHub Actions 自动部署（推荐，已配置）

每次推送到 `main` 分支会自动构建并部署到 Cloudflare Pages。

### 一次性设置

#### 1. 获取 Cloudflare Account ID

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入任意站点，右侧 **Account ID** 可复制  
   或：Workers & Pages → 概览页 URL 中可见 account id

#### 2. 创建 API Token

1. 打开 [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → 选择 **Edit Cloudflare Workers** 模板，或自定义权限：
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Account** → **Account Settings** → **Read**（可选，用于读取账号信息）
   - Account Resources: **Include** → 选择你的账号
3. 创建后复制 Token（只显示一次）

> 常见失败原因：`Account ID` 填错、Token 没有 Pages 权限、Cloudflare 上还没有 Pages 项目。  
> 工作流已自动尝试创建 `my-personal-site` 项目；若仍失败，请到 Dashboard → Workers & Pages → Create → Pages 手动创建同名项目。

#### 3. 添加 GitHub Secrets

打开：https://github.com/lys11111/My-Personal-Site/settings/secrets/actions

| Secret 名称 | 值 |
|-------------|-----|
| `CLOUDFLARE_API_TOKEN` | 上一步创建的 Token |
| `CLOUDFLARE_ACCOUNT_ID` | 你的 Account ID |

#### 4. 触发部署

- 推送任意 commit 到 `main`，或
- GitHub → **Actions** → **Deploy to Cloudflare Pages** → **Run workflow**

首次成功部署后，站点地址为：

**https://my-personal-site.pages.dev**

（可在 Cloudflare Dashboard → Workers & Pages → my-personal-site 中查看与绑定自定义域名）

---

## 方式二：Cloudflare 直连 GitHub（无需 GitHub Actions）

若不想使用 Actions，可删除 `.github/workflows/deploy-cloudflare-pages.yml`，改在 Dashboard 配置：

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
2. **Pages** → **Connect to Git**
3. 选择 `lys11111/My-Personal-Site`
4. 构建设置：

| 项 | 值 |
|----|-----|
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` |

5. **Save and Deploy**

> 注意：方式一与方式二二选一，同时启用会导致重复部署。

---

## 本地手动部署（可选）

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=my-personal-site
```

需要本地登录 Cloudflare：`npx wrangler login`

---

## 构建参数摘要

| 项 | 值 |
|----|-----|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 22 |
