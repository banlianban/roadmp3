# 多语言TDK系统使用指南

## 概述

本项目实现了完整的多语言TDK（Title、Description、Keywords）系统，支持20种语言的SEO优化。

## 支持的语言

| 代码 | 语言 | 本地化名称 |
|------|------|------------|
| en | English | English |
| zh | 中文 | 中文 |
| ja | 日本語 | 日本語 |
| ko | 한국어 | 한국어 |
| fr | Français | Français |
| de | Deutsch | Deutsch |
| es | Español | Español |
| ru | Русский | Русский |
| it | Italiano | Italiano |
| pt | Português | Português |
| tr | Türkçe | Türkçe |
| nl | Nederlands | Nederlands |
| pl | Polski | Polski |
| uk | Українська | Українська |
| vi | Tiếng Việt | Tiếng Việt |
| th | ไทย | ไทย |
| id | Bahasa Indonesia | Bahasa Indonesia |
| ms | Bahasa Melayu | Bahasa Melayu |
| ar | العربية | العربية |
| he | עברית | עברית |

## 文件结构

```
utils/
├── tdk.ts                    # 主要TDK配置文件
├── tdk-usage-example.ts      # 使用示例
├── languageConfig.ts          # 语言配置（静态数据，服务端可用）
└── i18n.ts                   # 国际化配置（已存在）
```

## 基本使用方法

### 1. 获取特定语言的TDK

```typescript
import { getTDK } from '@/utils/tdk'

// 获取中文TDK
const chineseTDK = getTDK('zh')
console.log(chineseTDK.title)      // "RoadMP3 | 🚗 免费在线音视频转车载MP3格式转换器"
console.log(chineseTDK.description) // 中文描述
console.log(chineseTDK.keywords)    // 中文关键词
```

### 2. 在Next.js页面中使用动态metadata

```typescript
import { generateMetadata } from '@/utils/tdk'

// 在页面组件中
export async function generateMetadata({ params }: { params: { lang: string } }) {
  return generateMetadata(params.lang)
}
```

### 3. 在React组件中使用

```typescript
import { useTDK } from '@/utils/tdk-usage-example'

function MyComponent() {
  const tdk = useTDK('zh')
  
  return (
    <div>
      <title>{tdk.title}</title>
      <meta name="description" content={tdk.description} />
      <meta name="keywords" content={tdk.keywords} />
    </div>
  )
}
```

## 高级功能

### 1. 语言检测和回退

```typescript
import { detectLanguage } from '@/utils/tdk-usage-example'

const userLang = detectLanguage('zh', 'en') // 如果zh支持，返回zh，否则返回en
```

### 2. 获取所有支持的语言

```typescript
import { getSupportedLanguages } from '@/utils/tdk-usage-example'

const languages = getSupportedLanguages()
// 返回所有支持的语言列表
```

### 3. 自定义TDK配置

如果需要添加新的语言或修改现有配置，编辑 `utils/tdk.ts` 文件：

```typescript
export const tdkConfigs: Record<string, TDKConfig> = {
  // 添加新语言
  'new-lang': {
    title: 'Your Title',
    description: 'Your Description',
    keywords: 'your, keywords, here'
  }
}
```

## SEO优化特性

### 1. Open Graph支持

系统自动生成Open Graph标签：

```typescript
openGraph: {
  title: tdk.title,
  description: tdk.description,
  type: 'website',
  locale: lang,
  siteName: 'RoadMP3'
}
```

### 2. Twitter Card支持

自动生成Twitter Card标签：

```typescript
twitter: {
  card: 'summary_large_image',
  title: tdk.title,
  description: tdk.description
}
```

## 最佳实践

### 1. 语言回退策略

始终提供语言回退机制：

```typescript
const tdk = getTDK(userLang || 'en') // 默认回退到英文
```

### 2. 动态路由集成

在Next.js动态路由中使用：

```typescript
// app/[lang]/page.tsx
export async function generateMetadata({ params }: { params: { lang: string } }) {
  return generateMetadata(params.lang)
}
```

### 3. 性能优化

TDK配置是静态的，不会影响运行时性能。所有配置在构建时确定。

## 维护和更新

### 添加新语言

1. 在 `tdkConfigs` 中添加新语言配置
2. 在 `getSupportedLanguages()` 中添加语言信息
3. 更新文档

### 更新现有语言

直接修改 `tdkConfigs` 中对应语言的配置即可。

## 注意事项

1. 所有TDK内容都经过SEO优化，包含相关关键词
2. 描述长度控制在160字符以内，适合搜索引擎显示
3. 关键词使用逗号分隔，避免重复
4. 标题包含品牌名称和主要功能描述

## 技术支持

如有问题或需要添加新语言支持，请参考 `utils/tdk-usage-example.ts` 中的示例代码。 