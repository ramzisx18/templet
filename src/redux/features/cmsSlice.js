import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchCMS = createAsyncThunk('cms/fetchCMS', async () => {
  const res = await fetch('/api/cms');
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const addCMS = createAsyncThunk('cms/addCMS', async (cms) => {
  const res = await fetch('/api/cms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cms),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const updateCMS = createAsyncThunk('cms/updateCMS', async (cms) => {
  console.log('Sending update request:', cms);
  const res = await fetch(`/api/cms/${cms._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cms),
  });
  const data = await res.json();
  console.log('Update response:', data);
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const deleteCMS = createAsyncThunk('cms/deleteCMS', async (id) => {
  const res = await fetch(`/api/cms/${id}`, { method: 'DELETE' });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return id;
});

export const cmsSlice = createSlice({
  name: 'cms',
  initialState: {
    cmsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCMS.pending, (state) => { state.loading = true; })
      .addCase(fetchCMS.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cmsList = payload;
      })
      .addCase(fetchCMS.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addCMS.fulfilled, (state, { payload }) => {
        state.cmsList.unshift(payload);
        toast.success('تم الإضافة بنجاح');
      })
      .addCase(updateCMS.fulfilled, (state, { payload }) => {
        const index = state.cmsList.findIndex((c) => c._id === payload._id);
        if (index !== -1) state.cmsList[index] = payload;
        toast.success('تم التحديث بنجاح');
      })
      .addCase(deleteCMS.fulfilled, (state, { payload }) => {
        state.cmsList = state.cmsList.filter((c) => c._id !== payload);
        toast.success('تم الحذف بنجاح');
      });
  },
});

export default cmsSlice.reducer;
