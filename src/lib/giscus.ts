/**
 * Giscus 留言板配置
 * 在 https://giscus.app/zh-CN 生成 repo-id、category-id 后填入下方常量
 * 前置：GitHub 仓库开启 Discussions，并安装 https://github.com/apps/giscus
 *
 * 注意：Discussion 分类须允许「所有人可创建讨论」。
 * Announcements 通常仅维护者可发帖，建议改用 General 并在 giscus.app 重新获取 categoryId。
 */
export const GISCUS_CONFIG = {
  repo: 'lys11111/My-Personal-Site',
  repoId: 'R_kgDOSsX6mg',
  category: 'Announcements',
  categoryId: 'DIC_kwDOSsX6ms4C-jn7',
  mapping: 'specific' as const,
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top' as const,
  theme: 'light',
  lang: 'zh-CN',
};

/** 配置是否已填写完整（非占位符） */
export function isGiscusConfigured(): boolean {
  const { repoId, categoryId } = GISCUS_CONFIG;
  return (
    repoId.startsWith('R_') &&
    repoId.length >= 12 &&
    !repoId.includes('...') &&
    categoryId.startsWith('DIC_') &&
    categoryId.length >= 18 &&
    !categoryId.includes('...')
  );
}
