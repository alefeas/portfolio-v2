import { useLanguage } from '@/app/contexts/LanguageContext';
import { translations, TranslationKey } from '@/app/lib/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string | string[] => {
    return translations[language][key] || translations.en[key];
  };

  const ts = (key: TranslationKey): string => {
    const value = translations[language][key] || translations.en[key];
    return Array.isArray(value) ? value.join(', ') : value;
  };

  return { t, ts, language };
}
