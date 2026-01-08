import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import {
  getVoiceMeasurements,
  saveVoiceMeasurement,
  getLatestMeasurement,
  clearVoiceMeasurements,
  generateId,
} from '@/services/storage';
import type { VoiceMeasurement, MeasurementContext } from '@/types';

type VoiceContextType = {
  measurements: VoiceMeasurement[];
  latestMeasurement: VoiceMeasurement | null;
  isLoading: boolean;
  addMeasurement: (
    pitchHz: number,
    pitchMin: number,
    pitchMax: number,
    recordingUri: string,
    duration: number,
    context: MeasurementContext
  ) => Promise<VoiceMeasurement>;
  getMeasurementsByContext: (context: MeasurementContext) => VoiceMeasurement[];
  getAveragePitch: () => number | null;
  getPitchTrend: () => 'improving' | 'stable' | 'declining' | null;
  clearMeasurements: () => Promise<void>;
  refreshMeasurements: () => Promise<void>;
};

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [measurements, setMeasurements] = useState<VoiceMeasurement[]>([]);
  const [latestMeasurement, setLatestMeasurement] =
    useState<VoiceMeasurement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load measurements on mount
  useEffect(() => {
    loadMeasurements();
  }, []);

  const loadMeasurements = async () => {
    try {
      const savedMeasurements = await getVoiceMeasurements();
      setMeasurements(savedMeasurements);

      const latest = await getLatestMeasurement();
      setLatestMeasurement(latest);
    } catch (error) {
      console.error('Error loading measurements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshMeasurements = useCallback(async () => {
    await loadMeasurements();
  }, []);

  const addMeasurement = useCallback(
    async (
      pitchHz: number,
      pitchMin: number,
      pitchMax: number,
      recordingUri: string,
      duration: number,
      context: MeasurementContext
    ): Promise<VoiceMeasurement> => {
      const measurement: VoiceMeasurement = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        pitchHz,
        pitchMin,
        pitchMax,
        recordingUri,
        duration,
        context,
      };

      await saveVoiceMeasurement(measurement);
      setMeasurements((prev) => [...prev, measurement]);
      setLatestMeasurement(measurement);

      return measurement;
    },
    []
  );

  const getMeasurementsByContext = useCallback(
    (context: MeasurementContext): VoiceMeasurement[] => {
      return measurements.filter((m) => m.context === context);
    },
    [measurements]
  );

  const getAveragePitch = useCallback((): number | null => {
    if (measurements.length === 0) return null;

    const sum = measurements.reduce((acc, m) => acc + m.pitchHz, 0);
    return Math.round(sum / measurements.length);
  }, [measurements]);

  const getPitchTrend = useCallback(():
    | 'improving'
    | 'stable'
    | 'declining'
    | null => {
    if (measurements.length < 3) return null;

    // Compare last 3 measurements average to first 3
    const sortedByDate = [...measurements].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const firstThree = sortedByDate.slice(0, 3);
    const lastThree = sortedByDate.slice(-3);

    const firstAvg =
      firstThree.reduce((acc, m) => acc + m.pitchHz, 0) / firstThree.length;
    const lastAvg =
      lastThree.reduce((acc, m) => acc + m.pitchHz, 0) / lastThree.length;

    const difference = firstAvg - lastAvg;

    // Lower pitch = improvement for voice deepening
    if (difference > 5) return 'improving';
    if (difference < -5) return 'declining';
    return 'stable';
  }, [measurements]);

  const clearMeasurements = useCallback(async () => {
    await clearVoiceMeasurements();
    setMeasurements([]);
    setLatestMeasurement(null);
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        measurements,
        latestMeasurement,
        isLoading,
        addMeasurement,
        getMeasurementsByContext,
        getAveragePitch,
        getPitchTrend,
        clearMeasurements,
        refreshMeasurements,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}
