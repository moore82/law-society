import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type Partner = {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
};

export default async function PartnersPage() {
  const partners = await client.fetch<Partner[]>(
    `*[_type == "partner" && showOnFosPage == true] | order(name asc)`
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>
          Festival of Sport
        </div>
        <h1 className="page-title">PARTNERS</h1>

        {/* Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />

        {partners.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--foreground-muted)' }}>No partners have been added for the Festival of Sport yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
            {partners.map((partner) => (
              <Link key={partner._id} href={`/fos/partners/${partner.slug.current}`} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  aspectRatio: '3/2', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'rgba(255,255,255,0.02)', 
                  padding: '1.5rem', 
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }} className="partner-card-hover">
                  <style>{`.partner-card-hover:hover { border-color: rgba(255,255,255,0.3) !important; background: rgba(255,255,255,0.05) !important; transform: translateY(-5px); }`}</style>
                  {partner.image ? (
                    <img src={urlFor(partner.image).url()} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', fontWeight: 600, textAlign: 'center' }}>{partner.name}</span>
                  )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '0.75rem', fontWeight: 600, color: 'var(--foreground)', fontSize: '0.9rem' }}>
                  {partner.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
