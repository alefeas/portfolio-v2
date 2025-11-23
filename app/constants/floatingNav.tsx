import { JSX } from "react";

export const floatingNavItems = [
  {
    id: 'hero',
    icon: 'hero',
    label: 'Hero',
  },
  {
    id: 'projects',
    icon: 'projects',
    label: 'Projects',
  },
  {
    id: 'tech-stack',
    icon: 'tech-stack',
    label: 'Tech Stack',
  },
  {
    id: 'about',
    icon: 'about',
    label: 'About',
  },
  {
    id: 'contact',
    icon: 'contact',
    label: 'Contact',
  },
];

export const getNavIcon = (iconType: string) => {
  const icons: Record<string, JSX.Element> = {
    hero: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 256 256">
        <path d="m220.17 100l-17.31-30a28 28 0 0 0-38.24-10.25a27.7 27.7 0 0 0-9 8.34L138.2 38a28 28 0 0 0-48.48 0a28 28 0 0 0-41.57 36l1.59 2.76A27.7 27.7 0 0 0 38 80.41a28 28 0 0 0-10.24 38.25l40 69.32a87.47 87.47 0 0 0 53.43 41a88.6 88.6 0 0 0 22.92 3a88 88 0 0 0 76.06-132Zm-6.66 62.64A72 72 0 0 1 81.62 180l-40-69.32a12 12 0 0 1 20.78-12L81.63 132a8 8 0 1 0 13.85-8L62 66a12 12 0 1 1 20.78-12L114 108a8 8 0 1 0 13.85-8l-24.28-42a12 12 0 1 1 20.78-12l33.42 57.9a48 48 0 0 0-5.54 60.6a8 8 0 0 0 13.24-9a32 32 0 0 1 7.31-43.5a8 8 0 0 0 2.13-10.4L168.23 90A12 12 0 1 1 189 78l17.31 30a71.56 71.56 0 0 1 7.2 54.62Z" />
      </svg>
    ),
    projects: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 256 256">
        <path d="M216 56h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16M96 48a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm120 24v41.61A184 184 0 0 1 128 136a184.1 184.1 0 0 1-88-22.38V72Zm0 128H40v-68.36A200.2 200.2 0 0 0 128 152a200.25 200.25 0 0 0 88-20.37zm-112-88a8 8 0 0 1 8-8h32a8 8 0 0 1 0 16h-32a8 8 0 0 1-8-8" />
      </svg>
    ),
    'tech-stack': (
      <svg className="size-5" fill="currentColor" viewBox="0 0 256 256">
        <path d="M71.68 97.22L34.74 128l36.94 30.78a8 8 0 1 1-10.36 12.44l-40-33.33a8 8 0 0 1 0-12.44l40-33.33a8 8 0 0 1 10.36 12.44Zm176 23.11l-40-33.33a8 8 0 1 0-10.36 12.44L221.26 128l-23.94 19.56a8 8 0 1 0 10.36 12.44l40-33.33a8 8 0 0 0 0-12.44ZM162.73 32.48a8 8 0 0 0-10.25 4.79l-64 176a8 8 0 0 0 4.79 10.26A8.14 8.14 0 0 0 96 224a8 8 0 0 0 7.52-5.27l64-176a8 8 0 0 0-4.79-10.25Z" />
      </svg>
    ),
    about: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 256 256">
        <path d="M188 88a27.75 27.75 0 0 0-12 2.71V60a28 28 0 0 0-41.36-24.6A28 28 0 0 0 80 44v6.71A27.75 27.75 0 0 0 68 48a28 28 0 0 0-28 28v76a88 88 0 0 0 176 0v-36a28 28 0 0 0-28-28m12 64a72 72 0 0 1-144 0V76a12 12 0 0 1 24 0v44a8 8 0 0 0 16 0V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0V60a12 12 0 0 1 24 0v68.67A48.08 48.08 0 0 0 120 176a8 8 0 0 0 16 0a32 32 0 0 1 32-32a8 8 0 0 0 8-8v-20a12 12 0 0 1 24 0Z" />
      </svg>
    ),
    contact: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 256 256">
        <path d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8ZM203.43 64L128 133.15L52.57 64ZM216 192H40V74.19l82.59 75.71a8 8 0 0 0 10.82 0L216 74.19V192Z" />
      </svg>
    ),
  };

  return icons[iconType] ?? null;
};
