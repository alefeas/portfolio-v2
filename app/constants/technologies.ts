import { TechCategory } from '@/app/types';

export const technologies: TechCategory[] = [
  {
    category: "Frontend",
    techs: [
      { name: "React", logo: "/icons/react.svg" },
      { name: "Next.js", logo: "/icons/nextdotjs.svg" },
      { name: "TypeScript", logo: "/icons/typescript.svg" },
      { name: "JavaScript", logo: "/icons/javascript.svg" },
      { name: "HTML5", logo: "/icons/html5.svg" },
      { name: "CSS3", logo: "/icons/css3.svg" }
    ]
  },
  {
    category: "Backend",
    techs: [
      { name: "C#", logo: "/icons/csharp.svg" },
      { name: "ASP.NET", logo: "/icons/dotnet.svg" },
      { name: "Laravel", logo: "/icons/laravel.svg" },
      { name: "C", logo: "/icons/c.svg" },
      { name: "C++", logo: "/icons/cplusplus.svg" }
    ]
  },
  {
    category: "Databases",
    techs: [
      { name: "Oracle", logo: "/icons/oracle.svg" },
      { name: "PL/SQL", logo: "/icons/sqldeveloper.svg" },
      { name: "SQL Server", logo: "/icons/microsoftsqlserver.svg" },
      { name: "MySQL", logo: "/icons/mysql.svg" }
    ]
  },
  {
    category: "Tools",
    techs: [
      { name: "Git", logo: "/icons/git.svg" },
      { name: "GitHub", logo: "/icons/github.svg" },
      { name: "Docker", logo: "/icons/docker.svg" }
    ]
  }
];
