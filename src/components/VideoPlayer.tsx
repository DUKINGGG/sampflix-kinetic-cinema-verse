
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl: string;
  title: string;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  title,
  onBack
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Demo video URL if not provided
  const actualVideoUrl = videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Update progress bar
  const updateProgress = () => {
    if (videoRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Show/hide controls on mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={playerRef} 
      className="relative w-full h-[calc(100vh-64px)] bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>
      
      {/* Video */}
      <video
        ref={videoRef}
        src={actualVideoUrl}
        poster={thumbnailUrl}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
        muted={isMuted}
      />
      
      {/* Fallback for demo mode */}
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="max-h-[70%] max-w-[80%] rounded-lg shadow-2xl object-contain"
          />
          <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
          <p className="text-netflix-red mb-6">Click to play</p>
        </div>
      )}
      
      {/* Controls overlay */}
      <div 
        className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/70 via-black/0 to-black/70 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top controls - title */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        {/* Bottom controls */}
        <div className="space-y-2">
          {/* Progress bar */}
          <div className="relative h-1 w-full bg-white/30 cursor-pointer" onClick={(e) => {
            if (videoRef.current) {
              const rect = e.currentTarget.getBoundingClientRect();
              const percentage = (e.clientX - rect.left) / rect.width;
              videoRef.current.currentTime = percentage * videoRef.current.duration;
            }
          }}>
            <div 
              className="absolute top-0 left-0 h-full bg-netflix-red" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          
          {/* Controls buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button onClick={togglePlay} className="text-white hover:text-netflix-red transition-colors">
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="fill-white" />}
              </button>
              
              {/* Volume */}
              <div className="flex items-center space-x-1">
                <button onClick={toggleMute} className="text-white hover:text-netflix-red transition-colors">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/30 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
              
              {/* Time */}
              <div className="text-xs text-white/80">
                {videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"} / 
                {videoRef.current ? formatTime(videoRef.current.duration) : "0:00"}
              </div>
            </div>
            
            {/* Right controls */}
            <div>
              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="text-white hover:text-netflix-red transition-colors">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
