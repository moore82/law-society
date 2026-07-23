import Link from "next/link";
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

// Type definitions based on our schemas
type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: any;
  date: string;
  tags?: string[];
  content?: any;
};

type HomePageData = {
  heroBackgroundImage?: any;
  heroLine1: string;
  heroLine2: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: any;
  featuredArticles?: Article[];
  ctaOverline?: string;
  ctaTitle?: string;
  joinTheClubText?: any;
  ctaButtonText?: string;
  ctaButtonLink?: string;
};

type Fixture = {
  _id: string;
  date: string;
  competition?: string;
  opponent: string;
  location?: string;
  venue?: string;
};

type Partner = {
  _id: string;
  name: string;
  image: any;
  slug: { current: string };
};

export default async function Home() {
  // Fetch Homepage Document & related articles
  const homeData = await client.fetch<HomePageData>(`
    *[_type == "homePage"][0] {
      heroBackgroundImage,
      heroLine1,
      heroLine2,
      heroSubtitle,
      aboutTitle,
      aboutText,
      featuredArticles[]->{ _id, title, slug, heroImage, date, tags },
      ctaOverline,
      ctaTitle,
      joinTheClubText,
      ctaButtonText,
      ctaButtonLink
    }
  `);

  // Fetch Featured Editorial Article
  const featuredEditorial = await client.fetch<Article>(`
    *[_type == "article" && isFeaturedEditorial == true][0] {
      _id, title, slug, heroImage, content
    }
  `);

  // Fetch Upcoming Fixtures for the current season
  // date >= now() isn't purely supported in standard GROQ without string comparison that can be tricky, 
  // but date > now() works if datetime strings are ISO 8601
  const upcomingFixtures = await client.fetch<Fixture[]>(`
    *[_type == "fixture" && season->isCurrentSeason == true && date >= now()] | order(date asc)[0...6] {
      _id, date, competition, opponent, location, venue
    }
  `);

  // Fetch the current season to construct the view all link
  const currentSeason = await client.fetch<{ slug: { current: string } } | null>(`
    *[_type == "season" && isCurrentSeason == true][0] { slug }
  `);

  // Fetch Partners featured on the homepage
  const partners = await client.fetch<Partner[]>(`
    *[_type == "partner" && showOnHomePage == true] {
      _id, name, image, slug
    }
  `);

  const bgImageUrl = homeData?.heroBackgroundImage 
    ? urlFor(homeData.heroBackgroundImage).url() 
    : '/img/hero.png';

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: `linear-gradient(to bottom, rgba(10,3,3,0.2) 0%, rgba(10,3,3,1) 100%), url("${bgImageUrl}") center/cover no-repeat`,
      }}>
        <h1 className="hero-h1" style={{
          fontSize: 'clamp(3.5rem, 8vw, 6rem)',
          fontWeight: 900,
          color: 'var(--accent-red)',
          textTransform: 'uppercase',
          letterSpacing: '-1px',
          lineHeight: 1.1,
          marginBottom: '1rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)'
        }}>
          {homeData?.heroLine1 || 'LAW SOCIETY'}<br />
          <span style={{ color: '#fff' }}>{homeData?.heroLine2 || 'RUGBY CLUB'}</span>
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#e0e0e0',
          marginBottom: '2.5rem',
          fontWeight: 600,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          {homeData?.heroSubtitle || 'Speed, Strategy, Spirit. Join the Elite.'}
        </p>
      </section>

      {/* INTRO & HIGHLIGHTS */}
      <section className="container" style={{ position: 'relative', zIndex: 10, marginTop: '-3rem', paddingBottom: '6rem' }}>
        <div className="grid-responsive-intro">

          {/* Intro Left */}
          <div>
            <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>Intro</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              {homeData?.aboutTitle || 'ABOUT OUR CLUB'}
            </h2>
            <div className="text-muted portable-text" style={{ fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {homeData?.aboutText ? (
                <PortableText value={homeData.aboutText} />
              ) : (
                <p>Welcome to Law Society RFC, celebrating elite rugby with speed, skill, and unparalleled community.</p>
              )}
            </div>
            <Link href="/about" className="btn-glass" style={{ padding: '0.5rem 1.5rem' }}>LEARN MORE</Link>
          </div>

          {/* Highlights Right */}
          {homeData?.featuredArticles && homeData.featuredArticles.length > 0 && (
            <div className="grid-responsive-3">
              {homeData.featuredArticles.map((article) => {
                const imgUrl = article.heroImage ? urlFor(article.heroImage).url() : '/img/placeholder.png';
                const formattedDate = article.date ? new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                const tag = article.tags && article.tags.length > 0 ? article.tags[0] : 'NEWS';
                
                return (
                  <div key={article._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '140px', background: `url(${imgUrl}) center/cover no-repeat` }}>
                      <div style={{
                        position: 'absolute', top: '10px', left: '10px',
                        background: 'var(--accent-red)', color: '#000',
                        padding: '0.2rem 0.5rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', textTransform: 'uppercase'
                      }}>
                        {tag}
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{article.title}</h3>
                      <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>{formattedDate}</p>
                      <Link href={`/articles/${article.slug.current}`} style={{ color: 'var(--accent-red)', fontSize: '0.8rem', fontWeight: 600, marginTop: 'auto' }}>
                        READ MORE ▾
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FEATURE SECTION */}
      {featuredEditorial && (
        <section className="container" style={{ paddingBottom: '6rem' }}>
          <div className="glass-panel grid-2" style={{ overflow: 'hidden' }}>
            <div style={{ position: 'relative', minHeight: '400px', background: '#0a1714' }}>
              <img 
                src={featuredEditorial.heroImage ? urlFor(featuredEditorial.heroImage).url() : "/img/feature.png"} 
                alt={featuredEditorial.title} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Editorial</div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', lineHeight: 1.1 }}>
                {featuredEditorial.title}
              </h2>
              {/* Note: In a real app we might want to extract just the first paragraph of PortableText here or add an excerpt field */}
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
        </section>
      )}

      {/* UPCOMING FIXTURES */}
      {upcomingFixtures && upcomingFixtures.length > 0 && (
        <section className="container" style={{ paddingBottom: '6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>UPCOMING FIXTURES</h2>
            <Link href={currentSeason?.slug?.current ? `/fixtures/${currentSeason.slug.current}` : "/fixtures"} style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.2s', paddingBottom: '0.5rem' }}>
              VIEW ALL <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
            </Link>
          </div>
          <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Date/Time</th>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Tournament/League</th>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Opponent</th>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {upcomingFixtures.map((fixture, i) => {
                  const fixtureDate = new Date(fixture.date);
                  const formattedDate = fixtureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() + ', ' + fixtureDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                  
                  return (
                    <tr key={fixture._id} style={{ borderBottom: i < upcomingFixtures.length - 1 ? '1px solid var(--border-glass)' : 'none' }}>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', minWidth: '130px' }}>{formattedDate}</td>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', minWidth: '150px' }}>{fixture.competition || 'Friendly'}</td>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', minWidth: '150px' }}>{fixture.opponent}</td>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', color: 'var(--foreground-muted)', minWidth: '150px' }}>
                        {fixture.venue === 'Away' ? '@ ' : ''}{fixture.location || fixture.venue}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SPONSORS SECTION */}
      {partners && partners.length > 0 && (
        <section className="container" style={{ paddingBottom: '6rem' }}>
          <div className={`glass-panel ${partners.length > 3 ? 'marquee-container' : ''}`} style={{
            padding: '2.5rem 0', // Changed to 0 so marquee goes edge to edge
            display: partners.length <= 3 ? 'flex' : 'block',
            justifyContent: 'center',
          }}>
            <div className={partners.length > 3 ? 'marquee-content' : ''} style={{ 
              display: 'flex', 
              gap: '4rem', 
              paddingLeft: partners.length > 3 ? '4rem' : '0',
              justifyContent: 'center',
            }}>
              {/* Render twice for seamless looping only if we have enough partners */}
              {(partners.length > 3 ? [...partners, ...partners] : partners).map((sponsor, idx) => (
                <Link
                  key={`${sponsor._id}-${idx}`}
                  href={sponsor.slug?.current ? `/fos/partners/${sponsor.slug.current}` : '#'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '120px',
                    height: '60px',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.6,
                    transition: 'all 0.3s ease'
                  }}
                  className="sponsor-link"
                >
                  <img
                    src={sponsor.image ? urlFor(sponsor.image).url() : ''}
                    alt={`${sponsor.name} logo`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div className="glass-panel" style={{
          position: 'relative', overflow: 'hidden', padding: '5rem 2rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          background: `linear-gradient(to right, rgba(10,3,3,0.9), rgba(10,3,3,0.7)), url("${bgImageUrl}") center/cover`
        }}>
          <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '1px' }}>
            {homeData?.ctaOverline || 'JOIN THE CLUB'}
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {homeData?.ctaTitle ? (
              <span dangerouslySetInnerHTML={{ __html: homeData.ctaTitle.replace(/\n/g, '<br />') }} />
            ) : (
              <>BE PART OF THE<br />CLUB LEGACY</>
            )}
          </h2>
          <div className="portable-text" style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '2.5rem', maxWidth: '600px' }}>
            {homeData?.joinTheClubText ? (
              <PortableText value={homeData.joinTheClubText} />
            ) : (
              <p>Welcome to Law Society RFC, celebrating elite rugby with speed, skill, and unparalleled community.</p>
            )}
          </div>
          <Link href={homeData?.ctaButtonLink || '/contact'} className="btn-glass" style={{ padding: '1rem 3rem', fontSize: '1rem' }}>
            {homeData?.ctaButtonText || 'JOIN THE LSRFC FAMILY'}
          </Link>
        </div>
      </section>
    </main>
  );
}
