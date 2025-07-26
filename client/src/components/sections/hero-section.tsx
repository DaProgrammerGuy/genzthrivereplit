import { Button } from "@/components/ui/button";
import { useSwipe } from "@/hooks/use-swipe";

interface HeroSectionProps {
  onNavigate: (section: number) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const swipeHandlers = useSwipe({
    onSwipeUp: () => onNavigate(1),
    onSwipeLeft: () => onNavigate(1)
  });

  return (
    <section 
      className="section-height relative flex flex-col justify-center items-center px-4 py-8"
      {...swipeHandlers}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-green-500/20" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-pink-500/30 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-8 w-12 h-12 bg-green-400/40 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-6 w-20 h-20 bg-blue-500/25 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="relative z-10 text-center max-w-sm mx-auto">
        {/* Logo/Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto glass rounded-2xl flex items-center justify-center animate-glow">
            <i className="fas fa-rocket text-4xl gradient-text" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse" />
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          <span className="gradient-text">Tech-Business</span><br />
          <span className="text-white">Roadmap 2025</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-300 mb-2 text-lg font-medium">Gen Z Playbook</p>
        <p className="text-gray-400 mb-8 text-sm">Pakistan • Punjab • Rawalpindi</p>
        
        {/* CTA Button */}
        <Button 
          className="w-full touch-target bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-2xl font-semibold text-lg shadow-lg transform transition-all duration-200 active:scale-95 mb-6 border-0"
          onClick={() => onNavigate(1)}
        >
          Start Your Journey 🚀
        </Button>
        
        {/* Swipe indicator */}
        <div className="flex flex-col items-center text-gray-400">
          <p className="text-xs mb-2">Swipe up to explore</p>
          <div className="w-8 h-12 border border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-500 to-transparent rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
