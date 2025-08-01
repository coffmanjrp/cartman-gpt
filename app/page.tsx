'use client';

import { useState } from 'react';
import TextArea from './components/TextArea';
import OutputDisplay from './components/OutputDisplay';
import TransformHistory from './components/TransformHistory';
import { useTransformHistory, TransformHistoryItem } from './hooks/useTransformHistory';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { sampleTexts } from './constants/sampleTexts';
import ThemeToggle from './components/ThemeToggle';

type SensorLevel = 'mild' | 'medium' | 'raw';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sensorLevel, setSensorLevel] = useState<SensorLevel>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const { history, addToHistory, clearHistory, removeFromHistory } = useTransformHistory();

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

      // Add to history
      addToHistory({
        original: inputText,
        transformed: data.transformed,
        sensorLevel,
      });

      // Reset retry count on success
      setRetryCount(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setRetryCount((prev) => prev + 1);
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
    setOutputText('');
    setError('');
    setRetryCount(0);
  };

  const handleNewTransform = () => {
    setOutputText('');
    setError('');
    setRetryCount(0);
  };

  const handleSelectHistoryItem = (item: TransformHistoryItem) => {
    setInputText(item.original);
    setOutputText(item.transformed);
    setSensorLevel(item.sensorLevel);
    setError('');
  };

  const handleRetry = () => {
    handleTransform();
  };

  // Use keyboard shortcuts
  useKeyboardShortcuts({
    onTransform: handleTransform,
    onClear: handleClear,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cartmanify</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Transform your polite text into Eric Cartman&apos;s speaking style
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your polite text
            </label>
            <TextArea value={inputText} onChange={setInputText} onSampleText={handleSampleText} />
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
                  <span className="text-gray-700 dark:text-gray-300 capitalize">{level}</span>
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
              <div className="flex justify-between items-center">
                <span>{error}</span>
                {retryCount > 0 && (
                  <button onClick={handleRetry} className="text-sm underline hover:no-underline">
                    Retry
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Output Section */}
          {outputText && <OutputDisplay text={outputText} onNewTransform={handleNewTransform} />}

          {/* History Section */}
          <TransformHistory
            history={history}
            onSelectItem={handleSelectHistoryItem}
            onRemoveItem={removeFromHistory}
            onClearHistory={clearHistory}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Made with Next.js and OpenAI | Not affiliated with South Park</p>
        <p className="mt-2 text-xs">
          Keyboard shortcuts:{' '}
          <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600">
            Ctrl
          </kbd>
          {' + '}
          <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600">
            Enter
          </kbd>
          {' to transform, '}
          <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600">
            Esc
          </kbd>
          {' to clear'}
        </p>
      </footer>
    </div>
  );
}
