// Local storage utilities for frontend-only deployment
export interface UserData {
  progress: Array<{
    phase: number;
    progress: number;
    completedTasks: string[];
  }>;
  skills: Array<{
    skillCategory: string;
    skillName: string;
    level: number;
  }>;
  incomeStreams: Array<{
    streamType: string;
    isActive: boolean;
    monthlyRevenue: number;
  }>;
}

const STORAGE_KEY = 'genz-roadmap-data';

export function getUserData(): UserData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error loading user data from localStorage:', error);
  }
  
  // Return default data
  return {
    progress: [
      { phase: 1, progress: 100, completedTasks: [] },
      { phase: 2, progress: 75, completedTasks: [] },
      { phase: 3, progress: 50, completedTasks: [] },
      { phase: 4, progress: 25, completedTasks: [] }
    ],
    skills: [
      { skillCategory: 'technical', skillName: 'Python & Flask', level: 85 },
      { skillCategory: 'technical', skillName: 'SQL & Analytics', level: 75 },
      { skillCategory: 'technical', skillName: 'AWS/Azure', level: 65 },
      { skillCategory: 'business', skillName: 'CRM Mastery', level: 80 },
      { skillCategory: 'business', skillName: 'Lead Generation', level: 60 },
      { skillCategory: 'business', skillName: 'LinkedIn Outreach', level: 70 },
      { skillCategory: 'ai', skillName: 'AI Integration', level: 30 },
      { skillCategory: 'ai', skillName: 'Business Automation', level: 25 }
    ],
    incomeStreams: [
      { streamType: 'micro-saas', isActive: false, monthlyRevenue: 0 },
      { streamType: 'freelancing', isActive: true, monthlyRevenue: 1500 },
      { streamType: 'digital-products', isActive: false, monthlyRevenue: 0 },
      { streamType: 'consulting', isActive: false, monthlyRevenue: 0 }
    ]
  };
}

export function saveUserData(data: UserData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Error saving user data to localStorage:', error);
  }
}

export function updateSkillLevel(skillName: string, level: number): void {
  const data = getUserData();
  const skill = data.skills.find(s => s.skillName === skillName);
  if (skill) {
    skill.level = level;
    saveUserData(data);
  }
}

export function updateIncomeStream(streamType: string, isActive: boolean, monthlyRevenue?: number): void {
  const data = getUserData();
  const stream = data.incomeStreams.find(s => s.streamType === streamType);
  if (stream) {
    stream.isActive = isActive;
    if (monthlyRevenue !== undefined) {
      stream.monthlyRevenue = monthlyRevenue;
    }
    saveUserData(data);
  }
}

export function updatePhaseProgress(phase: number, progress: number, completedTasks?: string[]): void {
  const data = getUserData();
  const phaseData = data.progress.find(p => p.phase === phase);
  if (phaseData) {
    phaseData.progress = progress;
    if (completedTasks) {
      phaseData.completedTasks = completedTasks;
    }
    saveUserData(data);
  }
}