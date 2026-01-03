import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ServicesArea = () => {
   const { t } = useLanguage();

   const services = [
      { image: '/assets/img/new/Web Design.png', titleKey: 'services.design', descKey: 'services.designDesc' },
      { image: '/assets/img/new/Web Development.png', titleKey: 'services.development', descKey: 'services.developmentDesc' },
      { image: '/assets/img/new/SEO Optimization.png', titleKey: 'services.seo', descKey: 'services.seoDesc' },
      { image: '/assets/img/new/Maintenance & Support.png', titleKey: 'services.maintenance', descKey: 'services.maintenanceDesc' },
      { image: '/assets/img/new/Hosting.png', titleKey: 'services.hosting', descKey: 'services.hostingDesc' },
      { image: '/assets/img/new/Content Management.png', titleKey: 'services.content', descKey: 'services.contentDesc' },
   ];

   return (
      <section className="services__area pt-110 pb-80 grey-bg">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title-wrapper text-center mb-55">
                     <h2 className="section__title">{t('services.title')}</h2>
                     <p>{t('services.subtitle')}</p>
                  </div>
               </div>
            </div>
            <div className="row">
               {services.map((service, index) => (
                  <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-6">
                     <div className="service__item d-flex mb-30">
                        <div className="service__icon">
                           <img src={service.image} alt={t(service.titleKey)} />
                        </div>
                        <div className="service__content">
                           <h4 className="service__title">{t(service.titleKey)}</h4>
                           <p className="service__desc">{t(service.descKey)}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <style jsx>{`
            .service__item {
               background: white;
               padding: 25px;
               border-radius: 15px;
               box-shadow: 0 5px 25px rgba(0,0,0,0.05);
               transition: all 0.3s;
               gap: 20px;
               align-items: flex-start;
            }
            .service__item:hover {
               transform: translateY(-5px);
               box-shadow: 0 15px 40px rgba(0,0,0,0.1);
            }
            .service__icon {
               width: 60px;
               height: 60px;
               min-width: 60px;
               display: flex;
               align-items: center;
               justify-content: center;
            }
            .service__icon img {
               width: 100%;
               height: 100%;
               object-fit: contain;
            }
            .service__title {
               font-size: 18px;
               margin-bottom: 8px;
               color: #333;
            }
            .service__desc {
               margin: 0;
               color: #666;
               font-size: 14px;
               line-height: 1.6;
            }
            @media (max-width: 767px) {
               .services__area {
                  padding-top: 60px;
                  padding-bottom: 40px;
               }
               .service__item {
                  flex-direction: column;
                  align-items: center;
                  text-align: center;
                  padding: 18px 12px;
                  gap: 10px;
               }
               .service__icon {
                  width: 50px;
                  height: 50px;
                  min-width: 50px;
               }
               .service__title {
                  font-size: 14px;
                  margin-bottom: 5px;
               }
               .service__desc {
                  font-size: 11px;
                  line-height: 1.5;
               }
            }
         `}</style>
      </section>
   );
};

export default ServicesArea;
