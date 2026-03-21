import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/admin-auth";
import { getAdminStorage } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (!("user" in auth)) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const formData = await request.formData();
    const fileEntry = formData.get("file");
    const bucketEntry = formData.get("bucket");

    if (!(fileEntry instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded. Use form-data field named 'file'." },
        { status: 400 }
      );
    }

    const bucketName =
      typeof bucketEntry === "string" && bucketEntry.trim()
        ? bucketEntry.trim()
        : process.env.FIREBASE_STORAGE_BUCKET;

    if (!bucketName) {
      return NextResponse.json(
        { error: "Missing FIREBASE_STORAGE_BUCKET environment variable." },
        { status: 500 }
      );
    }

    const fileExt = fileEntry.name.split(".").pop() || "bin";
    const safeExt = fileExt.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "bin";
    const filePath = `${auth.user!.id}/${Date.now()}-${crypto.randomUUID()}.${safeExt}`;
    const fileBuffer = Buffer.from(await fileEntry.arrayBuffer());

    const bucket = getAdminStorage().bucket(bucketName);
    const targetFile = bucket.file(filePath);
    await targetFile.save(fileBuffer, {
      resumable: false,
      metadata: {
        contentType: fileEntry.type || "application/octet-stream",
      },
    });

    const [signedUrl] = await targetFile.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        bucket: bucketName,
        filePath,
        downloadUrl: signedUrl,
        gsUrl: `gs://${bucketName}/${filePath}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin upload failed:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
