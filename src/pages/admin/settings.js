import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import SEO from '../../components/seo';
import { toast } from 'react-toastify';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    siteName: '', siteDescription: '', contactEmail: '', contactPhone: '', address: '',
    facebook: '', twitter: '', instagram: '', linkedin: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('تم حفظ الإعدادات بنجاح');
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  if (loading) {
    return (
      <>
        <SEO pageTitle="الإعدادات" />
        <AdminLayout pageTitle="الإعدادات">
          <p className="text-center">جاري التحميل...</p>
        </AdminLayout>
      </>
    );
  }

  return (
    <>
      <SEO pageTitle="الإعدادات" />
      <AdminLayout pageTitle="الإعدادات">
        <div className="admin-card">
          <h2>إعدادات الموقع</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              <div className="form-group">
                <label>اسم الموقع</label>
                <input type="text" name="siteName" className="form-control" value={settings.siteName || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input type="email" name="contactEmail" className="form-control" value={settings.contactEmail || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>رقم الهاتف</label>
                <input type="text" name="contactPhone" className="form-control" value={settings.contactPhone || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>العنوان</label>
                <input type="text" name="address" className="form-control" value={settings.address || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>وصف الموقع</label>
              <textarea name="siteDescription" className="form-control" rows="3" value={settings.siteDescription || ''} onChange={handleChange}></textarea>
            </div>

            <h3 style={{ marginTop: 30, marginBottom: 20 }}>روابط التواصل الاجتماعي</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
              <div className="form-group">
                <label>Facebook</label>
                <input type="url" name="facebook" className="form-control" value={settings.facebook || ''} onChange={handleChange} placeholder="https://facebook.com/..." />
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <input type="url" name="twitter" className="form-control" value={settings.twitter || ''} onChange={handleChange} placeholder="https://twitter.com/..." />
              </div>
              <div className="form-group">
                <label>Instagram</label>
                <input type="url" name="instagram" className="form-control" value={settings.instagram || ''} onChange={handleChange} placeholder="https://instagram.com/..." />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input type="url" name="linkedin" className="form-control" value={settings.linkedin || ''} onChange={handleChange} placeholder="https://linkedin.com/..." />
              </div>
            </div>

            <button type="submit" className="btn-admin btn-success" style={{ marginTop: 20 }}>
              حفظ الإعدادات
            </button>
          </form>
        </div>

        <div className="admin-card" style={{ marginTop: 30 }}>
          <h2>البيانات الافتراضية</h2>
          <p style={{ color: '#666', marginBottom: 15 }}>
            إضافة أنظمة CMS والتصنيفات والقوالب التجريبية (37 نظام CMS، 31 تصنيف، 35+ قالب)
          </p>
          <button 
            className="btn-admin btn-primary"
            onClick={async () => {
              try {
                toast.info('جاري إضافة البيانات...');
                const res = await fetch('/api/seed', { method: 'POST' });
                const data = await res.json();
                if (data.success) {
                  toast.success(`تم إضافة ${data.data.cms} نظام CMS و ${data.data.categories} تصنيف و ${data.data.templates} قالب`);
                } else {
                  toast.error(data.error);
                }
              } catch (error) {
                toast.error('حدث خطأ');
              }
            }}
          >
            <i className="fas fa-database" style={{ marginLeft: 8 }}></i>
            إضافة البيانات الافتراضية
          </button>
        </div>

        <div className="admin-card" style={{ marginTop: 30 }}>
          <h2>معلومات قاعدة البيانات</h2>
          <p style={{ color: '#666' }}>
            الموقع متصل بقاعدة بيانات MongoDB المحلية
          </p>
          <p>
            <strong>رابط الاتصال:</strong><br />
            <code style={{ background: '#f1f1f1', padding: '5px 10px', borderRadius: 5 }}>
              mongodb://localhost:27017/website-builder
            </code>
          </p>
        </div>

        <div className="admin-card" style={{ marginTop: 30 }}>
          <h2>معلومات تسجيل الدخول</h2>
          <p style={{ color: '#666' }}>
            لتغيير بيانات تسجيل الدخول، قم بتعديل الملف:
            <br />
            <code style={{ background: '#f1f1f1', padding: '5px 10px', borderRadius: 5 }}>
              src/redux/features/adminSlice.js
            </code>
          </p>
          <p style={{ marginTop: 15 }}>
            <strong>البيانات الحالية:</strong><br />
            البريد: admin@admin.com<br />
            كلمة المرور: admin123
          </p>
        </div>
      </AdminLayout>
    </>
  );
};

export default Settings;
