
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies, Movie as MovieType } from '@/data/movies';
import { Film } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Movies = () => {
  const { auth } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Get all unique genres
  const allGenres = Array.from(
    new Set(movies.flatMap(movie => movie.genre))
  ).sort();

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Initialize with all movies
    setFilteredMovies(movies);
    setIsLoading(false);
  }, [auth, navigate]);

  // Filter by genre
  const filterByGenre = (genre: string | null) => {
    setSelectedGenre(genre);
    if (!genre) {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => movie.genre.includes(genre)));
    }
  };

  // Showing loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-t-2 border-b-2 border-sampflix-purple rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sampflix-dark-purple to-black py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 sampflix-gradient-text">Movies</h1>
            <p className="text-white/80 text-lg mb-6">
              Explore our collection of exciting movies, from thrilling action flicks to heartwarming dramas.
            </p>
            
            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2 mt-6">
              <button 
                onClick={() => filterByGenre(null)} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!selectedGenre 
                  ? 'bg-sampflix-purple text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                All Genres
              </button>
              
              {allGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => filterByGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedGenre === genre 
                      ? 'bg-sampflix-purple text-white' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Movies Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="content-card group"
                >
                  <div className="relative rounded-lg overflow-hidden hover-scale">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={movie.thumbnailUrl} 
                        alt={movie.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        {movie.isNew && (
                          <span className="bg-sampflix-bright-orange text-white text-xs font-medium px-2 py-1 rounded animate-pulse">
                            NEW
                          </span>
                        )}
                        {movie.isFeatured && (
                          <span className="bg-sampflix-purple text-white text-xs font-medium px-2 py-1 rounded">
                            FEATURED
                          </span>
                        )}
                      </div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
                          <div className="flex items-center text-xs mb-2">
                            <span className="text-sampflix-bright-orange">{movie.rating}</span>
                            <span className="mx-1.5 text-white/60">•</span>
                            <span>{movie.year}</span>
                            <span className="mx-1.5 text-white/60">•</span>
                            <span>{movie.duration}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {movie.genre.map((genre, index) => (
                              <span key={index} className="text-xs bg-white/20 px-2 py-0.5 rounded">
                                {genre}
                              </span>
                            ))}
                          </div>
                          <p className="text-white/70 text-xs line-clamp-2">{movie.description}</p>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Film size={64} className="text-white/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Movies Found</h3>
              <p className="text-white/70 text-center max-w-md">
                We couldn't find any movies matching your selected criteria. Try changing your filter or check back later.
              </p>
              <button 
                onClick={() => filterByGenre(null)} 
                className="mt-6 sampflix-button"
              >
                Show All Movies
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Movies;
