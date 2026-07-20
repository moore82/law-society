import { client } from '@/sanity/lib/client';

export const revalidate = 60; // Revalidate every 60 seconds

type Honour = {
  _id: string;
  year: string;
  awardName: string;
  recipient: string;
};

export default async function HonoursPage() {
  const honours = await client.fetch<Honour[]>(
    `*[_type == "honour"] | order(year desc, awardName asc)`
  );

  // Group by year
  const groupedHonours = honours.reduce((acc, honour) => {
    if (!acc[honour.year]) acc[honour.year] = [];
    acc[honour.year].push(honour);
    return acc;
  }, {} as Record<string, Honour[]>);

  const years = Object.keys(groupedHonours).sort().reverse();

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <h1 className="page-title">HONOURS</h1>
        
        {years.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--foreground-muted)' }}>No honours have been added yet. Add some in the Sanity Studio!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {years.map((year) => (
              <div key={year} className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-red)' }}>{year} Season</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {groupedHonours[year].map((honour) => (
                    <div key={honour._id} style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{honour.awardName}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{honour.recipient}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
