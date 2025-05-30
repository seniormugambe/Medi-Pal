
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, SymptomCategory } from '../../types';
import { ChatBubble } from '../ChatBubble';
import { Button } from '../Button';
import { SendIcon } from '../IconComponents';
import { LoadingSpinner } from '../LoadingSpinner';

interface AIChatViewProps {
  initialMessages: ChatMessage[];
  selectedCategory?: SymptomCategory | null; // For context, if needed
  onSendMessage: (message: string, currentHistory: ChatMessage[]) => Promise<void>; // Returns new AI response
  isLoading: boolean;
  onResetChat: () => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({
  initialMessages,
  // selectedCategory, // Could be used to display context
  onSendMessage,
  isLoading,
  onResetChat
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages); // Sync with parent state if initialMessages change
  }, [initialMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: userInput.trim(),
      timestamp: new Date(),
    };
    
    const currentInput = userInput.trim();
    setUserInput(''); 
    await onSendMessage(currentInput, messages); 
  };
  
  const handleQuickAction = async (promptText: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: promptText,
      timestamp: new Date(),
    };
    await onSendMessage(promptText, messages);
  };


  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-2xl mx-auto flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">AI Health Consultation</h2>
      
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length-1]?.role === 'user' && ( 
           <ChatBubble key="loading" message={{id: "loading", role: "model", text: "", timestamp: new Date(), isLoading: true}} />
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mb-3 flex flex-wrap gap-2 justify-center">
          <Button size="sm" variant="ghost" onClick={() => handleQuickAction("What are some general self-care or remedy ideas for these symptoms?")}>General self-care/remedy ideas?</Button>
          <Button size="sm" variant="ghost" onClick={() => handleQuickAction("When should I see a health professional for these symptoms?")}>When to see a health professional?</Button>
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center border-t border-gray-200 pt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message or ask a question..."
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="rounded-l-none !py-3.5"
          disabled={isLoading || !userInput.trim()}
          aria-label="Send message"
        >
          {isLoading ? <LoadingSpinner size="sm" color="text-white"/> : <SendIcon className="w-5 h-5"/>}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Button variant="secondary" size="sm" onClick={onResetChat}>
            Start New Symptom Check
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">
        AI responses are for informational purposes only and not medical or herbalist advice. Always consult appropriate qualified professionals.
      </p>
    </div>
  );
};
