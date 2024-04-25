export const validateAmount = (input: string) => {
  if (!input) {
    return false
  }
  return !isNaN(Number(input))
}
