import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  phase: integer("phase").notNull(), // 1-4 for the roadmap phases
  progress: integer("progress").notNull().default(0), // 0-100 percentage
  completedTasks: jsonb("completed_tasks").default([]), // Array of completed task IDs
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skillProgress = pgTable("skill_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  skillCategory: text("skill_category").notNull(), // technical, business, ai
  skillName: text("skill_name").notNull(),
  level: integer("level").notNull().default(0), // 0-100 percentage
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const incomeStreams = pgTable("income_streams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  streamType: text("stream_type").notNull(), // saas, freelancing, digital_products, consulting
  isActive: integer("is_active").notNull().default(0), // 0 or 1 (boolean)
  monthlyRevenue: integer("monthly_revenue").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  updatedAt: true,
});

export const insertSkillProgressSchema = createInsertSchema(skillProgress).omit({
  id: true,
  updatedAt: true,
});

export const insertIncomeStreamSchema = createInsertSchema(incomeStreams).omit({
  id: true,
  updatedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type SkillProgress = typeof skillProgress.$inferSelect;
export type InsertSkillProgress = z.infer<typeof insertSkillProgressSchema>;
export type IncomeStream = typeof incomeStreams.$inferSelect;
export type InsertIncomeStream = z.infer<typeof insertIncomeStreamSchema>;
