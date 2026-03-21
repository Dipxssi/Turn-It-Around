import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

type InquiryBody = {
  name?: string;
  organization?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
