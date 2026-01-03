import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '../../components/Home/Header';
import Footer from '../../components/Home/Footer';
import SEO from '../../components/seo';
import { useLanguage } from '../../context/LanguageContext';
import { fetchTemplates } from '../../redux/features/productSlice';
import { fetchCategories } from '../../redux/features/categorySlice';
import { fetchCMS } from '../../redux/features/cmsSlice';
import { addOrder } from '../../redux/features/ordersSlice';

const OrderPage = () => {
  const { t, locale } = useLanguage();
  const dispatch = useDispatch();
  const router = useRouter();
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { cmsList } = useSelector((state) => state.cms);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', cms: '', projectType: '', templateId: '', budget: '', message: '' });

  useEffect(() => {
    dispatch(fetchTemplates());
    dispatch(fetchCategories());
    dispatch(fetchCMS());
  }, [dispatch]);

  useEffect(() => {
    if (router.query.template) setFormData(prev => ({ ...prev, templateId: router.query.template }));
  }, [router.query]);

  const selectedTemplate = products.find(p => p._id === formData.templateId);

  // ملء CMS ونوع المشروع تلقائياً عند اختيار قالب
  useEffect(() => {
    if (selectedTemplate) {
      setFormData(prev => ({
        ...prev,
        cms: selectedTemplate.cms || prev.cms,
        projectType: selectedTemplate.category || prev.projectType,
      }));
    }
  }, [selectedTemplate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addOrder({ ...formData, templateTitle: selectedTemplate?.title || '' }));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <SEO pageTitle={t('order.success')} /><Header />
        <section className="order__success pt-150 pb-150">
          <div className="container"><div className="row justify-content-center"><div className="col-lg-6 text-center">
            <div style={{ background: 'white', padding: 60, borderRadius: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                <i className="fas fa-check-circle" style={{ fontSize: 50, color: 'white' }}></i>
              </div>
              <h2>{t('order.success')}</h2><p style={{ color: '#666' }}>{t('order.successMsg')}</p>
              <button className="m-btn m-btn-2 mt-30" onClick={() => router.push('/')}>{t('nav.home')}</button>
            </div>
          </div></div></div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO pageTitle={t('order.title')} /><Header />
      <section className="order__area pt-120 pb-100">
        <div className="container"><div className="row justify-content-center"><div className="col-lg-8">
          <div style={{ background: 'white', padding: 50, borderRadius: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <div className="text-center mb-40"><h2 className="section__title">{t('order.title')}</h2><p>{t('order.subtitle')}</p></div>

            {selectedTemplate && (
              <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 10, marginBottom: 30, display: 'flex', alignItems: 'center', gap: 15 }}>
                <img src={selectedTemplate.img || '/assets/img/placeholder.jpg'} alt="" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                <div><h4 style={{ margin: 0, fontSize: 16 }}>{selectedTemplate.title}</h4><span style={{ fontSize: 13, color: '#666' }}>{selectedTemplate.category}</span></div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6"><div className="form-group mb-20"><label>{t('order.name')} *</label><input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required /></div></div>
                <div className="col-md-6"><div className="form-group mb-20"><label>{t('order.email')} *</label><input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required /></div></div>
                <div className="col-md-6"><div className="form-group mb-20"><label>{t('order.phone')} *</label><input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required /></div></div>
                <div className="col-md-6"><div className="form-group mb-20"><label>{t('order.company')}</label><input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} /></div></div>
                <div className="col-md-6"><div className="form-group mb-20"><label>{t('order.selectedCMS')} *</label>
                  <select name="cms" className="form-control" value={formData.cms} onChange={handleChange} required>
                    <option value="">{t('cms.title')}</option>
                    {cmsList.map((cms) => <option key={cms._id} value={cms.name}>{locale === 'ar' ? cms.nameAr : cms.name}</option>)}
                  </select>
                </div></div>
                <div className="col-md-6"><div className="form-group mb-20"><label>{t('order.projectType')} *</label>
                  <select name="projectType" className="form-control" value={formData.projectType} onChange={handleChange} required>
                    <option value="">{t('categories.title')}</option>
                    {categories.filter(c => c.isActive).map((cat) => <option key={cat._id} value={cat.name}>{locale === 'ar' ? cat.nameAr : cat.name}</option>)}
                  </select>
                </div></div>
                <div className="col-12"><div className="form-group mb-20"><label>{t('order.budget')}</label>
                  <select name="budget" className="form-control" value={formData.budget} onChange={handleChange}>
                    <option value="">--</option>
                    <option value="3000-5000">{locale === 'ar' ? '3,000 - 5,000 دج' : '3,000 - 5,000 DZD'}</option>
                    <option value="5000-10000">{locale === 'ar' ? '5,000 - 10,000 دج' : '5,000 - 10,000 DZD'}</option>
                    <option value="10000-50000">{locale === 'ar' ? '10,000 - 50,000 دج' : '10,000 - 50,000 DZD'}</option>
                    <option value="undefined">{locale === 'ar' ? 'ميزانية غير محددة' : 'Undefined budget'}</option>
                  </select>
                </div></div>
                <div className="col-12"><div className="form-group mb-20"><label>{t('order.message')}</label><textarea name="message" className="form-control" rows="4" value={formData.message} onChange={handleChange}></textarea></div></div>
                <div className="col-12"><button type="submit" className="m-btn m-btn-2 w-100"><span></span> {t('order.submit')}</button></div>
                <div className="col-12 mt-15">
                  <a 
                    href="https://wa.me/213552167708" 
                    target="_blank" 
                    rel="noreferrer"
                    className="whatsapp-btn"
                  >
                    <i className="fab fa-whatsapp"></i>
                    {locale === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div></div></div>
      </section>
      <Footer />

      <style jsx>{`
        .whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 25px;
          border: 2px solid #25d366;
          color: #25d366;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          background: transparent;
          text-decoration: none;
        }
        .whatsapp-btn:hover {
          background: #25d366;
          color: white;
        }
        .whatsapp-btn i {
          font-size: 20px;
        }
      `}</style>
    </>
  );
};

export default OrderPage;
