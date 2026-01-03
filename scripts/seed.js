const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://girokish_db_user:pFOyY4ikym6nwzi2@sass.wqf3maj.mongodb.net/website-builder';

const cmsData = [
  { name: 'WordPress', nameAr: 'ووردبريس', image: '/assets/img/cms/WordPress.svg.png', isActive: true, order: 1 },
  { name: 'WooCommerce', nameAr: 'ووكومرس', image: '/assets/img/cms/woocommerce.png', isActive: true, order: 2 },
  { name: 'Shopify', nameAr: 'شوبيفاي', image: '/assets/img/cms/shopify.png', isActive: true, order: 3 },
  { name: 'Laravel', nameAr: 'لارافيل', image: '/assets/img/cms/Laravel.svg.png', isActive: true, order: 4 },
  { name: 'Next.js', nameAr: 'نكست جي إس', image: '/assets/img/cms/next-js.png', isActive: true, order: 5 },
  { name: 'Elementor', nameAr: 'إليمنتور', image: '/assets/img/cms/Elementor.png', isActive: true, order: 6 },
  { name: 'Magento', nameAr: 'ماجنتو', image: '/assets/img/cms/Magento.webp', isActive: true, order: 7 },
  { name: 'OpenCart', nameAr: 'أوبن كارت', image: '/assets/img/cms/OpenCart.png', isActive: true, order: 8 },
  { name: 'PrestaShop', nameAr: 'بريستاشوب', image: '/assets/img/cms/Prestashop.svg.png', isActive: true, order: 9 },
  { name: 'Drupal', nameAr: 'دروبال', image: '/assets/img/cms/drupal.png', isActive: true, order: 10 },
  { name: 'Mobile App', nameAr: 'تطبيق موبايل', image: '/assets/img/cms/Mobile App.png', isActive: true, order: 11 },
];

const categoriesData = [
  { name: 'Business', nameAr: 'شركات وأعمال', slug: 'business', icon: 'fas fa-briefcase', isActive: true, order: 1 },
  { name: 'E-Commerce', nameAr: 'متاجر إلكترونية', slug: 'ecommerce', icon: 'fas fa-shopping-cart', isActive: true, order: 2 },
  { name: 'Restaurant', nameAr: 'مطاعم ومقاهي', slug: 'restaurant', icon: 'fas fa-utensils', isActive: true, order: 3 },
  { name: 'Medical', nameAr: 'طبي وصحي', slug: 'medical', icon: 'fas fa-heartbeat', isActive: true, order: 4 },
  { name: 'Education', nameAr: 'تعليم وتدريب', slug: 'education', icon: 'fas fa-graduation-cap', isActive: true, order: 5 },
  { name: 'Portfolio', nameAr: 'معرض أعمال', slug: 'portfolio', icon: 'fas fa-images', isActive: true, order: 6 },
  { name: 'Blog', nameAr: 'مدونة', slug: 'blog', icon: 'fas fa-blog', isActive: true, order: 7 },
  { name: 'Real Estate', nameAr: 'عقارات', slug: 'realestate', icon: 'fas fa-home', isActive: true, order: 8 },
  { name: 'Travel', nameAr: 'سياحة وسفر', slug: 'travel', icon: 'fas fa-plane', isActive: true, order: 9 },
  { name: 'Fitness', nameAr: 'رياضة ولياقة', slug: 'fitness', icon: 'fas fa-dumbbell', isActive: true, order: 10 },
  { name: 'Beauty', nameAr: 'تجميل وعناية', slug: 'beauty', icon: 'fas fa-spa', isActive: true, order: 11 },
  { name: 'Technology', nameAr: 'تقنية وبرمجيات', slug: 'technology', icon: 'fas fa-laptop-code', isActive: true, order: 12 },
];

async function seed() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db('website-builder');
    
    // Clear and insert CMS
    await db.collection('cms').deleteMany({});
    const cmsResult = await db.collection('cms').insertMany(cmsData);
    console.log(`Inserted ${cmsResult.insertedCount} CMS items`);
    
    // Clear and insert Categories
    await db.collection('categories').deleteMany({});
    const catResult = await db.collection('categories').insertMany(categoriesData);
    console.log(`Inserted ${catResult.insertedCount} Categories`);
    
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

seed();
