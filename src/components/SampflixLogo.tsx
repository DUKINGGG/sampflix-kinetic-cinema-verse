
import React from 'react';
import AnimatedLogo from './AnimatedLogo';

interface SampflixLogoProps {
  className?: string;
}

const SampflixLogo: React.FC<SampflixLogoProps> = ({ className = "h-8 w-auto" }) => {
  return <AnimatedLogo className={className} />;
};

export default SampflixLogo;
