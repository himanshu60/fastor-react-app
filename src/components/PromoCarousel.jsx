import { useEffect, useRef, useState } from 'react'
import { getProduct } from '../data/menu'

const AUTO_ADVANCE_MS = 4000

export default function PromoCarousel({ promos, onOpen }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollToSlide = (index) => {
    const track = trackRef.current
    track.scrollTo({ left: index * track.clientWidth })
  }

  // Move to the next slide every few seconds (skipped when the user prefers less motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => {
      const track = trackRef.current
      if (!track) return
      const current = Math.round(track.scrollLeft / track.clientWidth)
      track.scrollTo({ left: ((current + 1) % promos.length) * track.clientWidth })
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [promos.length])

  const handleScroll = (e) => {
    const track = e.currentTarget
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  return (
    <section className="promo" aria-label="Offers">
      <div className="promo-track" ref={trackRef} onScroll={handleScroll}>
        {promos.map((promo) => {
          const product = getProduct(promo.productId)
          return (
            <article
              key={promo.productId}
              className="promo-slide"
              onClick={() => onOpen(product.id)}
              aria-label={`${promo.discount} on ${product.name}`}
            >
              <div className="promo-text">
                <p className="promo-tagline">{promo.tagline}</p>
                <p className="promo-discount">{promo.discount}</p>
              </div>
              <img src={product.image} alt={product.name} />
            </article>
          )
        })}
      </div>
      <div className="promo-dots">
        {promos.map((promo, index) => (
          <button
            key={promo.productId}
            type="button"
            className={`promo-dot ${index === active ? 'active' : ''}`}
            onClick={() => scrollToSlide(index)}
            aria-label={`Show offer ${index + 1}`}
            aria-current={index === active}
          />
        ))}
      </div>
    </section>
  )
}
