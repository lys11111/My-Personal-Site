import type { CollectionEntry } from 'astro:content';

export type LearningEntry = CollectionEntry<'learning'>;

/** 学习列表页与导航下拉分类展示顺序 */
export const LEARNING_CATEGORY_ORDER = ['AI+行业', '实习学习', '个人思考'] as const;

export type LearningCategory = (typeof LEARNING_CATEGORY_ORDER)[number];

const UNCATEGORIZED = '未分类';

export type LearningNavItem = { id: string; title: string };
export type LearningNavGroup = { label: string; items: LearningNavItem[] };

/**
 * 按分类分组学习文章
 * @param articles 已排序的学习列表
 */
export function groupLearningByCategory(articles: LearningEntry[]): Map<string, LearningEntry[]> {
  const groups = new Map<string, LearningEntry[]>();

  for (const article of articles) {
    const category = article.data.category ?? UNCATEGORIZED;
    const list = groups.get(category) ?? [];
    list.push(article);
    groups.set(category, list);
  }

  return groups;
}

/**
 * 返回分类区块的渲染顺序
 * @param groups 分组结果
 */
export function sortLearningCategories(groups: Map<string, LearningEntry[]>): string[] {
  const keys = [...groups.keys()];
  const ordered: string[] = [...LEARNING_CATEGORY_ORDER];

  const rest = keys
    .filter((k) => !LEARNING_CATEGORY_ORDER.includes(k as LearningCategory))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'));

  return [...ordered, ...rest];
}

export function toLearningNavItems(articles: LearningEntry[]): LearningNavItem[] {
  return articles.map((article) => ({ id: article.id, title: article.data.title }));
}

/**
 * 按固定分类生成分组导航（与项目/其他下拉模式一致）
 * @param articles 已排序的学习列表
 */
export function getGroupedLearningForNav(articles: LearningEntry[]): LearningNavGroup[] {
  const groups = groupLearningByCategory(articles);

  return LEARNING_CATEGORY_ORDER.map((label) => ({
    label,
    items: toLearningNavItems(groups.get(label) ?? []),
  }));
}
