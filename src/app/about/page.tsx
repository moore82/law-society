import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import InteractiveGallery from '@/components/InteractiveGallery';

export const revalidate = 60;

type AboutPageData = {
  title: string;
  content: any;
  images: any[];
};

export default async function AboutClubPage() {
  const data = await client.fetch<AboutPageData>(
    `*[_type == "aboutPage" && _id == "aboutPage"][0]`
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        @media (max-width: 768px) {
          .gallery-intro {
            text-align: center !important;
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
        <h1 className="page-title">{data?.title || 'ABOUT THE CLUB'}</h1>

        {/* Intro Divider / Copy */}
        <div style={{ borderTop: '4px solid var(--accent-red)', borderBottom: '2px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
          <div className="gallery-intro portable-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, lineHeight: 1.5, color: 'var(--foreground)' }}>
            {data?.content ? (
              <PortableText value={data.content} />
            ) : (
              <p>Welcome to Law Society RFC. Explore our photo gallery below to see match highlights, team squad photos, and club events through the years.</p>
            )}
          </div>
        </div>

        {/* Gallery Grid Client Component */}
        <InteractiveGallery images={data?.images || []} />
      </section>
    </main>
  );
}
