import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout';
import SEO from '../../components/seo';
import { fetchCMS, addCMS, updateCMS, deleteCMS } from '../../redux/features/cmsSlice';
import Swal from 'sweetalert2';

const LOCAL_IMAGES = [
  { name: 'WordPress', path: '/assets/img/cms/WordPress.svg.png' },
  { name: 'WooCommerce', path: '/assets/img/cms/woocommerce.png' },
  { name: 'Shopify', path: '/assets/img/cms/shopify.png' },
  { name: 'Drupal', path: '/assets/img/cms/Drupal.svg' },
  { name: 'Elementor', path: '/assets/img/cms/Elementor.png' },
  { name: 'Magento', path: '/assets/img/cms/Magento.webp' },
  { name: 'OpenCart', path: '/assets/img/cms/OpenCart.png' },
  { name: 'PrestaShop', path: '/assets/img/cms/Prestashop.svg.png' },
  { name: 'Laravel', path: '/assets/img/cms/Laravel.svg.png' },
  { name: 'Next.js', path: '/assets/img/cms/next-js.png' },
  { name: 'Mobile App', path: '/assets/img/cms/Mobile App.png' },
];

const DEFAULT_IMAGE = '/assets/img/cms/WordPress.svg.png';

const CMSPage = () => {
  const dispatch = useDispatch();
  const { cmsList, loading } = useSelector((state) => state.cms);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [formData, setFormData] = useState({
    name: '', nameAr: '', slug: '', image: DEFAULT_IMAGE, color: '#667eea', isActive: true, order: 0,
  });

  useEffect(() => { dispatch(fetchCMS()); }, [dispatch]);

  const handleSeedData = async () => {
    const result = await Swal.fire({
      title: 'تطبيق البيانات الافتراضية؟',
      text: 'سيتم حذف جميع البيانات الحالية واستبدالها بالبيانات الافتراضية',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#667eea',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم، طبّق البيانات',
    });

    if (result.isConfirmed) {
      setSeeding(true);
      try {
        const res = await fetch('/api/cms/seed', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
          Swal.fire('تم!', data.message, 'success');
          dispatch(fetchCMS());
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        Swal.fire('خطأ', error.message, 'error');
      }
      setSeeding(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name.trim(),
      nameAr: formData.nameAr.trim(),
      slug: formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-'),
      image: formData.image,
      color: formData.color,
      isActive: formData.isActive,
      order: parseInt(formData.order) || 0,
    };
    
    console.log('Form data to submit:', data);
    console.log('Selected image:', formData.image);
    
    try {
      if (editing) {
        console.log('Updating with ID:', editing._id);
        await dispatch(updateCMS({ ...data, _id: editing._id })).unwrap();
      } else {
        await dispatch(addCMS(data)).unwrap();
      }
      resetForm();
    } catch (error) {
      Swal.fire('خطأ', error.message || 'حدث خطأ', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setFormData({
      name: item.name || '', nameAr: item.nameAr || '', slug: item.slug || '',
      image: item.image || DEFAULT_IMAGE, color: item.color || '#667eea',
      isActive: item.isActive !== false, order: item.order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟', icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#e74c3c', cancelButtonText: 'إلغاء', confirmButtonText: 'نعم، احذف!',
    }).then((result) => { if (result.isConfirmed) dispatch(deleteCMS(id)); });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({ name: '', nameAr: '', slug: '', image: DEFAULT_IMAGE, color: '#667eea', isActive: true, order: 0 });
  };

  return (
    <>
      <SEO pageTitle="إدارة أنظمة CMS" />
      <AdminLayout pageTitle="أنظمة إدارة المحتوى (CMS)">
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <h2 style={{ margin: 0 }}>الأنظمة ({cmsList.length})</h2>
            <div style={{ display: 'flex', gap: 10 }}>
              <button 
                className="btn-admin btn-info" 
                onClick={handleSeedData}
                disabled={seeding}
                style={{ background: '#17a2b8', color: 'white' }}
              >
                {seeding ? 'جاري التطبيق...' : '🔄 تطبيق البيانات الافتراضية'}
              </button>
              <button className="btn-admin btn-primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
                {showForm ? 'إغلاق' : '+ إضافة نظام'}
              </button>
            </div>
          </div>

          {showForm && (
            <div style={{ background: '#f8f9fa', padding: 25, borderRadius: 12, marginBottom: 25 }}>
              <h3>{editing ? 'تعديل النظام' : 'إضافة نظام جديد'}</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15 }}>
                  <div className="form-group">
                    <label>الاسم (إنجليزي) *</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>الاسم (عربي) *</label>
                    <input type="text" name="nameAr" className="form-control" value={formData.nameAr} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>الرابط</label>
                    <input type="text" name="slug" className="form-control" value={formData.slug} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>اللون</label>
                    <input type="color" name="color" value={formData.color} onChange={handleChange} style={{ width: 60, height: 40 }} />
                  </div>
                  <div className="form-group">
                    <label>الترتيب</label>
                    <input type="number" name="order" className="form-control" value={formData.order} onChange={handleChange} min="0" />
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 25 }}>
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                    <label style={{ margin: 0 }}>نشط</label>
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <label style={{ fontWeight: 600, marginBottom: 10, display: 'block' }}>اختر الصورة *</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {LOCAL_IMAGES.map((img) => (
                      <div key={img.path} onClick={() => setFormData(prev => ({ ...prev, image: img.path }))}
                        style={{ width: 75, height: 75, border: formData.image === img.path ? '3px solid #667eea' : '2px solid #ddd',
                          borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', background: formData.image === img.path ? '#667eea10' : 'white', padding: 5 }}>
                        <img src={img.path} alt={img.name} style={{ width: 35, height: 35, objectFit: 'contain' }} />
                        <small style={{ fontSize: 8, marginTop: 3 }}>{img.name}</small>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button type="submit" className="btn-admin btn-success">{editing ? 'تحديث' : 'إضافة'}</button>
                  <button type="button" className="btn-admin btn-secondary" onClick={resetForm}>إلغاء</button>
                </div>
              </form>
            </div>
          )}

          {loading ? <p className="text-center">جاري التحميل...</p> : cmsList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 50 }}>
              <p>لا توجد أنظمة</p>
              <button className="btn-admin btn-primary" onClick={() => setShowForm(true)}>إضافة نظام</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 15 }}>
              {cmsList.map((cms) => (
                <div key={cms._id} style={{ background: 'white', padding: 20, borderRadius: 12, borderTop: `4px solid ${cms.color}`, opacity: cms.isActive ? 1 : 0.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 15 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 10, background: `${cms.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={cms.image || DEFAULT_IMAGE} alt={cms.name} style={{ width: 32, height: 32, objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 15 }}>{cms.name}</h4>
                      <small style={{ color: '#666' }}>{cms.nameAr}</small>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-admin btn-warning" style={{ flex: 1, padding: '6px 10px', fontSize: 12 }} onClick={() => handleEdit(cms)}>تعديل</button>
                    <button className="btn-admin btn-danger" style={{ flex: 1, padding: '6px 10px', fontSize: 12 }} onClick={() => handleDelete(cms._id)}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default CMSPage;
