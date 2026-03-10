// Public API — export only what other modules need
export { default as ProductList } from './components/ProductList'
export {
  fetchProducts,
  fetchProductById,
  setFilter,
  clearSelectedProduct,
  selectAllItems,
  selectFilteredProducts,
  selectSelectedProduct,
  selectProductsStatus,
  selectProductsError,
  selectFilters,
} from './model/productsSlice'
