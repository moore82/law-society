import { client } from '@/sanity/lib/client';
import InteractiveGallery from '@/components/InteractiveGallery';

export const revalidate = 60;

type GalleryPageData = {
  title: string;
  intro?: string;
  images: any[];
};

export default async function MainGalleryPage() {
  const data = await client.fetch<GalleryPageData>(
    `*[_type == "galleryPage" && _id == "galleryPage"][0]`
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        @media (max-width: 768px) {
          .gallery-intro {
            text-align: center !important;
          }
        }
      `}</style>
      <section className="container">
        <h1 className="page-title">{data?.title || 'GALLERY'}</h1>

        {/* Intro Divider */}
        {data?.intro ? (
          <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
            <p className="gallery-intro" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
              {data.intro}
            </p>
          </div>
        ) : (
          <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />
        )}

        {/* Gallery Grid Client Component */}
        <InteractiveGallery images={data?.images || []} />
      </section>
    </main>
  );
}
