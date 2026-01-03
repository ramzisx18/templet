import { useState } from 'react';
import Header from '../../components/Home/Header';
import Footer from '../../components/Home/Footer';
import SEO from '../../components/seo';
import { useLanguage } from '../../context/LanguageContext';
import Swal from 'sweetalert2';

const Contact = () => {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: t('contact.success.title'),
          text: t('contact.success.message'),
          confirmButtonColor: '#667eea',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: locale === 'ar' ? 'خطأ' : 'Error',
        text: locale === 'ar' ? 'فشل في إرسال الرسالة، حاول مرة أخرى' : 'Failed to send message, please try again',
        confirmButtonColor: '#667eea',
      });
    }
    
    setLoading(false);
  };

  const contactInfo = [
    { image: '/assets/img/new/email.png', title: t('contact.email'), value: 'info@markit.com', link: 'mailto:info@markit.com' },
    { image: '/assets/img/new/call.png', title: t('contact.phone'), value: '0552167708', link: 'tel:+966552167708' },
    { image: '/assets/img/new/whatsapp.png', title: t('contact.whatsapp'), value: '0552167708', link: 'https://wa.me/966552167708' },
  ];

  return (
    <>
      <SEO pageTitle={t('contact.pageTitle')} />
      <Header />
      
      <section className="contact-page">
        <div className="container">
          <div className="contact-header">
            <h1>{t('contact.title')}</h1>
            <p>{t('contact.subtitle')}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-section">
              {contactInfo.map((item, idx) => (
                <a key={idx} href={item.link} className="contact-card" target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                  <div className="contact-card-icon">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="contact-card-content">
                    <h4>{item.title}</h4>
                    <p>{item.value}</p>
                  </div>
                  <i className={`fas fa-arrow-${locale === 'ar' ? 'left' : 'right'} arrow-icon`}></i>
                </a>
              ))}

              <div className="social-section">
                <h4>{t('contact.followUs')}</h4>
                <div className="social-links">
                  <a href="#" className="social-link twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="social-link linkedin"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="social-link facebook"><i className="fab fa-facebook-f"></i></a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <div className="form-card">
                <h3>{t('contact.sendMessage')}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>{t('contact.form.name')}</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder={t('contact.form.namePlaceholder')}
                      required 
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.form.email')}</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder={t('contact.form.emailPlaceholder')}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('contact.form.phone')}</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder={t('contact.form.phonePlaceholder')}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('contact.form.message')}</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <span className="btn-text">{t('contact.form.submit')}</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .contact-page {
          padding: 120px 0 80px;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          min-height: 100vh;
          font-family: ${locale === 'ar' ? "'Tajawal', 'Cairo', sans-serif" : "'Inter', sans-serif"};
        }

        .contact-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .contact-header h1 {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 15px;
          font-family: ${locale === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"};
        }
        .contact-header p {
          font-size: 18px;
          color: #666;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          align-items: start;
        }

        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          padding: 20px 25px;
          border-radius: 16px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          text-decoration: none;
          border: 1px solid #f0f0f0;
        }
        .contact-card:hover {
          transform: translateX(${locale === 'ar' ? '5px' : '-5px'});
          box-shadow: 0 10px 30px rgba(102,126,234,0.15);
          border-color: #667eea;
        }
        .contact-card-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-card-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .contact-card-content {
          flex: 1;
        }
        .contact-card-content h4 {
          font-size: 13px;
          color: #999;
          margin: 0 0 5px;
          font-weight: 500;
        }
        .contact-card-content p {
          font-size: 16px;
          color: #333;
          margin: 0;
          font-weight: 600;
          direction: ltr;
          text-align: ${locale === 'ar' ? 'right' : 'left'};
        }
        .arrow-icon {
          color: #667eea;
          opacity: 0;
          transition: all 0.3s;
        }
        .contact-card:hover .arrow-icon {
          opacity: 1;
        }

        .social-section {
          background: white;
          padding: 25px;
          border-radius: 16px;
          margin-top: 10px;
          border: 1px solid #f0f0f0;
        }
        .social-section h4 {
          font-size: 14px;
          color: #999;
          margin: 0 0 15px;
          font-weight: 500;
        }
        .social-links {
          display: flex;
          gap: 12px;
        }
        .social-link {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          transition: transform 0.3s;
        }
        .social-link:hover {
          transform: translateY(-3px);
          color: white;
        }
        .social-link.twitter { background: #1da1f2; }
        .social-link.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
        .social-link.linkedin { background: #0077b5; }
        .social-link.facebook { background: #1877f2; }

        .form-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }
        .form-card h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #1a1a2e;
          font-family: ${locale === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"};
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #eee;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s;
          background: #fafafa;
          font-family: ${locale === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"};
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102,126,234,0.1);
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #aaa;
        }
        .form-group textarea {
          resize: none;
        }

        .submit-btn {
          width: 100%;
          padding: 18px 30px;
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          font-family: ${locale === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif"};
          position: relative;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
          z-index: 0;
        }
        .submit-btn:hover::before {
          width: 100%;
        }
        .submit-btn .btn-text,
        .submit-btn .spinner {
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }
        .submit-btn:hover:not(:disabled) {
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102,126,234,0.3);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .submit-btn .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-header h1 {
            font-size: 32px;
          }
          .form-card {
            padding: 30px;
          }
        }

        @media (max-width: 575px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .contact-header h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default Contact;
