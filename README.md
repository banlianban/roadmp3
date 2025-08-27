# 🎵 车载MP3转换器 (Car MP3 Converter)

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

> 🚗 专业的车载音视频格式转换工具，支持多语言界面，纯前端处理，保护用户隐私

## 🌟 项目特色

### ✨ 核心功能
- **🎵 多格式支持**: MP3, WAV, AAC, OGG, FLAC, M4A, WMA, MP4, AVI, MOV, MKV, FLV, WMV, WebM
- **🚗 车载优化**: 标准MP3格式 (CBR • 44.1kHz • 128/192kbps)
- **🌍 多语言界面**: 支持20种语言 (中文、英文、日文、韩文等)
- **🔒 隐私保护**: 纯前端处理，文件不上传服务器
- **📱 响应式设计**: 完美适配桌面、平板、手机
- **⚡ 高性能**: 基于FFmpeg.wasm的快速转换

### 🎯 技术亮点
- **SEO优化**: 完整的元数据、结构化数据、站点地图
- **性能优化**: 懒加载、预加载、缓存策略
- **用户体验**: 拖拽上传、实时进度、错误处理
- **现代化UI**: 毛玻璃效果、渐变设计、动画过渡

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000)

### 生产构建
```bash
npm run build
npm start
```

## 🛠️ 技术架构

### 前端技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 14.0.4 | React框架，SSR/SSG支持 |
| **React** | 18.2.0 | UI组件库 |
| **TypeScript** | 5.3.3 | 类型安全 |
| **Tailwind CSS** | 3.3.6 | 样式框架 |
| **FFmpeg.wasm** | 0.12.7 | 音视频处理 |
| **Lucide React** | 0.294.0 | 图标库 |

### 项目结构
```
carMP3/
├── app/                    # Next.js App Router
│   ├── [lang]/            # 多语言路由
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── Header.tsx         # 导航栏
│   ├── AudioConverter.tsx # 转换器
│   └── Footer.tsx         # 页脚
├── utils/                 # 工具函数
│   ├── i18n.ts           # 国际化
│   ├── tdk.ts            # SEO元数据
│   └── structuredData.ts # 结构化数据
├── public/               # 静态资源
│   ├── sitemap.xml      # 站点地图
│   └── robots.txt       # 搜索引擎
└── scripts/             # 构建脚本
```

## 🌍 多语言支持

支持20种语言，包括：
- 🇨🇳 中文 (zh)
- 🇺🇸 英文 (en) 
- 🇯🇵 日文 (ja)
- 🇰🇷 韩文 (ko)
- 🇫🇷 法文 (fr)
- 🇩🇪 德文 (de)
- 🇪🇸 西班牙文 (es)
- 🇷🇺 俄文 (ru)
- 🇮🇹 意大利文 (it)
- 🇵🇹 葡萄牙文 (pt)
- 🇹🇷 土耳其文 (tr)
- 🇳🇱 荷兰文 (nl)
- 🇵🇱 波兰文 (pl)
- 🇺🇦 乌克兰文 (uk)
- 🇻🇳 越南文 (vi)
- 🇹🇭 泰文 (th)
- 🇮🇩 印尼文 (id)
- 🇲🇾 马来文 (ms)
- 🇸🇦 阿拉伯文 (ar)
- 🇮🇱 希伯来文 (he)

## 📊 SEO优化

### 元数据管理
- ✅ 动态TDK (Title, Description, Keywords)
- ✅ 规范链接 (Canonical URLs)
- ✅ 多语言替代链接 (hreflang)
- ✅ Open Graph 和 Twitter Cards
- ✅ Google Search Console 验证

### 结构化数据
- 🏢 **Organization**: 网站组织信息
- 💻 **SoftwareApplication**: 软件应用信息
- 🗺️ **BreadcrumbList**: 面包屑导航
- ❓ **FAQ**: 常见问题
- 📋 **HowTo**: 使用指南

### 站点地图
- 📄 自动生成 `sitemap.xml`
- 🤖 配置 `robots.txt`
- 🔗 包含所有语言页面 (400+ URLs)

## ⚡ 性能优化

### 加载优化
- 🚀 **懒加载组件**: React.lazy + Suspense
- 📦 **代码分割**: 按路由分割
- 🎨 **字体优化**: display: swap, preload
- 🖼️ **图片优化**: WebP/AVIF格式

### 缓存策略
- 💾 **HTTP缓存**: Cache-Control 头
- 🔄 **浏览器缓存**: 静态资源缓存
- ⚡ **Next.js缓存**: 内置优化

### 安全头
- 🛡️ **CORS**: 跨域资源共享
- 🔒 **安全头**: X-Content-Type-Options, X-Frame-Options
- 🚫 **XSS保护**: X-XSS-Protection

## 🎨 UI/UX设计

### 设计系统
- 🎨 **色彩方案**: 渐变主题色
- 🔤 **字体**: Inter 字体族
- 📐 **间距**: 8px 基础单位
- 🎭 **圆角**: 统一圆角设计

### 交互效果
- ✨ **悬停动画**: 缩放、阴影变化
- 🌊 **过渡效果**: 平滑动画
- 💫 **加载状态**: 骨架屏、进度条
- 📱 **响应式**: 移动优先设计

## 🚀 部署

### Vercel (推荐)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t car-mp3-converter .
docker run -p 3000:3000 car-mp3-converter
```

### 自建服务器
```bash
npm run build
npm start
```

### 自动部署
配置Webhook URL进行自动重部署：
```
http://148.230.85.245:3000/api/deploy/MaUjuU3aY3P4byt7v4ckH
```

## 📝 开发指南

### 添加新语言
1. 在 `utils/languageConfig.ts` 中添加语言配置
2. 在 `utils/i18n.ts` 中添加翻译文本
3. 更新 `public/sitemap.xml`

### 自定义样式
- 修改 `tailwind.config.js` 配置主题
- 在 `components/` 中创建新组件
- 使用 Tailwind CSS 类名

### 性能监控
- 使用 Chrome DevTools 分析性能
- 监控 Core Web Vitals
- 优化 Largest Contentful Paint (LCP)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React框架
- [FFmpeg](https://ffmpeg.org/) - 音视频处理
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Lucide](https://lucide.dev/) - 图标库

## 📞 联系我们

- 🌐 网站: [roadmp3.com](https://roadmp3.com)
- 📧 邮箱: [contact@roadmp3.com](mailto:contact@roadmp3.com)
- 🐛 问题反馈: [GitHub Issues](https://github.com/your-repo/issues)

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！ 