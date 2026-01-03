import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import AdminLayout from '../../components/Admin/AdminLayout';
import SEO from '../../components/seo';
import { fetchTemplates } from '../../redux/features/productSlice';
import { fetchCategories } from '../../redux/features/categorySlice';
import { fetchCMS } from '../../redux/features/cmsSlice';
import { fetchOrders } from '../../redux/features/ordersSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { cmsList } = useSelector((state) => state.cms);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchTemplates());
    dispatch(fetchCategories());
    dispatch(fetchCMS());
    dispatch(fetchOrders());
  }, [dispatch]);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <>
      <SEO pageTitle="لوحة التحكم" />
      <AdminLayout pageTitle="لوحة التحكم">
        <div className="stats-grid">
          <Link href="/admin/orders"><a className="stat-card" style={{ textDecoration: 'none', position: 'relative' }}>
            <h3>{orders.length}</h3><p>الطلبات</p>
            {pendingOrders > 0 && <span style={{ position: 'absolute', top: 10, left: 10, background: '#e74c3c', color: 'white', padding: '2px 8px', borderRadius: 10, fontSize: 12 }}>{pendingOrders} جديد</span>}
          </a></Link>
          <Link href="/admin/products"><a className="stat-card" style={{ textDecoration: 'none' }}><h3>{products.length}</h3><p>القوالب</p></a></Link>
          <Link href="/admin/categories"><a className="stat-card" style={{ textDecoration: 'none' }}><h3>{categories.length}</h3><p>أنواع المشاريع</p></a></Link>
          <Link href="/admin/cms"><a className="stat-card" style={{ textDecoration: 'none' }}><h3>{cmsList.length}</h3><p>أنظمة CMS</p></a></Link>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>آخر الطلبات</h2>
            <Link href="/admin/orders"><a style={{ color: '#667eea', fontSize: 14 }}>عرض الكل</a></Link>
          </div>
          {orders.length === 0 ? <p style={{ color: '#666', textAlign: 'center', padding: 20 }}>لا توجد طلبات بعد</p> : (
            <table className="admin-table">
              <thead><tr><th>الاسم</th><th>البريد</th><th>نوع المشروع</th><th>الحالة</th></tr></thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>{order.name}</td><td>{order.email}</td><td>{order.projectType}</td>
                    <td><span style={{ padding: '4px 10px', borderRadius: 15, fontSize: 12, background: order.status === 'pending' ? '#fff3cd' : order.status === 'completed' ? '#d4edda' : '#e2e3e5', color: order.status === 'pending' ? '#856404' : order.status === 'completed' ? '#155724' : '#383d41' }}>{order.status === 'pending' ? 'قيد الانتظار' : order.status === 'completed' ? 'مكتمل' : order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
