
import React from 'react';
import type { ChatMessage } from '../types';
import { UserIcon, BotIcon, LoadingDotsIcon } from './IconComponents'; 

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const bubbleClasses = isUser
    ? 'bg-blue-500 text-white self-end rounded-l-xl rounded-tr-xl'
    : 'bg-gray-200 text-gray-800 self-start rounded-r-xl rounded-tl-xl';
  
  const icon = isUser ? <UserIcon className="w-6 h-6 text-blue-500" /> : <BotIcon className="w-6 h-6 text-gray-500" />;
  const alignment = isUser ? 'items-end' : 'items-start';
  const bubbleContainer = isUser ? 'flex-row-reverse' : 'flex-row';

  const renderText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
            .replace(/\*(.*?)\*/g, '<em>$1</em>')       
        }}
      />
    ));
  };

  return (
    <div className={`flex ${bubbleContainer} w-full mb-4 items-start space-x-2 rtl:space-x-reverse`}>
      {!isUser && <div className="flex-shrink-0 mt-1">{icon}</div>}
      <div className={`flex flex-col ${alignment} max-w-xs md:max-w-md lg:max-w-lg`}>
        <div className={`px-4 py-3 ${bubbleClasses} shadow-md`}>
          {message.isLoading ? (
            <LoadingDotsIcon className="w-10 h-5 text-current" />
          ) : (
            renderText(message.text)
          )}
          {message.imageUrl && !message.isLoading && (
            <div className="mt-2.5">
              <img 
                src={message.imageUrl} 
                alt={message.imageAltText || 'Related image'} 
                className="rounded-lg max-w-full h-auto object-contain max-h-48" 
              />
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
       {isUser && <div className="flex-shrink-0 mt-1">{icon}</div>}
    </div>
  );
};