import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
   const { t, changeLanguage, locale } = useLanguage();

   return (
      <footer className="footer__area footer-bg">
         <div className="footer__top pt-80 pb-40">
            <div className="container">
               <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                     <div className="footer__widget mb-40">
                        <div className="footer__logo mb-20">
                           <Link href="/">
                              <a>
                                 <img src="/assets/img/logo/logo-white.png" alt="logo" style={{ maxHeight: 40 }} />
                              </a>
                           </Link>
                        </div>
                        <p className="footer__desc">{t('footer.aboutText')}</p>
                        <div className="footer__social mt-25">
                           <a href="#"><i className="fab fa-facebook-f"></i></a>
                           <a href="#"><i className="fab fa-twitter"></i></a>
                           <a href="#"><i className="fab fa-instagram"></i></a>
                           <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6">
                     <div className="footer__widget mb-40">
                        <h4 className="footer__widget-title">{t('footer.quickLinks')}</h4>
                        <ul className="footer__link">
                           <li><Link href="/"><a>{t('nav.home')}</a></Link></li>
                           <li><Link href="/templates"><a>{t('nav.templates')}</a></Link></li>
                           <li><Link href="/order"><a>{t('common.getStarted')}</a></Link></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                     <div className="footer__widget mb-40">
                        <h4 className="footer__widget-title">{t('footer.services')}</h4>
                        <ul className="footer__link">
                           <li><a href="#">{t('services.design')}</a></li>
                           <li><a href="#">{t('services.development')}</a></li>
                           <li><a href="#">{t('services.seo')}</a></li>
                           <li><a href="#">{t('services.hosting')}</a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                     <div className="footer__widget mb-40">
                        <h4 className="footer__widget-title">{t('footer.contact')}</h4>
                        <ul className="footer__contact">
                           <li>
                              <i className="fas fa-envelope"></i>
                              <span>info@example.com</span>
                           </li>
                           <li>
                              <i className="fas fa-phone"></i>
                              <span>+1 234 567 890</span>
                           </li>
                        </ul>
                        <div className="footer__lang mt-20">
                           <button 
                              onClick={() => changeLanguage('en')}
                              className={locale === 'en' ? 'active' : ''}
                           >
                              English
                           </button>
                           <button 
                              onClick={() => changeLanguage('ar')}
                              className={locale === 'ar' ? 'active' : ''}
                           >
                              العربية
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="footer__bottom">
            <div className="container">
               <div className="footer__bottom-inner">
                  <p className="footer__copyright">
                     © {new Date().getFullYear()} {t('footer.copyright')}
                  </p>
               </div>
            </div>
         </div>

         <style jsx>{`
            .footer__area {
               background: #1a1a2e;
               color: #aaa;
            }
            .footer__desc {
               font-size: 14px;
               line-height: 1.8;
               color: #888;
            }
            .footer__social {
               display: flex;
               gap: 10px;
            }
            .footer__social a {
               width: 40px;
               height: 40px;
               border-radius: 50%;
               background: rgba(255,255,255,0.1);
               display: flex;
               align-items: center;
               justify-content: center;
               color: white;
               transition: all 0.3s;
            }
            .footer__social a:hover {
               background: #667eea;
            }
            .footer__widget-title {
               color: white;
               font-size: 18px;
               margin-bottom: 25px;
            }
            .footer__link {
               list-style: none;
               padding: 0;
               margin: 0;
            }
            .footer__link li {
               margin-bottom: 12px;
            }
            .footer__link a {
               color: #888;
               font-size: 14px;
               transition: color 0.3s;
            }
            .footer__link a:hover {
               color: #667eea;
            }
            .footer__contact {
               list-style: none;
               padding: 0;
               margin: 0;
            }
            .footer__contact li {
               display: flex;
               align-items: center;
               gap: 10px;
               margin-bottom: 12px;
               color: #888;
               font-size: 14px;
            }
            .footer__contact i {
               color: #667eea;
               width: 20px;
            }
            .footer__lang {
               display: flex;
               gap: 10px;
            }
            .footer__lang button {
               background: rgba(255,255,255,0.1);
               border: none;
               color: #888;
               padding: 8px 15px;
               border-radius: 5px;
               cursor: pointer;
               font-size: 13px;
               transition: all 0.3s;
            }
            .footer__lang button:hover,
            .footer__lang button.active {
               background: #667eea;
               color: white;
            }
            .footer__bottom {
               border-top: 1px solid rgba(255,255,255,0.1);
               padding: 20px 0;
            }
            .footer__bottom-inner {
               text-align: center;
            }
            .footer__copyright {
               margin: 0;
               font-size: 14px;
               color: #666;
            }
         `}</style>
      </footer>
   );
};

export default Footer;
