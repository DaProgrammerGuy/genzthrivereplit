export interface RoadmapPhase {
  id: number;
  title: string;
  duration: string;
  description: string;
  progress: number;
  gradient: string;
  tasks: string[];
}

export interface Skill {
  name: string;
  category: 'technical' | 'business' | 'ai';
  level: number;
  color: string;
}

export interface IncomeStreamData {
  id: string;
  title: string;
  description: string;
  icon: string;
  minIncome: number;
  maxIncome: number;
  gradient: string;
  isActive: boolean;
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: "Foundation",
    duration: "Months 1-6",
    description: "Polish Python & Flask, master CRM tools, build your technical BD specialist brand",
    progress: 100,
    gradient: "from-neon-green to-electric-blue",
    tasks: [
      "Polish Python & Flask skills",
      "Learn SQL and data analytics",
      "Master CRM tools (HubSpot, Zoho, Salesforce)",
      "Build LinkedIn presence as Technical BD Specialist",
      "Create automated lead tracking project"
    ]
  },
  {
    id: 2,
    title: "Integration",
    duration: "Months 7-12",
    description: "Automate BD pipelines, start freelancing, build passive income streams",
    progress: 75,
    gradient: "from-electric-blue to-cyber-purple",
    tasks: [
      "Automate lead generation pipelines",
      "Start tech sales support freelancing",
      "Create proposal writing templates",
      "Build professional content presence",
      "Shadow solutions engineers"
    ]
  },
  {
    id: 3,
    title: "Expansion",
    duration: "Months 13-18",
    description: "Master AI integrations, lead high-value projects, launch SaaS MVP",
    progress: 50,
    gradient: "from-cyber-purple to-hot-pink",
    tasks: [
      "Learn APIs & integrations with Python and Zapier",
      "Integrate AI tools (chatbots, auto-emailers)",
      "Lead AI-driven lead scoring projects",
      "Launch micro-SaaS MVP",
      "Develop consulting offers"
    ]
  },
  {
    id: 4,
    title: "Scale & Pivot",
    duration: "Months 19-24",
    description: "Target hybrid leadership roles, scale passive income, gain industry visibility",
    progress: 25,
    gradient: "from-hot-pink to-neon-green",
    tasks: [
      "Target Solution Architect roles",
      "Build portfolio of tech-powered BD results",
      "Automate passive income streams",
      "Present at industry meetups",
      "Connect with startup founders and CTOs"
    ]
  }
];

export const skills: Skill[] = [
  { name: "Python & Flask", category: "technical", level: 85, color: "neon-green" },
  { name: "SQL & Analytics", category: "technical", level: 75, color: "electric-blue" },
  { name: "AWS/Azure", category: "technical", level: 65, color: "cyber-purple" },
  { name: "CRM Mastery", category: "business", level: 80, color: "hot-pink" },
  { name: "Lead Generation", category: "business", level: 60, color: "cyber-purple" },
  { name: "LinkedIn Outreach", category: "business", level: 70, color: "electric-blue" },
  { name: "AI Integration", category: "ai", level: 30, color: "neon-green" },
  { name: "Business Automation", category: "ai", level: 25, color: "hot-pink" }
];

export const incomeStreams: IncomeStreamData[] = [
  {
    id: "micro-saas",
    title: "Micro-SaaS",
    description: "BD Tools",
    icon: "cogs",
    minIncome: 0,
    maxIncome: 5000,
    gradient: "from-cyber-purple to-electric-blue",
    isActive: false
  },
  {
    id: "freelancing",
    title: "Freelancing",
    description: "Tech BD",
    icon: "laptop-code",
    minIncome: 1000,
    maxIncome: 3000,
    gradient: "from-hot-pink to-cyber-purple",
    isActive: true
  },
  {
    id: "digital-products",
    title: "Digital Products",
    description: "Guides & Templates",
    icon: "file-alt",
    minIncome: 500,
    maxIncome: 2000,
    gradient: "from-neon-green to-electric-blue",
    isActive: false
  },
  {
    id: "consulting",
    title: "Consulting",
    description: "BD Strategy",
    icon: "handshake",
    minIncome: 2000,
    maxIncome: 10000,
    gradient: "from-electric-blue to-hot-pink",
    isActive: false
  }
];

export const mindsetPrinciples = [
  {
    icon: "sync-alt",
    title: "Stay Adaptable",
    description: "AI changes everything - flexibility beats any job title",
    color: "neon-green"
  },
  {
    icon: "stream",
    title: "Diversify Income",
    description: "Job + freelance + products = financial security",
    color: "electric-blue"
  },
  {
    icon: "rocket",
    title: "Never Stop Building",
    description: "Your 6 years in tech are your advantage, not a setback",
    color: "hot-pink"
  }
];
