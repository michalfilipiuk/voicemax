import { Audio } from 'expo-av';

// Recording preset for voice analysis
const RECORDING_OPTIONS: Audio.RecordingOptions = {
  android: {
    extension: '.wav',
    outputFormat: Audio.AndroidOutputFormat.DEFAULT,
    audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.IOSAudioQuality.HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/wav',
    bitsPerSecond: 128000,
  },
};

export interface RecordingResult {
  uri: string;
  durationMillis: number;
}

export interface MeteringResult {
  metering: number; // Normalized 0-1
  isClipping: boolean;
}

export class AudioRecorder {
  private recording: Audio.Recording | null = null;
  private meteringCallback: ((result: MeteringResult) => void) | null = null;
  private meteringInterval: ReturnType<typeof setInterval> | null = null;

  async requestPermissions(): Promise<boolean> {
    const { granted } = await Audio.requestPermissionsAsync();
    return granted;
  }

  async prepareRecording(): Promise<void> {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  }

  async startRecording(
    onMetering?: (result: MeteringResult) => void
  ): Promise<void> {
    if (this.recording) {
      await this.stopRecording();
    }

    await this.prepareRecording();

    this.recording = new Audio.Recording();
    await this.recording.prepareToRecordAsync({
      ...RECORDING_OPTIONS,
      isMeteringEnabled: true,
    });

    await this.recording.startAsync();

    // Set up metering callback
    if (onMetering) {
      this.meteringCallback = onMetering;
      this.startMeteringUpdates();
    }
  }

  private startMeteringUpdates(): void {
    this.meteringInterval = setInterval(async () => {
      if (this.recording && this.meteringCallback) {
        try {
          const status = await this.recording.getStatusAsync();
          if (status.isRecording && status.metering !== undefined) {
            // Convert dB to normalized value (0-1)
            // Typical metering range is -160 to 0 dB
            const normalizedMetering = Math.max(
              0,
              Math.min(1, (status.metering + 60) / 60)
            );
            const isClipping = status.metering > -1;

            this.meteringCallback({
              metering: normalizedMetering,
              isClipping,
            });
          }
        } catch {
          // Recording may have stopped
        }
      }
    }, 100); // Update every 100ms
  }

  private stopMeteringUpdates(): void {
    if (this.meteringInterval) {
      clearInterval(this.meteringInterval);
      this.meteringInterval = null;
    }
    this.meteringCallback = null;
  }

  async stopRecording(): Promise<RecordingResult | null> {
    this.stopMeteringUpdates();

    if (!this.recording) {
      return null;
    }

    try {
      const status = await this.recording.getStatusAsync();
      if (status.isRecording) {
        await this.recording.stopAndUnloadAsync();
      }

      const uri = this.recording.getURI();
      const durationMillis = status.durationMillis || 0;

      this.recording = null;

      // Reset audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      if (uri) {
        return { uri, durationMillis };
      }

      return null;
    } catch (error) {
      console.error('Error stopping recording:', error);
      this.recording = null;
      return null;
    }
  }

  async cancelRecording(): Promise<void> {
    this.stopMeteringUpdates();

    if (this.recording) {
      try {
        const status = await this.recording.getStatusAsync();
        if (status.isRecording) {
          await this.recording.stopAndUnloadAsync();
        }
      } catch {
        // Ignore errors during cancel
      }
      this.recording = null;
    }
  }

  isRecording(): boolean {
    return this.recording !== null;
  }
}

// Singleton instance
export const audioRecorder = new AudioRecorder();
