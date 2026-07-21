import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

type FOSPageData = {
  heroBackgroundImage?: any;
  heroTitle: string;
  heroSubtitle?: string;
  aboutText?: string;
  keyInfo?: { title: string; desc: string }[];
  winnersCount?: number;
};

type FOSGalleryData = {
  images?: any[];
};

type FosRoundupData = {
  title?: string;
  intro?: string;
  images?: any[];
};

type Partner = {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
};

type FosWinner = {
  _id: string;
  year: string;
  cupWinner: string;
  shieldWinner?: string;
};

export default async function FOSLandingPage() {
  const [pageData, galleryData, roundupData, partners, allWinners] = await Promise.all([
    client.fetch<FOSPageData>(`*[_type == "fosPage" && _id == "fosPage"][0]`),
    client.fetch<FOSGalleryData>(`*[_type == "fosGalleryPage" && _id == "fosGalleryPage"][0]`),
    client.fetch<FosRoundupData>(`*[_type == "fosRoundupPage" && _id == "fosRoundupPage"][0]`),
    client.fetch<Partner[]>(`*[_type == "partner" && showOnFosPage == true] | order(name asc)`),
    client.fetch<FosWinner[]>(`*[_type == "fosWinner"] | order(year desc)`)
  ]);

  const bgImage = pageData?.heroBackgroundImage 
    ? urlFor(pageData.heroBackgroundImage).url() 
    : null;
    
  const galleryImages = galleryData?.images ? galleryData.images.slice(0, 4) : [];
  
  const displayWinnersCount = pageData?.winnersCount || 4;
  const recentWinners = allWinners.slice(0, displayWinnersCount);

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        .fos-hero {
          background: ${bgImage ? `linear-gradient(135deg, rgba(29, 16, 16, 0.9), rgba(10, 3, 3, 0.95)), url('${bgImage}')` : `linear-gradient(135deg, rgba(29, 16, 16, 0.9), rgba(10, 3, 3, 0.95))`};
          background-size: cover;
          background-position: center;
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
            {pageData?.heroTitle || 'Festival of Sport'}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', marginBottom: '2.5rem' }}>
            {pageData?.heroSubtitle || 'Festival name · dates · venue'}
          </p>
          <Link href="/fos/get-involved">
            <button className="btn-glass" style={{ padding: '1rem 2.5rem', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', background: 'var(--accent-red)', color: '#000', border: 'none', cursor: 'pointer' }}>
              Get Involved
            </button>
          </Link>
        </div>

        {/* ABOUT */}
        {pageData?.aboutText && (
          <div className="fos-section">
            <h2 className="fos-section-title">About the Festival</h2>
            <div className="fos-divider" />
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
              {pageData.aboutText}
            </p>
          </div>
        )}

        {/* KEY INFO */}
        {pageData?.keyInfo && pageData.keyInfo.length > 0 && (
          <div className="key-info-grid">
            {pageData.keyInfo.map((info, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>{info.title}</h3>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem' }}>{info.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* PARTNERS */}
        {partners.length > 0 && (
          <div className="fos-section glass-panel" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', color: '#ffffff', margin: 0 }}>Our Partners</h3>
              <Link href="/fos/partners" style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                View All &rarr;
              </Link>
            </div>
            <div className="partners-grid">
              {partners.map((partner) => (
                <Link key={partner._id} href={`/fos/partners/${partner.slug.current}`} style={{ textDecoration: 'none' }}>
                  <div style={{ aspectRatio: '3/2', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', overflow: 'hidden', transition: 'all 0.2s ease' }} className="partner-card-hover">
                    <style>{`.partner-card-hover:hover { border-color: rgba(255,255,255,0.3) !important; background: rgba(255,255,255,0.05) !important; }`}</style>
                    {partner.image ? (
                      <img src={urlFor(partner.image).url()} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>{partner.name}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* WINNERS */}
        {recentWinners && recentWinners.length > 0 && (
          <div className="fos-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="fos-section-title" style={{ margin: 0 }}>Previous Winners</h2>
              <Link href="/fos/previous-winners" style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                View All &rarr;
              </Link>
            </div>
            <div className="fos-divider" style={{ marginTop: '1rem' }} />
            <div className="glass-panel" style={{ padding: '0 2rem' }}>
              <table className="winners-table" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '1.25rem 1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Year</th>
                    <th style={{ padding: '1.25rem 1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Cup Winner</th>
                    <th style={{ padding: '1.25rem 1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Shield Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {recentWinners.map((row, i) => (
                    <tr key={row._id} style={{ borderBottom: i < recentWinners.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                      <td style={{ fontWeight: 700, color: 'var(--accent-red)', width: '80px', padding: '1.25rem 1rem' }}>{row.year}</td>
                      <td style={{ color: 'var(--foreground)', padding: '1.25rem 1rem', fontWeight: 500 }}>{row.cupWinner}</td>
                      <td style={{ color: 'var(--foreground-muted)', padding: '1.25rem 1rem' }}>{row.shieldWinner || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ROUNDUP */}
        {(roundupData?.title || roundupData?.intro) && (
          <div className="fos-section roundup-grid">
            <div style={{ aspectRatio: '16/10', border: roundupData?.images?.[0] ? 'none' : '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
              {roundupData?.images?.[0] ? (
                <img src={urlFor(roundupData.images[0]).width(800).url()} alt="Roundup Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--foreground-muted)', fontWeight: 600 }}>IMAGE PLACEHOLDER</span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', color: '#ffffff' }}>{roundupData?.title}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--foreground-muted)', marginBottom: '2rem' }}>
                {roundupData?.intro}
              </p>
              <div style={{ marginTop: 'auto' }}>
                <Link href="/fos/roundup" className="btn-glass" style={{ padding: '0.75rem 2rem', fontWeight: 700, color: 'var(--accent-red)', textDecoration: 'none', display: 'inline-block' }}>
                  Read Full Roundup &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {galleryImages.length > 0 && (
          <div className="fos-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="fos-section-title">Gallery</h2>
              <Link href="/fos/gallery" style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', marginTop: '-1rem' }}>
                View All &rarr;
              </Link>
            </div>
            <div className="fos-divider" />
            <div className="gallery-preview-grid">
              {galleryImages.map((img, i) => (
                <div key={i} className="glass-panel" style={{ aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, overflow: 'hidden' }}>
                  <img src={urlFor(img).width(400).url()} alt={`Gallery Photo ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

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
