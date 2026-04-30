import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | LuxeTex Hotel Textiles",
  description:
    "Privacy information for quote inquiries, campaign attribution, and advertising tracking."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ivory py-16 text-charcoal dark:bg-ink dark:text-ivory">
      <div className="container-shell max-w-4xl">
        <Link
          href="/"
          className="text-sm font-bold text-brass transition hover:text-charcoal dark:text-champagne dark:hover:text-ivory"
        >
          Back to website
        </Link>
        <h1 className="mt-8 font-serif text-5xl font-semibold">
          Privacy Policy
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-700 dark:text-stone-300">
          This placeholder privacy policy explains how LuxeTex Hotel Textiles
          may collect and use information from this B2B showroom website. The
          website does not process online payments and does not provide customer
          accounts.
        </p>

        <div className="mt-10 space-y-8 text-base leading-8 text-stone-700 dark:text-stone-300">
          <section>
            <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
              Quote Inquiry Data
            </h2>
            <p className="mt-3">
              When you submit the quote form, we may receive your company or
              hotel name, contact person, phone, email, product interest,
              selected material, selected price, unit, approximate quantity,
              room count, and message.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
              Campaign and Advertising Data
            </h2>
            <p className="mt-3">
              The site may store UTM campaign parameters in session storage so
              quote requests can be connected to Facebook, Instagram, or other
              advertising campaigns. If Meta Pixel is configured, page views,
              product interest, quote intent, catalog downloads, and contact
              link clicks may be tracked for advertising measurement.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
              No Online Payments
            </h2>
            <p className="mt-3">
              This website is a lead-generation showroom. It does not include a
              cart, checkout, online payment processing, or purchase events.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
              Contact
            </h2>
            <p className="mt-3">
              To ask about privacy or data handling, contact the company through
              the phone, email, or social links listed on the website.
            </p>
          </section>

          <section lang="ka">
            <h2 className="font-serif text-3xl font-semibold text-charcoal dark:text-ivory">
              ქართული მოკლე ვერსია
            </h2>
            <p className="mt-3">
              ეს გვერდი არის კონფიდენციალურობის პოლიტიკის საწყისი ტექსტი.
              ვებსაიტმა შეიძლება შეინახოს მოთხოვნის ფორმის ინფორმაცია, არჩეული
              პროდუქტი/მასალა/ფასი, UTM კამპანიის მონაცემები და Meta Pixel-ის
              ანალიტიკა, თუ ის ჩართულია. ონლაინ გადახდები არ მუშავდება.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
