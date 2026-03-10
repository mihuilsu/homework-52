import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  selectFilters,
} from '../model/productsSlice'
import { addToCart } from '../../cart/model/cartSlice'
import Button from '../../../components/Button'
import styles from './ProductList.module.css'

function ProductList() {
  const dispatch = useAppDispatch()
  // selectFilteredProducts applies client-side search on top of the fetched list
  const products = useAppSelector(selectFilteredProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)
  const filters = useAppSelector(selectFilters)

  // Re-fetch from API only when the category changes.
  // Search is handled client-side so no extra request is needed per keystroke.
  useEffect(() => {
    dispatch(fetchProducts({ category: filters.category }))
  }, [dispatch, filters.category])

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }))
  }

  if (status === 'loading') return <p className={styles.state}>Loading products…</p>
  if (status === 'failed') return <p className={styles.stateError}>Error: {error}</p>
  if (!products.length) return <p className={styles.state}>No products found.</p>

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <article key={product.id} className={styles.card}>
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image || 'https://placehold.co/300x200?text=Product'}
              alt={product.title}
              className={styles.image}
            />
          </Link>
          <div className={styles.body}>
            <Link to={`/products/${product.id}`}>
              <h3 className={styles.title}>{product.title}</h3>
            </Link>
            <p className={styles.category}>{product.category}</p>
            <div className={styles.footer}>
              <span className={styles.price}>${product.price}</span>
              <Button size="sm" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProductList
