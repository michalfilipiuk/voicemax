/**
 * Voice Analysis Service
 *
 * Uses expo-opensmile for clinical-grade voice analysis with eGeMAPSv02 features.
 * Provides pitch, formants, jitter, shimmer, HNR, and quality scores.
 */

import {
  analyzeVoice,
  isVoiceAnalysisReady,
  getOpenSmileVersion,
  estimateVocalTractLength,
  getVoicePercentile,
  categorizePitch,
  categorizeQuality,
  CLINICAL_RANGES,
  type VoiceAnalysisResult,
  type AnalysisConfig,
  type VoiceCategory,
  type VoiceQualityCategory,
} from 'expo-opensmile';

// Re-export types
export type {
  VoiceAnalysisResult,
  AnalysisConfig,
  VoiceCategory,
  VoiceQualityCategory,
};

export { CLINICAL_RANGES, categorizePitch, categorizeQuality };

/**
 * Simplified analysis result for UI display
 */
export interface SimpleVoiceAnalysis {
  // Core pitch info
  pitch: {
    hz: number;
    category: VoiceCategory;
    percentile: number;
    comparison: string;
  };

  // Masculinity scores (0-100) - Research-backed metrics
  quality: {
    depth: number;        // Pitch-based masculinity (F0 position in male distribution)
    resonance: number;    // VTL-based masculinity (formant dispersion)
    power: number;        // Projection/authority (alpha ratio + hammarberg + loudness)
    control: number;      // Voice steadiness (jitter + shimmer)
    overall: number;      // Overall masculinity score
    category: VoiceQualityCategory;
  };

  // Detailed metrics (shown in secondary view)
  metrics: {
    jitter: number;
    jitterStatus: 'excellent' | 'good' | 'normal' | 'high';
    shimmer: number;
    shimmerStatus: 'excellent' | 'good' | 'normal' | 'high';
    hnr: number;
    hnrStatus: 'excellent' | 'good' | 'normal' | 'low';
    alphaRatio: number;
    hammarbergIndex: number;
    loudness: number;
  };

  // Formants
  formants: {
    f1: number;
    f2: number;
    f3: number;
    vocalTractLength: number;
  };

  // Raw result for advanced use
  raw: VoiceAnalysisResult;
}

/**
 * Get the status of a jitter value (now in actual percentage, not ratio)
 * Clinical thresholds: <1% excellent, 1-2% good, 2-3% normal, >3% high
 */
function getJitterStatus(jitter: number): 'excellent' | 'good' | 'normal' | 'high' {
  if (jitter <= 1.0) return 'excellent';
  if (jitter <= 2.0) return 'good';
  if (jitter <= 3.0) return 'normal';
  return 'high';
}

/**
 * Get the status of a shimmer value
 */
function getShimmerStatus(shimmer: number): 'excellent' | 'good' | 'normal' | 'high' {
  if (shimmer <= 1.0) return 'excellent';
  if (shimmer <= CLINICAL_RANGES.shimmer.good.max) return 'good';
  if (shimmer <= CLINICAL_RANGES.shimmer.normal.max) return 'normal';
  return 'high';
}

/**
 * Get the status of an HNR value
 */
function getHnrStatus(hnr: number): 'excellent' | 'good' | 'normal' | 'low' {
  if (hnr >= CLINICAL_RANGES.hnr.excellent.min) return 'excellent';
  if (hnr >= CLINICAL_RANGES.hnr.good.min) return 'good';
  if (hnr >= CLINICAL_RANGES.hnr.normal.min) return 'normal';
  return 'low';
}

/**
 * Analyze a voice recording with full clinical-grade analysis
 *
 * @param audioUri - URI to the audio file (WAV format)
 * @param options - Analysis options
 * @returns Full voice analysis result
 */
export async function analyzeVoiceRecording(
  audioUri: string,
  options?: {
    includeTimeSeries?: boolean;
    includeRawFeatures?: boolean;
  }
): Promise<VoiceAnalysisResult> {
  const config: AnalysisConfig = {
    frameSize: 25,
    frameStep: 10,
    f0Min: 50,
    f0Max: 400,
    includeLldTimeSeries: options?.includeTimeSeries ?? false,
    includeRawFeatures: options?.includeRawFeatures ?? false,
  };

  return analyzeVoice(audioUri, config);
}

/**
 * Analyze a voice recording and return simplified results for UI
 *
 * @param audioUri - URI to the audio file
 * @returns Simplified analysis result
 */
