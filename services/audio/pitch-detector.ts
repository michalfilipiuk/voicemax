// Note: pitchfinder is primarily a Node.js library and has limited
// React Native support. For the MVP, we'll use a simplified approach
// that analyzes pitch from recorded audio files on the server or
// uses alternative methods.

// Voice pitch ranges for reference
export const MALE_VOICE_RANGES = {
  veryDeep: { min: 60, max: 100, label: 'Very Deep' },
  deep: { min: 100, max: 130, label: 'Deep' },
  average: { min: 130, max: 165, label: 'Average' },
  higher: { min: 165, max: 200, label: 'Higher' },
};

export interface PitchAnalysisResult {
  averagePitch: number;
  minPitch: number;
  maxPitch: number;
  readings: number[];
  confidence: number;
}

// Validate pitch is in reasonable male voice range
export function isValidVoicePitch(pitch: number): boolean {
  return pitch >= 50 && pitch <= 400;
}

// Get voice category based on pitch
export function getVoiceCategory(
  pitch: number
): keyof typeof MALE_VOICE_RANGES | null {
  if (pitch >= MALE_VOICE_RANGES.veryDeep.min && pitch < MALE_VOICE_RANGES.veryDeep.max) {
    return 'veryDeep';
  }
  if (pitch >= MALE_VOICE_RANGES.deep.min && pitch < MALE_VOICE_RANGES.deep.max) {
    return 'deep';
  }
  if (pitch >= MALE_VOICE_RANGES.average.min && pitch < MALE_VOICE_RANGES.average.max) {
    return 'average';
  }
  if (pitch >= MALE_VOICE_RANGES.higher.min && pitch <= MALE_VOICE_RANGES.higher.max) {
    return 'higher';
  }
  return null;
}

// Get friendly description of voice pitch
export function getVoiceDescription(pitch: number): string {
  const category = getVoiceCategory(pitch);

  switch (category) {
    case 'veryDeep':
      return 'You have a very deep voice - in the range of bass singers and voice actors.';
    case 'deep':
      return 'Your voice is deeper than average - authoritative and commanding.';
    case 'average':
      return 'Your voice is in the average male range - with room for deepening through training.';
    case 'higher':
      return 'Your voice is slightly higher pitched - training can help develop more depth.';
    default:
      return 'Your voice pitch has been measured.';
  }
}

// Calculate realistic voice projections
export function calculateProjections(baselinePitch: number): {
  oneMonth: number;
  threeMonth: number;
} {
  // Conservative realistic improvements
  // 1 month: ~5% decrease, max 12 Hz
  // 3 months: ~12% decrease, max 25 Hz
  const oneMonthDecrease = Math.min(baselinePitch * 0.05, 12);
  const threeMonthDecrease = Math.min(baselinePitch * 0.12, 25);

  return {
    oneMonth: Math.round(baselinePitch - oneMonthDecrease),
    threeMonth: Math.round(baselinePitch - threeMonthDecrease),
  };
}

// Convert Hz difference to semitones (for pitch shifting)
export function hzToSemitones(fromHz: number, toHz: number): number {
  return 12 * Math.log2(toHz / fromHz);
}

// For MVP: Generate a simulated pitch based on recording duration
// In production, this would be replaced with actual pitch detection
export function simulatePitchAnalysis(
  durationMs: number
): PitchAnalysisResult {
  // Generate a realistic-looking pitch in the average male range
  // This is a placeholder for actual pitch detection
  const basePitch = 125 + Math.random() * 30; // 125-155 Hz range
  const variance = 10;

  const numReadings = Math.max(5, Math.floor(durationMs / 500));
  const readings: number[] = [];

  for (let i = 0; i < numReadings; i++) {
    const reading = basePitch + (Math.random() - 0.5) * variance * 2;
    readings.push(Math.round(reading));
  }

  const validReadings = readings.filter(isValidVoicePitch);
  const averagePitch =
    validReadings.reduce((a, b) => a + b, 0) / validReadings.length;

  return {
    averagePitch: Math.round(averagePitch),
    minPitch: Math.min(...validReadings),
    maxPitch: Math.max(...validReadings),
    readings: validReadings,
    confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
  };
}

// Reference voice data for comparison
export const REFERENCE_VOICES = {
  morganFreeman: {
    name: 'Morgan Freeman',
    pitch: 85,
    description: 'Iconic deep voice',
  },
  jamesEarlJones: {
    name: 'James Earl Jones',
    pitch: 80,
    description: 'Voice of Darth Vader',
  },
  averageMale: {
    name: 'Average Male',
    pitch: 120,
    description: 'Typical adult male',
  },
  benedictCumberbatch: {
    name: 'Benedict Cumberbatch',
    pitch: 110,
    description: 'Deep, resonant voice',
  },
};
