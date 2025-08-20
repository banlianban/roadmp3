import { Loader2, Zap } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = '加载中...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const containerSizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${containerSizeClasses[size]} mb-4`}>
        {/* 主旋转环 */}
        <div className={`absolute inset-0 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin ${sizeClasses[size]}`}></div>
        
        {/* 反向旋转环 */}
        <div className={`absolute inset-0 border-4 border-transparent border-t-accent-500 rounded-full animate-spin ${sizeClasses[size]}`} style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        
        {/* 中心图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className={`${sizeClasses[size]} text-primary-500 animate-pulse`} />
        </div>
        
        {/* 脉冲环 */}
        <div className={`absolute inset-0 border-2 border-primary-300 rounded-full animate-ping ${sizeClasses[size]}`} style={{animationDuration: '2s'}}></div>
      </div>
      
      {text && (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-2">{text}</p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      )}
    </div>
  )
} 