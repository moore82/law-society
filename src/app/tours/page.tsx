import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import InteractiveGallery from '@/components/InteractiveGallery';

export const revalidate = 60;

type ToursPageData = {
  title: string;
  intro?: string;
  content: any;
  images: any[];
};

export default async function ToursPage() {
  const data = await client.fetch<ToursPageData>(
    `*[_type == "toursPage" && _id == "toursPage"][0]`
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
        <h1 className="page-title">{data?.title || 'TOURS'}</h1>
        
        {/* Intro */}
        <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
          <p className="content-intro-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
            {data?.intro || 'Explore our club tours history, photo gallery, and memorable highlights through the years.'}
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
                  Add your tours content in the Sanity Studio! This layout will automatically update to display the rich text you provide.
                </p>
              </>
            )}
          </div>
          
          <div className="content-img-wrapper" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: mainImage ? 'none' : '1px dashed rgba(255,255,255,0.2)' }}>
            {mainImage ? (
              <img 
                src={urlFor(mainImage).width(800).url()} 
                alt={mainImage.alt || 'Tours Image'} 
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
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map(i => (
               <div key={i} className="glass-panel" style={{ aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.2)', padding: 0 }}>
                 <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>PHOTO {i}</span>
               </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
