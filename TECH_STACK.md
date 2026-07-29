# Law Society RFC - Tech Stack & Infrastructure

This document outlines the core technologies and third-party services used to build and host the Law Society RFC website.

## 💻 Core Application Stack

* **Framework:** Next.js (v16+) using the modern App Router.
* **Language:** TypeScript & React.
* **Styling:** CSS Modules / Global CSS (Custom Glassmorphism Design System) & Styled Components.
* **CMS (Content Management System):** Sanity.io
  * Integrated directly into the Next.js app (`next-sanity`).
  * Features `PortableText` for rich text rendering and `image-url` for optimized media delivery.

## ☁️ Infrastructure & Hosting

* **Hosting:** Vercel (Hosts both the Next.js frontend and the Sanity Studio API endpoints).
* **Analytics:** Vercel Analytics (`@vercel/analytics`).
* **Domain & DNS:** Namecheap (Manages the `lawsocietyrfc.com` domain, MX records, and SPF/DKIM authentication).

## 📧 Email & Communications

* **Transactional Email API:** Resend
  * Used programmatically via standard `nodemailer` in a Next.js serverless API route (`/api/contact/route.ts`) to dispatch contact form submissions securely.
* **Email Hosting (Inboxes):** Zoho Mail
  * Handles all incoming emails for the custom domain.
  * MX records point to `mx.zoho.eu`.
