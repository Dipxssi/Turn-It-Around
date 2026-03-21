import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp, type DocumentData } from "firebase-admin/firestore";

type RouteContext = { params: Promise<{ id: string }> };

function serializeDoc(id: string, data: DocumentData) {
  return {
    id,
    title: data.title ?? "",
    type: data.type ?? "blog",
    summary: data.summary ?? null,
    content: data.content ?? "",
    coverImageUrl: data.coverImageUrl ?? null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : data.createdAt ?? null,
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt ?? null,
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const snap = await getAdminDb().collection("resources").doc(id).get();

    if (!snap.exists) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const resource = serializeDoc(snap.id, snap.data()!);
    return NextResponse.json({ resource }, { status: 200 });
  } catch (error) {
    console.error("Public resource fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to load resource." },
      { status: 500 }
    );
  }
}
