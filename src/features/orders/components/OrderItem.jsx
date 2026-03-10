import styles from './OrderItem.module.css'

// Displays a single order summary card
function OrderItem({ order }) {
  const statusClass = {
    pending: styles.pending,
    delivered: styles.delivered,
    cancelled: styles.cancelled,
  }[order.status] || styles.pending

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>Order #{order.id}</span>
        <span className={`${styles.status} ${statusClass}`}>{order.status}</span>
      </div>
      <ul className={styles.products}>
        {order.items?.map((item) => (
          <li key={item.id} className={styles.product}>
            <span>{item.title}</span>
            <span>×{item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <span className={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</span>
        <span className={styles.total}>${order.total?.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default OrderItem
