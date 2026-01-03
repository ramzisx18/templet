import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Home/Header';
import Footer from '../../components/Home/Footer';
import SEO from '../../components/seo';
import { useLanguage } from '../../context/LanguageContext';
import { fetchTemplates } from '../../redux/features/productSlice';
import { fetchCategories } from '../../redux/features/categorySlice';
import { fetchCMS } from '../../redux/features/cmsSlice';

const Templates = () => {
  const { t, locale } = useLanguage();
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { cmsList } = useSelector((state) => state.cms);

  const [selectedCMS, setSelectedCMS] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTemplates());
    dispatch(fetchCategories());
    dispatch(fetchCMS());
  }, [dispatch]);

  useEffect(() => {
    if (router.query.cms) setSelectedCMS(router.query.cms);
    if (router.query.category) setSelectedCategory(router.query.category);
  }, [router.query]);

  const filteredProducts = products.filter((p) => {
    const matchCMS = !selectedCMS || p.cms?.toLowerCase().includes(selectedCMS.toLowerCase());
    const matchCategory = !selectedCategory || p.category?.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch = !searchQuery || p.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCMS && matchCategory && matchSearch;
  });

  return (
    <>
      <SEO pageTitle={t('templates.title')} />
      <Header />
      <section className="templates__area pt-120 pb-100">
        <div className="container">
          <div className="row mb-50"><div className="col-12 text-center"><h2 className="section__title">{t('templates.title')}</h2><p>{t('templates.subtitle')}</p></div></div>

          <div className="templates__filters mb-50">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-20">
                <input type="text" placeholder={t('common.search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control" />
              </div>
              <div className="col-lg-4 col-md-6 mb-20">
                <select className="form-control" value={selectedCMS} onChange={(e) => setSelectedCMS(e.target.value)}>
                  <option value="">{t('cms.title')}</option>
                  {cmsList.map((cms) => <option key={cms._id} value={cms.name}>{cms.name}</option>)}
                </select>
              </div>
              <div className="col-lg-4 col-md-6 mb-20">
                <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">{t('categories.title')}</option>
                  {categories.filter(c => c.isActive).map((cat) => <option key={cat._id} value={cat.name}>{locale === 'ar' ? cat.nameAr : cat.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            {loading ? <div className="col-12 text-center py-50"><p>جاري التحميل...</p></div> : filteredProducts.length === 0 ? (
              <div className="col-12 text-center py-50"><i className="fas fa-folder-open" style={{ fontSize: 60, color: '#ddd', marginBottom: 20 }}></i><p style={{ color: '#999' }}>لا توجد قوالب متاحة</p></div>
            ) : filteredProducts.map((template) => (
              <div key={template._id} className="col-lg-4 col-md-6 mb-30">
                <div className="template__card">
                  <Link href={`/templates/${template._id}`}>
                    <a className="template__thumb-link">
                      <div className="template__thumb">
                        <img src={template.img || '/assets/img/placeholder.jpg'} alt={template.title} />
                        <div className="template__overlay">
                          <span className="btn__details"><i className="fas fa-eye"></i> عرض التفاصيل</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div className="template__content">
                    <div className="template__meta"><span className="template__category">{template.category}</span><span className="template__price">${template.price}</span></div>
                    <h4 className="template__title">{template.title}</h4>
                    <Link href={`/templates/${template._id}`}><a className="btn__request">عرض التفاصيل</a></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <style jsx>{`
        .templates__filters { background: #f8f9fa; padding: 25px; border-radius: 15px; }
        .template__card { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: all 0.3s; }
        .template__card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
        .template__thumb-link { display: block; }
        .template__thumb { position: relative; height: 220px; overflow: hidden; }
        .template__thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .template__card:hover .template__thumb img { transform: scale(1.05); }
        .template__overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
        .template__card:hover .template__overlay { opacity: 1; }
        .btn__details { background: white; color: #333; padding: 12px 25px; border-radius: 25px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .template__content { padding: 20px; }
        .template__meta { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .template__category { background: #f0f0f0; padding: 4px 12px; border-radius: 15px; font-size: 12px; }
        .template__price { font-weight: 700; color: #667eea; font-size: 18px; }
        .template__title { margin: 0 0 15px; font-size: 16px; }
        .btn__request { display: block; text-align: center; color: #667eea; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; transition: all 0.3s; border: 2px solid #667eea; background: transparent; }
        .btn__request:hover { color: white; background: #667eea; }
      `}</style>
    </>
  );
};

export default Templates;
