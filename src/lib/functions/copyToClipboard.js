export async function copyToClipboard(value, cbFn = () => {}) {
    await navigator.clipboard.writeText(value)
    cbFn(value)
}
