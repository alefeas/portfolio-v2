import { Language } from '@/app/lib/translations';

// LanguageContext
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}
