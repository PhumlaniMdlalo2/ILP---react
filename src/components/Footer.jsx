const QUICK_LINKS = [
  { href: '#about',      label: 'About Us' },
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#gardens',    label: 'Our Gardens' },
  { href: '#impact',     label: 'Our Impact' },
  { href: '#volunteer',  label: 'Volunteer' },
  { href: '#contact',    label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <h3 className="footer-brand-name">Ithemba Labantu Projects</h3>
            <p className="footer-xhosa">"Hope for the People"</p>
            <p>
              Establishing sustainable and self-sufficient agriculture hubs in the
              community of Langa and beyond. Empowering communities through food
              security, care, and dignity since 2009.
            </p>
            <p className="footer-npo">NPO Registration: 068-348-NPO</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <address>
              Office Block D2<br />
              Ikamvalethu Secondary School<br />
              Themba Nqose Street, Langa<br />
              Cape Town, 7455
              <br /><br />
              <a href="tel:+27813951982">+27 81 395 1982</a>
              <br />
              <a href="mailto:tamarronp@gmail.com">tamarronp@gmail.com</a>
            </address>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Ithemba Labantu Projects &middot; NPO 068-348-NPO &middot;
            All rights reserved.
          </p>
          <p>Made with care for the people of Langa</p>
        </div>
      </div>
    </footer>
  )
}
