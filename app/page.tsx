'use client';

import { useState } from 'react';

type SensorLevel = 'mild' | 'medium' | 'raw';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sensorLevel, setSensorLevel] = useState<SensorLevel>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTransform = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to transform');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          sensorLevel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transform text');
      }

      setOutputText(data.transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cartmanify
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Transform your polite text into Eric Cartman&apos;s speaking style
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your polite text
            </label>
            <textarea
              id="input"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your polite text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Sensor Level Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Sensor Level
            </h3>
            <div className="space-y-2">
              {['mild', 'medium', 'raw'].map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    name="sensorLevel"
                    value={level}
                    checked={sensorLevel === level}
                    onChange={(e) => setSensorLevel(e.target.value as SensorLevel)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {level}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {level === 'mild' && '(Family friendly)'}
                    {level === 'medium' && '(Partial censorship)'}
                    {level === 'raw' && '(Uncensored)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Transform Button */}
          <div className="flex justify-center">
            <button
              onClick={handleTransform}
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Transforming...' : 'Transform to Cartman'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Output Section */}
          {outputText && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cartman says:
                </label>
                <button
                  onClick={handleCopy}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Copy to clipboard
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {outputText}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>
          Made with Next.js and OpenAI | Not affiliated with South Park
        </p>
      </footer>
    </div>
  );
}