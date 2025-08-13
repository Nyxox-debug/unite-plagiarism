import { NextRequest, NextResponse } from "next/server";
import { extractTextFromBuffer } from "@/lib/textExtractor";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log("File type:", file.type);
    console.log("File size:", file.size);

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from the buffer
    const extractedText = await extractTextFromBuffer(buffer, file.type);

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "No text could be extracted from the file" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      extractedText: extractedText.trim(),
    });
  } catch (error) {
    console.error("Text extraction error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to extract text from file",
      },
      { status: 500 },
    );
  }
}
