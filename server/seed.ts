import { db } from "./db";
import { users, userProgress, skillProgress, incomeStreams } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Create demo user
    const [user] = await db
      .insert(users)
      .values({
        username: "demo_user",
        password: "hashed_password" // In production, use proper hashing
      })
      .returning()
      .catch(() => [null]); // Ignore if user already exists

    if (!user) {
      console.log("Demo user already exists, skipping seed...");
      return;
    }

    console.log("Created demo user:", user.id);

    // Seed roadmap progress
    const progressData = [
      { userId: user.id, phase: 1, progress: 100, completedTasks: ["python-flask", "crm-setup"] },
      { userId: user.id, phase: 2, progress: 75, completedTasks: ["automation-pipeline"] },
      { userId: user.id, phase: 3, progress: 50, completedTasks: [] },
      { userId: user.id, phase: 4, progress: 25, completedTasks: [] }
    ];

    await db.insert(userProgress).values(progressData);

    // Seed skills
    const skillsData = [
      { userId: user.id, skillCategory: "technical", skillName: "Python & Flask", level: 85 },
      { userId: user.id, skillCategory: "technical", skillName: "SQL & Analytics", level: 75 },
      { userId: user.id, skillCategory: "technical", skillName: "AWS/Azure", level: 65 },
      { userId: user.id, skillCategory: "business", skillName: "CRM Mastery", level: 80 },
      { userId: user.id, skillCategory: "business", skillName: "Lead Generation", level: 60 },
      { userId: user.id, skillCategory: "business", skillName: "LinkedIn Outreach", level: 70 },
      { userId: user.id, skillCategory: "ai", skillName: "AI Integration", level: 30 },
      { userId: user.id, skillCategory: "ai", skillName: "Business Automation", level: 25 }
    ];

    await db.insert(skillProgress).values(skillsData);

    // Seed income streams
    const incomeData = [
      { userId: user.id, streamType: "micro-saas", isActive: 0, monthlyRevenue: 0 },
      { userId: user.id, streamType: "freelancing", isActive: 1, monthlyRevenue: 1500 },
      { userId: user.id, streamType: "digital-products", isActive: 0, monthlyRevenue: 0 },
      { userId: user.id, streamType: "consulting", isActive: 0, monthlyRevenue: 0 }
    ];

    await db.insert(incomeStreams).values(incomeData);

    console.log("Database seeded successfully!");
    return user;
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}