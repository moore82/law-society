"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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
          <img
            src="/img/logo_red.png"
            alt="Law Society RFC Logo"
            style={{ height: '70px', objectFit: 'contain' }}
          />
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
          {['About', 'Honours', 'Fixtures', 'FOS', 'Tours', 'Gallery', 'Contact'].map((item) => (
            <li key={item}>
              <Link
                href="#"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color: 'var(--foreground)',
                  textTransform: 'uppercase'
                }}
              >
                {item}
              </Link>
            </li>
          ))}
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
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
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
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none', padding: 0, margin: 0 }}>
          {['About', 'Honours', 'Fixtures', 'FOS', 'Tours', 'Gallery', 'Contact'].map((item) => (
            <li key={item}>
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="drawer-link"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: 'var(--foreground)',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease'
                }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
