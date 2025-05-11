
import React from 'react';
import { CreditCard, Calendar } from 'lucide-react';

interface PaymentCardProps {
  cardType: string;
  lastFour: string;
  expiryDate: string;
  className?: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ 
  cardType, 
  lastFour, 
  expiryDate,
  className = "" 
}) => {
  const getCardLogo = () => {
    switch (cardType.toLowerCase()) {
      case 'visa':
        return (
          <div className="text-white font-bold tracking-widest italic text-xl">
            VISA
          </div>
        );
      case 'mastercard':
        return (
          <div className="flex">
            <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full -ml-4 opacity-80"></div>
          </div>
        );
      case 'amex':
        return (
          <div className="text-white font-bold text-sm">
            AMERICAN EXPRESS
          </div>
        );
      default:
        return <CreditCard className="text-white" size={28} />;
    }
  };

  return (
    <div className={`relative w-full max-w-sm h-56 bg-gradient-to-br from-sampflix-purple to-sampflix-bright-blue rounded-xl overflow-hidden shadow-xl p-6 text-white ${className} group hover:shadow-2xl hover:shadow-sampflix-bright-blue/30 transition-all duration-500`}>
      {/* Card background effects with enhanced animations */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]"></div>
      
      {/* Enhanced animated shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[length:50%_100%] bg-no-repeat animate-shimmer"></div>
      
      {/* Floating particles effect */}
      <div className="absolute w-2 h-2 rounded-full bg-white/40 left-[10%] top-[20%] animate-float-slow"></div>
      <div className="absolute w-1 h-1 rounded-full bg-white/40 left-[80%] top-[40%] animate-float-medium"></div>
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white/40 left-[30%] top-[70%] animate-float-fast"></div>
      
      {/* Card content with subtle animations */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Card chip and type */}
        <div className="flex justify-between items-start">
          <div className="w-10 h-8 bg-yellow-300/90 rounded-md transform group-hover:scale-105 transition-transform duration-300"></div>
          <div className="flex items-center space-x-2 transform group-hover:scale-105 transition-transform duration-300">
            {getCardLogo()}
          </div>
        </div>
        
        {/* Card number */}
        <div className="my-6">
          <div className="flex space-x-4 justify-center text-xl font-mono tracking-widest group-hover:text-white transition-colors duration-300">
            <span className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">****</span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" style={{ transitionDelay: "0.1s" }}>****</span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" style={{ transitionDelay: "0.2s" }}>****</span>
            <span className="font-bold group-hover:text-sampflix-bright-orange transition-colors duration-300" style={{ transitionDelay: "0.3s" }}>{lastFour}</span>
          </div>
        </div>
        
        {/* Card holder and expiry */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs text-white/70 mb-1 group-hover:text-white/90 transition-colors duration-300">CARD HOLDER</div>
            <div className="font-medium tracking-wide group-hover:text-sampflix-bright-orange transition-colors duration-300">SAMPFLIX USER</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/70 mb-1 group-hover:text-white/90 transition-colors duration-300">EXPIRES</div>
            <div className="font-medium tracking-wide flex items-center group-hover:text-sampflix-bright-orange transition-colors duration-300">
              <Calendar size={14} className="mr-1" />
              {expiryDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
