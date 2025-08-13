"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { PlagiarismResult } from "@/types/index";

interface PlagiarismResultsProps {
  result: PlagiarismResult;
}

export default function PlagiarismResults({ result }: PlagiarismResultsProps) {
  const [showHighlights, setShowHighlights] = useState(true);

  const getScoreColor = (score: number) => {
    if (score < 15) return "text-green-400";
    if (score < 30) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreStatus = (score: number) => {
    if (score < 15) return "Low Risk";
    if (score < 30) return "Medium Risk";
    return "High Risk";
  };

  const highlightText = (text: string) => {
    if (!showHighlights || result.matches.length === 0) {
      return <span>{text}</span>;
    }

    let highlightedText = text;
    const sortedMatches = [...result.matches].sort(
      (a, b) => b.startIndex - a.startIndex,
    );

    sortedMatches.forEach((match) => {
      const beforeText = highlightedText.substring(0, match.startIndex);
      const matchText = highlightedText.substring(
        match.startIndex,
        match.endIndex,
      );
      const afterText = highlightedText.substring(match.endIndex);

      highlightedText =
        beforeText +
        `<mark class="highlight-plagiarism">${matchText}</mark>` +
        afterText;
    });

    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Score Overview */}
      <div className="bg-gray-dark border border-gray-medium rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Plagiarism Report
          </h2>
          <button
            onClick={() => setShowHighlights(!showHighlights)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-medium hover:bg-gray-light rounded-lg transition-colors"
          >
            {showHighlights ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="text-sm">
              {showHighlights ? "Hide" : "Show"} Highlights
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div
              className={`text-4xl font-bold ${getScoreColor(result.overallScore)} mb-2`}
            >
              {result.overallScore.toFixed(1)}%
            </div>
            <div className="text-gray-400">Similarity Score</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              {result.overallScore < 15 ? (
                <CheckCircle className="h-8 w-8 text-green-400" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              )}
            </div>
            <div
              className={`font-medium ${getScoreColor(result.overallScore)}`}
            >
              {getScoreStatus(result.overallScore)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              {result.matches.length}
            </div>
            <div className="text-gray-400">Matches Found</div>
          </div>
        </div>
      </div>

      {/* Matches Details */}
      {result.matches.length > 0 && (
        <div className="bg-gray-dark border border-gray-medium rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Detected Matches
          </h3>
          <div className="space-y-4">
            {result.matches.map((match, index) => (
              <div
                key={index}
                className="border border-gray-light rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-accent">
                    Match #{index + 1}
                  </span>
                  <span className="text-sm text-gray-400">
                    {(match.similarity * 100).toFixed(1)}% similarity
                  </span>
                </div>
                <p className="text-gray-300 bg-gray-900 p-3 rounded border-l-4 border-accent">
                  "{match.text}"
                </p>
                {match.source && (
                  <p className="text-sm text-gray-400 mt-2">
                    Source: {match.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Text with Highlights */}
      <div className="bg-gray-dark border border-gray-medium rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Document Text</h3>
        <div className="bg-gray-900 p-4 rounded border max-h-96 overflow-y-auto">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {highlightText(result.processedText)}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {result.processedText.length} characters •{" "}
          {result.processedText.split(" ").length} words
        </p>
      </div>
    </div>
  );
}
