import { PlagiarismResult, PlagiarismMatch } from "@/types/index";
import { findSimilarSentences } from "./utils";

// Sample reference texts for demonstration
const REFERENCE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This is a common phrase used in typography and printing.",
  "Climate change is one of the most pressing issues of our time. It affects weather patterns globally.",
  "Artificial intelligence has revolutionized many industries. Machine learning algorithms can process vast amounts of data.",
  "Education is the foundation of progress in any society. It empowers individuals and communities.",
  "Technology has transformed the way we communicate and interact with each other in the modern world.",
];

export async function checkPlagiarism(text: string): Promise<PlagiarismResult> {
  try {
    const cleanText = text.trim();

    if (cleanText.length < 50) {
      return {
        overallScore: 0,
        matches: [],
        processedText: cleanText,
      };
    }

    // Find similar sentences
    const matches = findSimilarSentences(cleanText, REFERENCE_TEXTS, 0.2);

    // Calculate overall plagiarism score
    const uniqueMatches = Array.from(
      new Map(matches.map((match) => [match.text, match])).values(),
    );

    const totalMatchedLength = uniqueMatches.reduce(
      (sum, match) => sum + match.text.length,
      0,
    );
    const overallScore = Math.min(
      (totalMatchedLength / cleanText.length) * 100,
      100,
    );

    return {
      overallScore: Math.round(overallScore * 100) / 100,
      matches: uniqueMatches,
      processedText: cleanText,
    };
  } catch (error: any) {
    throw new Error(`Plagiarism check failed: ${error.message}`);
  }
}
