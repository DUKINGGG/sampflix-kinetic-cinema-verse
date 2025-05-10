
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Loader } from 'lucide-react';

const SignUp = () => {
  const { signup, isAuthLoading } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedPlan = searchParams.get('plan');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const success = await signup(name, email, password);
      if (success) {
        if (preSelectedPlan) {
          navigate(`/plans?selected=${preSelectedPlan}`);
        } else {
          navigate('/plans');
        }
      }
    } catch (err) {
      setError('Failed to sign up');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="sampflix-card max-w-md w-full p-8">
          <h1 className="text-3xl font-bold mb-6">Create Account</h1>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-sampflix-purple"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
              <label htmlFor="password" className="block text-white/80 mb-2">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-sampflix-purple"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-white/80 mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-sampflix-purple"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                'Sign Up'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-white/70">
            <p>Already have an account?{' '}
              <Link to="/login" className="text-sampflix-purple hover:text-sampflix-bright-blue transition-colors inline-flex items-center">
                Sign In <ArrowRight className="ml-1" size={16} />
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
