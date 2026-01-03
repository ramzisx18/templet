import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const HeroArea = () => {
   const { t } = useLanguage();

   return (
      <section className="hero__area d-flex align-items-center">
         {/* Video Background */}
         <div className="hero__video-bg">
            <video autoPlay muted loop playsInline>
               <source src="/bg.mp4" type="video/mp4" />
            </video>
            <div className="hero__overlay"></div>
         </div>

         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="hero__content">
                     <h1 className="hero__title">
                        {t('hero.title')} <br />
                        <span className="hero__highlight">{t('hero.titleHighlight')}</span>
                     </h1>
                     <p className="hero__desc">{t('hero.description')}</p>
                     <div className="hero__btn d-flex flex-wrap gap-3 mt-40">
                        <Link href="/order">
                           <a className="hero__btn-primary">
                              {t('hero.startBtn')}
                           </a>
                        </Link>
                        <Link href="/templates">
                           <a className="hero__btn-outline">
                              {t('hero.viewTemplates')}
                           </a>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="col-lg-6 d-none d-lg-block">
                  <div className="hero__image">
                     <img src="/assets/img/index.png" alt="Website Design" />
                  </div>
               </div>
            </div>
         </div>

         <style jsx>{`
            .hero__area {
               min-height: 100vh;
               position: relative;
               overflow: hidden;
            }
            .hero__video-bg {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               z-index: 0;
            }
            .hero__video-bg video {
               width: 100%;
               height: 100%;
               object-fit: cover;
            }
            .hero__overlay {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background: linear-gradient(135deg, rgba(102,126,234,0.85) 0%, rgba(118,75,162,0.85) 100%);
            }
            .hero__content {
               position: relative;
               z-index: 2;
            }
            .hero__title {
               font-size: 52px;
               font-weight: 700;
               color: white;
               line-height: 1.2;
               margin-bottom: 25px;
               text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
            .hero__highlight {
               background: linear-gradient(90deg, #fff 0%, #f0f0f0 100%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
            }
            .hero__desc {
               font-size: 18px;
               color: rgba(255,255,255,0.95);
               line-height: 1.7;
               margin-bottom: 10px;
            }
            .hero__image {
               position: relative;
               z-index: 2;
            }
            .hero__image img {
               width: 100%;
               max-width: 550px;
               height: auto;
            }
            .hero__btn-primary {
               display: inline-block;
               background: white;
               color: #667eea;
               padding: 16px 38px;
               border-radius: 10px;
               font-weight: 600;
               font-size: 15px;
               text-decoration: none;
               transition: all 0.3s ease;
               box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }
            .hero__btn-primary:hover {
               transform: translateY(-3px);
               box-shadow: 0 10px 30px rgba(255,255,255,0.3);
               color: #764ba2;
            }
            .hero__btn-outline {
               display: inline-block;
               background: rgba(255,255,255,0.1);
               backdrop-filter: blur(10px);
               color: white;
               padding: 16px 38px;
               border-radius: 10px;
               font-weight: 600;
               font-size: 15px;
               text-decoration: none;
               border: 2px solid rgba(255,255,255,0.4);
               transition: all 0.3s ease;
            }
            .hero__btn-outline:hover {
               background: white;
               color: #667eea;
               border-color: white;
            }
            @media (max-width: 991px) {
               .hero__area { min-height: auto; padding: 140px 0 100px; }
               .hero__content { text-align: center; }
               .hero__btn { justify-content: center; }
            }
            @media (max-width: 768px) {
               .hero__area { padding: 120px 0 80px; }
               .hero__title { font-size: 32px; }
               .hero__desc { font-size: 15px; }
               .hero__btn-primary, .hero__btn-outline {
                  padding: 14px 28px;
                  font-size: 14px;
               }
            }
         `}</style>
      </section>
   );
};

export default HeroArea;
