# LuxeTex Hotel Textiles

Premium one-page B2B showroom website for a hotel textile supplier. It presents hotel bed textiles, interactive bed layers, GEL-only display pricing, a quote inquiry form, catalog download, map, and contact options.

This is not ecommerce. There is no cart, checkout, online payment, customer account, database, or purchase flow.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Decap CMS at `/admin`
- JSON content files
- GitHub backend for Decap CMS
- Netlify hosting and Netlify Forms

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Local admin page:

```text
http://localhost:3000/admin
```

The CMS interface can load locally, but GitHub-backed editing is intended for the deployed Netlify site.

## Build

```bash
npm run build
```

## Project Structure

```text
public/
  admin/
    index.html
    config.yml
  placeholders/
  uploads/
    images/
    catalog/
src/
  app/
    layout.tsx
    page.tsx
    privacy/page.tsx
  components/
    InteractiveBedExplorer.tsx
    BedProductPanel.tsx
    ProductCard.tsx
    QuoteFormSection.tsx
    MetaPixel.tsx
    MobileQuoteCTA.tsx
  content/
    site.en.json
    site.ge.json
    products.en.json
    products.ge.json
    interactive-bed.en.json
    interactive-bed.ge.json
    quote-form.json
    gallery.json
    contact.json
    catalog.json
    map.json
    process.en.json
    process.ge.json
    footer.json
  lib/
    content.ts
    types.ts
    pricing.ts
    quoteSelection.ts
    utm.ts
    metaPixel.ts
```

## Deploy to Netlify

1. Push the project to GitHub.
2. In Netlify, choose **Add new site** then **Import an existing project**.
3. Select the GitHub repository.
4. Use:

```text
Build command: npm run build
Publish directory: .next
```

5. Deploy.

Netlify gives a free temporary URL such as:

```text
https://your-site-name.netlify.app
```

A custom domain is optional and can be connected later in Netlify **Domain management**.

## Decap CMS

Admin URL after deployment:

```text
/admin
```

The CMS config is in:

```text
public/admin/config.yml
```

This project uses the Decap GitHub backend:

```yaml
backend:
  name: github
  repo: TheGreatMan1/hotel-textile-website
  branch: main
```

If the repository changes, update `repo` to `your-github-username/your-repo-name`.

To use GitHub login, configure a Decap-compatible GitHub OAuth flow for the deployed Netlify site and make sure the admin GitHub account has write access to the repo. The site itself does not require Netlify Identity or Git Gateway.

## Editable Content

Decap CMS edits these files:

- `src/content/site.en.json`
- `src/content/site.ge.json`
- `src/content/products.en.json`
- `src/content/products.ge.json`
- `src/content/interactive-bed.en.json`
- `src/content/interactive-bed.ge.json`
- `src/content/quote-form.json`
- `src/content/gallery.json`
- `src/content/contact.json`
- `src/content/catalog.json`
- `src/content/map.json`
- `src/content/process.en.json`
- `src/content/process.ge.json`
- `src/content/footer.json`

English and Georgian page/product/bed/process content are separate. Shared sections use localized `en` and `ge` fields inside the same JSON file.

## Section Visibility

Every major section has an `isVisible` toggle in CMS. Hidden sections do not render and do not leave empty gaps. Header and footer navigation links are filtered by visible section keys.

Visible section keys include:

- `hero`
- `interactiveBed`
- `products`
- `whyChooseUs`
- `about`
- `gallery`
- `catalog`
- `process`
- `map`
- `quoteForm`
- `contact`

## GEL Pricing

Pricing is display-only and used for lead qualification. All prices are GEL. There is no currency selector, USD, EUR, cart, checkout, or payment.

Products, bed hotspots, and material variants support:

- Show Price
- Price Type: `fixed`, `from`, `range`, `custom`
- Price
- Price Min
- Price Max
- Unit
- Price Note

Examples:

- Fixed: `25 GEL / per piece`
- From: `From 18 GEL / per piece`
- Range: `18 - 35 GEL / per piece`
- Custom: `Price available upon request`

If `showPrice` is false, the price block is hidden and the Request Offer / Request Quote CTA remains visible.

## Products

Products live in:

