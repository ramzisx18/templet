import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuthenticated: false,
    adminUser: null,
  },
  reducers: {
    adminLogin: (state, { payload }) => {
      // بيانات الأدمن الافتراضية - يمكنك تغييرها
      if (payload.email === 'admin@admin.com' && payload.password === 'admin123') {
        state.isAuthenticated = true;
        state.adminUser = { email: payload.email, name: 'Admin' };
        if (typeof window !== 'undefined') {
          localStorage.setItem('adminAuth', JSON.stringify({ isAuthenticated: true, adminUser: state.adminUser }));
        }
      }
    },
    adminLogout: (state) => {
      state.isAuthenticated = false;
      state.adminUser = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminAuth');
      }
    },
    checkAdminAuth: (state) => {
      if (typeof window !== 'undefined') {
        const auth = localStorage.getItem('adminAuth');
        if (auth) {
          const parsed = JSON.parse(auth);
          state.isAuthenticated = parsed.isAuthenticated;
          state.adminUser = parsed.adminUser;
        }
      }
    },
  },
});

export const { adminLogin, adminLogout, checkAdminAuth } = adminSlice.actions;
export default adminSlice.reducer;
