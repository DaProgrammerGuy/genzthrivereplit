import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  gradient?: string;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({ progress, className, gradient = "from-blue-500 to-purple-500", size = "md" }: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2", 
    lg: "h-3"
  };

  return (
    <div className={cn("bg-gray-700 rounded-full overflow-hidden", sizeClasses[size], className)}>
      <div
        className={cn("h-full bg-gradient-to-r transition-all duration-500", gradient)}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
}
