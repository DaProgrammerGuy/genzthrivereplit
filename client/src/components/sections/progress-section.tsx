import { GlassCard } from "@/components/ui/glass-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { roadmapPhases } from "@/lib/roadmap-data";
import { useSwipe } from "@/hooks/use-swipe";
import { cn } from "@/lib/utils";
import { useUserProgress, useUpdateProgress } from "@/hooks/use-roadmap-data";

interface ProgressSectionProps {
  onNavigate: (section: number) => void;
}

export function ProgressSection({ onNavigate }: ProgressSectionProps) {
  const { data: userProgress, isLoading } = useUserProgress();
  const updateProgressMutation = useUpdateProgress();

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => onNavigate(2),
    onSwipeRight: () => onNavigate(0),
    onSwipeUp: () => onNavigate(2)
  });

  const getGradientClasses = (gradient: string) => {
    const gradientMap = {
      "from-neon-green to-electric-blue": "from-green-400 to-blue-500",
      "from-electric-blue to-cyber-purple": "from-blue-500 to-purple-500",
      "from-cyber-purple to-hot-pink": "from-purple-500 to-pink-500",
      "from-hot-pink to-neon-green": "from-pink-500 to-green-400"
    };
    return gradientMap[gradient as keyof typeof gradientMap] || "from-blue-500 to-purple-500";
  };

  const getPhasesWithProgress = () => {
    if (!userProgress) return roadmapPhases;
    
    return roadmapPhases.map(phase => {
      const userPhase = userProgress.find((up: any) => up.phase === phase.id);
      return {
        ...phase,
        progress: userPhase?.progress || phase.progress
      };
    });
  };

  const handlePhaseClick = (phaseId: number, currentProgress: number) => {
    const nextProgress = Math.min(currentProgress + 10, 100);
    updateProgressMutation.mutate({
      phase: phaseId,
      progress: nextProgress,
      completedTasks: []
    });
  };

  return (
    <section 
      className="section-height relative px-4 py-8 flex flex-col justify-center"
      {...swipeHandlers}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/20 to-transparent" />
      
      <div className="relative z-10 max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-4">Your 2-Year Plan</h2>
          <p className="text-gray-300 text-sm">Transform from tech expert to business leader</p>
        </div>
        
        {/* Progress Cards */}
        {isLoading ? (
          <div className="space-y-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-700/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {getPhasesWithProgress().map((phase) => (
              <GlassCard 
                key={phase.id} 
                className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => handlePhaseClick(phase.id, phase.progress)}
              >
                <div className="flex items-center mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-gradient-to-r",
                    getGradientClasses(phase.gradient)
                  )}>
                    <span className="text-white font-bold">{phase.id}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{phase.title}</h3>
                    <p className="text-gray-400 text-sm">{phase.duration}</p>
                  </div>
                  <div className="w-16">
                    <ProgressBar 
                      progress={phase.progress} 
                      gradient={getGradientClasses(phase.gradient)}
                      size="sm"
                    />
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{phase.description}</p>
              </GlassCard>
            ))}
          </div>
        )}
        
        {/* Action Button */}
        <Button className="w-full touch-target bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-2xl font-semibold shadow-lg transform transition-all duration-200 active:scale-95 border-0">
          Explore Detailed Roadmap
        </Button>
      </div>
    </section>
  );
}
