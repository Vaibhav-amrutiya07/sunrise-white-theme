"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowButton } from "@/components/ui/Arrow";
import {
  emptyEnquiry,
  serviceOptions,
  validateEnquiry,
  type EnquiryData,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/enquiryValidation";

type Status = "idle" | "sending" | "error";
type Captcha = { image: string; answer: string };

// CAPTCHA lives entirely in this browser component. No CAPTCHA fields are sent to the API.
const CAPTCHA_ALPHABET = "ACDEFGHJKLMNPQRTUVWXY346789";

function createClientCaptcha(): Captcha {
  const random = new Uint8Array(40);
  window.crypto.getRandomValues(random);
  const answer = Array.from(random.slice(0, 5), (value) =>
    CAPTCHA_ALPHABET[value % CAPTCHA_ALPHABET.length],
  ).join("");

  const noise = Array.from({ length: 12 }, (_, index) => {
    const value = random[5 + index];
    const x = 9 + index * 17;
    const y = 10 + (value % 49);
    return `<path d="M${x} ${y}l${(value % 15) - 7} ${(value % 13) - 6}" stroke="#D9A441" stroke-opacity=".28" stroke-width="1.2"/>`;
  }).join("");
  const letters = Array.from(answer, (character, index) => {
    const y = 50 + (random[17 + index] % 11) - 5;
    const rotate = (random[22 + index] % 23) - 11;
    const x = 31 + index * 35;
    const color = index % 2 ? "#F7F7F3" : "#D9A441";
    return `<text x="${x}" y="${y}" transform="rotate(${rotate} ${x} ${y})" fill="${color}" font-size="35" font-weight="800" font-family="Arial,sans-serif" text-anchor="middle">${character}</text>`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="74" viewBox="0 0 220 74">
    <rect width="220" height="74" rx="5" fill="#18324A"/>
    <path d="M0 66L220 8M0 18L220 61" stroke="#D9A441" stroke-opacity=".25" stroke-width="1.4"/>
    ${noise}${letters}
  </svg>`;
  return { image: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, answer };
}

const order: { key: EnquiryField; number: string; label: string }[] = [
  { key: "full_name", number: "01", label: "Full Name" },
  { key: "phone_number", number: "02", label: "Phone Number" },
  { key: "email", number: "03", label: "Email Address" },
  { key: "service_required", number: "04", label: "Service Required" },
  { key: "project_location", number: "05", label: "Project Location" },
  { key: "project_details", number: "06", label: "Project Details" },
];

const control =
  "peer w-full border-b bg-transparent pb-3 pt-7 font-body text-base text-charcoal outline-none transition-colors placeholder:text-transparent hover:border-navy/40";

function Wrap({
  field, number, label, always, focus, value, error, children,
}: {
  field: EnquiryField;
  number: string;
  label: string;
  always?: boolean;
  focus: EnquiryField | "";
  value: string;
  error?: string;
  children: React.ReactNode;
}) {
  const raised = always || focus === field || value !== "";
  const valid = value.trim() !== "" && !error;
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={field}
        className={`pointer-events-none absolute left-0 flex items-center gap-2 font-sub font-medium uppercase tracking-wider transition-all duration-300 ${
          raised ? `top-0 text-[11px] ${focus === field ? "text-gold" : "text-slate"}` : "top-7 text-sm text-slate"
        }`}
      >
        <span className={`tabular-nums transition-colors ${focus === field || valid ? "text-gold" : "text-navy/30"}`}>{number}</span>
        {label}
      </label>
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-3.5 right-0 grid h-5 w-5 place-items-center rounded-full bg-gold text-navy transition-all duration-500 ${
          valid && focus !== field ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 6.2 2.2 2.2 4.8-4.8" />
        </svg>
      </span>
      <span className={`absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-500 ${error ? "scale-x-100 bg-red-600" : focus === field ? "scale-x-100 bg-gold" : "scale-x-0 bg-gold"}`} />
      {error && <p id={`${field}-error`} role="alert" className="mt-1.5 font-sub text-xs text-red-700">{error}</p>}
    </div>
  );
}

export default function EnquiryForm({ initialService = "" }: { initialService?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<EnquiryData>(() => ({
    ...emptyEnquiry,
    service_required: serviceOptions.includes(initialService) ? initialService : "",
  }));
  const [focus, setFocus] = useState<EnquiryField | "">("");
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captcha, setCaptcha] = useState<Captcha | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaMessage, setCaptchaMessage] = useState("");
  const captchaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (serviceOptions.includes(initialService)) {
      setValues((previous) => ({ ...previous, service_required: initialService }));
    }
  }, [initialService]);

  const loadCaptcha = useCallback(() => {
    setCaptcha(createClientCaptcha());
    setCaptchaInput("");
    setCaptchaMessage("");
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  const allErrors = validateEnquiry(values);
  const errors: EnquiryErrors = {};
  order.forEach(({ key }) => {
    if (touched[key] && allErrors[key]) errors[key] = allErrors[key];
  });
  const filled = order.filter(({ key }) => values[key].trim() && !allErrors[key]).length;

  const change = (field: EnquiryField, rawValue: string) => {
    const nextValue = field === "phone_number" ? rawValue.replace(/\D/g, "").slice(0, 10) : rawValue;
    setValues((previous) => ({ ...previous, [field]: nextValue }));
    if (status === "error") { setStatus("idle"); setServerMessage(""); }
  };

  const bind = (field: EnquiryField) => ({
    id: field,
    name: field,
    value: values[field],
    onFocus: () => setFocus(field),
    onBlur: () => {
      setFocus("");
      setTouched((previous) => ({ ...previous, [field]: true }));
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => change(field, event.target.value),
    "aria-invalid": Boolean(errors[field]) as boolean,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const wrap = (field: EnquiryField, children: React.ReactNode, always = false) => {
    const item = order.find(({ key }) => key === field)!;
    return (
      <Wrap
        field={field}
        number={item.number}
        label={item.label}
        always={always}
        focus={focus}
        value={values[field]}
        error={errors[field]}
      >
        {children}
      </Wrap>
    );
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const currentErrors = validateEnquiry(values);
    if (Object.keys(currentErrors).length) {
      setTouched(Object.fromEntries(order.map(({ key }) => [key, true])) as Record<EnquiryField, boolean>);
      const invalidField = order.find(({ key }) => currentErrors[key]);
      if (invalidField) document.getElementById(invalidField.key)?.focus();
      return;
    }
    if (!captcha || !captchaInput.trim()) {
      setCaptchaMessage(captcha ? "Please enter the verification code." : "Refresh the CAPTCHA and try again.");
      captchaRef.current?.focus();
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captcha.answer) {
      loadCaptcha();
      setCaptchaMessage("Incorrect verification code. Please enter the new code.");
      captchaRef.current?.focus();
      return;
    }

    setServerMessage("");
    setCaptchaMessage("");
    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: values.full_name.trim(),
          email: values.email.trim(),
          phone_number: values.phone_number.trim(),
          service_required: values.service_required.trim(),
          project_location: values.project_location.trim(),
          project_details: values.project_details.trim(),
        }),
      });
      const result: { status?: boolean; message?: string; errors?: EnquiryErrors } = await response.json();
      if (!response.ok || result.status !== true) {
        if (result.errors) {
          setTouched(Object.fromEntries(order.map(({ key }) => [key, true])) as Record<EnquiryField, boolean>);
        }
        throw new Error(result.message || "Unable to send your enquiry. Please try again.");
      }
      router.push("/thank-you");
    } catch (error) {
      setStatus("error");
      setServerMessage(error instanceof Error ? error.message : "Unable to send your enquiry. Please try again.");
      loadCaptcha();
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-9">
      <div aria-live="polite">
        <div className="mb-3 flex items-end justify-between font-sub">
          <span />
          <span className="text-sm font-semibold tabular-nums text-navy">{filled}<span className="text-slate">/6</span><span className="sr-only"> valid fields completed</span></span>
        </div>
        <div className="grid grid-cols-6 gap-1.5" aria-hidden>
          {order.map(({ key }) => (
            <div key={key} className="relative h-1 overflow-hidden bg-navy/10">
              <span className={`absolute inset-0 origin-left bg-gold transition-transform duration-500 ${values[key].trim() && !allErrors[key] ? "scale-x-100" : "scale-x-0"}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-9 md:grid-cols-2">
        {wrap("full_name", <input {...bind("full_name")} type="text" maxLength={50} required autoComplete="name" className={`${control} ${errors.full_name ? "border-red-600" : "border-navy/20"}`} />)}
        {wrap("phone_number", <input {...bind("phone_number")} type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} required autoComplete="tel" className={`${control} ${errors.phone_number ? "border-red-600" : "border-navy/20"}`} />)}
        {wrap("email", <input {...bind("email")} type="email" maxLength={50} required autoComplete="email" className={`${control} ${errors.email ? "border-red-600" : "border-navy/20"}`} />)}
        {wrap("service_required", (
          <>
            <select {...bind("service_required")} required className={`${control} cursor-pointer appearance-none pr-8 ${errors.service_required ? "border-red-600" : "border-navy/20"}`}>
              <option value="" disabled>Select a service</option>
              {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <svg aria-hidden viewBox="0 0 24 24" className={`pointer-events-none absolute bottom-4 right-7 h-4 w-4 text-navy transition-transform duration-300 ${focus === "service_required" ? "rotate-180 text-gold" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </>
        ), true)}
      </div>

      {wrap("project_location", <input {...bind("project_location")} type="text" maxLength={50} required className={`${control} ${errors.project_location ? "border-red-600" : "border-navy/20"}`} />)}
      <div>
        {wrap("project_details", <textarea {...bind("project_details")} rows={4} maxLength={500} required className={`${control} resize-y ${errors.project_details ? "border-red-600" : "border-navy/20"}`} />)}
        <p className="mt-2 text-right font-sub text-xs tabular-nums text-slate">{values.project_details.length}/500 characters</p>
      </div>

      <div className="border border-navy/10 bg-offwhite/70 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-sub text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Security Verification</p>
            <p className="mt-1 font-sub text-sm text-slate">Enter the 5-character code shown below.</p>
          </div>
          <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-navy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-[74px] w-[220px] max-w-full items-center justify-center overflow-hidden rounded bg-navy text-offwhite" aria-label="CAPTCHA verification code image">
            {captcha ? <img src={captcha.image} width={220} height={74} alt="CAPTCHA: enter the characters displayed" draggable={false} /> : <span className="font-sub text-xs">Loading code…</span>}
          </div>
          <button
            type="button"
            onClick={loadCaptcha}
            disabled={status === "sending"}
            aria-label="Generate a new verification code"
            title="Refresh CAPTCHA"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-gold hover:bg-gold/10 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 11a8 8 0 1 0-2.4 5.7M20 4v7h-7"/></svg>
          </button>
        </div>
        <label htmlFor="captcha_answer" className="mt-5 block font-sub text-xs font-semibold uppercase tracking-wider text-navy">Verification Code <span className="text-red-700">*</span></label>
        <input
          ref={captchaRef}
          id="captcha_answer"
          type="text"
          value={captchaInput}
          onChange={(event) => { setCaptchaInput(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5)); setCaptchaMessage(""); }}
          maxLength={5}
          required
          autoComplete="off"
          spellCheck={false}
          aria-invalid={Boolean(captchaMessage)}
          aria-describedby={captchaMessage ? "captcha-error" : undefined}
          placeholder="Enter the code"
          className={`mt-2 w-full max-w-[300px] border-b bg-transparent py-3 font-sub text-base uppercase tracking-[0.18em] text-charcoal outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-slate/60 focus:border-gold ${captchaMessage ? "border-red-600" : "border-navy/20"}`}
        />
        {captchaMessage && <p id="captcha-error" role="alert" className="mt-2 font-sub text-xs text-red-700">{captchaMessage}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="border-l-2 border-red-600 bg-red-50 px-4 py-3 font-sub text-sm text-red-800">
          {serverMessage}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <p className="max-w-xs font-sub text-xs leading-relaxed text-slate">Your project details help us understand your requirements. Fields marked * are required.</p>
        <ArrowButton type="submit" tone="navy" disabled={status === "sending" || !captcha}>
          {status === "sending" ? "Sending…" : "Submit Enquiry"}
        </ArrowButton>
      </div>
    </form>
  );
}