import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'

const PHONE_KEY = 'fastor_phone'
const PENDING_KEY = 'fastor_pending_phone'

export default function AuthProvider({ children }) {
  // Logged-in number survives reloads; the number waiting for its OTP lasts for the tab
  const [phone, setPhone] = useState(() => localStorage.getItem(PHONE_KEY))
  const [pendingPhone, setPendingPhone] = useState(() => sessionStorage.getItem(PENDING_KEY))

  const requestOtp = useCallback((number) => {
    sessionStorage.setItem(PENDING_KEY, number)
    setPendingPhone(number)
  }, [])

  // Front-end demo: there is no OTP service, so any 6-digit code is accepted
  const verifyOtp = useCallback(() => {
    localStorage.setItem(PHONE_KEY, pendingPhone)
    sessionStorage.removeItem(PENDING_KEY)
    setPhone(pendingPhone)
    setPendingPhone(null)
  }, [pendingPhone])

  const value = useMemo(() => ({ phone, pendingPhone, requestOtp, verifyOtp }), [phone, pendingPhone, requestOtp, verifyOtp])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
