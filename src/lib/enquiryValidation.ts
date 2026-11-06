import { services } from "@/config/services";

export type EnquiryField =
  | "full_name"
  | "phone_number"
  | "email"
  | "service_required"
  | "project_location"
  | "project_details";

export type EnquiryData = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const serviceOptions = [...services.map((service) => service.title), "Other"];

export const emptyEnquiry: EnquiryData = {
  full_name: "",
  phone_number: "",
  email: "",
  service_required: "",
  project_location: "",
  project_details: "",
};

// Used on both client and server. The API must not rely on browser-only validation.
export function validateEnquiry(values: EnquiryData): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = values.full_name.trim();
  const phone = values.phone_number.trim();
  const email = values.email.trim();
  const service = values.service_required.trim();
  const location = values.project_location.trim();
  const details = values.project_details.trim();

  if (!name) errors.full_name = "Please enter your full name.";
  else if (name.length > 50) errors.full_name = "Name must be 50 characters or fewer.";

  if (!/^\d{10}$/.test(phone)) errors.phone_number = "Enter a valid 10-digit phone number (numbers only).";

  // Single @, complete domain, no whitespace or consecutive dots.
  const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i;
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > 50) errors.email = "Email must be 50 characters or fewer.";
  else if (!emailPattern.test(email) || email.includes("..")) errors.email = "Please enter a valid email address.";

  if (!serviceOptions.includes(service)) errors.service_required = "Please select a service.";

  if (!location) errors.project_location = "Please enter the project location.";
  else if (location.length > 50) errors.project_location = "Location must be 50 characters or fewer.";

  if (!details) errors.project_details = "Please describe your project.";
  else if (details.length > 500) errors.project_details = "Details must be 500 characters or fewer.";

  return errors;
}

export function normalizeEnquiry(input: Record<string, unknown>): EnquiryData {
  const result = { ...emptyEnquiry };
  (Object.keys(result) as EnquiryField[]).forEach((key) => {
    result[key] = typeof input[key] === "string" ? input[key].trim() : "";
  });
  return result;
}