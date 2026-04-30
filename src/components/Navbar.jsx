import { useState, useEffect } from 'react'
import logoSrc from '../assets/logo.png'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#gardens', label: 'Gardens' },
  { href: '#impact', label: 'Impact' },
  { href: '#volunteer', label: 'Volunteer' },
  { href: '#contact', label: 'Contact' },
]

const SECTION_IDS = ['hero', 'about', 'what-we-do', 'gardens', 'impact', 'volunteer', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = SECTION_IDS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const close = () => setOpen(false)

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="navbar-inner">
          <a href="#hero" className="navbar-brand" onClick={close} aria-label="Ithemba Labantu Projects – home">
            <img
              src={logoSrc}
              alt="Ithemba Labantu Projects"
              style={{ height: '40px', width: 'auto' }}
            />
          </a>

          <button
            className={`hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="main-nav"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <ul id="main-nav" className={`navbar-nav${open ? ' open' : ''}`} role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.slice(1)
              const isActive = activeSection === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={close}
                    className={isActive ? 'nav-active' : ''}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
            <li>
              <a href="#volunteer" className="navbar-cta" onClick={close}>
                Get Involved
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
