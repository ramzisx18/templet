import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout';
import SEO from '../../components/seo';
import { fetchMessages, updateMessageStatus, deleteMessage } from '../../redux/features/messagesSlice';
import Swal from 'sweetalert2';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.messages);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => { dispatch(fetchMessages()); }, [dispatch]);

  const handleStatusChange = (id, status) => dispatch(updateMessageStatus({ id, status }));

  const handleDelete = (id) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'سيتم حذف هذه الرسالة نهائياً',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'نعم، احذف!',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMessage(id));
        setSelectedMessage(null);
      }
    });
  };

  const openMessage = (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      dispatch(updateMessageStatus({ id: msg._id, status: 'read' }));
    }
  };

  const getStatusColor = (status) => {
    const colors = { unread: '#e74c3c', read: '#3498db', replied: '#27ae60' };
    return colors[status] || '#95a5a6';
  };

  const getStatusText = (status) => {
    const texts = { unread: 'غير مقروءة', read: 'مقروءة', replied: 'تم الرد' };
    return texts[status] || status;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <>
      <SEO pageTitle="الرسائل" />
      <AdminLayout pageTitle="رسائل التواصل">
        <div className="stats-grid" style={{ marginBottom: 30 }}>
          <div className="stat-card">
            <h3>{messages.length}</h3>
            <p>إجمالي الرسائل</p>
          </div>
          <div className="stat-card">
            <h3 style={{ color: '#e74c3c' }}>{unreadCount}</h3>
            <p>غير مقروءة</p>
          </div>
          <div className="stat-card">
            <h3 style={{ color: '#3498db' }}>{messages.filter(m => m.status === 'read').length}</h3>
            <p>مقروءة</p>
          </div>
          <div className="stat-card">
            <h3 style={{ color: '#27ae60' }}>{messages.filter(m => m.status === 'replied').length}</h3>
            <p>تم الرد</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: 20 }}>
          <div className="admin-card">
            <h2>صندوق الوارد</h2>
            {loading ? (
              <p style={{ textAlign: 'center', padding: 40 }}>جاري التحميل...</p>
            ) : messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>
                <i className="fas fa-inbox" style={{ fontSize: 48, marginBottom: 15, opacity: 0.3 }}></i>
                <p>لا توجد رسائل بعد</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => openMessage(msg)}
                    style={{
                      padding: 15,
                      background: selectedMessage?._id === msg._id ? '#f0f4ff' : msg.status === 'unread' ? '#fff9f9' : '#f8f9fa',
                      borderRadius: 8,
                      cursor: 'pointer',
                      borderRight: `4px solid ${getStatusColor(msg.status)}`,
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <strong style={{ fontWeight: msg.status === 'unread' ? 700 : 500 }}>{msg.name}</strong>
                      <span style={{ fontSize: 12, color: '#999' }}>{formatDate(msg.createdAt)}</span>
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: 14,
                      color: '#666',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedMessage && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>تفاصيل الرسالة</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#999' }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 20, fontWeight: 600
                  }}>
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{selectedMessage.name}</h3>
                    <span style={{
                      padding: '3px 10px', borderRadius: 10, fontSize: 11,
                      background: `${getStatusColor(selectedMessage.status)}20`,
                      color: getStatusColor(selectedMessage.status)
                    }}>
                      {getStatusText(selectedMessage.status)}
                    </span>
                  </div>
                </div>

                <div style={{ background: '#f8f9fa', padding: 15, borderRadius: 8, marginBottom: 15 }}>
                  <div style={{ marginBottom: 10 }}>
                    <i className="fas fa-envelope" style={{ width: 25, color: '#667eea' }}></i>
                    <a href={`mailto:${selectedMessage.email}`} style={{ color: '#333' }}>{selectedMessage.email}</a>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <i className="fas fa-phone" style={{ width: 25, color: '#667eea' }}></i>
                      <a href={`tel:${selectedMessage.phone}`} style={{ color: '#333' }}>{selectedMessage.phone}</a>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>الرسالة:</label>
                  <div style={{
                    background: 'white', padding: 15, borderRadius: 8,
                    border: '1px solid #eee', lineHeight: 1.8
                  }}>
                    {selectedMessage.message}
                  </div>
                </div>

                <div style={{ fontSize: 13, color: '#999' }}>
                  <i className="fas fa-clock" style={{ marginLeft: 5 }}></i>
                  {formatDate(selectedMessage.createdAt)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, paddingTop: 15, borderTop: '1px solid #eee' }}>
                <select
                  value={selectedMessage.status}
                  onChange={(e) => {
                    handleStatusChange(selectedMessage._id, e.target.value);
                    setSelectedMessage({ ...selectedMessage, status: e.target.value });
                  }}
                  className="form-control"
                  style={{ width: 'auto' }}
                >
                  <option value="unread">غير مقروءة</option>
                  <option value="read">مقروءة</option>
                  <option value="replied">تم الرد</option>
                </select>
                <a
                  href={`mailto:${selectedMessage.email}?subject=رد على رسالتك`}
                  className="btn-admin btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fas fa-reply" style={{ marginLeft: 5 }}></i>
                  رد بالإيميل
                </a>
                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-admin btn-success"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="fab fa-whatsapp" style={{ marginLeft: 5 }}></i>
                    واتساب
                  </a>
                )}
                <button className="btn-admin btn-danger" onClick={() => handleDelete(selectedMessage._id)}>
                  <i className="fas fa-trash" style={{ marginLeft: 5 }}></i>
                  حذف
                </button>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default MessagesPage;
