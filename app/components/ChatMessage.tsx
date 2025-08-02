'use client';

import Image from 'next/image';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  emotion?: 'neutral' | 'laughing' | 'surprised' | 'angry' | 'sad';
}

export default function ChatMessage({ role, content, timestamp, emotion = 'neutral' }: ChatMessageProps) {
  const isUser = role === 'user';

  // Map emotions to avatar images
  const getAvatarImage = () => {
    if (isUser) return null;
    
    switch (emotion) {
      case 'laughing':
        return '/cartman_1.png';
      case 'surprised':
        return '/cartman_2.png';
      case 'angry':
        return '/cartman_3.png';
      case 'sad':
        return '/cartman_4.png';
      case 'neutral':
      default:
        return '/cartman_0.png';
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <Image
            src={getAvatarImage() || '/cartman_0.png'}
            alt="Cartman"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
        }`}
      >
        <p className="text-sm font-medium mb-1">{isUser ? 'You' : 'Cartman'}</p>
        <p className="whitespace-pre-wrap break-words">{content}</p>
        {timestamp && (
          <p
            className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
}
