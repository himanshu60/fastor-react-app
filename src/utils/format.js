export const formatPrice = (amount) => `₹${amount.toFixed(2)}`

// "9876543210" -> "98765 43210"
export const formatPhone = (digits) => (digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits)

// Same, with the dash used inside the phone input: "98765 - 43210"
export const formatPhoneInput = (digits) =>
  digits.length > 5 ? `${digits.slice(0, 5)} - ${digits.slice(5)}` : digits
