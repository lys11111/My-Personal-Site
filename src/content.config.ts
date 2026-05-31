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
    featured: z.boolean().default(false),
    techStack: z.array(z.string()).default([]),
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
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { learning, projects, notes };
