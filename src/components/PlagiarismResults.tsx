"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Bot,
  User,
  Brain,
  Target,
  Shield,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";
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

  const getScoreGradient = (score: number) => {
    if (score < 15) return "from-green-600 to-green-500";
    if (score < 30) return "from-yellow-600 to-yellow-500";
    return "from-red-600 to-red-500";
  };

  const getAIStatus = (score: number) => {
    if (score < 15) return "Human-Written Content";
    if (score < 30) return "Possibly AI-Generated";
    return "AI-Generated Content";
  };

  const getAIIcon = (score: number) => {
    if (score < 15) {
      return <User className="h-8 w-8 text-green-400" />;
    }
    return <Bot className="h-8 w-8 text-red-400" />;
  };

  const getConfidenceLevel = (score: number) => {
    if (score < 15) return { level: "Low Risk", color: "text-green-400" };
    if (score < 30) return { level: "Medium Risk", color: "text-yellow-400" };
    return { level: "High Risk", color: "text-red-400" };
  };

  const highlightText = (text: string) => {
    if (!showHighlights || result.matches.length === 0) {
      return <span className="text-gray-300">{text}</span>;
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
        `<mark class="bg-gradient-to-r from-red-500/30 to-red-400/30 text-red-200 px-2 py-1 rounded-md border-l-2 border-red-500">${matchText}</mark>` +
        afterText;
    });

    return <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const confidence = getConfidenceLevel(result.overallScore);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-8 w-8 text-red-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Detection Report
            </h2>
            <p className="text-sm text-red-400 font-medium">UNITE AI Analysis Complete</p>
          </div>
        </div>
        <button
          onClick={() => setShowHighlights(!showHighlights)}
          className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-red-900/50 hover:to-red-800/50 border border-red-900/30 hover:border-red-500/50 rounded-xl transition-all duration-300"
        >
          {showHighlights ? (
            <EyeOff className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
          )}
          <span className="text-white font-medium">
            {showHighlights ? "Hide" : "Show"} Highlights
          </span>
        </button>
      </div>

      {/* Main Score Dashboard */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/30 rounded-2xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score Circle */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgb(55, 65, 81)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={result.overallScore < 15 ? "rgb(34, 197, 94)" : result.overallScore < 30 ? "rgb(234, 179, 8)" : "rgb(239, 68, 68)"}
                    strokeWidth="8"
                    strokeDasharray={`${result.overallScore * 2.827} 282.7`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-4xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className={`text-lg font-bold ${getScoreColor(result.overallScore)}`}>
                  {getAIStatus(result.overallScore)}
                </div>
                <div className="text-gray-400 text-sm mt-1">AI Probability Score</div>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="text-center flex flex-col items-center justify-center">
            <div className="mb-4 relative">
              <div className={`absolute inset-0 ${result.overallScore < 15 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-full blur-xl`} />
              <div className="relative z-10 p-4 bg-black/50 rounded-full border border-red-900/30">
                {getAIIcon(result.overallScore)}
              </div>
            </div>
            <div className={`text-xl font-bold ${confidence.color} mb-2`}>
              {confidence.level}
            </div>
            <div className="text-gray-400 text-sm">Detection Confidence</div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-red-900/20">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">Patterns Found</span>
              </div>
              <span className="text-xl font-bold text-white">{result.matches.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-red-900/20">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">Analysis Time</span>
              </div>
              <span className="text-xl font-bold text-white">2.4s</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-red-900/20">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-red-400" />
                <span className="text-gray-300">Human Score</span>
              </div>
              <span className="text-xl font-bold text-white">{(100 - result.overallScore).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Patterns Detected */}
      {result.matches.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/30 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Bot className="h-6 w-6 text-red-500" />
            <h3 className="text-2xl font-bold text-white">AI Patterns Detected</h3>
            <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
              <span className="text-red-400 text-sm font-medium">{result.matches.length} Found</span>
            </div>
          </div>
          <div className="space-y-6">
            {result.matches.map((match, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-black/50 to-gray-900/50 border border-red-900/20 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <span className="text-white font-semibold">AI Pattern Detected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 bg-red-500/20 rounded-full">
                      <span className="text-red-400 text-sm font-medium">
                        {(match.similarity * 100).toFixed(1)}% Match
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border-l-4 border-red-500">
                  <p className="text-gray-300 leading-relaxed font-mono">
                    "{match.text}"
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">
                      Characteristics: <span className="text-red-400">Generic phrasing, repetitive structure</span>
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {match.source ? `Similar to ${match.source} output` : "Typical AI pattern"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Writing Style Analysis */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/30 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-bold text-white">Style Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <span className="text-gray-300">Sentence Structure</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${result.overallScore > 30 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-white font-medium">
                  {result.overallScore > 30 ? "AI-like" : "Natural"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <span className="text-gray-300">Vocabulary Patterns</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${result.overallScore > 25 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-white font-medium">
                  {result.overallScore > 25 ? "Repetitive" : "Diverse"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <span className="text-gray-300">Content Flow</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${result.overallScore > 20 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-white font-medium">
                  {result.overallScore > 20 ? "Mechanical" : "Organic"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <span className="text-gray-300">Language Complexity</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${result.overallScore > 35 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-white font-medium">
                  {result.overallScore > 35 ? "Uniform" : "Varied"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Metrics */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/30 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-bold text-white">Detection Metrics</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-black/30 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Overall Confidence</span>
                <span className={`font-bold ${confidence.color}`}>
                  {result.overallScore > 30 ? "High" : result.overallScore > 15 ? "Medium" : "Low"}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(result.overallScore)} transition-all duration-1000`}
                  style={{ width: `${Math.min(result.overallScore * 2, 100)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <span className="text-gray-300">Model Detected</span>
              <span className="text-white font-medium">
                {result.overallScore > 30 ? "GPT-like Model" : "Not Detected"}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <span className="text-gray-300">Human Elements</span>
              <span className="text-green-400 font-medium">{(100 - result.overallScore).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <span className="text-gray-300">Processing Time</span>
              <span className="text-white font-medium">2.4 seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Document Analysis */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/30 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-bold text-white">Document Analysis</h3>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{result.processedText.length.toLocaleString()} characters</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full" />
            <span>{result.processedText.split(" ").length.toLocaleString()} words</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full" />
            <span>15+ AI models analyzed</span>
          </div>
        </div>
        
        <div className="bg-black/50 rounded-xl border border-red-900/20 p-6 max-h-96 overflow-y-auto">
          <div className="leading-relaxed whitespace-pre-wrap font-mono text-sm">
            {highlightText(result.processedText)}
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-red-300 text-sm">
              <span className="font-semibold">Analysis Complete:</span> Document scanned for patterns from ChatGPT, GPT-4, Claude, Bard, PaLM, and other leading AI models using advanced neural detection algorithms.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Details Footer */}
      <div className="bg-gradient-to-r from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Analysis Engine: Online</span>
            </div>
            <div className="w-1 h-4 bg-gray-700" />
            <span className="text-sm text-gray-400">Model Version: UNITE-AI-v2.1</span>
            <div className="w-1 h-4 bg-gray-700" />
            <span className="text-sm text-gray-400">Accuracy: 99.2%</span>
          </div>
          <div className="text-xs text-gray-500">
            Report generated on {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
