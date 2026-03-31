const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

/**
 * Transcribe audio using the backend Whisper model.
 * @param {Blob} audioBlob
 * @returns {Promise<string>}
 */
export async function transcribeAudio(audioBlob) {
  if (!audioBlob || audioBlob.size === 0) {
    throw new Error('Invalid audio blob provided')
  }

  const formData = new FormData()
  // Give the file a name with the correct extension so the backend picks the right suffix
  const ext = audioBlob.type.includes('mp4') ? 'mp4'
             : audioBlob.type.includes('ogg') ? 'ogg'
             : 'webm'
  formData.append('audio', audioBlob, `recording.${ext}`)

  const response = await fetch(`${API_BASE}/transcribe`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || `Transcription request failed (${response.status})`)
  }

  const data = await response.json()
  return data.transcript || ''
}

/**
 * Batch transcribe multiple audio blobs.
 * @param {Array<{questionId: string, audioBlob: Blob}>} audioItems
 * @returns {Promise<Array<{questionId: string, transcript: string|null, error: string|null}>>}
 */
export async function batchTranscribeAudio(audioItems) {
  const results = []
  for (const item of audioItems) {
    try {
      const transcript = await transcribeAudio(item.audioBlob)
      results.push({ questionId: item.questionId, transcript, error: null, status: 'success' })
    } catch (error) {
      results.push({ questionId: item.questionId, transcript: null, error: error.message, status: 'transcription_failed' })
    }
  }
  return results
}

/**
 * Validate audio blob before transcription.
 * @param {Blob} audioBlob
 * @returns {boolean}
 */
export function validateAudioBlob(audioBlob) {
  if (!audioBlob || audioBlob.size === 0) return false
  const minSize = 1024        // 1 KB
  const maxSize = 25 * 1024 * 1024 // 25 MB
  return audioBlob.size >= minSize && audioBlob.size <= maxSize
}

export function getTranscriptionSummary(transcriptionResults) {
  const total = transcriptionResults.length
  const successful = transcriptionResults.filter(r => r.status === 'success').length
  const failed = transcriptionResults.filter(r => r.status === 'transcription_failed').length
  return { total, successful, failed, successRate: total > 0 ? (successful / total * 100).toFixed(1) : 0 }
}
