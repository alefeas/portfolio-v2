'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "PayTo",
    description: "Comprehensive financial management platform for Argentine businesses with AFIP integration.",
    detailedDescription: "PayTo is a full-stack financial management solution designed specifically for Argentine businesses. It provides a robust REST API backend built with Laravel 12 and a modern React-based frontend with Next.js 15. The platform handles complex multi-company operations including invoice management, payment tracking, collections, and seamless AFIP integration for electronic invoice validation. With complete data isolation between companies, role-based access control, and real-time notifications, PayTo enables businesses to manage their financial operations efficiently and compliantly.",
    features: ["Multi-Company Invoice Management", "AFIP Electronic Invoice Integration", "Payment & Collection Tracking", "Real-time Financial Dashboard", "Accounts Receivable & Payable", "VAT Balance Calculations", "B2B Network Connections", "Audit Logging & Compliance", "Multi-Currency Support", "Role-Based Access Control"],
    challenges: "The primary challenges involved implementing secure AFIP integration with certificate-based authentication, ensuring complete data isolation in a multi-company environment, and building a real-time financial dashboard that handles complex calculations while maintaining optimal performance. Additionally, managing payment status synchronization across multiple systems required careful state management and error handling.",
    learnings: "This project deepened my understanding of financial systems architecture, AFIP compliance requirements for Argentine businesses, multi-tenant application design patterns, and the importance of audit logging in financial applications. I also gained expertise in building scalable REST APIs with Laravel and creating responsive financial dashboards with React.",
    tech: ["Laravel 12", "PHP 8.2", "Next.js 15", "React 19", "TypeScript", "MySQL", "Tailwind CSS", "shadcn/ui", "Recharts", "Sanctum", "Pest PHP"],
    category: "Full Stack",
    status: "Live",
    github: "https://github.com/alefeas/payto-backend",
    demo: "https://payto.vercel.app",
    image: "/images/payto.jpg"
  },
  {
    id: 2,
    title: "Argentum Online Web",
    description: "Bringing the legendary Argentum Online game to the web with modern technologies.",
    detailedDescription: "Argentum Online Web is a collaborative project to recreate the famous Argentum Online game as a fully functional web application. This ambitious undertaking involves porting the classic game mechanics to a modern web stack using Next.js with TypeScript for the frontend and Node.js for the backend. The project focuses on maintaining the essence of the original game while leveraging web technologies to make it accessible to a broader audience. Features include real-time multiplayer gameplay, character progression, inventory management, combat systems, and a persistent game world.",
    features: ["Real-time Multiplayer Gameplay", "Character Creation & Progression", "Inventory Management System", "Combat & Skill Systems", "Persistent Game World", "NPC Interactions", "Quest System", "Trading & Economy", "Guild Management", "Real-time Chat & Communication"],
    challenges: "Recreating a complex game with real-time multiplayer mechanics in a web environment presents significant technical challenges. Managing real-time synchronization between multiple players, handling server state consistency, optimizing network communication, and ensuring smooth gameplay performance across different devices and network conditions are critical. Additionally, balancing game mechanics and maintaining the original game's feel while adapting to web constraints requires careful design decisions.",
    learnings: "This collaborative project has provided invaluable experience in real-time multiplayer game development, WebSocket communication for live synchronization, game state management at scale, and optimizing performance for web-based games. Working with a team has also enhanced my understanding of collaborative development practices and the importance of clear communication in complex projects.",
    tech: ["Next.js 15", "TypeScript", "Node.js", "WebSocket", "React 19", "Tailwind CSS", "Sequelize", "Redis", "Socket.io"],
    category: "Full Stack",
    status: "In Development",
    github: "https://github.com/argentumonline/web",
    demo: "https://argentumonline-web.vercel.app",
    image: "/images/argentum.jpg"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
          <svg width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
            <path d="M216 56h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16M96 48a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm120 24v72H40V72Z"/>
          </svg>
          <h1 className="text-sm font-medium tracking-wide max-sm:text-xs">Projects</h1>
        </div>
      </motion.div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-medium text-white mb-3">Selected Work</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          A collection of projects that showcase my skills and passion for creating 
          <span className="text-green-400 font-medium"> innovative</span> digital solutions.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer space-y-6"
            onClick={() => setSelectedProject(project)}
          >
            {/* Project Image */}
            <div className="h-fit w-fit bg-cover bg-center rounded-lg overflow-hidden">
              <div className="aspect-[1.75] rounded-lg relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/400/230?random=${project.id}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm">{project.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  project.status === 'Live' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>{project.status}</span>
              </div>
              <h4 className="text-xl font-semibold leading-[1.25] text-white max-sm:text-lg">
                {project.title}
              </h4>
              <p className="text-sm text-slate-400">
                {project.description}
              </p>
              <span className="w-fit text-sm text-green-400 flex items-center">
                <span className="relative">
                  Read more
                  <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" style={{borderBottom: '1px dotted white', height: '1px', background: 'none'}}></span>
                </span>
                <svg className="ml-1 inline-block transition-all duration-300 group-hover:ml-2" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
                </svg>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 transition-all duration-300 border border-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Hero Image */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={`https://picsum.photos/800/320?random=${selectedProject.id}`}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20">
                      {selectedProject.category}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full border ${
                      selectedProject.status === 'Live' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{selectedProject.title}</h3>
                  <p className="text-white/80 text-base leading-relaxed max-w-3xl">
                    {selectedProject.detailedDescription}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Challenges & Solutions</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.challenges}</p>
                </div>

                {/* What I Learned */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">What I Learned</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.learnings}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Built with</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-800/60 text-slate-300 rounded-lg border border-slate-700/40 hover:border-green-500/50 hover:bg-slate-700/60 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={`/projects/${selectedProject.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-700/80 hover:bg-green-600/90 text-white rounded-lg transition-all duration-300 flex-1 justify-center text-sm font-medium"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Full Project
                  </motion.a>
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 hover:text-white rounded-lg border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 justify-center text-sm font-medium"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}