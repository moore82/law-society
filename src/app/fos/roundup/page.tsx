import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import InteractiveGallery from '@/components/InteractiveGallery';
import Link from 'next/link';

export const revalidate = 60;

type FosRoundupPageData = {
  title: string;
  intro: string;
  content: any;
  images: any[];
};

export default async function FosRoundupPage() {
  const data = await client.fetch<FosRoundupPageData>(
    `*[_type == "fosRoundupPage"][0]`
  );

  const mainImage = data?.images && data.images.length > 0 ? data.images[0] : null;
  const galleryImages = data?.images && data.images.length > 1 ? data.images.slice(1) : [];

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
          Festival of Sport
        </div>
        <h1 className="page-title">{data?.title || "THIS YEAR'S ROUNDUP"}</h1>
        
        {/* Intro */}
        <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
          <p className="content-intro-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
            {data?.intro || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel tristique nisl. Phasellus sagittis ex id magna hendrerit lorem ipsum solor.'}
          </p>
        </div>

        {/* Content Area */}
        <div className="glass-panel content-grid">
          <div className="content-body-text portable-text" style={{ color: 'var(--foreground)' }}>
            {data?.content ? (
              <PortableText value={data.content} />
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
                alt={mainImage.alt || 'Roundup Image'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '12px' }} 
              />
            ) : (
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>IMAGE PLACEHOLDER</span>
            )}
          </div>
        </div>

        {/* Photos Grid using the Interactive Gallery for the remaining images */}
        {galleryImages.length > 0 ? (
          <InteractiveGallery images={galleryImages} />
        ) : null}
        
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
           <Link href="/fos" className="btn-glass" style={{ padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--foreground)', textDecoration: 'none' }}>
             &larr; Back to Festival of Sport
           </Link>
        </div>
      </section>
    </main>
  );
}
