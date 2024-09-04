/**
 * Debounce function that delays the execution of a function until a certain period of time passes without new calls.
 * @param func - The function to be executed after the debounce.
 * @param wait - The waiting time in milliseconds before executing the function.
 * @returns A debounced function that delays the execution until the waiting time is completed.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
