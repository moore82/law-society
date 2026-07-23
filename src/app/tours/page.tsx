import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import InteractiveGallery from '@/components/InteractiveGallery';
import ToursTabs from '@/components/ToursTabs';

export const revalidate = 60;

type ToursPageData = {
  title: string;
  intro?: string;
  content: any;
  images: any[];
};

type Tour = {
  year: number;
  venues: string[];
};

export default async function ToursPage() {
  const [data, pastTours] = await Promise.all([
    client.fetch<ToursPageData>(`*[_type == "toursPage" && _id == "toursPage"][0]`),
    client.fetch<Tour[]>(`*[_type == "tour"] | order(year desc)`)
  ]);

  const mainImage = data?.images && data.images.length > 0 ? data.images[0] : null;
  const galleryImages = data?.images && data.images.length > 1 ? data.images.slice(1) : [];

  const seasonContent = (
    <div className="glass-panel content-grid" style={{ padding: '2rem', marginBottom: '3rem' }}>
      <div className="content-body-text portable-text" style={{ color: 'var(--foreground)' }}>
        {data?.content ? (
          <PortableText value={data.content} />
        ) : (
          <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--foreground-muted)' }}>
            Placeholder for Season 2026/2027 tours. Add your content in the Sanity Studio.
          </p>
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
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 1.5rem !important;
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

        <ToursTabs seasonContent={seasonContent} pastToursData={pastTours} />

        {galleryImages.length > 0 ? (
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Tour Gallery</h2>
            <InteractiveGallery images={galleryImages} />
          </div>
        ) : null}
      </section>
    </main>
  );
}
