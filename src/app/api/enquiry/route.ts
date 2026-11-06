import { NextResponse } from "next/server";
import { normalizeEnquiry, validateEnquiry } from "@/lib/enquiryValidation";

export const runtime = "nodejs";

const CONTACT_API = "https://getdemo.in/Sunrise_Builders/api/contact";

export async function POST(req: Request) {
  try {
    // Limit unexpected large bodies before JSON parsing.
    const raw = await req.text();
    if (raw.length > 10_000) {
      return NextResponse.json({ status: false, message: "Request is too large." }, { status: 413 });
    }
    const body: unknown = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ status: false, message: "Invalid enquiry." }, { status: 400 });
    }
    const request = body as Record<string, unknown>;

    const enquiry = normalizeEnquiry(request);
    const errors = validateEnquiry(enquiry);
    if (Object.keys(errors).length) {
      return NextResponse.json({ status: false, message: "Please correct the enquiry fields.", errors }, { status: 400 });
    }

    // Only the six fields expected by the supplied backend are forwarded.
    const upstream = await fetch(CONTACT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(enquiry),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    const result: unknown = await upstream.json().catch(() => null);
    const response = result && typeof result === "object" ? result as Record<string, unknown> : {};
    if (!upstream.ok || response.status !== true) {
      const message = typeof response.message === "string" && response.message.length < 250
        ? response.message
        : "Unable to submit your enquiry right now. Please try again.";
      return NextResponse.json({ status: false, message }, { status: upstream.ok ? 502 : upstream.status });
    }

    return NextResponse.json({ status: true, message: "Contact inquiry submitted successfully." });
  } catch {
    // Do not log contact details or expose upstream technical details to visitors.
    return NextResponse.json(
      { status: false, message: "Our enquiry service is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}