import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { Resend } from "resend";

type InquiryBody = {
  name?: string;
  organization?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL;
const resendTo = process.env.RESEND_TO_EMAIL ?? "info@turnitaroundbusiness.com";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendInquiryEmail(inquiry: {
  name: string;
  organization: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
}) {
  if (!resend || !resendFrom) return;

  const html = `
    <h2>New inquiry received</h2>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
    <p><strong>Organization:</strong> ${
      inquiry.organization ? escapeHtml(inquiry.organization) : "-"
    }</p>
    <p><strong>Phone:</strong> ${inquiry.phone ? escapeHtml(inquiry.phone) : "-"}</p>
    <p><strong>Service:</strong> ${
      inquiry.service ? escapeHtml(inquiry.service) : "General inquiry"
    }</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br/>")}</p>
  `;

  await resend.emails.send({
    from: resendFrom,
    to: resendTo,
    replyTo: inquiry.email,
    subject: `New inquiry from ${inquiry.name}`,
    html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as InquiryBody;

    const name = body.name?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const message = body.message?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const createdAt = Timestamp.now();
    const inquiry = {
      name,
      organization: body.organization?.trim() || null,
      email,
      phone: body.phone?.trim() || null,
      service: body.service?.trim() || null,
      message,
      createdAt,
    };

    const docRef = await getAdminDb().collection("inquiries").add(inquiry);
    try {
      await sendInquiryEmail(inquiry);
    } catch (emailError) {
      console.error("Sending inquiry email failed:", emailError);
    }

    return NextResponse.json(
      {
        inquiry: {
          id: docRef.id,
          ...inquiry,
          createdAt: createdAt.toDate().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Creating inquiry failed:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
