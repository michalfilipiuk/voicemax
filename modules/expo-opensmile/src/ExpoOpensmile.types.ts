/**
 * eGeMAPSv02 (extended Geneva Minimalistic Acoustic Parameter Set)
 * Based on: Eyben et al. (2015) "The Geneva Minimalistic Acoustic Parameter Set (GeMAPS)
 * for Voice Research and Affective Computing"
 *
 * These are the 88 acoustic features used in clinical voice analysis.
 */

/**
 * Low-Level Descriptor (LLD) features - frame-by-frame measurements
 */
export interface VoiceLLDFeatures {
  // Frequency features
  f0Semitone: number;           // Fundamental frequency on semitone scale (from 27.5 Hz)
  f0SemitoneMean: number;       // Mean F0
  f0SemitoneStd: number;        // Standard deviation of F0

  // Perturbation (voice quality)
  jitterLocal: number;          // Pitch stability: cycle-to-cycle variation (%)
  shimmerLocalDb: number;       // Amplitude stability: cycle-to-cycle variation (dB)

  // Harmonic structure
  hnrDb: number;                // Harmonics-to-Noise Ratio (dB) - voice clarity
  h1H2LogRel: number;           // Log ratio of 1st to 2nd harmonic
  h1A3LogRel: number;           // Log ratio of 1st harmonic to 3rd formant amplitude

  // Formant frequencies (vocal tract resonances)
  f1Frequency: number;          // First formant frequency (Hz)
  f1Bandwidth: number;          // First formant bandwidth (Hz)
  f1AmplitudeLogRelF0: number;  // F1 amplitude relative to F0

  f2Frequency: number;          // Second formant frequency (Hz)
  f2Bandwidth: number;          // Second formant bandwidth (Hz)
  f2AmplitudeLogRelF0: number;  // F2 amplitude relative to F0

  f3Frequency: number;          // Third formant frequency (Hz)
  f3Bandwidth: number;          // Third formant bandwidth (Hz)
  f3AmplitudeLogRelF0: number;  // F3 amplitude relative to F0

  // Energy/Loudness
  loudness: number;             // Perceived loudness (sone)
  loudnessMean: number;         // Mean loudness
  loudnessStd: number;          // Loudness variation

  // Spectral features
  alphaRatio: number;           // Ratio of energy above/below 1kHz
  hammarbergIndex: number;      // Ratio of strongest peak in 0-2kHz vs 2-5kHz
  slope0To500: number;          // Spectral slope 0-500 Hz
  slope500To1500: number;       // Spectral slope 500-1500 Hz
  spectralFlux: number;         // Frame-to-frame spectral change

  // Cepstral features
  mfcc1: number;                // Mel-frequency cepstral coefficient 1
  mfcc2: number;                // MFCC 2
  mfcc3: number;                // MFCC 3
  mfcc4: number;                // MFCC 4
}

/**
 * Functional aggregations over LLD features (statistics)
 */
export interface VoiceFunctionalFeatures {
  // F0 functionals
  f0SemitoneMean: number;
  f0SemitoneStd: number;
  f0SemitonePercentile20: number;
  f0SemitonePercentile50: number;
  f0SemitonePercentile80: number;
  f0SemitoneRange: number;      // 80th - 20th percentile

  // Jitter functionals
  jitterLocalMean: number;
  jitterLocalStd: number;

  // Shimmer functionals
  shimmerLocalDbMean: number;
  shimmerLocalDbStd: number;

  // HNR functionals
  hnrDbMean: number;
  hnrDbStd: number;

  // Loudness functionals
  loudnessMean: number;
  loudnessStd: number;
  loudnessPercentile20: number;
  loudnessPercentile50: number;
  loudnessPercentile80: number;
  loudnessRange: number;

  // Formant functionals (means)
  f1FrequencyMean: number;
  f1BandwidthMean: number;
  f2FrequencyMean: number;
  f2BandwidthMean: number;
  f3FrequencyMean: number;
  f3BandwidthMean: number;

  // Spectral functionals
  alphaRatioMean: number;
  alphaRatioStd: number;
  hammarbergIndexMean: number;
  hammarbergIndexStd: number;

  // MFCC functionals
  mfcc1Mean: number;
  mfcc2Mean: number;
  mfcc3Mean: number;
  mfcc4Mean: number;
}

/**
 * Complete voice analysis result
 */
export interface VoiceAnalysisResult {
  // Analysis metadata
  success: boolean;
  error?: string;
  durationMs: number;
  sampleRate: number;