export async function analyzeVoiceSimple(audioUri: string): Promise<SimpleVoiceAnalysis> {
  console.log('🔵 [TS] analyzeVoiceSimple called with:', audioUri);

  // Check module version first
  const version = await getOpenSmileVersion();
  console.log('🔵 [TS] OpenSMILE version:', version);

  const isReady = await isVoiceAnalysisReady();
  console.log('🔵 [TS] Module isReady:', isReady);

  console.log('🔵 [TS] Calling analyzeVoice...');
  const result = await analyzeVoice(audioUri, {
    includeRawFeatures: false,
    includeLldTimeSeries: false,
  });
  console.log('🔵 [TS] analyzeVoice returned');

  // Log results for debugging
  console.log('═══════════════════════════════════════════');
  console.log('📊 VOICE ANALYSIS RESULTS (from native module)');
  console.log('═══════════════════════════════════════════');
  console.log('🎤 PITCH');
  console.log(`   Mean: ${result.pitch.mean.toFixed(1)} Hz`);
  console.log(`   Min:  ${result.pitch.min.toFixed(1)} Hz`);
  console.log(`   Max:  ${result.pitch.max.toFixed(1)} Hz`);
  console.log(`   Stability: ${result.pitch.stability?.toFixed(1) ?? 'N/A'}%`);
  console.log('───────────────────────────────────────────');
  console.log('📈 CLINICAL METRICS');
  console.log(`   Jitter:  ${result.detailed.jitterPercent.toFixed(3)}%`);
  console.log(`   Shimmer: ${result.detailed.shimmerDb.toFixed(3)} dB`);
  console.log(`   HNR:     ${result.detailed.hnrDb.toFixed(2)} dB`);
  console.log(`   Alpha:   ${result.detailed.alphaRatio?.toFixed(2) ?? 'N/A'}`);
  console.log(`   Hammar:  ${result.detailed.hammarbergIndex?.toFixed(2) ?? 'N/A'}`);
  console.log('───────────────────────────────────────────');
  console.log('✨ MASCULINITY SCORES');
  console.log(`   Depth:     ${result.quality.depth.toFixed(1)}`);
  console.log(`   Resonance: ${result.quality.resonance.toFixed(1)}`);
  console.log(`   Power:     ${result.quality.power.toFixed(1)}`);
  console.log(`   Control:   ${result.quality.control.toFixed(1)}`);
  console.log(`   Overall:   ${result.quality.overall.toFixed(1)}`);
  console.log('───────────────────────────────────────────');
  console.log('🔊 FORMANTS');
  console.log(`   F1: ${result.formants.f1.toFixed(1)} Hz`);
  console.log(`   F2: ${result.formants.f2.toFixed(1)} Hz`);
  console.log(`   F3: ${result.formants.f3.toFixed(1)} Hz`);
  console.log(`   Vocal Tract: ${result.formants.vocalTractLength.toFixed(2)} cm`);
  console.log('───────────────────────────────────────────');
  console.log('📦 RAW RESULT:', JSON.stringify(result, null, 2));
  console.log('═══════════════════════════════════════════');

  const { percentile, comparison } = getVoicePercentile(result.pitch.mean);
  const pitchCategory = categorizePitch(result.pitch.mean);
  const qualityCategory = categorizeQuality(result.quality.overall);

  return {
    pitch: {
      hz: Math.round(result.pitch.mean),
      category: pitchCategory,
      percentile,
      comparison,
    },
    quality: {
      depth: result.quality.depth,
      resonance: result.quality.resonance,
      power: result.quality.power,
      control: result.quality.control,
      overall: result.quality.overall,
      category: qualityCategory,
    },
    metrics: {
      jitter: result.detailed.jitterPercent,
      jitterStatus: getJitterStatus(result.detailed.jitterPercent),
      shimmer: result.detailed.shimmerDb,
      shimmerStatus: getShimmerStatus(result.detailed.shimmerDb),
      hnr: result.detailed.hnrDb,
      hnrStatus: getHnrStatus(result.detailed.hnrDb),
      alphaRatio: result.detailed.alphaRatio,
      hammarbergIndex: result.detailed.hammarbergIndex,
      loudness: result.detailed.loudness,
    },
    formants: {
      f1: Math.round(result.formants.f1),
      f2: Math.round(result.formants.f2),
      f3: Math.round(result.formants.f3),
      vocalTractLength: Math.round(result.formants.vocalTractLength * 10) / 10,
    },
    raw: result,
  };
}

