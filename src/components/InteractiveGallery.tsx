"use client";

import React, { useState, useEffect } from 'react';
import { urlFor } from '@/sanity/lib/image';

interface InteractiveGalleryProps {
  images: any[]; // Array from Sanity or empty array
}

export default function InteractiveGallery({ images }: InteractiveGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev! + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  const hasImages = images && images.length > 0;
  const dummyArray = Array.from({ length: 16 });

  return (
    <>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 769px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }
      `}</style>

      {/* The Gallery Grid - EXACTLY the same CSS and Layout as before */}
      <div className="gallery-grid">
        {hasImages ? (
          images.map((image, i) => (
            <div 
              key={i} 
              className="glass-panel" 
              onClick={() => setSelectedIndex(i)}
              style={{ 
                aspectRatio: '4/3', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 0,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                overflow: 'hidden'
              }}
            >
              <img 
                src={urlFor(image).width(600).height(450).url()} 
                alt={image.alt || `Gallery Image ${i + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          ))
        ) : (
          dummyArray.map((_, i) => (
            <div 
              key={i} 
              className="glass-panel" 
              style={{ 
                aspectRatio: '4/3', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                border: '1px dashed rgba(255,255,255,0.2)',
                padding: 0,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <span style={{ color: 'var(--foreground-muted)', fontWeight: 600, letterSpacing: '1px', fontSize: '0.8rem' }}>
                PHOTO {i + 1}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && hasImages && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            style={{
              position: 'absolute', top: '2rem', right: '2rem',
              background: 'transparent', border: 'none',
              color: 'white', fontSize: '3rem', cursor: 'pointer',
              zIndex: 10000, lineHeight: 1
            }}
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev Button */}
          <button 
            style={{
              position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', fontSize: '2rem', padding: '1rem', borderRadius: '50%',
              cursor: 'pointer', zIndex: 10000,
              display: images.length > 1 ? 'flex' : 'none',
              alignItems: 'center', justifyContent: 'center',
              width: '60px', height: '60px'
            }}
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length); 
            }}
            aria-label="Previous image"
          >
            &#10094;
          </button>

          {/* The Image */}
          <img 
            src={urlFor(images[selectedIndex]).width(1600).url()} 
            alt={images[selectedIndex].alt || `Gallery Image ${selectedIndex + 1}`} 
            style={{
              maxHeight: '85vh',
              maxWidth: 'calc(100vw - 20rem)',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Next Button */}
          <button 
            style={{
              position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', fontSize: '2rem', padding: '1rem', borderRadius: '50%',
              cursor: 'pointer', zIndex: 10000,
              display: images.length > 1 ? 'flex' : 'none',
              alignItems: 'center', justifyContent: 'center',
              width: '60px', height: '60px'
            }}
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex((prev) => (prev! + 1) % images.length); 
            }}
            aria-label="Next image"
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
