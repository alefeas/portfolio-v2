function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, '');
  if (vercelUrl) return `https://${vercelUrl}`;

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = 'Alejo Feas Matej Portfolio';

export const SITE_TITLE = 'Alejo Feas Matej - Full Stack Developer';

export const SITE_DESCRIPTION =
  'Full Stack Developer specializing in Next.js, React, TypeScript, PHP, and AI integration. Production experience in international e-commerce, legacy modernization, and scalable web applications.';

export const DEFAULT_OG_IMAGE = '/profile_result.avif';

export const SOCIAL_LINKS = {
  github: 'https://github.com/alefeas',
  linkedin: 'https://www.linkedin.com/in/afeas/',
  email: 'mailto:alefeas99@gmail.com',
} as const;
