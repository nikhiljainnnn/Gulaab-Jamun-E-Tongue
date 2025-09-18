export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none'
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/30',
    muted: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 focus:ring-gray-500/20',
    ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800',
  }
  return (
    <button
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}


