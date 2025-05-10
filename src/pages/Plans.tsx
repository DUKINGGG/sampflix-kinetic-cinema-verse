
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { plans } from '@/data/plans';
import { CheckCircle } from 'lucide-react';

const Plans = () => {
  const { auth, selectPlan } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedPlan = searchParams.get('selected');

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
        handleSelectPlan(validPlan.id);
      }
    }
  }, [auth, navigate, preSelectedPlan]);

  const handleSelectPlan = (planId: string) => {
    selectPlan(planId);
    navigate('/browse');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
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
                className={`sampflix-card relative flex flex-col ${
                  plan.isPopular ? 'border-sampflix-purple/50' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sampflix-bright-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
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
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-sampflix-bright-blue shrink-0 mr-3 mt-0.5" size={18} />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 border-t border-white/10">
                  <button 
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 rounded-md font-medium transition-all ${
                      plan.isPopular 
                        ? 'sampflix-button' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <div className="sampflix-card p-6">
              <h3 className="text-xl font-bold mb-4">Plan Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 pr-4">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.id} className="text-center py-4 px-4">{plan.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Price</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="text-center py-4 px-4">{plan.price}/month</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Video Quality</td>
                      <td className="text-center py-4 px-4">SD</td>
                      <td className="text-center py-4 px-4">HD (1080p)</td>
                      <td className="text-center py-4 px-4">Ultra HD (4K)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Simultaneous Devices</td>
                      <td className="text-center py-4 px-4">1</td>
                      <td className="text-center py-4 px-4">2</td>
                      <td className="text-center py-4 px-4">4</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">Ad-Free Experience</td>
                      <td className="text-center py-4 px-4">No</td>
                      <td className="text-center py-4 px-4">Yes</td>
                      <td className="text-center py-4 px-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Plans;
