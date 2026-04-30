import { useEffect, useRef } from 'react'
import { MapPinIcon, PhoneIcon, MailIcon, MessageIcon } from './Icons'

const CONTACT_ITEMS = [
  {
    Icon: MapPinIcon,
    label: 'Address',
    content: (
      <>
        Office Block D2<br />
        Ikamvalethu Secondary School<br />
        Themba Nqose Street, Langa<br />
        Cape Town, 7455
      </>
    ),
  },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    content: <a href="tel:+27813951982">+27 81 395 1982</a>,
  },
  {
    Icon: MailIcon,
    label: 'Email',
    content: <a href="mailto:tamarronp@gmail.com">tamarronp@gmail.com</a>,
  },
  {
    Icon: MessageIcon,
    label: 'WhatsApp',
    content: (
      <a href="https://wa.me/27813951982" target="_blank" rel="noopener noreferrer">
        Chat with us on WhatsApp
      </a>
    ),
  },
]

export default function Contact() {
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
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-label">Find Us</span>
          <h2>Get In Touch</h2>
          <p className="subtitle">
            We are based in Langa, Cape Town. Walk-ins are always welcome — come see
            the gardens for yourself.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info fade-in">
            <div className="contact-items">
              {CONTACT_ITEMS.map(({ Icon, label, content }) => (
                <div key={label} className="contact-item">
                  <div className="contact-item-icon">
                    <Icon size={20} />
                  </div>
                  <div className="contact-item-content">
                    <h4>{label}</h4>
                    <p>{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="map-container fade-in" style={{ transitionDelay: '0.18s' }}>
            <iframe
              title="Map showing Ikamvalethu Secondary School, Langa, Cape Town"
              src="https://www.openstreetmap.org/export/embed.html?bbox=18.5301%2C-33.9484%2C18.5501%2C-33.9384&layer=mapnik&marker=-33.94337%2C18.54013"
              loading="lazy"
              allowFullScreen
              style={{ border: 0 }}
            />
            <a
              href="https://www.google.com/maps?q=-33.94337,18.54013"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.75rem',
                background: 'var(--green-pale)',
                color: 'var(--green-dark)',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
