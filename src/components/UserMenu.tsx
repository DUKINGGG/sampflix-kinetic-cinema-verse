
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, CreditCard } from "lucide-react";
import { useApp } from '@/contexts/AppContext';

const UserMenu = () => {
  const { auth, logout } = useApp();
  
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-white">
        <User size={20} />
        <span className="hidden md:inline">{auth.user?.name}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-sampflix-dark-purple border border-sampflix-purple/20 rounded-md shadow-lg overflow-hidden z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform transition-all duration-200 origin-top-right">
        <div className="py-1">
          <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-sampflix-purple/20">
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>Profile</span>
            </div>
          </Link>
          <Link to="/settings" className="block px-4 py-2 text-sm text-white hover:bg-sampflix-purple/20">
            <div className="flex items-center space-x-2">
              <Settings size={16} />
              <span>Settings</span>
            </div>
          </Link>
          <Link to="/plans" className="block px-4 py-2 text-sm text-white hover:bg-sampflix-purple/20">
            <div className="flex items-center space-x-2">
              <CreditCard size={16} />
              <span>Subscription</span>
            </div>
          </Link>
          <button 
            onClick={logout} 
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-sampflix-purple/20"
          >
            <div className="flex items-center space-x-2">
              <LogOut size={16} />
              <span>Sign out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
