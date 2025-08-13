// import Image from "next/image";
//
// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>
//
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import {
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Brain,
  Bot,
  Sparkles,
  Target,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";
import PlagiarismResults from "@/components/PlagiarismResults";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PlagiarismResult } from "@/types";

export default function HomePage() {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [plagiarismResult, setPlagiarismResult] =
    useState<PlagiarismResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileProcessed = async (text: string) => {
    setExtractedText(text);
    setError(null);
    setIsChecking(true);

    try {
      const response = await fetch("/api/check-plagiarism", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      if (result.success) {
        setPlagiarismResult(result.result);
      } else {
        setError(result.error || "Failed to check for AI-generated content");
      }
    } catch (err) {
      setError("An error occurred while checking for AI-generated content");
    } finally {
      setIsChecking(false);
    }
  };

  const resetApp = () => {
    setExtractedText(null);
    setPlagiarismResult(null);
    setError(null);
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-800/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl translate-x-48 translate-y-48" />

      {/* Header */}
      <header className="relative z-10 border-b border-red-900/30 bg-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-10 w-10 text-red-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  UNITE
                </h1>
                <p className="text-xs text-red-400 font-medium tracking-wider">
                  AI DETECTION
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-300">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">
                Advanced AI Detection Technology
              </span>
            </div>
            <h2 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Detect AI Content
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                With Precision
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Upload your documents and instantly detect AI-generated content
              with our cutting-edge neural detection system. Identify ChatGPT,
              GPT-4, Claude, and other AI models with
              <span className="text-red-400 font-semibold">
                {" "}
                99.2% accuracy
              </span>
              .
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">99.2%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">15+</div>
              <div className="text-sm text-gray-400">AI Models</div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">10MB</div>
              <div className="text-sm text-gray-400">Max File Size</div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">&lt;5s</div>
              <div className="text-sm text-gray-400">Analysis Time</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <Bot className="h-12 w-12 text-red-500 mx-auto relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                AI Detection Engine
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced neural networks trained on millions of samples to
                detect ChatGPT, GPT-4, Claude, Bard, and emerging AI models with
                unprecedented accuracy.
              </p>
            </div>
            <div className="group bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <Target className="h-12 w-12 text-red-500 mx-auto relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Pattern Recognition
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Sophisticated algorithms analyze writing patterns, sentence
                structure, and linguistic fingerprints to identify AI-generated
                content with clinical precision.
              </p>
            </div>
            <div className="group bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <Shield className="h-12 w-12 text-red-500 mx-auto relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Enterprise Security
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Bank-grade encryption, zero data retention, and complete privacy
                protection. Your documents are analyzed and immediately
                discarded.
              </p>
            </div>
          </div>

          {/* Main App */}
          {!extractedText && !isChecking && !plagiarismResult && (
            <div className="mb-16">
              <FileUpload onFileProcessed={handleFileProcessed} />
            </div>
          )}

          {isChecking && (
            <div className="py-16 mb-16">
              <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-12 max-w-md mx-auto">
                <LoadingSpinner />
                <p className="text-gray-300 mt-6 font-medium">
                  Analyzing document with AI detection algorithms...
                </p>
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          {plagiarismResult && (
            <div className="space-y-8 mb-16">
              <PlagiarismResults result={plagiarismResult} />
              <button
                onClick={resetApp}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <span className="relative z-10">Analyze Another Document</span>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          )}

          {error && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">Detection Error</h3>
                </div>
                <p className="text-red-200 mb-4">{error}</p>
                <button
                  onClick={resetApp}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900/30 bg-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                UNITE
              </span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Professional AI content detection technology trusted by educators,
              researchers, and content creators worldwide. Protecting academic
              integrity with cutting-edge AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold mb-4 text-lg">
                Detection Capabilities
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  ChatGPT Detection
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  GPT-4 Analysis
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Claude Recognition
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Bard & PaLM Detection
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold mb-4 text-lg">
                File Support
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  PDF Documents
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Word Documents (.docx)
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Text Files (.txt)
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Up to 10MB Files
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold mb-4 text-lg">
                Security & Privacy
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  No Registration Required
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Zero Data Retention
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Encrypted Processing
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  GDPR Compliant
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold mb-4 text-lg">Technology</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Neural Networks
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Pattern Recognition
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Real-time Analysis
                </li>
                <li className="hover:text-red-400 transition-colors cursor-pointer">
                  Continuous Learning
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-900/30 pt-8 text-center">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-gray-500 text-sm">
                System Status: Online
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 UNITE AI Detection System. Built with Next.js, TypeScript
              & Advanced Machine Learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
