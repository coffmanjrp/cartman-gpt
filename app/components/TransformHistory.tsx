'use client';

import { TransformHistoryItem } from '../hooks/useTransformHistory';

interface TransformHistoryProps {
  history: TransformHistoryItem[];
  onSelectItem: (item: TransformHistoryItem) => void;
  onRemoveItem: (id: string) => void;
  onClearHistory: () => void;
}

export default function TransformHistory({
  history,
  onSelectItem,
  onRemoveItem,
  onClearHistory,
}: TransformHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Transforms</h3>
        <button
          onClick={onClearHistory}
          className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <button onClick={() => onSelectItem(item)} className="flex-1 text-left min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{item.original}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1 line-clamp-2">
                  {item.transformed}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(item.timestamp)}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded">
                    {item.sensorLevel}
                  </span>
                </div>
              </button>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Remove from history"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        ))}
      </div>
    </div>
  );
}
