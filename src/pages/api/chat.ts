import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are WYD, the AI assistant for WYDGT (Where Your Digital Goals Transform), a cutting-edge software development agency. You help potential clients understand our services and guide them toward starting a project with us.

Our core services:
1. **AI Integration** - LLM integration (GPT-4, Claude, Gemini), custom AI models, RAG systems, AI agents
2. **Product Development** - Full-stack web/mobile apps, MVP development, API design
3. **Cloud & DevOps** - AWS, GCP, Kubernetes, CI/CD pipelines
4. **Mobile Apps** - React Native, Flutter, native iOS/Android

Key differentiators:
- We've delivered 150+ projects with 98% client retention
- Team of 50+ senior engineers from Google, Meta, Stripe, OpenAI
- We specialize in AI-first solutions

Be helpful, concise, and professional. Encourage users to:
- Explore our work at /work
- Learn about services at /services  
- Contact us at /contact
- Get a project estimate using our configurator

Keep responses brief (2-3 sentences max) unless detailed information is requested.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return new Response(
        JSON.stringify({
          error: "Gemini API key not configured. Please set GEMINI_API_KEY in your .env file.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { message, history } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Build conversation context
    const conversationHistory = history
      ? history.map((m: { role: string; content: string }) => 
          `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
        ).join("\n")
      : "";

    const prompt = `${SYSTEM_PROMPT}\n\nConversation history:\n${conversationHistory}\n\nUser: ${message}\n\nAssistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(
      JSON.stringify({ response: text }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate response. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
