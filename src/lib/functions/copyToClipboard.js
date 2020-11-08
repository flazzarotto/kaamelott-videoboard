/**
 * Copy value to clipboard
 * @param value
 * @param cbFn callback function with value as parameter
 * @returns {Promise<void>}
 */
export async function copyToClipboard(value, cbFn = () => {}) {
    await navigator.clipboard.writeText(value)
    cbFn(value)
}
