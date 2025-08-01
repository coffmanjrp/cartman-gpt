'use client';

import { useState, KeyboardEvent } from 'react';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSampleText: () => void;
  isLoading: boolean;
}

export default function InputArea({
  value,
  onChange,
  onSubmit,
  onSampleText,
  isLoading,
}: InputAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  const maxLength = 500;
  const remainingChars = maxLength - value.length;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div
          className={`relative rounded-lg border ${
            isFocused
              ? 'border-blue-500 ring-2 ring-blue-500/20'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-800 transition-all`}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message to Cartman..."
            maxLength={maxLength}
            disabled={isLoading}
            className="w-full px-4 py-3 pr-32 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none disabled:opacity-50"
            rows={3}
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <span className={`text-xs ${remainingChars < 50 ? 'text-red-500' : 'text-gray-400'}`}>
              {remainingChars}
            </span>
            <button
              onClick={onSampleText}
              disabled={isLoading}
              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Load sample text"
            >
              Sample
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading || !value.trim()}
              className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Transform text (Enter)"
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <p>
            Press{' '}
            <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600">
              Enter
            </kbd>{' '}
            to send •{' '}
            <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600">
              Shift + Enter
            </kbd>{' '}
            for new line
          </p>
          <p>Cartman-GPT can make mistakes.</p>
        </div>
      </div>
    </div>
  );
}
