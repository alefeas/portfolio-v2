'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
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
            <path d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8ZM203.43 64L128 133.15L52.57 64ZM216 192H40V74.19l82.59 75.71a8 8 0 0 0 10.82 0L216 74.19V192Z"/>
          </svg>
          <h1 className="text-sm font-medium tracking-wide max-sm:text-xs">Contact</h1>
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
        <h2 className="text-3xl font-medium text-white mb-3">Let's Work Together</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          Ready to bring your ideas to life? I'm always excited to discuss new opportunities and 
          <span className="text-green-400 font-medium"> collaborate</span> on interesting projects.
        </p>
      </motion.div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="space-y-8 flex flex-col h-full"
        >
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
            
            {/* Contact Methods */}
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  ),
                  label: "Email",
                  value: "tu@email.com",
                  href: "mailto:tu@email.com"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                  label: "LinkedIn",
                  value: "/in/tu-perfil",
                  href: "https://linkedin.com/in/tu-perfil"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  ),
                  label: "GitHub",
                  value: "/tu-usuario",
                  href: "https://github.com/tu-usuario"
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-900/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/20 hover:border-green-500/30 transition-all duration-150 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03, ease: "easeOut" }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
                >
                  <div className="text-green-400 group-hover:text-green-300 transition-colors duration-300">
                    {contact.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{contact.label}</div>
                    <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      {contact.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Message */}
          <motion.div 
            className="p-6 bg-gradient-to-br from-slate-900/40 to-slate-800/30 rounded-2xl border border-slate-700/30 flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
          >
            <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Quick Response
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              I typically respond within <span className="text-green-400 font-medium">24 hours</span>. 
              Feel free to reach out about opportunities, collaborations, or just to say hi!
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Whether you have a project in mind, want to discuss opportunities, or just want to connect, 
              I'd love to hear from you. Let's create something amazing together!
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col h-full"
        >
          <form className="space-y-6 flex-1 flex flex-col justify-between mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  maxLength={50}
                  className="w-full px-4 py-3 bg-slate-900/30 border border-slate-700/20 rounded-xl text-white placeholder-slate-400 focus:border-green-500/30 focus:bg-slate-800/50 focus:outline-none transition-all duration-300"
                  placeholder="Your name"
                />
                <p className="text-xs text-slate-500 mt-2 ml-1">Name</p>
              </div>
              <div>
                <input
                  type="email"
                  maxLength={100}
                  className="w-full px-4 py-3 bg-slate-900/30 border border-slate-700/20 rounded-xl text-white placeholder-slate-400 focus:border-green-500/30 focus:bg-slate-800/50 focus:outline-none transition-all duration-300"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-slate-500 mt-2 ml-1">Email</p>
              </div>
            </div>
            
            <div>
              <input
                type="text"
                maxLength={80}
                className="w-full px-4 py-3 bg-slate-900/30 border border-slate-700/20 rounded-xl text-white placeholder-slate-400 focus:border-green-500/30 focus:bg-slate-800/50 focus:outline-none transition-all duration-300"
                placeholder="What's this about?"
              />
              <p className="text-xs text-slate-500 mt-2 ml-1">Subject</p>
            </div>
            
            <div>
              <textarea
                rows={6}
                maxLength={500}
                className="w-full px-4 py-3 bg-slate-900/30 border border-slate-700/20 rounded-xl text-white placeholder-slate-400 focus:border-green-500/30 focus:bg-slate-800/50 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Tell me about your project or just say hello..."
                onChange={(e) => {
                  const remaining = 500 - e.target.value.length;
                  const counter = e.target.parentElement.querySelector('.char-counter');
                  if (counter) counter.textContent = `Message (${remaining} characters remaining)`;
                }}
              />
              <p className="text-xs text-slate-500 mt-2 ml-1 char-counter">Message (500 characters remaining)</p>
            </div>
            
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-green-600/90 hover:bg-green-500 text-white rounded-xl font-medium transition-colors duration-150"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
              whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}