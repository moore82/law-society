import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type Fixture = {
  _id: string;
  date: string;
  opponent: string;
  location: string;
  competition: string;
  homeScore: number;
  awayScore: number;
  isResult: boolean;
};

export default async function FixturesPage() {
  const fixtures = await client.fetch<Fixture[]>(
    `*[_type == "fixture"] | order(date asc)`
  );

  const upcoming = fixtures.filter(f => !f.isResult);
  const results = fixtures.filter(f => f.isResult).reverse(); // Most recent results first

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <h1 className="page-title">FIXTURES & RESULTS</h1>
        
        {fixtures.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--foreground-muted)' }}>No fixtures have been added yet. Add some in the Sanity Studio!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            
            {/* Upcoming Fixtures */}
            {upcoming.length > 0 && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--accent-red)' }}>Upcoming Fixtures</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {upcoming.map((fixture) => (
                    <div key={fixture._id} className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                          {new Date(fixture.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>vs {fixture.opponent}</div>
                        <div style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                          {fixture.competition && <span style={{ marginRight: '1rem' }}>🏆 {fixture.competition}</span>}
                          {fixture.location && <span>📍 {fixture.location}</span>}
                        </div>
                      </div>
                      <div style={{ backgroundColor: 'var(--accent-red)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: 600 }}>
                        {new Date(fixture.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} KO
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--foreground)' }}>Latest Results</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {results.map((fixture) => (
                    <div key={fixture._id} className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8, flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>vs {fixture.opponent}</div>
                        <div style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          {new Date(fixture.date).toLocaleDateString('en-GB')} {fixture.competition ? `• ${fixture.competition}` : ''}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{fixture.homeScore}</span>
                        <span style={{ color: 'var(--foreground-muted)' }}>-</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{fixture.awayScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </section>
    </main>
  );
}
