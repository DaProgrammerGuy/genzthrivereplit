import { ProgressBar } from "./progress-bar";
import { cn } from "@/lib/utils";

interface SkillMeterProps {
  name: string;
  level: number;
  color: string;
  className?: string;
}

const colorMap = {
  "neon-green": "from-green-400 to-emerald-500",
  "electric-blue": "from-blue-400 to-blue-600",
  "cyber-purple": "from-purple-400 to-violet-600",
  "hot-pink": "from-pink-400 to-rose-500"
};

export function SkillMeter({ name, level, color, className }: SkillMeterProps) {
  const gradient = colorMap[color as keyof typeof colorMap] || "from-gray-400 to-gray-600";

  return (
    <div className={cn("flex items-center justify-between text-sm", className)}>
      <span className="text-gray-300 flex-1">{name}</span>
      <div className="w-20 ml-3">
        <ProgressBar progress={level} gradient={gradient} size="sm" />
      </div>
    </div>
  );
}
