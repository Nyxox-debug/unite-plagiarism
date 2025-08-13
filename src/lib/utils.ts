import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function calculateSimilarity(text1: string, text2: string): number {
  // Simple Jaccard similarity for demonstration
  const set1 = new Set(text1.toLowerCase().split(/\s+/));
  const set2 = new Set(text2.toLowerCase().split(/\s+/));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
}

export function findSimilarSentences(
  text: string,
  referenceTexts: string[],
  threshold: number = 0.3,
) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 20);
  const matches = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();

    for (const refText of referenceTexts) {
      const refSentences = refText
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 20);

      for (const refSentence of refSentences) {
        const similarity = calculateSimilarity(sentence, refSentence.trim());

        if (similarity > threshold) {
          const startIndex = text.indexOf(sentence);
          matches.push({
            text: sentence,
            startIndex,
            endIndex: startIndex + sentence.length,
            similarity,
            source: "Reference document",
          });
        }
      }
    }
  }

  return matches;
}
