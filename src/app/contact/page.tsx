"use client";
import React from 'react';

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          margin-top: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--foreground-muted);
        }
        .form-input, .form-textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 1rem;
          color: #ffffff;
          font-size: 1rem;
          transition: border-color 0.2s ease, background 0.2s ease;
          width: 100%;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--accent-red);
          background: rgba(255, 255, 255, 0.08);
        }
        .form-textarea {
          min-height: 150px;
          resize: vertical;
        }
        .map-placeholder {
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          aspect-ratio: 16/10;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          width: 100%;
        }
        .info-line {
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 1rem;
          width: 100%;
        }
        
        @media (min-width: 769px) {
          .contact-grid {
            grid-template-columns: 1.2fr 0.8fr;
            gap: 5rem;
          }
        }
        @media (max-width: 768px) {
          .contact-intro {
            text-align: center !important;
          }
        }
      `}</style>

      <section className="container">
        <h1 className="page-title">GET IN TOUCH</h1>

        {/* Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />

        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-input" placeholder="Your full name" required />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="Your email address" required />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-input" placeholder="What is this regarding?" required />
              </div>

              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Type your message here..." required></textarea>
              </div>

              <button
                type="submit"
                className="btn-glass"
                style={{
                  padding: '1rem 3rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: 'var(--accent-red)',
                  color: '#000000',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </form>
          </div>

          {/* Right Column: Map & Info */}
          <div>
            {/* Map Placeholder */}
            <div className="map-placeholder">
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>MAP PLACEHOLDER</span>
            </div>

            {/* Find Us */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', color: '#ffffff' }}>Find Us</h2>

            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '0.5px', marginBottom: '2rem' }}>
              Address Line 1,<br />
              Address Line 2,<br />
              Address Line 3,<br />
              Town, <br />
              County, <br />
              Country
            </p>

            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '0.5px', marginBottom: '2rem' }}>
              Phone: [PHONE_NUMBER]<br />
              Email: [EMAIL_ADDRESS]
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
