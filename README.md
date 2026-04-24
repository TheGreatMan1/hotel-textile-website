# LuxeTex Hotel Textiles

A beginner-friendly one-page showcase website for a hotel textile supplier. It is a professional digital showroom/catalog site, not an online shop. There is no cart, checkout, online payment, database, or customer account system.

The site uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Decap CMS admin panel at `/admin`
- JSON content files editable by Decap CMS
- Netlify free hosting with Git Gateway

## Project Structure

```text
hotel-textile-website/
  public/
    admin/
      index.html
      config.yml
    uploads/
      images/
      catalog/
    placeholders/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
    components/
      Header.tsx
      MobileMenu.tsx
      HeroSection.tsx
      AboutSection.tsx
      ProductsSection.tsx
      ProductCard.tsx
      GallerySection.tsx
      CatalogSection.tsx
      MapSection.tsx
      ContactSection.tsx
      Footer.tsx
      LanguageSwitcher.tsx
      ThemeToggle.tsx
    content/
      settings.json
      site.en.json
      site.ge.json
      products.en.json
      products.ge.json
      gallery.json
      contact.json
      catalog.json
      map.json
    lib/
      content.ts
      types.ts
```

## Install Dependencies

From inside the project folder:

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Expected local website URL:

```text
http://localhost:3000
```

Local admin URL:

```text
http://localhost:3000/admin
```

For local Decap CMS editing, run the Decap local backend in a second terminal:

```bash
npx decap-server
```

Then open `/admin`. Local backend is for development only. Production editing should use Netlify Identity and Git Gateway.

## Build

```bash
npm run build
```

## Editing Content Manually

All public website content is stored in `src/content`.

- English page text: `src/content/site.en.json`
- Georgian page text: `src/content/site.ge.json`
- English products: `src/content/products.en.json`
- Georgian products: `src/content/products.ge.json`
- Gallery: `src/content/gallery.json`
- Contact methods: `src/content/contact.json`
- Catalog PDF settings: `src/content/catalog.json`
- Map settings: `src/content/map.json`
- Global notes and SEO reference: `src/content/settings.json`

After editing JSON manually, run:

```bash
npm run dev
```

or rebuild for production:

```bash
npm run build
```

## Decap CMS Admin

The admin panel files are:

- `public/admin/index.html`
- `public/admin/config.yml`

After deployment, the admin panel is available at:

```text
https://your-netlify-site.netlify.app/admin
```

Decap CMS collections are set up for:

- Site Settings
- English Page Content
- Georgian Page Content
- English Products
- Georgian Products
- Gallery
- Catalog Settings
- Contact Settings
- Map Settings

## Deploy to Netlify Free Hosting

1. Push this project to a GitHub repository.
2. Log in to Netlify.
3. Choose **Add new site**.
4. Choose **Import an existing project**.
5. Connect the GitHub repository.
6. Use these build settings:

```text
Build command: npm run build
Publish directory: .next
```

7. Deploy the site.

Netlify will give you a temporary URL like:

```text
https://your-site-name.netlify.app
```

The website works without a custom domain.

## Configure Decap CMS With Netlify Git Gateway

The CMS config already uses:

```yaml
backend:
  name: git-gateway
  branch: main
```

After the site is deployed:

1. In Netlify, open the deployed site dashboard.
2. Go to **Site configuration**.
3. Enable **Identity**.
4. Go to **Identity > Services**.
5. Enable **Git Gateway**.
6. In **Identity registration**, choose invitation-only if this is for one admin user.

## Add the First Admin User

1. In Netlify, open **Identity**.
2. Click **Invite users**.
3. Enter the admin email address.
4. The admin accepts the invitation by email and creates a password.
5. The admin visits:

```text
https://your-site-name.netlify.app/admin
```

6. The admin logs in and edits content.

## Change Images

In Decap CMS, image fields upload to:

```text
public/uploads/images
```

The website references uploaded images as:

```text
/uploads/images/file-name.jpg
```

You can also manually place images in `public/uploads/images` and reference them with the same path format.

## Change the PDF Catalog

In Decap CMS, open **Catalog Settings** and replace **Catalog PDF File**.

Catalog PDFs upload to:

```text
public/uploads/catalog
```

The website references them as:

```text
/uploads/catalog/file-name.pdf
```

If the PDF field is empty, the download button is replaced with safe text.

## Hide or Show Sections

Each major section has an `isVisible` toggle in CMS/content:

- Hero
- About
- Products
- Gallery
- Catalog PDF
- Map
- Contact

When a section is hidden, it is not rendered on the public website and does not leave an empty gap.

## Hide or Show Contact Methods

The contact section supports:

- Phone
- WhatsApp
- Email
- Instagram
- Facebook

Each contact method has:

- `isVisible`
- English and Georgian label
- Display value
- URL/link

Only visible methods appear on the website.

## Change Georgian and English Text

English and Georgian content are edited separately.

- English header, hero, about, footer: `site.en.json`
- Georgian header, hero, about, footer: `site.ge.json`
- English products: `products.en.json`
- Georgian products: `products.ge.json`

Shared sections like gallery, catalog, map, and contact contain both English and Georgian fields in the same file.

The public language switcher uses:

```text
EN / GE
```

The selected language is saved in `localStorage`. If no language has been selected, English is used by default.

## Dark and Light Mode

The theme switcher is in the header. It uses Tailwind's `dark` class strategy and saves the selected theme in `localStorage`.

If the visitor has not selected a theme, the site follows the visitor's system preference.

## Connect a Custom Domain Later

A custom domain is optional.

To add one later:

1. Buy a domain from any domain registrar.
2. In Netlify, open **Domain management**.
3. Add the custom domain.
4. Follow Netlify's DNS instructions.
5. Wait for DNS and HTTPS setup to finish.

The free Netlify URL continues to work even if no custom domain is connected.

## Free vs Paid Parts

Free:

- Next.js
- Tailwind CSS
- Decap CMS
- GitHub repository hosting for the code
- Netlify free hosting for small/static sites
- Netlify temporary `.netlify.app` URL
- Netlify Identity/Git Gateway for basic CMS workflows

May require payment later:

- A custom domain name
- Premium Netlify features if traffic, team, or build needs grow
- Professional photography or custom design assets

## Notes for Beginners

- This is a mostly static website. Content changes are saved to Git through Decap CMS.
- Uploaded images and PDFs are committed to the repository.
- Keep image file sizes reasonable for faster loading.
- Do not add checkout, cart, payment, or account features unless the business changes from a showroom to an ecommerce site.
