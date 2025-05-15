
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle, Play, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { plans } from '@/data/plans';
import { movies } from '@/data/movies';
import { series } from '@/data/series';
import AnimatedThumbnail from '@/components/AnimatedThumbnail';

const Landing = () => {
  const [showFeatured, setShowFeatured] = useState(false);

  // Show featured content after a delay for a nice animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeatured(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Get featured content for display
  const featuredMovie = movies.find(movie => movie.isFeatured);
  const featuredSeries = series.find(series => series.isFeatured);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section - Netflix Style */}
      <section className="netflix-hero">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/landing.jpg" 
            alt="Netflix background" 
            className="absolute w-full h-full object-cover object-center animate-slow-zoom"
          />
          <div className="netflix-gradient-overlay"></div>
        </div>
        
        {/* Hero Content */}
        <div className="netflix-hero-content">
          <h1 className="netflix-title mb-6 max-w-2xl animate-fade-in">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mb-10 animate-fade-in animation-delay-100">
            Watch anywhere. Cancel anytime. Ready to watch? Join millions of viewers today.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup" className="sampflix-button bg-netflix-red hover:bg-netflix-red-light text-lg w-full sm:w-auto text-center">
              <span className="flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </span>
            </Link>
            <Link to="/browse" className="text-white flex items-center justify-center gap-2 bg-white/10 px-6 py-3 rounded-md hover:bg-white/20 transition-colors w-full sm:w-auto">
              <Play size={20} className="fill-white" />
              Browse Content
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Content Showcase - Netflix Style */}
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto">
          <h2 className="netflix-row-title text-3xl mb-8">
            Featured Content
          </h2>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-700 ${showFeatured ? 'opacity-100' : 'opacity-0'}`}>
            {/* Featured Movie */}
            <div className="content-card group">
              <div className="relative h-64 overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src={featuredMovie?.thumbnailUrl || "https://images.unsplash.com/photo-1500673922987-e212871fec22"} 
                  alt={featuredMovie?.title || "Featured Movie"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-netflix-red/80 text-white px-2 py-1 rounded text-xs">Featured Movie</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{featuredMovie?.title || "Cosmic Journey"}</h3>
                <p className="text-white/70 mb-4 line-clamp-2">{featuredMovie?.description || "A space adventure unlike any other."}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-netflix-red">{featuredMovie?.rating || "PG-13"}</span>
                    <span className="text-white/50">•</span>
                    <span className="text-white/70">{featuredMovie?.duration || "2h 15m"}</span>
                  </div>
                  <Link to={`/movie/${featuredMovie?.id || "movie-1"}`} className="sampflix-button bg-netflix-red hover:bg-netflix-red-light py-2 px-4 text-sm flex items-center">
                    <Play size={16} className="mr-1" />
                    Watch now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Featured Series */}
            <div className="content-card group">
              <div className="relative h-64 overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src={featuredSeries?.thumbnailUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"} 
                  alt={featuredSeries?.title || "Featured Series"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-netflix-red/80 text-white px-2 py-1 rounded text-xs">Featured Series</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{featuredSeries?.title || "Quantum Nexus"}</h3>
                <p className="text-white/70 mb-4 line-clamp-2">{featuredSeries?.description || "Reality is more malleable than you think."}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-netflix-red">{featuredSeries?.rating || "TV-14"}</span>
                    <span className="text-white/50">•</span>
                    <span className="text-white/70">{featuredSeries?.seasons?.length || 1} Season{(featuredSeries?.seasons?.length || 1) > 1 ? 's' : ''}</span>
                  </div>
                  <Link to={`/series/${featuredSeries?.id || "series-1"}`} className="sampflix-button bg-netflix-red hover:bg-netflix-red-light py-2 px-4 text-sm flex items-center">
                    <Play size={16} className="mr-1" />
                    Watch now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Netflix-style preview row */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="netflix-row-title mb-4">Popular on Netflix</h2>
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4">
            {movies.slice(0, 6).map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-[160px] md:w-[200px]">
                <AnimatedThumbnail 
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  isNew={movie.isNew}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section - Netflix Style */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">
            Choose Your Plan
          </h2>
          <p className="text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Watch everything on our platform with a plan that works for you. Upgrade, downgrade, or cancel anytime.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {plans.map((plan, index) => (
              <div 
                key={plan.id}
                className={`relative flex flex-col p-6 rounded-md transition-all duration-500 ${
                  plan.isPopular 
                    ? 'bg-netflix-dark-gray border border-netflix-red transform md:-translate-y-4' 
                    : 'bg-netflix-light-gray/20'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-netflix-red text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6 text-white">
                  {plan.price}<span className="text-white/50 text-lg">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start animate-fade-in" 
                      style={{ animationDelay: `${index * 0.1 + idx * 0.1}s` }}
                    >
                      <CheckCircle className="text-netflix-red shrink-0 mr-2" size={18} />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/signup?plan=${plan.id}`}
                  className={`text-center px-6 py-3 rounded-md font-medium transition-colors ${
                    plan.isPopular 
                      ? 'bg-netflix-red text-white hover:bg-netflix-red-light' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.id === 'free-plan' ? 'Start Free' : (
                    <span className="flex items-center justify-center gap-2">
                      <CreditCard size={16} />
                      Choose Plan
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Highlights - Netflix Style */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center text-white">
            Why Choose Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-netflix-red/20">
                  <svg className="w-8 h-8 text-netflix-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Watch Anywhere</h3>
              <p className="text-white/70">
                Stream on your phone, tablet, laptop, TV, or any other device with an internet connection.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-netflix-red/20">
                  <svg className="w-8 h-8 text-netflix-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">No Commitments</h3>
              <p className="text-white/70">
                No contracts, no hidden fees. Cancel your subscription anytime with just a few clicks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-netflix-red/20">
                  <svg className="w-8 h-8 text-netflix-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Family Friendly</h3>
              <p className="text-white/70">
                Create up to 5 profiles for different members of your household with our premium plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Netflix Style */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to start watching?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto">
            Join today and get access to thousands of movies and TV shows. No contracts, no commitments.
          </p>
          <Link to="/signup" className="sampflix-button bg-netflix-red hover:bg-netflix-red-light text-lg font-medium px-8 py-4">
            Start Your Free Trial
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Landing;
