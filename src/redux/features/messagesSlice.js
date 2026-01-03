import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const res = await fetch('/api/messages');
  return res.json();
});

export const updateMessageStatus = createAsyncThunk('messages/updateStatus', async ({ id, status }) => {
  const res = await fetch(`/api/messages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
});

export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (id) => {
  await fetch(`/api/messages/${id}`, { method: 'DELETE' });
  return id;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => { state.loading = true; })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        const idx = state.messages.findIndex((m) => m._id === action.payload._id);
        if (idx !== -1) state.messages[idx] = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((m) => m._id !== action.payload);
      });
  },
});

export default messagesSlice.reducer;
