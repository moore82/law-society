import Link from 'next/link';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type Fixture = {
  _id: string;
  date: string;
  opponent: string;
  ourTeam?: string;
  venue?: string;
  location: string;
  competition: string;
  homeScore: number;
  awayScore: number;
  isResult: boolean;
};

type Season = {
  name: string;
  slug: { current: string };
};

export default async function DynamicFixturesPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object (required in Next.js 15+)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Fetch the current season to get its name
  const season = await client.fetch<Season | null>(
    `*[_type == "season" && slug.current == $slug][0]`,
    { slug }
  );

  if (!season) {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1 className="page-title">SEASON NOT FOUND</h1>
      </main>
    );
  }

  // Fetch fixtures for this specific season
  const fixtures = await client.fetch<Fixture[]>(
    `*[_type == "fixture" && season->slug.current == $slug] | order(date asc)`,
    { slug }
  );

  const upcoming = fixtures.filter(f => !f.isResult);
  const results = fixtures.filter(f => f.isResult).reverse(); // Most recent results first

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/fixtures" style={{ color: 'var(--accent-red)', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
            &larr; Back to Seasons
          </Link>
          <h1 className="page-title">{season.name} FIXTURES</h1>
        </div>
        
        {fixtures.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--foreground-muted)' }}>No fixtures have been added for this season yet. Add some in the Sanity Studio!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            
            {/* Upcoming Fixtures */}
            {upcoming.length > 0 && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--accent-red)' }}>Upcoming Fixtures</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {upcoming.map((fixture) => {
                    const homeTeam = fixture.venue === 'Away' ? fixture.opponent : `Law Society ${fixture.ourTeam || ''}`.trim();
                    const awayTeam = fixture.venue === 'Away' ? `Law Society ${fixture.ourTeam || ''}`.trim() : fixture.opponent;

                    return (
                      <div key={fixture._id} className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <div style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            {new Date(fixture.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                            {homeTeam} vs {awayTeam}
                          </div>
                          <div style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                            {fixture.competition && <span style={{ marginRight: '1rem' }}>🏆 {fixture.competition}</span>}
                            {fixture.location && <span>📍 {fixture.location}</span>}
                          </div>
                        </div>
                        <div style={{ backgroundColor: 'var(--accent-red)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: 600 }}>
                          {new Date(fixture.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} KO
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--foreground)' }}>Latest Results</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {results.map((fixture) => {
                    const homeTeam = fixture.venue === 'Away' ? fixture.opponent : `Law Society ${fixture.ourTeam || ''}`.trim();
                    const awayTeam = fixture.venue === 'Away' ? `Law Society ${fixture.ourTeam || ''}`.trim() : fixture.opponent;

                    return (
                      <div key={fixture._id} className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8, gap: '0.75rem' }}>
                        {/* Result Row */}
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', width: '100%', maxWidth: '800px', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 600, textAlign: 'right', flex: 1 }}>{homeTeam}</span>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-red)' }}>{fixture.homeScore ?? 0}</span>
                            <span style={{ color: 'var(--foreground-muted)' }}>-</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-red)' }}>{fixture.awayScore ?? 0}</span>
                          </div>
                          <span style={{ fontSize: '1.25rem', fontWeight: 600, textAlign: 'left', flex: 1 }}>{awayTeam}</span>
                        </div>
                        {/* Extra Info Underneath */}
                        <div style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>
                          {new Date(fixture.date).toLocaleDateString('en-GB')} 
                          {fixture.competition ? ` • ${fixture.competition}` : ''}
                          {fixture.location ? ` • ${fixture.location}` : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}
      </section>
    </main>
  );
}
