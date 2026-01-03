import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { locale, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const handleSelect = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="lang-switcher">
      <button 
        className="lang-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className="lang-flag">{currentLang.flag}</span>
        <span className="lang-code">{locale.toUpperCase()}</span>
        <svg className={`lang-arrow ${isOpen ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="lang-overlay" onClick={() => setIsOpen(false)} />
          <div className="lang-dropdown">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-option ${locale === lang.code ? 'active' : ''}`}
                onClick={() => handleSelect(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-name">{lang.name}</span>
                {locale === lang.code && (
                  <svg className="lang-check" width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L5 9L13 1" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .lang-switcher {
          position: relative;
          z-index: 1000;
        }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .lang-btn:hover {
          border-color: #667eea;
          box-shadow: 0 2px 8px rgba(102,126,234,0.15);
        }
        .lang-flag {
          font-size: 16px;
          line-height: 1;
        }
        .lang-code {
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        .lang-arrow {
          transition: transform 0.2s ease;
          margin-left: 2px;
        }
        .lang-arrow.open {
          transform: rotate(180deg);
        }
        .lang-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 998;
        }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.12);
          min-width: 160px;
          overflow: hidden;
          animation: slideDown 0.2s ease;
          z-index: 999;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          color: #334155;
          transition: background 0.15s ease;
          text-align: left;
        }
        .lang-option:hover {
          background: #f8fafc;
        }
        .lang-option.active {
          background: #f0f4ff;
          color: #667eea;
        }
        .lang-name {
          flex: 1;
          font-weight: 500;
        }
        .lang-check {
          flex-shrink: 0;
        }
        .lang-option:first-child {
          border-radius: 11px 11px 0 0;
        }
        .lang-option:last-child {
          border-radius: 0 0 11px 11px;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
