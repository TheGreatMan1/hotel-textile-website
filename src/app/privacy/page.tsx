import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | LuxeTex Hotel Textiles",
  description:
    "Privacy information for quote inquiries, campaign attribution, and advertising tracking."
};

export default function PrivacyPage() {
  return (
    <main className="public-site min-h-screen bg-white py-12 text-graphite dark:bg-[#161616] dark:text-white">
      <div className="container-shell max-w-3xl">
        <Link
          href="/"
          className="text-[10px] font-semibold uppercase tracking-[0.15em] text-peach transition hover:text-graphite dark:text-[#ebb49a] dark:hover:text-white"
        >
          Back to website
        </Link>
        <h1 className="mt-7 text-4xl font-light tracking-[0.01em]">
          Privacy Policy
        </h1>
        <p className="mt-5 text-base font-light leading-7 text-stone-600 dark:text-stone-300">
          This placeholder privacy policy explains how LuxeTex Hotel Textiles
          may collect and use information from this B2B showroom website. The
          website does not process online payments and does not provide customer
          accounts.
        </p>

        <div className="mt-10 space-y-8 border-t border-stone-200 pt-8 text-sm font-light leading-7 text-stone-600 dark:border-stone-800 dark:text-stone-300">
          <section>
            <h2 className="text-xl font-normal text-graphite dark:text-white">
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
            <h2 className="text-xl font-normal text-graphite dark:text-white">
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
            <h2 className="text-xl font-normal text-graphite dark:text-white">
              No Online Payments
            </h2>
            <p className="mt-3">
              This website is a lead-generation showroom. It does not include a
              cart, checkout, online payment processing, or purchase events.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-graphite dark:text-white">
              Contact
            </h2>
            <p className="mt-3">
              To ask about privacy or data handling, contact the company through
              the phone, email, or social links listed on the website.
            </p>
          </section>

          <section lang="ka">
            <h2 className="text-xl font-normal text-graphite dark:text-white">
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
