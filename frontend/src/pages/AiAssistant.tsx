import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from '../components/ChatMessage';
import { Message } from '../types';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      _id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      isAi: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Implement API call to your AI endpoint
      const response = await new Promise(resolve => setTimeout(() => {
        resolve({
          text: "I'm analyzing your message and will provide a detailed response shortly..."
        });
      }, 1000));

      const aiMessage: Message = {
        _id: (Date.now() + 1).toString(),
        text: (response as any).text,
        sender: 'ai',
        timestamp: new Date(),
        isAi: true
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-500 text-white">
          <h1 className="text-xl font-semibold">AI Assistant</h1>
          <p className="text-sm opacity-90">
            Ask questions about cancer treatment and care
          </p>
        </div>

        <div className="h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message._id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};