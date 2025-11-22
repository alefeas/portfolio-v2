import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import TechStack from './components/sections/TechStack';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

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
