import { useState, useEffect, useRef } from 'react'
import { GridIcon, ExpandIcon, UsersIcon, LeafIcon, AwardIcon, LinkIcon } from './Icons'

function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        const duration = 1800
        const startTime = performance.now()
        const tick = now => {
          const progress = Math.min((now - startTime) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * end))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(end)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref} aria-label={`${end}${suffix}`}>{count}{suffix}</span>
}

const STATS = [
  { Icon: GridIcon,    end: 4,   suffix: '',    label: 'Active Vegetable\nGardens' },
  { Icon: ExpandIcon,  end: 310, suffix: ' m²', label: 'Cultivated Land\nAcross Gardens' },
  { Icon: UsersIcon,   end: 80,  suffix: '+',   label: 'Volunteers Earning\nMonthly Stipends' },
  { Icon: LeafIcon,    end: 17,  suffix: '',    label: 'Volunteers Actively\nTending Gardens' },
  { Icon: AwardIcon,   end: 2,   suffix: '',    label: 'Qualified Agriculture\nExperts on Team' },
  { Icon: LinkIcon,    end: 4,   suffix: '+',   label: 'Institutional\nPartners & Funders' },
]

const PARTNERS = [
  'National Dept. of Agriculture',
  'Casidra',
  'IDC',
  'Thembalethu Development',
  'Social Employment Fund (SEF)',
]

export default function Impact() {
  return (
    <section className="impact" id="impact" aria-labelledby="impact-heading">
      <div className="impact-bg" aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="section-label">By the Numbers</span>
          <h2 id="impact-heading">Our Impact</h2>
          <p className="subtitle">
            Since April 2009, Ithemba Labantu has been quietly transforming Langa —
            one garden bed, one meal, one volunteer at a time.
          </p>
        </div>

        <div className="stats-grid">
          {STATS.map(({ Icon, end, suffix, label }, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">
                <Icon size={22} />
              </div>
              <span className="stat-number">
                <Counter end={end} suffix={suffix} />
              </span>
              <p className="stat-label">
                {label.split('\n').map((line, j) => (
                  <span key={j} style={{ display: 'block' }}>{line}</span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="partners-wrap">
          <h3>Our Partners &amp; Funders</h3>
          <ul className="partners-list" aria-label="Partners and funders">
            {PARTNERS.map(p => (
              <li key={p} className="partner-pill">{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
