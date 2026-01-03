import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../context/LanguageContext';
import { fetchCategories } from '../../redux/features/categorySlice';

const CategoryArea = () => {
   const { t, locale } = useLanguage();
   const dispatch = useDispatch();
   const { categories, loading } = useSelector((state) => state.categories);

   useEffect(() => {
      if (categories.length === 0) {
         dispatch(fetchCategories());
      }
   }, [dispatch, categories.length]);

   const defaultCategories = [
      { _id: '1', name: 'E-commerce', nameAr: 'متجر إلكتروني', icon: 'fas fa-shopping-bag', color: '#e74c3c', slug: 'ecommerce' },
      { _id: '2', name: 'Business', nameAr: 'موقع شركة', icon: 'fas fa-briefcase', color: '#3498db', slug: 'business' },
      { _id: '3', name: 'Portfolio', nameAr: 'معرض أعمال', icon: 'fas fa-images', color: '#9b59b6', slug: 'portfolio' },
      { _id: '4', name: 'Blog', nameAr: 'مدونة', icon: 'fas fa-blog', color: '#1abc9c', slug: 'blog' },
      { _id: '5', name: 'Restaurant', nameAr: 'مطعم', icon: 'fas fa-utensils', color: '#f39c12', slug: 'restaurant' },
      { _id: '6', name: 'Real Estate', nameAr: 'عقارات', icon: 'fas fa-home', color: '#27ae60', slug: 'real-estate' },
      { _id: '7', name: 'Medical', nameAr: 'طبي', icon: 'fas fa-heartbeat', color: '#e91e63', slug: 'medical' },
      { _id: '8', name: 'Education', nameAr: 'تعليمي', icon: 'fas fa-graduation-cap', color: '#673ab7', slug: 'education' },
   ];

   const displayCategories = categories.length > 0 ? categories.filter(c => c.isActive !== false) : defaultCategories;

   return (
      <section className="category__area pt-110 pb-80">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title-wrapper text-center mb-55">
                     <h2 className="section__title">{t('categories.title')}</h2>
                     <p>{t('categories.subtitle')}</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               {displayCategories.slice(0, 8).map((category) => (
                  <div key={category._id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                     <Link href={`/templates?category=${category.slug || category.name.toLowerCase()}`}>
                        <a className="category__item d-block text-center mb-30">
                           <div className="category__icon" style={{ background: `${category.color || '#667eea'}15` }}>
                              <i className={category.icon || 'fas fa-folder'} style={{ color: category.color || '#667eea' }}></i>
                           </div>
                           <h4 className="category__title">{locale === 'ar' ? (category.nameAr || category.name) : category.name}</h4>
                        </a>
                     </Link>
                  </div>
               ))}
            </div>
            <div className="row"><div className="col-12 text-center mt-20"><Link href="/templates"><a className="m-btn m-btn-2"><span></span> {t('common.more')}</a></Link></div></div>
         </div>
         <style jsx>{`
            .category__item { background: white; padding: 30px 20px; border-radius: 15px; box-shadow: 0 5px 25px rgba(0,0,0,0.05); transition: all 0.3s; }
            .category__item:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
            .category__icon { width: 70px; height: 70px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; transition: all 0.3s; }
            .category__item:hover .category__icon { transform: scale(1.1); }
            .category__icon i { font-size: 28px; }
            .category__title { margin: 0; font-size: 16px; color: #333; }
         `}</style>
      </section>
   );
};

export default CategoryArea;
