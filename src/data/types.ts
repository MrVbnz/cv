export const sectionIds = ['about', 'skills', 'experience', 'projects', 'interests'] as const;
export type SectionId = (typeof sectionIds)[number];
export type Locale = 'en' | 'ru';
export type ContactKind = 'github' | 'telegram' | 'linkedin';

export interface ResumeData {
  meta: { title: string; description: string };
  ui: {
    navigation: string;
    toggleNavigation: string;
    language: string;
    contacts: string;
    skipToContent: string;
    portraitAlt: string;
    sections: Record<SectionId, string>;
  };
  languages: { code: Locale; label: string }[];
  profile: {
    surname: string;
    givenName: string;
    email: string;
    location: string;
    summary: string;
    social: { kind: ContactKind; label: string; href: string }[];
  };
  skills: {
    id: string;
    title: string;
    groups: { title?: string; items: string[] }[];
  }[];
  experience: { id: string; role: string; company: string; period: string }[];
  projects: {
    id: string;
    title: string;
    items: {
      id: string;
      title: string;
      technologies: { label: string; value: string }[];
      paragraphs: string[];
    }[];
  }[];
  interests: { id: string; title: string; description: string }[];
}
