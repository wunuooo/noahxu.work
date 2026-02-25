import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh', // 如果检测失败，默认使用中文
    interpolation: {
      escapeValue: false // React本身可以防止XSS攻击
    }
  });

export default i18n;
