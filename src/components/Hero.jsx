import { ArrowDownIcon } from './Icons'
import Waves from './ui/interactive-waves'

const HERO_STATS = [
  { num: '80+', label: 'Volunteers' },
  { num: '310 m²', label: 'Under Cultivation' },
  { num: '4', label: 'Active Gardens' },
]

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <Waves lineColor="#8B5E3C" aria-hidden="true" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            Langa, Cape Town &nbsp;·&nbsp; Established 2009
          </div>

          <h1 id="hero-heading">
            Ithemba<br />
            <span className="accent">Labantu</span><br />
            Projects
          </h1>

          <p className="hero-xhosa">
            "Ithemba" = Hope &nbsp;·&nbsp; "Labantu" = For the People
          </p>

          <p className="hero-tagline">
            Establishing sustainable and self-sufficient agriculture hubs
            in the community of Langa and beyond.
          </p>

          <div className="hero-buttons">
            <a href="#volunteer" className="btn btn-primary">
              Volunteer With Us
            </a>
            <a href="#contact" className="btn btn-outline">
              Support Our Work
            </a>
          </div>

          <div className="hero-stats" aria-label="Key impact figures" role="list">
            {HERO_STATS.map(({ num, label }) => (
              <div key={label} className="hero-stat" role="listitem">
                <span className="hero-stat-num">{num}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <ArrowDownIcon size={18} />
      </div>
    </section>
  )
}
