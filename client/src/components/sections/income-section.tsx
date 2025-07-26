import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { IncomeCard } from "@/components/ui/income-card";
import { Button } from "@/components/ui/button";
import { incomeStreams } from "@/lib/roadmap-data";
import { useSwipe } from "@/hooks/use-swipe";

interface IncomeSectionProps {
  onNavigate: (section: number) => void;
}

export function IncomeSection({ onNavigate }: IncomeSectionProps) {
  const [activeStreams, setActiveStreams] = useState(
    incomeStreams.reduce((acc, stream) => ({
      ...acc,
      [stream.id]: stream.isActive
    }), {} as Record<string, boolean>)
  );

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => onNavigate(4),
    onSwipeRight: () => onNavigate(2),
    onSwipeUp: () => onNavigate(4)
  });

  const toggleStream = (streamId: string) => {
    setActiveStreams(prev => ({
      ...prev,
      [streamId]: !prev[streamId]
    }));
  };

  const calculateTotalIncome = () => {
    const activeStreamsList = incomeStreams.filter(stream => activeStreams[stream.id]);
    const minTotal = activeStreamsList.reduce((sum, stream) => sum + stream.minIncome, 0);
    const maxTotal = activeStreamsList.reduce((sum, stream) => sum + stream.maxIncome, 0);
    
    return { min: minTotal, max: maxTotal };
  };

  const formatIncome = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
    }
    return `$${amount}`;
  };

  const totalIncome = calculateTotalIncome();

  return (
    <section 
      className="section-height relative px-4 py-8 flex flex-col justify-center"
      {...swipeHandlers}
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/10 via-transparent to-green-400/10" />
      
      <div className="relative z-10 max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-4">Income Streams</h2>
          <p className="text-gray-300 text-sm">Build multiple revenue sources</p>
        </div>
        
        {/* Income Stream Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {incomeStreams.map((stream) => (
            <IncomeCard
              key={stream.id}
              {...stream}
              isActive={activeStreams[stream.id]}
              onClick={() => toggleStream(stream.id)}
            />
          ))}
        </div>
        
        {/* Total Potential */}
        <GlassCard className="p-6 text-center border-2 border-green-400/30">
          <h3 className="font-semibold text-white mb-2">Total Potential</h3>
          <p className="text-4xl font-bold gradient-text mb-4">
            {formatIncome(totalIncome.min)}-{formatIncome(totalIncome.max)}
          </p>
          <p className="text-gray-300 text-sm mb-4">Monthly passive income range</p>
          <Button className="w-full touch-target bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-xl font-semibold text-sm transform transition-all duration-200 active:scale-95 border-0">
            Build Your Stack
          </Button>
        </GlassCard>
      </div>
    </section>
  );
}
