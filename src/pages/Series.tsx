
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { series, Series as SeriesType } from '@/data/series';
import { Tv } from 'lucide-react';

const Series = () => {
  const { auth } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredSeries, setFilteredSeries] = useState<SeriesType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Get all unique genres
  const allGenres = Array.from(
    new Set(series.flatMap(show => show.genre))
  ).sort();

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Initialize with all series
    setFilteredSeries(series);
    setIsLoading(false);
  }, [auth, navigate]);

  // Filter by genre
  const filterByGenre = (genre: string | null) => {
    setSelectedGenre(genre);
    if (!genre) {
      setFilteredSeries(series);
    } else {
      setFilteredSeries(series.filter(show => show.genre.includes(genre)));
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 sampflix-gradient-text">TV Series</h1>
            <p className="text-white/80 text-lg mb-6">
              Explore our collection of exciting TV shows, from thrilling dramas to mind-bending sci-fi series.
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
      
      {/* Series Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {filteredSeries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredSeries.map(show => (
                <Link
                  key={show.id}
                  to={`/series/${show.id}`}
                  className="content-card group"
                >
                  <div className="relative pb-[150%] rounded-lg overflow-hidden">
                    <img 
                      src={show.thumbnailUrl} 
                      alt={show.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      {show.isNew && (
                        <span className="bg-sampflix-bright-orange text-white text-xs font-medium px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      {show.isFeatured && (
                        <span className="bg-sampflix-purple text-white text-xs font-medium px-2 py-1 rounded">
                          FEATURED
                        </span>
                      )}
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold mb-1">{show.title}</h3>
                        <div className="flex items-center text-xs mb-2">
                          <span className="text-sampflix-bright-orange">{show.rating}</span>
                          <span className="mx-1.5 text-white/60">•</span>
                          <span>{show.year}</span>
                          <span className="mx-1.5 text-white/60">•</span>
                          <span>{show.seasons.length} Season{show.seasons.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {show.genre.map((genre, index) => (
                            <span key={index} className="text-xs bg-white/20 px-2 py-0.5 rounded">
                              {genre}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/70 text-xs line-clamp-2">{show.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Tv size={64} className="text-white/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Series Found</h3>
              <p className="text-white/70 text-center max-w-md">
                We couldn't find any TV shows matching your selected criteria. Try changing your filter or check back later.
              </p>
              <button 
                onClick={() => filterByGenre(null)} 
                className="mt-6 sampflix-button"
              >
                Show All Series
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Series;
