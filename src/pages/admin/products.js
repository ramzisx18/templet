import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout';
import SEO from '../../components/seo';
import { fetchTemplates, addTemplate, updateTemplate, deleteTemplate } from '../../redux/features/productSlice';
import { fetchCategories } from '../../redux/features/categorySlice';
import { fetchCMS } from '../../redux/features/cmsSlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { cmsList } = useSelector((state) => state.cms);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '', category: '', cms: '', price: '', demoUrl: '', img: '', description: '', features: '', isActive: true,
  });

  useEffect(() => {
    dispatch(fetchTemplates());
    dispatch(fetchCategories());
    dispatch(fetchCMS());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
    };
    if (editingProduct) {
      dispatch(updateTemplate({ ...dataToSend, _id: editingProduct._id }));
    } else {
      dispatch(addTemplate(dataToSend));
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || '', category: product.category || '', cms: product.cms || '',
      price: product.price || '', demoUrl: product.demoUrl || '', img: product.img || '',
      description: product.description || '', 
      features: Array.isArray(product.features) ? product.features.join('\n') : (product.features || ''), 
      isActive: product.isActive !== false,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟', icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#e74c3c', cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذف!', cancelButtonText: 'إلغاء',
    }).then((result) => { if (result.isConfirmed) dispatch(deleteTemplate(id)); });
  };

  const resetForm = () => {
    setShowForm(false); setEditingProduct(null);
    setFormData({ title: '', category: '', cms: '', price: '', demoUrl: '', img: '', description: '', features: '', isActive: true });
  };

  // تحديد عنصر واحد
  const handleSelectItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // تحديد الكل
  const handleSelectAll = () => {
    if (selectedItems.length === products.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map(p => p._id));
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
      text: `سيتم حذف ${selectedItems.length} قالب`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذف الكل!',
      cancelButtonText: 'إلغاء',
    }).then(async (result) => {
      if (result.isConfirmed) {
        for (const id of selectedItems) {
          await dispatch(deleteTemplate(id));
        }
        setSelectedItems([]);
        toast.success(`تم حذف ${selectedItems.length} قالب`);
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
      const product = products.find(p => p._id === id);
      if (product) {
        await dispatch(updateTemplate({ ...product, isActive: activate }));
      }
    }
    setSelectedItems([]);
    toast.success(`تم ${activate ? 'تفعيل' : 'تعطيل'} ${selectedItems.length} قالب`);
  };

  return (
    <>
      <SEO pageTitle="إدارة القوالب" />
      <AdminLayout pageTitle="إدارة القوالب">
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <h2 style={{ margin: 0 }}>القوالب ({products.length})</h2>
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
                {showForm ? 'إلغاء' : '+ إضافة قالب'}
              </button>
            </div>
          </div>

          {showForm && (
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 10, marginBottom: 20 }}>
              <h3>{editingProduct ? 'تعديل القالب' : 'إضافة قالب جديد'}</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 15 }}>
                  <div className="form-group"><label>اسم القالب *</label><input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required /></div>
                  <div className="form-group">
                    <label>نظام CMS *</label>
                    <select name="cms" className="form-control" value={formData.cms} onChange={handleChange} required>
                      <option value="">اختر النظام</option>
                      {cmsList.map((cms) => <option key={cms._id} value={cms.name}>{cms.nameAr || cms.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>نوع المشروع *</label>
                    <select name="category" className="form-control" value={formData.category} onChange={handleChange} required>
                      <option value="">اختر النوع</option>
                      {categories.filter(c => c.isActive).map((cat) => <option key={cat._id} value={cat.name}>{cat.nameAr || cat.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label>السعر *</label><input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required /></div>
                  <div className="form-group"><label>رابط المعاينة</label><input type="url" name="demoUrl" className="form-control" value={formData.demoUrl} onChange={handleChange} /></div>
                  <div className="form-group"><label>رابط الصورة</label><input type="text" name="img" className="form-control" value={formData.img} onChange={handleChange} /></div>
                </div>
                <div className="form-group"><label>الوصف</label><textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea></div>
                <div className="form-group"><label>المميزات (كل ميزة في سطر)</label><textarea name="features" className="form-control" rows="3" value={formData.features} onChange={handleChange} placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"></textarea></div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                  <label style={{ margin: 0 }}>نشط</label>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="submit" className="btn-admin btn-success">{editingProduct ? 'تحديث' : 'إضافة'}</button>
                  <button type="button" className="btn-admin btn-danger" onClick={resetForm}>إلغاء</button>
                </div>
              </form>
            </div>
          )}

          {loading ? <p className="text-center">جاري التحميل...</p> : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#666' }}><p>لا توجد قوالب بعد</p></div>
          ) : (
            <>
              {/* شريط التحديد */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15, padding: '10px 15px', background: '#f8f9fa', borderRadius: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', margin: 0 }}>
                  <input type="checkbox" checked={products.length > 0 && selectedItems.length === products.length} onChange={handleSelectAll} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                  <span>تحديد الكل</span>
                </label>
                {selectedItems.length > 0 && <span style={{ color: '#666' }}>({selectedItems.length} من {products.length})</span>}
              </div>

              <table className="admin-table">
                <thead><tr><th style={{ width: 40 }}></th><th>الصورة</th><th>الاسم</th><th>CMS</th><th>النوع</th><th>السعر</th><th>الحالة</th><th>الإجراءات</th></tr></thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} style={{ background: selectedItems.includes(product._id) ? '#e3f2fd' : 'transparent', opacity: product.isActive === false ? 0.6 : 1 }}>
                      <td>
                        <input type="checkbox" checked={selectedItems.includes(product._id)} onChange={() => handleSelectItem(product._id)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                      </td>
                      <td>
                        {product.img ? <img src={product.img} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 5 }} /> : <div style={{ width: 60, height: 45, background: '#eee', borderRadius: 5 }}></div>}
                      </td>
                      <td>{product.title}</td>
                      <td>{product.cms}</td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>
                        <span style={{ padding: '4px 10px', borderRadius: 15, fontSize: 12, background: product.isActive !== false ? '#e8f5e9' : '#ffebee', color: product.isActive !== false ? '#2e7d32' : '#c62828' }}>
                          {product.isActive !== false ? 'نشط' : 'معطل'}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn-admin btn-warning" onClick={() => handleEdit(product)}>تعديل</button>
                          <button className="btn-admin btn-danger" onClick={() => handleDelete(product._id)}>حذف</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default Products;
