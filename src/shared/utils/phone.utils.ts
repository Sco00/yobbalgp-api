import phoneLibrary from 'google-libphonenumber'

const phoneUtil = phoneLibrary.PhoneNumberUtil.getInstance()

export function validatePhoneNumber(phone: string): boolean {
  try {
    const parsed = phoneUtil.parse(phone)
    return phoneUtil.isValidNumber(parsed)
  } catch {
    return false
  }
}
