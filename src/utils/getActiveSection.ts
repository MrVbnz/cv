import { sectionIds, type SectionId } from '../data/types';

export function getActiveSection(): SectionId {
  // Activate a section as its top enters the upper part of the viewport.
  const activationLine = Math.min(window.innerHeight * 0.3, 200);
  let active: SectionId = 'about';
  for (const id of sectionIds) {
    if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= activationLine)
      active = id;
  }
  // The final section may not reach the activation line before scrolling ends.
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2)
    active = 'interests';
  return active;
}
