
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Loader } from 'lucide-react';

const Login = () => {
  const { login, isAuthLoading } = useApp();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/browse');
      }
    } catch (err) {
      setError('Failed to log in');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="sampflix-card max-w-md w-full p-8">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-sampflix-purple"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-white/80">Password</label>
                <Link to="/forgot-password" className="text-sampflix-purple text-sm hover:text-sampflix-bright-blue transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-sampflix-purple"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isAuthLoading}
              className="sampflix-button w-full flex justify-center items-center"
            >
              {isAuthLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-white/70">
            <p>Don't have an account?{' '}
              <Link to="/signup" className="text-sampflix-purple hover:text-sampflix-bright-blue transition-colors inline-flex items-center">
                Sign Up <ArrowRight className="ml-1" size={16} />
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
