export const generateReference = (lastReference: string | null): string => {
  if (!lastReference) return 'PKG-001'
  const lastNumber = parseInt(lastReference.replace('PKG-', ''))
  return `PKG-${String(lastNumber + 1).padStart(3, '0')}`
}