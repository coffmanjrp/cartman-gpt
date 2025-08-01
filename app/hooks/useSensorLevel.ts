'use client';

import { useState, useEffect } from 'react';

type SensorLevel = 'mild' | 'medium' | 'raw';

const SENSOR_LEVEL_KEY = 'cartman_gpt_sensor_level';

export function useSensorLevel() {
  const [sensorLevel, setSensorLevel] = useState<SensorLevel>('medium');
  const [mounted, setMounted] = useState(false);

  // Load sensor level from localStorage on mount
  useEffect(() => {
    const loadSensorLevel = () => {
      try {
        const stored = localStorage.getItem(SENSOR_LEVEL_KEY);
        if (stored && ['mild', 'medium', 'raw'].includes(stored)) {
          setSensorLevel(stored as SensorLevel);
        }
      } catch (error) {
        console.error('Failed to load sensor level:', error);
      }
    };

    setMounted(true);
    loadSensorLevel();
  }, []);

  // Save sensor level to localStorage whenever it changes
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(SENSOR_LEVEL_KEY, sensorLevel);
    } catch (error) {
      console.error('Failed to save sensor level:', error);
    }
  }, [sensorLevel, mounted]);

  return { sensorLevel, setSensorLevel };
}
