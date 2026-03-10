import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/model/productsSlice'
import cartReducer from '../features/cart/model/cartSlice'
import authReducer from '../features/auth/model/authSlice'
import ordersReducer from '../features/orders/model/ordersSlice'

// Central Redux store — combines all feature slices
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
})

export default store
