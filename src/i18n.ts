import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import ptTranslation from './locales/pt.json';
import esTranslation from './locales/es.json';

const resources = {
  en: { translation: enTranslation },
  pt: { translation: ptTranslation },
  es: { translation: esTranslation },
};

const savedLanguage = localStorage.getItem('language') || 'pt';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
