import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} ShopReact. Built with React + Redux Toolkit.
        </p>
        <p className={styles.author}>
          by{' '}
          <a
            href="https://github.com/mihuilsu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.authorLink}
          >
            mihuilsu
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
