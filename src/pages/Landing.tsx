
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { plans } from '@/data/plans';
import { movies } from '@/data/movies';
import { series } from '@/data/series';

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
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50 z-10" />
          <div className="absolute inset-0 bg-sampflix-dark-purple/30 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(155,135,245,0.1)_0%,rgba(30,174,219,0)_70%)] z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            className="absolute w-full h-full object-cover object-center"
            poster={featuredMovie?.thumbnailUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3"}
          >
            <source src="/videos/trailer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-down">
            <span className="sampflix-gradient-text">Unlimited movies, TV shows, and more</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-10 animate-slide-down animation-delay-100">
            Watch anywhere. Cancel anytime. Ready to watch? Join millions of viewers today.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link to="/signup" className="sampflix-button text-lg font-medium animate-glow group">
              <span className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </Link>
            <Link to="/browse" className="text-white flex items-center gap-2 bg-white/10 px-6 py-3 rounded-md hover:bg-white/20 transition-colors">
              <Play size={20} className="fill-white" />
              Browse Content
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Content Showcase */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center sampflix-gradient-text">
          Featured Content
        </h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 transition-opacity duration-700 ${showFeatured ? 'opacity-100' : 'opacity-0'}`}>
          {/* Featured Movie */}
          <div className="sampflix-card group overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src={featuredMovie?.thumbnailUrl || "https://images.unsplash.com/photo-1500673922987-e212871fec22"} 
                alt={featuredMovie?.title || "Featured Movie"} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-sampflix-purple/80 text-white px-2 py-1 rounded text-xs">Featured Movie</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{featuredMovie?.title || "Cosmic Journey"}</h3>
              <p className="text-white/70 mb-4">{featuredMovie?.description || "A space adventure unlike any other."}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sampflix-bright-orange">{featuredMovie?.rating || "PG-13"}</span>
                  <span className="text-white/50">•</span>
                  <span className="text-white/70">{featuredMovie?.duration || "2h 15m"}</span>
                </div>
                <Link to={`/movie/${featuredMovie?.id || "movie-1"}`} className="text-sampflix-bright-blue hover:text-sampflix-purple transition-colors">
                  Watch now
                </Link>
              </div>
            </div>
          </div>
          
          {/* Featured Series */}
          <div className="sampflix-card group overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src={featuredSeries?.thumbnailUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"} 
                alt={featuredSeries?.title || "Featured Series"} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-sampflix-magenta-pink/80 text-white px-2 py-1 rounded text-xs">Featured Series</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{featuredSeries?.title || "Quantum Nexus"}</h3>
              <p className="text-white/70 mb-4">{featuredSeries?.description || "Reality is more malleable than you think."}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sampflix-bright-orange">{featuredSeries?.rating || "TV-14"}</span>
                  <span className="text-white/50">•</span>
                  <span className="text-white/70">{featuredSeries?.seasons?.length || 1} Season{(featuredSeries?.seasons?.length || 1) > 1 ? 's' : ''}</span>
                </div>
                <Link to={`/series/${featuredSeries?.id || "series-1"}`} className="text-sampflix-bright-blue hover:text-sampflix-purple transition-colors">
                  Watch now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gradient-to-b from-black to-sampflix-dark-purple">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="sampflix-gradient-text">Choose Your Plan</span>
          </h2>
          <p className="text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Watch everything on SampFLIX with a plan that works for you. Upgrade, downgrade, or cancel anytime.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`sampflix-card p-6 relative flex flex-col ${
                  plan.isPopular ? 'transform md:-translate-y-4 border-sampflix-purple/50' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sampflix-bright-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6 sampflix-gradient-text">
                  {plan.price}<span className="text-white/50 text-lg">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-sampflix-bright-blue shrink-0 mr-2" size={18} />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/signup?plan=${plan.id}`}
                  className={`text-center px-6 py-3 rounded-md font-medium transition-colors ${
                    plan.isPopular 
                      ? 'sampflix-button animate-pulse-soft' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center">
            <span className="sampflix-gradient-text">Why Choose SampFLIX?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sampflix-purple/20 animate-glow">
                  <svg className="w-8 h-8 text-sampflix-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sampflix-purple/20 animate-glow">
                  <svg className="w-8 h-8 text-sampflix-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sampflix-purple/20 animate-glow">
                  <svg className="w-8 h-8 text-sampflix-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sampflix-purple/20 to-sampflix-bright-blue/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 sampflix-gradient-text">
            Ready to start watching?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto">
            Join SampFLIX today and get access to thousands of movies and TV shows. No contracts, no commitments.
          </p>
          <Link to="/signup" className="sampflix-button text-lg font-medium px-8 py-4 animate-glow">
            Start Your Free Trial
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Landing;
