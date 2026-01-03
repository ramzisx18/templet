import dbConnect from '../../../lib/mongodb';
import CMS from '../../../models/CMS';
import Category from '../../../models/Category';
import Template from '../../../models/Template';

// جميع أنظمة إدارة المحتوى CMS
const defaultCMS = [
  { name: 'WordPress', nameAr: 'ووردبريس', slug: 'wordpress', icon: 'fab fa-wordpress', color: '#21759b', image: 'https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg', isActive: true },
  { name: 'Drupal', nameAr: 'دروبال', slug: 'drupal', icon: 'fab fa-drupal', color: '#0678be', image: 'https://cdn.worldvectorlogo.com/logos/drupal.svg', isActive: true },
  { name: 'Joomla', nameAr: 'جوملا', slug: 'joomla', icon: 'fab fa-joomla', color: '#5091cd', image: 'https://cdn.worldvectorlogo.com/logos/joomla.svg', isActive: true },
  { name: 'Ghost', nameAr: 'جوست', slug: 'ghost', icon: 'fas fa-ghost', color: '#738a94', image: 'https://cdn.worldvectorlogo.com/logos/ghost-3.svg', isActive: true },
  { name: 'Strapi', nameAr: 'سترابي', slug: 'strapi', icon: 'fas fa-server', color: '#8c4bff', image: 'https://cdn.worldvectorlogo.com/logos/strapi-2.svg', isActive: true },
  { name: 'Contentful', nameAr: 'كونتنتفول', slug: 'contentful', icon: 'fas fa-cloud', color: '#2478cc', image: '', isActive: true },
  { name: 'Sanity', nameAr: 'سانيتي', slug: 'sanity', icon: 'fas fa-database', color: '#f03e2f', image: '', isActive: true },
  { name: 'Elementor', nameAr: 'إليمنتور', slug: 'elementor', icon: 'fab fa-elementor', color: '#92003b', image: 'https://cdn.worldvectorlogo.com/logos/elementor-1.svg', isActive: true },
  { name: 'Divi', nameAr: 'ديفي', slug: 'divi', icon: 'fas fa-palette', color: '#7c3aed', image: '', isActive: true },
  { name: 'Webflow', nameAr: 'ويب فلو', slug: 'webflow', icon: 'fas fa-layer-group', color: '#4353ff', image: 'https://cdn.worldvectorlogo.com/logos/webflow-1.svg', isActive: true },
  { name: 'Wix', nameAr: 'ويكس', slug: 'wix', icon: 'fab fa-wix', color: '#0c6efc', image: 'https://cdn.worldvectorlogo.com/logos/wix.svg', isActive: true },
  { name: 'Squarespace', nameAr: 'سكوير سبيس', slug: 'squarespace', icon: 'fab fa-squarespace', color: '#000000', image: '', isActive: true },
  { name: 'Shopify', nameAr: 'شوبيفاي', slug: 'shopify', icon: 'fab fa-shopify', color: '#96bf48', image: 'https://cdn.worldvectorlogo.com/logos/shopify.svg', isActive: true },
  { name: 'WooCommerce', nameAr: 'ووكومرس', slug: 'woocommerce', icon: 'fas fa-shopping-cart', color: '#96588a', image: '', isActive: true },
  { name: 'Magento', nameAr: 'ماجنتو', slug: 'magento', icon: 'fab fa-magento', color: '#f26322', image: 'https://cdn.worldvectorlogo.com/logos/magento.svg', isActive: true },
  { name: 'OpenCart', nameAr: 'أوبن كارت', slug: 'opencart', icon: 'fas fa-shopping-basket', color: '#23a8e0', image: 'https://cdn.worldvectorlogo.com/logos/opencart.svg', isActive: true },
  { name: 'PrestaShop', nameAr: 'بريستاشوب', slug: 'prestashop', icon: 'fas fa-store', color: '#df0067', image: '', isActive: true },
  { name: 'BigCommerce', nameAr: 'بيج كومرس', slug: 'bigcommerce', icon: 'fas fa-store-alt', color: '#34313f', image: '', isActive: true },
  { name: 'Salla', nameAr: 'سلة', slug: 'salla', icon: 'fas fa-shopping-bag', color: '#004d40', image: '', isActive: true },
  { name: 'Zid', nameAr: 'زد', slug: 'zid', icon: 'fas fa-cart-plus', color: '#5c2d91', image: '', isActive: true },
  { name: 'Laravel', nameAr: 'لارافيل', slug: 'laravel', icon: 'fab fa-laravel', color: '#ff2d20', image: 'https://cdn.worldvectorlogo.com/logos/laravel-2.svg', isActive: true },
  { name: 'Next.js', nameAr: 'نكست جي إس', slug: 'nextjs', icon: 'fab fa-react', color: '#000000', image: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', isActive: true },
  { name: 'Nuxt.js', nameAr: 'نكست جي إس', slug: 'nuxtjs', icon: 'fab fa-vuejs', color: '#00dc82', image: '', isActive: true },
  { name: 'Django', nameAr: 'جانغو', slug: 'django', icon: 'fab fa-python', color: '#092e20', image: 'https://cdn.worldvectorlogo.com/logos/django.svg', isActive: true },
  { name: 'Ruby on Rails', nameAr: 'روبي أون ريلز', slug: 'rails', icon: 'fas fa-gem', color: '#cc0000', image: '', isActive: true },
  { name: 'ASP.NET', nameAr: 'إيه إس بي دوت نت', slug: 'aspnet', icon: 'fab fa-microsoft', color: '#512bd4', image: '', isActive: true },
  { name: 'Express.js', nameAr: 'إكسبريس', slug: 'expressjs', icon: 'fab fa-node-js', color: '#000000', image: '', isActive: true },
  { name: 'Spring Boot', nameAr: 'سبرينج بوت', slug: 'spring-boot', icon: 'fab fa-java', color: '#6db33f', image: '', isActive: true },
  { name: 'Moodle', nameAr: 'مودل', slug: 'moodle', icon: 'fas fa-graduation-cap', color: '#f98012', image: '', isActive: true },
  { name: 'LearnDash', nameAr: 'ليرن داش', slug: 'learndash', icon: 'fas fa-chalkboard-teacher', color: '#1cb7a5', image: '', isActive: true },
  { name: 'phpBB', nameAr: 'بي إتش بي بي بي', slug: 'phpbb', icon: 'fas fa-comments', color: '#3b5998', image: '', isActive: true },
  { name: 'Discourse', nameAr: 'ديسكورس', slug: 'discourse', icon: 'fab fa-discourse', color: '#000000', image: '', isActive: true },
  { name: 'MediaWiki', nameAr: 'ميديا ويكي', slug: 'mediawiki', icon: 'fab fa-wikipedia-w', color: '#000000', image: '', isActive: true },
  { name: 'Custom', nameAr: 'برمجة خاصة', slug: 'custom', icon: 'fas fa-code', color: '#667eea', image: '', isActive: true },
  { name: 'API', nameAr: 'تطوير API', slug: 'api', icon: 'fas fa-plug', color: '#00bcd4', image: '', isActive: true },
  { name: 'Mobile App', nameAr: 'تطبيق جوال', slug: 'mobile', icon: 'fas fa-mobile-alt', color: '#4caf50', image: '', isActive: true },
  { name: 'PWA', nameAr: 'تطبيق ويب تقدمي', slug: 'pwa', icon: 'fas fa-window-maximize', color: '#5a0fc8', image: '', isActive: true },
];


// التصنيفات
const defaultCategories = [
  { name: 'E-commerce', nameAr: 'متجر إلكتروني', slug: 'ecommerce', icon: 'fas fa-shopping-bag', color: '#e74c3c', isActive: true },
  { name: 'Multi-vendor', nameAr: 'متعدد البائعين', slug: 'multi-vendor', icon: 'fas fa-store-alt', color: '#c0392b', isActive: true },
  { name: 'Business', nameAr: 'موقع شركة', slug: 'business', icon: 'fas fa-briefcase', color: '#3498db', isActive: true },
  { name: 'Startup', nameAr: 'شركة ناشئة', slug: 'startup', icon: 'fas fa-rocket', color: '#9b59b6', isActive: true },
  { name: 'Agency', nameAr: 'وكالة', slug: 'agency', icon: 'fas fa-building', color: '#2980b9', isActive: true },
  { name: 'Portfolio', nameAr: 'معرض أعمال', slug: 'portfolio', icon: 'fas fa-images', color: '#9b59b6', isActive: true },
  { name: 'Photography', nameAr: 'تصوير', slug: 'photography', icon: 'fas fa-camera', color: '#8e44ad', isActive: true },
  { name: 'Blog', nameAr: 'مدونة', slug: 'blog', icon: 'fas fa-blog', color: '#1abc9c', isActive: true },
  { name: 'Magazine', nameAr: 'مجلة', slug: 'magazine', icon: 'fas fa-book-open', color: '#16a085', isActive: true },
  { name: 'News', nameAr: 'أخبار', slug: 'news', icon: 'fas fa-newspaper', color: '#607d8b', isActive: true },
  { name: 'Restaurant', nameAr: 'مطعم', slug: 'restaurant', icon: 'fas fa-utensils', color: '#f39c12', isActive: true },
  { name: 'Cafe', nameAr: 'مقهى', slug: 'cafe', icon: 'fas fa-coffee', color: '#795548', isActive: true },
  { name: 'Hotel', nameAr: 'فندق', slug: 'hotel', icon: 'fas fa-hotel', color: '#ff5722', isActive: true },
  { name: 'Travel', nameAr: 'سياحة', slug: 'travel', icon: 'fas fa-plane', color: '#00bcd4', isActive: true },
  { name: 'Real Estate', nameAr: 'عقارات', slug: 'real-estate', icon: 'fas fa-home', color: '#27ae60', isActive: true },
  { name: 'Automotive', nameAr: 'سيارات', slug: 'automotive', icon: 'fas fa-car', color: '#455a64', isActive: true },
  { name: 'Beauty & Spa', nameAr: 'تجميل وسبا', slug: 'beauty-spa', icon: 'fas fa-spa', color: '#e91e63', isActive: true },
  { name: 'Fitness', nameAr: 'لياقة', slug: 'fitness', icon: 'fas fa-dumbbell', color: '#4caf50', isActive: true },
  { name: 'Medical', nameAr: 'طبي', slug: 'medical', icon: 'fas fa-heartbeat', color: '#e91e63', isActive: true },
  { name: 'Dental', nameAr: 'أسنان', slug: 'dental', icon: 'fas fa-tooth', color: '#00bcd4', isActive: true },
  { name: 'Hospital', nameAr: 'مستشفى', slug: 'hospital', icon: 'fas fa-hospital', color: '#f44336', isActive: true },
  { name: 'Education', nameAr: 'تعليمي', slug: 'education', icon: 'fas fa-graduation-cap', color: '#673ab7', isActive: true },
  { name: 'School', nameAr: 'مدرسة', slug: 'school', icon: 'fas fa-school', color: '#3f51b5', isActive: true },
  { name: 'Online Courses', nameAr: 'دورات أونلاين', slug: 'online-courses', icon: 'fas fa-chalkboard-teacher', color: '#009688', isActive: true },
  { name: 'SaaS', nameAr: 'برمجيات كخدمة', slug: 'saas', icon: 'fas fa-cloud', color: '#2196f3', isActive: true },
  { name: 'App Landing', nameAr: 'صفحة تطبيق', slug: 'app-landing', icon: 'fas fa-mobile-alt', color: '#9c27b0', isActive: true },
  { name: 'Landing Page', nameAr: 'صفحة هبوط', slug: 'landing', icon: 'fas fa-rocket', color: '#ff5722', isActive: true },
  { name: 'Forum', nameAr: 'منتدى', slug: 'forum', icon: 'fas fa-comments', color: '#00bcd4', isActive: true },
  { name: 'Events', nameAr: 'فعاليات', slug: 'events', icon: 'fas fa-calendar-alt', color: '#e91e63', isActive: true },
  { name: 'Non-Profit', nameAr: 'غير ربحي', slug: 'non-profit', icon: 'fas fa-hand-holding-heart', color: '#e91e63', isActive: true },
  { name: 'Religious', nameAr: 'ديني', slug: 'religious', icon: 'fas fa-mosque', color: '#009688', isActive: true },
];


// القوالب التجريبية
const defaultTemplates = [
  // متاجر إلكترونية
  { title: 'TechStore Pro', titleAr: 'تك ستور برو', category: 'E-commerce', cms: 'WooCommerce', price: 299, description: 'Modern electronics store', descriptionAr: 'متجر إلكترونيات حديث', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', demoUrl: '#', isActive: true },
  { title: 'Fashion Hub', titleAr: 'فاشن هب', category: 'E-commerce', cms: 'Shopify', price: 349, description: 'Elegant fashion store', descriptionAr: 'متجر أزياء أنيق', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600', demoUrl: '#', isActive: true },
  { title: 'Beauty Store', titleAr: 'بيوتي ستور', category: 'E-commerce', cms: 'Shopify', price: 299, description: 'Cosmetics shop', descriptionAr: 'متجر مستحضرات تجميل', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600', demoUrl: '#', isActive: true },
  { title: 'Furniture Mall', titleAr: 'فيرنتشر مول', category: 'E-commerce', cms: 'WooCommerce', price: 399, description: 'Furniture store', descriptionAr: 'متجر أثاث', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', demoUrl: '#', isActive: true },
  { title: 'Grocery Market', titleAr: 'جروسري ماركت', category: 'E-commerce', cms: 'Magento', price: 499, description: 'Online grocery', descriptionAr: 'بقالة أونلاين', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600', demoUrl: '#', isActive: true },
  { title: 'Multi Vendor Market', titleAr: 'سوق متعدد البائعين', category: 'Multi-vendor', cms: 'Laravel', price: 799, description: 'Marketplace platform', descriptionAr: 'منصة سوق إلكتروني', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600', demoUrl: '#', isActive: true },
  { title: 'Salla Store', titleAr: 'متجر سلة', category: 'E-commerce', cms: 'Salla', price: 199, description: 'Arabic store', descriptionAr: 'متجر عربي', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600', demoUrl: '#', isActive: true },
  
  // مواقع الشركات
  { title: 'Corporate Elite', titleAr: 'كوربوريت إيليت', category: 'Business', cms: 'WordPress', price: 199, description: 'Professional business', descriptionAr: 'موقع أعمال احترافي', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', demoUrl: '#', isActive: true },
  { title: 'Startup Launch', titleAr: 'ستارت أب لانش', category: 'Startup', cms: 'Next.js', price: 349, description: 'Startup website', descriptionAr: 'موقع شركة ناشئة', img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600', demoUrl: '#', isActive: true },
  { title: 'Agency Pro', titleAr: 'إيجنسي برو', category: 'Agency', cms: 'WordPress', price: 249, description: 'Digital agency', descriptionAr: 'وكالة رقمية', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600', demoUrl: '#', isActive: true },
  { title: 'Consulting Firm', titleAr: 'كونسلتنج فيرم', category: 'Business', cms: 'WordPress', price: 199, description: 'Consulting website', descriptionAr: 'موقع استشارات', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', demoUrl: '#', isActive: true },

  // معارض الأعمال والإبداع
  { title: 'Portfolio Master', titleAr: 'بورتفوليو ماستر', category: 'Portfolio', cms: 'WordPress', price: 149, description: 'Creative portfolio', descriptionAr: 'معرض أعمال إبداعي', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600', demoUrl: '#', isActive: true },
  { title: 'Photo Gallery', titleAr: 'فوتو جاليري', category: 'Photography', cms: 'WordPress', price: 179, description: 'Photography website', descriptionAr: 'موقع تصوير', img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600', demoUrl: '#', isActive: true },
  { title: 'Design Studio', titleAr: 'ديزاين ستوديو', category: 'Portfolio', cms: 'Webflow', price: 249, description: 'Design studio', descriptionAr: 'استوديو تصميم', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600', demoUrl: '#', isActive: true },
  
  // المدونات والأخبار
  { title: 'Blog Master', titleAr: 'بلوج ماستر', category: 'Blog', cms: 'WordPress', price: 149, description: 'Clean blog', descriptionAr: 'مدونة نظيفة', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600', demoUrl: '#', isActive: true },
  { title: 'News Portal', titleAr: 'نيوز بورتال', category: 'News', cms: 'WordPress', price: 299, description: 'News website', descriptionAr: 'موقع أخبار', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600', demoUrl: '#', isActive: true },
  { title: 'Magazine Pro', titleAr: 'ماجازين برو', category: 'Magazine', cms: 'Ghost', price: 249, description: 'Online magazine', descriptionAr: 'مجلة إلكترونية', img: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600', demoUrl: '#', isActive: true },
  
  // المطاعم والفنادق
  { title: 'Restaurant Starter', titleAr: 'ريستورانت ستارتر', category: 'Restaurant', cms: 'WordPress', price: 199, description: 'Restaurant website', descriptionAr: 'موقع مطعم', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600', demoUrl: '#', isActive: true },
  { title: 'Cafe Corner', titleAr: 'كافيه كورنر', category: 'Cafe', cms: 'WordPress', price: 149, description: 'Cafe website', descriptionAr: 'موقع مقهى', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600', demoUrl: '#', isActive: true },
  { title: 'Hotel Luxury', titleAr: 'هوتيل لاكشري', category: 'Hotel', cms: 'Laravel', price: 599, description: 'Hotel booking', descriptionAr: 'حجز فندقي', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', demoUrl: '#', isActive: true },
  { title: 'Travel Agency', titleAr: 'ترافيل إيجنسي', category: 'Travel', cms: 'WordPress', price: 349, description: 'Travel website', descriptionAr: 'موقع سياحة', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600', demoUrl: '#', isActive: true },

  // العقارات والسيارات
  { title: 'Real Estate Pro', titleAr: 'ريل إستيت برو', category: 'Real Estate', cms: 'Laravel', price: 499, description: 'Real estate listings', descriptionAr: 'قوائم عقارات', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600', demoUrl: '#', isActive: true },
  { title: 'Auto Dealer', titleAr: 'أوتو ديلر', category: 'Automotive', cms: 'WordPress', price: 399, description: 'Car dealership', descriptionAr: 'معرض سيارات', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600', demoUrl: '#', isActive: true },
  
  // الصحة والجمال
  { title: 'Medical Center', titleAr: 'ميديكال سنتر', category: 'Medical', cms: 'WordPress', price: 299, description: 'Medical website', descriptionAr: 'موقع طبي', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600', demoUrl: '#', isActive: true },
  { title: 'Dental Clinic', titleAr: 'دينتال كلينيك', category: 'Dental', cms: 'WordPress', price: 249, description: 'Dental clinic', descriptionAr: 'عيادة أسنان', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', demoUrl: '#', isActive: true },
  { title: 'Beauty Salon', titleAr: 'بيوتي صالون', category: 'Beauty & Spa', cms: 'WordPress', price: 199, description: 'Beauty salon', descriptionAr: 'صالون تجميل', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600', demoUrl: '#', isActive: true },
  { title: 'Fitness Club', titleAr: 'فيتنس كلوب', category: 'Fitness', cms: 'WordPress', price: 249, description: 'Gym website', descriptionAr: 'موقع صالة رياضة', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', demoUrl: '#', isActive: true },
  
  // التعليم
  { title: 'School Portal', titleAr: 'سكول بورتال', category: 'School', cms: 'Laravel', price: 499, description: 'School website', descriptionAr: 'موقع مدرسة', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600', demoUrl: '#', isActive: true },
  { title: 'Online Academy', titleAr: 'أونلاين أكاديمي', category: 'Online Courses', cms: 'LearnDash', price: 599, description: 'E-learning platform', descriptionAr: 'منصة تعلم إلكتروني', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600', demoUrl: '#', isActive: true },
  { title: 'University Site', titleAr: 'يونيفرسيتي سايت', category: 'Education', cms: 'Drupal', price: 699, description: 'University website', descriptionAr: 'موقع جامعة', img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600', demoUrl: '#', isActive: true },

  // التقنية والتطبيقات
  { title: 'SaaS Dashboard', titleAr: 'لوحة SaaS', category: 'SaaS', cms: 'Laravel', price: 599, description: 'SaaS admin panel', descriptionAr: 'لوحة تحكم SaaS', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600', demoUrl: '#', isActive: true },
  { title: 'App Landing', titleAr: 'آب لاندينج', category: 'App Landing', cms: 'Next.js', price: 199, description: 'App landing page', descriptionAr: 'صفحة هبوط تطبيق', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600', demoUrl: '#', isActive: true },
  { title: 'Tech Company', titleAr: 'تك كومباني', category: 'Business', cms: 'Next.js', price: 349, description: 'Tech company site', descriptionAr: 'موقع شركة تقنية', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600', demoUrl: '#', isActive: true },
  
  // صفحات الهبوط
  { title: 'Product Launch', titleAr: 'برودكت لانش', category: 'Landing Page', cms: 'WordPress', price: 99, description: 'Product landing', descriptionAr: 'صفحة هبوط منتج', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', demoUrl: '#', isActive: true },
  { title: 'Coming Soon', titleAr: 'كومينج سون', category: 'Landing Page', cms: 'Custom', price: 49, description: 'Coming soon page', descriptionAr: 'صفحة قريباً', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600', demoUrl: '#', isActive: true },
  
  // المجتمع والفعاليات
  { title: 'Forum Community', titleAr: 'فورم كوميونيتي', category: 'Forum', cms: 'Discourse', price: 399, description: 'Community forum', descriptionAr: 'منتدى مجتمعي', img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600', demoUrl: '#', isActive: true },
  { title: 'Event Manager', titleAr: 'إيفنت مانجر', category: 'Events', cms: 'WordPress', price: 299, description: 'Event website', descriptionAr: 'موقع فعاليات', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', demoUrl: '#', isActive: true },
  
  // غير ربحي
  { title: 'Charity Foundation', titleAr: 'تشاريتي فاونديشن', category: 'Non-Profit', cms: 'WordPress', price: 199, description: 'Charity website', descriptionAr: 'موقع خيري', img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600', demoUrl: '#', isActive: true },
  { title: 'Mosque Site', titleAr: 'موسك سايت', category: 'Religious', cms: 'WordPress', price: 149, description: 'Mosque website', descriptionAr: 'موقع مسجد', img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600', demoUrl: '#', isActive: true },
];


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // إضافة أنظمة CMS
    for (const cms of defaultCMS) {
      await CMS.findOneAndUpdate({ slug: cms.slug }, cms, { upsert: true, new: true });
    }

    // إضافة التصنيفات
    for (const cat of defaultCategories) {
      await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
    }

    // إضافة القوالب
    for (const template of defaultTemplates) {
      await Template.findOneAndUpdate({ title: template.title }, template, { upsert: true, new: true });
    }

    res.status(200).json({ 
      success: true, 
      message: 'تم إضافة البيانات الافتراضية بنجاح',
      data: {
        cms: defaultCMS.length,
        categories: defaultCategories.length,
        templates: defaultTemplates.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
