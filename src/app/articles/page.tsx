import Link from "next/link";
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: any;
  date: string;
  tags?: string[];
  content?: any;
};

export default async function ArticlesPage() {
  // Fetch Featured Editorial Article
  const featuredEditorial = await client.fetch<Article | null>(`
    *[_type == "article" && isFeaturedEditorial == true] | order(date desc)[0] {
      _id, title, slug, heroImage, content, date
    }
  `);

  // Fetch all other articles
  const otherArticlesQuery = featuredEditorial 
    ? `*[_type == "article" && _id != $featuredId] | order(date desc) {
        _id, title, slug, heroImage, date, tags
      }`
    : `*[_type == "article"] | order(date desc) {
        _id, title, slug, heroImage, date, tags
      }`;
      
  const otherArticles = await client.fetch<Article[]>(
    otherArticlesQuery,
    featuredEditorial ? { featuredId: featuredEditorial._id } : {}
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>
          News & Updates
        </div>
        <h1 className="page-title">LATEST ARTICLES</h1>
        
        {/* Intro Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '4rem' }}></div>

        {/* FEATURE SECTION */}
        {featuredEditorial && (
          <div className="glass-panel grid-2" style={{ overflow: 'hidden', marginBottom: '4rem' }}>
            <div style={{ position: 'relative', minHeight: '400px', background: '#0a1714' }}>
              <img 
                src={featuredEditorial.heroImage ? urlFor(featuredEditorial.heroImage).url() : "/img/feature.png"} 
                alt={featuredEditorial.title} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Featured Editorial
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', lineHeight: 1.1 }}>
                {featuredEditorial.title}
              </h2>
              <div className="text-muted portable-text" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {featuredEditorial.content ? (
                  <PortableText value={featuredEditorial.content} />
                ) : null}
              </div>
              <div>
                <Link href={`/articles/${featuredEditorial.slug.current}`} className="btn-glass" style={{ padding: '0.75rem 2rem', fontSize: '0.9rem' }}>
                  READ FULL ARTICLE
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* OTHER ARTICLES GRID */}
        {otherArticles && otherArticles.length > 0 ? (
          <div className="grid-responsive-3">
            {otherArticles.map((article) => {
              const imgUrl = article.heroImage ? urlFor(article.heroImage).url() : '/img/placeholder.png';
              const formattedDate = article.date ? new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
              const tag = article.tags && article.tags.length > 0 ? article.tags[0] : 'NEWS';
              
              return (
                <div key={article._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '200px', background: `url(${imgUrl}) center/cover no-repeat` }}>
                    <div style={{
                      position: 'absolute', top: '15px', left: '15px',
                      background: 'var(--accent-red)', color: '#000',
                      padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 800, borderRadius: '4px', textTransform: 'uppercase'
                    }}>
                      {tag}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase' }}>{article.title}</h3>
                    <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{formattedDate}</p>
                    <Link href={`/articles/${article.slug.current}`} style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600, marginTop: 'auto' }}>
                      READ MORE ▾
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !featuredEditorial && (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--foreground-muted)' }}>No articles have been added yet.</p>
            </div>
          )
        )}
      </section>
    </main>
  );
}
