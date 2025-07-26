import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { mindsetPrinciples } from "@/lib/roadmap-data";
import { useSwipe } from "@/hooks/use-swipe";

interface MindsetSectionProps {
  onNavigate: (section: number) => void;
}

export function MindsetSection({ onNavigate }: MindsetSectionProps) {
  const swipeHandlers = useSwipe({
    onSwipeRight: () => onNavigate(3),
    onSwipeUp: () => onNavigate(0)
  });

  const getIconColor = (color: string) => {
    switch (color) {
      case 'neon-green': return 'text-green-400';
      case 'electric-blue': return 'text-blue-400';
      case 'hot-pink': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section 
      className="section-height relative px-4 py-8 flex flex-col justify-center"
      {...swipeHandlers}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/30 to-gray-900" />
      
      <div className="relative z-10 max-w-sm mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 glass rounded-2xl flex items-center justify-center animate-float">
            <i className="fas fa-crown text-3xl gradient-text" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-4">Own Your Future</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your unique mix of tech & business is your superpower in the new economy
          </p>
        </div>
        
        {/* Key Mindsets */}
        <div className="space-y-4 mb-8">
          {mindsetPrinciples.map((principle, index) => (
            <GlassCard key={index} className="p-4 text-left">
              <div className="flex items-center mb-2">
                <i className={`fas fa-${principle.icon} ${getIconColor(principle.color)} mr-3`} />
                <h3 className="font-semibold text-white">{principle.title}</h3>
              </div>
              <p className="text-gray-300 text-sm">{principle.description}</p>
            </GlassCard>
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="space-y-4">
          <Button className="w-full touch-target bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 hover:from-purple-600 hover:via-pink-600 hover:to-green-500 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 active:scale-95 animate-pulse border-0">
            Start Building Today 🔥
          </Button>
          
          <p className="text-gray-400 text-xs">
            Ready to bridge tech and business?<br />
            The future belongs to hybrid builders like you.
          </p>
        </div>
      </div>
    </section>
  );
}
