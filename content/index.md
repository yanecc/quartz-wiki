---
title: Quartz定制说明
description: 定制化开发的Quartz
tags:
  - Quartz
---

Origin Quartz installation.
See the [documentation](https://quartz.jzhao.xyz) for how to get started.

## Steps

1. 项目拉取

``` shell
git clone https://github.com/jackyzha0/quartz.git quartz-doc
cd quartz-doc
bun install
bun --bun ./quartz/bootstrap-cli.mjs create
```

2. 配置项

在`quartz.config.ts`中配置i18N并启用换行插件`Plugin.HardLineBreaks()`

``` ts
configuration.locale = "zh-CN"
configuration.baseUrl = "docs.bamboo.cc"
```

3. 排版样式

在`quartz/styles/custom.scss`中定义有序列表、无序列表的样式，支持图片居中、靠左、靠右对齐
提供了自定义tooltip标签的样式及示例`<pink>`

4. 图片预览

在客户端提供图片预览功能，实现了左旋90°、右旋90°、全屏预览等功能，支持自适应缩放及拖动查看，适应页面亮暗设置，布局精巧美观。

脚本：`quartz/components/scripts/imagePreview.inline.ts`
css样式：`quartz/components/styles/imagePreview.scss`
在`quartz/components/Body.tsx`中引入并配置该脚本。

5. 运行与构建

输出到public目录

``` shell
bun --bun --hot ./quartz/bootstrap-cli.mjs build --serve
bun --bun ./quartz/bootstrap-cli.mjs build
cd public
# 测试生产打包
bunx serve .
```
