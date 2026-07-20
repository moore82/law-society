import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>Section</div>
        <h1 className="page-title">
          ABOUT US
        </h1>
        <div className="glass-panel" style={{ padding: '3rem', minHeight: '400px' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
            This is the outline wireframe for the About page. We can place history, committee details, and club information here.
          </p>
        </div>
      </section>
    </main>
  );
}
