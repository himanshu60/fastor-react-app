import { Delete } from 'lucide-react'

const KEYS = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
]

// Stops the button from taking focus, so the input keeps its caret
const keepFocus = (e) => e.preventDefault()

function DigitKey({ digit, letters, onDigit }) {
  return (
    <button type="button" className="key" onMouseDown={keepFocus} onClick={() => onDigit(digit)} aria-label={digit}>
      <span className="key-digit">{digit}</span>
      <span className="key-letters">{letters || ' '}</span>
    </button>
  )
}

// iOS-style number pad from the design
export default function Keypad({ onDigit, onDelete }) {
  return (
    <div className="keypad" role="group" aria-label="Number keypad">
      {KEYS.map(([digit, letters]) => (
        <DigitKey key={digit} digit={digit} letters={letters} onDigit={onDigit} />
      ))}
      <span aria-hidden="true" />
      <DigitKey digit="0" letters="" onDigit={onDigit} />
      <button type="button" className="key key-delete" onMouseDown={keepFocus} onClick={onDelete} aria-label="Delete">
        <Delete size={26} strokeWidth={1.6} />
      </button>
    </div>
  )
}
