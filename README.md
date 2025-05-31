# Nuxt-Echo-Theme - 轻量级博客模板

![Nuxt Version](https://img.shields.io/badge/Nuxt-v3.11.2-green)
![License](https://img.shields.io/badge/license-MIT-blue)

Nuxt-Echo-Theme 是一个基于 Nuxt.js 构建的轻量级博客模板，采用类似 Hexo 的目录结构和开发习惯，让您能够快速搭建个人博客网站。

## ✨ 特性

- **Hexo 风格的文件结构** - 按照熟悉的 `/content/_posts` 目录组织文章
- **Git 时间集成** - 自动使用 Git 提交时间作为文章的创建/修改时间
- **MDX 支持** - 在 Markdown 中直接使用 Vue 组件
- **响应式设计** - 适配各种屏幕尺寸
- **SEO 优化** - 自动生成站点地图和元标签
- **轻量高效** - 简洁的代码结构和高效的渲染性能
- **Nuxt Studio 集成** - 支持通过 Nuxt Studio 直接发布内容

## 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/k99k5/Nuxt-Echo-Theme.git
   cd Nuxt-Echo-Theme
   ```

2. **安装依赖**
   ```bash
   pnpm install
   # 或
   npm install
   # 或
   yarn install
   ```

3. **迁移文章**
   将您的 Markdown 文章放置在 `/content/_posts` 目录下

4. **配置博客**
   编辑 `echo.config.ts` 文件，更新您的博客信息：
   ```typescript
   export default {
     siteUrl: 'https://yourdomain.com/',
     siteLang: 'zh-CN',
     siteName: '你的博客名称',
     siteIcon: 'https://example.com/avatar.png',
     siteDescription: '博客描述',
     autoGitDate: true,
     defaultTimeZone: 'Asia/Shanghai',
     libs: {
       bsz: {
         enable: true,
         src: 'https://lib.baomitu.com/busuanzi/2.3.0/bsz.pure.mini.js',
       },
     },
     links: {
       tags: '/tags/:tag',
     },
     ui: {
       colors: {
         primary: 'sky',
       },
     },
   }
   ```

5. **运行开发服务器**
   ```bash
   pnpm dev
   ```

6. **生成静态站点**
   ```bash
   pnpm generate
   ```

## 📂 文件结构

```
├── content/
│   ├── _posts/       # 博客文章
│   ├── about.md      # 关于页面
│   └── ...           # 其他页面
├── app/
│   ├── components/       # Vue 组件
│   └── layouts/          # 页面布局
├── public/           # 静态资源
├── echo.config.ts    # 博客配置
└── nuxt.config.ts    # Nuxt 配置
```

## 📝 内容管理

### 文章规范
- 所有文章放在 `/content/_posts` 目录下
- 使用 Markdown 格式编写
- 支持 YAML frontmatter 元数据：

  ```yaml
  ---
  title: 文章标题
  date: 2023-01-01
  updated: 2023-01-02
  tags: [标签1, 标签2]
  layout: archive    # 可选布局
  navigation: true   # 是否显示在导航栏
  order: 1           # 导航排序
  ---
  ```

### 页面管理
- 非文章页面直接放在 `/content` 目录下
- 支持自定义布局（目前支持 `archive` 和 `about`）
- 文件名前的数字控制导航排序（如 `1.about.md`）

## 🧩 MDC 组件支持

在 Markdown 中直接使用 Vue 组件：

```markdown
::block{:theme="none" :title="最近"}
:::posts{:limit="1" :theme="style1"}
:::
::
```

## 🔗 Nuxt Studio 集成

1. 访问 [Nuxt Studio](https://nuxt.studio/)
2. 连接您的 GitHub 仓库
3. 直接在 Studio 界面中编写和发布文章

## 🎨 自定义主题

在 `echo.config.ts` 中修改 UI 配置：

```typescript
ui: {
    colors: {
        primary: 'sky', // 可选: sky, indigo, rose, emerald
    },
},
```

## 📦 部署

生成静态文件后，可部署到任何静态托管服务：

```bash
pnpm generate
```

生成的静态文件位于 `dist` 目录。

推荐部署平台：
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 🤝 贡献

欢迎提交 issue 和 pull request！

1. Fork 项目
2. 创建分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -am 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

**Nuxt-Echo-Theme** © 2025 - 轻量高效的博客模板，让写作更简单。
