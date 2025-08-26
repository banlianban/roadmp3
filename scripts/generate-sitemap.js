// 生成静态站点地图脚本
const fs = require('fs');
const path = require('path');

// 模拟语言配置
const LANG_OPTIONS = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'ru', label: 'Русский' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polski' },
  { code: 'uk', label: 'Українська' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'ar', label: 'العربية' },
  { code: 'he', label: 'עברית' },
];

// 模拟转换配置
const CONVERSION_SLUGS = [
  'wav-mp3', 'flac-mp3', 'aac-mp3', 'ogg-mp3', 'm4a-mp3', 'wma-mp3', 'aiff-mp3',
  'aif-mp3', 'amr-mp3', 'ape-mp3', 'opus-mp3', 'mp4-mp3', 'avi-mp3', 'mov-mp3',
  'mkv-mp3', 'flv-mp3', 'webm-mp3', 'audio-mp3', 'video-mp3'
];

const baseUrl = 'https://roadmp3.com';

function generateSitemapXML() {
  const currentDate = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // 添加英文根路径 (默认语言)
  xml += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // 为每种语言添加首页
  LANG_OPTIONS.forEach(lang => {
    if (lang.code !== 'en') { // 英文已经在根路径处理
      xml += `  <url>
    <loc>${baseUrl}/${lang.code}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
    }
  });

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
`;
      } else {
        // 其他语言版本使用 /语言/slug
        xml += `  <url>
    <loc>${baseUrl}/${lang.code}/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    });
  });

  xml += '</urlset>';
  return xml;
}

// 生成sitemap.xml
const sitemapXML = generateSitemapXML();
const outputPath = path.join(__dirname, '../public/sitemap.xml');

// 确保public目录存在
const publicDir = path.dirname(outputPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 写入文件
fs.writeFileSync(outputPath, sitemapXML, 'utf8');

console.log(`✅ 静态 sitemap.xml 已生成到: ${outputPath}`);
console.log(`📊 总计 ${LANG_OPTIONS.length * CONVERSION_SLUGS.length + LANG_OPTIONS.length} 个URL`);
console.log(`🌍 支持 ${LANG_OPTIONS.length} 种语言`);
console.log(`🔄 包含 ${CONVERSION_SLUGS.length} 种转换格式`);