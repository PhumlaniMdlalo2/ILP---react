import { useEffect, useRef } from 'react'
import ImgStack from './ui/image-stack'

const GARDENS = [
  { name: 'Ikamvalethu School Garden', size: '120 m²', type: 'School Garden', cls: 'g1' },
  { name: 'Zimasa School Garden',       size: '50 m²',  type: 'School Garden', cls: 'g2' },
  { name: 'Sizamile Home Garden',       size: '40 m²',  type: 'Old Age Home',  cls: 'g3' },
  { name: 'Langa High School Garden',  size: '100 m²', type: 'School Garden', cls: 'g4' },
]

const CROPS = [
  'Spinach', 'Beetroot', 'Parsley', 'Spring Onion',
  'Cabbage', 'Red Cabbage', 'Lettuce', 'Celery', 'Sweet Potato',
]

const CROP_IMAGES = [
  '/brand_assets/spinach.jpg',
  '/brand_assets/beetroot.jpg',
  '/brand_assets/spring_onion.jpg',
  '/brand_assets/mixed_veg.jpg',
  '/brand_assets/lettuce.jpg',
  '/brand_assets/sweet_potato.jpg',
]

export default function Gardens() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    ref.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="gardens" id="gardens" ref={ref}>
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-label">Where We Grow</span>
          <h2>Our Gardens</h2>
          <p className="subtitle">
            Four active gardens cultivated across Langa — growing fresh produce for school
            feeding programmes and contributing to local livelihoods.
          </p>
        </div>

        <div className="gardens-grid">
          {GARDENS.map((g, i) => (
            <article
              key={g.name}
              className="garden-card fade-in"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className={`garden-image ${g.cls}`}
                role="img"
                aria-label={`${g.name} – garden photo placeholder`}
              >
                <span className="garden-size-badge">{g.size}</span>
              </div>
              <div className="garden-info">
                <h3>{g.name}</h3>
                <span className="garden-type">{g.type}</span>
              </div>
            </article>
          ))}
        </div>

        {/* What We Grow */}
        <div className="fade-in mt-16 flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">

          {/* Draggable card stack */}
          <div className="flex-shrink-0 flex justify-center">
            <ImgStack images={CROP_IMAGES} />
          </div>

          {/* Text + crop tags */}
          <div className="flex-1">
            <span className="section-label">What We Grow</span>
            <h2 className="mt-1 mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--green-dark)' }}>
              Fresh From Our Gardens
            </h2>
            <p style={{ color: 'var(--text-medium)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Produce from our four gardens feeds school learners through feeding programmes
              and is sold to neighbourhood vendors at affordable prices — creating a circular,
              community-sustaining food economy right here in Langa.
            </p>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.75rem' }}>
              Crops we cultivate
            </p>
            <ul className="crops-tags" aria-label="Crops grown in our gardens">
              {CROPS.map(name => (
                <li key={name} className="crop-tag">{name}</li>
              ))}
            </ul>
            <p className="mt-4" style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
              Swipe the card left or right to browse our produce →
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
