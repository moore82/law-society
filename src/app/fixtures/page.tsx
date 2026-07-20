import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type FixturesPageData = {
  title: string;
  intro: string;
  content: any;
  images: any[];
};

type Season = {
  _id: string;
  name: string;
  slug: { current: string };
};

export default async function FixturesPage() {
  const pageData = await client.fetch<FixturesPageData>(
    `*[_type == "fixturesPage"][0]`
  );
  
  const seasons = await client.fetch<Season[]>(
    `*[_type == "season"] | order(order desc)`
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
          Fixtures & Results
        </div>
        <h1 className="page-title">{pageData?.title || 'FIXTURES'}</h1>
        
        {/* Intro */}
        <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
          <p className="content-intro-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
            {pageData?.intro || 'Stay up to date with the latest matches and results.'}
          </p>
        </div>

        {/* Content Area */}
        <div className="glass-panel content-grid">
          <div className="content-body-text portable-text" style={{ color: 'var(--foreground)' }}>
            {pageData?.content ? (
              <PortableText value={pageData.content} />
            ) : (
              <p>
                Select a season below to view its specific fixtures and results.
              </p>
            )}
          </div>
          
          <div className="content-img-wrapper" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: mainImage ? 'none' : '1px dashed rgba(255,255,255,0.2)' }}>
            {mainImage ? (
              <img 
                src={urlFor(mainImage).width(800).url()} 
                alt={mainImage.alt || 'Fixtures Image'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }} 
              />
            ) : (
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>IMAGE PLACEHOLDER</span>
            )}
          </div>
        </div>

        {/* Seasons Table */}
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-red)' }}>All Seasons</h2>
        {seasons.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--foreground-muted)' }}>No seasons have been added yet. Add some in the Sanity Studio!</p>
          </div>
        ) : (
          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1.5rem', fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Season</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600, color: 'var(--foreground-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((season) => (
                  <tr key={season._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s ease' }} className="table-row-hover">
                    <style>{`
                      .table-row-hover:hover {
                        background-color: rgba(255,255,255,0.02);
                      }
                    `}</style>
                    <td style={{ padding: '1.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                      <Link href={`/fixtures/${season.slug.current}`} style={{ color: 'var(--foreground)' }}>
                        {season.name}
                      </Link>
                    </td>
                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                      <Link href={`/fixtures/${season.slug.current}`} style={{ color: 'var(--accent-red)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
                        View Fixtures &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
