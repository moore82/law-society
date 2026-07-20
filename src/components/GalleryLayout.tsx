import React from 'react';

interface GalleryLayoutProps {
  title: string;
  section?: string;
  introText?: string;
}

export default function GalleryLayout({ title, section, introText }: GalleryLayoutProps) {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 769px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }
        @media (max-width: 768px) {
          .gallery-intro {
            text-align: center !important;
          }
        }
      `}</style>
      <section className="container">
        {section && (
          <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>
            {section}
          </div>
        )}
        <h1 className="page-title">{title}</h1>
        
        {/* Intro Divider / Copy */}
        {introText ? (
          <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
            <p className="gallery-intro" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
              {introText}
            </p>
          </div>
        ) : (
          <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />
        )}

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="glass-panel" style={{ 
              aspectRatio: '4/3', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              border: '1px dashed rgba(255,255,255,0.2)',
              padding: 0,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}>
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px', fontSize: '0.8rem' }}>
                PHOTO {i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <div style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
          Click any image to enlarge · photos managed by the club
        </div>
      </section>
    </main>
  );
}
