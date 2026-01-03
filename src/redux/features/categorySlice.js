import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const res = await fetch('/api/categories');
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category) => {
  const res = await fetch(`/api/categories/${category._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return id;
});

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(fetchCategories.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.categories.unshift(payload);
        toast.success('تم إضافة التصنيف بنجاح');
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const index = state.categories.findIndex((c) => c._id === payload._id);
        if (index !== -1) state.categories[index] = payload;
        toast.success('تم تحديث التصنيف بنجاح');
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.categories = state.categories.filter((c) => c._id !== payload);
        toast.success('تم حذف التصنيف بنجاح');
      });
  },
});

export default categorySlice.reducer;
