import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectCartItems, selectCartTotal, clearCart } from '../features/cart/model/cartSlice'
import { createOrder } from '../features/orders/model/ordersSlice'
import { selectIsAuthenticated } from '../features/auth/model/authSlice'
import { CartItem } from '../features/cart'
import Button from '../components/Button'
import Modal from '../components/Modal'
import AuthForm from '../features/auth/components/AuthForm'
import styles from './CartPage.module.css'

function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    await dispatch(createOrder({ items, total: total.toFixed(2) }))
    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>🎉</span>
        <h2>Order Placed!</h2>
        <p>Thank you for your purchase. Check your profile for order history.</p>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Shopping Cart</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Items ({items.length})</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span className={styles.free}>Free</span>
          </div>
          <hr className={styles.divider} />
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button onClick={handleCheckout} size="lg">
            Checkout
          </Button>
          <Button variant="secondary" size="sm" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </aside>
      </div>

      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Sign in to Continue"
      >
        <AuthForm onSuccess={() => setAuthModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default CartPage
