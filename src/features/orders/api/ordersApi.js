import api from '../../../services/api/baseApi'

// Get all orders for the currently authenticated user
export const fetchOrdersApi = async () => {
  const response = await api.get('/orders')
  return response.data
}

// Create a new order from the given payload
export const createOrderApi = async (orderData) => {
  const response = await api.post('/orders', orderData)
  return response.data
}
