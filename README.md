# LuxeTex Hotel Textiles

A premium one-page digital showroom for a hotel textile supplier. The site presents bed linen, towels, pillowcases, duvet covers, bed runners, mattress protectors, and other hospitality textile products for B2B hotel clients.

This is not an online shop. There is no cart, checkout, payment system, database, or customer account area.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Decap CMS admin panel at `/admin`
- JSON content files
- GitHub content backend for Decap CMS
- Netlify free hosting

## Project Structure

```text
hotel-textile-website/
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
      globals.css
    components/
      Header.tsx
      MobileMenu.tsx
      HeroSection.tsx
      InteractiveBedExplorer.tsx
      BedHotspot.tsx
      BedProductPanel.tsx
      ProductCollections.tsx
      ProductCard.tsx
      WhyChooseUsSection.tsx
      AboutSection.tsx
      GallerySection.tsx
      CatalogSection.tsx
      ProcessSection.tsx
      MapSection.tsx
      ContactSection.tsx
      Footer.tsx
      LanguageSwitcher.tsx
      ThemeToggle.tsx
      SectionWrapper.tsx
    content/
      settings.json
      site.en.json
      site.ge.json
      products.en.json
      products.ge.json
      interactive-bed.en.json
      interactive-bed.ge.json
      gallery.json
      contact.json
      catalog.json
      map.json
      process.en.json
      process.ge.json
      footer.json
    lib/
      content.ts
      icons.ts
      types.ts
```

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

The CMS can open locally, but production editing with the GitHub backend requires GitHub OAuth setup after deployment.

## Build

```bash
npm run build
```

## Deploy to Netlify

1. Push this project to GitHub.
2. In Netlify, choose **Add new site**.
3. Choose **Import an existing project**.
4. Connect the GitHub repository.
5. Use:

```text
Build command: npm run build
Publish directory: .next
```

6. Deploy.

Netlify will provide a free temporary URL such as:

```text
https://your-site-name.netlify.app
```

The website works without a custom domain.

## Connect GitHub Repository

The Decap CMS config is:

```yaml
backend:
  name: github
  repo: TheGreatMan1/hotel-textile-website
  branch: main
```

If you move the repository, edit `public/admin/config.yml` and replace `repo` with:

```text
your-github-username/your-repository-name
```

## Configure Decap CMS GitHub Login

Because this project uses Decap's GitHub backend, admin login is handled through GitHub OAuth, not Netlify Identity or Git Gateway.

Manual setup:

1. In GitHub, create an OAuth app for the CMS login.
2. Use your Netlify site URL as the homepage URL.
3. Use Netlify's Decap/GitHub OAuth callback URL in the OAuth app settings.
4. In Netlify, add the OAuth client ID and secret according to Netlify/Decap CMS GitHub backend instructions.
5. Make sure the admin GitHub account has write access to the repository.
6. Open:

```text
https://your-site-name.netlify.app/admin
```

7. Log in with GitHub and approve repository access.

If the CMS shows an authentication error, the site itself can still work. The problem is usually OAuth app setup or repository access, not the website code.

## Admin Panel

Admin URL after deployment:

```text
/admin
```

Decap CMS edits these files:

- `src/content/settings.json`
- `src/content/site.en.json`
- `src/content/site.ge.json`
- `src/content/products.en.json`
- `src/content/products.ge.json`
- `src/content/interactive-bed.en.json`
- `src/content/interactive-bed.ge.json`
- `src/content/gallery.json`
- `src/content/contact.json`
- `src/content/catalog.json`
- `src/content/map.json`
- `src/content/process.en.json`
- `src/content/process.ge.json`
- `src/content/footer.json`

## Edit English and Georgian Content

English and Georgian page content are separate:

- English: `site.en.json`, `products.en.json`, `interactive-bed.en.json`, `process.en.json`
- Georgian: `site.ge.json`, `products.ge.json`, `interactive-bed.ge.json`, `process.ge.json`

Shared sections use English and Georgian fields in the same file:

- Gallery
- Catalog
- Contact
- Map
- Footer

The language switcher shows `EN / GE`, updates all visible text, and saves the selected language in `localStorage`.

## Hide or Show Sections

Every major section has an `isVisible` toggle:

- Hero
- Interactive bed explorer
- Product collections
- Why hotels choose us
- About company
- Gallery
- Catalog PDF
- Process / how to order
- Map
- Contact
- Footer

Hidden sections do not render and do not leave empty gaps. Header navigation links are also filtered when their section is hidden.

## Products

Products live in:

- `src/content/products.en.json`
- `src/content/products.ge.json`

Each product supports:

- slug
- title
- category
- short description
- image
- image alt text
- button text/link
- material
- available sizes
- color options
- visibility toggle
- sort order

Only visible products render. Products are sorted by `sortOrder`.

## Interactive Bed Hotspots

Hotspots live in:

- `src/content/interactive-bed.en.json`
- `src/content/interactive-bed.ge.json`

Each hotspot supports:

- title and label
- short and long description
- image and alt text
- `x` and `y` position percentages
- visibility toggle
- linked product slug
- material variants

Hotspot positions use percentages over the bed image:

```json
{
  "x": 42,
  "y": 28
}
```

Increase `x` to move right. Increase `y` to move down.

## Material Variants

Each hotspot can have any number of material variants, for example Silicon and Microfiber.

Each variant supports:

- ID
- label
- visibility toggle
- description
- image
- sizes
- colors

If one variant is visible, the panel shows it cleanly. If multiple variants are visible, the panel shows material filter buttons. If no variant is added, the default hotspot image and text are used.

## Images

CMS image uploads go to:

```text
public/uploads/images
```

Public paths look like:

```text
/uploads/images/file-name.jpg
```

Placeholder visuals are in:

```text
public/placeholders
```

Keep uploaded images reasonably compressed for faster mobile loading.

## Catalog PDF

Catalog settings live in:

```text
src/content/catalog.json
```

PDF uploads go to:

```text
public/uploads/catalog
```

Public PDF paths look like:

```text
/uploads/catalog/catalog.pdf
```

If no PDF is set, the site shows safe placeholder text instead of a broken download button.

## Contact Methods

Contact settings live in:

```text
src/content/contact.json
```

Supported contact methods:

- Phone
- WhatsApp
- Email
- Instagram
- Facebook

Each method has a label, value, URL, icon key, and `isVisible`. Only visible methods appear.

## Map Section

Map settings live in:

```text
src/content/map.json
```

You can edit:

- section visibility
- title
- address
- Google Maps embed URL
- external Google Maps link
- button text

If the embed URL is empty, the site still shows the address and external map button when available.

## Custom Domain Later

A custom domain is optional.

To add one later:

1. Buy a domain from a registrar.
2. In Netlify, open **Domain management**.
3. Add the domain.
4. Follow Netlify's DNS instructions.
5. Wait for DNS and HTTPS setup.

The free `.netlify.app` URL continues to work.

## Free vs Paid

Free:

- Next.js
- Tailwind CSS
- Framer Motion
- Decap CMS
- GitHub repository hosting
- Netlify free hosting
- Temporary Netlify URL

May cost money later:

- Custom domain purchase
- Premium Netlify features if traffic/team needs grow
- Professional photography or custom brand assets
- A paid OAuth/auth hosting option if you choose not to use Netlify's available OAuth flow

## Beginner Notes

- The site is mostly static and deploys from GitHub.
- Decap CMS edits JSON files and commits changes back to GitHub.
- There is no database to manage.
- Do not add cart, payment, checkout, or accounts unless the business intentionally changes to ecommerce.
