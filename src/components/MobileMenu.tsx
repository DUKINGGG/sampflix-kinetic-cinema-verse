
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { LogOut } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { auth, logout } = useApp();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-sampflix-dark-purple border-t border-sampflix-purple/20 animate-slide-down">
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
        {auth.isAuthenticated && (
          <>
            <Link 
              to="/browse" 
              className="text-white py-2 border-b border-sampflix-purple/10"
              onClick={onClose}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="text-white py-2 border-b border-sampflix-purple/10"
              onClick={onClose}
            >
              Movies
            </Link>
            <Link 
              to="/series" 
              className="text-white py-2 border-b border-sampflix-purple/10"
              onClick={onClose}
            >
              TV Shows
            </Link>
            <Link 
              to="/search" 
              className="text-white py-2 border-b border-sampflix-purple/10"
              onClick={onClose}
            >
              Search
            </Link>
          </>
        )}
        
        {!auth.isAuthenticated && (
          <div className="flex flex-col space-y-3 pt-2">
            <Link 
              to="/login" 
              className="text-white text-center py-2 border border-white/20 rounded-md"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="sampflix-button text-center"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        )}
        
        {auth.isAuthenticated && (
          <div className="pt-2 border-t border-sampflix-purple/10">
            <Link 
              to="/profile" 
              className="text-white py-2 border-b border-sampflix-purple/10 block"
              onClick={onClose}
            >
              Profile
            </Link>
            <Link 
              to="/settings" 
              className="text-white py-2 border-b border-sampflix-purple/10 block"
              onClick={onClose}
            >
              Settings
            </Link>
            <Link 
              to="/plans" 
              className="text-white py-2 border-b border-sampflix-purple/10 block"
              onClick={onClose}
            >
              Subscription
            </Link>
            <button 
              onClick={() => {
                logout();
                onClose();
              }} 
              className="flex items-center space-x-2 text-white py-2 w-full text-left"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
