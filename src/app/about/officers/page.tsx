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
  season: string;
  image: any;
};

export default async function OfficersPage() {
  const pageData = await client.fetch<OfficersPageData>(
    `*[_type == "officersPage"][0]`
  );
  
  const officers = await client.fetch<OfficerData[]>(
    `*[_type == "officer"]`
  );

  const mainImage = pageData?.images && pageData.images.length > 0 ? pageData.images[0] : null;

  // Group by season
  const seasonsMap: Record<string, Record<string, OfficerData>> = {};
  
  officers.forEach(officer => {
    if (!officer.season) return;
    if (!seasonsMap[officer.season]) {
      seasonsMap[officer.season] = {};
    }
    seasonsMap[officer.season][officer.role] = officer;
  });

  // Sort seasons descending (e.g. 2026/2027 > 1965-66)
  const sortedSeasons = Object.keys(seasonsMap).sort((a, b) => {
    const yearA = parseInt(a.substring(0, 4));
    const yearB = parseInt(b.substring(0, 4));
    return yearB - yearA;
  });

  const columns = ['President', 'Chairman', 'Hon Secretary', 'Treasurer', 'Fixtures Secretary'];

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
        
        /* Table Styles */
        .officer-table-container {
          overflow-x: auto;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          margin-top: 2rem;
        }
        .officer-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          color: var(--foreground);
        }
        .officer-table th, .officer-table td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .officer-table th {
          font-weight: 700;
          color: var(--accent-red);
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 1px;
          white-space: nowrap;
          background: rgba(0,0,0,0.2);
        }
        .officer-table tr:hover {
          background: rgba(255,255,255,0.02);
        }
        .officer-table td {
          vertical-align: middle;
        }
        .officer-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 160px;
        }
        .officer-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .officer-name {
          font-weight: 500;
          font-size: 0.95rem;
        }
        .season-col {
          font-weight: 700;
          white-space: nowrap;
          color: var(--foreground);
        }
        .empty-cell {
          color: rgba(255,255,255,0.2);
          font-size: 0.9rem;
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

        {/* Officers Table */}
        <div className="officer-table-container">
          <table className="officer-table">
            <thead>
              <tr>
                <th>Season</th>
                {columns.map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedSeasons.map(season => {
                const roles = seasonsMap[season];
                return (
                  <tr key={season}>
                    <td className="season-col">{season}</td>
                    {columns.map(col => {
                      const officer = roles[col];
                      return (
                        <td key={col}>
                          {officer ? (
                            <div className="officer-cell">
                              {officer.image ? (
                                <img 
                                  src={urlFor(officer.image).width(64).height(64).url()} 
                                  alt={officer.name} 
                                  className="officer-avatar" 
                                />
                              ) : null}
                              <span className="officer-name">{officer.name}</span>
                            </div>
                          ) : (
                            <span className="empty-cell">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
