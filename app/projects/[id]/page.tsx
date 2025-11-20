'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
    images: [
      `https://picsum.photos/1200/600?random=101`,
      `https://picsum.photos/1200/600?random=102`,
      `https://picsum.photos/1200/600?random=103`
    ]
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
    images: [
      `https://picsum.photos/1200/600?random=201`,
      `https://picsum.photos/1200/600?random=202`,
      `https://picsum.photos/1200/600?random=203`,
      `https://picsum.photos/1200/600?random=204`
    ]
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const project = projects.find(p => p.id === projectId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-green-400 hover:text-green-300">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const hasImages = project.images && project.images.length > 0;
  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };
  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button - Top Left */}
      <button
        onClick={() => {
          window.location.href = '/#projects';
        }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 hover:border-green-500/50 text-white/80 hover:text-white transition-all duration-300"
        title="Back to Projects"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-screen flex items-end overflow-hidden"
      >
        <img 
          src={`https://picsum.photos/1200/800?random=${project.id}`}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative w-full p-8 max-w-6xl mx-auto pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20">
                {project.category}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full border ${
                project.status === 'Live' 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
              }`}>
                {project.status}
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg text-white/90 max-w-4xl leading-relaxed">
              {project.detailedDescription}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Image Carousel */}
      {hasImages && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <div className="relative group">
            <div className="relative h-96 rounded-2xl overflow-hidden bg-slate-900/40 border border-slate-800/60">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Navigation Buttons */}
            {project.images.length > 1 && (
              <>
                <motion.button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:border-green-500/50 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:border-green-500/50 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {project.images.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-green-500 w-8'
                          : 'bg-white/30 w-2 hover:bg-white/50'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-white/90">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenges & Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30"
        >
          <h2 className="text-3xl font-bold mb-4">Challenges & Solutions</h2>
          <p className="text-white/80 leading-relaxed text-lg">
            {project.challenges}
          </p>
        </motion.div>

        {/* What I Learned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30"
        >
          <h2 className="text-3xl font-bold mb-4">What I Learned</h2>
          <p className="text-white/80 leading-relaxed text-lg">
            {project.learnings}
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Built with</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="px-4 py-2 text-sm font-medium bg-slate-800/60 text-slate-300 rounded-lg border border-slate-700/40 hover:border-green-500/50 hover:bg-slate-700/60 hover:text-white transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex gap-4 pt-8"
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 hover:text-white rounded-lg border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 text-sm font-medium"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Code
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-700/80 hover:bg-green-600/90 text-white rounded-lg transition-all duration-300 text-sm font-medium"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
