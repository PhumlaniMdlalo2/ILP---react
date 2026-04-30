import { Header } from './components/ui/header-1'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Gardens from './components/Gardens'
import Impact from './components/Impact'
import Donate from './components/Donate'
import Volunteer from './components/Volunteer'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <WhatWeDo />
        <Gardens />
        <Impact />
        <Donate />
        <Volunteer />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
