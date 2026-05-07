# LuxeTex Hotel Textiles

Premium one-page B2B showroom website for a hotel textile supplier. The site includes bilingual content, dark/light mode, an interactive bed explorer, GEL-only display pricing, a custom admin dashboard, file uploads, and a quote lead inbox.

This is not ecommerce. There is no cart, checkout, online payment, customer account, database-backed shopping flow, or purchase tracking.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Custom Next.js API backend
- SQLite database file through `sql.js`
- Custom admin dashboard at `/admin`
- Optional SMTP quote notifications with Nodemailer
- VPS deployment with Node.js, PM2, Nginx, and Certbot

## Install

```bash
npm install
```

## Environment

Create `.env.local` for local development and `.env` on the VPS:

```text
DATABASE_PATH=./data/luxetex.sqlite
UPLOAD_DIR=./public/uploads
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-password
SESSION_SECRET=replace-with-a-long-random-secret
COOKIE_SECURE=false
NEXT_PUBLIC_META_PIXEL_ID=

# Optional quote email notifications
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
QUOTE_NOTIFY_TO=
```

If SMTP is empty, quote requests are still saved in the admin lead inbox.

Set `COOKIE_SECURE=true` on the VPS after HTTPS is active. Keep it `false` for local HTTP testing.

## Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin:

```text
http://localhost:3000/admin
```

On first startup, the SQLite database is created and seeded from the existing JSON files in `src/content`.

## Build

```bash
npm run build
npm run start
```

## Custom Admin Dashboard

The admin dashboard replaces Decap CMS completely.

Admin features:

- Login/logout with `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- JSON editor for all website content documents
- Image and catalog PDF uploads
- Quote lead inbox
- Lead status updates

Editable content includes:

- Site settings
- English and Georgian page content
- English and Georgian products and pricing
- English and Georgian interactive bed hotspots/material variants/pricing
- Gallery
- Catalog PDF
- Map
- Quote form labels
- Contact methods
- Footer

## SQLite Storage

The database is stored at:

```text
./data/luxetex.sqlite
```

Tables:

- `content_documents`
- `uploads`
- `quote_leads`
- `admin_sessions`

The `data` folder is ignored by Git. Back it up regularly on the VPS.

Example backup:

```bash
mkdir -p backups
cp data/luxetex.sqlite backups/luxetex-$(date +%Y-%m-%d).sqlite
```

## Quote Form

The quote form submits to:

```text
POST /api/quotes
```

Stored fields include:

- company/hotel name
- contact person
- phone
- email
- product interest
- selected material
- selected price
- selected unit
- approximate quantity/rooms
- message
- UTM values
- quote source

The admin can view leads at `/admin`.

## Uploads

Uploads are saved under:

```text
public/uploads/images
public/uploads/catalog
```

Public paths look like:

```text
/uploads/images/file-name.jpg
/uploads/catalog/catalog.pdf
```

After uploading, paste the returned public path into the relevant JSON document in admin.

## GEL Pricing

Pricing is display-only and used for lead qualification. All prices are GEL.

Products, bed hotspots, and material variants support:

- `showPrice`
- `priceType`: `fixed`, `from`, `range`, `custom`
- `price`
- `priceMin`
- `priceMax`
- `unit`
- `priceNote`

There is no currency selector, USD/EUR pricing, cart, checkout, or payment.

## VPS Deployment

1. Install Node.js on the VPS.
2. Clone the repository.
3. Create `.env`.
4. Install and build:

```bash
npm install
npm run build
```

5. Install PM2:

```bash
npm install -g pm2
pm2 start npm --name luxetex -- start
pm2 save
pm2 startup
```

6. Configure Nginx reverse proxy:

```nginx
server {
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

7. Add SSL:

```bash
sudo certbot --nginx -d your-domain.com
```

## Meta Pixel And UTM

Meta Pixel is optional:

```text
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
```

Tracked events:

- `PageView`
- `ViewContent`
- `BedHotspotClick`
- `MaterialSelected`
- `Contact`
- `DownloadCatalog`
- `Lead`

No ecommerce events are emitted.

UTM parameters are stored in `sessionStorage` and submitted with quote leads:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

## Important Notes

- The admin is for private company users only.
- Do not commit `data/luxetex.sqlite`.
- Back up the SQLite file before major edits or deployments.
- Keep uploaded files backed up with the database.
- This project no longer requires Netlify, Netlify Forms, Decap CMS, Git Gateway, or a custom GitHub CMS OAuth setup.
