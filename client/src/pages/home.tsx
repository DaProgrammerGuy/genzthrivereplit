import { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { ProgressSection } from "@/components/sections/progress-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { IncomeSection } from "@/components/sections/income-section";
import { MindsetSection } from "@/components/sections/mindset-section";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";
import { cn } from "@/lib/utils";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    HeroSection,
    ProgressSection, 
    SkillsSection,
    IncomeSection,
    MindsetSection
  ];

  const handleRefresh = async () => {
    // Simulate refresh - in a real app this would refetch data
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const pullToRefresh = usePullToRefresh({
    onRefresh: handleRefresh,
    threshold: 80
  });

  const navigateToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    const sectionElement = document.getElementById(`section-${sectionIndex}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track scroll position to update current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let currentSectionIndex = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionIndex = index;
        }
      });
      
      setCurrentSection(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add haptic feedback simulation for touch interactions
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.touch-target')) {
        // Simulate haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white overflow-x-hidden"
      {...pullToRefresh}
    >
      {/* Pull to refresh indicator */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-transform duration-300",
          pullToRefresh.showIndicator ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="glass-dark py-4 text-center">
          <i className={cn(
            "fas fa-sync-alt text-green-400",
            pullToRefresh.isRefreshing && "animate-spin"
          )} />
          <p className="text-white text-sm mt-2">
            {pullToRefresh.isRefreshing ? "Refreshing..." : "Pull to refresh"}
          </p>
        </div>
      </div>

      {/* Sections */}
      {sections.map((SectionComponent, index) => (
        <div
          key={index}
          id={`section-${index}`}
          data-section={index}
          className="w-full"
        >
          <SectionComponent onNavigate={navigateToSection} />
        </div>
      ))}

      {/* Bottom Navigation */}
      <BottomNav currentSection={currentSection} onNavigate={navigateToSection} />
    </div>
  );
}
