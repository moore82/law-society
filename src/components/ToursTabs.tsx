"use client";
import { useState } from 'react';

export default function ToursTabs({ 
  seasonContent, 
  pastToursData 
}: { 
  seasonContent: React.ReactNode, 
  pastToursData: any[] 
}) {
  const [activeTab, setActiveTab] = useState<'season' | 'past'>('season');

  return (
    <div>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={() => setActiveTab('season')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'season' ? 'var(--accent-red)' : 'var(--foreground-muted)',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '1rem 2rem',
            cursor: 'pointer',
            borderBottom: activeTab === 'season' ? '3px solid var(--accent-red)' : '3px solid transparent',
            transition: 'all 0.2s ease',
          }}
        >
          Season 2026 / 2027
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'past' ? 'var(--accent-red)' : 'var(--foreground-muted)',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '1rem 2rem',
            cursor: 'pointer',
            borderBottom: activeTab === 'past' ? '3px solid var(--accent-red)' : '3px solid transparent',
            transition: 'all 0.2s ease',
          }}
        >
          Past Tours
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'season' && (
          <div className="glass-panel" style={{ padding: '3rem' }}>
            {seasonContent}
          </div>
        )}
        
        {activeTab === 'past' && (
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              Historical Tours
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {pastToursData.map((tour, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '1.5rem', 
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '1.5rem', minWidth: '80px' }}>
                    {tour.year}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem' }}>
                    {tour.venues.map((v: string, i: number) => (
                      <span key={i} style={{ color: 'var(--foreground-muted)', fontSize: '1.1rem' }}>{v}</span>
                    ))}
                  </div>
                </div>
              ))}
              
              {pastToursData.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--foreground-muted)' }}>
                  No historical tours found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
