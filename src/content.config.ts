import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const learning = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learning' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(['demo', 'prototype', 'archived']).default('prototype'),
    tags: z.array(z.string()).default([]),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    cover: z.string().optional(),
    /** 详情页头图区可播放视频（列表页仍用 cover 静图） */
    coverVideo: z.string().optional(),
    featured: z.boolean().default(false),
    techStack: z.array(z.string()).default([]),
    /** android = 安卓端；web = Web 端（含 H5、桌面 Web、Electron 等） */
    platform: z.enum(['android', 'web']).default('web'),
    /** stack = 上图下文（Web/桌面宽屏）；split = 左图右文（移动/H5 竖屏原型） */
    listLayout: z.enum(['stack', 'split']).default('stack'),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** 随笔分类大标签，如「摄影」「站点」 */
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** 站外链接（专栏页可填小红书主页，单篇填对应笔记） */
    externalUrl: z.string().url().optional(),
    /** 外链按钮文案，默认「在小红书查看」 */
    externalLabel: z.string().optional(),
    /** 详情页底部显示 Giscus 留言板 */
    guestbook: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { learning, projects, notes };
