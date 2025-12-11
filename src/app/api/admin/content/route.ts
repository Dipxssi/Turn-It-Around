import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");

    const filePath = join(process.cwd(), "data", "content.json");
    let content = [];

    try {
      const fileContent = await readFile(filePath, "utf-8");
      content = JSON.parse(fileContent);
    } catch (err) {
      // File doesn't exist yet, return empty array
      return NextResponse.json({ content: [] });
    }

    // Filter by type if provided
    if (type) {
      content = content.filter((item: any) => item.type === type);
    }

    // Filter by category if provided
    if (category) {
      content = content.filter((item: any) => item.category === category);
    }

    // Only return published content
    content = content.filter((item: any) => item.published !== false);

    // Sort by creation date (newest first)
    content.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, title, content, excerpt, category, tags, author, imageUrl } = body;

    // Validate required fields
    if (!type || !title || !content || !excerpt || !category || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create content object
    const contentItem = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      author,
      imageUrl: imageUrl || "",
      createdAt: new Date().toISOString(),
      published: true,
    };

    // Save to file (in production, use a database)
    const dataDir = join(process.cwd(), "data");
    try {
      await mkdir(dataDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    const filePath = join(dataDir, "content.json");
    let existingContent = [];

    try {
      const fileContent = await readFile(filePath, "utf-8");
      existingContent = JSON.parse(fileContent);
    } catch (err) {
      // File doesn't exist yet, start with empty array
    }

    existingContent.push(contentItem);
    await writeFile(filePath, JSON.stringify(existingContent, null, 2));

    return NextResponse.json({
      success: true,
      content: contentItem,
    });
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}

