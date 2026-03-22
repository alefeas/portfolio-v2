'use client';

import { useLanguage } from './contexts/LanguageContext';
import Button from './components/ui/Button';

export default function NotFound() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: '404',
      subtitle: 'Página no encontrada',
      description: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
      button: 'Volver al inicio',
    },
    en: {
      title: '404',
      subtitle: 'Page not found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      button: 'Back to home',
    },
  };

  const t = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen text-white flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="heading-1 text-6xl md:text-8xl font-bold text-green-500">
          {t.title}
        </h1>

        <div className="space-y-4">
          <h2 className="heading-2 text-2xl md:text-3xl text-white">
            {t.subtitle}
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="pt-4">
          <Button href="/" variant="cta">
            {t.button}
          </Button>
        </div>
      </div>
    </div>
  );
}
