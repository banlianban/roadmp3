import { MetadataRoute } from 'next'
import { LANG_OPTIONS } from '@/utils/languageConfig'
import { CONVERSION_SLUGS } from '@/utils/routeSlugs'

const baseUrl = 'https://roadmp3.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []
  
  // 添加英文根路径 (默认语言)
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  })
  
  // 为每种语言添加首页
  LANG_OPTIONS.forEach(lang => {
    if (lang.code !== 'en') { // 英文已经在根路径处理
      urls.push({
        url: `${baseUrl}/${lang.code}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  })
  
  // 为每种语言和每个转换页面添加URL
  LANG_OPTIONS.forEach(lang => {
    CONVERSION_SLUGS.forEach(slug => {
      if (lang.code === 'en') {
        // 英文版本使用根路径 + slug
        urls.push({
          url: `${baseUrl}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      } else {
        // 其他语言版本使用 /语言/slug
        urls.push({
          url: `${baseUrl}/${lang.code}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  })
  
  return urls
}