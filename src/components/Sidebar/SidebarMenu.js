import Link from 'next/link';
import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';

const SidebarMenu = ({ show, handleClose }) => {
   const { t, locale, changeLanguage } = useLanguage();

   return (
      <div>
         <Offcanvas show={show} onHide={handleClose} placement='end' className='side__bar'>
            <Offcanvas.Header closeButton>
               <div className="logo">
                  <Link href="/">
                     <a>
                        <img src="/assets/img/logo/logo-white.png" alt="logo" />
                     </a>
                  </Link>
               </div>
            </Offcanvas.Header>

            <Offcanvas.Body>
               <div className="sidebar__content">
                  <div className="mobile-menu">
                     <nav>
                        <ul className="sidebar__menu">
                           <li>
                              <Link href="/"><a onClick={handleClose}>{t('nav.home')}</a></Link>
                           </li>
                           <li>
                              <Link href="/templates"><a onClick={handleClose}>{t('nav.templates')}</a></Link>
                           </li>
                           <li>
                              <Link href="/order"><a onClick={handleClose}>{t('nav.services')}</a></Link>
                           </li>
                           <li>
                              <Link href="/contact"><a onClick={handleClose}>{t('nav.contact')}</a></Link>
                           </li>
                        </ul>
                     </nav>
                  </div>

                  <div className="sidebar__lang mt-30">
                     <button 
                        onClick={() => changeLanguage('en')}
                        className={locale === 'en' ? 'active' : ''}
                     >
                        🇺🇸 English
                     </button>
                     <button 
                        onClick={() => changeLanguage('ar')}
                        className={locale === 'ar' ? 'active' : ''}
                     >
                        🇸🇦 العربية
                     </button>
                  </div>

                  <div className="sidebar__btn mt-30">
                     <Link href="/order">
                        <a className="m-btn m-btn-2 w-100" onClick={handleClose}>
                           <span></span> {t('nav.getStarted')}
                        </a>
                     </Link>
                  </div>
               </div>
            </Offcanvas.Body>
         </Offcanvas>

         <style jsx global>{`
            .side__bar {
               background: #1a1a2e !important;
            }
            .side__bar .btn-close {
               filter: invert(1);
            }
            .sidebar__menu {
               list-style: none;
               padding: 0;
               margin: 0;
            }
            .sidebar__menu li {
               border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            .sidebar__menu a {
               display: block;
               padding: 15px 0;
               color: #aaa;
               font-size: 16px;
               transition: color 0.3s;
            }
            .sidebar__menu a:hover {
               color: white;
            }
            .sidebar__lang {
               display: flex;
               gap: 10px;
            }
            .sidebar__lang button {
               flex: 1;
               background: rgba(255,255,255,0.1);
               border: none;
               color: #aaa;
               padding: 12px;
               border-radius: 8px;
               cursor: pointer;
               transition: all 0.3s;
            }
            .sidebar__lang button:hover,
            .sidebar__lang button.active {
               background: #667eea;
               color: white;
            }
         `}</style>
      </div>
   );
};

export default SidebarMenu;
