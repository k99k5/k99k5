---
title: 本站现已基于Nuxt.js重新呈现
status: publish
description: 前段时间被WordPress整得够呛😤，本来想着换成Hexo能清净点，结果折腾半天反而更暴躁。
tags:
  - 技术
  - 说说
---

前段时间被WordPress整得够呛😅，本来想着换成Hexo能清净点，结果折腾半天反而更暴躁。

## 为什么不使用WordPress

😅 某WP创始人一边喊着「开源自由」大旗，一边把用户反馈当废纸狂删帖，插件生态搞成代码屎山还硬塞Gutenberg这种反人类设计 [\[#1\]](https://wptea.com/wordpress-has-blocked-you/)

## Hexo呢

没有WebUI是我最难受的一点

## 为什么使用Nuxt.js

Nuxt/Content 可以无缝接入 [](/)[nuxt.studio](https://nuxt.studio/)，可以当成CMS来用。

我最喜欢的一点其实是 MDC（MarkDown Components）支持，可以直接在MarkDown直接调用Vue组件

像现在首页实际上是通过MarkDown调用组件来渲染的。

```md
::block{:theme="none" :title="最近"}
  :::posts{:limit="1" :theme="style1"}
  :::
::
```

---

## 按照Hexo习惯写了一个模板

1. git clone [k99k5/Nuxt-Echo-Theme](https://github.com/k99k5/Nuxt-Echo-Theme/)
2. 迁移文章到 `/content/_posts`
3. 更新 `echo.config.ts` 的配置信息
   ```ts [echo.config.ts]
   export default {
       siteUrl: 'https://tigerkk.me/',
       siteLang: 'zh-CN',
       siteName: 'TigerKK',
       siteIcon: 'https://gravatar.com/avatar/1f950bb98467b977c546a3acd0f4b6df?size=256',
       siteDescription: 'TigerKK的博客',

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
4. `pnpm generate` 即可
5. `nuxt.studio` 关联上项目即可直接发文章

## 特性

- 支持使用Git时间作为创建/修改时间
- \_posts目录下的md将视为文章，会显示在archive中
- 除此之外将视为页面
- layout目前支持archive/about
- navigation是否显示在导航栏中
- 名称前序号为排序

```md [content/2.about.md]
  ---
  title: 关于我
  description: 关于我
  layout: about
  navigation: true
  ---
```

## 未完待续...
