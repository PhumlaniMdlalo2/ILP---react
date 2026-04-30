'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

const NAV_LINKS = [
  { href: '#about',     label: 'About' },
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#gardens',   label: 'Gardens' },
  { href: '#impact',    label: 'Impact' },
  { href: '#donate',    label: 'Donate' },
  { href: '#volunteer', label: 'Volunteer' },
  { href: '#contact',   label: 'Contact' },
];

const SECTION_IDS = ['hero', 'about', 'what-we-do', 'gardens', 'impact', 'donate', 'volunteer', 'contact'];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');
  const scrolled = useScroll(60);

  React.useEffect(() => {
    const observers = SECTION_IDS.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300',
        scrolled ? 'py-[0.65rem] shadow-[0_2px_24px_rgba(0,0,0,0.25)]' : 'py-4'
      )}
      style={{ background: 'rgba(15,61,34,0.97)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6">

        {/* Brand */}
        <a
          href="#hero"
          onClick={close}
          aria-label="Ithemba Labantu Projects – home"
          className="flex flex-col leading-[1.2]"
        >
          <span className="text-[1.05rem] font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Ithemba Labantu Projects
          </span>
          <span className="text-[0.68rem] italic" style={{ color: 'var(--green-light)' }}>
            Hope of the People · NPO 068-348
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-[0.15rem] md:flex" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.slice(1);
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={close}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'rounded-md px-[0.7rem] py-[0.4rem] text-[0.875rem] font-medium transition-all duration-300',
                    isActive
                      ? 'bg-white/[0.13] text-white'
                      : 'text-white/[0.82] hover:bg-white/10 hover:text-white'
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#volunteer"
              onClick={close}
              className="ml-1 rounded-[50px] px-[1.1rem] py-[0.4rem] text-[0.875rem] font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--orange)', fontFamily: "'Poppins', sans-serif" }}
            >
              Get Involved
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </div>

      {/* Mobile menu — absolute so it anchors to the bottom of this fixed nav */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full border-t border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          style={{ background: 'var(--green-darkest)' }}
        >
          <ul className="flex flex-col gap-[0.2rem] p-3" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={close}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'block w-full rounded-md px-4 py-[0.7rem] text-[0.95rem] font-medium transition-all duration-300',
                      isActive
                        ? 'bg-white/[0.13] text-white'
                        : 'text-white/[0.82] hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="p-3 pt-0">
            <a
              href="#volunteer"
              onClick={close}
              className="block w-full rounded-[50px] py-3 text-center text-[0.95rem] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--orange)', fontFamily: "'Poppins', sans-serif" }}
            >
              Get Involved
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
