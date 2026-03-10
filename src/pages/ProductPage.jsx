import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchProductById,
  selectSelectedProduct,
  selectProductsStatus,
  clearSelectedProduct,
} from '../features/products/model/productsSlice'
import { addToCart } from '../features/cart/model/cartSlice'
import Button from '../components/Button'
import styles from './ProductPage.module.css'

function ProductPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const product = useAppSelector(selectSelectedProduct)
  const status = useAppSelector(selectProductsStatus)

  useEffect(() => {
    dispatch(fetchProductById(id))
    return () => dispatch(clearSelectedProduct())
  }, [dispatch, id])

  if (status === 'loading') return <p className={styles.state}>Loading…</p>
  if (!product) return <p className={styles.state}>Product not found.</p>

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className={styles.inner}>
        <img
          src={product.image || 'https://placehold.co/400x400?text=Product'}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.row}>
            <span className={styles.price}>${product.price}</span>
            {product.rating && (
              <span className={styles.rating}>
                ★ {product.rating.rate} ({product.rating.count} reviews)
              </span>
            )}
          </div>
          <Button size="lg" onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
