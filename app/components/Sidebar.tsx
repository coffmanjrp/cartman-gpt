'use client';

import { useState } from 'react';
import TransformHistory from './TransformHistory';
import { TransformHistoryItem } from '../hooks/useTransformHistory';

type SensorLevel = 'mild' | 'medium' | 'raw';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sensorLevel: SensorLevel;
  onSensorLevelChange: (level: SensorLevel) => void;
  history: TransformHistoryItem[];
  onSelectHistoryItem: (item: TransformHistoryItem) => void;
  onRemoveHistoryItem: (id: string) => void;
  onClearHistory: () => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
  sensorLevel,
  onSensorLevelChange,
  history,
  onSelectHistoryItem,
  onRemoveHistoryItem,
  onClearHistory,
}: SidebarProps) {
  const [isSensorLevelOpen, setIsSensorLevelOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Sensor Level Accordion */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsSensorLevelOpen(!isSensorLevelOpen)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sensor Level: <span className="capitalize">{sensorLevel}</span>
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    isSensorLevelOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isSensorLevelOpen && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {['mild', 'medium', 'raw'].map((level) => (
                      <label
                        key={level}
                        className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="sensorLevel"
                          value={level}
                          checked={sensorLevel === level}
                          onChange={(e) => onSensorLevelChange(e.target.value as SensorLevel)}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <span className="text-gray-700 dark:text-gray-300 capitalize">
                            {level}
                          </span>
                          <span className="block text-xs text-gray-500 dark:text-gray-400">
                            {level === 'mild' && 'Family friendly'}
                            {level === 'medium' && 'Partial censorship'}
                            {level === 'raw' && 'Uncensored'}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* History */}
            <div className="p-4">
              <TransformHistory
                history={history}
                onSelectItem={onSelectHistoryItem}
                onRemoveItem={onRemoveHistoryItem}
                onClearHistory={onClearHistory}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
