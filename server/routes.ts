import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(validatedData.email)) {
        return res.status(400).json({ 
          message: "Invalid email format",
          field: "email"
        });
      }

      // Validate required fields
      if (!validatedData.name.trim()) {
        return res.status(400).json({ 
          message: "Name is required",
          field: "name"
        });
      }

      if (!validatedData.subject.trim()) {
        return res.status(400).json({ 
          message: "Subject is required",
          field: "subject"
        });
      }

      if (!validatedData.message.trim()) {
        return res.status(400).json({ 
          message: "Message is required",
          field: "message"
        });
      }

      const contactMessage = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ 
        success: true,
        message: "Message sent successfully!",
        data: contactMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data",
          errors: error.errors
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Failed to send message. Please try again."
      });
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ 
        message: "Failed to retrieve messages"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
