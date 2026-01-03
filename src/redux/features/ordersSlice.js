import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const res = await fetch('/api/orders');
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const addOrder = createAsyncThunk('orders/addOrder', async (order) => {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ id, status }) => {
  const res = await fetch(`/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id) => {
  const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return id;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      })
      .addCase(fetchOrders.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addOrder.fulfilled, (state, { payload }) => {
        state.orders.unshift(payload);
        toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        const index = state.orders.findIndex((o) => o._id === payload._id);
        if (index !== -1) state.orders[index] = payload;
        toast.success('تم تحديث حالة الطلب');
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.orders = state.orders.filter((o) => o._id !== payload);
        toast.success('تم حذف الطلب');
      });
  },
});

export default ordersSlice.reducer;
