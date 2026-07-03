import { NavLink } from '@/app/types';
import { SOCIAL_LINKS } from '@/app/lib/site';

export const heroNavLinks: NavLink[] = [
  { 
    key: 'Github', 
    href: SOCIAL_LINKS.github, 
    icon: 'github' 
  },
  { 
    key: 'LinkedIn', 
    href: SOCIAL_LINKS.linkedin, 
    icon: 'linkedin' 
  },
  { 
    key: 'Resume', 
    href: '/CV_Alejo_Feas_Matej.pdf', 
    icon: 'resume', 
    target: '_blank' 
  },
  { 
    key: 'Email', 
    href: SOCIAL_LINKS.email, 
    icon: 'email' 
  }
];
