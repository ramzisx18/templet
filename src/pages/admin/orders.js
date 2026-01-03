import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout';
import SEO from '../../components/seo';
import { fetchOrders, updateOrderStatus, deleteOrder } from '../../redux/features/ordersSlice';
import Swal from 'sweetalert2';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  const handleStatusChange = (id, status) => dispatch(updateOrderStatus({ id, status }));

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟', icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#e74c3c', cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذف!', cancelButtonText: 'إلغاء',
    }).then((result) => { if (result.isConfirmed) dispatch(deleteOrder(id)); });
  };

  const getStatusColor = (status) => {
    const colors = { pending: '#f39c12', contacted: '#3498db', in_progress: '#9b59b6', completed: '#27ae60', cancelled: '#e74c3c' };
    return colors[status] || '#95a5a6';
  };

  const getStatusText = (status) => {
    const texts = { pending: 'قيد الانتظار', contacted: 'تم التواصل', in_progress: 'قيد التنفيذ', completed: 'مكتمل', cancelled: 'ملغي' };
    return texts[status] || status;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <>
      <SEO pageTitle="الطلبات" />
      <AdminLayout pageTitle="طلبات إنشاء المواقع">
        <div className="stats-grid" style={{ marginBottom: 30 }}>
          <div className="stat-card"><h3>{orders.length}</h3><p>إجمالي الطلبات</p></div>
          <div className="stat-card"><h3>{orders.filter(o => o.status === 'pending').length}</h3><p>قيد الانتظار</p></div>
          <div className="stat-card"><h3>{orders.filter(o => o.status === 'in_progress').length}</h3><p>قيد التنفيذ</p></div>
          <div className="stat-card"><h3>{orders.filter(o => o.status === 'completed').length}</h3><p>مكتمل</p></div>
        </div>

        <div className="admin-card">
          <h2>جميع الطلبات</h2>
          {loading ? <p className="text-center">جاري التحميل...</p> : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#666' }}><p>لا توجد طلبات بعد</p></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {orders.map((order) => (
                <div key={order._id} style={{ background: '#f8f9fa', borderRadius: 10, padding: 20, borderRight: '4px solid #667eea' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                    <div><h4 style={{ margin: '0 0 5px' }}>{order.name}</h4><span style={{ fontSize: 13, color: '#666' }}>{formatDate(order.createdAt)}</span></div>
                    <span style={{ padding: '5px 12px', borderRadius: 15, fontSize: 12, fontWeight: 600, background: `${getStatusColor(order.status)}20`, color: getStatusColor(order.status) }}>{getStatusText(order.status)}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 15 }}>
                    <div><i className="fas fa-envelope" style={{ width: 20, color: '#667eea' }}></i> {order.email}</div>
                    <div><i className="fas fa-phone" style={{ width: 20, color: '#667eea' }}></i> {order.phone}</div>
                    <div><i className="fas fa-laptop-code" style={{ width: 20, color: '#667eea' }}></i> {order.cms}</div>
                    <div><i className="fas fa-folder" style={{ width: 20, color: '#667eea' }}></i> {order.projectType}</div>
                  </div>
                  {order.message && <p style={{ margin: '10px 0', padding: 10, background: 'white', borderRadius: 5, fontSize: 14 }}>{order.message}</p>}
                  <div style={{ display: 'flex', gap: 10, paddingTop: 15, borderTop: '1px solid #e0e0e0' }}>
                    <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="form-control" style={{ width: 'auto' }}>
                      <option value="pending">قيد الانتظار</option>
                      <option value="contacted">تم التواصل</option>
                      <option value="in_progress">قيد التنفيذ</option>
                      <option value="completed">مكتمل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                    <button className="btn-admin btn-danger" onClick={() => handleDelete(order._id)}>حذف</button>
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

export default OrdersPage;
