
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies } from '@/data/movies';
import { series } from '@/data/series';
import { Play, Info } from 'lucide-react';

const Browse = () => {
  const { auth } = useApp();
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState<any>(null);
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

  // Featured content for the hero section
  const featuredMovie = movies.find(movie => movie.isFeatured);
  const featuredSeries = series.find(series => series.isFeatured);

  // Get new releases
  const newReleases = [...movies, ...series].filter(content => content.isNew);
  
  // Organize movies by genre
  const moviesByGenre: Record<string, typeof movies> = {};
  movies.forEach(movie => {
    movie.genre.forEach(genre => {
      if (!moviesByGenre[genre]) {
        moviesByGenre[genre] = [];
      }
      moviesByGenre[genre].push(movie);
    });
  });
  
  // Organize series by genre
  const seriesByGenre: Record<string, typeof series> = {};
  series.forEach(show => {
    show.genre.forEach(genre => {
      if (!seriesByGenre[genre]) {
        seriesByGenre[genre] = [];
      }
      seriesByGenre[genre].push(show);
    });
  });

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
              <span>{heroContent?.duration || (heroContent?.seasons?.length + " Seasons") || "2h 15m"}</span>
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
          {/* Continue Watching */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
            <div className="content-row">
              {movies.slice(0, 4).map((movie) => (
                <Link 
                  key={movie.id} 
                  to={`/movie/${movie.id}`}
                  className="content-card min-w-[250px] w-[250px]"
                >
                  <div className="relative h-[140px]">
                    <img 
                      src={movie.thumbnailUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                      <span className="text-sm font-medium">{movie.title}</span>
                      <div className="h-1 w-full max-w-[70%] bg-white/30 rounded-full overflow-hidden ml-4">
                        <div className="h-full bg-sampflix-purple w-[60%]"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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
                    <div className="relative pb-[150%]">
                      <img 
                        src={content.thumbnailUrl} 
                        alt={content.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-sampflix-bright-orange text-white text-xs font-medium px-2 py-1 rounded">
                        NEW
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div>
                          <h3 className="text-white font-medium">{content.title}</h3>
                          <div className="flex items-center text-xs mt-1">
                            <span>{content.year}</span>
                            <span className="mx-1">•</span>
                            <span>{content.id.startsWith('movie') ? content.duration : content.seasons.length + " Seasons"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {/* Movies by Genre */}
          {Object.entries(moviesByGenre).map(([genre, genreMovies]) => (
            <section key={genre} className="mb-10">
              <h2 className="text-2xl font-bold mb-6">{genre} Movies</h2>
              <div className="content-row">
                {genreMovies.map((movie) => (
                  <Link 
                    key={movie.id} 
                    to={`/movie/${movie.id}`}
                    className="content-card min-w-[200px] w-[200px]"
                  >
                    <div className="relative pb-[150%]">
                      <img 
                        src={movie.thumbnailUrl} 
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                        <div>
                          <h3 className="text-white font-medium">{movie.title}</h3>
                          <div className="flex items-center text-xs mt-1">
                            <span>{movie.year}</span>
                            <span className="mx-1">•</span>
                            <span>{movie.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          
          {/* Series by Genre */}
          {Object.entries(seriesByGenre).map(([genre, genreSeries]) => (
            <section key={genre} className="mb-10">
              <h2 className="text-2xl font-bold mb-6">{genre} TV Shows</h2>
              <div className="content-row">
                {genreSeries.map((show) => (
                  <Link 
                    key={show.id} 
                    to={`/series/${show.id}`}
                    className="content-card min-w-[200px] w-[200px]"
                  >
                    <div className="relative pb-[150%]">
                      <img 
                        src={show.thumbnailUrl} 
                        alt={show.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                        <div>
                          <h3 className="text-white font-medium">{show.title}</h3>
                          <div className="flex items-center text-xs mt-1">
                            <span>{show.year}</span>
                            <span className="mx-1">•</span>
                            <span>{show.seasons.length} Season{show.seasons.length > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
