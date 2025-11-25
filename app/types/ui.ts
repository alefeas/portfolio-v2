import { ReactNode } from 'react';

// Button Component
export interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta';
  className?: string;
  target?: string;
  rel?: string;
  title?: string;
}

// BackButton Component
export interface BackButtonProps {
  href: string;
  title?: string;
}

// Badge Component
export interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

// Card Component
export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hover';
  onClick?: () => void;
}

// Carousel Component
export interface CarouselProps {
  images: string[];
  title: string;
}

// DemoCredentialsModal Component
export interface DemoCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  note: string;
  email: string;
  password: string;
  onOpenDemo: () => void;
}

// FeatureItem Component
export interface FeatureItemProps {
  children: ReactNode;
}

// IconButton Component
export interface IconButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  target?: string;
  className?: string;
}

// Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// Modal Component
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

// RepositoryLink Component
export interface RepositoryLinkProps {
  href: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick?: () => void;
}

// SectionHeader Component
export interface SectionHeaderProps {
  icon: ReactNode;
  badge: string | string[];
  title: string | string[];
  description: string | string[];
  highlightText?: string | string[];
}

// StatusBadge Component
export interface StatusBadgeProps {
  children: ReactNode;
}

// StatusDot Component
export interface StatusDotProps {
  className?: string;
}

// TechTag Component
export interface TechTagProps {
  children: string;
}

// Toast Component
export interface ToastProps {
  type: 'success' | 'error';
  title: string;
  description: string;
}

// Tooltip Component
export interface TooltipProps {
  label: string;
  children: ReactNode;
  isVisible: boolean;
  offset?: string;
}
