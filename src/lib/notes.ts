import type { CollectionEntry } from 'astro:content';

export type NoteEntry = CollectionEntry<'notes'>;

/** 小红书主页（摄影专栏默认外链） */
export const XHS_PROFILE_URL =
  'https://www.xiaohongshu.com/user/profile/628b3dcd00000000210208e0?tab=note&subTab=note';

/** 列表页与导航下拉分类展示顺序 */
export const NOTE_CATEGORY_ORDER = ['摄影', '经济', '站点'] as const;

const UNCATEGORIZED = '未分类';

export type NoteNavItem = { id: string; title: string };
export type NoteNavGroup = { label: string; items: NoteNavItem[] };

/**
 * 按分类分组随笔，专栏 hub（如 photography）排在同分类最前
 * @param notes 已排序的随笔列表
 */
export function groupNotesByCategory(notes: NoteEntry[]): Map<string, NoteEntry[]> {
  const groups = new Map<string, NoteEntry[]>();

  for (const note of notes) {
    const category = note.data.category ?? UNCATEGORIZED;
    const list = groups.get(category) ?? [];
    list.push(note);
    groups.set(category, list);
  }

  for (const [category, list] of groups) {
    list.sort((a, b) => {
      const aHub = a.id === 'photography' || a.id.endsWith('/index');
      const bHub = b.id === 'photography' || b.id.endsWith('/index');
      if (aHub !== bHub) return aHub ? -1 : 1;
      return b.data.date.valueOf() - a.data.date.valueOf();
    });
    groups.set(category, list);
  }

  return groups;
}

/**
 * 返回分类区块的渲染顺序
 * @param groups 分组结果
 */
export function sortNoteCategories(groups: Map<string, NoteEntry[]>): string[] {
  const keys = [...groups.keys()];
  const ordered: string[] = [...NOTE_CATEGORY_ORDER];

  const rest = keys
    .filter((k) => !NOTE_CATEGORY_ORDER.includes(k as (typeof NOTE_CATEGORY_ORDER)[number]))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'));

  return [...ordered, ...rest];
}

export function toNoteNavItems(notes: NoteEntry[]): NoteNavItem[] {
  return notes.map((note) => ({ id: note.id, title: note.data.title }));
}

/**
 * 按固定分类生成分组导航（与项目下拉安卓端/Web 端模式一致）
 * @param notes 已排序的随笔列表
 */
export function getGroupedNotesForNav(notes: NoteEntry[]): NoteNavGroup[] {
  const groups = groupNotesByCategory(notes);

  return NOTE_CATEGORY_ORDER.map((label) => ({
    label,
    items: toNoteNavItems(groups.get(label) ?? []),
  }));
}

/**
 * 读取摄影专栏 hub 的小红书主页链接
 * @param notes 随笔列表
 */
export function getPhotographyProfileUrl(notes: NoteEntry[]): string {
  const hub = notes.find((n) => n.id === 'photography');
  return hub?.data.externalUrl ?? XHS_PROFILE_URL;
}
