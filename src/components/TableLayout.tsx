import React from 'react';

interface TableRow {
  col1: string;
  col2: string;
  col3: string;
  isDivider?: boolean;
}

interface TableLayoutProps {
  title: string;
  section?: string;
  headers?: string[];
  rows?: TableRow[];
  footerText?: string;
}

export default function TableLayout({
  title,
  section,
  headers = ["Year", "Name", "Detail"],
  rows = Array.from({ length: 10 }).map((_, i) => ({
    col1: `${2026 - i}`,
    col2: i % 2 === 0 ? "John Smith" : "David Jones",
    col3: i % 2 === 0 ? "First Team Player of the Year" : "Clubman of the Year"
  })),
  footerText = ""
}: TableLayoutProps) {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <section className="container">
        {section && (
          <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>
            {section}
          </div>
        )}
        <h1 className="page-title">{title}</h1>

        {/* Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />

        {/* Table Container */}
        <div className="glass-panel" style={{ padding: '0', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: '#000000', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                {headers.map((h, i) => (
                  <th key={i} style={{
                    padding: '1.25rem 2rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#ffffff'
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                if (row.isDivider) {
                  return (
                    <tr key={i} style={{ background: 'rgba(255, 51, 68, 0.08)' }}>
                      <td colSpan={headers.length} style={{
                        padding: '0.75rem 2rem',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: 'var(--accent-red)',
                        letterSpacing: '1.5px',
                        textAlign: 'center',
                        borderTop: '1px solid rgba(255, 51, 68, 0.3)',
                        borderBottom: '1px solid rgba(255, 51, 68, 0.3)'
                      }}>
                        {row.col1}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={i} style={{
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}>
                    <td style={{ padding: '1.25rem 2rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-red)' }}>{row.col1}</td>
                    <td style={{ padding: '1.25rem 2rem', fontSize: '0.95rem', fontWeight: 500 }}>{row.col2}</td>
                    <td style={{ padding: '1.25rem 2rem', fontSize: '0.95rem', color: 'var(--foreground-muted)' }}>{row.col3}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer text */}
        <div style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
          {footerText}
        </div>
      </section>
    </main>
  );
}
