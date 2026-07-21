"use client";

import React, { useState } from 'react';

interface ContactFormProps {
  recipientEmail?: string;
}

export default function ContactForm({ recipientEmail }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) {
      alert('No recipient email is configured in Sanity!');
      return;
    }
    
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          recipientEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('Message Sent!');
      // Optional: Clear form here
      // setName('');
      // setEmail('');
      // setSubject('');
      // setMessage('');
    } catch (error) {
      console.error(error);
      alert('There was a problem sending your message. Please try again later.');
      setStatus('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Your full name" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input 
          type="email" 
          className="form-input" 
          placeholder="Your email address" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Subject</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="What is this regarding?" 
          required 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '2.5rem' }}>
        <label className="form-label">Message</label>
        <textarea 
          className="form-textarea" 
          placeholder="Type your message here..." 
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
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
