'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Music, Video, Download, Settings, Play, Pause, RotateCcw, Sparkles, Zap, Shield, Clock, CheckCircle, Star } from 'lucide-react'
import AudioConverter from '@/components/AudioConverter'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import ShareButton from '@/components/ShareButton'
import { useScrollAnimation } from '@/utils/useScrollAnimation'
import { useLanguage } from '@/utils/i18n'

export default function ClientHomePage() {
  const { t } = useLanguage()
  useScrollAnimation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      <BackgroundAnimation />

      <Header />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* 英雄区域 */}
        <section className="text-center mb-20 animate-fade-in pt-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-accent mb-8 leading-tight whitespace-nowrap">
            {t('hero_title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
            {t('hero_subtitle')}
          </p>
          
          {/* 徽章和技术规格 - 同一行显示 */}
          <div className="flex justify-center items-center gap-6 mb-12">
            <div className="inline-flex items-center gap-3 bg-slate-800/70 backdrop-blur-sm rounded-full px-8 py-4 shadow-soft border border-white/10 hover:bg-slate-700/70 transition-all duration-300">
              <Sparkles className="w-6 h-6 text-accent-400 animate-pulse" />
              <span className="text-base font-medium text-white/90">{t('hero_badge')}</span>
            </div>
            
            <div className="inline-flex items-center gap-3 bg-slate-800/70 backdrop-blur-sm rounded-full px-8 py-4 shadow-soft border border-white/10 hover:bg-slate-700/70 transition-all duration-300">
              <span className="text-base font-medium text-white/90">{t('hero_specs')}</span>
            </div>
          </div>

          {/* 开始转换功能（移至此处） */}
          <div className="max-w-4xl mx-auto animate-scale-in mt-8">
            <AudioConverter />
          </div>
        </section>

        {/* 功能特性 */}
        <section className="mb-20 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('features_title')}</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover group animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="feature-icon bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300">
                <Upload className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('feature_format_title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature_format_desc')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['MP4', 'AVI', 'MOV', 'FLV', 'WAV', 'AAC', 'AIFF', 'AMR', 'APE', 'OPUS'].map((format) => (
                  <span key={format} className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full font-medium">
                    {format}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="card-hover group animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="feature-icon bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300">
                <Music className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('feature_mp3_title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature_mp3_desc')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['128kbps', '192kbps'].map((bitrate) => (
                  <span key={bitrate} className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full font-medium">
                    {bitrate}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="card-hover group animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="feature-icon bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('feature_privacy_title')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature_privacy_desc')}</p>
              <div className="mt-4 flex items-center gap-2 text-purple-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{t('local_processing')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 其他部分保持不变... */}
      </main>

      <Footer />
      
      {/* 悬浮分享按钮 */}
      <ShareButton />
    </div>
  )
} 