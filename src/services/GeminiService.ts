import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { GEMINI_MODEL_NAME, GEMINI_SYSTEM_INSTRUCTION, HERB_IMAGE_MAP, KNOWN_HERBS } from '../constants';
import type { ChatMessage } from "../types";

// Get API key from environment variables (works for both Vite and Create React App)
const getApiKey = () => {
  // For Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  // For Create React App (if process is available)
  if (typeof process !== 'undefined' && process.env) {
    return process.env.REACT_APP_GEMINI_API_KEY;
  }
  return null;
};

const API_KEY = getApiKey();

if (!API_KEY) {
  console.error("Gemini API key is not set. Please ensure VITE_GEMINI_API_KEY (Vite) or REACT_APP_GEMINI_API_KEY (CRA) environment variable is available.");
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

// Helper function to find an herb image from the AI's text
const findHerbImageDetails = (text: string): { imageUrl?: string; imageAltText?: string } => {
  if (!text) return {};
  const lowerText = text.toLowerCase();
  for (const herb of KNOWN_HERBS) {
    if (lowerText.includes(herb)) {
      const herbData = HERB_IMAGE_MAP[herb];
      if (herbData) {
        return { imageUrl: herbData.imageUrl, imageAltText: herbData.altText };
      }
    }
  }
  return {};
};

export class GeminiService {
  private model: GenerativeModel;

  constructor() {
    this.model = genAI.getGenerativeModel({ 
      model: GEMINI_MODEL_NAME,
      systemInstruction: GEMINI_SYSTEM_INSTRUCTION
    });
  }

  public async startChatWithSymptoms(
    symptoms: string, 
    categoryName?: string, 
    existingHistory?: ChatMessage[]
  ): Promise<ChatMessage> {
    if (!API_KEY) {
      return {
        id: crypto.randomUUID(),
        role: 'model',
        text: "Error: AI chat service could not be initialized. Please check API Key configuration.",
        timestamp: new Date(),
      };
    }
    
    let firstMessageContent = "";
    if (categoryName) {
      firstMessageContent = `The user selected symptom category: "${categoryName}".\nUser's symptoms: "${symptoms}"`;
    } else {
      firstMessageContent = `User's symptoms: "${symptoms}"`;
    }
    
    try {
      const aiTextResponse = await this.sendMessage(firstMessageContent, existingHistory);
      const imageDetails = findHerbImageDetails(aiTextResponse);

      return {
        id: crypto.randomUUID(),
        role: 'model',
        text: aiTextResponse,
        timestamp: new Date(),
        imageUrl: imageDetails.imageUrl,
        imageAltText: imageDetails.imageAltText,
      };
    } catch (error) {
      return {
        id: crypto.randomUUID(),
        role: 'model',
        text: "Sorry, I encountered an error while processing your symptoms. Please try again.",
        timestamp: new Date(),
      };
    }
  }

  public async sendMessage(message: string, history?: ChatMessage[]): Promise<string> {
    if (!API_KEY) {
      return "Error: Chat not initialized. Please ensure your API key is set up correctly.";
    }

    try {
      // Convert ChatMessage history to Gemini format
      const chatHistory = history?.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })) || [];

      // Create chat session with history
      const chat = this.model.startChat({
        history: chatHistory
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      if (error instanceof Error) {
        return `Sorry, I encountered an error: ${error.message}. Please try again.`;
      }
      return "Sorry, I encountered an unknown error. Please try again.";
    }
  }

  public async getStreamingResponse(
    message: string, 
    history: ChatMessage[],
    onChunk: (chunkText: string, imageDetails: { imageUrl?: string; imageAltText?: string }) => void,
    onError: (errorMsg: string) => void,
    onComplete: (finalText: string) => void
  ): Promise<void> {
    if (!API_KEY) {
      onError("API Key not configured.");
      onComplete("");
      return;
    }
    
    try {
      // Convert ChatMessage history to Gemini format
      const chatHistory = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      // Create chat session with history
      const chat = this.model.startChat({
        history: chatHistory
      });

      let fullResponseText = "";
      
      // Send streaming message
      const result = await chat.sendMessageStream(message);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          fullResponseText += chunkText;
          onChunk(chunkText, {}); // No image details per chunk
        }
      }
      
      // Process final response for images
      const imageDetails = findHerbImageDetails(fullResponseText);
      onComplete(fullResponseText);
      
    } catch (error) {
      console.error("Streaming error:", error);
      if (error instanceof Error) {
        onError(`Sorry, I encountered an error: ${error.message}.`);
      } else {
        onError("Sorry, I encountered an unknown error during streaming.");
      }
      onComplete("");
    }
  }
}