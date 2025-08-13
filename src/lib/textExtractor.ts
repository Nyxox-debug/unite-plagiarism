import pdfParse from "pdf-parse";
import mammoth from "mammoth";
// NOTE: The you need to create this test/data/05-versions-space.pdf in the root of your project, it is for pdf-parse, I guess the package is no longer maintened

export async function extractTextFromBuffer(
  buffer: Buffer,
  mimeType: string,
): Promise<string> {
  console.log("extractTextFromBuffer called with mimeType:", mimeType);
  console.log("Buffer size:", buffer.length);

  try {
    switch (mimeType) {
      case "application/pdf":
        console.log("Processing PDF...");
        const pdfData = await pdfParse(buffer);
        console.log("PDF text extracted, length:", pdfData.text.length);
        return pdfData.text;

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        console.log("Processing DOCX...");
        const docxResult = await mammoth.extractRawText({ buffer });
        console.log("DOCX text extracted, length:", docxResult.value.length);
        return docxResult.value;

      case "text/plain":
        console.log("Processing plain text...");
        const textContent = buffer.toString("utf-8");
        console.log("Plain text extracted, length:", textContent.length);
        return textContent;

      default:
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
  } catch (error: any) {
    console.error("Error in extractTextFromBuffer:", error);
    throw new Error(`Failed to extract text: ${error.message}`);
  }
}