/**
 * Compare two voice analyses to show progress
 */
export function compareVoiceAnalyses(
  baseline: SimpleVoiceAnalysis,
  current: SimpleVoiceAnalysis
): {
  pitchChange: number;
  pitchImproved: boolean;
  overallChange: number;
  overallImproved: boolean;
  depthChange: number;
  resonanceChange: number;
  powerChange: number;
  controlChange: number;
  summary: string;
} {
  const pitchChange = current.pitch.hz - baseline.pitch.hz;
  const pitchImproved = pitchChange < 0; // Lower pitch = improvement for this app

  const overallChange = current.quality.overall - baseline.quality.overall;
  const overallImproved = overallChange > 0;

  const depthChange = current.quality.depth - baseline.quality.depth;
  const resonanceChange = current.quality.resonance - baseline.quality.resonance;
  const powerChange = current.quality.power - baseline.quality.power;
  const controlChange = current.quality.control - baseline.quality.control;

  let summary = '';
  if (pitchImproved && overallImproved) {
    summary = 'Great progress! Your voice is deeper and more powerful.';
  } else if (pitchImproved) {
    summary = `Your pitch dropped ${Math.abs(pitchChange)} Hz. Keep working on projection.`;
  } else if (overallImproved) {
    summary = 'Your voice quality improved. Keep training for deeper pitch.';
  } else {
    summary = 'Keep practicing! Consistent training leads to results.';
  }

  return {
    pitchChange,
    pitchImproved,
    overallChange,
    overallImproved,
    depthChange,
    resonanceChange,
    powerChange,
    controlChange,
    summary,
  };
}

/**
 * Check if the voice analysis module is available
 */
export async function isAnalyzerReady(): Promise<boolean> {
  try {
    return await isVoiceAnalysisReady();
  } catch {
    return false;
  }
}

/**
 * Get analyzer version info
 */
export async function getAnalyzerVersion(): Promise<string> {
  try {
    return await getOpenSmileVersion();
  } catch {
    return 'Unknown';
  }
}

/**
 * Generate masculinity-focused training recommendations
 * Based on research-backed metrics: depth, resonance, power, control
 */
export function getTrainingRecommendations(analysis: SimpleVoiceAnalysis): string[] {
  const recommendations: string[] = [];

  // DEPTH recommendations (pitch-based)
  if (analysis.quality.depth < 50) {
    recommendations.push('Practice speaking from your chest, not your head voice. Place your hand on your chest and feel vibrations.');
    recommendations.push('Use diaphragmatic breathing - breathe from your belly to support a naturally lower pitch.');
  } else if (analysis.quality.depth < 70) {
    recommendations.push('Your pitch is in a good range. Try relaxing your throat muscles while speaking to go deeper.');
  }

  // RESONANCE recommendations (VTL-based)
  if (analysis.quality.resonance < 60) {
    recommendations.push('Lower your larynx using the "yawn technique" - start a yawn and hold that open throat feeling while speaking.');
    recommendations.push('Imagine speaking with space in the back of your mouth for a fuller, more resonant sound.');
  }

  // POWER recommendations (projection/authority)
  if (analysis.quality.power < 50) {
    recommendations.push('Project your voice more. Speak slightly louder from your diaphragm for more bass presence and authority.');
    recommendations.push('Practice the "actor\'s formant" - professional speakers have more energy in the 3-4kHz range.');
  }

  // CONTROL recommendations (voice steadiness)
  if (analysis.quality.control < 60) {
    recommendations.push('Focus on breath support to improve voice steadiness. Shaky voice can signal nervousness.');
    recommendations.push('Practice sustained vowels ("aaah") for 5-10 seconds to build vocal control.');
  }

  // Vocal tract length specific
  if (analysis.formants.vocalTractLength < 16) {
    recommendations.push('Practice the "Big Dog, Little Dog" exercise to explore your full resonance range.');
  }

  // Speaking style recommendations
  if (analysis.pitch.category === 'higher' || analysis.pitch.category === 'average') {
    recommendations.push('Slow down your speech. Rushed speaking tends to raise pitch.');
    recommendations.push('End sentences with falling intonation, not rising (avoid "uptalk").');
  }

  // If already doing well
  if (recommendations.length === 0) {
    recommendations.push('Your voice has strong masculine characteristics! Keep practicing to maintain these qualities.');
    recommendations.push('Focus on consistency - use your deep voice in all situations, not just when recording.');
  }

  return recommendations;
}
