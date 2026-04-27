import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

// Spanish-speaking countries — DR, PR, MX, CU, ES, CO, AR, PE, VE, CL, EC, GT, BO, HN, PY, SV, NI, CR, PA, UY
const SPANISH_COUNTRIES = new Set([
  'DO','PR','MX','CU','ES','CO','AR','PE','VE','CL','EC',
  'GT','BO','HN','PY','SV','NI','CR','PA','UY','GQ','EH'
]);

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, es: { translation: es } },
    fallbackLng: 'en',
    lng: localStorage.getItem('arcg_lang') || 'en',
    interpolation: { escapeValue: false },
    supportedLngs: ['en', 'es'],
  });

// IP geolocation — only runs if user hasn't manually toggled language
if (!localStorage.getItem('arcg_lang_manual')) {
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(data => {
      const country = data.country_code?.toUpperCase();
      const lang = SPANISH_COUNTRIES.has(country) ? 'es' : 'en';
      i18n.changeLanguage(lang);
      localStorage.setItem('arcg_lang', lang);
    })
    .catch(() => {
      // Fallback: use browser language if IP lookup fails
      const browserLang = navigator.language?.toLowerCase();
      if (browserLang?.startsWith('es')) {
        i18n.changeLanguage('es');
        localStorage.setItem('arcg_lang', 'es');
      }
    });
}

export default i18n;
