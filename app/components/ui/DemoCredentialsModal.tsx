'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { DemoCredentialsModalProps } from '@/app/types';

export default function DemoCredentialsModal({
  isOpen,
  onClose,
  title,
  note,
  email,
  password,
  onOpenDemo,
}: DemoCredentialsModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const passwordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setCopiedPassword(false);
    if (emailTimeoutRef.current) {
      clearTimeout(emailTimeoutRef.current);
    }
    emailTimeoutRef.current = setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopiedPassword(true);
    setCopiedEmail(false);
    if (passwordTimeoutRef.current) {
      clearTimeout(passwordTimeoutRef.current);
    }
    passwordTimeoutRef.current = setTimeout(() => {
      setCopiedPassword(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-lg bg-gradient-to-br from-slate-900/80 to-slate-800/70 border border-slate-700/50 p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Note */}
        <p className="text-sm text-slate-300 mb-6">{note}</p>

        {/* Credentials */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-xs text-slate-400 mb-1">Email:</p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 group">
              <p className="text-sm font-mono text-slate-200 select-all cursor-text">{email}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <AnimatePresence>
                  {copiedEmail && (
                    <motion.span
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      className="text-xs text-green-400 font-normal whitespace-nowrap"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
                <button
                  onClick={handleCopyEmail}
                  className="text-slate-400 hover:text-green-400 transition-colors cursor-pointer flex-shrink-0"
                  title="Copy to clipboard"
                >
                  {copiedEmail ? (
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 mb-1">Password:</p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 group">
              <p className="text-sm font-mono text-slate-200 select-all cursor-text">{password}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <AnimatePresence>
                  {copiedPassword && (
                    <motion.span
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      className="text-xs text-green-400 font-normal whitespace-nowrap"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
                <button
                  onClick={handleCopyPassword}
                  className="text-slate-400 hover:text-green-400 transition-colors cursor-pointer flex-shrink-0"
                  title="Copy to clipboard"
                >
                  {copiedPassword ? (
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenDemo}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300 font-normal text-sm cursor-pointer"
        >
          Open Live Demo
        </button>
      </motion.div>
    </motion.div>
  );
}
