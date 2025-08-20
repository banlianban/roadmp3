'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Music, Video, Download, Settings, Play, Pause, RotateCcw, Sparkles, Zap, Shield, Clock, CheckCircle, Star } from 'lucide-react'
import AudioConverter from '@/components/AudioConverter'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import { useScrollAnimation } from '@/utils/useScrollAnimation'
import { useLanguage } from '@/utils/i18n'

export default function Home() {
  const { t } = useLanguage()
  useScrollAnimation()



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      <BackgroundAnimation />

      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* 英雄区域 */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-soft border border-white/10">
            <Sparkles className="w-5 h-5 text-accent-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">{t('hero_badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-accent mb-6 leading-tight whitespace-nowrap">
            {t('hero_title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
            {t('hero_subtitle')}
            <br />
            <span className="text-white font-semibold bg-white/10 border border-white/20 px-4 py-2 rounded-full inline-block mt-3">
              {t('hero_specs')}
            </span>
          </p>

          {/* 开始转换功能（移至此处） */}
          <div className="max-w-4xl mx-auto animate-scale-in">
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

        {/* 使用说明 */}
        <section className="mb-20 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('instructions_title')}</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card-hover group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary-600">{t('step1_title')}</h3>
                    <p className="text-gray-700 leading-relaxed">{t('step1_desc')}</p>
                  </div>
                </div>
              </div>
              
              <div className="card-hover group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-600">{t('step2_title')}</h3>
                    <p className="text-gray-700 leading-relaxed">{t('step2_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card-hover group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-purple-600">{t('step3_title')}</h3>
                    <p className="text-gray-700 leading-relaxed">{t('step3_desc')}</p>
                  </div>
                </div>
              </div>
              
              <div className="card-hover group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold text-accent-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-accent-600">{t('step4_title')}</h3>
                    <p className="text-gray-700 leading-relaxed">{t('step4_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技术特性 */}
        <section className="mb-20 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('technical_title')}</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-hover">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                {t('core_tech_title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800">{t('core_tech_1')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800">{t('core_tech_2')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800">{t('core_tech_3')}</span>
                </div>
              </div>
            </div>
            
            <div className="card-hover">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                {t('advantages_title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-800">{t('advantages_1')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-800">{t('advantages_2')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-800">{t('advantages_3')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 统计信息 */}
        <section className="mb-20 animate-on-scroll">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card text-center hover:shadow-large transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">22</div>
              <div className="text-gray-700">{t('stats_formats')}</div>
            </div>
            
            <div className="card text-center hover:shadow-large transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
              <div className="text-gray-700">{t('stats_bitrates')}</div>
            </div>
            
            <div className="card text-center hover:shadow-large transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-700">{t('stats_local')}</div>
            </div>
            
            <div className="card text-center hover:shadow-large transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-700">{t('stats_available')}</div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 