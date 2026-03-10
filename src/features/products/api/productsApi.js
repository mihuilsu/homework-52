import api from '../../../services/api/baseApi'

// Fetch all products, optionally filtered by category.
// Fake Store API supports /products/category/:name but not query-based search,
// so client-side search filtering is applied in the slice after fetching.
export const fetchProductsApi = async ({ category = '' } = {}) => {
  const url = category ? `/products/category/${encodeURIComponent(category)}` : '/products'
  const response = await api.get(url)
  return {
    products: response.data,
    total: response.data.length,
  }
}

// Fetch a single product by ID
export const fetchProductByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}
