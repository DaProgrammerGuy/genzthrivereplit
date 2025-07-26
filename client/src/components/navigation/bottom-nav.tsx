import { cn } from "@/lib/utils";

interface BottomNavProps {
  currentSection: number;
  onNavigate: (section: number) => void;
}

const navItems = [
  { icon: "fa-home", label: "Home", section: 0 },
  { icon: "fa-road", label: "Roadmap", section: 1 },
  { icon: "fa-chart-bar", label: "Skills", section: 2 },
  { icon: "fa-dollar-sign", label: "Income", section: 3 },
  { icon: "fa-lightbulb", label: "Mindset", section: 4 }
];

export function BottomNav({ currentSection, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-dark border-t border-white/10">
        <div className="flex items-center justify-around py-3 px-4 max-w-sm mx-auto">
          {navItems.map((item) => (
            <button
              key={item.section}
              className="flex flex-col items-center touch-target transform transition-all duration-200 active:scale-95"
              onClick={() => onNavigate(item.section)}
            >
              <i className={cn(
                "fas", 
                item.icon, 
                "text-lg mb-1 transition-colors duration-200",
                currentSection === item.section ? "text-purple-400" : "text-gray-400"
              )} />
              <span className={cn(
                "text-xs transition-colors duration-200",
                currentSection === item.section ? "text-purple-400" : "text-gray-400"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
