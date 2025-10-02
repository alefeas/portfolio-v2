import { Project, Skill, Experience, ContactInfo } from '../types';

export const personalInfo = {
  name: "Tu Nombre",
  title: "Desarrollador Full Stack",
  bio: "Desarrollador apasionado por crear experiencias web excepcionales con tecnologías modernas.",
  avatar: "/images/avatar.jpg"
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Proyecto Ejemplo",
    description: "Descripción del proyecto con las tecnologías utilizadas",
    image: "/images/project1.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://ejemplo.com",
    githubUrl: "https://github.com/usuario/proyecto"
  }
];

export const skills: Skill[] = [
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Node.js", level: 75, category: "backend" }
];

export const experience: Experience[] = [
  {
    id: "1",
    company: "Empresa Ejemplo",
    position: "Desarrollador Frontend",
    period: "2023 - Presente",
    description: "Desarrollo de aplicaciones web modernas",
    technologies: ["React", "Next.js", "TypeScript"]
  }
];

export const contactInfo: ContactInfo = {
  email: "tu@email.com",
  location: "Tu Ciudad, País",
  linkedin: "https://linkedin.com/in/tu-perfil",
  github: "https://github.com/tu-usuario"
};