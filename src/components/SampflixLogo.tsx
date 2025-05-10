
import React from 'react';

interface SampflixLogoProps {
  className?: string;
}

const SampflixLogo: React.FC<SampflixLogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-3xl font-bold animate-rgb-shift">
        <span className="sampflix-gradient-text">Samp<span className="text-sampflix-bright-orange">FLIX</span></span>
      </div>
    </div>
  );
};

export default SampflixLogo;
