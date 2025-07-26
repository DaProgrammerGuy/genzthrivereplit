import { 
  type User, 
  type InsertUser,
  type UserProgress,
  type InsertUserProgress,
  type SkillProgress,
  type InsertSkillProgress,
  type IncomeStream,
  type InsertIncomeStream,
  users,
  userProgress,
  skillProgress,
  incomeStreams
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProgress(userId: string): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getUserSkills(userId: string): Promise<SkillProgress[]>;
  updateSkillProgress(skill: InsertSkillProgress): Promise<SkillProgress>;
  getUserIncomeStreams(userId: string): Promise<IncomeStream[]>;
  updateIncomeStream(stream: InsertIncomeStream): Promise<IncomeStream>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [existingProgress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, progress.userId), eq(userProgress.phase, progress.phase)));

    if (existingProgress) {
      const [updatedProgress] = await db
        .update(userProgress)
        .set({ progress: progress.progress, completedTasks: progress.completedTasks })
        .where(eq(userProgress.id, existingProgress.id))
        .returning();
      return updatedProgress;
    } else {
      const [newProgress] = await db
        .insert(userProgress)
        .values(progress)
        .returning();
      return newProgress;
    }
  }

  async getUserSkills(userId: string): Promise<SkillProgress[]> {
    return await db.select().from(skillProgress).where(eq(skillProgress.userId, userId));
  }

  async updateSkillProgress(skill: InsertSkillProgress): Promise<SkillProgress> {
    const [existingSkill] = await db
      .select()
      .from(skillProgress)
      .where(and(eq(skillProgress.userId, skill.userId), eq(skillProgress.skillName, skill.skillName)));

    if (existingSkill) {
      const [updatedSkill] = await db
        .update(skillProgress)
        .set({ level: skill.level })
        .where(eq(skillProgress.id, existingSkill.id))
        .returning();
      return updatedSkill;
    } else {
      const [newSkill] = await db
        .insert(skillProgress)
        .values(skill)
        .returning();
      return newSkill;
    }
  }

  async getUserIncomeStreams(userId: string): Promise<IncomeStream[]> {
    return await db.select().from(incomeStreams).where(eq(incomeStreams.userId, userId));
  }

  async updateIncomeStream(stream: InsertIncomeStream): Promise<IncomeStream> {
    const [existingStream] = await db
      .select()
      .from(incomeStreams)
      .where(and(eq(incomeStreams.userId, stream.userId), eq(incomeStreams.streamType, stream.streamType)));

    if (existingStream) {
      const [updatedStream] = await db
        .update(incomeStreams)
        .set({ isActive: stream.isActive, monthlyRevenue: stream.monthlyRevenue })
        .where(eq(incomeStreams.id, existingStream.id))
        .returning();
      return updatedStream;
    } else {
      const [newStream] = await db
        .insert(incomeStreams)
        .values(stream)
        .returning();
      return newStream;
    }
  }
}

export const storage = new DatabaseStorage();
