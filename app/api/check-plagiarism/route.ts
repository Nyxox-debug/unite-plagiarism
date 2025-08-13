import { NextRequest, NextResponse } from "next/server";
import { checkPlagiarism } from "@/lib/plagiarismChecker";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Text content is required" },
        { status: 400 },
      );
    }

    if (text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Text content cannot be empty" },
        { status: 400 },
      );
    }

    if (text.length > 100000) {
      // 100KB text limit
      return NextResponse.json(
        { success: false, error: "Text content is too large (max 100KB)" },
        { status: 400 },
      );
    }

    // Perform plagiarism check
    const result = await checkPlagiarism(text);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Plagiarism check error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to check plagiarism",
      },
      { status: 500 },
    );
  }
}
