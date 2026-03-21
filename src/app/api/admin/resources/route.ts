import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

type ResourceBody = {
  title?: string;
  type?: string;
  summary?: string;
  content?: string;
  coverImageUrl?: string;
  attachmentUrl?: string;
  tags?: string[];
};

function hasRichTextContent(html: string): boolean {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0;
}

export async function GET(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (!("user" in auth)) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const snapshot = await getAdminDb()
      .collection("resources")
      .orderBy("createdAt", "desc")
      .get();

    const resources = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : data.createdAt ?? null,
        updatedAt:
          data.updatedAt instanceof Timestamp
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt ?? null,
      };
    });

    return NextResponse.json({ resources }, { status: 200 });
  } catch (error) {
    console.error("Fetching resources failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (!("user" in auth)) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await request.json()) as ResourceBody;

    if (!body.title?.trim() || !hasRichTextContent(body.content || "")) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const now = Timestamp.now();
    const resource = {
      title: body.title.trim(),
      type: body.type?.trim() || "general",
      summary: body.summary?.trim() || null,
      content: (body.content ?? "").trim(),
      coverImageUrl: body.coverImageUrl?.trim() || null,
      attachmentUrl: body.attachmentUrl?.trim() || null,
      tags: Array.isArray(body.tags) ? body.tags : [],
      createdBy: auth.user!.id,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await getAdminDb().collection("resources").add(resource);

    return NextResponse.json(
      {
        resource: {
          id: docRef.id,
          ...resource,
          createdAt: now.toDate().toISOString(),
          updatedAt: now.toDate().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Creating resource failed:", error);
    return NextResponse.json(
      { error: "Failed to create resource." },
      { status: 500 }
    );
  }
}
