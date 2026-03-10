import { createSlice } from '@reduxjs/toolkit'
import { loadCartFromStorage, saveCartToStorage } from '../../../services/storage/cartStorage'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(), // persist cart across page reloads
  },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      saveCartToStorage(state.items)
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveCartToStorage(state.items)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = Math.max(1, quantity)
        saveCartToStorage(state.items)
      }
    },
    clearCart(state) {
      state.items = []
      saveCartToStorage([])
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

export default cartSlice.reducer
