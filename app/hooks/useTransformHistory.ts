'use client';

import { useState, useEffect } from 'react';

export interface TransformHistoryItem {
  id: string;
  original: string;
  transformed: string;
  sensorLevel: 'mild' | 'medium' | 'raw';
  timestamp: number;
}

const HISTORY_KEY = 'cartmanify_history';
const MAX_HISTORY_ITEMS = 5;

export function useTransformHistory() {
  const [history, setHistory] = useState<TransformHistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const loadHistory = () => {
      try {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setHistory(parsed);
        }
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };

    setMounted(true);
    loadHistory();
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }, [history, mounted]);

  const addToHistory = (item: Omit<TransformHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: TransformHistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Add new item at the beginning and limit to MAX_HISTORY_ITEMS
      const updated = [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}
