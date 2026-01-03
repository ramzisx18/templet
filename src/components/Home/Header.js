import Link from 'next/link';
import React, { useState } from 'react';
import useSticky from '../../hooks/useSticky';
import SidebarMenu from '../Sidebar/SidebarMenu';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
   const { t } = useLanguage();
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { sticky } = useSticky();

   return (
      <>
         <header>
            <div className={sticky ? "sticky header__area white-bg" : "header__area white-bg"} id="header-sticky">
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-6">
                        <div className="logo">
                           <Link href="/">
                              <a>
                                 <img src="/assets/img/logo/logo.png" alt="logo" />
                              </a>
                           </Link>
                        </div>
                     </div>
                     <div className="col-xxl-7 col-xl-7 col-lg-7 d-none d-lg-block">
                        <div className="main-menu">
                           <nav id="mobile-menu">
                              <ul>
                                 <li>
                                    <Link href="/"><a>{t('nav.home')}</a></Link>
                                 </li>
                                 <li>
                                    <Link href="/templates"><a>{t('nav.templates')}</a></Link>
                                 </li>
                                 <li>
                                    <Link href="/order"><a>{t('nav.services')}</a></Link>
                                 </li>
                                 <li>
                                    <Link href="/contact"><a>{t('nav.contact')}</a></Link>
                                 </li>
                              </ul>
                           </nav>
                        </div>
                     </div>
                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-8 col-6">
                        <div className="header__action d-flex align-items-center justify-content-end">
                           <div className="header__lang d-none d-md-block" style={{ marginLeft: 15 }}>
                              <LanguageSwitcher />
                           </div>
                           <div className="header__btn d-none d-sm-block" style={{ marginLeft: 15 }}>
                              <Link href="/order">
                                 <a className="header__start-btn">
                                    {t('nav.getStarted')}
                                 </a>
                              </Link>
                           </div>
                           <div className="sidebar__menu d-lg-none" onClick={handleShow}>
                              <div className="sidebar-toggle-btn" id="sidebar-toggle">
                                 <span className="line"></span>
                                 <span className="line"></span>
                                 <span className="line"></span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <SidebarMenu show={show} handleClose={handleClose} />

         <style jsx>{`
            .header__start-btn {
               display: inline-block;
               padding: 10px 22px;
               border: 2px solid #667eea;
               color: #667eea;
               border-radius: 8px;
               font-weight: 600;
               font-size: 14px;
               transition: all 0.3s ease;
               background: transparent;
            }
            .header__start-btn:hover {
               background: #667eea;
               color: white;
            }
         `}</style>
      </>
   );
};

export default Header;
