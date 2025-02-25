export function hexToRgb(hex: string, alpha: string): string | undefined {
  hex = hex.replace(/^#/, '')
  if (hex.length !== 3 && hex.length !== 6) {
    return undefined
  }
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  const bigint = Number.parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
