import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrdersApi, createOrderApi } from '../api/ordersApi'

// Async thunk — load all orders for the authenticated user
export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOrdersApi()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

// Async thunk — place a new order from cart contents
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, { rejectWithValue }) => {
    try {
      return await createOrderApi(orderData)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // createOrder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
  },
})

// Selectors
export const selectOrders = (state) => state.orders.items
export const selectOrdersStatus = (state) => state.orders.status
export const selectOrdersError = (state) => state.orders.error

export default ordersSlice.reducer
