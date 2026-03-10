/**
 * Format a number as a USD currency string.
 * @param {number} amount
 * @returns {string} e.g. "$12.99"
 */
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

/**
 * Truncate a string to maxLength, appending "…" if needed.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (str, maxLength = 80) =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str

/**
 * Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : '')
