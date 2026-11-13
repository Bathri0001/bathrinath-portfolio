# Portfolio — Bathrinath Murugan
Next.js 16 · TypeScript · Tailwind v4 · Motion · installable PWA

## 1. Run locally
```bash
cd portfolio
npm install
npm run dev        # http://localhost:3000
```
Production check: `npm run build && npm start`

## 2. Project output screenshots ("View Outputs")
Drop images into these folders (png/jpg/jpeg/webp). Name them 1.png, 2.png... for order.
They appear automatically as tabs in **View Outputs** and inside each card's 3D device.

| Project | Folder | Frame |
|---|---|---|
| ONGC Document Intelligence System | `public/images/ONGC` | PC |
| Trend Fusion | `public/images/TF` | PC |
| Personalized Food Recommendation System | `public/images/Dine-mate` | PC |
| University Finance Administration System | `public/images/UFAS` | PC |
| PTU IQAC App | `public/images/PTU` | Phone |
| Adaptive IQ Predictor | `public/images/IQ` | Phone |

Until images are added, cards show an animated 3D "how it works" walkthrough.

## 3. Environment variables (copy `.env.example` to `.env.local`)
| Feature | Variables |
|---|---|
| Contact form (sends mail from the site) | `RESEND_API_KEY` or `SMTP_USER` + `SMTP_PASS` (Gmail app password); optional `CONTACT_TO` |
| Real shared visitor + like counts | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| SEO URLs | `NEXT_PUBLIC_SITE_URL` |

Counts start at **400 visitors / 100 likes** (`data/profile.ts`). Every visit counts, including returning
visitors (refreshes within 20 seconds are ignored). One like per browser.

## 4. Deploy on Vercel
1. Push to GitHub: `git init && git add . && git commit -m "portfolio" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
2. vercel.com > Add New > Project > import the repo > Deploy.
3. Vercel > Storage / Marketplace > Upstash Redis > create and connect to the project.
4. Settings > Environment Variables: add `RESEND_API_KEY` (or SMTP vars) and `NEXT_PUBLIC_SITE_URL`.
5. Redeploy.

## 5. Install as an app
On the deployed https site use the Install button (navbar / footer), Chrome menu > Install app,
or iPhone Safari: Share > Add to Home Screen. Works offline after the first visit.

## 6. Where to edit
- Profile, links, base counts: `data/profile.ts`
- Projects (GitHub links, 3D badges, flow steps): `data/projects.ts`
- Education timeline: `data/education.ts`; certificates: `data/certifications.ts`; PDFs: `public/certificates/`
- Themes (dark default, 7 accents, violet default): `app/globals.css`
