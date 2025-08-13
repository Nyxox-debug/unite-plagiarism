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
import { Shield, Zap, Globe, CheckCircle } from "lucide-react";
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
        setError(result.error || "Failed to check plagiarism");
      }
    } catch (err) {
      setError("An error occurred while checking plagiarism");
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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-bold text-white">Unite</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Professional{" "}
            <span className="text-accent">Plagiarism Detection</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Upload your documents and get instant, accurate plagiarism detection
            powered by advanced AI technology. Completely free, no registration
            required.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-dark border border-gray-medium rounded-lg p-6">
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-400">
                Get results in seconds with our optimized processing engine
              </p>
            </div>
            <div className="bg-gray-dark border border-gray-medium rounded-lg p-6">
              <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Multiple Formats
              </h3>
              <p className="text-gray-400">
                Support for PDF, DOCX, and TXT files up to 10MB
              </p>
            </div>
            <div className="bg-gray-dark border border-gray-medium rounded-lg p-6">
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Private & Secure
              </h3>
              <p className="text-gray-400">
                Your documents are processed securely and never stored
              </p>
            </div>
          </div>

          {/* Main App */}
          {!extractedText && !isChecking && !plagiarismResult && (
            <FileUpload onFileProcessed={handleFileProcessed} />
          )}

          {isChecking && (
            <div className="py-12">
              <LoadingSpinner />
              <p className="text-gray-400 mt-4">
                Analyzing your document for plagiarism...
              </p>
            </div>
          )}

          {plagiarismResult && (
            <div className="space-y-6">
              <PlagiarismResults result={plagiarismResult} />
              <button
                onClick={resetApp}
                className="px-8 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-colors"
              >
                Check Another Document
              </button>
            </div>
          )}

          {error && (
            <div className="mt-8 p-6 bg-red-900/20 border border-red-500 rounded-lg">
              <p className="text-red-300">{error}</p>
              <button
                onClick={resetApp}
                className="mt-4 px-6 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold text-white">Unite</span>
          </div>
          <p className="text-gray-400 mb-6">
            Professional plagiarism detection made simple and accessible for
            everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Advanced AI Detection</li>
                <li>Multiple File Formats</li>
                <li>Real-time Analysis</li>
                <li>Detailed Reports</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Security</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>No Registration Required</li>
                <li>Files Not Stored</li>
                <li>Secure Processing</li>
                <li>Privacy Protected</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>PDF Documents</li>
                <li>Word Documents</li>
                <li>Text Files</li>
                <li>Up to 10MB</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              © 2024 Unite Plagiarism Detector. Built with Next.js and
              TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
