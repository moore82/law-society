export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      padding: '4rem 2rem',
      marginTop: 'auto',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        color: 'var(--foreground-muted)'
      }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--foreground)' }}>
          Law Society RFC
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
          <span>Contact</span>
          <span>Opening Hours</span>
          <span>Social Links</span>
          <span>Sitemap</span>
        </div>
        <div style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
          &copy; {new Date().getFullYear()} Law Society RFC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
