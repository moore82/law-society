import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

export const revalidate = 60;

type Article = {
  _id: string;
  title: string;
  heroImage?: any;
  date: string;
  tags?: string[];
  content?: any;
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object (required in Next.js 15+)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const article = await client.fetch<Article | null>(
    `*[_type == "article" && slug.current == $slug][0] {
      _id, title, heroImage, date, tags, content
    }`,
    { slug }
  );

  if (!article) {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1 className="page-title">ARTICLE NOT FOUND</h1>
        <Link href="/articles" style={{ color: 'var(--accent-red)', fontWeight: 600, display: 'inline-block', marginTop: '2rem' }}>
          &larr; Back to Articles
        </Link>
      </main>
    );
  }

  const bgImageUrl = article.heroImage ? urlFor(article.heroImage).url() : '/img/hero.png';
  const formattedDate = article.date ? new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  const tag = article.tags && article.tags.length > 0 ? article.tags[0] : 'NEWS';

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: `linear-gradient(to bottom, rgba(10,3,3,0.3) 0%, rgba(10,3,3,1) 100%), url("${bgImageUrl}") center/cover no-repeat`,
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '6rem' }}>
          <div style={{ color: 'var(--accent-red)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {tag}
          </div>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 900, 
            lineHeight: 1, 
            textTransform: 'uppercase',
            marginBottom: '1rem',
            maxWidth: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#e0e0e0', fontWeight: 500 }}>
            {formattedDate}
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="container" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <Link href="/articles" style={{ color: 'var(--accent-red)', fontWeight: 600, display: 'inline-block', marginBottom: '3rem' }}>
          &larr; Back to Articles
        </Link>
        
        <div className="glass-panel" style={{ padding: '4rem', maxWidth: '900px', margin: '0 auto' }}>
          {article.content ? (
            <div className="portable-text" style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
              <PortableText value={article.content} />
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--foreground-muted)' }}>No content available for this article.</p>
          )}
        </div>
      </section>
    </main>
  );
}
