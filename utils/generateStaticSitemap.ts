// 生成静态站点地图工具
import { LANG_OPTIONS } from './languageConfig'
import { CONVERSION_SLUGS } from './routeSlugs'

const baseUrl = 'https://roadmp3.com'

function generateSitemapXML(): string {
  const currentDate = new Date().toISOString()
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // 添加英文根路径 (默认语言)
  xml += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`

  // 为每种语言添加首页
  LANG_OPTIONS.forEach(lang => {
    if (lang.code !== 'en') { // 英文已经在根路径处理
      xml += `  <url>
    <loc>${baseUrl}/${lang.code}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`
    }
  })

  // 为每种语言和每个转换页面添加URL
  LANG_OPTIONS.forEach(lang => {
    CONVERSION_SLUGS.forEach(slug => {
      if (lang.code === 'en') {
        // 英文版本使用根路径 + slug
        xml += `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`
      } else {
        // 其他语言版本使用 /语言/slug
        xml += `  <url>
    <loc>${baseUrl}/${lang.code}/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
      }
    })
  })

  xml += '</urlset>'
  return xml
}

export { generateSitemapXML }