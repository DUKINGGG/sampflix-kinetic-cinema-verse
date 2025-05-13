
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const AnimatedThumbnail: React.FC<AnimatedThumbnailProps> = ({
  src,
  alt,
  className,
  isNew,
  isFeatured
}) => {
  return (
    <div className={cn("relative group overflow-hidden rounded-lg", className)}>
      {/* Main image with hover effect */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
        
        {/* Animated glow effect on hover */}
        <div className="absolute inset-0 bg-sampflix-purple/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(155,135,245,0.2)_0%,rgba(30,174,219,0)_70%)] animate-pulse-soft"></div>
        </div>
      </div>
      
      {/* Badges */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
        {isNew && (
          <span className="bg-sampflix-bright-orange text-white text-xs font-medium px-2 py-1 rounded animate-pulse">
            NEW
          </span>
        )}
        {isFeatured && (
          <span className="bg-sampflix-purple text-white text-xs font-medium px-2 py-1 rounded animate-float">
            FEATURED
          </span>
        )}
      </div>
      
      {/* Hover play button overlay with animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-sampflix-purple/80 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
          <svg className="w-6 h-6 text-white fill-current transform translate-x-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
    </div>
  );
};

export default AnimatedThumbnail;
