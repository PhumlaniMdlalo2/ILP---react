import { useEffect, useRef } from 'react'
import { BadgeCheckIcon, LeafIcon } from './Icons'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    ref.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">

          <div className="about-image fade-in">
            <div
              className="about-img-placeholder"
              role="img"
              aria-label="Community members working together in the garden"
            >
              <div className="img-placeholder-icon" aria-hidden="true">
                <LeafIcon size={36} />
              </div>
            </div>
            <div className="about-badge" aria-label="Founded in 2009">
              <span className="badge-num">2009</span>
              <span className="badge-label">Founded</span>
            </div>
          </div>

          <div className="about-content fade-in" style={{ transitionDelay: '0.15s' }}>
            <span className="section-label">Our Story</span>
            <h2>Rooted in Langa,<br />Growing for All</h2>

            <p>
              Ithemba Labantu Projects was born out of a deep love for the Langa community —
              one of Cape Town's oldest and most vibrant townships. We believe that food
              security, dignity, and community care are the foundations of a thriving society.
            </p>
            <p>
              Since April 2009, our dedicated volunteers have been tending gardens, caring for
              the elderly, supporting young children, and keeping schools safe and clean.
              Partnering with the National Department of Agriculture and other funders, we are
              building something that lasts.
            </p>

            <div className="about-cards">
              <div className="about-card">
                <h4>Our Vision</h4>
                <p>
                  Self-sufficient communities empowered through sustainable agriculture,
                  compassionate care, and quality education.
                </p>
              </div>
              <div className="about-card">
                <h4>Our Mission</h4>
                <p>
                  To establish agriculture hubs and deliver holistic community services that
                  uplift the people of Langa and beyond.
                </p>
              </div>
            </div>

            <div className="about-npo">
              <BadgeCheckIcon size={16} style={{ color: 'var(--green-medium)', flexShrink: 0 }} />
              <span>Registered NPO: <strong>068-348-NPO</strong></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
