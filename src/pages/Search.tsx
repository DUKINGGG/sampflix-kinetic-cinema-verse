
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { movies } from '@/data/movies';
import { series } from '@/data/series';
import { Search as SearchIcon, Film, Tv, X } from 'lucide-react';

type ContentType = 'all' | 'movies' | 'series';

const Search = () => {
  const { auth } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');
  const [contentType, setContentType] = useState<ContentType>('all');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [auth, navigate]);
  
  useEffect(() => {
    const initialQuery = searchParams.get('q');
    const initialType = searchParams.get('type') as ContentType;
    
    if (initialQuery) {
      setQuery(initialQuery);
    }
    
    if (initialType && ['all', 'movies', 'series'].includes(initialType)) {
      setContentType(initialType);
    }
    
    if (initialQuery) {
      performSearch(initialQuery, initialType as ContentType || 'all');
    }
  }, [searchParams]);
  
  const performSearch = (searchQuery: string, type: ContentType = 'all') => {
    setIsSearching(true);
    
    // Simulate a delay for search
    setTimeout(() => {
      let searchResults: any[] = [];
      
      if (type === 'all' || type === 'movies') {
        const foundMovies = movies.filter(movie => 
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        searchResults = [...searchResults, ...foundMovies.map(movie => ({ ...movie, type: 'movie' }))];
      }
      
      if (type === 'all' || type === 'series') {
        const foundSeries = series.filter(show => 
          show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          show.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        searchResults = [...searchResults, ...foundSeries.map(show => ({ ...show, type: 'series' }))];
      }
      
      setResults(searchResults);
      setIsSearching(false);
    }, 500);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      // Update URL with search parameters
      setSearchParams({ q: query, type: contentType });
      performSearch(query, contentType);
    }
  };
  
  const handleFilterChange = (type: ContentType) => {
    setContentType(type);
    setSearchParams({ q: query, type });
    
    if (query.trim()) {
      performSearch(query, type);
    }
  };
  
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Search</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for movies, TV shows, or genres..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-12 pr-12 py-3 text-white focus:outline-none focus:border-sampflix-purple"
                />
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                )}
                
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-sampflix-purple text-white p-1.5 rounded-full hover:bg-sampflix-bright-blue transition-colors"
                >
                  <SearchIcon size={16} />
                </button>
              </div>
            </form>
            
            {/* Filter Options */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 transition ${
                  contentType === 'all' ? 'bg-sampflix-purple text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <span>All</span>
              </button>
              <button
                onClick={() => handleFilterChange('movies')}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 transition ${
                  contentType === 'movies' ? 'bg-sampflix-purple text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Film size={16} />
                <span>Movies</span>
              </button>
              <button
                onClick={() => handleFilterChange('series')}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 transition ${
                  contentType === 'series' ? 'bg-sampflix-purple text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Tv size={16} />
                <span>TV Shows</span>
              </button>
            </div>
            
            {/* Search Results */}
            {isSearching ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-t-2 border-b-2 border-sampflix-purple rounded-full"></div>
              </div>
            ) : (
              <>
                {query && (
                  <div className="mb-6">
                    {results.length > 0 ? (
                      <p className="text-white/70">
                        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                      </p>
                    ) : (
                      <p className="text-white/70">
                        No results found for "{query}". Try a different search term.
                      </p>
                    )}
                  </div>
                )}
                
                {results.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {results.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/${item.type}/${item.id}`}
                        className="content-card"
                      >
                        <div className="relative pb-[150%] rounded-lg overflow-hidden">
                          <img 
                            src={item.thumbnailUrl} 
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {item.type === 'movie' ? (
                            <div className="absolute top-2 right-2 bg-sampflix-bright-blue text-white text-xs px-2 py-0.5 rounded-sm">
                              Movie
                            </div>
                          ) : (
                            <div className="absolute top-2 right-2 bg-sampflix-magenta-pink text-white text-xs px-2 py-0.5 rounded-sm">
                              TV Show
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                            <div>
                              <h3 className="text-white font-medium">{item.title}</h3>
                              <div className="flex items-center text-xs mt-1">
                                <span>{item.year}</span>
                                <span className="mx-1">•</span>
                                <span>{item.type === 'movie' ? item.duration : item.seasons.length + " Seasons"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {!query && !results.length && (
                  <div className="text-center py-12">
                    <div className="mb-4 text-sampflix-purple">
                      <SearchIcon size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Start searching</h3>
                    <p className="text-white/70">
                      Search for movies, TV shows, actors, or genres
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
