import React, { createContext, useContext, useState, useEffect } from 'react';
import locales from '../locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState(locales.en);

  useEffect(() => {
    // تحميل اللغة المحفوظة
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('siteLanguage') || 'en';
      setLocale(savedLocale);
      setTranslations(locales[savedLocale] || locales.en);
      
      // تطبيق اتجاه الصفحة
      document.documentElement.dir = locales[savedLocale]?.dir || 'ltr';
      document.documentElement.lang = savedLocale;
    }
  }, []);

  const changeLanguage = (newLocale) => {
    if (locales[newLocale]) {
      setLocale(newLocale);
      setTranslations(locales[newLocale]);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('siteLanguage', newLocale);
        document.documentElement.dir = locales[newLocale].dir;
        document.documentElement.lang = newLocale;
      }
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // إرجاع المفتاح إذا لم يوجد الترجمة
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
