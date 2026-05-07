"use client";

import { localized } from "@/lib/content";
import { trackStandardMetaEvent } from "@/lib/metaPixel";
import {
  quoteSelectionEventName,
  type QuoteSelection
} from "@/lib/quoteSelection";
import type { Language, QuoteFormContent } from "@/lib/types";
import { captureUtmParams, getStoredUtmValues, utmKeys } from "@/lib/utm";
import { Send } from "lucide-react";
import { forwardRef, type FormEvent, useEffect, useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";

type QuoteFormSectionProps = {
  content: QuoteFormContent;
  language: Language;
};

type FormState = {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  productInterest: string;
  selectedMaterial: string;
  selectedPrice: string;
  unit: string;
  quantity: string;
  message: string;
  quoteSource: string;
};

const initialFormState: FormState = {
  companyName: "",
  contactPerson: "",
  phone: "",
  email: "",
  productInterest: "",
  selectedMaterial: "",
  selectedPrice: "",
  unit: "",
  quantity: "",
  message: "",
  quoteSource: ""
};

export default function QuoteFormSection({
  content,
  language
}: QuoteFormSectionProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [utmValues, setUtmValues] = useState(getStoredUtmValues);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const productInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    captureUtmParams();
    setUtmValues(getStoredUtmValues());

    function handleQuoteSelection(event: Event) {
      const selection = (event as CustomEvent<QuoteSelection>).detail;

      setFormState((current) => ({
        ...current,
        productInterest: selection.selectedProduct || current.productInterest,
        selectedMaterial:
          selection.selectedMaterial ?? current.selectedMaterial,
        selectedPrice: selection.selectedPrice ?? current.selectedPrice,
        unit: selection.selectedUnit ?? current.unit,
        quoteSource: selection.quoteSource ?? current.quoteSource
      }));

      window.setTimeout(() => productInputRef.current?.focus(), 350);
    }

    window.addEventListener(quoteSelectionEventName, handleQuoteSelection);
    return () =>
      window.removeEventListener(quoteSelectionEventName, handleQuoteSelection);
  }, []);

  if (!content.isVisible) return null;

  const fields = content.fields;

  function updateField(name: keyof FormState, value: string) {
    setFormState((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setIsSubmitting(true);

    const payload = {
      company_name: formState.companyName,
      contact_person: formState.contactPerson,
      phone: formState.phone,
      email: formState.email,
      product_interest: formState.productInterest,
      selected_material: formState.selectedMaterial,
      selected_price: formState.selectedPrice,
      selected_unit: formState.unit,
      quantity: formState.quantity,
      message: formState.message,
      selected_product: formState.productInterest,
      quote_source: formState.quoteSource,
      ...utmValues
    };

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Form submission failed");

      setStatus("success");
      trackStandardMetaEvent("Lead", {
        selected_product: formState.productInterest,
        selected_material: formState.selectedMaterial,
        selected_price: formState.selectedPrice,
        quote_source: formState.quoteSource,
        ...utmValues
      });
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SectionWrapper id="quote-form" className="bg-[#fbf7ef] dark:bg-ink">
      <div className="container-shell grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="lux-card p-6">
          <p className="eyebrow">{localized(content.eyebrow, language)}</p>
          <h2 className="section-title">{localized(content.title, language)}</h2>
          <p className="section-copy">
            {localized(content.description, language)}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-stone-200 bg-white p-5 shadow-[0_18px_50px_rgba(28,26,23,0.08)] dark:border-stone-800 dark:bg-stone-950 sm:p-6"
        >
          <input
            type="hidden"
            name="selected_product"
            value={formState.productInterest}
            readOnly
          />
          <input
            type="hidden"
            name="quote_source"
            value={formState.quoteSource}
            readOnly
          />
          <input
            type="hidden"
            name="selected_unit"
            value={formState.unit}
            readOnly
          />
          {utmKeys.map((key) => (
            <input
              key={key}
              type="hidden"
              name={key}
              value={utmValues[key]}
              readOnly
            />
          ))}

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label={localized(fields.companyName.label, language)}
              placeholder={localized(fields.companyName.placeholder, language)}
              name="company_name"
              value={formState.companyName}
              onChange={(value) => updateField("companyName", value)}
            />
            <TextField
              label={localized(fields.contactPerson.label, language)}
              placeholder={localized(fields.contactPerson.placeholder, language)}
              name="contact_person"
              value={formState.contactPerson}
              onChange={(value) => updateField("contactPerson", value)}
            />
            <TextField
              label={localized(fields.phone.label, language)}
              placeholder={localized(fields.phone.placeholder, language)}
              name="phone"
              value={formState.phone}
              onChange={(value) => updateField("phone", value)}
              required
            />
            <TextField
              label={localized(fields.email.label, language)}
              placeholder={localized(fields.email.placeholder, language)}
              name="email"
              type="email"
              value={formState.email}
              onChange={(value) => updateField("email", value)}
            />
            <TextField
              ref={productInputRef}
              label={localized(fields.productInterest.label, language)}
              placeholder={localized(
                fields.productInterest.placeholder,
                language
              )}
              name="product_interest"
              value={formState.productInterest}
              onChange={(value) => updateField("productInterest", value)}
            />
            <TextField
              label={localized(fields.selectedMaterial.label, language)}
              placeholder={localized(
                fields.selectedMaterial.placeholder,
                language
              )}
              name="selected_material"
              value={formState.selectedMaterial}
              onChange={(value) => updateField("selectedMaterial", value)}
            />
            <TextField
              label={localized(fields.selectedPrice.label, language)}
              placeholder={localized(fields.selectedPrice.placeholder, language)}
              name="selected_price"
              value={formState.selectedPrice}
              onChange={(value) => updateField("selectedPrice", value)}
            />
            <TextField
              label={localized(fields.unit.label, language)}
              placeholder={localized(fields.unit.placeholder, language)}
              name="unit"
              value={formState.unit}
              onChange={(value) => updateField("unit", value)}
            />
            <TextField
              label={localized(fields.quantity.label, language)}
              placeholder={localized(fields.quantity.placeholder, language)}
              name="quantity"
              value={formState.quantity}
              onChange={(value) => updateField("quantity", value)}
              className="sm:col-span-2"
            />
            <TextAreaField
              label={localized(fields.message.label, language)}
              placeholder={localized(fields.message.placeholder, language)}
              name="message"
              value={formState.message}
              onChange={(value) => updateField("message", value)}
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="primary-button mt-6">
            <Send aria-hidden className="mr-2" size={17} />
            {localized(content.submitButtonText, language)}
          </button>

          {status === "success" ? (
            <p className="mt-4 text-sm font-semibold text-brass dark:text-champagne">
              {localized(content.successMessage, language)}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="mt-4 text-sm font-semibold text-red-700 dark:text-red-300">
              {localized(content.errorMessage, language)}
            </p>
          ) : null}
        </form>
      </div>
    </SectionWrapper>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
};

const fieldClass =
  "mt-2 min-h-11 w-full rounded-md border border-stone-300 bg-[#fbf7ef] px-3 text-sm text-charcoal outline-none transition placeholder:text-stone-400 focus:border-brass focus:ring-2 focus:ring-champagne/40 dark:border-stone-700 dark:bg-ink dark:text-ivory dark:placeholder:text-stone-500";

const TextField = forwardRef<HTMLInputElement, FieldProps>(function TextField(
    {
      label,
      placeholder,
      name,
      value,
      onChange,
      type = "text",
      required = false,
      className = ""
    },
    ref
  ) {
    return (
      <label className={`block text-sm font-semibold text-charcoal dark:text-ivory ${className}`}>
        {label}
        <input
          ref={ref}
          className={fieldClass}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }
);

function TextAreaField({
  label,
  placeholder,
  name,
  value,
  onChange
}: FieldProps) {
  return (
    <label className="block text-sm font-semibold text-charcoal dark:text-ivory sm:col-span-2">
      {label}
      <textarea
        className={`${fieldClass} min-h-32 py-3`}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
