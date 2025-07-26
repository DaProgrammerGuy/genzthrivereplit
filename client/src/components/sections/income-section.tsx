import { GlassCard } from "@/components/ui/glass-card";
import { IncomeCard } from "@/components/ui/income-card";
import { Button } from "@/components/ui/button";
import { incomeStreams, IncomeStreamData } from "@/lib/roadmap-data";
import { useSwipe } from "@/hooks/use-swipe";
import { useUserIncomeStreams, useUpdateIncomeStream } from "@/hooks/use-roadmap-data";
import React from "react";
import { getUserData } from "@/lib/local-storage";

interface IncomeSectionProps {
  onNavigate: (section: number) => void;
}

export function IncomeSection({ onNavigate }: IncomeSectionProps) {
  const { data: userIncomeStreams, isLoading } = useUserIncomeStreams();
  const updateIncomeStreamMutation = useUpdateIncomeStream();

  // Debug log to check what data is being used
  console.log('userIncomeStreams:', userIncomeStreams);
  console.log('static incomeStreams:', incomeStreams);

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => onNavigate(4),
    onSwipeRight: () => onNavigate(2),
    onSwipeUp: () => onNavigate(4)
  });

  const getUserId = () => {
    try {
      const userData = getUserData();
      return userData?.userId || 'demo_user';
    } catch (error) {
      return 'demo_user';
    }
  };

  const toggleStream = async (streamType: string) => {
    try {
      const currentStream = userIncomeStreams?.find((s: any) => s.streamType === streamType);
      const userId = getUserId();
      
      if (currentStream) {
        // Toggle the existing stream
        await updateIncomeStreamMutation.mutateAsync({
          userId: userId,
          streamType,
          isActive: !currentStream.isActive, // Toggle boolean
          monthlyRevenue: currentStream.monthlyRevenue || 0
        });
      } else {
        // Create new stream if it doesn't exist
        await updateIncomeStreamMutation.mutateAsync({
          userId: userId,
          streamType,
          isActive: true,
          monthlyRevenue: 0
        });
      }
    } catch (error) {
      console.error('Failed to toggle stream:', error);
    }
  };

  const calculateTotalPotential = () => {
    if (!userIncomeStreams || !Array.isArray(userIncomeStreams)) {
      console.log('No user income streams data');
      return 0;
    }
    
    try {
      // Find all active streams and get their maxIncome from static data
      const activeStreamTypes = userIncomeStreams
        .filter((s: any) => s && s.isActive === true)
        .map((s: any) => s.streamType);
      
      console.log('Active stream types:', activeStreamTypes);
      
      // Sum their maxIncome from the static incomeStreams data
      const total = incomeStreams
        .filter((s: IncomeStreamData) => activeStreamTypes.includes(s.id))
        .reduce((sum, stream) => sum + (stream.maxIncome || 0), 0);
      
      console.log('Total potential calculated:', total);
      return total;
    } catch (error) {
      console.error('Error calculating total potential:', error);
      return 0;
    }
  };

  const formatIncome = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
    }
    return `$${amount}`;
  };

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
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-700/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {incomeStreams.map((stream) => {
              // Find the corresponding user stream data
              const userStream = userIncomeStreams?.find((us: any) => us && us.streamType === stream.id);
              const isActive = userStream?.isActive === true;
              
              console.log(`Stream ${stream.id}:`, { userStream, isActive });
              
              return (
                <IncomeCard
                  key={stream.id}
                  {...stream}
                  isActive={isActive}
                  onClick={() => toggleStream(stream.id)}
                  disabled={updateIncomeStreamMutation.isLoading}
                />
              );
            })}
          </div>
        )}
        
        {/* Total Potential */}
        <GlassCard className="p-6 text-center border-2 border-green-400/30">
          <h3 className="font-semibold text-white mb-2">Total Potential</h3>
          <p className="text-4xl font-bold gradient-text mb-4">
            {formatIncome(calculateTotalPotential())}
          </p>
          <p className="text-gray-300 text-sm mb-4">Monthly passive income potential</p>
          <Button 
            className="w-full touch-target bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-xl font-semibold text-sm transform transition-all duration-200 active:scale-95 border-0"
            disabled={isLoading || updateIncomeStreamMutation.isLoading}
          >
            {updateIncomeStreamMutation.isLoading ? 'Updating...' : 'Build Your Stack'}
          </Button>
        </GlassCard>
      </div>
    </section>
  );
}