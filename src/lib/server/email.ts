import nodemailer from "nodemailer";

type QuoteEmailPayload = {
  company_name?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  product_interest?: string;
  selected_material?: string;
  selected_price?: string;
  selected_unit?: string;
  quantity?: string;
  message?: string;
};

export async function sendQuoteNotification(payload: QuoteEmailPayload) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_NOTIFY_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !QUOTE_NOTIFY_TO) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth:
      SMTP_USER && SMTP_PASS
        ? {
            user: SMTP_USER,
            pass: SMTP_PASS
          }
        : undefined
  });

  await transporter.sendMail({
    to: QUOTE_NOTIFY_TO,
    from: SMTP_USER || QUOTE_NOTIFY_TO,
    subject: `New quote request${payload.company_name ? ` from ${payload.company_name}` : ""}`,
    text: Object.entries(payload)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")
  });
}
