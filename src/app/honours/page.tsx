import Link from 'next/link';

export default function HonoursPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        <h1 className="page-title">
          HONOURS
        </h1>
        <div className="glass-panel" style={{ padding: '3rem', minHeight: '400px' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--foreground-muted)' }}>
            This is the outline wireframe for the Honours page. We can place trophy cabinets, past victories, and hall of fame here.
          </p>
        </div>
      </section>
    </main>
  );
}
