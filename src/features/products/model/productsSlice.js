import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProductsApi, fetchProductByIdApi } from '../api/productsApi'

// Async thunk — fetch products (all or by category) from API.
// Search is applied client-side after fetching because Fake Store API
// does not support server-side full-text search.
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      return await fetchProductsApi(params)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

// Async thunk — fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchProductByIdApi(id)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    // allItems holds the full API response for the current category
    // so client-side search can filter without extra network requests
    allItems: [],
    selectedProduct: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filters: {
      category: '',
      search: '',
    },
  },
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allItems = action.payload.products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { setFilter, clearSelectedProduct } = productsSlice.actions

// Raw selectors
export const selectAllItems = (state) => state.products.allItems
export const selectSelectedProduct = (state) => state.products.selectedProduct
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error
export const selectFilters = (state) => state.products.filters

// Derived selector — applies client-side search on top of the fetched list
export const selectFilteredProducts = (state) => {
  const { allItems, filters } = state.products
  const query = filters.search.trim().toLowerCase()
  if (!query) return allItems
  return allItems.filter((p) =>
    p.title.toLowerCase().includes(query) ||
    p.description?.toLowerCase().includes(query),
  )
}

export default productsSlice.reducer
