import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

type ResourceBody = {
  title?: string;
  type?: string;
  summary?: string;
  content?: string;
  coverImageUrl?: string | null;
  attachmentUrl?: string | null;
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

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await getAuthenticatedUser(request);
  if (!("user" in auth)) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as ResourceBody;
    const ref = getAdminDb().collection("resources").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json({ error: "Resource not found." }, { status: 404 });
    }

    const data = snap.data();
    if (data?.createdBy !== auth.user!.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (!body.title?.trim() || !hasRichTextContent(body.content || "")) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const now = Timestamp.now();
    const updates = {
      title: body.title.trim(),
      type: body.type?.trim() || "blog",
      summary: body.summary?.trim() || null,
      content: (body.content ?? "").trim(),
      coverImageUrl: body.coverImageUrl?.trim() || null,
      attachmentUrl: body.attachmentUrl?.trim() || null,
      tags: Array.isArray(body.tags) ? body.tags : [],
      updatedAt: now,
    };

    await ref.update(updates);

    return NextResponse.json(
      {
        ok: true,
        id,
        updatedAt: now.toDate().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Updating resource failed:", error);
    return NextResponse.json(
      { error: "Failed to update resource." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await getAuthenticatedUser(request);
  if (!("user" in auth)) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await context.params;

  try {
    const ref = getAdminDb().collection("resources").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json({ error: "Resource not found." }, { status: 404 });
    }

    const data = snap.data();
    if (data?.createdBy !== auth.user!.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    await ref.delete();

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Deleting resource failed:", error);
    return NextResponse.json(
      { error: "Failed to delete resource." },
      { status: 500 }
    );
  }
}
