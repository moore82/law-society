import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type OfficersPageData = {
  title: string;
  intro: string;
  content: any;
  images: any[];
};

type OfficerData = {
  name: string;
  role: string;
  image: any;
};

export default async function OfficersPage() {
  const pageData = await client.fetch<OfficersPageData>(
    `*[_type == "officersPage"][0]`
  );
  
  const officers = await client.fetch<OfficerData[]>(
    `*[_type == "officer"] | order(order asc)`
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
        .officer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 2rem;
        }
      `}</style>
      <section className="container">
        <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>
          About the Club
        </div>
        <h1 className="page-title">{pageData?.title || 'OFFICERS OF THE CLUB'}</h1>
        
        {/* Intro */}
        <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
          <p className="content-intro-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
            {pageData?.intro || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel tristique nisl. Phasellus sagittis ex id magna hendrerit lorem ipsum solor.'}
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                </p>
              </>
            )}
          </div>
          
          <div className="content-img-wrapper" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: mainImage ? 'none' : '1px dashed rgba(255,255,255,0.2)' }}>
            {mainImage ? (
              <img 
                src={urlFor(mainImage).width(800).url()} 
                alt={mainImage.alt || 'Officers Image'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }} 
              />
            ) : (
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>IMAGE PLACEHOLDER</span>
            )}
          </div>
        </div>

        {/* Officers Grid */}
        <div className="officer-grid">
          {officers.length > 0 ? (
            officers.map((officer, i) => (
              <div key={i} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {officer.image ? (
                    <img 
                      src={urlFor(officer.image).width(400).height(400).url()} 
                      alt={officer.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  ) : (
                    <span style={{ color: 'var(--foreground-muted)', fontSize: '0.8rem' }}>NO PHOTO</span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--foreground)', textTransform: 'uppercase' }}>
                  {officer.name}
                </h3>
                <p style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  {officer.role}
                </p>
              </div>
            ))
          ) : (
            // Empty State Placeholders
            [1, 2, 3, 4].map(i => (
              <div key={i} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.2)' }}>
                   <span style={{ color: 'var(--foreground-muted)', fontSize: '0.8rem' }}>PHOTO {i}</span>
                </div>
                <div style={{ width: '60%', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                <div style={{ width: '40%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
