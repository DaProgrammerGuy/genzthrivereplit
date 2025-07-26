import { GlassCard } from "@/components/ui/glass-card";
import { SkillMeter } from "@/components/ui/skill-meter";
import { Button } from "@/components/ui/button";
import { skills } from "@/lib/roadmap-data";
import { useSwipe } from "@/hooks/use-swipe";

interface SkillsSectionProps {
  onNavigate: (section: number) => void;
}

export function SkillsSection({ onNavigate }: SkillsSectionProps) {
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => onNavigate(3),
    onSwipeRight: () => onNavigate(1),
    onSwipeUp: () => onNavigate(3)
  });

  const technicalSkills = skills.filter(skill => skill.category === 'technical');
  const businessSkills = skills.filter(skill => skill.category === 'business');
  const aiSkills = skills.filter(skill => skill.category === 'ai');

  const getIconByCategory = (category: string) => {
    switch (category) {
      case 'technical': return 'fa-code text-green-400';
      case 'business': return 'fa-chart-line text-pink-400';
      case 'ai': return 'fa-brain text-green-400';
      default: return 'fa-star text-gray-400';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'technical': return 'Technical Stack';
      case 'business': return 'Business Development';
      case 'ai': return 'AI Integration';
      default: return 'Skills';
    }
  };

  const getCategoryProgress = (categorySkills: typeof skills) => {
    const average = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
    return Math.round(average);
  };

  return (
    <section 
      className="section-height relative px-4 py-8 flex flex-col justify-center"
      {...swipeHandlers}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />
      
      <div className="relative z-10 max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-4">Skill Portfolio</h2>
          <p className="text-gray-300 text-sm">Track your tech-business evolution</p>
        </div>
        
        {/* Skill Categories */}
        <div className="space-y-6">
          {/* Technical Skills */}
          <GlassCard className="p-6">
            <div className="flex items-center mb-4">
              <i className={`fas ${getIconByCategory('technical')} text-xl mr-3`} />
              <h3 className="font-semibold text-white flex-1">{getCategoryTitle('technical')}</h3>
              <span className="text-green-400 text-sm font-medium">{getCategoryProgress(technicalSkills)}%</span>
            </div>
            <div className="space-y-3">
              {technicalSkills.map((skill) => (
                <SkillMeter key={skill.name} {...skill} />
              ))}
            </div>
          </GlassCard>
          
          {/* Business Skills */}
          <GlassCard className="p-6">
            <div className="flex items-center mb-4">
              <i className={`fas ${getIconByCategory('business')} text-xl mr-3`} />
              <h3 className="font-semibold text-white flex-1">{getCategoryTitle('business')}</h3>
              <span className="text-pink-400 text-sm font-medium">{getCategoryProgress(businessSkills)}%</span>
            </div>
            <div className="space-y-3">
              {businessSkills.map((skill) => (
                <SkillMeter key={skill.name} {...skill} />
              ))}
            </div>
          </GlassCard>
          
          {/* Future Skills */}
          <GlassCard className="p-6 border-2 border-green-400/30">
            <div className="flex items-center mb-4">
              <i className={`fas ${getIconByCategory('ai')} text-xl mr-3`} />
              <h3 className="font-semibold text-white flex-1">{getCategoryTitle('ai')}</h3>
              <span className="text-green-400 text-sm font-medium animate-pulse">Next Level</span>
            </div>
            <div className="text-center py-4">
              <p className="text-gray-300 text-sm mb-4">Unlock AI-powered business automation</p>
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium touch-target transform transition-all duration-200 active:scale-95 border-0">
                Start Learning
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
