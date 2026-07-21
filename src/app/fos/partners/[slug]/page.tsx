import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type Partner = {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
  email?: string;
  phone?: string;
  description?: any;
};

export default async function PartnerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object (required in Next.js 15+)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const partner = await client.fetch<Partner | null>(
    `*[_type == "partner" && slug.current == $slug][0]`,
    { slug }
  );

  if (!partner) {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1 className="page-title">PARTNER NOT FOUND</h1>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/fos/partners" style={{ color: 'var(--accent-red)', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
            &larr; Back to Partners
          </Link>
          <h1 className="page-title">{partner.name}</h1>
        </div>
        
        {/* Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="partner-detail-grid">
          <style>{`
            @media (min-width: 769px) {
              .partner-detail-grid {
                grid-template-columns: 1fr 2fr;
                gap: 4rem !important;
              }
            }
            .portable-text p {
              margin-bottom: 1.5rem;
              line-height: 1.8;
            }
            .portable-text p:last-child {
              margin-bottom: 0;
            }
            .portable-text a {
              color: var(--accent-red);
              text-decoration: underline;
            }
          `}</style>

          {/* Left Column (Contact Info + Logo) */}
          <div>
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Logo */}
              {partner.image && (
                <div style={{ flexShrink: 0, width: '100px', height: '100px', background: '#ffffff', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={urlFor(partner.image).url()} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
              )}

              {/* Contact Info */}
              <div style={{ flexGrow: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--accent-red)' }}>Contact Information</h3>
                
                {partner.email && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--foreground-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Email</span>
                    <a href={`mailto:${partner.email}`} style={{ color: 'var(--foreground)', fontWeight: 500 }}>{partner.email}</a>
                  </div>
                )}
                
                {partner.phone && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--foreground-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Phone</span>
                    <a href={`tel:${partner.phone}`} style={{ color: 'var(--foreground)', fontWeight: 500 }}>{partner.phone}</a>
                  </div>
                )}

                {!partner.email && !partner.phone && (
                  <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>No contact information provided.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (Description) */}
          <div>
            <div className="glass-panel" style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2rem', color: '#ffffff' }}>About {partner.name}</h2>
              
              <div className="portable-text" style={{ color: 'var(--foreground)', fontSize: '1.1rem' }}>
                {partner.description ? (
                  <PortableText value={partner.description} />
                ) : (
                  <p style={{ color: 'var(--foreground-muted)' }}>No description provided for this partner yet.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
