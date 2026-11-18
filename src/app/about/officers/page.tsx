import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type OfficersPageData = {
  title: string;
  intro: string;
};

type OfficerData = {
  name: string;
  role: string;
  season: string;
  image: any;
};

function formatSeason(season: string): string {
  if (!season) return season;
  if (season.includes('2017') && season.includes('2078')) return '2017/2018';
  const clean = season.trim();
  const match = clean.match(/^(\d{4})\s*[-/]\s*(\d{2,4})$/);
  if (match) {
    const y1 = parseInt(match[1], 10);
    let y2 = parseInt(match[2], 10);
    if (match[2].length === 2) {
      const century = y1 < 2000 ? 1900 : 2000;
      y2 = century + y2;
      if (y2 < y1) y2 += 100;
    }
    return `${y1}/${y2}`;
  }
  return clean;
}

export default async function OfficersPage() {
  const pageData = await client.fetch<OfficersPageData>(
    `*[_type == "officersPage"][0] { title, intro }`
  );
  
  const officers = await client.fetch<OfficerData[]>(
    `*[_type == "officer"]`
  );

  // Group by season
  const seasonsMap: Record<string, Record<string, OfficerData>> = {};
  
  officers.forEach(officer => {
    if (!officer.season) return;
    const seasonKey = formatSeason(officer.season);
    if (!seasonsMap[seasonKey]) {
      seasonsMap[seasonKey] = {};
    }
    const roleKey = officer.role === 'Hon Secretary' ? 'Honorary Secretary' : officer.role;
    seasonsMap[seasonKey][roleKey] = officer;
  });

  // Sort seasons descending (e.g. 2026/2027 > 1965/1966)
  const sortedSeasons = Object.keys(seasonsMap).sort((a, b) => {
    const yearA = parseInt(a.substring(0, 4), 10);
    const yearB = parseInt(b.substring(0, 4), 10);
    return yearB - yearA;
  });

  const columns = ['President', 'Chairman', 'Honorary Secretary', 'Treasurer', 'Fixtures Secretary'];

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
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
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.85rem;
        }
        .officer-table th {
          font-weight: 700;
          color: var(--accent-red);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
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
          gap: 0.5rem;
          min-width: 120px;
        }
        .officer-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .officer-name {
          font-weight: 500;
          font-size: 0.85rem;
        }
        .season-col {
          font-weight: 700;
          white-space: nowrap;
          color: var(--foreground);
          font-size: 0.85rem;
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
        {pageData?.intro && (
          <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
            <p className="content-intro-text" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 500, lineHeight: 1.6, color: 'var(--foreground)', whiteSpace: 'pre-line' }}>
              {pageData.intro}
            </p>
          </div>
        )}

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
