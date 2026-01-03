import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FAQSection = () => {
   const { locale } = useLanguage();
   const [activeIndex, setActiveIndex] = useState(0);

   const faqs = locale === 'ar' ? [
      {
         question: 'كم تستغرق مدة تصميم الموقع؟',
         answer: 'تعتمد المدة على حجم المشروع وتعقيده. المواقع البسيطة تستغرق من 24 ساعة إلى 3 أيام كحد أقصى، بينما المشاريع الكبيرة قد تستغرق 2-4 أسابيع.'
      },
      {
         question: 'هل يمكنني تعديل الموقع بنفسي بعد التسليم؟',
         answer: 'نعم، نستخدم أنظمة إدارة محتوى سهلة الاستخدام مثل WordPress، ونقوم بمساعدتك وتوجيهك في إدارة موقعك.'
      },
      {
         question: 'ما هي طرق الدفع المتاحة؟',
         answer: 'نقبل التحويل البنكي، البطاقات الائتمانية، وخدمات الدفع الإلكتروني. يمكن الدفع على دفعات حسب الاتفاق.'
      },
      {
         question: 'هل تقدمون خدمة الاستضافة؟',
         answer: 'نعم، نوفر استضافة سريعة وآمنة مع شهادة SSL مجانية ونسخ احتياطي يومي وحماية من الاختراق.'
      },
      {
         question: 'ماذا يشمل الدعم الفني؟',
         answer: 'نقدم دعماً فنياً مجانياً لمدة شهر بعد التسليم، يشمل إصلاح الأخطاء والتعديلات البسيطة والإجابة على استفساراتك.'
      },
   ] : [
      {
         question: 'How long does it take to design a website?',
         answer: 'The duration depends on the project size and complexity. Simple websites take 24 hours to 3 days maximum, while larger projects may take 2-4 weeks.'
      },
      {
         question: 'Can I edit the website myself after delivery?',
         answer: 'Yes, we use easy-to-use CMS like WordPress, and we help and guide you in managing your website.'
      },
      {
         question: 'What payment methods are available?',
         answer: 'We accept bank transfers, credit cards, and electronic payment services. Payment can be made in installments as agreed.'
      },
      {
         question: 'Do you provide hosting services?',
         answer: 'Yes, we provide fast and secure hosting with free SSL certificate, daily backup, and hack protection.'
      },
      {
         question: 'What does technical support include?',
         answer: 'We provide free technical support for one month after delivery, including bug fixes, minor modifications, and answering your questions.'
      },
   ];

   return (
      <section className="faq__area">
         <div className="container">
            <div className="faq__header">
               <h2>{locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
               <p>{locale === 'ar' ? 'إجابات على أكثر الأسئلة شيوعاً' : 'Answers to the most common questions'}</p>
            </div>

            <div className="faq__list">
               {faqs.map((faq, idx) => (
                  <div 
                     key={idx} 
                     className={`faq__item ${activeIndex === idx ? 'active' : ''}`}
                  >
                     <button 
                        className="faq__question"
                        onClick={() => setActiveIndex(activeIndex === idx ? -1 : idx)}
                     >
                        <span>{faq.question}</span>
                        <i className={`fas fa-${activeIndex === idx ? 'minus' : 'plus'}`}></i>
                     </button>
                     <div className="faq__answer">
                        <p>{faq.answer}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <style jsx>{`
            .faq__area {
               padding: 80px 0;
               background: #f8fafc;
            }
            .faq__header {
               text-align: center;
               margin-bottom: 40px;
            }
            .faq__header h2 {
               font-size: 32px;
               font-weight: 700;
               color: #1a1a2e;
               margin-bottom: 10px;
            }
            .faq__header p {
               font-size: 16px;
               color: #666;
               margin: 0;
            }
            .faq__list {
               max-width: 800px;
               margin: 0 auto;
            }
            .faq__item {
               background: white;
               border-radius: 12px;
               margin-bottom: 12px;
               overflow: hidden;
               box-shadow: 0 2px 10px rgba(0,0,0,0.04);
               border: 1px solid #eee;
               transition: all 0.3s ease;
            }
            .faq__item.active {
               border-color: #667eea;
               box-shadow: 0 5px 20px rgba(102,126,234,0.1);
            }
            .faq__question {
               width: 100%;
               display: flex;
               justify-content: space-between;
               align-items: center;
               padding: 20px 25px;
               background: none;
               border: none;
               cursor: pointer;
               text-align: ${locale === 'ar' ? 'right' : 'left'};
               font-size: 16px;
               font-weight: 600;
               color: #333;
               transition: color 0.3s;
            }
            .faq__item.active .faq__question {
               color: #667eea;
            }
            .faq__question i {
               width: 28px;
               height: 28px;
               display: flex;
               align-items: center;
               justify-content: center;
               background: #f0f0f0;
               border-radius: 50%;
               font-size: 12px;
               color: #666;
               transition: all 0.3s;
               flex-shrink: 0;
               margin-${locale === 'ar' ? 'right' : 'left'}: 15px;
            }
            .faq__item.active .faq__question i {
               background: #667eea;
               color: white;
            }
            .faq__answer {
               max-height: 0;
               overflow: hidden;
               transition: max-height 0.3s ease, padding 0.3s ease;
            }
            .faq__item.active .faq__answer {
               max-height: 200px;
            }
            .faq__answer p {
               padding: 0 25px 20px;
               margin: 0;
               color: #666;
               line-height: 1.7;
               font-size: 15px;
            }
            @media (max-width: 768px) {
               .faq__area {
                  padding: 50px 0;
               }
               .faq__header h2 {
                  font-size: 24px;
               }
               .faq__header p {
                  font-size: 14px;
               }
               .faq__question {
                  padding: 16px 18px;
                  font-size: 14px;
               }
               .faq__question i {
                  width: 24px;
                  height: 24px;
                  font-size: 10px;
               }
               .faq__answer p {
                  padding: 0 18px 16px;
                  font-size: 13px;
               }
            }
         `}</style>
      </section>
   );
};

export default FAQSection;
