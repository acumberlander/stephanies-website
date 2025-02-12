import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productsReducer from "./slices/productsSlice";
import ordersReducer from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});
