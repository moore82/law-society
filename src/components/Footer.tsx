import Link from 'next/link';

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
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" style={{ color: 'var(--foreground-muted)' }}>Contact</Link>
          <Link href="/opening-hours" style={{ color: 'var(--foreground-muted)' }}>Opening Hours</Link>
          <Link href="/social-links" style={{ color: 'var(--foreground-muted)' }}>Social Links</Link>
          <Link href="/sitemap" style={{ color: 'var(--foreground-muted)' }}>Sitemap</Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/privacy-policy" style={{ color: 'var(--foreground-muted)' }}>Privacy Policy</Link>
          <Link href="/cookie-policy" style={{ color: 'var(--foreground-muted)' }}>Cookie Policy</Link>
          <Link href="/terms-of-service" style={{ color: 'var(--foreground-muted)' }}>Terms of Service</Link>
        </div>
        <div style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
          &copy; {new Date().getFullYear()} Law Society RFC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
