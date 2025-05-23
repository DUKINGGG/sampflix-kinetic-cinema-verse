import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import { movies } from '@/data/movies';
import { Play, Plus, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { auth } = useApp();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const foundMovie = movies.find(m => m.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      // Movie not found
      toast.error("Movie not found");
      navigate('/browse');
    }
    
    setIsLoading(false);
  }, [id, auth, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-t-2 border-b-2 border-sampflix-purple rounded-full"></div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  // Get related movies based on genre
  const relatedMovies = movies.filter(
    m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g))
  ).slice(0, 6);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleAddToList = () => {
    toast.success(`${movie.title} added to My List`);
  };

  const handleLike = () => {
    toast.success(`You liked ${movie.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {isPlaying ? (
          <VideoPlayer
            thumbnailUrl={movie.thumbnailUrl}
            title={movie.title}
            onBack={() => setIsPlaying(false)}
          />
        ) : (
          <>
            {/* Hero Banner - Updated to be more similar to landing page */}
            <section className="relative h-[85vh] flex items-center">
              {/* Background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-sampflix-dark-purple to-transparent z-10" />
                {/* Improved image display with additional effects */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-sampflix-dark-purple/30 z-5" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(155,135,245,0.1)_0%,rgba(30,174,219,0)_70%)] z-5" />
                  <AspectRatio ratio={16/9} className="h-full">
                    <img 
                      src={movie.thumbnailUrl} 
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
                    />
                  </AspectRatio>
                </div>
              </div>
              
              {/* Content */}
              <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">{movie.title}</h1>
                  <div className="flex items-center mb-4 text-sm animate-fade-in" style={{animationDelay: "0.2s"}}>
                    <span className="text-sampflix-bright-orange font-medium">{movie.rating}</span>
                    <span className="mx-2 text-white/50">•</span>
                    <span>{movie.year}</span>
                    <span className="mx-2 text-white/50">•</span>
                    <span>{movie.duration}</span>
                  </div>
                  <p className="text-white/90 text-lg mb-8 animate-fade-in" style={{animationDelay: "0.3s"}}>{movie.description}</p>
                  <div className="flex space-x-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
                    <button 
                      onClick={handlePlayClick}
                      className="sampflix-button group flex items-center"
                    >
                      <Play size={20} className="mr-2 fill-white" />
                      Play
                    </button>
                    <button 
                      onClick={handleAddToList}
                      className="bg-white/20 text-white p-3 rounded-md hover:bg-white/30 transition-colors"
                      title="Add to My List"
                    >
                      <Plus size={20} />
                    </button>
                    <button 
                      onClick={handleLike}
                      className="bg-white/20 text-white p-3 rounded-md hover:bg-white/30 transition-colors"
                      title="Like"
                    >
                      <ThumbsUp size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Movie Details */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column: Details */}
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">About {movie.title}</h2>
                    <p className="text-white/80 mb-8">{movie.description}</p>
                    
                    {/* Cast & Crew (placeholder data) */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Cast & Crew</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["Director: John Doe", "Writer: Jane Smith", "Stars: Actor One, Actor Two, Actor Three"].map((person, index) => (
                          <div key={index} className="text-white/70">{person}</div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Genres */}
                    <div>
                      <h3 className="text-xl font-bold mb-4">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.genre.map((genre: string) => (
                          <span 
                            key={genre} 
                            className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Additional Info */}
                  <div className="sampflix-card p-6 h-fit">
                    <h3 className="text-xl font-bold mb-4">Details</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-white/60">Release Year</dt>
                        <dd>{movie.year}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Duration</dt>
                        <dd>{movie.duration}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Rating</dt>
                        <dd>{movie.rating}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Similar Movies */}
            {relatedMovies.length > 0 && (
              <section className="py-12 bg-black/30">
                <div className="container mx-auto px-4">
                  <h2 className="text-2xl font-bold mb-6">More Like This</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {relatedMovies.map((relatedMovie) => (
                      <Link 
                        key={relatedMovie.id} 
                        to={`/movie/${relatedMovie.id}`}
                        className="content-card"
                      >
                        <div className="relative rounded-lg overflow-hidden">
                          <AspectRatio ratio={16/9}>
                            <img 
                              src={relatedMovie.thumbnailUrl} 
                              alt={relatedMovie.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                              <h3 className="text-white font-medium">{relatedMovie.title}</h3>
                            </div>
                          </AspectRatio>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      
      {!isPlaying && <Footer />}
    </div>
  );
};

export default MovieDetail;
