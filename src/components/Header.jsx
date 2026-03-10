import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartItemCount } from '../features/cart/model/cartSlice'
import { selectIsAuthenticated } from '../features/auth/model/authSlice'
import styles from './Header.module.css'

function Header() {
  const cartCount = useAppSelector(selectCartItemCount)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          🛍️ ShopReact
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Cart
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            >
              Sign In
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
