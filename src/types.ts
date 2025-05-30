// Replace enums with const objects and type unions
export const AppScreen = {
  MainMenu: 'MainMenu',
  SymptomCheckerFlow: 'SymptomCheckerFlow', // This will encompass category, input, and chat
  EmergencyContacts: 'EmergencyContacts',
  HealthTips: 'HealthTips',
  USSDInfo: 'USSDInfo', // New screen for USSD information
} as const;

export type AppScreen = typeof AppScreen[keyof typeof AppScreen];

export interface SymptomCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isLoading?: boolean; // For model responses that are streaming or loading
  imageUrl?: string; // Optional URL for an image related to the message (e.g., herb image)
  imageAltText?: string; // Alt text for the image
}

// Simplified structure for AI advice, actual content comes as text from Gemini
export interface HealthAdvice {
  text: string;
  sources?: Array<{uri: string, title: string}>; // For Google Search grounding
}

export const SymptomFlowStep = {
  CategorySelection: 'CategorySelection',
  SymptomInput: 'SymptomInput',
  AIChat: 'AIChat',
} as const;

export type SymptomFlowStep = typeof SymptomFlowStep[keyof typeof SymptomFlowStep];