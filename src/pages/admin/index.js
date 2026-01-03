import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { adminLogin, checkAdminAuth } from '../../redux/features/adminSlice';
import SEO from '../../components/seo';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(checkAdminAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@admin.com' && password === 'admin123') {
      dispatch(adminLogin({ email, password }));
      router.push('/admin/dashboard');
    } else {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <>
      <SEO pageTitle="تسجيل دخول الأدمن" />
      <div className="admin-login-wrapper">
        <div className="admin-login-box">
          <h2>لوحة الإدارة</h2>
          <p>قم بتسجيل الدخول للوصول للوحة التحكم</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@admin.com"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>كلمة المرور</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              تسجيل الدخول
            </button>
          </form>
          <div className="mt-3 text-muted small">
            <strong>بيانات الدخول الافتراضية:</strong><br />
            البريد: admin@admin.com<br />
            كلمة المرور: admin123
          </div>
        </div>
      </div>
      <style jsx>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          direction: rtl;
        }
        .admin-login-box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
        }
        .admin-login-box h2 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
        }
        .admin-login-box p {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
