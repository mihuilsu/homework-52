import styles from './Button.module.css'

// Reusable button with variant and size support
function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
}) {
  const classes = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

export default Button
