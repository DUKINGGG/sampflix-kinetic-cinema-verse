
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { series } from '@/data/series';
import { Play, Plus, ThumbsUp, ArrowLeft, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Episode, Season } from '@/data/series';

const SeriesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { auth } = useApp();
  const navigate = useNavigate();
  
  const [show, setShow] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [expandedSeasons, setExpandedSeasons] = useState<string[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const foundSeries = series.find(s => s.id === id);
    if (foundSeries) {
      setShow(foundSeries);
      setSelectedSeason(foundSeries.seasons[0] || null);
      
      // Expand the first season by default
      if (foundSeries.seasons.length > 0) {
        setExpandedSeasons([foundSeries.seasons[0].id]);
      }
    } else {
      // Series not found
      toast.error("Series not found");
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

  if (!show) {
    return null;
  }

  // Get related series based on genre
  const relatedSeries = series.filter(
    s => s.id !== show.id && s.genre.some(g => show.genre.includes(g))
  ).slice(0, 6);

  const toggleSeason = (seasonId: string) => {
    setExpandedSeasons(prev => {
      if (prev.includes(seasonId)) {
        return prev.filter(id => id !== seasonId);
      } else {
        return [...prev, seasonId];
      }
    });
  };

  const handlePlayEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  const handleAddToList = () => {
    toast.success(`${show.title} added to My List`);
  };

  const handleLike = () => {
    toast.success(`You liked ${show.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {isPlaying && currentEpisode ? (
          <div className="relative w-full h-[calc(100vh-64px)]">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 left-4 z-20 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl mb-2">{show.title}</h2>
                <p className="text-xl mb-4">{currentEpisode.title} - S{selectedSeason?.episodes.findIndex(e => e.id === currentEpisode.id)! + 1}</p>
                <p className="text-white/60">Actual video content not available in this demo</p>
                <button
                  onClick={() => setIsPlaying(false)}
                  className="mt-6 sampflix-button"
                >
                  Exit Player
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Banner */}
            <section className="relative h-[70vh] flex items-center">
              {/* Background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-sampflix-dark-purple to-transparent z-10" />
                <img 
                  src={show.thumbnailUrl} 
                  alt={show.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{show.title}</h1>
                  <div className="flex items-center mb-4 text-sm">
                    <span className="text-sampflix-bright-orange font-medium">{show.rating}</span>
                    <span className="mx-2 text-white/50">•</span>
                    <span>{show.year}</span>
                    <span className="mx-2 text-white/50">•</span>
                    <span>{show.seasons.length} Season{show.seasons.length > 1 ? 's' : ''}</span>
                  </div>
                  <p className="text-white/90 text-lg mb-8">{show.description}</p>
                  <div className="flex space-x-4">
                    {selectedSeason && selectedSeason.episodes.length > 0 && (
                      <button 
                        onClick={() => handlePlayEpisode(selectedSeason.episodes[0])}
                        className="sampflix-button group flex items-center"
                      >
                        <Play size={20} className="mr-2 fill-white" />
                        Play
                      </button>
                    )}
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
            
            {/* Episodes Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Seasons & Episodes */}
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold">Episodes</h2>
                      {show.seasons.length > 1 && (
                        <div className="relative">
                          <select 
                            value={selectedSeason?.id || ''}
                            onChange={(e) => {
                              const season = show.seasons.find((s: Season) => s.id === e.target.value);
                              if (season) {
                                setSelectedSeason(season);
                                if (!expandedSeasons.includes(season.id)) {
                                  setExpandedSeasons(prev => [...prev, season.id]);
                                }
                              }
                            }}
                            className="appearance-none bg-white/10 border border-white/20 text-white px-4 py-2 pr-8 rounded focus:outline-none focus:border-sampflix-purple"
                          >
                            {show.seasons.map((season: Season) => (
                              <option key={season.id} value={season.id}>
                                {season.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/70" size={16} />
                        </div>
                      )}
                    </div>
                    
                    {/* Episodes List */}
                    <div className="space-y-6">
                      {show.seasons.map((season: Season) => (
                        <div key={season.id} className={`sampflix-card overflow-hidden ${selectedSeason?.id === season.id ? 'border-sampflix-purple/30' : ''}`}>
                          <button 
                            className="w-full p-4 flex justify-between items-center hover:bg-white/5"
                            onClick={() => toggleSeason(season.id)}
                          >
                            <h3 className="text-xl font-medium">{season.title}</h3>
                            <ChevronDown 
                              className={`transform transition-transform ${expandedSeasons.includes(season.id) ? 'rotate-180' : ''}`} 
                              size={20} 
                            />
                          </button>
                          
                          {expandedSeasons.includes(season.id) && (
                            <div className="border-t border-white/10">
                              {season.episodes.map((episode) => (
                                <div 
                                  key={episode.id}
                                  className="p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5"
                                >
                                  <div className="flex">
                                    <div className="w-20 md:w-32 h-12 md:h-20 flex-shrink-0 mr-4">
                                      <div className="relative w-full h-full rounded overflow-hidden">
                                        <img 
                                          src={episode.thumbnailUrl} 
                                          alt={episode.title}
                                          className="w-full h-full object-cover"
                                        />
                                        <button
                                          onClick={() => handlePlayEpisode(episode)}
                                          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                                        >
                                          <Play className="fill-white" size={24} />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="flex-grow">
                                      <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-medium">{episode.episodeNumber}. {episode.title}</h4>
                                        <span className="text-white/70 text-sm">{episode.duration}</span>
                                      </div>
                                      <p className="text-white/70 text-sm line-clamp-2">{episode.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Series Details */}
                  <div className="w-full md:w-1/3">
                    <div className="sampflix-card p-6">
                      <h3 className="text-xl font-bold mb-4">About {show.title}</h3>
                      <p className="text-white/80 mb-6">{show.description}</p>
                      
                      {/* Cast & Crew (placeholder data) */}
                      <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2">Cast & Crew</h4>
                        <div className="text-white/70 space-y-1">
                          <p>Creator: Jane Doe</p>
                          <p>Stars: Actor One, Actor Two, Actor Three</p>
                        </div>
                      </div>
                      
                      {/* Genres */}
                      <h4 className="text-lg font-medium mb-2">Genres</h4>
                      <div className="flex flex-wrap gap-2">
                        {show.genre.map((genre: string) => (
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
                </div>
              </div>
            </section>
            
            {/* Similar Series */}
            {relatedSeries.length > 0 && (
              <section className="py-12 bg-black/30">
                <div className="container mx-auto px-4">
                  <h2 className="text-2xl font-bold mb-6">More Like This</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {relatedSeries.map((relatedShow) => (
                      <Link 
                        key={relatedShow.id} 
                        to={`/series/${relatedShow.id}`}
                        className="content-card"
                      >
                        <div className="relative pb-[150%] rounded-lg overflow-hidden">
                          <img 
                            src={relatedShow.thumbnailUrl} 
                            alt={relatedShow.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                            <h3 className="text-white font-medium">{relatedShow.title}</h3>
                          </div>
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

export default SeriesDetail;
