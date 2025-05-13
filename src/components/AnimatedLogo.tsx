
import React from 'react';
import { Bolt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <Bolt className="h-8 w-8 text-sampflix-bright-orange animate-pulse" strokeWidth={2.5} />
        <div className="absolute inset-0 bg-sampflix-bright-orange blur-md opacity-30 animate-glow"></div>
      </div>
      <div className="text-3xl font-bold animate-rgb-shift">
        <span className="sampflix-gradient-text">Samp<span className="text-sampflix-bright-orange animate-pulse-soft">FLIX</span></span>
      </div>
    </div>
  );
};

export default AnimatedLogo;
