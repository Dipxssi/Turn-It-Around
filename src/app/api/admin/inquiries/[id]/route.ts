import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const auth = await getAuthenticatedUser(_request);
  if (!("user" in auth)) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await context.params;

  try {
    const ref = getAdminDb().collection("inquiries").doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }
    await ref.delete();
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Delete inquiry failed:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
