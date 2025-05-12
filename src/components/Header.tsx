
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from "lucide-react";
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
          ? 'bg-black/80 backdrop-blur-md py-2' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <SampflixLogo className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {auth.isAuthenticated && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/browse" className="text-white hover:text-sampflix-purple transition-colors">
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/movies" className="text-white hover:text-sampflix-purple transition-colors">
                    Movies
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent text-white hover:text-sampflix-purple">
                    TV Shows
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-sampflix-purple/50 to-sampflix-dark-purple p-6 no-underline outline-none focus:shadow-md"
                            to="/series"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              All TV Shows
                            </div>
                            <p className="text-sm leading-tight text-white/70">
                              Browse our complete collection of TV series
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/series?genre=Drama"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sampflix-purple/20 focus:bg-sampflix-purple/20"
                        >
                          <div className="text-sm font-medium leading-none text-white">Drama</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Compelling stories with deep character development
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/series?genre=Sci-Fi"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sampflix-purple/20 focus:bg-sampflix-purple/20"
                        >
                          <div className="text-sm font-medium leading-none text-white">Sci-Fi</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Futuristic and mind-bending series
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/series?genre=Thriller"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sampflix-purple/20 focus:bg-sampflix-purple/20"
                        >
                          <div className="text-sm font-medium leading-none text-white">Thriller</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Suspenseful shows that keep you on the edge of your seat
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/search" className="text-white hover:text-sampflix-purple transition-colors">
                    <Search size={20} />
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
          
          {/* Auth Buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {showAuthButtons && (
              <>
                <Link to="/login" className="text-white hover:text-sampflix-purple transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="sampflix-button animate-glow">
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
