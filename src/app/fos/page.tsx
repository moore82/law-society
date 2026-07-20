import Link from 'next/link';

export default function FOSLandingPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        .fos-hero {
          background: linear-gradient(135deg, rgba(29, 16, 16, 0.9), rgba(10, 3, 3, 0.95));
          border: 1px solid rgba(255, 51, 68, 0.2);
          border-radius: 16px;
          padding: 5rem 2rem;
          text-align: center;
          margin-bottom: 4rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .fos-section {
          margin-bottom: 5rem;
        }
        .fos-section-title {
          font-size: 2rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
        }
        .fos-divider {
          border-top: 4px solid var(--accent-red);
          margin-bottom: 2.5rem;
          max-width: 80px;
        }
        .key-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 5rem;
        }
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .winners-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
        }
        .winners-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .roundup-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .gallery-preview-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .cta-banner {
          background: #0a0303;
          border: 1px solid rgba(255, 51, 68, 0.3);
          border-radius: 12px;
          padding: 4rem 2rem;
          text-align: center;
          margin-top: 5rem;
        }
        
        @media (min-width: 769px) {
          .key-info-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          .partners-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 1.5rem;
          }
          .roundup-grid {
            grid-template-columns: 1fr 1fr;
          }
          .gallery-preview-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>

      <section className="container">
        {/* HERO */}
        <div className="fos-hero">
          <div style={{ color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            FOS HERO — event banner
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', color: '#ffffff', lineHeight: 1 }}>
            Festival of Sport
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', marginBottom: '2.5rem' }}>
            Festival name · dates · venue
          </p>
          <Link href="/fos/get-involved">
            <button className="btn-glass" style={{ padding: '1rem 2.5rem', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', background: 'var(--accent-red)', color: '#000', border: 'none', cursor: 'pointer' }}>
              Get Involved
            </button>
          </Link>
        </div>

        {/* ABOUT */}
        <div className="fos-section">
          <h2 className="fos-section-title">About the Festival</h2>
          <div className="fos-divider" />
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel tristique nisl. Phasellus sagittis ex id magna hendrerit, id convallis lacus scelerisque. Cras vulputate turpis quis sem condimentum, eu pretium tellus egestas.
          </p>
        </div>

        {/* KEY INFO */}
        <div className="key-info-grid">
          {[
            { title: "Dates", desc: "when it runs" },
            { title: "Venue", desc: "where" },
            { title: "Format", desc: "how it works" }
          ].map((info, i) => (
            <div key={i} className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>{info.title}</h3>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem' }}>{info.desc}</p>
            </div>
          ))}
        </div>

        {/* PARTNERS */}
        <div className="fos-section glass-panel" style={{ padding: '3rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: '#ffffff' }}>Our Partners</h3>
          <div className="partners-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: '3/2', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>Partner {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WINNERS */}
        <div className="fos-section">
          <h2 className="fos-section-title">Previous Winners</h2>
          <div className="fos-divider" />
          <div className="glass-panel" style={{ padding: '0 2rem' }}>
            <table className="winners-table">
              <tbody>
                {[
                  { year: "2025", winner: "Wimbledon RFC" },
                  { year: "2024", winner: "Richmond FC" },
                  { year: "2023", winner: "Teddington Antlers" },
                  { year: "2022", winner: "Barnes RFC" }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < 3 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                    <td style={{ fontWeight: 700, color: 'var(--accent-red)', width: '100px', padding: '1.25rem 1rem' }}>{row.year}</td>
                    <td style={{ color: 'var(--foreground-muted)', padding: '1.25rem 1rem' }}>{row.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROUNDUP */}
        <div className="fos-section roundup-grid">
          <div style={{ aspectRatio: '16/10', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: 'var(--foreground-muted)', fontWeight: 600 }}>IMAGE PLACEHOLDER</span>
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', color: '#ffffff' }}>This year's roundup</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        {/* GALLERY */}
        <div className="fos-section">
          <h2 className="fos-section-title">Gallery</h2>
          <div className="fos-divider" />
          <div className="gallery-preview-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-panel" style={{ aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.2)', padding: 0 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', fontWeight: 600 }}>PHOTO {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="cta-banner">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', color: '#ffffff' }}>
            Take part in this year's Festival
          </h2>
          <Link href="/fos/get-involved">
            <button className="btn-glass" style={{ padding: '1rem 3rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', background: '#ffffff', color: '#000000', border: 'none', cursor: 'pointer' }}>
              Sign Up
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
