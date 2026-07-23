import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

export const revalidate = 60;

type PageData = {
  title: string;
  content: any;
};

export default async function Page() {
  const data = await client.fetch<PageData>(
    `*[_type == "sitemapPage" && _id == "sitemapPage"][0]`
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <h1 className="page-title">{data?.title || 'PAGE NOT FOUND'}</h1>
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '4rem' }}></div>
        
        <div className="glass-panel" style={{ padding: '4rem', maxWidth: '900px', margin: '0 auto' }}>
          {data?.content ? (
            <div className="portable-text" style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
              <PortableText value={data.content} />
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--foreground-muted)' }}>
              <p>This page is currently being updated.</p>
              <Link href="/" style={{ color: 'var(--accent-red)', marginTop: '2rem', display: 'inline-block' }}>
                &larr; Return Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
