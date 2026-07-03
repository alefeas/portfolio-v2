import type { Metadata } from 'next';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import TechStack from './components/sections/TechStack';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/app/lib/site';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Hero />
      <Projects />
      <TechStack />
      <About />
      <Contact />
    </div>
  );
}
