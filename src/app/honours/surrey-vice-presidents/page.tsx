import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

export const revalidate = 60;

type VicePresident = {
  _id: string;
  yearAwarded: number;
  lawman: string;
};

type PageData = {
  title: string;
  content: any;
};

export default async function SurreyVicePresidentsPage() {
  const [pageData, vps] = await Promise.all([
    client.fetch<PageData>(`*[_type == "surreyVicePresidentsPage"][0]`),
    client.fetch<VicePresident[]>(`*[_type == "surreyVicePresident"] | order(yearAwarded desc, lawman asc)`)
  ]);

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <Link href="/honours" style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>
              &larr; Back to Honours Board
            </Link>
            <h1 className="page-title">{pageData?.title || 'Vice Presidents of Surrey Rugby'}</h1>
          </div>
        </div>
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '4rem' }}></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
          <div className="glass-panel" style={{ padding: '3rem' }}>
            {pageData?.content ? (
              <div className="portable-text" style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
                <PortableText value={pageData.content} />
              </div>
            ) : (
              <p style={{ color: 'var(--foreground-muted)', fontStyle: 'italic' }}>
                Placeholder text for the Vice Presidents of Surrey Rugby.
              </p>
            )}
          </div>

          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              The Roll of Honour
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {vps.map((vp) => (
                <div key={vp._id} style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '1.5rem', 
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{vp.lawman}</span>
                  <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>{vp.yearAwarded}</span>
                </div>
              ))}
              
              {vps.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--foreground-muted)' }}>
                  No Vice Presidents found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
