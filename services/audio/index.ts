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
