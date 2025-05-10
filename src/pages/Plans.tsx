
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { plans } from '@/data/plans';
import { CheckCircle, CreditCard, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const Plans = () => {
  const { auth, selectPlan } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedPlan = searchParams.get('selected');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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
