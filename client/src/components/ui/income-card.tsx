// components/ui/income-card.tsx - Fixed to handle undefined gradient
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IncomeCardProps {
  id: string;
  title: string;
  icon: string;
  maxIncome: number;
  description?: string;
  gradient?: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function IncomeCard({
  id,
  title,
  icon,
  maxIncome,
  description,
  gradient,
  isActive,
  onClick,
  disabled = false
}: IncomeCardProps) {
  
  const getIncomeColor = () => {
    if (!gradient) {
      // Default colors if gradient is not provided
      return "text-blue-400";
    }
    
    if (gradient.includes("cyber-purple")) return "text-purple-400";
    if (gradient.includes("hot-pink")) return "text-pink-400";
    if (gradient.includes("neon-green")) return "text-green-400";
    if (gradient.includes("electric-blue")) return "text-blue-400";
    return "text-gray-400";
  };

  const getGradientClasses = () => {
    if (!gradient) {
      // Default gradient if not provided
      return "from-blue-500/20 to-purple-500/20";
    }
    return gradient;
  };

  const formatIncome = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
    }
    return `$${amount}`;
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-0 transition-all duration-300 cursor-pointer touch-target",
        "bg-gradient-to-br",
        getGradientClasses(),
        isActive 
          ? "ring-2 ring-green-400/50 bg-opacity-80" 
          : "hover:bg-opacity-70",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          <div className={cn(
            "w-3 h-3 rounded-full transition-colors",
            isActive ? "bg-green-400" : "bg-gray-500"
          )} />
        </div>
        
        <h3 className="font-semibold text-white text-sm mb-1 leading-tight">
          {title}
        </h3>
        
        <p className={cn("text-xs mb-2", getIncomeColor())}>
          Up to {formatIncome(maxIncome)}/mo
        </p>
        
        {description && (
          <p className="text-xs text-gray-300 line-clamp-2">
            {description}
          </p>
        )}
        
        {isActive && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </Card>
  );
}