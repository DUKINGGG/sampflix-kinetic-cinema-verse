
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies, Movie } from '@/data/movies';
import { series, Series } from '@/data/series';
import AnimatedThumbnail from '@/components/AnimatedThumbnail';
import { Play, Info, Plus, Volume, VolumeX } from 'lucide-react';

type ContentItem = Movie | Series;

const Browse = () => {
  const { auth } = useApp();
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
    
    // Set a random featured content for hero
    const allFeatured = [
      ...movies.filter(m => m.isFeatured),
      ...series.filter(s => s.isFeatured)
    ];
    
    if (allFeatured.length > 0) {
      const randomIndex = Math.floor(Math.random() * allFeatured.length);
      setHeroContent(allFeatured[randomIndex]);
    } else if (movies.length > 0) {
      setHeroContent(movies[0]);
    }
    
    setIsLoading(false);
  }, [auth, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin w-12 h-12 border-t-2 border-b-2 border-netflix-red rounded-full"></div>
      </div>
    );
  }

  // Get new releases
  const newReleases = [...movies, ...series].filter(content => content.isNew);
  
  // Helper function to determine if content is a Movie or Series
  const isMovie = (content: ContentItem): content is Movie => {
    return 'duration' in content;
  };

  // Content categories
  const featuredSeries = series.filter(s => s.isFeatured);
  const popularSeries = series.slice(0, 6); 
  const trendingNow = [...movies, ...series].sort(() => Math.random() - 0.5).slice(0, 8);
  const popularMovies = movies.filter(m => m.isFeatured);

  // Toggle mute function
  const toggleMute = () => setMuted(!muted);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      {/* Hero Banner - Netflix Style */}
      <section className="relative pt-16 h-[80vh]">
        {/* Background Image/Video */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
          <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-black to-transparent z-10" />
          <img 
            src={heroContent?.thumbnailUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"} 
            alt={heroContent?.title || "Featured Content"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Video controls (mute/unmute) - Netflix style */}
          <button 
            onClick={toggleMute}
            className="absolute bottom-20 right-10 z-20 bg-black/30 backdrop-blur-sm p-3 rounded-full hover:bg-black/50 transition-colors"
          >
            {muted ? <VolumeX size={20} className="text-white" /> : <Volume size={20} className="text-white" />}
          </button>
          
          {/* Netflix maturity rating */}
          <div className="absolute bottom-20 left-10 z-20 border border-white/40 bg-black/30 backdrop-blur-sm px-2 py-1">
            <span className="text-white/80 text-sm">{heroContent?.rating || "16+"}</span>
          </div>
        </div>
        
        {/* Hero Content - Netflix Style */}
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white animate-fade-in">
              {heroContent?.title || "Featured Title"}
            </h1>
            <div className="flex items-center mb-4 text-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-netflix-red font-medium">{heroContent?.rating || "16+"}</span>
              <span className="mx-2 text-white/50">•</span>
              <span>{heroContent?.year || "2023"}</span>
              <span className="mx-2 text-white/50">•</span>
              <span>
                {heroContent && isMovie(heroContent) 
                  ? heroContent.duration 
                  : heroContent && 'seasons' in heroContent 
                    ? `${heroContent.seasons.length} Seasons` 
                    : "2h 15m"}
              </span>
            </div>
            <p className="text-white/90 text-lg mb-8 line-clamp-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {heroContent?.description || "No description available"}
            </p>
            <div className="flex space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link 
                to={heroContent?.id?.startsWith('movie') ? `/movie/${heroContent?.id}` : `/series/${heroContent?.id}`}
                className="bg-netflix-red hover:bg-netflix-red-light text-white px-8 py-3 rounded-md font-medium flex items-center transition-colors"
              >
                <Play size={20} className="mr-2 fill-white" />
                Play
              </Link>
              <Link 
                to={heroContent?.id?.startsWith('movie') ? `/movie/${heroContent?.id}/details` : `/series/${heroContent?.id}/details`}
                className="bg-white/20 text-white px-8 py-3 rounded-md font-medium flex items-center hover:bg-white/30 transition-colors"
              >
                <Info size={20} className="mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <main className="relative z-10 mt-[-100px] pb-20">
        {/* TV Shows Section */}
        <section className="netflix-section">
          <div className="container mx-auto">
            <h2 className="netflix-row-title">TV Shows</h2>
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4">
              {featuredSeries.map((show) => (
                <Link 
                  key={show.id} 
                  to={`/series/${show.id}`}
                  className="flex-shrink-0 w-[160px] md:w-[200px]"
                >
                  <AnimatedThumbnail
                    src={show.thumbnailUrl}
                    alt={show.title}
                    isNew={show.isNew}
                    isFeatured={show.isFeatured}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
          
        {/* New Releases */}
        {newReleases.length > 0 && (
          <section className="netflix-section">
            <div className="container mx-auto">
              <h2 className="netflix-row-title">New Releases</h2>
              <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4">
                {newReleases.map((content) => (
                  <Link 
                    key={content.id} 
                    to={content.id.startsWith('movie') ? `/movie/${content.id}` : `/series/${content.id}`}
                    className="flex-shrink-0 w-[160px] md:w-[200px]"
                  >
                    <AnimatedThumbnail
                      src={content.thumbnailUrl}
                      alt={content.title}
                      isNew={true}
                      isFeatured={content.isFeatured}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Trending Now Section */}
        <section className="netflix-section">
          <div className="container mx-auto">
            <h2 className="netflix-row-title">Trending Now</h2>
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4">
              {trendingNow.map((content) => (
                <Link 
                  key={content.id} 
                  to={content.id.startsWith('movie') ? `/movie/${content.id}` : `/series/${content.id}`}
                  className="flex-shrink-0 w-[160px] md:w-[200px]"
                >
                  <AnimatedThumbnail
                    src={content.thumbnailUrl}
                    alt={content.title}
                    isNew={content.isNew}
                    isFeatured={content.isFeatured}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Series Section */}
        <section className="netflix-section">
          <div className="container mx-auto">
            <h2 className="netflix-row-title">Popular TV Series</h2>
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4">
              {popularSeries.map((show) => (
                <Link 
                  key={show.id} 
                  to={`/series/${show.id}`}
                  className="flex-shrink-0 w-[160px] md:w-[200px]"
                >
                  <AnimatedThumbnail
                    src={show.thumbnailUrl}
                    alt={show.title}
                    isNew={show.isNew}
                    isFeatured={show.isFeatured}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Movies Section */}
        <section className="netflix-section">
          <div className="container mx-auto">
            <h2 className="netflix-row-title">Popular Movies</h2>
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4">
              {popularMovies.map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/movie/${movie.id}`}
                  className="flex-shrink-0 w-[160px] md:w-[200px]"
                >
                  <AnimatedThumbnail
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    isNew={movie.isNew}
                    isFeatured={movie.isFeatured}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* My List Section */}
        <section className="netflix-section">
          <div className="container mx-auto">
            <h2 className="netflix-row-title">My List</h2>
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4">
              {movies.slice(0, 5).map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/movie/${movie.id}`}
                  className="flex-shrink-0 w-[160px] md:w-[200px]"
                >
                  <AnimatedThumbnail
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    isNew={movie.isNew}
                    isFeatured={movie.isFeatured}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