```text
src/content/products.en.json
src/content/products.ge.json
```

Each product has a slug, title, category, description, image, optional specs, visibility, sort order, CTA, and GEL pricing fields. Product CTA buttons scroll to the quote form and prefill product, price, unit, and source.

## Interactive Bed

Interactive bed content lives in:

```text
src/content/interactive-bed.en.json
src/content/interactive-bed.ge.json
```

Each hotspot supports title, label, descriptions, image, percentage `x` / `y` position, linked product slug, visibility, default pricing, and material variants.

Hotspot coordinates are percentages over the bed image:

```json
{
  "x": 42,
  "y": 28
}
```

Increase `x` to move right. Increase `y` to move down.

Material variants such as Silicon and Microfiber can each have their own GEL pricing. The side panel shows selected material pricing first and falls back to the hotspot price when needed.

The side panel Request Quote button prefills product, material, visible price, unit, and source before scrolling to the quote form.

## Quote Form

Quote form content lives in:

```text
src/content/quote-form.json
```

The form appears before Contact and supports English and Georgian labels/placeholders. It collects company/hotel name, contact person, phone, email, product interest, selected material, selected price, unit, approximate quantity/rooms, and message.

The form uses Netlify Forms with:

```text
form name: quote-inquiry
```

There is a static hidden form blueprint so Netlify can detect the form during build. The visible form submits with URL-encoded POST and shows success/error text without redirecting.

For Next.js on Netlify, the detection blueprint lives at:

```text
public/__forms.html
```

The React form does not use `data-netlify` directly. It posts to `/__forms.html`, which matches the current Netlify Next adapter requirement for Forms.

To test Netlify Forms:

1. Deploy to Netlify.
2. Submit the quote form on the deployed site.
3. Open Netlify dashboard.
4. Go to **Forms**.
5. Check submissions under `quote-inquiry`.

If submissions do not appear, redeploy after confirming the form is present in built HTML and Netlify Forms are enabled for the site.

## UTM Tracking

The site reads and stores these URL parameters in `sessionStorage`:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

The quote form includes them as hidden inputs for ad attribution.

## Meta Pixel

Meta Pixel is optional and no-op safe. If no ID is configured, no tracking script loads and helper calls do not throw.

Set this Netlify environment variable:

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

No ecommerce events are emitted. There are no `Purchase`, `AddToCart`, payment, cart, or checkout events. Pixel pricing metadata uses `currency: "GEL"` only, and numeric value is sent only when the price is clearly fixed/from numeric.

## Contact Tracking

Contact links still behave normally. When Meta Pixel is enabled, clicks on phone, WhatsApp, email, Instagram, and Facebook send a Contact event with the method key.

## Catalog PDF

Catalog content lives in:

```text
src/content/catalog.json
```

PDF uploads should go to:

```text
public/uploads/catalog
```

If no PDF is set, the download button is replaced with safe placeholder text. Catalog clicks can be tracked as `DownloadCatalog`.

## Images

Image uploads go to:

```text
public/uploads/images
```

Public image paths look like:

```text
/uploads/images/file-name.jpg
```

Keep uploaded images compressed for mobile performance.

## Contact Methods

Contact settings live in:

```text
src/content/contact.json
```

Supported methods:

- Phone
- WhatsApp
- Email
- Instagram
- Facebook

Each method has a visibility toggle. Only visible methods render.

## Privacy Policy

Privacy policy route:

```text
/privacy
```

It explains quote form data, selected product/material/price data, UTM tracking, Meta Pixel advertising tracking, contact click tracking, and that no online payments are processed.

## Free vs Paid

Free:

- Next.js, Tailwind CSS, Framer Motion
- Decap CMS
- GitHub repository hosting
- Netlify free hosting
- Netlify Forms within free plan limits
- Temporary `.netlify.app` URL

May cost money later:

- Custom domain
- Premium Netlify features if traffic or team needs grow
- Professional photography or custom brand assets

## Important Reminder

This project is a B2B showroom and lead-generation website. Keep product CTAs as Request Offer / Request Quote. Do not add cart, checkout, payments, customer accounts, database logic, USD/EUR pricing, or purchase tracking unless the business intentionally becomes ecommerce later.
