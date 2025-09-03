'use client'

import { useState, useRef, useEffect } from 'react'
import { Share2, X, Facebook, Twitter, Linkedin, Link, MessageCircle, Mail, MessageSquare, Send, Image, Users, Copy, Globe } from 'lucide-react'

interface ShareButtonProps {
  className?: string
}

export default function ShareButton({ className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // 关闭弹窗的点击事件
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // 获取当前页面信息
  const getPageInfo = () => {
    const url = window.location.href
    const title = document.title || 'Car MP3 Converter - Professional Audio Video Conversion Tool'
    const description = 'Professional audio and video format conversion tool, one-click conversion to car MP3 standard format, supports multiple formats, 100% local processing, protects privacy and security.'
    
    return { url, title, description }
  }

  // 分享到Facebook
  const shareToFacebook = () => {
    const { url, title } = getPageInfo()
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到Twitter/X
  const shareToTwitter = () => {
    const { url, title } = getPageInfo()
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到LinkedIn
  const shareToLinkedIn = () => {
    const { url, title, description } = getPageInfo()
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到Reddit
  const shareToReddit = () => {
    const { url, title } = getPageInfo()
    const shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到WhatsApp
  const shareToWhatsApp = () => {
    const { url, title } = getPageInfo()
    const shareText = `${title} ${url}`
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到Telegram
  const shareToTelegram = () => {
    const { url, title } = getPageInfo()
    const shareText = `${title} ${url}`
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到Pinterest
  const shareToPinterest = () => {
    const { url, title, description } = getPageInfo()
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}&title=${encodeURIComponent(title)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到Discord
  const shareToDiscord = () => {
    const { url, title } = getPageInfo()
    const shareText = `${title}\n${url}`
    
    // 创建临时输入框复制链接
    const tempInput = document.createElement('textarea')
    tempInput.value = shareText
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    
    // 显示提示
    alert('Link copied to clipboard, please paste and share in Discord!')
  }

  // 分享到邮箱
  const shareToEmail = () => {
    const { url, title, description } = getPageInfo()
    const subject = encodeURIComponent(title)
    const body = encodeURIComponent(`${description}\n\n访问链接：${url}`)
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`
    window.location.href = mailtoUrl
  }

  // 分享到Tumblr
  const shareToTumblr = () => {
    const { url, title, description } = getPageInfo()
    const shareUrl = `https://www.tumblr.com/share/link?url=${encodeURIComponent(url)}&name=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 分享到VK
  const shareToVK = () => {
    const { url, title, description } = getPageInfo()
    const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  // 复制链接
  const copyLink = async () => {
    const { url } = getPageInfo()
    
    try {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    } catch (err) {
      // 降级方案
      const tempInput = document.createElement('textarea')
      tempInput.value = url
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      alert('Link copied to clipboard!')
    }
  }

  const shareOptions = [
    {
      name: 'Twitter/X',
      icon: Twitter,
      color: 'bg-black hover:bg-gray-800',
      action: shareToTwitter
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: shareToFacebook
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      action: shareToLinkedIn
    },
    {
      name: 'Reddit',
      icon: MessageSquare,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: shareToReddit
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      action: shareToWhatsApp
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: shareToTelegram
    },
    {
      name: 'Pinterest',
      icon: Image,
      color: 'bg-red-600 hover:bg-red-700',
      action: shareToPinterest
    },
    {
      name: 'Discord',
      icon: Users,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: shareToDiscord
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: shareToEmail
    },
    {
      name: 'Tumblr',
      icon: Globe,
      color: 'bg-pink-600 hover:bg-pink-700',
      action: shareToTumblr
    },
    {
      name: 'VK',
      icon: Users,
      color: 'bg-blue-800 hover:bg-blue-900',
      action: shareToVK
    },
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: copyLink
    }
  ]

  return (
    <>
      {/* 分享按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-6 bottom-6 z-40 w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-glow flex items-center justify-center group ${className}`}
        title="Share"
      >
        <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* 分享弹窗 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-scale-in"
          >
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Share to</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* 分享选项网格 */}
            <div className="grid grid-cols-4 gap-3">
              {shareOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <button
                    key={option.name}
                    onClick={() => {
                      option.action()
                      setIsOpen(false)
                    }}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl ${option.color} text-white transition-all duration-300 hover:scale-105 group`}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{option.name}</span>
                  </button>
                )
              })}
            </div>

            {/* 弹窗底部 */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Share with friends and let more people use our tools
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 