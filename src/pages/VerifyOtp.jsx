import { Fragment, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Keypad from '../components/Keypad'
import { useAuth } from '../context/AuthContext'
import useDigitInput from '../hooks/useDigitInput'
import { formatPhone } from '../utils/format'
import '../styles/auth.css'

const CODE_LENGTH = 6
const RESEND_SECONDS = 30

export default function VerifyOtp() {
  const navigate = useNavigate()
  const { phone, pendingPhone, verifyOtp } = useAuth()
  const { digits, append, remove, clear, inputProps } = useDigitInput(CODE_LENGTH)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const [focused, setFocused] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef(null)

  // Count down once per second until the code can be resent
  useEffect(() => {
    if (secondsLeft === 0) return
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  // No number waiting for a code: either just verified (go home) or opened directly (start over).
  // This also runs right after Continue, before the navigation to /home finishes.
  if (!pendingPhone) {
    return <Navigate to={phone ? '/home' : '/'} replace />
  }

  const activeIndex = Math.min(digits.length, CODE_LENGTH - 1)
  const isComplete = digits.length === CODE_LENGTH

  // The button stays enabled (as in the design) and explains what is missing instead
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isComplete) {
      setSubmitted(true)
      inputRef.current?.focus()
      return
    }
    verifyOtp()
    navigate('/home', { replace: true })
  }

  const resend = () => {
    clear()
    setSubmitted(false)
    setSecondsLeft(RESEND_SECONDS)
    inputRef.current?.focus()
  }

  return (
    <form className="screen auth-screen" onSubmit={handleSubmit}>
      <div className="auth-body">
        <BackButton to="/" />
        <h1 className="auth-title">6-digit code</h1>
        <p className="auth-subtitle">
          Please enter the code we&apos;ve sent to
          <strong>+91 {formatPhone(pendingPhone)}</strong>
        </p>

        <div className="otp-boxes">
          {Array.from({ length: CODE_LENGTH }, (_, i) => {
            const isActive = focused && i === activeIndex && digits.length < CODE_LENGTH
            return (
              <Fragment key={i}>
                {i === CODE_LENGTH / 2 && <span className="otp-separator">-</span>}
                <span className={`otp-box ${isActive ? 'active' : ''}`}>
                  {digits[i] ?? (isActive && <span className="otp-caret" />)}
                </span>
              </Fragment>
            )
          })}
          {/* Invisible input on top of the boxes: receives typing, paste and SMS autofill */}
          <input
            ref={inputRef}
            className="otp-input"
            autoComplete="one-time-code"
            aria-label="6-digit code"
            autoFocus
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...inputProps}
          />
        </div>
        {submitted && !isComplete && (
          <p className="field-error" role="alert">
            Please enter the 6-digit code.
          </p>
        )}

        <p className="resend-row">
          I didn&apos;t receive a code{' '}
          {secondsLeft > 0 ? (
            <span className="timer">(00:{String(secondsLeft).padStart(2, '0')})</span>
          ) : (
            <button type="button" className="resend-button" onClick={resend}>
              Resend code
            </button>
          )}
        </p>

        <div className="auth-actions">
          <button type="submit" className="btn-orange">
            Continue
          </button>
        </div>
      </div>
      <Keypad onDigit={append} onDelete={remove} />
    </form>
  )
}
