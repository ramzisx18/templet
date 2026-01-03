import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../context/LanguageContext';
import { fetchCMS } from '../../redux/features/cmsSlice';

const DEFAULT_IMAGE = '/assets/img/cms/WordPress.svg.png';

const defaultCMS = [
  { _id: '1', name: 'WordPress', color: '#21759b', slug: 'wordpress', image: '/assets/img/cms/WordPress.svg.png' },
  { _id: '2', name: 'WooCommerce', color: '#96588a', slug: 'woocommerce', image: '/assets/img/cms/woocommerce.png' },
  { _id: '3', name: 'Shopify', color: '#96bf48', slug: 'shopify', image: '/assets/img/cms/shopify.png' },
  { _id: '4', name: 'Drupal', color: '#0678be', slug: 'drupal', image: '/assets/img/cms/Drupal.svg' },
  { _id: '5', name: 'Elementor', color: '#92003b', slug: 'elementor', image: '/assets/img/cms/Elementor.png' },
  { _id: '6', name: 'Magento', color: '#f26322', slug: 'magento', image: '/assets/img/cms/Magento.webp' },
  { _id: '7', name: 'OpenCart', color: '#23a8e0', slug: 'opencart', image: '/assets/img/cms/OpenCart.png' },
  { _id: '8', name: 'PrestaShop', color: '#df0067', slug: 'prestashop', image: '/assets/img/cms/Prestashop.svg.png' },
  { _id: '9', name: 'Laravel', color: '#ff2d20', slug: 'laravel', image: '/assets/img/cms/Laravel.svg.png' },
  { _id: '10', name: 'Next.js', color: '#000000', slug: 'nextjs', image: '/assets/img/cms/next-js.png' },
];

const CMSArea = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const { cmsList, loading } = useSelector((state) => state.cms);

  useEffect(() => {
    if (cmsList.length === 0) {
      dispatch(fetchCMS());
    }
  }, [dispatch, cmsList.length]);

  const displayCMS = cmsList.length > 0 ? cmsList.filter(c => c.isActive !== false) : defaultCMS;
  
  // تقسيم العناصر لسطرين
  const half = Math.ceil(displayCMS.length / 2);
  const row1 = displayCMS.slice(0, half);
  const row2 = displayCMS.slice(half);

  const CMSItem = ({ cms }) => (
    <Link href={`/templates?cms=${cms.slug || cms.name.toLowerCase()}`}>
      <a className="cms__item">
        <div className="cms__icon" style={{ background: `${cms.color || '#667eea'}15` }}>
          <img src={cms.image || DEFAULT_IMAGE} alt={cms.name} />
        </div>
        <span className="cms__name">{cms.name}</span>
      </a>
    </Link>
  );

  return (
    <section className="cms__area">
      <div className="cms__header">
        <h2>{t('cms.title')}</h2>
        <p>{t('cms.subtitle')}</p>
      </div>
      
      {loading ? (
        <div className="cms__loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="cms__marquee-wrapper">
          {/* السطر الأول - يتحرك لليسار */}
          <div className="cms__marquee">
            <div className="cms__marquee-content">
              {[...row1, ...row1, ...row1].map((cms, idx) => (
                <CMSItem key={`row1-${idx}`} cms={cms} />
              ))}
            </div>
          </div>
          
          {/* السطر الثاني - يتحرك لليمين */}
          <div className="cms__marquee reverse">
            <div className="cms__marquee-content">
              {[...row2, ...row2, ...row2].map((cms, idx) => (
                <CMSItem key={`row2-${idx}`} cms={cms} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="cms__footer">
        <Link href="/templates">
          <a className="cms__btn">
            {t('common.viewAll') || 'عرض المزيد'}
          </a>
        </Link>
      </div>

      <style jsx>{`
        .cms__area {
          padding: 50px 0 40px;
          background: #f8fafc;
          overflow: hidden;
        }
        .cms__header {
          text-align: center;
          margin-bottom: 30px;
          padding: 0 20px;
        }
        .cms__header h2 {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
        }
        .cms__header p {
          font-size: 15px;
          color: #666;
          margin: 0;
        }
        .cms__loading {
          display: flex;
          justify-content: center;
          padding: 40px 0;
        }
        .spinner {
          width: 35px;
          height: 35px;
          border: 3px solid #eee;
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .cms__marquee-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cms__marquee {
          overflow: hidden;
          position: relative;
        }

        .cms__marquee::before,
        .cms__marquee::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .cms__marquee::before {
          left: 0;
          background: linear-gradient(to right, #f8fafc, transparent);
        }
        .cms__marquee::after {
          right: 0;
          background: linear-gradient(to left, #f8fafc, transparent);
        }

        .cms__marquee-content {
          display: flex;
          gap: 12px;
          animation: marquee 25s linear infinite;
          width: max-content;
        }

        .cms__marquee.reverse .cms__marquee-content {
          animation: marquee-reverse 25s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        @keyframes marquee-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }

        .cms__marquee:hover .cms__marquee-content {
          animation-play-state: paused;
        }

        .cms__footer {
          text-align: center;
          margin-top: 25px;
        }

        .cms__btn {
          display: inline-block;
          color: #667eea;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border: 2px solid #667eea;
          border-radius: 8px;
          transition: all 0.3s ease;
          background: transparent;
        }
        .cms__btn:hover {
          background: #667eea;
          color: white;
        }

        @media (max-width: 767px) {
          .cms__area {
            padding: 35px 0 30px;
          }
          .cms__header {
            margin-bottom: 20px;
          }
          .cms__header h2 {
            font-size: 20px;
          }
          .cms__header p {
            font-size: 13px;
          }
          .cms__marquee-wrapper {
            gap: 10px;
          }
          .cms__marquee-content {
            gap: 10px;
            animation-duration: 20s;
          }
          .cms__marquee::before,
          .cms__marquee::after {
            width: 40px;
          }
          .cms__footer {
            margin-top: 20px;
          }
          .cms__btn {
            padding: 10px 22px;
            font-size: 13px;
          }
        }
      `}</style>

      <style jsx global>{`
        .cms__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 15px 20px;
          border-radius: 12px;
          border: 1px solid #eee;
          text-decoration: none;
          transition: all 0.25s ease;
          min-width: 100px;
        }
        .cms__item:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102,126,234,0.15);
        }
        .cms__icon {
          width: 45px;
          height: 45px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cms__icon img {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
        .cms__name {
          font-size: 12px;
          font-weight: 600;
          color: #333;
          text-align: center;
          white-space: nowrap;
        }

        @media (max-width: 767px) {
          .cms__item {
            padding: 12px 15px;
            min-width: 80px;
            gap: 6px;
          }
          .cms__icon {
            width: 38px;
            height: 38px;
          }
          .cms__icon img {
            width: 24px;
            height: 24px;
          }
          .cms__name {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default CMSArea;
