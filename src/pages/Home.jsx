import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Wallet } from 'lucide-react'
import PromoCarousel from '../components/PromoCarousel'
import Toast from '../components/Toast'
import { bestSellerIds, getProduct, orders, promos, user } from '../data/menu'
import { formatPrice } from '../utils/format'
import '../styles/home.css'

const bestSellers = bestSellerIds.map(getProduct)

export default function Home() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const [cancelledIds, setCancelledIds] = useState([])

  const closeToast = useCallback(() => setToast(null), [])
  const openProduct = (id) => navigate(`/product/${id}`)

  const cancelOrder = (order) => {
    setCancelledIds((ids) => [...ids, order.id])
    setToast('Order cancelled')
  }

  return (
    <div className="screen home">
      <header className="location-bar">
        <p className="location-label">Current Locations</p>
        <p className="location-name">{user.location}</p>
      </header>

      <div className="home-top">
        <div className="user-box">{user.name}</div>
        <button type="button" className="icon-button call" aria-label="Call us" onClick={() => setToast('Calling is coming soon')}>
          <Phone size={22} />
        </button>
        <button type="button" className="icon-button wallet" aria-label="Wallet" onClick={() => setToast('Wallet is coming soon')}>
          <Wallet size={22} />
        </button>
      </div>

      <section className="best-seller">
        <h2 className="section-title">Best Seller</h2>
        <div className="best-seller-list">
          {bestSellers.map((product) => (
            <button
              key={product.id}
              type="button"
              className="best-seller-card"
              onClick={() => openProduct(product.id)}
              aria-label={`${product.name}, ${formatPrice(product.price)}`}
            >
              <img src={product.image} alt="" />
              <span className="price-tag">{formatPrice(product.price)}</span>
            </button>
          ))}
        </div>
      </section>

      <PromoCarousel promos={promos} onOpen={openProduct} />

      <section className="popular">
        <h2 className="section-title">Popular Items</h2>
        <ul className="popular-list">
          {orders.map((order) => {
            const product = getProduct(order.productId)
            const isCancelled = cancelledIds.includes(order.id)
            return (
              <li key={order.id} className="order">
                <button type="button" className="order-image" onClick={() => openProduct(product.id)} aria-label={`Open ${product.name}`}>
                  <img src={product.image} alt="" />
                </button>
                <div className="order-info">
                  <div className="order-row">
                    <button type="button" className="order-name" onClick={() => openProduct(product.id)}>
                      {product.name}
                    </button>
                    <span className="order-price">{formatPrice(order.total)}</span>
                  </div>
                  <div className="order-row order-meta">
                    <span>{order.date}</span>
                    <span>
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <div className="order-row order-actions">
                    <button type="button" className="pill pill-filled" onClick={() => cancelOrder(order)} disabled={isCancelled}>
                      {isCancelled ? 'Cancelled' : 'Cancel Order'}
                    </button>
                    <button
                      type="button"
                      className="pill pill-soft"
                      onClick={() => setToast('Live tracking is coming soon')}
                      disabled={isCancelled}
                    >
                      Track Driver
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <Toast message={toast} onClose={closeToast} />
    </div>
  )
}
