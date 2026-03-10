const CART_KEY = 'cart'

// Load cart items from localStorage on app init
export const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem(CART_KEY)
    return serialized ? JSON.parse(serialized) : []
  } catch {
    return []
  }
}

// Persist current cart state to localStorage
export const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {
    // Silently fail — storage quota exceeded or private mode
  }
}
