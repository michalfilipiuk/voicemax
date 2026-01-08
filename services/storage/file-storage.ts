import * as FileSystem from 'expo-file-system/legacy';

// Directory for storing recordings
const RECORDINGS_DIR = `${FileSystem.documentDirectory}recordings/`;

// Ensure recordings directory exists
export async function ensureRecordingsDir(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(RECORDINGS_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(RECORDINGS_DIR, { intermediates: true });
  }
}

// Save a recording from temp location to permanent storage
export async function saveRecording(
  tempUri: string,
  context: string
): Promise<string> {
  await ensureRecordingsDir();

  const filename = `${context}_${Date.now()}.wav`;
  const permanentUri = `${RECORDINGS_DIR}${filename}`;

  await FileSystem.moveAsync({
    from: tempUri,
    to: permanentUri,
  });

  return permanentUri;
}

// Copy a recording (for creating shifted versions)
export async function copyRecording(
  sourceUri: string,
  newFilename: string
): Promise<string> {
  await ensureRecordingsDir();

  const destinationUri = `${RECORDINGS_DIR}${newFilename}`;

  await FileSystem.copyAsync({
    from: sourceUri,
    to: destinationUri,
  });

  return destinationUri;
}

// Delete a specific recording
export async function deleteRecording(uri: string): Promise<void> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(uri);
    }
  } catch (error) {
    console.error('Error deleting recording:', error);
  }
}

// Get all recordings
export async function getAllRecordings(): Promise<string[]> {
  try {
    await ensureRecordingsDir();
    const files = await FileSystem.readDirectoryAsync(RECORDINGS_DIR);
    return files.map((file) => `${RECORDINGS_DIR}${file}`);
  } catch (error) {
    console.error('Error reading recordings directory:', error);
    return [];
  }
}

// Get recordings by context (e.g., 'onboarding', 'workout')
export async function getRecordingsByContext(
  context: string
): Promise<string[]> {
  const allRecordings = await getAllRecordings();
  return allRecordings.filter((uri) => uri.includes(`${context}_`));
}

// Cleanup old recordings, keeping the most recent N
export async function cleanupOldRecordings(
  keepCount: number = 20
): Promise<void> {
  try {
    const recordings = await getAllRecordings();

    if (recordings.length <= keepCount) return;

    // Sort by timestamp (embedded in filename)
    const sorted = recordings.sort((a, b) => {
      const timeA = extractTimestamp(a);
      const timeB = extractTimestamp(b);
      return timeB - timeA; // Newest first
    });

    // Delete older recordings
    const toDelete = sorted.slice(keepCount);
    await Promise.all(toDelete.map(deleteRecording));

    console.log(`Cleaned up ${toDelete.length} old recordings`);
  } catch (error) {
    console.error('Error cleaning up recordings:', error);
  }
}

// Extract timestamp from filename
function extractTimestamp(uri: string): number {
  const filename = uri.split('/').pop() || '';
  const match = filename.match(/_(\d+)\./);
  return match ? parseInt(match[1], 10) : 0;
}

// Get total storage used by recordings
export async function getRecordingsStorageSize(): Promise<number> {
  try {
    const recordings = await getAllRecordings();
    let totalSize = 0;

    for (const uri of recordings) {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists && 'size' in fileInfo) {
        totalSize += fileInfo.size || 0;
      }
    }

    return totalSize;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
}

// Format bytes to human readable
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Delete all recordings
export async function clearAllRecordings(): Promise<void> {
  try {
    const dirInfo = await FileSystem.getInfoAsync(RECORDINGS_DIR);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(RECORDINGS_DIR, { idempotent: true });
    }
    await ensureRecordingsDir();
  } catch (error) {
    console.error('Error clearing recordings:', error);
  }
}
