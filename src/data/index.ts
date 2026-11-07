import en from './locales/en';
import ru from './locales/ru';
import type { ResumeData } from './types';
import type { Locale } from '../i18n/locale';

// Each language is checked against the same schema without requiring identical content.
export const resumes: Record<Locale, ResumeData> = { en, ru };
