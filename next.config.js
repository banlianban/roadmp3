/** @type {import('next').NextConfig} */
const nextConfig = {
  // 性能优化配置
  compress: true,
  poweredByHeader: false,
  
  // SEO优化配置
  trailingSlash: false,
  generateEtags: true,
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30天缓存
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // CORS headers
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          // 性能和安全headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // 静态资源缓存
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400', // 24小时缓存
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400', // 24小时缓存
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000', // 1年缓存
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 