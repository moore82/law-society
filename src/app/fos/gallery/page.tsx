import { client } from '@/sanity/lib/client';
import InteractiveGallery from '@/components/InteractiveGallery';

export const revalidate = 60;

type FOSGalleryData = {
  title: string;
  images: any[];
};

export default async function FosGalleryPage() {
  const data = await client.fetch<FOSGalleryData>(
    `*[_type == "fosGalleryPage" && _id == "fosGalleryPage"][0]`
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <h1 className="page-title">{data?.title || 'FOS GALLERY'}</h1>

        {/* Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />

        {/* Gallery Grid Client Component */}
        <InteractiveGallery images={data?.images || []} />
      </section>
    </main>
  );
}
