export function isPublished(draft: boolean): boolean {
  return import.meta.env.PROD ? !draft : true;
}

export function sortPublishedByDate<T extends { data: { draft: boolean; date: Date } }>(
  items: T[],
): T[] {
  return items
    .filter((item) => isPublished(item.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export type ProjectPlatform = 'android' | 'web';

/** 未填写 platform 时默认归入 Web 端 */
export function getProjectPlatform(platform?: ProjectPlatform): ProjectPlatform {
  return platform === 'android' ? 'android' : 'web';
}
