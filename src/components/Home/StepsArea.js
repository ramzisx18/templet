import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const StepsArea = () => {
   const { t } = useLanguage();

   const steps = [
      {
         num: '01',
         image: '/assets/img/How We Work/Choose CMS.png',
         titleKey: 'steps.step1Title',
         descKey: 'steps.step1Desc',
         hoverDesc: 'steps.step1Hover',
         color: '#667eea',
      },
      {
         num: '02',
         image: '/assets/img/How We Work/Select Project Type.png',
         titleKey: 'steps.step2Title',
         descKey: 'steps.step2Desc',
         hoverDesc: 'steps.step2Hover',
         color: '#764ba2',
      },
      {
         num: '03',
         image: '/assets/img/How We Work/Pick Design.png',
         titleKey: 'steps.step3Title',
         descKey: 'steps.step3Desc',
         hoverDesc: 'steps.step3Hover',
         color: '#f093fb',
      },
   ];

   return (
      <section className="steps__area pt-110 pb-80">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title-wrapper text-center mb-55">
                     <h2 className="section__title">{t('steps.title')}</h2>
                     <p>{t('steps.subtitle')}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               {steps.map((step, index) => (
                  <div key={index} className="col-xl-4 col-lg-4 col-md-6">
                     <div className="steps__item text-center mb-30">
                        <div className="steps__content">
                           <div className="steps__icon mb-30" style={{ background: `${step.color}15` }}>
                              <img src={step.image} alt={t(step.titleKey)} className="steps__image" />
                              <span className="steps__num" style={{ background: step.color }}>{step.num}</span>
                           </div>
                           <h4 className="steps__title">{t(step.titleKey)}</h4>
                           <p className="steps__desc">{t(step.descKey)}</p>
                        </div>
                        
                        <div className="steps__overlay" style={{ background: `${step.color}ee` }}>
                           <div className="steps__overlay-content">
                              <h4 className="steps__overlay-title">{t(step.titleKey)}</h4>
                              <p className="steps__overlay-desc">
                                 {t(step.hoverDesc) || t(step.descKey)}
                              </p>
                              <Link href="/templates">
                                 <a className="steps__overlay-btn">
                                    {t('common.getStarted')}
                                 </a>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <style jsx>{`
            .steps__item {
               padding: 40px 30px;
               background: white;
               border-radius: 15px;
               box-shadow: 0 5px 30px rgba(0,0,0,0.05);
               transition: all 0.3s;
               position: relative;
               overflow: hidden;
               min-height: 380px;
            }
            .steps__content {
               position: relative;
               z-index: 1;
               transition: all 0.3s;
            }
            .steps__item:hover .steps__content {
               opacity: 0;
               transform: scale(0.9);
            }
            .steps__icon {
               width: 180px;
               height: 180px;
               border-radius: 20px;
               display: inline-flex;
               align-items: center;
               justify-content: center;
               position: relative;
               margin: 0 auto;
            }
            .steps__image {
               width: 140px;
               height: 140px;
               object-fit: contain;
            }
            .steps__num {
               position: absolute;
               top: -5px;
               right: -5px;
               width: 35px;
               height: 35px;
               border-radius: 50%;
               color: white;
               display: flex;
               align-items: center;
               justify-content: center;
               font-weight: 700;
               font-size: 14px;
            }
            .steps__title {
               font-size: 20px;
               margin-bottom: 10px;
               color: #333;
            }
            .steps__desc {
               color: #666;
               margin: 0;
               font-size: 15px;
            }
            .steps__overlay {
               position: absolute;
               inset: 0;
               border-radius: 15px;
               display: flex;
               align-items: center;
               justify-content: center;
               opacity: 0;
               transform: scale(1.1);
               transition: all 0.4s ease;
               z-index: 2;
            }
            .steps__item:hover .steps__overlay {
               opacity: 1;
               transform: scale(1);
            }
            .steps__overlay-content {
               padding: 30px;
               text-align: center;
            }
            .steps__overlay-title {
               font-size: 22px;
               margin-bottom: 15px;
               color: white;
               font-weight: 700;
               text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .steps__overlay-desc {
               font-size: 16px;
               margin-bottom: 25px;
               color: white;
               line-height: 1.8;
               font-weight: 500;
               text-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            .steps__overlay-btn {
               display: inline-block;
               background: white;
               color: #333;
               padding: 12px 30px;
               border-radius: 30px;
               font-weight: 600;
               font-size: 14px;
               transition: all 0.3s;
               text-decoration: none;
            }
            .steps__overlay-btn:hover {
               transform: translateY(-3px);
               box-shadow: 0 10px 25px rgba(0,0,0,0.2);
               color: #333;
            }
         `}</style>
      </section>
   );
};

export default StepsArea;
