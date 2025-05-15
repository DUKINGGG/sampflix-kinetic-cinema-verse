
import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    <div className={cn("relative group overflow-hidden rounded-md", className)}>
      {/* Main image with hover effect */}
      <div className="relative w-full overflow-hidden">
        <AspectRatio ratio={16/9}>
          <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
          
          {/* Animated glow effect on hover */}
          <div className="absolute inset-0 bg-netflix-red/5 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(229,9,20,0.2)_0%,rgba(0,0,0,0)_70%)] animate-pulse-soft"></div>
          </div>
        </AspectRatio>
      </div>
      
      {/* Badges */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
        {isNew && (
          <span className="bg-netflix-red text-white text-xs font-medium px-2 py-1 rounded animate-pulse">
            NEW
          </span>
        )}
        {isFeatured && (
          <span className="bg-netflix-red-light text-white text-xs font-medium px-2 py-1 rounded animate-float">
            FEATURED
          </span>
        )}
      </div>
      
      {/* Hover play button overlay with animation - Netflix style */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-netflix-red/80 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 border-2 border-white">
          <Play className="w-5 h-5 text-white fill-current transform translate-x-0.5" />
        </div>
      </div>
      
      {/* Bottom info panel that appears on hover - Netflix style */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="text-sm font-medium text-white line-clamp-1">{alt}</h4>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
    </div>
  );
};

export default AnimatedThumbnail;
