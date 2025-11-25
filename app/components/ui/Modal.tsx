'use client';

import { motion } from 'framer-motion';
import { ModalProps } from '@/app/types';

export default function Modal({ isOpen, onClose, title, children, actionButton }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-40"
      />
      
      {/* Modal Container */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
      >
        {/* Modal Content - Animated with blur */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-800/30 border border-slate-700/30 p-6"
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
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

        {/* Content */}
        <div className="mb-6">
          {children}
        </div>

        {/* Action Button */}
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300 font-normal text-sm cursor-pointer"
          >
            {actionButton.label}
          </button>
        )}
        </motion.div>
      </div>
    </>
  );
}
