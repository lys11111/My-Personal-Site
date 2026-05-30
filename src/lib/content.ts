export function isPublished(draft: boolean): boolean {
  return import.meta.env.PROD ? !draft : true;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
