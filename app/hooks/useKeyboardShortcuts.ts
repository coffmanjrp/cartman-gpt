'use client';

import { useEffect } from 'react';

interface ShortcutHandlers {
  onTransform?: () => void;
  onClear?: () => void;
}

export function useKeyboardShortcuts({ onTransform, onClear }: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to transform
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        onTransform?.();
      }

      // Escape to clear
      if (event.key === 'Escape') {
        event.preventDefault();
        onClear?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTransform, onClear]);
}
