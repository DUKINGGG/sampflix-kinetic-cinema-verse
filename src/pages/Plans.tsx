
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { plans } from '@/data/plans';
import { CheckCircle, CreditCard, Sparkles, Shield, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import PaymentCard from '@/components/PaymentCard';

const Plans = () => {
  const { auth, selectPlan } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedPlan = searchParams.get('selected');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card");

  useEffect(() => {
    // If user is not authenticated, redirect to signup
    if (!auth.isAuthenticated) {
      navigate('/signup');
    }
    
    // If user already has a plan, redirect to browse
    if (auth.selectedPlan) {
      navigate('/browse');
    }
    
    // Auto-select plan from URL parameter
    if (preSelectedPlan) {
      const validPlan = plans.find(plan => plan.id === preSelectedPlan);
      if (validPlan) {
        setSelectedPlan(validPlan.id);
      }
    }
  }, [auth, navigate, preSelectedPlan]);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Only show payment method for premium plans
    if (planId === 'premium-plan' || planId === 'master-plan') {
      setShowPaymentMethod(true);
    } else {
      setShowPaymentMethod(false);
    }
  };

  const handleConfirmPlan = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan to continue");
      return;
    }

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    // For free plan, no payment processing needed
    if (plan.id === 'free-plan') {
      selectPlan(plan.id);
      toast.success(`You've selected the ${plan.name} plan`);
      navigate('/browse');
      return;
    }

    // For paid plans, check if payment method is selected
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    // For paid plans, simulate payment processing
    setIsProcessingPayment(true);
    
    // Simulate payment processing with timeout
    setTimeout(() => {
      setIsProcessingPayment(false);
      selectPlan(plan.id);
      toast.success(`Payment successful! You're now subscribed to the ${plan.name} plan`);
      navigate('/browse');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 px-4 bg-gradient-to-b from-sampflix-dark-purple to-black">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              <span className="sampflix-gradient-text">Choose Your Plan</span>
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Get access to all our content with a plan that suits your needs. 
              You can change or cancel your plan anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-zoom-in">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => handleSelectPlan(plan.id)}
                className={`sampflix-card relative flex flex-col transition-all duration-500 cursor-pointer hover:transform hover:scale-105 ${
                  selectedPlan === plan.id 
                    ? 'border-2 border-sampflix-bright-blue ring-2 ring-sampflix-bright-blue/50 shadow-lg shadow-sampflix-bright-blue/20' 
                    : plan.isPopular 
                      ? 'border-sampflix-purple/50' 
                      : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-sampflix-purple to-sampflix-bright-blue text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse-soft flex items-center gap-1">
                    <Sparkles size={14} className="animate-glow" />
                    Most Popular
                    <Sparkles size={14} className="animate-glow" />
                  </div>
                )}
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold sampflix-gradient-text">
                    {plan.price}
                    <span className="text-white/50 text-lg">/month</span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li 
                        key={index} 
                        className="flex items-start animate-fade-in" 
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CheckCircle 
                          className={`shrink-0 mr-3 mt-0.5 ${
                            plan.isPopular ? 'text-sampflix-bright-blue' : 'text-sampflix-purple'
                          }`} 
                          size={18} 
                        />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 border-t border-white/10">
                  <button 
                    className={`w-full py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                      selectedPlan === plan.id 
                        ? 'bg-gradient-to-r from-sampflix-bright-blue to-sampflix-magenta-pink text-white' 
                        : plan.isPopular 
                          ? 'sampflix-button' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.id !== 'free-plan' && <CreditCard size={18} />}
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {showPaymentMethod && (
            <div className="mt-12 animate-fade-in">
              <h3 className="text-xl font-bold mb-6 text-center">
                <span className="sampflix-gradient-text">Select Payment Method</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div 
                  onClick={() => setSelectedPaymentMethod("credit-card")}
                  className={`sampflix-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPaymentMethod === "credit-card" ? 'border-2 border-sampflix-bright-blue' : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sampflix-purple/20 mb-4">
                      <CreditCard className="text-sampflix-purple" size={24} />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Credit Card</h4>
                    <p className="text-white/70 text-sm text-center">Visa, Mastercard, Amex</p>
                    
                    {selectedPaymentMethod === "credit-card" && (
                      <PaymentCard className="mt-4 animate-fade-in" />
                    )}
                  </div>
                </div>
                
                <div 
                  onClick={() => setSelectedPaymentMethod("paypal")}
                  className={`sampflix-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPaymentMethod === "paypal" ? 'border-2 border-sampflix-bright-blue' : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sampflix-purple/20 mb-4">
                      <svg className="text-sampflix-purple" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 7.2C19.2 8.2 20 10 20 12C20 14.5 18 16.5 15.5 16.5H12L11 20H7L10 9H15.5C16.2 9 16.9 8.9 17.5 7.2ZM12.5 4H7L4 17H8L9 13.5H11L12.5 4Z" stroke="currentColor" fill="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium mb-2">PayPal</h4>
                    <p className="text-white/70 text-sm text-center">Safe online payments</p>

                    {selectedPaymentMethod === "paypal" && (
                      <div className="mt-4 animate-fade-in text-center">
                        <div className="bg-[#0070BA] text-white py-2 px-4 rounded font-bold text-sm">
                          PayPal
                        </div>
                        <p className="text-xs mt-2 text-white/70">Click confirm to connect with PayPal</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div 
                  onClick={() => setSelectedPaymentMethod("wallet")}
                  className={`sampflix-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPaymentMethod === "wallet" ? 'border-2 border-sampflix-bright-blue' : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sampflix-purple/20 mb-4">
                      <Wallet className="text-sampflix-purple" size={24} />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Digital Wallet</h4>
                    <p className="text-white/70 text-sm text-center">Apple Pay, Google Pay</p>
                    
                    {selectedPaymentMethod === "wallet" && (
                      <div className="mt-4 animate-fade-in flex flex-col items-center gap-2">
                        <div className="bg-black text-white py-1.5 px-4 rounded-md font-medium text-sm flex items-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.0457 11.5008C17.0519 9.95158 17.7451 8.72436 19.1372 7.84822C18.3568 6.71579 17.1654 6.0885 15.6037 5.98139C14.1286 5.87732 12.4892 6.82699 11.9459 6.82699C11.3741 6.82699 9.90278 6.02332 8.75747 6.02332C6.60673 6.05613 4.29553 7.77285 4.29553 11.2596C4.29553 12.1628 4.4516 13.0949 4.76375 14.0557C5.19431 15.3339 6.81193 18.6415 8.51542 18.5866C9.46509 18.5642 10.1372 17.9071 11.3741 17.9071C12.5742 17.9071 13.1942 18.5866 14.2553 18.5866C15.9773 18.5642 17.4211 15.58 17.8291 14.2987C14.9628 12.9972 14.684 9.6989 17.0457 8.32032V11.5008Z" />
                          </svg>
                          Apple Pay
                        </div>
                        <div className="bg-white text-black py-1.5 px-4 rounded-md font-medium text-sm flex items-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.5833 10H12.4167V14.1667H17.6667C17.0833 16.9167 14.9167 18.3333 12.4167 18.3333C9.25 18.3333 6.66667 15.75 6.66667 12.5833C6.66667 9.41667 9.25 6.83333 12.4167 6.83333C13.6667 6.83333 14.8333 7.25 15.75 8L19 4.75C17.3333 3.16667 15 2.16667 12.4167 2.16667C6.66667 2.16667 2 6.83333 2 12.5833C2 18.3333 6.66667 23 12.4167 23C17.5833 23 22 19.25 22 12.5833C22 11.75 21.8333 10.8333 21.5833 10Z" />
                          </svg>
                          Google Pay
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedPlan && (
            <div className="mt-12 text-center animate-slide-up">
              <Button
                onClick={handleConfirmPlan}
                disabled={isProcessingPayment}
                className="sampflix-button !px-10 !py-4 text-lg font-medium relative overflow-hidden group"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin mr-2">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Selection
                    <div className="absolute inset-0 w-full h-full bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </>
                )}
              </Button>
            </div>
          )}
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="sampflix-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="mr-2 text-sampflix-bright-blue" />
                Plan Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 pr-4">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.id} className="text-center py-4 px-4">
                          <span className={plan.isPopular ? 'sampflix-gradient-text' : ''}>{plan.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Price</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="text-center py-4 px-4">
                          <span className={plan.isPopular ? 'sampflix-gradient-text font-medium' : ''}>{plan.price}/month</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Video Quality</td>
                      <td className="text-center py-4 px-4">SD</td>
                      <td className="text-center py-4 px-4 sampflix-gradient-text font-medium">HD (1080p)</td>
                      <td className="text-center py-4 px-4">Ultra HD (4K)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Simultaneous Devices</td>
                      <td className="text-center py-4 px-4">1</td>
                      <td className="text-center py-4 px-4 sampflix-gradient-text font-medium">2</td>
                      <td className="text-center py-4 px-4">4</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">Ad-Free Experience</td>
                      <td className="text-center py-4 px-4">No</td>
                      <td className="text-center py-4 px-4 sampflix-gradient-text font-medium">Yes</td>
                      <td className="text-center py-4 px-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="sampflix-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sampflix-purple/20 animate-glow mb-4">
                <Shield className="text-sampflix-purple" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
              <p className="text-white/70 text-sm">Your payment information is secured with bank-level encryption</p>
            </div>
            
            <div className="sampflix-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sampflix-purple/20 animate-glow mb-4">
                <svg className="text-sampflix-purple" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M18 17V9" />
                  <path d="M13 17V5" />
                  <path d="M8 17v-3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Plan Flexibility</h3>
              <p className="text-white/70 text-sm">Easily upgrade, downgrade, or cancel your subscription at any time</p>
            </div>
            
            <div className="sampflix-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sampflix-purple/20 animate-glow mb-4">
                <svg className="text-sampflix-purple" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5Z" />
                  <path d="M3 8h18" />
                  <path d="M3 16h18" />
                  <path d="M8 3v18" />
                  <path d="M16 3v18" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Watch Anywhere</h3>
              <p className="text-white/70 text-sm">Enjoy SampFLIX on all your devices, anywhere you go</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Plans;
