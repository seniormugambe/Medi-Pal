
import React, { useState, useEffect, useCallback } from 'react';
import { SymptomFlowStep, type SymptomCategory, type ChatMessage } from '../../types';
import { CategorySelection} from './CategorySelection';
import { SymptomInput } from './SymptomInput';
import { AIChatView } from './AIChatView';
import { GeminiService } from '../../services/GeminiService';
import { LoadingSpinner } from '../LoadingSpinner';
import { HERB_IMAGE_MAP, KNOWN_HERBS } from '../../constants'; // Import for image checking

interface SymptomCheckerFlowProps {
  geminiService: GeminiService;
  onFlowComplete: () => void; // To navigate back to main menu or similar
}

// Helper function (can be moved to a utils file or kept here if specific)
const findHerbImageDetailsInText = (text: string): { imageUrl?: string; imageAltText?: string } => {
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


export const SymptomCheckerFlow: React.FC<SymptomCheckerFlowProps> = ({ geminiService }) => {
  const [currentStep, setCurrentStep] = useState<SymptomFlowStep>(SymptomFlowStep.CategorySelection);
  const [selectedCategory, setSelectedCategory] = useState<SymptomCategory | null>(null);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialSymptoms, setInitialSymptoms] = useState<string | null>(null);

  const handleCategorySelect = (category: SymptomCategory) => {
    setSelectedCategory(category);
    setCurrentStep(SymptomFlowStep.SymptomInput);
  };

  const handleSkipCategory = () => {
    setSelectedCategory(null);
    setCurrentStep(SymptomFlowStep.SymptomInput);
  };
  
  const processInitialSymptoms = useCallback(async (symptoms: string) => {
    setIsLoading(true);
    setInitialSymptoms(symptoms); 

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: selectedCategory 
        ? `Category: ${selectedCategory.name}. Symptoms: ${symptoms}` 
        : `Symptoms: ${symptoms}`,
      timestamp: new Date(),
    };
    setConversation([userMessage]);

    let aiResponseTextAccumulated = '';
    const aiMessageId = crypto.randomUUID();

     setConversation(prev => [...prev, {
        id: aiMessageId,
        role: 'model',
        text: '',
        timestamp: new Date(),
        isLoading: true,
      }]);

    await geminiService.getStreamingResponse(
      symptoms, 
      [], 
      (chunk) => { // onChunk
        aiResponseTextAccumulated += chunk;
        setConversation(prev => prev.map(msg => 
            msg.id === aiMessageId ? {...msg, text: aiResponseTextAccumulated, isLoading: true} : msg
        ));
      },
      (errorMsg) => { // onError
        setConversation(prev => prev.map(msg => 
            msg.id === aiMessageId ? {...msg, text: errorMsg, isLoading: false} : msg
        ));
        setIsLoading(false);
      },
      (finalText) => { // onComplete
        const imageDetails = findHerbImageDetailsInText(finalText);
        setConversation(prev => prev.map(msg => 
            msg.id === aiMessageId ? {...msg, text: finalText, isLoading: false, imageUrl: imageDetails.imageUrl, imageAltText: imageDetails.imageAltText } : msg
        ));
        setIsLoading(false);
        setCurrentStep(SymptomFlowStep.AIChat);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geminiService, selectedCategory]);


  const handleSubmitSymptoms = async (symptoms: string) => {
    await processInitialSymptoms(symptoms);
  };

  const handleSendMessageInChat = async (messageText: string, currentHistory: ChatMessage[]) => {
    setIsLoading(true);
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: messageText,
      timestamp: new Date(),
    };
    setConversation(prev => [...prev, userMessage]);
    
    let aiResponseTextAccumulated = '';
    const aiMessageId = crypto.randomUUID();

    setConversation(prev => [...prev, {
        id: aiMessageId,
        role: 'model',
        text: '',
        timestamp: new Date(),
        isLoading: true,
    }]);

    // Pass a clean history, excluding any active loading messages
    const historyForApi = currentHistory.filter(m => !m.isLoading).map(m => ({...m, text: m.text}));

    await geminiService.getStreamingResponse(
      messageText,
      historyForApi, 
      (chunk) => { // onChunk
        aiResponseTextAccumulated += chunk;
         setConversation(prev => prev.map(msg => 
            msg.id === aiMessageId ? {...msg, text: aiResponseTextAccumulated, isLoading: true} : msg
        ));
      },
      (errorMsg) => { // onError
         setConversation(prev => prev.map(msg => 
            msg.id === aiMessageId ? {...msg, text: errorMsg, isLoading: false} : msg
        ));
        setIsLoading(false);
      },
      (finalText) => { // onComplete
        const imageDetails = findHerbImageDetailsInText(finalText);
        setConversation(prev => prev.map(msg => 
            msg.id === aiMessageId ? {...msg, text: finalText, isLoading: false, imageUrl: imageDetails.imageUrl, imageAltText: imageDetails.imageAltText } : msg
        ));
        setIsLoading(false);
      }
    );
  };
  
  const resetChatFlow = () => {
    setConversation([]);
    setSelectedCategory(null);
    setInitialSymptoms(null);
    setIsLoading(false);
    setCurrentStep(SymptomFlowStep.CategorySelection);
  };

  useEffect(() => {
    if (currentStep === SymptomFlowStep.SymptomInput && initialSymptoms && conversation.length === 0 && !isLoading) {
      // This logic is typically handled by handleSubmitSymptoms now.
    }
  }, [currentStep, initialSymptoms, conversation.length, isLoading]);


  if (isLoading && conversation.length === 0 && currentStep !== SymptomFlowStep.AIChat) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner text="Analyzing symptoms..." size="lg" /></div>;
  }

  switch (currentStep) {
    case SymptomFlowStep.CategorySelection:
      return <CategorySelection onSelectCategory={handleCategorySelect} onSkip={handleSkipCategory} />;
    case SymptomFlowStep.SymptomInput:
      return <SymptomInput selectedCategory={selectedCategory} onSubmitSymptoms={handleSubmitSymptoms} />;
    case SymptomFlowStep.AIChat:
      return (
        <AIChatView
          initialMessages={conversation}
          selectedCategory={selectedCategory}
          onSendMessage={handleSendMessageInChat}
          isLoading={isLoading && conversation[conversation.length-1]?.isLoading === true}
          onResetChat={resetChatFlow}
        />
      );
    default:
      return <p>Error: Unknown symptom checker step.</p>;
  }
};