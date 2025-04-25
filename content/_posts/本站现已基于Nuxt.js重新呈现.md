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

😅 某WP创始人一边喊着「开源自由」大旗，一边把用户反馈当废纸狂删帖，插件生态搞成代码屎山还硬塞Gutenberg这种反人类设计 \[][\[#1\]](https://wptea.com/wordpress-has-blocked-you/)

## Hexo呢

没有WebUI是我最难受的一点

## 为什么使用Nuxt.js

Nuxt/Content 可以无缝接入 [](/)[nuxt.studio](https://nuxt.studio/)，可以当成CMS来用。

我最喜欢的一点其实是 MDC（MarkDown Components）支持，可以直接在MarkDown直接调用Vue组件

像现在首页实际上是通过MarkDown调用组件来渲染的。

```md
::block{:theme="none" :title="最近"}
  :::posts{:limit='1' :theme="style1"}
  :::
::
```

未完待续....
