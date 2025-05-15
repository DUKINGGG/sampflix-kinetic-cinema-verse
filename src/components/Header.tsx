
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Play, Bell } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import SampflixLogo from './SampflixLogo';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { auth } = useApp();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll events to change header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === '/';
  const showAuthButtons = isHomePage && !auth.isAuthenticated;
  const showUserMenu = auth.isAuthenticated;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-black py-2' 
          : 'bg-gradient-to-b from-black/90 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8">
            <SampflixLogo className="h-10 w-auto" />
          </Link>
          
          {/* Netflix-style primary navigation */}
          {auth.isAuthenticated && (
            <div className="hidden md:flex space-x-6">
              <Link to="/browse" className="text-white text-sm hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link to="/series" className="text-white text-sm hover:text-gray-300 transition-colors">
                TV Shows
              </Link>
              <Link to="/movies" className="text-white text-sm hover:text-gray-300 transition-colors">
                Movies
              </Link>
              <Link to="/browse" className="text-white text-sm hover:text-gray-300 transition-colors">
                New & Popular
              </Link>
              <Link to="/browse" className="text-white text-sm hover:text-gray-300 transition-colors">
                My List
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {auth.isAuthenticated && (
            <>
              <Link to="/search" className="text-white hover:text-gray-300 transition-colors">
                <Search size={20} />
              </Link>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Bell size={20} />
              </button>
            </>
          )}
          
          {/* Auth Buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {showAuthButtons && (
              <>
                <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="sampflix-button bg-netflix-red hover:bg-netflix-red-light">
                  Sign Up
                </Link>
              </>
            )}
            
            {showUserMenu && <UserMenu />}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
