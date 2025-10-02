import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import TechStack from './components/sections/TechStack';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Projects />
      <TechStack />
    </div>
  );
}
