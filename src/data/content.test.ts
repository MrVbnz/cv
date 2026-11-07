import { describe, expect, it } from 'vitest';
import { resumes } from './index';
import { sectionIds } from './types';

describe('resume language tables', () => {
  for (const [locale, data] of Object.entries(resumes)) {
    it(`${locale}: contains every section, job and project`, () => {
      expect(Object.keys(data.ui.sections)).toEqual([...sectionIds]);
      expect(data.experience).toHaveLength(2);
      expect(data.projects.flatMap(group => group.items)).toHaveLength(7);
      for (const group of data.projects) {
        for (const project of group.items) {
          expect(project.title).not.toBe('');
          expect(project.technologies.length).toBeGreaterThan(0);
          expect(project.paragraphs.length).toBeGreaterThan(0);
        }
      }
    });
  }

  it('preserves differences between the original translations', () => {
    expect(resumes.en.skills.find(skill => skill.title === 'Unity Assets')).toBeDefined();
    expect(resumes.ru.interests).toHaveLength(4);
    expect(resumes.en.interests).toHaveLength(3);
  });
});
