import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Async Thunks
export const fetchTemplates = createAsyncThunk('products/fetchTemplates', async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/templates?${params}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const addTemplate = createAsyncThunk('products/addTemplate', async (template) => {
  const res = await fetch('/api/templates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(template),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const updateTemplate = createAsyncThunk('products/updateTemplate', async (template) => {
  const res = await fetch(`/api/templates/${template._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(template),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const deleteTemplate = createAsyncThunk('products/deleteTemplate', async (id) => {
  const res = await fetch(`/api/templates/${id}`, { method: 'DELETE' });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return id;
});

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    specificProduct: null,
    addToCart: typeof window !== 'undefined' && localStorage.getItem('addToCart')
      ? JSON.parse(localStorage.getItem('addToCart'))
      : [],
    wishlist: typeof window !== 'undefined' && localStorage.getItem('addToWishList')
      ? JSON.parse(localStorage.getItem('addToWishList'))
      : [],
  },
  reducers: {
    specificItem: (state, { payload }) => {
      state.specificProduct = state.products.find((p) => p._id === payload);
    },
    addToProduct: (state, { payload }) => {
      const itemIndex = state.addToCart.findIndex((item) => item._id === payload._id);
      if (itemIndex >= 0) {
        state.addToCart[itemIndex].cartQuantity += 1;
      } else {
        state.addToCart.push({ ...payload, cartQuantity: 1 });
      }
      localStorage.setItem('addToCart', JSON.stringify(state.addToCart));
      toast.success('تم الإضافة للسلة');
    },
    removeProduct: (state, { payload }) => {
      state.addToCart = state.addToCart.filter((cart) => cart._id !== payload);
      localStorage.setItem('addToCart', JSON.stringify(state.addToCart));
    },
    clearCart: (state) => {
      state.addToCart = [];
      localStorage.setItem('addToCart', JSON.stringify(state.addToCart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => { state.loading = true; })
      .addCase(fetchTemplates.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(fetchTemplates.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addTemplate.fulfilled, (state, { payload }) => {
        state.products.unshift(payload);
        toast.success('تم إضافة القالب بنجاح');
      })
      .addCase(updateTemplate.fulfilled, (state, { payload }) => {
        const index = state.products.findIndex((p) => p._id === payload._id);
        if (index !== -1) state.products[index] = payload;
        toast.success('تم تحديث القالب بنجاح');
      })
      .addCase(deleteTemplate.fulfilled, (state, { payload }) => {
        state.products = state.products.filter((p) => p._id !== payload);
        toast.success('تم حذف القالب بنجاح');
      });
  },
});

export const { specificItem, addToProduct, removeProduct, clearCart } = productSlice.actions;
export default productSlice.reducer;
