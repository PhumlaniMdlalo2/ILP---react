import { useState, useEffect, useRef } from 'react'
import { useForm } from '@formspree/react'
import { DollarIcon, BookOpenIcon, UsersIcon, MapPinIcon, CheckCircleIcon } from './Icons'

const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID || '').trim() || 'meaqaynj'

const INTERESTS = [
  'Community Vegetable Gardens',
  'Elderly Caregiving',
  'School Grounds Maintenance',
  'ECD Support',
  'School Safety Patrol',
  'Administrative Support',
  'Fundraising & Partnerships',
  'Other',
]

const PERKS = [
  {
    Icon: DollarIcon,
    title: 'Monthly Stipends',
    desc: 'Active volunteers may qualify for monthly stipends through our funding partnerships.',
  },
  {
    Icon: BookOpenIcon,
    title: 'Skills Development',
    desc: 'Learn sustainable agriculture, caregiving, and community management skills.',
  },
  {
    Icon: UsersIcon,
    title: 'Community Impact',
    desc: 'Make a measurable difference in the lives of Langa residents every single day.',
  },
  {
    Icon: MapPinIcon,
    title: 'Walk-ins Welcome',
    desc: 'Visit us at Office Block D2, Ikamvalethu Secondary School — no appointment needed.',
  },
]

const EMPTY = { name: '', email: '', phone: '', interest: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required'
  if (!form.email.trim()) errors.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address'
  return errors
}

export default function Volunteer() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const { submitting, succeeded, errors: submitError } = state
  const summaryRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    sectionRef.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const handleBlur = e => {
    const { name } = e.target
    const fieldErrors = validate(form)
    if (fieldErrors[name]) {
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }))
    } else {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors)
      setTimeout(() => summaryRef.current?.focus(), 50)
      return
    }
    setErrors({})
    handleSubmit(form)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <section className="volunteer" id="volunteer" ref={sectionRef}>
      <div className="container">
        <div className="volunteer-grid">

          <div className="volunteer-info fade-in">
            <span className="section-label">Get Involved</span>
            <h2>Volunteer<br />With Us</h2>
            <p>
              Join 80+ community members already making a difference. Whether you have
              a few hours a week or want to commit full time, there is a place for you
              at Ithemba Labantu Projects.
            </p>

            <div className="volunteer-perks">
              {PERKS.map(({ Icon, title, desc }) => (
                <div key={title} className="volunteer-perk">
                  <div className="perk-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="perk-title">{title}</span>
                    <span className="perk-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="volunteer-form fade-in" style={{ transitionDelay: '0.18s' }}>
            {succeeded ? (
              <div className="form-success" role="alert">
                <CheckCircleIcon size={48} className="success-icon" style={{ color: 'var(--green-medium)' }} />
                <h3>Thank You</h3>
                <p>
                  We have received your message and will be in touch soon.
                  Welcome to the Ithemba Labantu family.
                </p>
              </div>
            ) : (
              <form
                name="volunteer"
                onSubmit={onSubmit}
                noValidate
                aria-label="Volunteer interest form"
              >
                <h3 className="form-title">Express Your Interest</h3>

                {submitError && (
                  <div className="form-error-summary" role="alert">
                    <p style={{ fontSize: '0.875rem', color: '#b91c1c' }}>
                      {submitError.message || 'Something went wrong. Please try again or email us directly.'}
                    </p>
                  </div>
                )}

                {hasErrors && (
                  <div
                    className="form-error-summary"
                    role="alert"
                    aria-live="assertive"
                    ref={summaryRef}
                    tabIndex={-1}
                  >
                    <h4>Please correct the following:</h4>
                    <ul>
                      {Object.entries(errors).map(([field, msg]) => (
                        <li key={field}>
                          <a href={`#vol-${field}`}>{msg}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="vol-name">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="vol-name" name="name" type="text"
                      value={form.name} onChange={handleChange} onBlur={handleBlur}
                      required aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'vol-name-error' : undefined}
                      placeholder="Your full name"
                      autoComplete="name"
                      className={errors.name ? 'field-error' : ''}
                    />
                    {errors.name && (
                      <span id="vol-name-error" className="field-error-msg" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="vol-phone">Phone Number</label>
                    <input
                      id="vol-phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+27 xx xxx xxxx"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="vol-email">
                    Email Address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="vol-email" name="email" type="email"
                    value={form.email} onChange={handleChange} onBlur={handleBlur}
                    required aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'vol-email-error' : undefined}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={errors.email ? 'field-error' : ''}
                  />
                  {errors.email && (
                    <span id="vol-email-error" className="field-error-msg" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="vol-interest">Area of Interest</label>
                  <select
                    id="vol-interest" name="interest"
                    value={form.interest} onChange={handleChange}
                  >
                    <option value="">Select an area…</option>
                    {INTERESTS.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="vol-message">Message (optional)</label>
                  <textarea
                    id="vol-message" name="message"
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us about yourself and why you would like to get involved…"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-green"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting && <span className="btn-spinner" aria-hidden="true" />}
                  {submitting ? 'Sending…' : 'Send My Interest'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
