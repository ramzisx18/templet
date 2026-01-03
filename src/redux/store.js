import { configureStore } from '@reduxjs/toolkit';
import productSlice from './features/productSlice';
import adminSlice from './features/adminSlice';
import categorySlice from './features/categorySlice';
import cmsSlice from './features/cmsSlice';
import ordersSlice from './features/ordersSlice';
import messagesSlice from './features/messagesSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
    admin: adminSlice,
    categories: categorySlice,
    cms: cmsSlice,
    orders: ordersSlice,
    messages: messagesSlice,
  },
});
