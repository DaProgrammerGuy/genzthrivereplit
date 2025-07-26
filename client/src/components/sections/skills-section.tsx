import { GlassCard } from "@/components/ui/glass-card";
import { SkillMeter } from "@/components/ui/skill-meter";
import { Button } from "@/components/ui/button";
import { skills } from "@/lib/roadmap-data";
import { useSwipe } from "@/hooks/use-swipe";
import { useUserSkills, useUpdateSkill } from "@/hooks/use-roadmap-data";

interface SkillsSectionProps {
  onNavigate: (section: number) => void;
}

export function SkillsSection({ onNavigate }: SkillsSectionProps) {
  const { data: userSkills, isLoading } = useUserSkills();
  const updateSkillMutation = useUpdateSkill();

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => onNavigate(3),
    onSwipeRight: () => onNavigate(1),
    onSwipeUp: () => onNavigate(3)
  });

  const getSkillsForCategory = (category: string) => {
    return skills.filter(skill => skill.category === category).map(skill => {
      const userSkill = userSkills?.find((us: any) => us.skillName === skill.name);
      return {
        ...skill,
        level: userSkill?.level || skill.level
      };
    });
  };

  const technicalSkills = getSkillsForCategory('technical');
  const businessSkills = getSkillsForCategory('business');
  const aiSkills = getSkillsForCategory('ai');

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

  const getCategoryProgress = (categorySkills: any[]) => {
    if (categorySkills.length === 0) return 0;
    const average = categorySkills.reduce((sum: number, skill: any) => sum + skill.level, 0) / categorySkills.length;
    return Math.round(average);
  };

  const handleSkillClick = (skillName: string, category: string, currentLevel: number) => {
    const nextLevel = Math.min(currentLevel + 10, 100);
    updateSkillMutation.mutate({
      skillCategory: category,
      skillName,
      level: nextLevel
    });
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
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-700/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
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
                  <SkillMeter 
                    key={skill.name} 
                    {...skill} 
                    onClick={() => handleSkillClick(skill.name, 'technical', skill.level)}
                  />
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
                  <SkillMeter 
                    key={skill.name} 
                    {...skill} 
                    onClick={() => handleSkillClick(skill.name, 'business', skill.level)}
                  />
                ))}
              </div>
            </GlassCard>
            
            {/* AI Skills */}
            <GlassCard className="p-6">
              <div className="flex items-center mb-4">
                <i className={`fas ${getIconByCategory('ai')} text-xl mr-3`} />
                <h3 className="font-semibold text-white flex-1">{getCategoryTitle('ai')}</h3>
                <span className="text-green-400 text-sm font-medium">{getCategoryProgress(aiSkills)}%</span>
              </div>
              <div className="space-y-3 mb-4">
                {aiSkills.map((skill) => (
                  <SkillMeter 
                    key={skill.name} 
                    {...skill} 
                    onClick={() => handleSkillClick(skill.name, 'ai', skill.level)}
                  />
                ))}
              </div>
              <div className="text-center py-4 border-t border-gray-700/50">
                <p className="text-gray-300 text-sm mb-4">Connect with the developer</p>
                <Button 
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium touch-target transform transition-all duration-200 active:scale-95 border-0"
                  onClick={() => window.open('https://linkedin.com/in/uzair-ahmed-me/', '_blank')}
                >
                  Start Learning
                </Button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </section>
  );
}
