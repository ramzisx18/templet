import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Home/Header';
import Footer from '../../components/Home/Footer';
import SEO from '../../components/seo';
import { useLanguage } from '../../context/LanguageContext';

const TemplateDetails = () => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const { id } = router.query;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchTemplate();
    }
  }, [id]);

  const fetchTemplate = async () => {
    try {
      const res = await fetch(`/api/templates/${id}`);
      const data = await res.json();
      if (data.success) {
        setTemplate(data.data);
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>جاري التحميل...</p>
        </div>
        <Footer />
        <style jsx>{`
          .loading-container { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </>
    );
  }

  if (!template) {
    return (
      <>
        <Header />
        <div className="not-found">
          <i className="fas fa-exclamation-circle"></i>
          <h2>القالب غير موجود</h2>
          <Link href="/templates"><a className="btn-back">العودة للقوالب</a></Link>
        </div>
        <Footer />
        <style jsx>{`
          .not-found { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
          .not-found i { font-size: 80px; color: #ddd; margin-bottom: 20px; }
          .btn-back { background: #667eea; color: white; padding: 12px 30px; border-radius: 8px; margin-top: 20px; }
        `}</style>
      </>
    );
  }

  const images = template.images?.length > 0 ? template.images : [template.img || '/assets/img/placeholder.jpg'];

  return (
    <>
      <SEO pageTitle={template.title} />
      <Header />
      
      <section className="template-details pt-120 pb-100">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb-nav mb-30">
            <Link href="/"><a>الرئيسية</a></Link>
            <span>/</span>
            <Link href="/templates"><a>القوالب</a></Link>
            <span>/</span>
            <span className="current">{template.title}</span>
          </div>

          <div className="row">
            {/* Gallery */}
            <div className="col-lg-7 mb-40">
              <div className="template-gallery">
                <div className="main-image">
                  <img src={images[activeImage]} alt={template.title} />
                  {template.demoUrl && (
                    <a href={template.demoUrl} target="_blank" rel="noreferrer" className="preview-badge">
                      <i className="fas fa-external-link-alt"></i> معاينة مباشرة
                    </a>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="thumbnails">
                    {images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`thumb ${activeImage === idx ? 'active' : ''}`}
                        onClick={() => setActiveImage(idx)}
                      >
                        <img src={img} alt={`${template.title} ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="col-lg-5">
              <div className="template-info">
                <div className="template-badges">
                  {template.category && <span className="badge category">{template.category}</span>}
                  {template.cms && <span className="badge cms">{template.cms}</span>}
                </div>
                
                <h1 className="template-title">{template.title}</h1>
                
                <div className="template-price">
                  <span className="price">${template.price}</span>
                  {template.oldPrice && <span className="old-price">${template.oldPrice}</span>}
                </div>

                <p className="template-desc">{template.description || 'قالب احترافي متكامل وجاهز للاستخدام.'}</p>

                {/* Features */}
                <div className="template-features">
                  <h4>مميزات القالب</h4>
                  <ul>
                    <li><i className="fas fa-check"></i> تصميم متجاوب مع جميع الأجهزة</li>
                    <li><i className="fas fa-check"></i> دعم اللغة العربية والإنجليزية</li>
                    <li><i className="fas fa-check"></i> سهل التخصيص والتعديل</li>
                    <li><i className="fas fa-check"></i> كود نظيف ومنظم</li>
                    <li><i className="fas fa-check"></i> دعم فني مجاني</li>
                    {Array.isArray(template.features) && template.features.map((f, i) => (
                      <li key={i}><i className="fas fa-check"></i> {f}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="template-actions">
                  <Link href={`/order?template=${template._id}`}>
                    <a className="btn-primary-action">
                      <i className="fas fa-globe"></i> طلب إنشاء موقع بهذا القالب
                    </a>
                  </Link>
                  
                  <a href={template.purchaseUrl || '#'} className="btn-secondary-action" target="_blank" rel="noreferrer">
                    <i className="fas fa-shopping-cart"></i> شراء القالب
                    <span className="price-tag">${template.price}</span>
                  </a>
                  
                  {template.demoUrl && (
                    <a href={template.demoUrl} target="_blank" rel="noreferrer" className="btn-outline-action">
                      <i className="fas fa-eye"></i> معاينة القالب
                    </a>
                  )}
                </div>

                {/* Meta Info */}
                <div className="template-meta">
                  <div className="meta-item">
                    <i className="fas fa-code"></i>
                    <span>نظام: {template.cms || 'غير محدد'}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-folder"></i>
                    <span>التصنيف: {template.category || 'عام'}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-calendar"></i>
                    <span>آخر تحديث: {new Date(template.updatedAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .breadcrumb-nav { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #666; }
        .breadcrumb-nav a { color: #667eea; }
        .breadcrumb-nav .current { color: #333; font-weight: 500; }

        .template-gallery { background: #f8f9fa; border-radius: 20px; padding: 20px; }
        .main-image { position: relative; border-radius: 15px; overflow: hidden; margin-bottom: 15px; }
        .main-image img { width: 100%; height: 400px; object-fit: cover; }
        .preview-badge { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.7); color: white; padding: 10px 20px; border-radius: 25px; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s; }
        .preview-badge:hover { background: #667eea; color: white; }
        .thumbnails { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; }
        .thumb { width: 80px; height: 60px; border-radius: 8px; overflow: hidden; cursor: pointer; border: 3px solid transparent; transition: all 0.3s; flex-shrink: 0; }
        .thumb.active { border-color: #667eea; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }

        .template-info { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 5px 30px rgba(0,0,0,0.08); }
        .template-badges { display: flex; gap: 10px; margin-bottom: 15px; }
        .badge { padding: 6px 15px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge.category { background: #e8f4fd; color: #0077b6; }
        .badge.cms { background: #f0e6ff; color: #7c3aed; }
        .template-title { font-size: 28px; font-weight: 700; margin-bottom: 15px; color: #1a1a2e; }
        .template-price { margin-bottom: 20px; }
        .template-price .price { font-size: 36px; font-weight: 700; color: #667eea; }
        .template-price .old-price { font-size: 20px; color: #999; text-decoration: line-through; margin-right: 10px; }
        .template-desc { color: #666; line-height: 1.8; margin-bottom: 25px; }

        .template-features { background: #f8f9fa; border-radius: 15px; padding: 20px; margin-bottom: 25px; }
        .template-features h4 { font-size: 16px; margin-bottom: 15px; color: #333; }
        .template-features ul { list-style: none; padding: 0; margin: 0; }
        .template-features li { display: flex; align-items: center; gap: 10px; padding: 8px 0; color: #555; font-size: 14px; }
        .template-features li i { color: #10b981; font-size: 12px; }

        .template-actions { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
        .btn-primary-action { display: flex; align-items: center; justify-content: center; gap: 10px; border: 2px solid #667eea; color: #667eea; background: transparent; padding: 14px 25px; border-radius: 10px; font-weight: 600; font-size: 15px; transition: all 0.3s; }
        .btn-primary-action:hover { background: #667eea; color: white; }
        .btn-secondary-action { display: flex; align-items: center; justify-content: center; gap: 10px; border: 2px solid #10b981; color: #10b981; background: transparent; padding: 14px 25px; border-radius: 10px; font-weight: 600; transition: all 0.3s; }
        .btn-secondary-action:hover { background: #10b981; color: white; }
        .btn-secondary-action .price-tag { background: #10b98115; padding: 4px 12px; border-radius: 15px; font-size: 13px; }
        .btn-secondary-action:hover .price-tag { background: rgba(255,255,255,0.2); }
        .btn-outline-action { display: flex; align-items: center; justify-content: center; gap: 10px; border: 2px solid #999; color: #666; background: transparent; padding: 14px 25px; border-radius: 10px; font-weight: 600; transition: all 0.3s; }
        .btn-outline-action:hover { border-color: #667eea; color: #667eea; }

        .template-meta { border-top: 1px solid #eee; padding-top: 20px; }
        .meta-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; color: #666; font-size: 14px; }
        .meta-item i { color: #667eea; width: 20px; }

        @media (max-width: 991px) {
          .main-image img { height: 300px; }
          .template-title { font-size: 24px; }
          .template-price .price { font-size: 28px; }
        }
      `}</style>
    </>
  );
};

export default TemplateDetails;
