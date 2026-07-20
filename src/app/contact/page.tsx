import React from 'react';
import ContactForm from '@/components/ContactForm';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

type Officer = {
  _id: string;
  name: string;
  role: string;
  image?: any;
};

export default async function ContactPage() {
  const officers = await client.fetch<Officer[]>(
    `*[_type == "officer"] | order(order asc, name asc)`
  );

  return (
    <main style={{ minHeight: '100vh', paddingTop: '12rem', paddingBottom: '6rem' }}>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          margin-top: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--foreground-muted);
        }
        .form-input, .form-textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 1rem;
          color: #ffffff;
          font-size: 1rem;
          transition: border-color 0.2s ease, background 0.2s ease;
          width: 100%;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--accent-red);
          background: rgba(255, 255, 255, 0.08);
        }
        .form-textarea {
          min-height: 150px;
          resize: vertical;
        }
        .map-placeholder {
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          aspect-ratio: 16/10;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          width: 100%;
        }
        
        .officers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .officer-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2.5rem 2rem;
          text-align: center;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .officer-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.04);
        }
        .officer-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1.5rem auto;
          border: 2px solid var(--accent-red);
          background: rgba(255,255,255,0.1);
        }
        
        @media (min-width: 769px) {
          .contact-grid {
            grid-template-columns: 1.2fr 0.8fr;
            gap: 5rem;
          }
        }
      `}</style>

      <section className="container">
        <h1 className="page-title">GET IN TOUCH</h1>

        {/* Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />

        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <ContactForm />
          </div>

          {/* Right Column: Map & Info */}
          <div>
            {/* Map Placeholder */}
            <div className="map-placeholder">
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>MAP PLACEHOLDER</span>
            </div>

            {/* Find Us */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', color: '#ffffff' }}>Find Us</h2>

            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '0.5px', marginBottom: '2rem' }}>
              Address Line 1,<br />
              Address Line 2,<br />
              Address Line 3,<br />
              Town, <br />
              County, <br />
              Country
            </p>

            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '0.5px', marginBottom: '2rem' }}>
              Phone: [PHONE_NUMBER]<br />
              Email: [EMAIL_ADDRESS]
            </p>
          </div>
        </div>

        {/* Officers Section */}
        <div style={{ marginTop: '8rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', color: '#ffffff', textAlign: 'center' }}>Club Officers</h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--accent-red)', margin: '0 auto 3rem auto' }} />
          
          {officers.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--foreground-muted)' }}>No officers have been added yet. Add some in the Sanity Studio!</p>
            </div>
          ) : (
            <div className="officers-grid">
              {officers.map((officer) => (
                <div key={officer._id} className="officer-card">
                  {officer.image ? (
                    <img src={urlFor(officer.image).width(240).height(240).url()} alt={officer.name} className="officer-img" />
                  ) : (
                    <div className="officer-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--foreground-muted)' }}>
                      {officer.name.charAt(0)}
                    </div>
                  )}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{officer.name}</h3>
                  <p style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{officer.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>
    </main>
  );
}
