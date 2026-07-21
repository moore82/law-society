# Pre-Launch TODOs

- [ ] **Configure Contact Form Email:** Add the following environment variables to the Vercel project settings (Settings > Environment Variables) to enable the contact form:
  - `SMTP_HOST` (e.g., smtp.gmail.com)
  - `SMTP_PORT` (e.g., 587)
  - `SMTP_USER` (e.g., your-email@gmail.com)
  - `SMTP_PASS` (e.g., your App Password)

- [ ] **Sanity Environment Variables:** Add your Sanity project details to Vercel:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`

- [ ] **Configure Sanity CORS Origins:** Once the Vercel site is deployed, take the live URL (e.g., `https://your-domain.com`) and add it to the CORS Origins in your Sanity project settings (manage.sanity.io) so the frontend can securely fetch data.

- [ ] **Update Caching Strategy:** Review the Next.js cache settings. All pages currently use `export const revalidate = 60;`. Before going live, consider implementing On-Demand Revalidation (via Sanity Webhooks) for instant updates or increasing the revalidation time to save on API calls.
