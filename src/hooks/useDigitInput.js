import { useState } from 'react'

// Digits-only input driven by the on-screen keypad, a physical keyboard or paste.
// `format` turns the digits into what the input shows (e.g. "12345 - 67890").
export default function useDigitInput(maxLength, format = (digits) => digits) {
  const [digits, setDigits] = useState('')
  const value = format(digits)

  const append = (digit) => setDigits((d) => (d.length < maxLength ? d + digit : d))
  const remove = () => setDigits((d) => d.slice(0, -1))
  const clear = () => setDigits('')

  // Handle keys ourselves so Backspace never gets stuck on the formatting characters
  const onKeyDown = (e) => {
    if (/^\d$/.test(e.key)) {
      e.preventDefault()
      append(e.key)
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      remove()
    }
  }

  // Fallback for soft keyboards that don't send key names (and for paste/autofill)
  const onChange = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, maxLength)
    const deletedFormatting = next === digits && e.target.value.length < value.length
    setDigits(deletedFormatting ? digits.slice(0, -1) : next)
  }

  return {
    digits,
    value,
    append,
    remove,
    clear,
    // inputMode "none": our keypad replaces the phone's keyboard, like in the design
    inputProps: { value, onKeyDown, onChange, inputMode: 'none' },
  }
}
