import { Heart, MessageCircle, ExternalLink, Music, Shield, Zap } from 'lucide-react'
import { useLanguage } from '@/utils/i18n'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* 品牌信息 */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient-accent">{t('title')}</h3>
                <p className="text-gray-300 text-sm font-medium">{t('footer_subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-lg">
              {t('footer_desc')}
            </p>
          </div>
          
          {/* 技术特性 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-400" />
              {t('tech_features_title')}
            </h4>
            <ul className="text-gray-300 text-sm space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                {t('tech_feature_1')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                {t('tech_feature_2')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                {t('tech_feature_3')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                {t('tech_feature_4')}
              </li>
            </ul>
          </div>
          
          {/* 联系我们 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-400" />
              {t('contact_title')}
            </h4>
            <div className="space-y-4">
              <a 
                href="https://discord.gg/PZT9qXPt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="group-hover:text-primary-300">Discord</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </div>
        
        {/* 分隔线 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>
        
        {/* 版权信息 */}
        <div className="text-center">
          <p className="text-gray-400 text-base mb-3">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
} 