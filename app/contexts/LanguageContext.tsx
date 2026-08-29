'use client';

import React, { createContext, useContext, useState, useLayoutEffect } from 'react';
import { Language } from '@/app/lib/translations';
import { LanguageContextType } from '@/app/types';

const LOCALE_COOKIE_NAME = 'portfolio-locale';
const LOCALE_STORAGE_KEY = 'portfolio-locale';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children,
  initialLanguage = 'en',
}: { 
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  // Start with SSR-provided language (from cookie) — no mismatch
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // Sync html lang and localStorage on change
  useLayoutEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(LOCALE_STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LOCALE_STORAGE_KEY, lang);
    // Cookie for SSR to read on next request
    document.cookie = `${LOCALE_COOKIE_NAME}=${lang}; path=/; max-age=${365 * 24 * 60 * 60}`;
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
