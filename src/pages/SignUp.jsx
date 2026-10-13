import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Keypad from '../components/Keypad'
import { useAuth } from '../context/AuthContext'
import useDigitInput from '../hooks/useDigitInput'
import { formatPhoneInput } from '../utils/format'
import '../styles/auth.css'

export default function SignUp() {
  const navigate = useNavigate()
  const { requestOtp } = useAuth()
  const { digits, append, remove, inputProps } = useDigitInput(10, formatPhoneInput)
  const [submitted, setSubmitted] = useState(false)

  const isComplete = digits.length === 10
  // Indian mobile numbers start with 6, 7, 8 or 9
  const isValid = isComplete && /^[6-9]/.test(digits)

  let error = ''
  if (isComplete && !isValid) error = 'Enter a valid mobile number starting with 6, 7, 8 or 9.'
  else if (submitted && !isComplete) error = 'Please enter your 10-digit mobile number.'

  // The button stays enabled (as in the design) and explains what is missing instead
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) {
      setSubmitted(true)
      return
    }
    requestOtp(digits)
    navigate('/verify')
  }

  return (
    <form className="screen auth-screen" onSubmit={handleSubmit}>
      <div className="auth-body">
        <BackButton />
        <h1 className="auth-title">Sign Up to Fastor</h1>
        <p className="auth-subtitle">Let us know your mobile number and we will send you an OTP for verification.</p>

        <label className="phone-field">
          <span className="dial-code">+91</span>
          <input
            name="phone"
            placeholder="00000 - 00000"
            autoComplete="tel-national"
            aria-label="Mobile number"
            autoFocus
            {...inputProps}
          />
        </label>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}

        <div className="auth-actions">
          <button type="submit" className="btn-orange">
            Get OTP
          </button>
          <p className="terms">
            By clicking, I accept the <strong>Terms &amp; Conditions</strong> and <strong>Privacy Policy</strong>
          </p>
        </div>
      </div>
      <Keypad onDigit={append} onDelete={remove} />
    </form>
  )
}
