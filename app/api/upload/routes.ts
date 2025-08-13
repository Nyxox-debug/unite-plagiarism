import { NextRequest, NextResponse } from "next/server";
// FIX: Currently, file processing is handled in the extract-text route

// This route can be used for future file upload functionality
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Basic file validation
    const supportedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!supportedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Unsupported file type" },
        { status: 400 },
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      return NextResponse.json(
        { success: false, error: "File size must be less than 10MB" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 },
    );
  }
}
