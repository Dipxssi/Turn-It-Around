"use client";

import Link from "next/link";
import { useState } from "react";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

type FormValues = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) nextErrors.name = "Full name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name as keyof FormValues];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit your message.");
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      setSubmitting(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit your message. Please try again."
      );
    }
  };

  const renderFieldWrapper = (
    fieldName: keyof FormValues,
    children: React.ReactNode
  ) => {
    const hasError = Boolean(errors[fieldName]);
    return (
      <div className="space-y-1">
        {children}
        {hasError && (
          <p className="text-[12px] text-red-500 font-body">
            {errors[fieldName]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white text-[var(--navy)]">
      <NavBar />

      {/* HERO */}
      <PageHero
        eyebrow="Get In Touch"
        headline="We Are Happy to Answer All Your Questions"
        subtext="Reach out — we typically respond within a few hours."
        subtextNoWrap
        imagePlaceholder="TBS Office — Nairobi"
        imageUrl="/values.png"
        imageObjectPosition="center 20%"
      />

      {/* CONTACT MAIN */}
      <section className="bg-white py-[100px] px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-16 md:gap-[64px]">
          {/* Left column — details */}
          <div className="space-y-6">
            <p className="font-body text-[12px] text-[#0091DA] uppercase">
              Find Us
            </p>
            <h2 className="font-heading text-[34px] text-[var(--navy)]">
              Get in Touch with us!
            </h2>
            <p className="font-body text-[15px] text-[var(--text-muted)]">
              For any inquiry
            </p>
            <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.7] mb-10">
              In today's fast-changing business world, staying competitive
              requires agility and innovation. Turnitaround Business Solution is
              your trusted partner in driving transformation, growth, and
              sustainable success.
            </p>

            <div className="space-y-6">
              {/* Office */}
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-[#0091DA] mt-1" strokeWidth={2} />
                <div>
                  <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.1em]">
                    Our Office
                  </p>
                  <p className="font-body text-[15px] text-[var(--navy)] mt-1">
                    Utalii House, Utalii Street, Central Business District (CBD), Nairobi, Kenya.
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0091DA]">
                  <Phone className="h-4 w-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.1em]">
                    Call Us
                  </p>
                  <p className="font-body text-[15px] text-[var(--navy)] mt-1">
                    (+254) 0751 216 699
                    <br />
                    (+254) 0789 217 201
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-[4px] border-2 border-[var(--blue)]">
                  <Mail className="h-4 w-4 text-[var(--blue)]" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.1em]">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@turnitaroundbusiness.com"
                    className="font-body text-[15px] text-[var(--navy)] mt-1 inline-block hover:text-[#0091DA] transition-colors"
                  >
                    info@turnitaroundbusiness.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--blue)]">
                  <Clock className="h-4 w-4 text-[var(--blue)]" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.1em]">
                    Working Hours
                  </p>
                  <p className="font-body text-[15px] text-[var(--navy)] mt-1">
                    Monday to Friday, 8:00am – 4:00pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="relative">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[var(--light-grey)] -translate-x-8" />
            <div className="md:pl-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] font-body text-red-700">
                      {submitError}
                    </p>
                  )}

                  {/* Full Name */}
                  {renderFieldWrapper(
                    "name",
                    <div className="relative">
                      <label
                        className={`font-body text-[13px] text-[var(--text-muted)] absolute left-0 transition-all pointer-events-none ${
                          values.name
                            ? "-top-4 text-[11px] text-[#0091DA]"
                            : "top-2"
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className={`w-full pt-5 pb-2 bg-transparent border-b text-[15px] font-body outline-none transition-colors ${
                          errors.name
                            ? "border-red-500"
                            : "border-[var(--text-muted)] focus:border-[var(--blue)]"
                        }`}
                      />
                    </div>
                  )}

                  {/* Organization */}
                  <div className="relative">
                    <label
                      className={`font-body text-[13px] text-[var(--text-muted)] absolute left-0 transition-all pointer-events-none ${
                        values.organization
                          ? "-top-4 text-[11px] text-[#0091DA]"
                          : "top-2"
                      }`}
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={values.organization}
                      onChange={handleChange}
                      className="w-full pt-5 pb-2 bg-transparent border-b text-[15px] font-body outline-none border-[var(--text-muted)] focus:border-[var(--blue)] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  {renderFieldWrapper(
                    "email",
                    <div className="relative">
                      <label
                        className={`font-body text-[13px] text-[var(--text-muted)] absolute left-0 transition-all pointer-events-none ${
                          values.email
                            ? "-top-4 text-[11px] text-[#0091DA]"
                            : "top-2"
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={`w-full pt-5 pb-2 bg-transparent border-b text-[15px] font-body outline-none transition-colors ${
                          errors.email
                            ? "border-red-500"
                            : "border-[var(--text-muted)] focus:border-[var(--blue)]"
                        }`}
                      />
                    </div>
                  )}

                  {/* Phone */}
                  <div className="relative">
                    <label
                      className={`font-body text-[13px] text-[var(--text-muted)] absolute left-0 transition-all pointer-events-none ${
                        values.phone
                          ? "-top-4 text-[11px] text-[#0091DA]"
                          : "top-2"
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="w-full pt-5 pb-2 bg-transparent border-b text-[15px] font-body outline-none border-[var(--text-muted)] focus:border-[var(--blue)] transition-colors"
                    />
                  </div>

                  {/* Service select */}
                  <div className="relative">
                    <label
                      className={`font-body text-[13px] text-[var(--text-muted)] absolute left-0 transition-all pointer-events-none ${
                        values.service
                          ? "-top-4 text-[11px] text-[#0091DA]"
                          : "top-2"
                      }`}
                    >
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      value={values.service}
                      onChange={handleChange}
                      className="w-full pt-5 pb-2 bg-transparent border-b text-[15px] font-body outline-none border-[var(--text-muted)] focus:border-[var(--blue)] transition-colors appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="Capacity Building for NGOs">
                        Capacity Building for NGOs
                      </option>
                      <option value="Strategic Advisory & Turnaround">
                        Strategic Advisory & Turnaround
                      </option>
                      <option value="Accounting & Financial Management">
                        Accounting & Financial Management
                      </option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  {renderFieldWrapper(
                    "message",
                    <div className="relative">
                      <label
                        className={`font-body text-[13px] text-[var(--text-muted)] absolute left-0 transition-all pointer-events-none ${
                          values.message
                            ? "-top-4 text-[11px] text-[#0091DA]"
                            : "top-2"
                        }`}
                      >
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={handleChange}
                        className={`w-full pt-5 pb-2 bg-transparent border-b text-[15px] font-body outline-none resize-y transition-colors ${
                          errors.message
                            ? "border-red-500"
                            : "border-[var(--text-muted)] focus:border-[var(--blue)]"
                        }`}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] bg-[#0091DA] text-white font-body text-[15px] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transition-colors hover:bg-[#0077B8]"
                  >
                    {submitting ? (
                      <>
                        <span>Sending...</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.1s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                        </span>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full border-2 border-[var(--blue)] flex items-center justify-center">
                    <span className="w-8 h-4 border-b-2 border-r-2 border-[var(--blue)] rotate-45 translate-y-[-2px]" />
                  </div>
                  <h3 className="font-heading text-[28px] text-[var(--navy)]">
                    Message Received!
                  </h3>
                  <p className="font-body text-[16px] text-[var(--text-muted)] max-w-md">
                    Our team is reviewing your request. We will get back to you within a few hours.
                  </p>
                  <Link
                    href="/"
                    className="font-body text-[14px] text-[#0091DA] hover:underline"
                  >
                    ← Back to homepage
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="bg-[var(--light-grey)] py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch md:items-start justify-between gap-10">
            {[
              {
                num: "1",
                title: "Submit Your Enquiry",
                body: "Fill in the form and tell us about your organization.",
              },
              {
                num: "2",
                title: "We Review & Respond",
                body: "We prioritize every inquiry, and you will hear from us shortly.",
              },
              {
                num: "3",
                title: "Discovery Call Scheduled",
                body: "We'll set up a call to explore how we can help.",
              },
            ].map((step, index, arr) => (
              <div
                key={step.num}
                className="relative flex-1 flex flex-col items-center text-center md:px-4"
              >
                {index < arr.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-1/2 right-0 translate-x-1/2 h-px bg-[#0091DA]/40" />
                )}
                {index < arr.length - 1 && (
                  <div className="md:hidden absolute left-5 top-10 bottom-0 w-px bg-[#0091DA]/40" />
                )}

                <div className="w-10 h-10 rounded-full bg-[#0091DA] flex items-center justify-center font-heading text-[18px] text-white z-10">
                  {step.num}
                </div>
                <h3 className="mt-3 font-heading text-[16px] text-[var(--navy)]">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-[13px] text-[var(--text-muted)] max-w-[180px]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="bg-[#00338D] h-[400px] flex items-center justify-center px-4 md:px-6 text-white">
        <div className="text-center space-y-3">
          <span
            className="inline-block w-8 h-8 bg-[#0091DA] mb-2"
            style={{
              clipPath: "polygon(50% 0%, 90% 40%, 50% 100%, 10% 40%)",
            }}
          />
          <h3 className="font-heading text-[20px] text-white">
            Utalii House, Central Business District (CBD), Nairobi
          </h3>
          <p className="font-body text-[14px] text-white/75">
            Utalii House, Utalii Street, Central Business District (CBD), Nairobi, Kenya
          </p>
          <a
            href="https://www.google.com/maps/place/Utalii+House/@-1.2834278,36.8162267,21z/data=!4m6!3m5!1s0x182f10d22f42bf35:0x449d7ec7b378dfeb!8m2!3d-1.2834571!4d36.8162253!16s%2Fg%2F1tcy_8t1?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-4 px-4 py-2 border border-white/40 text-[13px] font-body text-white hover:bg-white/10 transition-colors"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
