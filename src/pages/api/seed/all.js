import dbConnect from '../../../lib/mongodb';
import CMS from '../../../models/CMS';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // بيانات أنظمة CMS
    const cmsData = [
      { name: 'WordPress', nameAr: 'ووردبريس', image: '/assets/img/cms/WordPress.svg.png', order: 1 },
      { name: 'WooCommerce', nameAr: 'ووكومرس', image: '/assets/img/cms/woocommerce.png', order: 2 },
      { name: 'Shopify', nameAr: 'شوبيفاي', image: '/assets/img/cms/shopify.png', order: 3 },
      { name: 'Laravel', nameAr: 'لارافيل', image: '/assets/img/cms/Laravel.svg.png', order: 4 },
      { name: 'Next.js', nameAr: 'نكست جي إس', image: '/assets/img/cms/next-js.png', order: 5 },
      { name: 'Elementor', nameAr: 'إليمنتور', image: '/assets/img/cms/Elementor.png', order: 6 },
      { name: 'Magento', nameAr: 'ماجنتو', image: '/assets/img/cms/Magento.webp', order: 7 },
      { name: 'OpenCart', nameAr: 'أوبن كارت', image: '/assets/img/cms/OpenCart.png', order: 8 },
      { name: 'PrestaShop', nameAr: 'بريستاشوب', image: '/assets/img/cms/Prestashop.svg.png', order: 9 },
      { name: 'Drupal', nameAr: 'دروبال', image: '/assets/img/cms/drupal.png', order: 10 },
      { name: 'Mobile App', nameAr: 'تطبيق موبايل', image: '/assets/img/cms/Mobile App.png', order: 11 },
    ];

    // بيانات التصنيفات
    const categoriesData = [
      { name: 'Business', nameAr: 'شركات وأعمال', slug: 'business', icon: 'fas fa-briefcase', order: 1 },
      { name: 'E-Commerce', nameAr: 'متاجر إلكترونية', slug: 'ecommerce', icon: 'fas fa-shopping-cart', order: 2 },
      { name: 'Restaurant', nameAr: 'مطاعم ومقاهي', slug: 'restaurant', icon: 'fas fa-utensils', order: 3 },
      { name: 'Medical', nameAr: 'طبي وصحي', slug: 'medical', icon: 'fas fa-heartbeat', order: 4 },
      { name: 'Education', nameAr: 'تعليم وتدريب', slug: 'education', icon: 'fas fa-graduation-cap', order: 5 },
      { name: 'Portfolio', nameAr: 'معرض أعمال', slug: 'portfolio', icon: 'fas fa-images', order: 6 },
      { name: 'Blog', nameAr: 'مدونة', slug: 'blog', icon: 'fas fa-blog', order: 7 },
      { name: 'Real Estate', nameAr: 'عقارات', slug: 'realestate', icon: 'fas fa-home', order: 8 },
      { name: 'Travel', nameAr: 'سياحة وسفر', slug: 'travel', icon: 'fas fa-plane', order: 9 },
      { name: 'Fitness', nameAr: 'رياضة ولياقة', slug: 'fitness', icon: 'fas fa-dumbbell', order: 10 },
      { name: 'Beauty', nameAr: 'تجميل وعناية', slug: 'beauty', icon: 'fas fa-spa', order: 11 },
      { name: 'Technology', nameAr: 'تقنية وبرمجيات', slug: 'technology', icon: 'fas fa-laptop-code', order: 12 },
    ];

    // حذف البيانات القديمة وإضافة الجديدة
    await CMS.deleteMany({});
    await Category.deleteMany({});

    const cms = await CMS.insertMany(cmsData);
    const categories = await Category.insertMany(categoriesData);

    res.status(200).json({
      success: true,
      message: 'تم إضافة البيانات بنجاح',
      data: {
        cms: cms.length,
        categories: categories.length,
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'فشل في إضافة البيانات', details: error.message });
  }
}
