import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout';
import SEO from '../../components/seo';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../redux/features/categorySlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '', nameAr: '', slug: '', description: '', descriptionAr: '', icon: '', image: '', color: '#667eea', isActive: true,
  });

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateCategory({ ...formData, _id: editing._id }));
    } else {
      dispatch(addCategory(formData));
    }
    resetForm();
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setFormData({
      name: cat.name || '', nameAr: cat.nameAr || '', slug: cat.slug || '',
      description: cat.description || '', descriptionAr: cat.descriptionAr || '',
      icon: cat.icon || '', image: cat.image || '', color: cat.color || '#667eea', isActive: cat.isActive !== false,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟', icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#e74c3c', cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذف!', cancelButtonText: 'إلغاء',
    }).then((result) => { if (result.isConfirmed) dispatch(deleteCategory(id)); });
  };

  const resetForm = () => {
    setShowForm(false); setEditing(null);
    setFormData({ name: '', nameAr: '', slug: '', description: '', descriptionAr: '', icon: '', image: '', color: '#667eea', isActive: true });
  };

  // تحديد عنصر واحد
  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // تحديد الكل
  const handleSelectAll = () => {
    if (selectedItems.length === categories.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(categories.map(cat => cat._id));
    }
  };

  // حذف المحدد
  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      toast.warning('الرجاء تحديد عناصر أولاً');
      return;
    }
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: `سيتم حذف ${selectedItems.length} عنصر`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذف الكل!',
      cancelButtonText: 'إلغاء',
    }).then(async (result) => {
      if (result.isConfirmed) {
        for (const id of selectedItems) {
          await dispatch(deleteCategory(id));
        }
        setSelectedItems([]);
        toast.success(`تم حذف ${selectedItems.length} عنصر`);
      }
    });
  };

  // تفعيل/تعطيل المحدد
  const handleToggleSelected = async (activate) => {
    if (selectedItems.length === 0) {
      toast.warning('الرجاء تحديد عناصر أولاً');
      return;
    }
    for (const id of selectedItems) {
      const cat = categories.find(c => c._id === id);
      if (cat) {
        await dispatch(updateCategory({ ...cat, isActive: activate }));
      }
    }
    setSelectedItems([]);
    toast.success(`تم ${activate ? 'تفعيل' : 'تعطيل'} ${selectedItems.length} عنصر`);
  };

  return (
    <>
      <SEO pageTitle="إدارة التصنيفات" />
      <AdminLayout pageTitle="أنواع المشاريع">
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <h2 style={{ margin: 0 }}>التصنيفات ({categories.length})</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {selectedItems.length > 0 && (
                <>
                  <span style={{ padding: '8px 15px', background: '#e3f2fd', borderRadius: 5, color: '#1976d2' }}>
                    محدد: {selectedItems.length}
                  </span>
                  <button className="btn-admin btn-success" style={{ padding: '8px 15px' }} onClick={() => handleToggleSelected(true)}>
                    <i className="fas fa-check"></i> تفعيل
                  </button>
                  <button className="btn-admin btn-warning" style={{ padding: '8px 15px' }} onClick={() => handleToggleSelected(false)}>
                    <i className="fas fa-ban"></i> تعطيل
                  </button>
                  <button className="btn-admin btn-danger" style={{ padding: '8px 15px' }} onClick={handleDeleteSelected}>
                    <i className="fas fa-trash"></i> حذف المحدد
                  </button>
                </>
              )}
              <button className="btn-admin btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'إلغاء' : '+ إضافة تصنيف'}
              </button>
            </div>
          </div>

          {showForm && (
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 10, marginBottom: 20 }}>
              <h3>{editing ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15 }}>
                  <div className="form-group"><label>الاسم (إنجليزي) *</label><input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required /></div>
                  <div className="form-group"><label>الاسم (عربي) *</label><input type="text" name="nameAr" className="form-control" value={formData.nameAr} onChange={handleChange} required /></div>
                  <div className="form-group"><label>الرابط (Slug)</label><input type="text" name="slug" className="form-control" value={formData.slug} onChange={handleChange} /></div>
                  <div className="form-group"><label>الأيقونة</label><input type="text" name="icon" className="form-control" value={formData.icon} onChange={handleChange} placeholder="fas fa-briefcase" /></div>
                  <div className="form-group"><label>اللون</label><input type="color" name="color" value={formData.color} onChange={handleChange} style={{ width: 50, height: 38 }} /></div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /><label style={{ margin: 0 }}>نشط</label></div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                  <button type="submit" className="btn-admin btn-success">{editing ? 'تحديث' : 'إضافة'}</button>
                  <button type="button" className="btn-admin btn-danger" onClick={resetForm}>إلغاء</button>
                </div>
              </form>
            </div>
          )}

          {/* شريط التحديد */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15, padding: '10px 15px', background: '#f8f9fa', borderRadius: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', margin: 0 }}>
              <input 
                type="checkbox" 
                checked={categories.length > 0 && selectedItems.length === categories.length}
                onChange={handleSelectAll}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <span>تحديد الكل</span>
            </label>
            {selectedItems.length > 0 && (
              <span style={{ color: '#666' }}>({selectedItems.length} من {categories.length})</span>
            )}
          </div>

          {loading ? <p className="text-center">جاري التحميل...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
              {categories.map((cat) => (
                <div 
                  key={cat._id} 
                  style={{ 
                    background: selectedItems.includes(cat._id) ? '#e3f2fd' : 'white', 
                    padding: 20, 
                    borderRadius: 10, 
                    borderTop: `4px solid ${cat.color}`, 
                    opacity: cat.isActive ? 1 : 0.6,
                    border: selectedItems.includes(cat._id) ? '2px solid #1976d2' : '1px solid #eee',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 15 }}>
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(cat._id)}
                      onChange={() => handleSelectItem(cat._id)}
                      style={{ width: 18, height: 18, cursor: 'pointer', marginTop: 5 }}
                    />
                    <div style={{ width: 45, height: 45, borderRadius: 10, background: `${cat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={cat.icon || 'fas fa-folder'} style={{ fontSize: 20, color: cat.color }}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: 15 }}>{cat.name}</h4>
                      <small style={{ color: '#666' }}>{cat.nameAr}</small>
                      {!cat.isActive && <span style={{ marginRight: 8, background: '#ffebee', color: '#c62828', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>معطل</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-admin btn-warning" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleEdit(cat)}>تعديل</button>
                    <button className="btn-admin btn-danger" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleDelete(cat._id)}>حذف</button>
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

export default Categories;
