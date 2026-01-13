import { NativeModule, requireNativeModule } from 'expo-modules-core';
import type {
  VoiceAnalysisResult,
  AnalysisConfig,
  VoiceLLDFeatures,
  VoiceFunctionalFeatures,
} from './ExpoOpensmile.types';

export * from './ExpoOpensmile.types';

/**
 * Native module interface
 */
interface ExpoOpensmileNativeModule extends NativeModule {
  /**
   * Analyze audio file and extract eGeMAPSv02 features
   * @param audioUri - URI to the audio file (WAV format, 16kHz+ sample rate)
   * @param config - Analysis configuration options
   * @returns Promise with complete voice analysis result
   */
  analyzeAudio(audioUri: string, config?: AnalysisConfig): Promise<VoiceAnalysisResult>;

  /**
   * Get openSMILE version info
   */
  getVersion(): Promise<string>;

  /**
   * Check if the module is ready
   */
  isReady(): Promise<boolean>;
}

// Get the native module
const ExpoOpensmileModule = requireNativeModule<ExpoOpensmileNativeModule>('ExpoOpensmile');

/**
 * Analyze a voice recording and extract clinical-grade acoustic features.
 *
 * Uses openSMILE with the eGeMAPSv02 feature set to extract 88 acoustic features
 * including pitch (F0), jitter, shimmer, HNR, formants, and spectral features.
 *
 * @param audioUri - URI to a WAV audio file
 * @param config - Optional analysis configuration
 * @returns Promise resolving to VoiceAnalysisResult
 *
 * @example
 * ```typescript
 * const result = await analyzeVoice(recording.uri, {
 *   f0Min: 50,
 *   f0Max: 300,
 *   includeRawFeatures: true,
 * });
 *
 * console.log(`Pitch: ${result.pitch.mean} Hz`);
 * console.log(`Depth: ${result.quality.depth}%`);
 * console.log(`Resonance: ${result.quality.resonance}%`);
 * ```
 */
export async function analyzeVoice(
  audioUri: string,
  config?: AnalysisConfig
): Promise<VoiceAnalysisResult> {
  const defaultConfig: AnalysisConfig = {
    frameSize: 25,
    frameStep: 10,
    f0Min: 50,
    f0Max: 400,
    includeLldTimeSeries: false,
    includeRawFeatures: false,
    ...config,
  };

  return ExpoOpensmileModule.analyzeAudio(audioUri, defaultConfig);
}

/**
 * Get the openSMILE library version
 */
export async function getOpenSmileVersion(): Promise<string> {
  return ExpoOpensmileModule.getVersion();
}

/**
 * Check if the voice analysis module is ready
 */
export async function isVoiceAnalysisReady(): Promise<boolean> {
  return ExpoOpensmileModule.isReady();
}

/**
 * Estimate vocal tract length from formant frequencies
 * Based on: VTL = c / (4 * F1) where c = speed of sound
 * This is a simplified estimation
 */
export function estimateVocalTractLength(f1: number, f2: number, f3: number): number {
  // Using average of formant-based estimations
  // Speed of sound = 35000 cm/s
  const c = 35000;

  // Method 1: From F1 (most reliable for open vowels)
  const vtlFromF1 = c / (4 * f1);

  // Method 2: From formant dispersion
  const avgFormantSpacing = (f3 - f1) / 2;
  const vtlFromDispersion = c / (2 * avgFormantSpacing);

  // Average the methods
  return (vtlFromF1 + vtlFromDispersion) / 2;
}

/**
 * Compare voice to reference voices and get percentile
 */
export function getVoicePercentile(pitchHz: number): {
  percentile: number;
  comparison: string;
} {
  // Based on male voice distribution (mean ~120 Hz, std ~20 Hz)
  const mean = 120;
  const std = 20;
  const zScore = (pitchHz - mean) / std;

  // Convert z-score to percentile (lower pitch = higher percentile for "deepness")
  // Using approximation of normal CDF
  const percentile = Math.round((1 - (1 / (1 + Math.exp(-1.7 * zScore)))) * 100);

  let comparison: string;
  if (pitchHz < 85) comparison = 'Deeper than Morgan Freeman';
  else if (pitchHz < 100) comparison = 'Similar to Morgan Freeman';
  else if (pitchHz < 115) comparison = 'Deeper than average';
  else if (pitchHz < 130) comparison = 'Slightly below average';
  else comparison = 'Average male range';

  return { percentile, comparison };
}
