import dbConnect from '../../../lib/mongodb';
import CMS from '../../../models/CMS';

const defaultCMSData = [
  { name: 'WordPress', nameAr: 'ووردبريس', slug: 'wordpress', color: '#21759b', image: '/assets/img/cms/WordPress.svg.png', order: 1 },
  { name: 'WooCommerce', nameAr: 'ووكومرس', slug: 'woocommerce', color: '#96588a', image: '/assets/img/cms/woocommerce.png', order: 2 },
  { name: 'Shopify', nameAr: 'شوبيفاي', slug: 'shopify', color: '#96bf48', image: '/assets/img/cms/shopify.png', order: 3 },
  { name: 'Drupal', nameAr: 'دروبال', slug: 'drupal', color: '#0678be', image: '/assets/img/cms/Drupal.svg', order: 4 },
  { name: 'Elementor', nameAr: 'إليمنتور', slug: 'elementor', color: '#92003b', image: '/assets/img/cms/Elementor.png', order: 5 },
  { name: 'Magento', nameAr: 'ماجنتو', slug: 'magento', color: '#f26322', image: '/assets/img/cms/Magento.webp', order: 6 },
  { name: 'OpenCart', nameAr: 'أوبن كارت', slug: 'opencart', color: '#23a8e0', image: '/assets/img/cms/OpenCart.png', order: 7 },
  { name: 'PrestaShop', nameAr: 'بريستاشوب', slug: 'prestashop', color: '#df0067', image: '/assets/img/cms/Prestashop.svg.png', order: 8 },
  { name: 'Laravel', nameAr: 'لارافيل', slug: 'laravel', color: '#ff2d20', image: '/assets/img/cms/Laravel.svg.png', order: 9 },
  { name: 'Next.js', nameAr: 'نكست جي إس', slug: 'nextjs', color: '#000000', image: '/assets/img/cms/next-js.png', order: 10 },
  { name: 'Mobile App', nameAr: 'تطبيق موبايل', slug: 'mobile-app', color: '#667eea', image: '/assets/img/cms/Mobile App.png', order: 11 },
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  await dbConnect();

  try {
    // حذف البيانات القديمة
    await CMS.deleteMany({});
    
    // إضافة البيانات الجديدة
    const result = await CMS.insertMany(defaultCMSData);
    
    res.status(200).json({ 
      success: true, 
      message: `تم إضافة ${result.length} نظام CMS بنجاح`,
      data: result 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
