import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setFilter, selectFilters } from '../features/products/model/productsSlice'
import { ProductList } from '../features/products'
import styles from './HomePage.module.css'

const CATEGORIES = ['', 'electronics', 'jewelery', "men's clothing", "women's clothing"]

function HomePage() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectFilters)

  const handleSearch = (e) => {
    // Search filters client-side — no API call needed per keystroke
    dispatch(setFilter({ search: e.target.value }))
  }

  const handleCategory = (category) => {
    // Category change triggers a new API fetch via the useEffect in ProductList
    dispatch(setFilter({ category, search: '' }))
  }

  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Discover Our Collection</h1>
        <p className={styles.sub}>Quality products, curated for you.</p>
        <input
          type="search"
          placeholder="Search products…"
          className={styles.search}
          value={filters.search}
          onChange={handleSearch}
        />
      </section>

      <div className={styles.filters}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat || 'all'}
            className={filters.category === cat ? styles.activeFilter : styles.filterBtn}
            onClick={() => handleCategory(cat)}
          >
            {cat || 'All'}
          </button>
        ))}
      </div>

      <ProductList />
    </div>
  )
}

export default HomePage
