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
          onClick={() => setIsOpen(!isOpen)}
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

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <ul className="glass-panel mobile-menu" style={{
            position: 'absolute',
            top: '6rem',
            right: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '1.5rem 2.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(10,3,3,0.95)',
            zIndex: 100
          }}>
            {['About', 'Honours', 'Fixtures', 'FOS', 'Tours', 'Gallery', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
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
        )}
      </div>
    </nav>
  );
}
