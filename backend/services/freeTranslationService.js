import axios from 'axios';

class FreeTranslationService {
  constructor() {
    this.baseUrl = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
  }

  getSupportedLanguages() {
    return {
      en: 'English',
      hi: 'Hindi',
      bn: 'Bengali',
      gu: 'Gujarati',
      kn: 'Kannada',
      ml: 'Malayalam',
      mr: 'Marathi',
      or: 'Odia',
      pa: 'Punjabi',
      ta: 'Tamil',
      te: 'Telugu',
      ur: 'Urdu'
    };
  }

  convertToLibreCode(code) {
    const supported = this.getSupportedLanguages();
    return supported[code] ? code : 'en';
  }

  getVoiceCode(code) {
    const voiceMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      mr: 'mr-IN',
      or: 'or-IN',
      pa: 'pa-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      ur: 'ur-IN'
    };

    return voiceMap[code] || 'en-IN';
  }

  async translateText(text, sourceLang = 'en', targetLang = 'hi') {
    if (!text || targetLang === sourceLang) return text;

    const source = this.convertToLibreCode(sourceLang);
    const target = this.convertToLibreCode(targetLang);

    try {
      const response = await axios.post(this.baseUrl, {
        q: text,
        source,
        target,
        format: 'text'
      });

      return response.data?.translatedText || text;
    } catch (error) {
      return this.simpleTranslate(text, targetLang);
    }
  }

  textToSpeech(text, language = 'hi') {
    return {
      text,
      language,
      voiceCode: this.getVoiceCode(language)
    };
  }

  simpleTranslate(text, targetLang) {
    if (targetLang === 'en') return text;

    const dictionary = {
      hi: {
        'Legal Document': 'कानूनी दस्तावेज़',
        'Court Notice': 'अदालत नोटिस',
        'Legal Notice': 'कानूनी नोटिस',
        'Contract': 'अनुबंध',
        'Summons': 'समन',
        'Court Order': 'अदालती आदेश'
      }
    };

    const map = dictionary[targetLang] || {};
    let translated = text;

    Object.keys(map).forEach((key) => {
      translated = translated.replaceAll(key, map[key]);
    });

    return translated;
  }
}

export default new FreeTranslationService();
