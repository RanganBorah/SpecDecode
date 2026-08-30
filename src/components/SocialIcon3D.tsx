import React from 'react';
import { Icon3D } from './Icon3D';

interface SocialIcon3DProps {
  href: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

export const SocialIcon3D: React.FC<SocialIcon3DProps> = ({ href, label, color, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 cursor-pointer"
    >
      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
        <Icon3D shape="ring" color={color} size={96} />
      </div>
      <div className="relative z-10 text-white pointer-events-none transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
    </a>
  );
};
