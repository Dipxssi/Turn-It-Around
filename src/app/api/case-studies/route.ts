import { NextResponse } from "next/server";
import {
  getAllContent,
  filterContentByType,
  type ContentItem,
} from "@/lib/content";
import staticContentData from "@/data/content.json";

export async function GET() {
  try {
    const staticContent = staticContentData as ContentItem[];
    const allContent = await getAllContent(staticContent);
    const caseStudies = filterContentByType(allContent, "case-study");

    // Filter out test data
    const filteredCaseStudies = caseStudies.filter(
      (item) => !item.title.toLowerCase().includes("test")
    );

    return NextResponse.json(filteredCaseStudies, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
