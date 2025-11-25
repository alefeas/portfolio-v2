'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';
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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      actionButton={{ label: 'Open Live Demo', onClick: onOpenDemo }}
    >
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
    </Modal>
  );
}
