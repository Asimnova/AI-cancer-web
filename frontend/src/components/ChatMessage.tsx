import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.isAi;

  return (
    <div className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`flex max-w-[80%] ${
          isAi ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <div
          className={`flex items-center justify-center h-8 w-8 rounded-full ${
            isAi ? 'bg-blue-100 mr-2' : 'bg-green-100 ml-2'
          }`}
        >
          {isAi ? (
            <Bot className="h-5 w-5 text-blue-600" />
          ) : (
            <User className="h-5 w-5 text-green-600" />
          )}
        </div>
        <div
          className={`rounded-lg px-4 py-2 ${
            isAi
              ? 'bg-blue-50 text-gray-800'
              : 'bg-green-50 text-gray-800'
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <p className="text-xs text-gray-500 mt-1">
            {format(new Date(message.timestamp), 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
};