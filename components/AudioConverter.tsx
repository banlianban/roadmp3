'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Music, Download, Play, Pause, RotateCcw, FileAudio, CheckCircle, FileVideo, FileAudio2, Settings, Zap } from 'lucide-react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { validateFile, getFileIcon, formatFileSize, getFileExtension } from '@/utils/fileValidation'
import { useLanguage } from '@/utils/i18n'
import { CONVERSION_SLUGS } from '@/utils/routeSlugs'

interface FileInfo {
  name: string
  size: number
  type: string
  file: File
}

interface ConversionProgress {
  progress: number
  time: string
  fps: string
  q: string
  size: string
}

export default function AudioConverter() {
  const { t } = useLanguage()
  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [files, setFiles] = useState<FileInfo[]>([])
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState<ConversionProgress | null>(null)
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; url: string }[]>([])
  const [bitrate, setBitrate] = useState<'128' | '192'>('192')
  const [dragActive, setDragActive] = useState(false)
  const [fileProgress, setFileProgress] = useState<number[]>([])
  const [fileStatus, setFileStatus] = useState<Array<'idle' | 'processing' | 'done' | 'error'>>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const fileListRef = useRef<HTMLDivElement>(null)
  const currentProcessingIndexRef = useRef<number | null>(null)

  // 初始化FFmpeg
  useEffect(() => {
    const initFFmpeg = async () => {
      try {
        const ffmpegInstance = new FFmpeg()
        
        // 加载FFmpeg
        await ffmpegInstance.load({
          coreURL: await toBlobURL('https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.js', 'text/javascript'),
          wasmURL: await toBlobURL('https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.wasm', 'application/wasm'),
        })
        
        // 设置进度监听（全局 + 当前文件）
        ffmpegInstance.on('progress', (event: any) => {
          const percent = Math.min(100, Math.max(0, (event.progress || 0) * 100))
          setProgress({
            progress: percent,
            time: event.time || '00:00:00',
            fps: event.fps || '0',
            q: event.q || '0',
            size: event.size || '0'
          })

          const currentIndex = currentProcessingIndexRef.current
          if (currentIndex !== null) {
            setFileProgress(prev => {
              const next = [...prev]
              next[currentIndex] = percent
              return next
            })
          }
        })
        
        setFfmpeg(ffmpegInstance)
        setIsLoaded(true)
      } catch (error) {
        console.error('FFmpeg加载失败:', error)
      }
    }

    initFFmpeg()
  }, [])

  // 文件拖拽处理
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  // 文件选择处理
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles: File[] = []
    const errors: string[] = []

    newFiles.forEach(file => {
      const validation = validateFile(file)
      if (validation.isValid) {
        validFiles.push(file)
      } else if (validation.error) {
        errors.push(`${file.name}: ${validation.error}`)
      }
    })

    if (errors.length > 0) {
      alert(`以下文件验证失败:\n${errors.join('\n')}`)
    }

    const fileInfos: FileInfo[] = validFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }))

    setFiles(prev => [...prev, ...fileInfos])
    setFileProgress(prev => [...prev, ...new Array(fileInfos.length).fill(0)])
    setFileStatus(prev => [...prev, ...new Array(fileInfos.length).fill('idle') as Array<'idle'>])
    
    // 如果有有效文件被添加，显示成功提示并自动滚动到文件列表区域
    if (fileInfos.length > 0) {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000) // 2秒后隐藏提示
      
      setTimeout(() => {
        fileListRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 100) // 短暂延迟确保状态更新完成
      // 路由规则：单文件 -> /{lang}/{ext}-mp3，多文件 -> 保持当前语言路由
      try {
        const langPrefix = (() => {
          const path = window.location.pathname
          const seg = path.split('/').filter(Boolean)[0] || 'en'
          return `/${seg}`
        })()
        const total = (files.length + fileInfos.length)
        if (total === 1) {
          const first = fileInfos[0]
          const ext = getFileExtension(first.name).toLowerCase()
          const candidate = `${ext}-mp3`
          const slug = CONVERSION_SLUGS.includes(candidate) ? candidate : (first.type.startsWith('video') ? 'video-mp3' : 'audio-mp3')
          const nextPath = `${langPrefix}/${slug}`
          if (window.location.pathname !== nextPath) {
            window.history.replaceState(null, '', nextPath)
          }
        } else {
          // 多文件：保持语言根
          if (window.location.pathname.split('/').filter(Boolean).length > 1) {
            window.history.replaceState(null, '', langPrefix)
          }
        }
      } catch {}
    }
  }

  // 移除文件
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // 清空所有文件
  const clearFiles = () => {
    setFiles([])
    setConvertedFiles([])
    setProgress(null)
    setFileProgress([])
    setFileStatus([])
  }

  // 转换文件
  const convertFiles = async () => {
    if (!ffmpeg || files.length === 0) return

    setConverting(true)
    setProgress(null)
    setConvertedFiles([])
    setFileProgress(prev => prev.map(() => 0))
    setFileStatus(prev => prev.map(() => 'idle'))

    try {
      for (let i = 0; i < files.length; i++) {
        const fileInfo = files[i]
        currentProcessingIndexRef.current = i
        setFileStatus(prev => {
          const next = [...prev]
          next[i] = 'processing'
          return next
        })
        await convertSingleFile(fileInfo, i)
        setFileProgress(prev => {
          const next = [...prev]
          next[i] = 100
          return next
        })
        setFileStatus(prev => {
          const next = [...prev]
          next[i] = 'done'
          return next
        })
      }
    } catch (error) {
      console.error('转换失败:', error)
    } finally {
      setConverting(false)
      setProgress(null)
      currentProcessingIndexRef.current = null
    }
  }

  // 转换单个文件
  const convertSingleFile = async (fileInfo: FileInfo, index: number) => {
    if (!ffmpeg) return

    try {
      // 写入输入文件
      const inputFileName = `input_${index}.${getFileExtension(fileInfo.name)}`
      await ffmpeg.writeFile(inputFileName, await fetchFile(fileInfo.file))

      // 设置输出文件名
      const outputFileName = `output_${index}.mp3`
      
      // 执行转换命令
      await ffmpeg.exec([
        '-i', inputFileName,
        '-acodec', 'libmp3lame',
        '-ar', '44100',
        '-ab', `${bitrate}k`,
        '-ac', '2',
        '-f', 'mp3',
        outputFileName
      ])

      // 读取输出文件
      const data = await ffmpeg.readFile(outputFileName)
      const blob = new Blob([data as BlobPart], { type: 'audio/mp3' })
      const url = URL.createObjectURL(blob)

      // 添加到已转换文件列表
      setConvertedFiles(prev => [...prev, {
        name: `${fileInfo.name.replace(/\.[^/.]+$/, '')}.mp3`,
        url
      }])

      // 清理临时文件
      await ffmpeg.deleteFile(inputFileName)
      await ffmpeg.deleteFile(outputFileName)

    } catch (error) {
      console.error(`转换文件 ${fileInfo.name} 失败:`, error)
    }
  }

  // 下载转换后的文件
  const downloadFile = (file: { name: string; url: string }) => {
    const a = document.createElement('a')
    a.href = file.url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }



  return (
    <div className="space-y-8 animate-fade-in">
      {/* 文件上传区域 */}
      <div className="card-hover">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{t('select_files')}</h2>
          <p className="text-gray-700 text-sm">{t('drop_zone_subtext')}</p>
        </div>
        
        <div
          ref={dropZoneRef}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 bg-white ${
            dragActive 
              ? 'border-primary-500 bg-primary-50/50 scale-105 shadow-glow' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
            dragActive ? 'scale-110 text-primary-500' : 'text-gray-400'
          }`}>
            {dragActive ? (
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                <Upload className="w-8 h-8" />
              </div>
            ) : (
              <Upload className="w-16 h-16" />
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {dragActive ? t('release_to_upload') : t('drag_to_upload')}
          </h3>
          
          <p className="text-gray-500 mb-4 max-w-md mx-auto text-sm">
            {t('drop_zone_subtext')}
          </p>
          
          {showSuccessMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>文件选择成功！正在跳转到文件列表...</span>
              </div>
            </div>
          )}
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group btn-upload text-base"
          >
            <Upload className="w-4 h-4 mr-2 transform transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>{t('select_files')}</span>
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100" />
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="audio/*,video/*,.mp3,.wav,.aac,.ogg,.flac,.m4a,.wma,.aiff,.aif,.amr,.ape,.mpc,.wv,.opus,.3gpp,.3gpp2,.mp4,.avi,.mov,.mkv,.flv,.wmv,.webm"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* 转换设置 */}
      <div className="card-hover">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Settings className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{t('conversion_settings')}</h2>
          <p className="text-gray-700 text-sm">{t('customize_parameters')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              {t('mp3_bitrate')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '128', label: t('standard_quality'), desc: '128 kbps' },
                { value: '192', label: t('high_quality'), desc: '192 kbps' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setBitrate(option.value as '128' | '192')}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    bitrate === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-medium'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-base">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
            
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">{t('standard_config')}</span>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• {t('sample_rate')}: 44.1kHz ({t('cd_quality')})</p>
                  <p>• {t('channels')}: {t('stereo')}</p>
                  <p>• {t('encoding')}: CBR ({t('constant_bitrate')})</p>
                  <p>• {t('compatibility')}: {t('car_system_perfect_support')}</p>
                </div>
              </div>
          </div>
          
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              {t('file_info')}
            </label>
            
            <div className="bg-white rounded-xl p-4 space-y-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('selected_files')}</span>
                <span className="text-2xl font-bold text-primary-600">{files.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('total_file_size')}</span>
                <span className="text-xl font-semibold text-gray-800">
                  {formatFileSize(files.reduce((sum, f) => sum + f.size, 0))}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('estimated_time')}</span>
                <span className="text-lg font-medium text-gray-800">
                  {files.length > 0 ? `${Math.ceil(files.length * 2)}-${Math.ceil(files.length * 5)} ${t('minutes')}` : `0 ${t('minutes')}`}
                </span>
              </div>
            </div>
            
            {files.length > 0 && (
              <button
                onClick={clearFiles}
                className="btn-secondary w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('clear_all')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 文件列表 */}
      {files.length > 0 && (
        <div ref={fileListRef} className="card-hover animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <FileAudio className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                              <h2 className="text-xl font-bold text-gray-900">{t('files_to_convert')}</h2>
              <p className="text-gray-600 text-sm">{t('total_files_count').replace('{count}', files.length.toString())}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-soft transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${fileStatus[index] === 'done' ? 'bg-green-100' : 'bg-gradient-to-br from-primary-100 to-primary-200'}`}>
                      <span className="text-2xl">{getFileIcon(file.file)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{file.name}</p>
                      <p className="text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  <div className="ml-6 w-48 text-right">
                    {fileStatus[index] === 'processing' && (
                      <span className="text-sm font-medium text-primary-600">{Math.floor(fileProgress[index] || 0)}%</span>
                    )}
                    {fileStatus[index] === 'done' && (
                      <span className="text-sm font-medium text-green-600">{t('completed')}</span>
                    )}
                  </div>
                </div>

                {(fileStatus[index] === 'processing' || (fileProgress[index] ?? 0) > 0) && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${fileStatus[index] === 'done' ? 'bg-green-500' : 'bg-gradient-to-r from-primary-500 to-accent-500'}`}
                        style={{ width: `${Math.min(100, fileProgress[index] || 0)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <button
              onClick={convertFiles}
              disabled={converting}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {converting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {t('converting')}
                </>
              ) : (
                <>
                  <Music className="w-5 h-5 mr-3" />
                  {t('start_conversion').replace('{count}', files.length.toString())}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 全局转换进度卡片已移除 */}

      {/* 转换结果 */}
      {convertedFiles.length > 0 && (
        <div className="card-hover animate-slide-up">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{t('conversion_complete')}</h2>
            <p className="text-gray-700 text-sm">{t('all_files_converted')}</p>
          </div>
          
          <div className="space-y-4">
            {convertedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-white rounded-xl border border-green-200 hover:border-green-300 hover:shadow-soft transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{file.name}</p>
                    <p className="text-green-600 font-medium">{t('conversion_success')}</p>
                  </div>
                </div>
                <button
                  onClick={() => downloadFile(file)}
                  className="btn-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('download')}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={clearFiles}
              className="btn-secondary"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('convert_more_files')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 