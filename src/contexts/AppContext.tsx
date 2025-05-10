
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define the types for our context
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  selectedPlan: string | null;
  paymentInfo: PaymentInfo | null;
}

interface PaymentInfo {
  cardType: string;
  lastFour: string;
  expiryDate: string;
  billingDate: string;
}

interface AppContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectPlan: (planId: string) => void;
  updatePaymentInfo: (info: PaymentInfo) => void;
  isAuthLoading: boolean;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    selectedPlan: null,
    paymentInfo: null,
  });
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('sampflix-auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuth(parsedAuth);
      } catch (error) {
        console.error('Failed to parse stored auth:', error);
      }
    }
    setIsAuthLoading(false);
  }, []);

  // Save auth state to localStorage when it changes
  useEffect(() => {
    if (!isAuthLoading) {
      localStorage.setItem('sampflix-auth', JSON.stringify(auth));
    }
  }, [auth, isAuthLoading]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsAuthLoading(true);
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login for any email/password
      setTimeout(() => {
        setAuth({
          isAuthenticated: true,
          user: {
            id: '1',
            name: email.split('@')[0],
            email,
          },
          selectedPlan: null,
          paymentInfo: null,
        });
        toast.success('Successfully logged in!');
        setIsAuthLoading(false);
      }, 1000);
      return true;
    } catch (error) {
      setIsAuthLoading(false);
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsAuthLoading(true);
      // In a real app, this would be an API call
      // For now, we'll simulate a successful signup for any valid input
      setTimeout(() => {
        setAuth({
          isAuthenticated: true,
          user: {
            id: '1',
            name,
            email,
          },
          selectedPlan: null,
          paymentInfo: null,
        });
        toast.success('Account created successfully!');
        setIsAuthLoading(false);
      }, 1000);
      return true;
    } catch (error) {
      setIsAuthLoading(false);
      console.error('Signup failed:', error);
      toast.error('Signup failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      selectedPlan: null,
      paymentInfo: null,
    });
    toast.info('You have been logged out');
  };

  const selectPlan = (planId: string) => {
    // Generate mock payment info for paid plans
    let paymentInfo: PaymentInfo | null = null;
    
    if (planId !== 'free-plan') {
      const mockCardTypes = ['Visa', 'Mastercard', 'Amex'];
      const randomCardType = mockCardTypes[Math.floor(Math.random() * mockCardTypes.length)];
      const randomLastFour = Math.floor(1000 + Math.random() * 9000).toString();
      const today = new Date();
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
      const billingDate = nextMonth.toISOString().split('T')[0];
      const expiryYear = new Date().getFullYear() + 3;
      
      paymentInfo = {
        cardType: randomCardType,
        lastFour: randomLastFour,
        expiryDate: `${Math.floor(1 + Math.random() * 12)}/20${expiryYear}`,
        billingDate: billingDate
      };
    }
    
    setAuth({
      ...auth,
      selectedPlan: planId,
      paymentInfo,
    });
    
    if (planId === 'free-plan') {
      toast.success('Free plan selected!');
    } else {
      toast.success('Payment successful! Plan selected.');
    }
  };
  
  const updatePaymentInfo = (info: PaymentInfo) => {
    setAuth({
      ...auth,
      paymentInfo: info
    });
    toast.success('Payment information updated');
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        login,
        signup,
        logout,
        selectPlan,
        updatePaymentInfo,
        isAuthLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
