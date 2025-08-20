export interface FileValidationResult {
  isValid: boolean
  error?: string
}

export const SUPPORTED_AUDIO_FORMATS = [
  'audio/mp3',
  'audio/wav',
  'audio/aac',
  'audio/ogg',
  'audio/flac',
  'audio/m4a',
  'audio/wma',
  'audio/aiff',
  'audio/aif',
  'audio/amr',
  'audio/ape',
  'audio/mpc',
  'audio/wv',
  'audio/opus',
  'audio/3gpp',
  'audio/3gpp2',
  'audio/x-m4a',
  'audio/x-aiff',
  'audio/x-wav'
]

export const SUPPORTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/avi',
  'video/mov',
  'video/mkv',
  'video/flv',
  'video/wmv',
  'video/webm'
]

export const SUPPORTED_EXTENSIONS = [
  '.mp3', '.wav', '.aac', '.ogg', '.flac', '.m4a', '.wma',
  '.aiff', '.aif', '.amr', '.ape', '.mpc', '.wv', '.opus',
  '.3gpp', '.3gpp2', '.m4a', '.aiff', '.aif',
  '.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.webm'
]

export function validateFile(file: File): FileValidationResult {
  // 检查文件大小 (500MB限制)
  const maxSize = 500 * 1024 * 1024
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `文件大小不能超过 ${(maxSize / (1024 * 1024)).toFixed(0)}MB`
    }
  }

  // 检查文件类型
  const isValidType = SUPPORTED_AUDIO_FORMATS.includes(file.type) ||
                     SUPPORTED_VIDEO_FORMATS.includes(file.type) ||
                     SUPPORTED_EXTENSIONS.some(ext => 
                       file.name.toLowerCase().endsWith(ext)
                     )

  if (!isValidType) {
    return {
      isValid: false,
      error: '不支持的文件格式。请选择音视频文件。'
    }
  }

  return { isValid: true }
}

export function getFileIcon(file: File): string {
  if (SUPPORTED_AUDIO_FORMATS.includes(file.type) || 
      ['.mp3', '.wav', '.aac', '.ogg', '.flac', '.m4a', '.wma', '.aiff', '.aif', '.amr', '.ape', '.mpc', '.wv', '.opus', '.3gpp', '.3gpp2'].some(ext => 
        file.name.toLowerCase().endsWith(ext)
      )) {
    return '🎵'
  }
  
  if (SUPPORTED_VIDEO_FORMATS.includes(file.type) || 
      ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.webm'].some(ext => 
        file.name.toLowerCase().endsWith(ext)
      )) {
    return '🎬'
  }
  
  return '📁'
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
} 