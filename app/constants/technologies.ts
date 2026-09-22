import { TechCategory } from '@/app/types';

export const technologies: TechCategory[] = [
  {
    category: "Frontend",
    techs: [
      { name: "React", logo: "/icons/react.svg" },
      { name: "Next.js", logo: "/icons/nextdotjs.svg" },
      { name: "TypeScript", logo: "/icons/typescript.svg" },
      { name: "JavaScript", logo: "/icons/javascript.svg" },
      { name: "Tailwind CSS", logo: "/icons/tailwindcss.svg" },
      { name: "HTML5", logo: "/icons/html5.svg" },
    ]
  },
  {
    category: "Backend",
    techs: [
      { name: "Node.js", logo: "/icons/nodejs.svg" },
      { name: "Express", logo: "/icons/express.svg" },
      { name: "PHP", logo: "/icons/php.svg" },
      { name: "Prisma", logo: "/icons/prisma.svg" },
      { name: "ASP.NET Core", logo: "/icons/dotnet.svg" },
      { name: "C#", logo: "/icons/csharp.svg" },
    ]
  },
  {
    category: "Databases",
    techs: [
      { name: "MySQL", logo: "/icons/mysql.svg" },
      { name: "Redis", logo: "/icons/redis.svg" },
      { name: "SQL Server", logo: "/icons/microsoftsqlserver.svg" },
      { name: "Oracle PL/SQL", logo: "/icons/oracle.svg" },
    ]
  },
  {
    category: "Tools",
    techs: [
      { name: "Docker", logo: "/icons/docker.svg" },
      { name: "AWS", logo: "/icons/aws.svg" },
      { name: "Nginx", logo: "/icons/nginx.svg" },
      { name: "Cloudflare", logo: "/icons/cloudflare.svg" },
      { name: "Git", logo: "/icons/git.svg" },
      { name: "GitHub", logo: "/icons/github.svg" },
    ]
  }
];
