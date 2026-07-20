"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { 
    label: 'About the Club', 
    href: '/about', 
    children: [
      { label: 'History', href: '/about/history' },
      { label: 'Officers of the Club', href: '/about/officers' }
    ]
  },
  { 
    label: 'Honours Board', 
    href: '/honours',
    children: [
      { label: 'Tim Edwards Trophy', href: '/honours/tim-edwards-trophy' },
      { label: 'Captains', href: '/honours/captains' },
      { label: 'Order of the Golden Pedro', href: '/honours/order-of-the-golden-pedro' }
    ]
  },
  { 
    label: 'Fixtures & Results', 
    href: '/fixtures',
    children: [
      { label: '2026 / 2027 Season', href: '/fixtures/2026-2027-season' }
    ]
  },
  { 
    label: 'Festival of Sport', 
    href: '/fos',
    children: [
      { label: 'Partners', href: '/fos/partners' },
      { label: 'Previous Winners', href: '/fos/previous-winners' },
      { label: 'Roundup', href: '/fos/roundup' },
      { label: 'Get Involved', href: '/fos/get-involved' },
      { label: 'Gallery', href: '/fos/gallery' }
    ]
  },
  { label: 'Tours', href: '/tours' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' }
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <nav style={{
      position: 'absolute',
      width: '100%',
      zIndex: 50,
      top: 0
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        position: 'relative'
      }}>
        {/* Logo container */}
        <div className="nav-logo" style={{ 
          display: 'flex', 
          alignItems: 'center',
          background: '#ffffff',
          padding: '1rem 1.5rem',
          marginTop: '-2rem',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}>
          <Link href="/">
            <img
              src="/img/logo_red.png"
              alt="Law Society RFC Logo"
              style={{ height: '70px', objectFit: 'contain' }}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="glass-panel desktop-menu" style={{
          display: 'flex',
          gap: '2.5rem',
          padding: '0.75rem 3rem',
          borderRadius: '50px',
          alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href));
            return (
              <li 
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    color: isActive ? 'var(--accent-red)' : 'var(--foreground)',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  {item.label}
                  {item.children && <span style={{ fontSize: '0.6rem' }}>▼</span>}
                </Link>
                
                {/* Desktop Dropdown */}
                {item.children && hoveredItem === item.label && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '1.5rem', /* invisible hover bridge */
                    width: '180px'
                  }}>
                    <ul className="glass-panel" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem',
                      gap: '1.25rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(10,3,3,0.95)'
                    }}>
                      {item.children.map(child => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.label}>
                            <Link href={child.href} className="drawer-link" style={{ 
                              fontSize: '0.8rem', 
                              fontWeight: 600, 
                              color: isChildActive ? 'var(--accent-red)' : 'var(--foreground-muted)',
                              textTransform: 'uppercase',
                              transition: 'color 0.2s ease'
                            }}>
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Hamburger Icon */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent-red)',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: '0'
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      <div 
        className={`mobile-drawer-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Side Slide-out Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} style={{ overflowY: 'auto' }}>
        {/* Close Button inside drawer */}
        <button 
          onClick={() => setIsOpen(false)} 
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--accent-red)',
            fontSize: '2.2rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Drawer Navigation Links */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none', padding: 0, margin: 0, marginTop: '2rem' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href));
            return (
              <li key={item.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="drawer-link"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      color: isActive ? 'var(--accent-red)' : 'var(--foreground)',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button 
                      onClick={() => toggleExpand(item.label)}
                      style={{ background: 'none', border: 'none', color: 'var(--foreground)', fontSize: '1.5rem', cursor: 'pointer' }}
                    >
                      {expandedItem === item.label ? '−' : '+'}
                    </button>
                  )}
                </div>
                
                {/* Mobile Children Accordion */}
                {item.children && expandedItem === item.label && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1.5rem', marginTop: '1.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                    {item.children.map(child => {
                      const isChildActive = pathname === child.href;
                      return (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="drawer-link"
                            style={{
                              fontSize: '1rem',
                              fontWeight: 600,
                              letterSpacing: '1px',
                              color: isChildActive ? 'var(--accent-red)' : 'var(--foreground-muted)',
                              textTransform: 'uppercase',
                              transition: 'color 0.2s ease'
                            }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
