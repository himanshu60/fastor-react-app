import { useEffect } from 'react'
import { CircleCheck } from 'lucide-react'

// message: string or null. onClose must be a stable function.
export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div className="toast" role="status">
      <CircleCheck size={18} />
      {message}
    </div>
  )
}
