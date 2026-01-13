export {
  audioRecorder,
  AudioRecorder,
  type RecordingResult,
  type MeteringResult,
} from './recorder';

export {
  MALE_VOICE_RANGES,
  isValidVoicePitch,
  getVoiceCategory,
  getVoiceDescription,
  calculateProjections,
  hzToSemitones,
  simulatePitchAnalysis,
  REFERENCE_VOICES,
  type PitchAnalysisResult,
} from './pitch-detector';

// State-of-the-art voice analysis with eGeMAPSv02 features
export {
  analyzeVoiceRecording,
  analyzeVoiceSimple,
  compareVoiceAnalyses,
  isAnalyzerReady,
  getAnalyzerVersion,
  getTrainingRecommendations,
  CLINICAL_RANGES,
  categorizePitch,
  categorizeQuality,
  type SimpleVoiceAnalysis,
  type VoiceAnalysisResult,
  type AnalysisConfig,
  type VoiceCategory,
  type VoiceQualityCategory,
} from './voice-analyzer';
