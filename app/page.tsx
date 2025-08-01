'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MessageList, { Message } from './components/MessageList';
import InputArea from './components/InputArea';
import ThemeToggle from './components/ThemeToggle';
import { useTransformHistory, TransformHistoryItem } from './hooks/useTransformHistory';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { sampleTexts } from './constants/sampleTexts';

type SensorLevel = 'mild' | 'medium' | 'raw';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sensorLevel, setSensorLevel] = useState<SensorLevel>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { history, addToHistory, clearHistory, removeFromHistory } = useTransformHistory();

  const handleTransform = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to transform');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setError('');
    const textToTransform = inputText;
    setInputText(''); // Clear input immediately

    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToTransform,
          sensorLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transform text');
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.transformed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Add to history
      addToHistory({
        original: textToTransform,
        transformed: data.transformed,
        sensorLevel,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleText = () => {
    const randomSample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setInputText(randomSample.text);
    setError('');
  };

  const handleClear = () => {
    setInputText('');
    setMessages([]);
    setError('');
  };

  const handleSelectHistoryItem = (item: TransformHistoryItem) => {
    // Add both messages from history
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: item.original,
      timestamp: new Date(),
    };
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: item.transformed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setSensorLevel(item.sensorLevel);
    setError('');
  };

  // Use keyboard shortcuts
  useKeyboardShortcuts({
    onTransform: handleTransform,
    onClear: handleClear,
  });

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        sensorLevel={sensorLevel}
        onSensorLevelChange={setSensorLevel}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onRemoveHistoryItem={removeFromHistory}
        onClearHistory={clearHistory}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 mr-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cartman-GPT</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chat with Eric Cartman from South Park
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleClear}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  title="Clear messages (Esc)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Message list */}
        <MessageList messages={messages} isLoading={isLoading} error={error} />

        {/* Input area */}
        <InputArea
          value={inputText}
          onChange={setInputText}
          onSubmit={handleTransform}
          onSampleText={handleSampleText}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}