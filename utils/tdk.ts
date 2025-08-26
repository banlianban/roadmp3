import type { Metadata } from 'next'
import { generateCanonicalUrl, generateAlternateUrls } from './canonicalUrl'

export interface TDKConfig {
  title: string
  description: string
  keywords: string
}

export const tdkConfigs: Record<string, TDKConfig> = {
  en: {
    title: 'RoadMP3 | 🚗 Convert Any Audio or Video to Car-Compatible MP3 Online Free',
    description: 'Trouble playing songs in your car stereo? RoadMP3 lets you quickly convert any audio or video into car-compatible MP3 format (CBR, 128/192kbps, 44.1kHz). Extract music from YouTube, TikTok, MP4, WAV, FLAC, and more. Free, fast, and easy to use—no software required.',
    keywords: 'road mp3, car mp3 converter, car audio mp3, convert song to car mp3, play music in car, mp3 for car stereo, video to car mp3, youtube to car mp3, car music converter, car stereo music format'
  },
  zh: {
    title: 'RoadMP3 | 🚗 免费在线音视频转车载MP3格式转换器',
    description: '车载音响播放音乐有问题？RoadMP3让您快速将任何音频或视频转换为车载兼容的MP3格式（CBR、128/192kbps、44.1kHz）。从YouTube、TikTok、MP4、WAV、FLAC等格式提取音乐。免费、快速、易用——无需安装软件。',
    keywords: '车载mp3,汽车mp3转换器,车载音频mp3,歌曲转车载mp3,车载播放音乐,车载音响mp3,视频转车载mp3,youtube转车载mp3,车载音乐转换器,车载音响音乐格式'
  },
  ja: {
    title: 'RoadMP3 | 🚗 車載対応MP3形式に音声・動画を無料オンライン変換',
    description: 'カーオーディオで音楽が再生できない？RoadMP3で音声や動画を車載対応MP3形式（CBR、128/192kbps、44.1kHz）に素早く変換。YouTube、TikTok、MP4、WAV、FLACなどから音楽を抽出。無料、高速、簡単使用—ソフトウェア不要。',
    keywords: 'ロードmp3,車載mp3コンバーター,車載オーディオmp3,車載mp3に変換,車載で音楽再生,車載ステレオmp3,動画から車載mp3,youtubeから車載mp3,車載音楽コンバーター,車載ステレオ音楽形式'
  },
  ko: {
    title: 'RoadMP3 | 🚗 오디오 또는 비디오를 차량 호환 MP3로 무료 온라인 변환',
    description: '차량 오디오에서 음악 재생에 문제가 있나요? RoadMP3로 오디오나 비디오를 차량 호환 MP3 형식(CBR, 128/192kbps, 44.1kHz)으로 빠르게 변환하세요. YouTube, TikTok, MP4, WAV, FLAC 등에서 음악을 추출합니다. 무료, 빠르고, 사용하기 쉬움—소프트웨어 불필요.',
    keywords: '로드mp3,차량mp3변환기,차량오디오mp3,차량mp3로변환,차량에서음악재생,차량스테레오mp3,비디오를차량mp3로,youtube를차량mp3로,차량음악변환기,차량스테레오음악형식'
  },
  fr: {
    title: 'RoadMP3 | 🚗 Convertisseur Audio/Video en MP3 Compatible Voiture Gratuit en Ligne',
    description: 'Problème pour écouter de la musique dans votre autoradio ? RoadMP3 vous permet de convertir rapidement tout audio ou vidéo en format MP3 compatible voiture (CBR, 128/192kbps, 44.1kHz). Extrayez de la musique depuis YouTube, TikTok, MP4, WAV, FLAC et plus. Gratuit, rapide et facile à utiliser—aucun logiciel requis.',
    keywords: 'road mp3, convertisseur mp3 voiture, audio mp3 voiture, convertir chanson en mp3 voiture, écouter musique en voiture, mp3 pour autoradio, vidéo vers mp3 voiture, youtube vers mp3 voiture, convertisseur musique voiture, format musique autoradio'
  },
  de: {
    title: 'RoadMP3 | 🚗 Kostenloser Online Audio/Video zu Auto-kompatiblem MP3 Konverter',
    description: 'Probleme beim Abspielen von Musik im Auto? RoadMP3 ermöglicht es Ihnen, schnell Audio oder Video in Auto-kompatibles MP3-Format (CBR, 128/192kbps, 44.1kHz) zu konvertieren. Extrahieren Sie Musik aus YouTube, TikTok, MP4, WAV, FLAC und mehr. Kostenlos, schnell und einfach zu bedienen—keine Software erforderlich.',
    keywords: 'road mp3, auto mp3 konverter, auto audio mp3, lied zu auto mp3 konvertieren, musik im auto abspielen, mp3 für auto stereo, video zu auto mp3, youtube zu auto mp3, auto musik konverter, auto stereo musik format'
  },
  es: {
    title: 'RoadMP3 | 🚗 Convertidor Gratuito Online de Audio/Video a MP3 Compatible con Coche',
    description: '¿Problemas para reproducir música en tu estéreo de coche? RoadMP3 te permite convertir rápidamente cualquier audio o video a formato MP3 compatible con coche (CBR, 128/192kbps, 44.1kHz). Extrae música de YouTube, TikTok, MP4, WAV, FLAC y más. Gratis, rápido y fácil de usar—sin software requerido.',
    keywords: 'road mp3, convertidor mp3 coche, audio mp3 coche, convertir canción a mp3 coche, reproducir música en coche, mp3 para estéreo coche, video a mp3 coche, youtube a mp3 coche, convertidor música coche, formato música estéreo coche'
  },
  ru: {
    title: 'RoadMP3 | 🚗 Бесплатный Онлайн Конвертер Аудио/Видео в MP3 для Автомобиля',
    description: 'Проблемы с воспроизведением музыки в автомобильной стереосистеме? RoadMP3 позволяет быстро конвертировать любое аудио или видео в автомобильный MP3 формат (CBR, 128/192kbps, 44.1kHz). Извлекайте музыку из YouTube, TikTok, MP4, WAV, FLAC и других источников. Бесплатно, быстро и просто в использовании—программное обеспечение не требуется.',
    keywords: 'road mp3, конвертер mp3 для автомобиля, автомобильное аудио mp3, конвертировать песню в автомобильный mp3, воспроизводить музыку в автомобиле, mp3 для автомобильной стереосистемы, видео в автомобильный mp3, youtube в автомобильный mp3, конвертер музыки для автомобиля, формат музыки автомобильной стереосистемы'
  },
  it: {
    title: 'RoadMP3 | 🚗 Convertitore Gratuito Online Audio/Video in MP3 Compatibile Auto',
    description: 'Problemi a riprodurre musica nell\'autoradio? RoadMP3 ti permette di convertire rapidamente qualsiasi audio o video in formato MP3 compatibile con l\'auto (CBR, 128/192kbps, 44.1kHz). Estrai musica da YouTube, TikTok, MP4, WAV, FLAC e altro. Gratuito, veloce e facile da usare—nessun software richiesto.',
    keywords: 'road mp3, convertitore mp3 auto, audio mp3 auto, convertire canzone in mp3 auto, riprodurre musica in auto, mp3 per stereo auto, video in mp3 auto, youtube in mp3 auto, convertitore musica auto, formato musica stereo auto'
  },
  pt: {
    title: 'RoadMP3 | 🚗 Conversor Gratuito Online de Áudio/Vídeo para MP3 Compatível com Carro',
    description: 'Problemas para tocar música no seu rádio de carro? RoadMP3 permite converter rapidamente qualquer áudio ou vídeo para formato MP3 compatível com carro (CBR, 128/192kbps, 44.1kHz). Extraia música do YouTube, TikTok, MP4, WAV, FLAC e mais. Gratuito, rápido e fácil de usar—sem software necessário.',
    keywords: 'road mp3, conversor mp3 carro, áudio mp3 carro, converter música para mp3 carro, tocar música no carro, mp3 para rádio carro, vídeo para mp3 carro, youtube para mp3 carro, conversor música carro, formato música rádio carro'
  },
  tr: {
    title: 'RoadMP3 | 🚗 Ses/Video\'yi Araba Uyumlu MP3\'e Ücretsiz Çevrimiçi Dönüştürücü',
    description: 'Araba stereo\'nuzda müzik çalmakta sorun mu yaşıyorsunuz? RoadMP3, herhangi bir ses veya videoyu araba uyumlu MP3 formatına (CBR, 128/192kbps, 44.1kHz) hızlıca dönüştürmenizi sağlar. YouTube, TikTok, MP4, WAV, FLAC ve daha fazlasından müzik çıkarın. Ücretsiz, hızlı ve kullanımı kolay—yazılım gerekmez.',
    keywords: 'road mp3, araba mp3 dönüştürücü, araba ses mp3, şarkıyı araba mp3\'e dönüştür, arabada müzik çal, araba stereo mp3, video\'yi araba mp3\'e, youtube\'u araba mp3\'e, araba müzik dönüştürücü, araba stereo müzik formatı'
  },
  nl: {
    title: 'RoadMP3 | 🚗 Gratis Online Audio/Video naar Auto-compatibel MP3 Converter',
    description: 'Problemen met het afspelen van muziek in je autoradio? RoadMP3 laat je snel audio of video converteren naar auto-compatibel MP3-formaat (CBR, 128/192kbps, 44.1kHz). Haal muziek uit YouTube, TikTok, MP4, WAV, FLAC en meer. Gratis, snel en eenvoudig te gebruiken—geen software vereist.',
    keywords: 'road mp3, auto mp3 converter, auto audio mp3, lied naar auto mp3 converteren, muziek afspelen in auto, mp3 voor auto stereo, video naar auto mp3, youtube naar auto mp3, auto muziek converter, auto stereo muziek formaat'
  },
  pl: {
    title: 'RoadMP3 | 🚗 Darmowy Konwerter Online Audio/Wideo do MP3 Kompatybilnego z Samochodem',
    description: 'Problemy z odtwarzaniem muzyki w samochodowym stereo? RoadMP3 pozwala szybko konwertować dowolne audio lub wideo do formatu MP3 kompatybilnego z samochodem (CBR, 128/192kbps, 44.1kHz). Wyciągnij muzykę z YouTube, TikTok, MP4, WAV, FLAC i innych. Darmowy, szybki i łatwy w użyciu—nie wymaga oprogramowania.',
    keywords: 'road mp3, konwerter mp3 samochód, audio mp3 samochód, konwertować piosenkę do mp3 samochód, odtwarzać muzykę w samochodzie, mp3 dla stereo samochód, wideo do mp3 samochód, youtube do mp3 samochód, konwerter muzyki samochód, format muzyki stereo samochód'
  },
  uk: {
    title: 'RoadMP3 | 🚗 Безкоштовний Онлайн Конвертер Аудіо/Відео в MP3 для Автомобіля',
    description: 'Проблеми з відтворенням музики в автомобільній стереосистемі? RoadMP3 дозволяє швидко конвертувати будь-яке аудіо або відео в автомобільний MP3 формат (CBR, 128/192kbps, 44.1kHz). Витягуйте музику з YouTube, TikTok, MP4, WAV, FLAC та інших джерел. Безкоштовно, швидко та просто у використанні—програмне забезпечення не потрібне.',
    keywords: 'road mp3, конвертер mp3 для автомобіля, автомобільне аудіо mp3, конвертувати пісню в автомобільний mp3, відтворювати музику в автомобілі, mp3 для автомобільної стереосистеми, відео в автомобільний mp3, youtube в автомобільний mp3, конвертер музики для автомобіля, формат музики автомобільної стереосистеми'
  },
  vi: {
    title: 'RoadMP3 | 🚗 Bộ Chuyển Đổi Âm Thanh/Video Sang MP3 Tương Thích Ô Tô Miễn Phí Trực Tuyến',
    description: 'Gặp vấn đề khi phát nhạc trong hệ thống âm thanh ô tô? RoadMP3 cho phép bạn nhanh chóng chuyển đổi bất kỳ âm thanh hoặc video nào sang định dạng MP3 tương thích ô tô (CBR, 128/192kbps, 44.1kHz). Trích xuất nhạc từ YouTube, TikTok, MP4, WAV, FLAC và nhiều hơn nữa. Miễn phí, nhanh và dễ sử dụng—không cần phần mềm.',
    keywords: 'road mp3, bộ chuyển đổi mp3 ô tô, âm thanh mp3 ô tô, chuyển đổi bài hát sang mp3 ô tô, phát nhạc trong ô tô, mp3 cho hệ thống âm thanh ô tô, video sang mp3 ô tô, youtube sang mp3 ô tô, bộ chuyển đổi nhạc ô tô, định dạng nhạc hệ thống âm thanh ô tô'
  },
  th: {
    title: 'RoadMP3 | 🚗 เครื่องแปลงเสียง/วิดีโอเป็น MP3 ที่เข้ากันได้กับรถยนต์ออนไลน์ฟรี',
    description: 'มีปัญหาในการเล่นเพลงในระบบเสียงรถยนต์? RoadMP3 ช่วยให้คุณแปลงเสียงหรือวิดีโอใดๆ เป็นรูปแบบ MP3 ที่เข้ากันได้กับรถยนต์ (CBR, 128/192kbps, 44.1kHz) ได้อย่างรวดเร็ว ดึงเพลงจาก YouTube, TikTok, MP4, WAV, FLAC และอื่นๆ ฟรี เร็ว และใช้งานง่าย—ไม่ต้องใช้ซอฟต์แวร์',
    keywords: 'road mp3, เครื่องแปลง mp3 รถยนต์, เสียง mp3 รถยนต์, แปลงเพลงเป็น mp3 รถยนต์, เล่นเพลงในรถยนต์, mp3 สำหรับระบบเสียงรถยนต์, วิดีโอเป็น mp3 รถยนต์, youtube เป็น mp3 รถยนต์, เครื่องแปลงเพลงรถยนต์, รูปแบบเพลงระบบเสียงรถยนต์'
  },
  id: {
    title: 'RoadMP3 | 🚗 Konverter Audio/Video ke MP3 Kompatibel Mobil Gratis Online',
    description: 'Masalah memutar musik di stereo mobil? RoadMP3 memungkinkan Anda dengan cepat mengkonversi audio atau video apa pun ke format MP3 yang kompatibel dengan mobil (CBR, 128/192kbps, 44.1kHz). Ekstrak musik dari YouTube, TikTok, MP4, WAV, FLAC dan lainnya. Gratis, cepat dan mudah digunakan—tidak memerlukan perangkat lunak.',
    keywords: 'road mp3, konverter mp3 mobil, audio mp3 mobil, konversi lagu ke mp3 mobil, putar musik di mobil, mp3 untuk stereo mobil, video ke mp3 mobil, youtube ke mp3 mobil, konverter musik mobil, format musik stereo mobil'
  },
  ms: {
    title: 'RoadMP3 | 🚗 Penukar Audio/Video ke MP3 Serasi Kereta Percuma Dalam Talian',
    description: 'Masalah memainkan muzik dalam stereo kereta? RoadMP3 membolehkan anda menukar sebarang audio atau video dengan pantas ke format MP3 yang serasi dengan kereta (CBR, 128/192kbps, 44.1kHz). Ekstrak muzik dari YouTube, TikTok, MP4, WAV, FLAC dan banyak lagi. Percuma, pantas dan mudah digunakan—tiada perisian diperlukan.',
    keywords: 'road mp3, penukar mp3 kereta, audio mp3 kereta, tukar lagu ke mp3 kereta, main muzik dalam kereta, mp3 untuk stereo kereta, video ke mp3 kereta, youtube ke mp3 kereta, penukar muzik kereta, format muzik stereo kereta'
  },
  ar: {
    title: 'RoadMP3 | 🚗 محول صوت/فيديو مجاني عبر الإنترنت إلى MP3 متوافق مع السيارة',
    description: 'مشكلة في تشغيل الموسيقى في ستيريو السيارة؟ يتيح لك RoadMP3 تحويل أي صوت أو فيديو بسرعة إلى تنسيق MP3 متوافق مع السيارة (CBR، 128/192kbps، 44.1kHz). استخرج الموسيقى من YouTube وTikTok وMP4 وWAV وFLAC والمزيد. مجاني وسريع وسهل الاستخدام—لا يتطلب برامج.',
    keywords: 'road mp3, محول mp3 السيارة, صوت mp3 السيارة, تحويل الأغنية إلى mp3 السيارة, تشغيل الموسيقى في السيارة, mp3 لستيريو السيارة, فيديو إلى mp3 السيارة, youtube إلى mp3 السيارة, محول موسيقى السيارة, تنسيق موسيقى ستيريو السيارة'
  },
  he: {
    title: 'RoadMP3 | 🚗 ממיר אודיו/וידאו חינמי מקוון ל-MP3 תואם רכב',
    description: 'בעיות בהשמעת מוזיקה בסטריאו הרכב? RoadMP3 מאפשר לך להמיר במהירות כל אודיו או וידאו לפורמט MP3 תואם רכב (CBR, 128/192kbps, 44.1kHz). חלץ מוזיקה מ-YouTube, TikTok, MP4, WAV, FLAC ועוד. חינמי, מהיר וקל לשימוש—אין צורך בתוכנה.',
    keywords: 'road mp3, ממיר mp3 רכב, אודיו mp3 רכב, המר שיר ל-mp3 רכב, השמע מוזיקה ברכב, mp3 לסטריאו רכב, וידאו ל-mp3 רכב, youtube ל-mp3 רכב, ממיר מוזיקה רכב, פורמט מוזיקה סטריאו רכב'
  }
}

export function getTDK(lang: string = 'en'): TDKConfig {
  return tdkConfigs[lang] || tdkConfigs.en
}

export function generateMetadata(lang: string = 'en', pathname: string = '/'): Metadata {
  const tdk = getTDK(lang)
  const canonicalUrl = generateCanonicalUrl(pathname, lang)
  const alternateUrls = generateAlternateUrls(pathname, lang)
  
  return {
    title: tdk.title,
    description: tdk.description,
    keywords: tdk.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls.reduce((acc, item) => {
        acc[item.hreflang] = item.href
        return acc
      }, {} as Record<string, string>)
    },
    openGraph: {
      title: tdk.title,
      description: tdk.description,
      type: 'website',
      locale: lang,
      siteName: 'RoadMP3',
      url: canonicalUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: tdk.title,
      description: tdk.description
    }
  }
} 