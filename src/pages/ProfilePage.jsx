import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectCurrentUser, selectIsAuthenticated, logout } from '../features/auth/model/authSlice'
import { fetchOrders, selectOrders } from '../features/orders/model/ordersSlice'
import { OrderItem } from '../features/orders'
import AuthForm from '../features/auth/components/AuthForm'
import Button from '../components/Button'
import styles from './ProfilePage.module.css'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const orders = useAppSelector(selectOrders)
  const [tab, setTab] = useState('orders')

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchOrders())
  }, [dispatch, isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className={styles.authWrap}>
        <h1 className={styles.heading}>Sign In</h1>
        <p className={styles.sub}>Sign in to access your profile and order history.</p>
        <div className={styles.formWrap}>
          <AuthForm />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase() || '?'}</div>
        <div>
          <h1 className={styles.name}>{user?.name || 'User'}</h1>
          <p className={styles.email}>{user?.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => dispatch(logout())}>
          Sign Out
        </Button>
      </div>

      <div className={styles.tabs}>
        <button
          className={tab === 'orders' ? styles.activeTab : styles.tab}
          onClick={() => setTab('orders')}
        >
          Order History
        </button>
      </div>

      {tab === 'orders' && (
        <div className={styles.orders}>
          {!orders.length ? (
            <p className={styles.empty}>No orders yet. Start shopping!</p>
          ) : (
            orders.map((order) => <OrderItem key={order.id} order={order} />)
          )}
        </div>
      )}
    </div>
  )
}

export default ProfilePage
