
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies, Movie } from '@/data/movies';
import { series, Series } from '@/data/series';
import AnimatedThumbnail from '@/components/AnimatedThumbnail';
import { Play, Info } from 'lucide-react';

type ContentItem = Movie | Series;

const Browse = () => {
  const { auth } = useApp();
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-t-2 border-b-2 border-sampflix-purple rounded-full"></div>
      </div>
    );
  }

  // Get new releases
  const newReleases = [...movies, ...series].filter(content => content.isNew);
  
  // Helper function to determine if content is a Movie or Series
  const isMovie = (content: ContentItem): content is Movie => {
    return 'duration' in content;
  };

  // Featured Series for dedicated section
  const featuredSeries = series.filter(s => s.isFeatured);
  const popularSeries = series.slice(0, 6); // Get first 6 series for popular section

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative h-[80vh] flex items-center">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-sampflix-dark-purple to-transparent z-10" />
          <img 
            src={heroContent?.thumbnailUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"} 
            alt={heroContent?.title || "Featured Content"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroContent?.title || "Featured Title"}</h1>
            <div className="flex items-center mb-4 text-sm">
              <span className="text-sampflix-bright-orange font-medium">{heroContent?.rating || "PG-13"}</span>
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
            <p className="text-white/90 text-lg mb-8">
              {heroContent?.description || "No description available"}
            </p>
            <div className="flex space-x-4">
              <Link 
                to={heroContent?.id?.startsWith('movie') ? `/movie/${heroContent?.id}` : `/series/${heroContent?.id}`}
                className="sampflix-button group flex items-center"
              >
                <Play size={20} className="mr-2 fill-white" />
                Play
              </Link>
              <Link 
                to={heroContent?.id?.startsWith('movie') ? `/movie/${heroContent?.id}/details` : `/series/${heroContent?.id}/details`}
                className="bg-white/20 text-white px-6 py-3 rounded-md font-medium flex items-center hover:bg-white/30 transition-colors"
              >
                <Info size={20} className="mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <main className="flex-grow pt-8 pb-20">
        <div className="container mx-auto px-4">
          {/* TV Series Section - Moved to top priority */}
          <section className="mb-10 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                <span className="sampflix-gradient-text">Featured TV Shows</span>
              </h2>
              <Link to="/series" className="text-white/80 hover:text-white text-sm font-medium flex items-center transition-colors">
                View All <span className="ml-1">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredSeries.map((show) => (
                <Link 
                  key={show.id} 
                  to={`/series/${show.id}`}
                  className="content-card group animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  <AnimatedThumbnail
                    src={show.thumbnailUrl}
                    alt={show.title}
                    isNew={show.isNew}
                    isFeatured={show.isFeatured}
                  />
                  <div className="mt-2">
                    <h3 className="text-white font-medium line-clamp-1">{show.title}</h3>
                    <div className="flex items-center text-xs text-white/70">
                      <span>{show.seasons.length} Season{show.seasons.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Top genres preview */}
            <div className="mt-8">
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                <Link to="/series?genre=Drama" className="px-6 py-3 bg-sampflix-dark-purple/50 rounded-md border border-sampflix-purple/30 text-sm font-medium whitespace-nowrap hover:bg-sampflix-purple/20 transition-all">
                  Drama
                </Link>
                <Link to="/series?genre=Sci-Fi" className="px-6 py-3 bg-sampflix-dark-purple/50 rounded-md border border-sampflix-purple/30 text-sm font-medium whitespace-nowrap hover:bg-sampflix-purple/20 transition-all">
                  Sci-Fi
                </Link>
                <Link to="/series?genre=Thriller" className="px-6 py-3 bg-sampflix-dark-purple/50 rounded-md border border-sampflix-purple/30 text-sm font-medium whitespace-nowrap hover:bg-sampflix-purple/20 transition-all">
                  Thriller
                </Link>
                <Link to="/series?genre=Survival" className="px-6 py-3 bg-sampflix-dark-purple/50 rounded-md border border-sampflix-purple/30 text-sm font-medium whitespace-nowrap hover:bg-sampflix-purple/20 transition-all">
                  Survival
                </Link>
              </div>
            </div>
          </section>
          
          {/* New Releases */}
          {newReleases.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6">
                <span className="sampflix-gradient-text">New Releases</span>
              </h2>
              <div className="content-row">
                {newReleases.map((content) => (
                  <Link 
                    key={content.id} 
                    to={content.id.startsWith('movie') ? `/movie/${content.id}` : `/series/${content.id}`}
                    className="content-card min-w-[200px] w-[200px]"
                  >
                    <AnimatedThumbnail
                      src={content.thumbnailUrl}
                      alt={content.title}
                      isNew={true}
                      isFeatured={content.isFeatured}
                    />
                    <div className="mt-2">
                      <h3 className="text-white font-medium line-clamp-1">{content.title}</h3>
                      <div className="flex items-center text-xs text-white/70">
                        <span>{content.year}</span>
                        <span className="mx-1">•</span>
                        <span>{isMovie(content) ? content.duration : `${(content as Series).seasons.length} Seasons`}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {/* Popular Series Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Popular Series</h2>
            <div className="content-row">
              {popularSeries.map((show) => (
                <Link 
                  key={show.id} 
                  to={`/series/${show.id}`}
                  className="content-card min-w-[200px] w-[200px]"
                >
                  <AnimatedThumbnail
                    src={show.thumbnailUrl}
                    alt={show.title}
                    isNew={show.isNew}
                    isFeatured={show.isFeatured}
                  />
                  <div className="mt-2">
                    <h3 className="text-white font-medium line-clamp-1">{show.title}</h3>
                    <div className="flex items-center text-xs text-white/70">
                      <span>{show.year}</span>
                      <span className="mx-1">•</span>
                      <span>{show.seasons.length} Season{show.seasons.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Featured Movie Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Featured Movies</h2>
            <div className="content-row">
              {movies.filter(movie => movie.isFeatured).map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/movie/${movie.id}`}
                  className="content-card min-w-[200px] w-[200px]"
                >
                  <AnimatedThumbnail
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    isNew={movie.isNew}
                    isFeatured={movie.isFeatured}
                  />
                  <div className="mt-2">
                    <h3 className="text-white font-medium line-clamp-1">{movie.title}</h3>
                    <div className="flex items-center text-xs text-white/70">
                      <span>{movie.year}</span>
                      <span className="mx-1">•</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
