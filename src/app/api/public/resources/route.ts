import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp, type DocumentData } from "firebase-admin/firestore";

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

/**
 * Public list of resources published from admin (Firestore).
 * Optional: ?type=blog | case-study
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get("type");

    const snapshot = await getAdminDb()
      .collection("resources")
      .orderBy("createdAt", "desc")
      .limit(200)
      .get();

    let resources = snapshot.docs.map((doc) =>
      serializeDoc(doc.id, doc.data())
    );

    if (typeFilter === "blog" || typeFilter === "case-study") {
      resources = resources.filter((r) => r.type === typeFilter);
    }

    return NextResponse.json({ resources }, { status: 200 });
  } catch (error) {
    console.error("Public resources list failed:", error);
    return NextResponse.json(
      { error: "Failed to load resources." },
      { status: 500 }
    );
  }
}
