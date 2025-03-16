import { z } from "zod";

// Reusable validation schemas
export const usernameSchema = z.string().min(1, { message: "Username is required" });

export const passwordSchema = z.string().min(1, { message: "Password is required" });

export const discordWebhookSchema = z
  .string()
  .min(1, { message: "Discord Webhook URL is required" })
  .url({ message: "Please enter a valid URL" })
  .refine(
    (url) => url.startsWith('https://discord.com/api/webhooks/'), 
    { message: "Please enter a valid Discord webhook URL" }
  );
