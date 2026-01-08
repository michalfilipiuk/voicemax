import type { ExerciseConfig } from '@/types';

export const EXERCISES: Record<string, ExerciseConfig> = {
  diaphragmatic_breathing: {
    id: 'diaphragmatic_breathing',
    name: 'Diaphragmatic Breathing',
    description: 'Deep belly breathing to support your voice',
    type: 'breathing',
    duration: 60,
    phases: [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 4 },
      { name: 'Exhale', duration: 6 },
    ],
    instruction: 'Breathe deeply from your diaphragm. Place a hand on your belly and feel it rise as you inhale.',
  },
  humming_warmup: {
    id: 'humming_warmup',
    name: 'Humming Warmup',
    description: 'Warm up your vocal cords with gentle humming',
    type: 'timed',
    duration: 45,
    instruction: 'Hum at a comfortable pitch. Feel the vibration in your chest and face. Start low and gradually vary your pitch.',
    showPitchMeter: true,
  },
  pitch_glides: {
    id: 'pitch_glides',
    name: 'Pitch Glides',
    description: 'Slide from high to low pitch smoothly',
    type: 'reps',
    reps: 5,
    repDuration: 8,
    instruction: 'Start at a comfortable high pitch and slowly glide down to your lowest comfortable pitch. Keep the sound smooth and connected.',
    showPitchMeter: true,
  },
  chest_voice: {
    id: 'chest_voice',
    name: 'Chest Voice Activation',
    description: 'Strengthen your deep chest resonance',
    type: 'phrase',
    phrases: [
      'Hello, my name is...',
      'Good morning everyone',
      'I am confident and strong',
      'My voice is powerful',
      'I speak with authority',
    ],
    instruction: 'Speak each phrase slowly and deliberately. Feel the vibration in your chest, not your throat.',
    showRecordPlayback: true,
  },
  sustained_low: {
    id: 'sustained_low',
    name: 'Sustained Low Notes',
    description: 'Build endurance at your lower range',
    type: 'sustained',
    duration: 30,
    instruction: 'Hold a low "ah" sound at a comfortable pitch. Maintain steady airflow and keep the tone relaxed.',
    showPitchMeter: true,
    showTimer: true,
  },
};

export const DEFAULT_WORKOUT: string[] = [
  'diaphragmatic_breathing',
  'humming_warmup',
  'pitch_glides',
  'chest_voice',
  'sustained_low',
];

export const getExerciseById = (id: string): ExerciseConfig | undefined => {
  return EXERCISES[id];
};

export const getDefaultWorkoutExercises = (): ExerciseConfig[] => {
  return DEFAULT_WORKOUT.map((id) => EXERCISES[id]).filter(Boolean);
};

export const getEstimatedWorkoutDuration = (): number => {
  const exercises = getDefaultWorkoutExercises();
  let totalSeconds = 0;

  exercises.forEach((exercise) => {
    if (exercise.duration) {
      totalSeconds += exercise.duration;
    } else if (exercise.reps && exercise.repDuration) {
      totalSeconds += exercise.reps * exercise.repDuration;
    } else if (exercise.phrases) {
      // Estimate 10 seconds per phrase
      totalSeconds += exercise.phrases.length * 10;
    }
  });

  // Add rest time between exercises (10 seconds each)
  totalSeconds += (exercises.length - 1) * 10;

  return Math.ceil(totalSeconds / 60); // Return in minutes
};
