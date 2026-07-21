import React from 'react';
import ContactForm from '@/components/ContactForm';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type GetInvolvedPageData = {
  title: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  town: string;
  county: string;
  country: string;
  phone: string;
  email: string;
  formRecipientEmail?: string;
  emailSubject?: string;
  googleMapEmbedUrl?: string;
};

export default async function GetInvolvedPage() {
  const pageData = await client.fetch<GetInvolvedPageData>(
    `*[_type == "getInvolvedPage" && _id == "getInvolvedPage"][0]`
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
        
        @media (min-width: 769px) {
          .contact-grid {
            grid-template-columns: 1.2fr 0.8fr;
            gap: 5rem;
          }
        }
      `}</style>

      <section className="container">
        <div style={{ color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>
          Festival of Sport
        </div>
        <h1 className="page-title">{pageData?.title || 'GET INVOLVED'}</h1>

        {/* Divider */}
        <div style={{ borderTop: '4px solid var(--accent-red)', marginBottom: '3rem' }} />

        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <ContactForm 
              recipientEmail={pageData?.formRecipientEmail} 
              fixedSubject={pageData?.emailSubject || 'FOS: Get Involved'} 
            />
          </div>

          {/* Right Column: Map & Info */}
          <div>
            {/* Map Area */}
            {pageData?.googleMapEmbedUrl ? (
              <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/10', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe 
                  src={pageData.googleMapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <div className="map-placeholder">
                <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px' }}>MAP PLACEHOLDER</span>
              </div>
            )}

            {/* Find Us */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', color: '#ffffff' }}>Find Us</h2>

            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '0.5px', marginBottom: '2rem' }}>
              {pageData?.addressLine1 || 'Address Line 1'},<br />
              {pageData?.addressLine2 || 'Address Line 2'},<br />
              {pageData?.addressLine3 || 'Address Line 3'},<br />
              {pageData?.town || 'Town'}, <br />
              {pageData?.county || 'County'}, <br />
              {pageData?.country || 'Country'}
            </p>

            <p style={{ color: 'var(--foreground-muted)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '0.5px', marginBottom: '2rem' }}>
              Phone: {pageData?.phone || '[PHONE_NUMBER]'}<br />
              Email: {pageData?.email || '[EMAIL_ADDRESS]'}
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}
