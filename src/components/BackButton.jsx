import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BackButton({ to }) {
  const navigate = useNavigate()

  return (
    <button type="button" className="back-button" onClick={() => (to ? navigate(to) : navigate(-1))} aria-label="Go back">
      <ArrowLeft size={22} />
    </button>
  )
}
