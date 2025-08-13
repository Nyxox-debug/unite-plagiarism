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
// No

export function preprocessText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(text: string): string[] {
  return preprocessText(text)
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

export function extractNgrams(tokens: string[], n: number): string[] {
  const ngrams: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(" "));
  }
  return ngrams;
}

export function calculateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = tokenize(text);
  const syllables = words.reduce(
    (count, word) => count + countSyllables(word),
    0,
  );

  if (sentences.length === 0 || words.length === 0) return 0;

  // Flesch Reading Ease Score
  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  return 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
}

function countSyllables(word: string): number {
  const vowels = word.match(/[aeiouy]/gi);
  const silentE = word.match(/e$/i);
  return Math.max(1, (vowels?.length || 0) - (silentE ? 1 : 0));
}

export function calculateJaccardSimilarity(
  text1: string,
  text2: string,
): number {
  const set1 = new Set(tokenize(text1));
  const set2 = new Set(tokenize(text2));
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return union.size > 0 ? intersection.size / union.size : 0;
}

export function calculateCosineSimilarity(
  text1: string,
  text2: string,
): number {
  const tokens1 = tokenize(text1);
  const tokens2 = tokenize(text2);
  const allTokens = [...new Set([...tokens1, ...tokens2])];

  const vector1 = allTokens.map(
    (token) => tokens1.filter((t) => t === token).length,
  );
  const vector2 = allTokens.map(
    (token) => tokens2.filter((t) => t === token).length,
  );

  const dotProduct = vector1.reduce((sum, v1, i) => sum + v1 * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, v) => sum + v * v, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, v) => sum + v * v, 0));

  return magnitude1 * magnitude2 > 0
    ? dotProduct / (magnitude1 * magnitude2)
    : 0;
}

export function calculateLevenshteinDistance(
  str1: string,
  str2: string,
): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost,
      );
    }
  }

  return matrix[str2.length][str1.length];
}

export function calculateNormalizedLevenshtein(
  text1: string,
  text2: string,
): number {
  const distance = calculateLevenshteinDistance(text1, text2);
  const maxLength = Math.max(text1.length, text2.length);
  return maxLength > 0 ? 1 - distance / maxLength : 1;
}
