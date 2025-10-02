'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
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
            <path d="M188 88a27.75 27.75 0 0 0-12 2.71V60a28 28 0 0 0-41.36-24.6A28 28 0 0 0 80 44v6.71A27.75 27.75 0 0 0 68 48a28 28 0 0 0-28 28v76a88 88 0 0 0 176 0v-36a28 28 0 0 0-28-28m12 64a72 72 0 0 1-144 0V76a12 12 0 0 1 24 0v44a8 8 0 0 0 16 0V44a12 12 0 0 1 24 0v68a8 8 0 0 0 16 0V60a12 12 0 0 1 24 0v68.67A48.08 48.08 0 0 0 120 176a8 8 0 0 0 16 0a32 32 0 0 1 32-32a8 8 0 0 0 8-8v-20a12 12 0 0 1 24 0Z"/>
          </svg>
          <h1 className="text-sm font-medium tracking-wide max-sm:text-xs">About Me</h1>
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
        <h2 className="text-3xl font-medium text-white mb-3">Get to Know Me</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          Passionate developer with a love for creating 
          <span className="text-green-400 font-medium"> meaningful</span> digital experiences.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative w-full max-w-sm mx-auto">
            {/* Simple clean image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Who I Am</h3>
            <div className="space-y-3 text-slate-300 leading-relaxed text-sm">
              <p>
                I'm a passionate <span className="text-green-400 font-medium">Full Stack Developer</span> with 
                a strong foundation in modern web technologies. I love turning complex problems into 
                simple, beautiful, and intuitive solutions.
              </p>
              <p>
                Currently seeking my first professional opportunity as a developer. I'm dedicated to 
                continuous learning and building projects that showcase my growing skills in web development.
              </p>
            </div>
          </div>

          {/* Current Focus */}
          <div className="p-6 bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30">
            <h4 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Currently Learning
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Expanding my knowledge in <span className="text-green-400 font-medium">cloud technologies</span>, 
              <span className="text-green-400 font-medium"> microservices architecture</span>, and 
              <span className="text-green-400 font-medium"> advanced database optimization</span> to stay 
              current with industry trends.
            </p>
          </div>

          {/* Skills highlight */}
          <div>
            <h4 className="text-base font-semibold text-white mb-2">What I Do Best</h4>
            <div className="space-y-3">
              {[
                "Full-stack web development with modern frameworks",
                "Database design and optimization",
                "API development and integration",
                "UI/UX implementation with attention to detail"
              ].map((skill, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-slate-300 text-xs">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}