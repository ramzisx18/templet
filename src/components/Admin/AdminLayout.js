import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminLogout, checkAdminAuth } from '../../redux/features/adminSlice';

const AdminLayout = ({ children, pageTitle }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, adminUser } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(checkAdminAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(adminLogout());
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return <div className="admin-loading">جاري التحميل...</div>;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>لوحة الإدارة</h3>
        </div>
        <nav className="sidebar-nav">
          <Link href="/admin/dashboard">
            <a className={router.pathname === '/admin/dashboard' ? 'active' : ''}>
              <i className="fas fa-home"></i> الرئيسية
            </a>
          </Link>
          <Link href="/admin/orders">
            <a className={router.pathname === '/admin/orders' ? 'active' : ''}>
              <i className="fas fa-clipboard-list"></i> الطلبات
            </a>
          </Link>
          <Link href="/admin/messages">
            <a className={router.pathname === '/admin/messages' ? 'active' : ''}>
              <i className="fas fa-envelope"></i> الرسائل
            </a>
          </Link>
          <Link href="/admin/products">
            <a className={router.pathname === '/admin/products' ? 'active' : ''}>
              <i className="fas fa-palette"></i> القوالب
            </a>
          </Link>
          <Link href="/admin/categories">
            <a className={router.pathname === '/admin/categories' ? 'active' : ''}>
              <i className="fas fa-folder"></i> أنواع المشاريع
            </a>
          </Link>
          <Link href="/admin/cms">
            <a className={router.pathname === '/admin/cms' ? 'active' : ''}>
              <i className="fas fa-laptop-code"></i> أنظمة CMS
            </a>
          </Link>
          <Link href="/admin/settings">
            <a className={router.pathname === '/admin/settings' ? 'active' : ''}>
              <i className="fas fa-cog"></i> الإعدادات
            </a>
          </Link>
          <hr />
          <Link href="/">
            <a target="_blank">
              <i className="fas fa-external-link-alt"></i> عرض الموقع
            </a>
          </Link>
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h1>{pageTitle}</h1>
          <div className="header-actions">
            <span className="admin-user">مرحباً، {adminUser?.name || 'Admin'}</span>
            <button onClick={handleLogout} className="btn-logout">
              تسجيل الخروج
            </button>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap');
        
        .admin-layout {
          display: flex;
          min-height: 100vh;
          direction: rtl;
          font-family: 'Tajawal', 'Segoe UI', Tahoma, sans-serif;
        }
        .admin-layout * {
          font-family: 'Tajawal', 'Segoe UI', Tahoma, sans-serif;
        }
        .admin-sidebar {
          width: 250px;
          background: #1a1a2e;
          color: white;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }
        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #333;
          text-align: center;
        }
        .sidebar-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 700;
        }
        .sidebar-nav {
          padding: 20px 0;
        }
        .sidebar-nav a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          color: #aaa;
          text-decoration: none;
          transition: all 0.3s;
          font-weight: 500;
        }
        .sidebar-nav a:hover,
        .sidebar-nav a.active {
          background: #16213e;
          color: white;
          border-right: 3px solid #667eea;
        }
        .sidebar-nav hr {
          border-color: #333;
          margin: 20px;
        }
        .admin-main {
          flex: 1;
          margin-right: 250px;
          background: #f5f6fa;
        }
        .admin-header {
          background: white;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        .admin-header h1 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
          font-weight: 700;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .admin-user {
          color: #666;
          font-weight: 500;
        }
        .btn-logout {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
          font-family: 'Tajawal', sans-serif;
          font-weight: 600;
        }
        .btn-logout:hover {
          background: #c0392b;
        }
        .admin-content {
          padding: 30px;
        }
        .admin-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-size: 1.2rem;
          font-family: 'Tajawal', sans-serif;
        }
        .admin-card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }
        .admin-card h2 {
          margin-top: 0;
          color: #333;
          font-size: 1.2rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        .stat-card h3 {
          margin: 0 0 10px;
          font-size: 2rem;
          color: #667eea;
          font-weight: 700;
        }
        .stat-card p {
          margin: 0;
          color: #666;
          font-weight: 500;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th,
        .admin-table td {
          padding: 12px;
          text-align: right;
          border-bottom: 1px solid #eee;
        }
        .admin-table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #333;
        }
        .admin-table tr:hover {
          background: #f8f9fa;
        }
        .btn-admin {
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s;
          font-family: 'Tajawal', sans-serif;
          font-weight: 600;
        }
        .btn-primary {
          background: #667eea;
          color: white;
        }
        .btn-primary:hover {
          background: #5a6fd6;
        }
        .btn-success {
          background: #27ae60;
          color: white;
        }
        .btn-success:hover {
          background: #219a52;
        }
        .btn-danger {
          background: #e74c3c;
          color: white;
        }
        .btn-danger:hover {
          background: #c0392b;
        }
        .btn-warning {
          background: #f39c12;
          color: white;
        }
        .btn-warning:hover {
          background: #d68910;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }
        .form-control {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s;
          font-family: 'Tajawal', sans-serif;
        }
        .form-control:focus {
          outline: none;
          border-color: #667eea;
        }
        .actions-cell {
          display: flex;
          gap: 8px;
        }
        .product-img-small {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 5px;
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 60px;
          }
          .sidebar-header h3,
          .sidebar-nav a span {
            display: none;
          }
          .admin-main {
            margin-right: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
