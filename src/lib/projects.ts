import type { CollectionEntry } from 'astro:content';

/** 与 /projects 列表页展示顺序一致 */
export const androidProjectIds = [
  'emovision-glasses',
  'aifit-mobile',
  'tidegrain-bay',
  'idle-cove',
  'liangxiangzhi',
] as const;

export const webProjectIds = ['shiki-desktop-pet', 'auto-short-drama'] as const;

export function pickProjectsByIds(
  projects: CollectionEntry<'projects'>[],
  ids: readonly string[],
): CollectionEntry<'projects'>[] {
  const projectById = new Map(projects.map((project) => [project.id, project]));
  return ids.flatMap((id) => {
    const project = projectById.get(id);
    return project ? [project] : [];
  });
}

export function getGroupedProjects(projects: CollectionEntry<'projects'>[]) {
  return {
    android: pickProjectsByIds(projects, androidProjectIds),
    web: pickProjectsByIds(projects, webProjectIds),
  };
}

export function toProjectNavItems(projects: CollectionEntry<'projects'>[]) {
  return projects.map((project) => ({ id: project.id, title: project.data.title }));
}
