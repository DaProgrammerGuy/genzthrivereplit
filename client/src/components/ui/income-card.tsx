import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";

interface IncomeCardProps {
  title: string;
  description: string;
  icon: string;
  minIncome: number;
  maxIncome: number;
  gradient: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

export function IncomeCard({ 
  title, 
  description, 
  icon, 
  minIncome, 
  maxIncome, 
  gradient, 
  isActive,
  onClick,
  className 
}: IncomeCardProps) {
  const formatIncome = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
    }
    return `$${amount}`;
  };

  const getIncomeColor = () => {
    if (gradient.includes("cyber-purple")) return "text-purple-400";
    if (gradient.includes("hot-pink")) return "text-pink-400";
    if (gradient.includes("neon-green")) return "text-green-400";
    if (gradient.includes("electric-blue")) return "text-blue-400";
    return "text-gray-400";
  };

  return (
    <GlassCard className={cn("p-4 text-center", className)} onClick={onClick}>
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-r",
        gradient
      )}>
        <i className={cn("fas", `fa-${icon}`, "text-white")} />
      </div>
      
      <h3 className="font-medium text-white text-sm mb-2">{title}</h3>
      <p className="text-gray-400 text-xs mb-3">{description}</p>
      
      <div className="flex items-center justify-center">
        <span className={cn("text-xs font-medium", getIncomeColor())}>
          {formatIncome(minIncome)}-{formatIncome(maxIncome)}/mo
        </span>
      </div>
      
      {isActive && (
        <div className="mt-2">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 ml-1">Active</span>
        </div>
      )}
    </GlassCard>
  );
}
