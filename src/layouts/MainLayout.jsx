import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './MainLayout.module.css'

// Wraps all pages with a shared Header and Footer
function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
