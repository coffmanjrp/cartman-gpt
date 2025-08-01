'use client';

import { useState } from 'react';

interface OutputDisplayProps {
  text: string;
  onNewTransform?: () => void;
}

export default function OutputDisplay({ text, onNewTransform }: OutputDisplayProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopy = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cartman says:
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`text-sm transition-all duration-200 ${
              copyStatus === 'copied'
                ? 'text-green-600 dark:text-green-400'
                : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            }`}
          >
            {copyStatus === 'copied' ? (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </span>
            ) : (
              'Copy to clipboard'
            )}
          </button>
          {onNewTransform && (
            <button
              onClick={onNewTransform}
              className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              New transform
            </button>
          )}
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
