import { describe, expect, it } from 'vitest';
import { resumes } from './index';
import { localeCodes } from '../i18n/locale';

function expectUniqueIds(items: { id: string }[]) {
  const ids = items.map((item) => item.id);
  expect(ids.every((id) => id.trim().length > 0)).toBe(true);
  expect(new Set(ids).size).toBe(ids.length);
}

describe('resume language tables', () => {
  for (const [locale, data] of Object.entries(resumes)) {
    it(`${locale}: language options match the supported locales`, () => {
      expect(data.languages.map((language) => language.code)).toEqual([...localeCodes]);
    });

    it(`${locale}: list keys are unique and contact destinations are valid`, () => {
      expectUniqueIds(data.skills);
      expectUniqueIds(data.experience);
      expectUniqueIds(data.projects);
      expectUniqueIds(data.projects.flatMap((group) => group.items));
      expect(new Set(data.profile.social.map((contact) => contact.kind)).size).toBe(
        data.profile.social.length,
      );
      for (const contact of data.profile.social) {
        expect(new URL(contact.href).protocol).toBe('https:');
      }
    });
  }
});
