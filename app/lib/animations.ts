import { Variants } from 'framer-motion';

export const premiumEase = [0.16, 1, 0.3, 1] as const;

/** Remount key for chrome that stays in the layout across routes.
 *  Entrance itself is CSS `.chrome-enter` so reload and navigation match. */
export function getChromeScene(pathname: string): 'project' | 'site' {
  return pathname.startsWith('/projects/') ? 'project' : 'site';
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};