export interface PlagiarismResult {
  overallScore: number;
  matches: PlagiarismMatch[];
  processedText: string;
}

export interface PlagiarismMatch {
  text: string;
  startIndex: number;
  endIndex: number;
  similarity: number;
  source?: string;
}

export interface FileUploadResponse {
  success: boolean;
  extractedText?: string;
  error?: string;
}

export interface PlagiarismCheckResponse {
  success: boolean;
  result?: PlagiarismResult;
  error?: string;
}
