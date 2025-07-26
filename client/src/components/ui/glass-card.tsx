import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  onClick?: () => void;
}

export function GlassCard({ children, className, variant = "dark", onClick }: GlassCardProps) {
  const baseClasses = "rounded-2xl backdrop-blur-lg border transition-all duration-200";
  const variantClasses = {
    light: "bg-white/10 border-white/20",
    dark: "bg-black/30 border-white/10"
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        onClick && "touch-target transform active:scale-95 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
