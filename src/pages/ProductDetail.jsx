import { useCallback, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import Toast from '../components/Toast'
import { getProduct } from '../data/menu'
import { formatPrice } from '../utils/format'
import '../styles/product.css'

const MAX_QUANTITY = 20

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [quantity, setQuantity] = useState(1)
  const [optionIndex, setOptionIndex] = useState(0)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  const product = getProduct(id)
  if (!product) {
    return <Navigate to="/home" replace />
  }

  const optionPrice = product.options?.[optionIndex].price ?? 0
  const total = (product.price + optionPrice) * quantity

  // Opened from a shared link there is no history to go back to
  const goBack = () => (location.key === 'default' ? navigate('/home') : navigate(-1))

  const addToCart = () => setToast(`${quantity} × ${product.name} added to cart (${formatPrice(total)})`)

  return (
    <div className="screen product">
      <div className="product-hero">
        <img src={product.image} alt={product.name} />
        <button type="button" className="product-back" onClick={goBack} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="price-row">
        <span className="product-price">{formatPrice(total)}</span>
        <div className="stepper" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQuantity((q) => q - 1)} disabled={quantity === 1} aria-label="Decrease quantity">
            <Minus size={15} strokeWidth={3} />
          </button>
          <span className="stepper-count" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={quantity === MAX_QUANTITY}
            aria-label="Increase quantity"
          >
            <Plus size={15} strokeWidth={3} />
          </button>
        </div>
      </div>

      <h1 className="product-name">{product.name}</h1>
      <p className="product-description">{product.description}</p>

      {product.options && (
        <fieldset className="options">
          <legend>{product.optionsTitle}</legend>
          {product.options.map((option, index) => (
            <label key={option.label} className="option">
              <span>{option.label}</span>
              <span className="option-leader" aria-hidden="true" />
              <span className="option-price">{formatPrice(option.price)}</span>
              <input type="radio" name="portion" checked={index === optionIndex} onChange={() => setOptionIndex(index)} />
            </label>
          ))}
        </fieldset>
      )}

      <div className="product-footer">
        <button type="button" className="btn-orange" onClick={addToCart}>
          Add to cart
        </button>
      </div>

      <Toast message={toast} onClose={closeToast} />
    </div>
  )
}
