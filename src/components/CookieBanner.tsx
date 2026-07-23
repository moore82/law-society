"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      maxWidth: '350px',
      background: 'rgba(20, 20, 20, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '1.25rem',
      zIndex: 9999,
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ fontSize: '0.85rem', color: '#e0e0e0', lineHeight: 1.5 }}>
        We use cookies to improve your experience on our site and analyze performance. 
        Read our <Link href="/cookie-policy" style={{ color: 'var(--accent-red)', textDecoration: 'underline' }}>Cookie Policy</Link> for details.
      </div>
      <button 
        onClick={handleAccept}
        style={{
          background: 'var(--accent-red)',
          color: '#000',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          alignSelf: 'flex-end',
          fontSize: '0.85rem'
        }}
      >
        Accept
      </button>
    </div>
  );
}
