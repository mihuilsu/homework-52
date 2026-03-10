import { useAppDispatch } from '../../../app/hooks'
import { removeFromCart, updateQuantity } from '../model/cartSlice'
import Button from '../../../components/Button'
import styles from './CartItem.module.css'

function CartItem({ item }) {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.item}>
      <img
        src={item.image || 'https://placehold.co/80x80?text=Item'}
        alt={item.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>${item.price}</p>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.qtyBtn}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <p className={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</p>
      <Button
        variant="danger"
        size="sm"
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label="Remove from cart"
      >
        Remove
      </Button>
    </div>
  )
}

export default CartItem
