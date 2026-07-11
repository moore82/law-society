import Link from "next/link";

export default function Home() {
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
        background: 'linear-gradient(to bottom, rgba(10,3,3,0.2) 0%, rgba(10,3,3,1) 100%), url("/img/hero.png") center/cover no-repeat',
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
          LAW SOCIETY RFC<br />
          <span style={{ color: '#fff' }}>RUGBY CLUB</span>
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#e0e0e0',
          marginBottom: '2.5rem',
          fontWeight: 600,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          Speed, Strategy, Spirit. Join the Elite.
        </p>
        <button className="btn-glass">
          EXPLORE THE CLUB
        </button>
      </section>

      {/* INTRO & HIGHLIGHTS */}
      <section className="container" style={{ position: 'relative', zIndex: 10, marginTop: '-3rem', paddingBottom: '6rem' }}>
        <div className="grid-responsive-intro">

          {/* Intro Left */}
          <div>
            <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>Intro</div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              ABOUT OUR CLUB
            </h2>
            <p className="text-muted" style={{ fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Welcome to Law Society RFC, celebrating elite rugby with speed, skill, and unparalleled community.
            </p>
            <button className="btn-glass" style={{ padding: '0.5rem 1.5rem' }}>LEARN MORE</button>
          </div>

          {/* Highlights Right */}
          <div className="grid-responsive-3">
            {[
              { tag: 'TOURNEY VICTORY', title: 'LSRFC LIFT TROPHY!', date: 'Aug 17, 2026', img: '/img/trophy.png' },
              { tag: 'COACHING TEAM', title: 'NEW HEAD COACH ANNOUNCED', date: 'Aug 15, 2026', img: '/img/coach.png' },
              { tag: 'ACADEMY GROWTH', title: 'TALENT DEVELOPMENT EXPANDS', date: 'Aug 10, 2026', img: 'https://images.unsplash.com/photo-1522778147829-047360bdc7f6?auto=format&fit=crop&q=80&w=600' }
            ].map((item, i) => (
              <div key={i} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '140px', background: `url(${item.img}) center/cover no-repeat` }}>
                  <div style={{
                    position: 'absolute', top: '10px', left: '10px',
                    background: 'var(--accent-red)', color: '#000',
                    padding: '0.2rem 0.5rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px'
                  }}>
                    {item.tag}
                  </div>
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{item.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>{item.date}</p>
                  <Link href="#" style={{ color: 'var(--accent-red)', fontSize: '0.8rem', fontWeight: 600, marginTop: 'auto' }}>
                    READ MORE ▾
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div className="glass-panel grid-2" style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', minHeight: '400px', background: '#0a1714' }}>
            <img src="/img/feature.png" alt="Feature Article" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Editorial</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', lineHeight: 1.1 }}>
              THE EVOLUTION OF<br />LSRFC SEVENS
            </h2>
            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Since our founding, the club has transformed from a passionate group of weekend warriors into a highly tuned athletic machine. This deep-dive editorial explores the grueling training regimes, the tactical innovations on the pitch, and the unwavering camaraderie that binds the squad together through victory and defeat.
            </p>
            <div>
              <Link href="#" className="btn-glass" style={{ padding: '0.75rem 2rem', fontSize: '0.9rem' }}>
                READ FULL ARTICLE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING FIXTURES */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>UPCOMING FIXTURES</h2>
          <Link href="#" style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'opacity 0.2s', paddingBottom: '0.5rem' }}>
            VIEW ALL <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
          </Link>
        </div>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <div className="fixtures-table-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Date/Time</th>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Tournament</th>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Opponent</th>
                  <th style={{ padding: '1rem', color: 'var(--foreground-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < 2 ? '1px solid var(--border-glass)' : 'none' }}>
                    <td style={{ padding: '1rem', fontSize: '0.95rem', minWidth: '130px' }}>AUG 17, 14:00</td>
                    <td style={{ padding: '1rem', fontSize: '0.95rem', minWidth: '150px' }}>LONDON SEVENS</td>
                    <td style={{ padding: '1rem', fontSize: '0.95rem', minWidth: '150px' }}>CITY LIONS</td>
                    <td style={{ padding: '1rem', fontSize: '0.95rem', color: 'var(--foreground-muted)', minWidth: '150px' }}>@ TWICKENHAM</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SPONSORS SECTION */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div className="glass-panel" style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '2.5rem 2rem',
          flexWrap: 'wrap',
          gap: '3rem'
        }}>
          {[
            { name: 'Adidas', logo: '/img/sponsors/adidas.svg', url: 'https://www.adidas.com' },
            { name: 'Red Bull', logo: '/img/sponsors/redbull.svg', url: 'https://www.redbull.com' },
            { name: 'Puma', logo: '/img/sponsors/puma.svg', url: 'https://www.puma.com' },
            { name: 'Adidas2', logo: '/img/sponsors/adidas.svg', url: 'https://www.adidas.com' }
          ].map(sponsor => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '60px',
                filter: 'brightness(0) invert(1)',
                opacity: 0.6,
                transition: 'all 0.3s ease'
              }}
              className="sponsor-link"
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            </a>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <div className="glass-panel" style={{
          position: 'relative', overflow: 'hidden', padding: '5rem 2rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          background: 'linear-gradient(to right, rgba(10,3,3,0.9), rgba(10,3,3,0.7)), url("/img/hero.png") center/cover'
        }}>
          <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '1px' }}>JOIN THE CLUB</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase' }}>
            BE PART OF THE<br />CLUB LEGACY
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '2.5rem', maxWidth: '600px' }}>
            Welcome to Law Society RFC, celebrating elite rugby with speed, skill, and unparalleled community.
          </p>
          <button className="btn-glass" style={{ padding: '1rem 3rem', fontSize: '1rem' }}>
            JOIN THE LSRFC FAMILY
          </button>
        </div>
      </section>
    </main>
  );
}
