import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Discord webhook schema
export const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  webhookUrl: z
    .string()
    .min(1, { message: "Discord Webhook URL is required" })
    .url({ message: "Please enter a valid URL" })
    .refine(
      (url) => url.startsWith('https://discord.com/api/webhooks/'), 
      { message: "Please enter a valid Discord webhook URL" }
    ),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
