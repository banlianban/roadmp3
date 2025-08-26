// 示例测试文件 - 可以用来验证 canonical URL 生成功能
// 这不是真正的测试文件，只是演示如何使用这些函数

import { generateCanonicalUrl, generateAlternateUrls } from './canonicalUrl'

// 测试例子
console.log('=== Canonical URL 测试 ===')

// 测试根路径
console.log('根路径 (英文):', generateCanonicalUrl('/', 'en'))
console.log('根路径 (中文):', generateCanonicalUrl('/', 'zh'))

// 测试语言路径
console.log('中文首页:', generateCanonicalUrl('/zh', 'zh'))
console.log('英文首页:', generateCanonicalUrl('/en', 'en'))

// 测试子页面路径
console.log('中文转换页面:', generateCanonicalUrl('/zh/wav-mp3', 'zh'))
console.log('英文转换页面:', generateCanonicalUrl('/en/wav-mp3', 'en'))

console.log('\n=== Alternate URLs 测试 ===')

// 测试根路径的所有语言版本
const rootAlternates = generateAlternateUrls('/', 'en')
console.log('根路径的所有语言版本:')
rootAlternates.forEach(alt => {
  console.log(`  ${alt.hreflang}: ${alt.href}`)
})

console.log('\n转换页面的所有语言版本:')
const pageAlternates = generateAlternateUrls('/zh/wav-mp3', 'zh')
pageAlternates.slice(0, 5).forEach(alt => { // 只显示前5个
  console.log(`  ${alt.hreflang}: ${alt.href}`)
})

// 预期输出示例：
// 根路径 (英文): https://roadmp3.com/
// 根路径 (中文): https://roadmp3.com/zh
// 中文首页: https://roadmp3.com/zh
// 英文首页: https://roadmp3.com/en
// 中文转换页面: https://roadmp3.com/zh/wav-mp3
// 英文转换页面: https://roadmp3.com/en/wav-mp3
//
// 根路径的所有语言版本:
//   zh-CN: https://roadmp3.com/zh
//   en: https://roadmp3.com/
//   ja: https://roadmp3.com/ja
//   ...
//   x-default: https://roadmp3.com/