  // Core metrics (simplified for UI)
  pitch: {
    mean: number;               // Average pitch in Hz
    min: number;
    max: number;
    stability: number;          // 0-100, derived from jitter (100 = perfectly stable)
    score: number;              // Depth score for pitch (0-100)
  };

  // Masculinity scores (0-100) - Research-backed metrics
  quality: {
    depth: number;              // Pitch-based masculinity (F0 position in male distribution)
    resonance: number;          // VTL-based masculinity (formant dispersion)
    power: number;              // Projection/authority (alpha ratio + hammarberg + loudness)
    control: number;            // Voice steadiness (jitter + shimmer)
    overall: number;            // Overall masculinity score (weighted combination)
  };

  // Formant analysis
  formants: {
    f1: number;                 // First formant (Hz)
    f2: number;                 // Second formant (Hz)
    f3: number;                 // Third formant (Hz)
    vocalTractLength: number;   // Estimated VTL in cm
  };

  // Detailed metrics (for advanced users)
  detailed: {
    jitterPercent: number;      // Pitch perturbation (lower = more stable)
    shimmerDb: number;          // Amplitude perturbation (lower = smoother)
    hnrDb: number;              // Harmonics-to-noise ratio (higher = clearer)
    h1H2: number;               // Spectral tilt indicator
    alphaRatio: number;         // Spectral balance (more negative = more bass)
    hammarbergIndex: number;    // Voice brightness/actor's formant presence
    loudness: number;           // Perceived loudness in sones
  };

  // Raw eGeMAPSv02 features (all 88)
  rawFeatures?: VoiceFunctionalFeatures;

  // Frame-by-frame LLD data (for visualization)
  lldTimeSeries?: {
    timestamps: number[];       // Frame timestamps in ms
    f0: number[];               // F0 contour
    loudness: number[];         // Loudness contour
    hnr: number[];              // HNR over time
  };
}

/**
 * Analysis configuration options
 */
export interface AnalysisConfig {
  // Feature extraction settings
  frameSize?: number;           // Analysis frame size in ms (default: 25)
  frameStep?: number;           // Frame step in ms (default: 10)

  // F0 detection settings
  f0Min?: number;               // Minimum F0 to detect in Hz (default: 50)
  f0Max?: number;               // Maximum F0 to detect in Hz (default: 400)

  // Output options
  includeLldTimeSeries?: boolean;   // Include frame-by-frame data
  includeRawFeatures?: boolean;     // Include all 88 eGeMAPSv02 features
}

/**
 * Voice category based on pitch
 */
export type VoiceCategory = 'very_deep' | 'deep' | 'average' | 'higher';

/**
 * Voice quality category
 */
export type VoiceQualityCategory = 'excellent' | 'good' | 'average' | 'needs_work';

/**
 * Helper to categorize pitch
 */
export function categorizePitch(pitchHz: number): VoiceCategory {
  if (pitchHz < 100) return 'very_deep';
  if (pitchHz < 130) return 'deep';
  if (pitchHz < 165) return 'average';
  return 'higher';
}

/**
 * Helper to categorize voice quality
 */
export function categorizeQuality(score: number): VoiceQualityCategory {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'average';
  return 'needs_work';
}

/**
 * Reference ranges for voice metrics
 */
export const CLINICAL_RANGES = {
  // Jitter: Pitch perturbation (lower = more stable)
  jitter: {
    excellent: { max: 1.0 },      // % - very stable pitch
    good: { max: 2.0 },           // % - good stability
    normal: { max: 3.0 },         // % - acceptable
  },
  // Shimmer: Amplitude perturbation (lower = smoother)
  shimmer: {
    excellent: { max: 1.0 },      // dB - very smooth
    good: { max: 2.0 },           // dB - good smoothness
    normal: { max: 3.0 },         // dB - acceptable
  },
  // HNR: Harmonics-to-noise ratio (higher = clearer)
  hnr: {
    normal: { min: 7 },           // dB
    good: { min: 12 },
    excellent: { min: 18 },
  },
  // Male pitch ranges (for masculinity tracking)
  f0Male: {
    veryDeep: { min: 60, max: 100 },
    deep: { min: 100, max: 130 },
    average: { min: 130, max: 155 },
    higher: { min: 155, max: 200 },
  },
  // Vocal tract length ranges (cm)
  vocalTractLength: {
    male: { min: 15, max: 18 },
    female: { min: 13, max: 15 },
  },
} as const;
