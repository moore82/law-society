"use client";

import React from 'react';

export default function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input type="text" className="form-input" placeholder="Your full name" required />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" className="form-input" placeholder="Your email address" required />
      </div>

      <div className="form-group">
        <label className="form-label">Subject</label>
        <input type="text" className="form-input" placeholder="What is this regarding?" required />
      </div>

      <div className="form-group" style={{ marginBottom: '2.5rem' }}>
        <label className="form-label">Message</label>
        <textarea className="form-textarea" placeholder="Type your message here..." required></textarea>
      </div>

      <button
        type="submit"
        className="btn-glass"
        style={{
          padding: '1rem 3rem',
          fontSize: '0.9rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          background: 'var(--accent-red)',
          color: '#000000',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Send
      </button>
    </form>
  );
}
