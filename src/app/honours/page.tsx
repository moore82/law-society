import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type HonoursPageData = {
  title: string;
  intro: string;
  content: any;
  images: any[];
};

export default async function HonoursPage() {
  const pageData = await client.fetch<HonoursPageData>(
    `*[_type == "honoursPage"][0]`
  );
  
  const mainImage = pageData?.images && pageData.images.length > 0 ? pageData.images[0] : null;

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 1.5rem !important;
          margin-bottom: 4rem;
        }
        @media (min-width: 769px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            padding: 3rem !important;
          }
        }
        .content-img-wrapper {
          width: 100% !important;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .content-img-wrapper {
            max-width: 100% !important;
            margin: 0 auto !important;
          }
        }
        .portable-text p {
          margin-bottom: 1.5rem;
        }
        .portable-text p:last-child {
          margin-bottom: 0;
        }
        .portable-text a {
          color: var(--accent-red);
          text-decoration: underline;
        }
      `}</style>
      <section className="container">
        <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>
          Honours Board
        </div>
        <h1 className="page-title">{pageData?.title || 'HONOURS'}</h1>
        
        {/* Intro */}
        <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
          <p className="content-intro-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
            {pageData?.intro || 'Explore the rich history and distinguished individuals who have made lasting contributions to the Law Society RFC.'}
          </p>
        </div>

        {/* Content Area */}
        <div className="glass-panel content-grid">
          <div className="content-body-text portable-text" style={{ color: 'var(--foreground)' }}>
            {pageData?.content ? (
              <PortableText value={pageData.content} />
            ) : (
              <>
                <p style={{ marginBottom: '1.5rem' }}>
                  The Honours Board is a testament to the dedication, skill, and sportsmanship of our members over the years. From club captains to legendary players, this section commemorates those who have gone above and beyond.
                </p>
                <p>
                  Use the navigation menu to explore specific awards and historical rosters.
                </p>
              </>
            )}
          </div>
          
          <div className="content-img-wrapper" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: mainImage ? 'none' : '1px dashed rgba(255,255,255,0.2)' }}>
            {mainImage ? (
              <img 
                src={urlFor(mainImage).width(800).url()} 
                alt={mainImage.alt || 'Honours Image'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }} 
              />
            ) : (
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>IMAGE PLACEHOLDER</span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
