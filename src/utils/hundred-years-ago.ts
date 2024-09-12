export function hundredYearsAgo(): Date {
  const today = new Date()
  const hundredYearsBack = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
  return hundredYearsBack
}
