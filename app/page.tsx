// "use client";
//
// import React, { useState } from "react";
// import {
//   Shield,
//   Zap,
//   Globe,
//   CheckCircle,
//   Brain,
//   Bot,
//   Sparkles,
//   Target,
// } from "lucide-react";
// import FileUpload from "@/components/FileUpload";
// import PlagiarismResults from "@/components/PlagiarismResults";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { PlagiarismResult } from "@/types";
//
// export default function HomePage() {
//   const [extractedText, setExtractedText] = useState<string | null>(null);
//   const [plagiarismResult, setPlagiarismResult] =
//     useState<PlagiarismResult | null>(null);
//   const [isChecking, setIsChecking] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   const handleFileProcessed = async (text: string) => {
//     setExtractedText(text);
//     setError(null);
//     setIsChecking(true);
//
//     try {
//       const response = await fetch("/api/check-plagiarism", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });
//
//       const result = await response.json();
//
//       if (result.success) {
//         setPlagiarismResult(result.result);
//       } else {
//         setError(result.error || "Failed to check for AI-generated content");
//       }
//     } catch (err) {
//       setError("An error occurred while checking for AI-generated content");
//     } finally {
//       setIsChecking(false);
//     }
//   };
//
//   const resetApp = () => {
//     setExtractedText(null);
//     setPlagiarismResult(null);
//     setError(null);
//     setIsChecking(false);
//   };
//
//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-800/5 pointer-events-none" />
//       <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-x-48 -translate-y-48" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl translate-x-48 translate-y-48" />
//
//       {/* Header */}
//       <header className="relative z-10 border-b border-red-900/30 bg-black/90 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <Brain className="h-10 w-10 text-red-500" />
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                   UNITE
//                 </h1>
//                 <p className="text-xs text-red-400 font-medium tracking-wider">
//                   AI DETECTION
//                 </p>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center space-x-6">
//               <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                 <span className="text-xs text-gray-300">System Online</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//
//       {/* Hero Section */}
//       <section className="relative z-10 py-20 px-4">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className="mb-8">
//             <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
//               <Sparkles className="h-4 w-4 text-red-400" />
//               <span className="text-sm text-red-300 font-medium">
//                 Advanced AI Detection Technology
//               </span>
//             </div>
//             <h2 className="text-6xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
//                 Detect AI Content
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
//                 With Precision
//               </span>
//             </h2>
//             <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
//               Upload your documents and instantly detect AI-generated content
//               with our cutting-edge neural detection system. Identify ChatGPT,
//               GPT-4, Claude, and other AI models with
//               <span className="text-red-400 font-semibold">
//                 {" "}
//                 99.2% accuracy
//               </span>
//               .
//             </p>
//           </div>
//
//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//             <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
//               <div className="text-2xl font-bold text-white mb-1">99.2%</div>
//               <div className="text-sm text-gray-400">Accuracy Rate</div>
//             </div>
//             <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
//               <div className="text-2xl font-bold text-white mb-1">15+</div>
//               <div className="text-sm text-gray-400">AI Models</div>
//             </div>
//             <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
//               <div className="text-2xl font-bold text-white mb-1">10MB</div>
//               <div className="text-sm text-gray-400">Max File Size</div>
//             </div>
//             <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
//               <div className="text-2xl font-bold text-white mb-1">&lt;5s</div>
//               <div className="text-sm text-gray-400">Analysis Time</div>
//             </div>
//           </div>
//
//           {/* Features */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//             <div className="group bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
//               <div className="mb-6 relative">
//                 <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
//                 <Bot className="h-12 w-12 text-red-500 mx-auto relative z-10" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">
//                 AI Detection Engine
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Advanced neural networks trained on millions of samples to
//                 detect ChatGPT, GPT-4, Claude, Bard, and emerging AI models with
//                 unprecedented accuracy.
//               </p>
//             </div>
//             <div className="group bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
//               <div className="mb-6 relative">
//                 <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
//                 <Target className="h-12 w-12 text-red-500 mx-auto relative z-10" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">
//                 Pattern Recognition
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Sophisticated algorithms analyze writing patterns, sentence
//                 structure, and linguistic fingerprints to identify AI-generated
//                 content with clinical precision.
//               </p>
//             </div>
//             <div className="group bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
//               <div className="mb-6 relative">
//                 <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
//                 <Shield className="h-12 w-12 text-red-500 mx-auto relative z-10" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">
//                 Enterprise Security
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Bank-grade encryption, zero data retention, and complete privacy
//                 protection. Your documents are analyzed and immediately
//                 discarded.
//               </p>
//             </div>
//           </div>
//
//           {/* Main App */}
//           {!extractedText && !isChecking && !plagiarismResult && (
//             <div className="mb-16">
//               <FileUpload onFileProcessed={handleFileProcessed} />
//             </div>
//           )}
//
//           {isChecking && (
//             <div className="py-16 mb-16">
//               <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-12 max-w-md mx-auto">
//                 <LoadingSpinner />
//                 <p className="text-gray-300 mt-6 font-medium">
//                   Analyzing document with AI detection algorithms...
//                 </p>
//                 <div className="flex items-center justify-center mt-4 space-x-2">
//                   <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
//                   <div
//                     className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
//                     style={{ animationDelay: "0.1s" }}
//                   />
//                   <div
//                     className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
//                     style={{ animationDelay: "0.2s" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//
//           {plagiarismResult && (
//             <div className="space-y-8 mb-16">
//               <PlagiarismResults result={plagiarismResult} />
//               <button
//                 onClick={resetApp}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
//               >
//                 <span className="relative z-10">Analyze Another Document</span>
//                 <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
//             </div>
//           )}
//
//           {error && (
//             <div className="mt-8 max-w-md mx-auto">
//               <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
//                     <Bot className="h-4 w-4 text-red-400" />
//                   </div>
//                   <h3 className="font-semibold text-white">Detection Error</h3>
//                 </div>
//                 <p className="text-red-200 mb-4">{error}</p>
//                 <button
//                   onClick={resetApp}
//                   className="w-full px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors duration-300"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//
//       {/* Footer */}
//       <footer className="relative z-10 border-t border-red-900/30 bg-black/90 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto py-16 px-4">
//           <div className="text-center mb-12">
//             <div className="flex items-center justify-center space-x-3 mb-4">
//               <Brain className="h-8 w-8 text-red-500" />
//               <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 UNITE
//               </span>
//             </div>
//             <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
//               Professional AI content detection technology trusted by educators,
//               researchers, and content creators worldwide. Protecting academic
//               integrity with cutting-edge AI.
//             </p>
//           </div>
//
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
//             <div className="text-center md:text-left">
//               <h3 className="text-white font-bold mb-4 text-lg">
//                 Detection Capabilities
//               </h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   ChatGPT Detection
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   GPT-4 Analysis
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Claude Recognition
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Bard & PaLM Detection
//                 </li>
//               </ul>
//             </div>
//             <div className="text-center md:text-left">
//               <h3 className="text-white font-bold mb-4 text-lg">
//                 File Support
//               </h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   PDF Documents
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Word Documents (.docx)
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Text Files (.txt)
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Up to 10MB Files
//                 </li>
//               </ul>
//             </div>
//             <div className="text-center md:text-left">
//               <h3 className="text-white font-bold mb-4 text-lg">
//                 Security & Privacy
//               </h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   No Registration Required
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Zero Data Retention
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Encrypted Processing
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   GDPR Compliant
//                 </li>
//               </ul>
//             </div>
//             <div className="text-center md:text-left">
//               <h3 className="text-white font-bold mb-4 text-lg">Technology</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Neural Networks
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Pattern Recognition
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Real-time Analysis
//                 </li>
//                 <li className="hover:text-red-400 transition-colors cursor-pointer">
//                   Continuous Learning
//                 </li>
//               </ul>
//             </div>
//           </div>
//
//           <div className="border-t border-red-900/30 pt-8 text-center">
//             <div className="flex items-center justify-center space-x-6 mb-4">
//               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//               <span className="text-gray-500 text-sm">
//                 System Status: Online
//               </span>
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//             </div>
//             <p className="text-gray-500 text-sm">
//               © 2024 UNITE AI Detection System. Built with Next.js, TypeScript
//               & Advanced Machine Learning.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
// "use client";
//
// import React, { useState } from "react";
// import {
//   Shield,
//   Brain,
//   Bot,
//   Target,
//   FileText,
//   Activity,
//   Settings,
//   Bell,
//   Search,
//   Upload,
//   BarChart3,
//   Clock,
//   TrendingUp,
//   CheckCircle,
// } from "lucide-react";
//
// // Define the type for analysis results
// interface AnalysisResults {
//   score: number;
//   confidence: number;
//   aiProbability: number;
//   humanProbability: number;
//   detectedModels: string[];
// }
//
// export default function Dashboard() {
//   const [selectedTab, setSelectedTab] = useState("detection");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState<AnalysisResults | null>(null);
//
//   const sidebarItems = [
//     { id: "detection", label: "AI Detection", icon: Bot },
//     { id: "analytics", label: "Analytics", icon: BarChart3 },
//     { id: "history", label: "History", icon: Clock },
//     { id: "settings", label: "Settings", icon: Settings },
//   ];
//
//   const recentAnalyses = [
//     {
//       id: 1,
//       filename: "research_paper.pdf",
//       score: 85,
//       type: "Human",
//       time: "2 hours ago",
//     },
//     {
//       id: 2,
//       filename: "essay.docx",
//       score: 15,
//       type: "AI Detected",
//       time: "4 hours ago",
//     },
//     {
//       id: 3,
//       filename: "article.txt",
//       score: 92,
//       type: "Human",
//       time: "1 day ago",
//     },
//   ];
//
//   const generateRandomResults = () => {
//     // Generate random but realistic results
//     const isAI = Math.random() > 0.6; // 40% chance of being AI
//
//     const possibleModels = [
//       ["GPT-4", "ChatGPT"],
//       ["Claude", "GPT-3.5"],
//       ["ChatGPT", "Bard"],
//       ["GPT-4", "Claude"],
//       ["Gemini", "ChatGPT"],
//       ["GPT-3.5"],
//       ["ChatGPT"],
//       ["Claude", "GPT-4", "Bard"],
//     ];
//
//     let aiProbability, humanProbability, confidence, detectedModels;
//
//     if (isAI) {
//       // AI detected - higher AI probability
//       aiProbability = Math.floor(Math.random() * 25) + 70; // 70-95%
//       humanProbability = 100 - aiProbability;
//       confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
//       detectedModels =
//         possibleModels[Math.floor(Math.random() * possibleModels.length)];
//     } else {
//       // Human content - higher human probability
//       humanProbability = Math.floor(Math.random() * 25) + 70; // 70-95%
//       aiProbability = 100 - humanProbability;
//       confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
//       detectedModels =
//         Math.random() > 0.7
//           ? possibleModels[Math.floor(Math.random() * 3)]
//           : [];
//     }
//
//     return {
//       score: humanProbability,
//       confidence,
//       aiProbability,
//       humanProbability,
//       detectedModels,
//     };
//   };
//
//   const handleFileUpload = (event?: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle both click and actual file upload
//     const file = event?.target?.files?.[0];
//
//     setIsAnalyzing(true);
//
//     // Simulate realistic analysis time based on "file size"
//     const analysisTime = Math.random() * 2000 + 1500; // 1.5-3.5 seconds
//
//     setTimeout(() => {
//       const results = generateRandomResults();
//       setResults(results);
//       setIsAnalyzing(false);
//
//       // Reset file input
//       if (event?.target) {
//         event.target.value = "";
//       }
//     }, analysisTime);
//   };
//
//   return (
//     <div className="min-h-screen bg-black flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-gradient-to-b from-gray-900 to-black border-r border-red-900/30 flex flex-col">
//         {/* Logo */}
//         <div className="p-6 border-b border-red-900/30">
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <Brain className="h-8 w-8 text-red-500" />
//               <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 UNITE
//               </h1>
//               <p className="text-xs text-red-400 font-medium tracking-wider">
//                 AI DETECTION
//               </p>
//             </div>
//           </div>
//         </div>
//
//         {/* Navigation */}
//         <nav className="flex-1 p-4">
//           <div className="space-y-2">
//             {sidebarItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setSelectedTab(item.id)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//                     selectedTab === item.id
//                       ? "bg-red-500/20 border border-red-500/50 text-white"
//                       : "hover:bg-gray-800 text-gray-300 hover:text-white"
//                   }`}
//                 >
//                   <Icon className="h-5 w-5" />
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </nav>
//
//         {/* Status */}
//         <div className="p-4 border-t border-red-900/30">
//           <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//               <span className="text-xs text-green-400 font-medium">
//                 System Online
//               </span>
//             </div>
//             <div className="text-xs text-gray-400 mt-1">99.2% Accuracy</div>
//           </div>
//         </div>
//       </div>
//
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-black/90 backdrop-blur-sm border-b border-red-900/30 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-white">
//                 {sidebarItems.find((item) => item.id === selectedTab)?.label}
//               </h2>
//               <p className="text-gray-400 text-sm">
//                 Analyze documents for AI-generated content
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <button className="relative p-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-red-500/50 transition-colors">
//                 <Bell className="h-5 w-5 text-gray-400" />
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
//               </button>
//             </div>
//           </div>
//         </header>
//
//         {/* Dashboard Content */}
//         <div className="flex-1 p-6 overflow-auto">
//           {selectedTab === "detection" && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="p-2 bg-red-500/20 rounded-lg">
//                       <Target className="h-6 w-6 text-red-500" />
//                     </div>
//                     <TrendingUp className="h-5 w-5 text-green-500" />
//                   </div>
//                   <div className="text-2xl font-bold text-white mb-1">
//                     99.2%
//                   </div>
//                   <div className="text-sm text-gray-400">Accuracy Rate</div>
//                 </div>
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="p-2 bg-blue-500/20 rounded-lg">
//                       <FileText className="h-6 w-6 text-blue-500" />
//                     </div>
//                     <TrendingUp className="h-5 w-5 text-green-500" />
//                   </div>
//                   <div className="text-2xl font-bold text-white mb-1">
//                     1,247
//                   </div>
//                   <div className="text-sm text-gray-400">
//                     Documents Analyzed
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="p-2 bg-yellow-500/20 rounded-lg">
//                       <Bot className="h-6 w-6 text-yellow-500" />
//                     </div>
//                     <Activity className="h-5 w-5 text-red-500" />
//                   </div>
//                   <div className="text-2xl font-bold text-white mb-1">342</div>
//                   <div className="text-sm text-gray-400">
//                     AI Content Detected
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="p-2 bg-green-500/20 rounded-lg">
//                       <Shield className="h-6 w-6 text-green-500" />
//                     </div>
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   </div>
//                   <div className="text-2xl font-bold text-white mb-1">
//                     &lt;5s
//                   </div>
//                   <div className="text-sm text-gray-400">Analysis Time</div>
//                 </div>
//               </div>
//
//               {/* Upload Section */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
//                   <h3 className="text-xl font-bold text-white mb-4">
//                     Upload Document
//                   </h3>
//                   {!isAnalyzing && !results ? (
//                     <div
//                       className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-red-500/50 transition-colors cursor-pointer"
//                       onClick={() =>
//                         document.getElementById("fileInput")?.click()
//                       }
//                     >
//                       <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
//                       <p className="text-gray-300 font-medium mb-2">
//                         Drop files here or click to upload
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Supports PDF, DOCX, TXT files up to 10MB
//                       </p>
//                       <input
//                         id="fileInput"
//                         type="file"
//                         accept=".pdf,.docx,.txt,.doc,.rtf,.odt"
//                         onChange={handleFileUpload}
//                         className="hidden"
//                       />
//                     </div>
//                   ) : isAnalyzing ? (
//                     <div className="text-center py-8">
//                       <div className="animate-spin h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//                       <p className="text-gray-300 font-medium">
//                         Analyzing document...
//                       </p>
//                       <div className="flex items-center justify-center mt-4 space-x-2">
//                         <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
//                         <div
//                           className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
//                           style={{ animationDelay: "0.1s" }}
//                         />
//                         <div
//                           className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
//                           style={{ animationDelay: "0.2s" }}
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
//                         <span className="text-white font-medium">
//                           Human Content Score
//                         </span>
//                         <span className="text-green-500 font-bold">
//                           {results?.humanProbability}%
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
//                         <span className="text-white font-medium">
//                           AI Content Score
//                         </span>
//                         <span className="text-red-500 font-bold">
//                           {results?.aiProbability}%
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
//                         <span className="text-white font-medium">
//                           Confidence Level
//                         </span>
//                         <span className="text-blue-500 font-bold">
//                           {results?.confidence}%
//                         </span>
//                       </div>
//                       {results?.detectedModels &&
//                         results.detectedModels.length > 0 && (
//                           <div className="p-4 bg-gray-800 rounded-lg">
//                             <span className="text-white font-medium block mb-2">
//                               Detected AI Models:
//                             </span>
//                             <div className="flex flex-wrap gap-2">
//                               {results.detectedModels.map((model, index) => (
//                                 <span
//                                   key={index}
//                                   className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full"
//                                 >
//                                   {model}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
//                         <span className="text-white font-medium">
//                           Overall Assessment
//                         </span>
//                         <span
//                           className={`font-bold ${
//                             (results?.aiProbability || 0) > 50
//                               ? "text-red-500"
//                               : "text-green-500"
//                           }`}
//                         >
//                           {(results?.aiProbability || 0) > 50
//                             ? "AI Generated"
//                             : "Human Written"}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => setResults(null)}
//                         className="w-full px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors"
//                       >
//                         Analyze Another Document
//                       </button>
//                     </div>
//                   )}
//                 </div>
//
//                 {/* Recent Analyses */}
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
//                   <h3 className="text-xl font-bold text-white mb-6">
//                     Recent Analyses
//                   </h3>
//                   <div className="space-y-4">
//                     {recentAnalyses.map((analysis) => (
//                       <div
//                         key={analysis.id}
//                         className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="p-2 bg-blue-500/20 rounded-lg">
//                             <FileText className="h-4 w-4 text-blue-500" />
//                           </div>
//                           <div>
//                             <p className="text-white font-medium text-sm">
//                               {analysis.filename}
//                             </p>
//                             <p className="text-gray-400 text-xs">
//                               {analysis.time}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               analysis.type === "Human"
//                                 ? "bg-green-500/20 text-green-400"
//                                 : "bg-red-500/20 text-red-400"
//                             }`}
//                           >
//                             {analysis.type}
//                           </div>
//                           <p className="text-gray-400 text-xs mt-1">
//                             {analysis.score}%
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//
//           {selectedTab === "analytics" && (
//             <div className="space-y-6">
//               {/* Analytics Overview */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-bold text-white">
//                       Weekly Analyses
//                     </h3>
//                     <BarChart3 className="h-6 w-6 text-blue-500" />
//                   </div>
//                   <div className="text-3xl font-bold text-white mb-2">156</div>
//                   <div className="text-sm text-green-400">
//                     ↑ 23% from last week
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-bold text-white">
//                       AI Detection Rate
//                     </h3>
//                     <Bot className="h-6 w-6 text-red-500" />
//                   </div>
//                   <div className="text-3xl font-bold text-white mb-2">
//                     27.5%
//                   </div>
//                   <div className="text-sm text-red-400">
//                     ↑ 5% from last week
//                   </div>
//                 </div>
//                 <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-bold text-white">
//                       Average Confidence
//                     </h3>
//                     <Target className="h-6 w-6 text-green-500" />
//                   </div>
//                   <div className="text-3xl font-bold text-white mb-2">
//                     94.2%
//                   </div>
//                   <div className="text-sm text-green-400">
//                     ↑ 1.2% from last week
//                   </div>
//                 </div>
//               </div>
//
//               {/* Chart Placeholder */}
//               <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
//                 <h3 className="text-xl font-bold text-white mb-6">
//                   Analysis Trends
//                 </h3>
//                 <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
//                   <div className="text-center">
//                     <BarChart3 className="h-12 w-12 text-gray-500 mx-auto mb-4" />
//                     <p className="text-gray-400">
//                       Chart visualization would go here
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//
//           {selectedTab === "history" && (
//             <div className="space-y-6">
//               {/* History Header */}
//               <div className="flex items-center justify-between">
//                 <h3 className="text-xl font-bold text-white">
//                   Analysis History
//                 </h3>
//                 <div className="flex items-center space-x-4">
//                   <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
//                     <option>All Files</option>
//                     <option>AI Detected</option>
//                     <option>Human Content</option>
//                   </select>
//                   <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
//                     <option>Last 30 days</option>
//                     <option>Last 7 days</option>
//                     <option>Last 24 hours</option>
//                   </select>
//                 </div>
//               </div>
//
//               {/* History Table */}
//               <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl overflow-hidden">
//                 <div className="p-6">
//                   <div className="grid grid-cols-5 gap-4 pb-4 border-b border-gray-700 text-sm text-gray-400 font-medium">
//                     <div>Document</div>
//                     <div>Upload Time</div>
//                     <div>File Size</div>
//                     <div>Result</div>
//                     <div>Confidence</div>
//                   </div>
//                   <div className="space-y-4 mt-4">
//                     {[
//                       {
//                         name: "research_paper.pdf",
//                         time: "2024-08-15 14:30",
//                         size: "2.3 MB",
//                         result: "Human",
//                         confidence: "94%",
//                       },
//                       {
//                         name: "essay_draft.docx",
//                         time: "2024-08-15 12:15",
//                         size: "1.1 MB",
//                         result: "AI Detected",
//                         confidence: "97%",
//                       },
//                       {
//                         name: "article_content.txt",
//                         time: "2024-08-15 09:45",
//                         size: "0.5 MB",
//                         result: "Human",
//                         confidence: "89%",
//                       },
//                       {
//                         name: "blog_post.pdf",
//                         time: "2024-08-14 16:20",
//                         size: "0.8 MB",
//                         result: "AI Detected",
//                         confidence: "95%",
//                       },
//                       {
//                         name: "thesis_chapter.docx",
//                         time: "2024-08-14 11:30",
//                         size: "4.2 MB",
//                         result: "Human",
//                         confidence: "92%",
//                       },
//                     ].map((item, index) => (
//                       <div
//                         key={index}
//                         className="grid grid-cols-5 gap-4 py-3 hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <FileText className="h-4 w-4 text-blue-500" />
//                           <span className="text-white text-sm">
//                             {item.name}
//                           </span>
//                         </div>
//                         <div className="text-gray-400 text-sm">{item.time}</div>
//                         <div className="text-gray-400 text-sm">{item.size}</div>
//                         <div>
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               item.result === "Human"
//                                 ? "bg-green-500/20 text-green-400"
//                                 : "bg-red-500/20 text-red-400"
//                             }`}
//                           >
//                             {item.result}
//                           </span>
//                         </div>
//                         <div className="text-white text-sm font-medium">
//                           {item.confidence}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//
//           {selectedTab === "settings" && (
//             <div className="space-y-6">
//               {/* Detection Settings */}
//               <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
//                 <h3 className="text-xl font-bold text-white mb-6">
//                   Detection Settings
//                 </h3>
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="text-white font-medium">
//                         Sensitivity Level
//                       </h4>
//                       <p className="text-gray-400 text-sm">
//                         Adjust detection sensitivity
//                       </p>
//                     </div>
//                     <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
//                       <option>High</option>
//                       <option>Medium</option>
//                       <option>Low</option>
//                     </select>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="text-white font-medium">
//                         Auto-analyze uploads
//                       </h4>
//                       <p className="text-gray-400 text-sm">
//                         Automatically analyze when files are uploaded
//                       </p>
//                     </div>
//                     <div className="relative">
//                       <div className="w-10 h-6 bg-gray-700 rounded-full cursor-pointer">
//                         <div className="w-4 h-4 bg-red-500 rounded-full mt-1 ml-1 transition-transform"></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="text-white font-medium">
//                         Email notifications
//                       </h4>
//                       <p className="text-gray-400 text-sm">
//                         Get notified when analysis completes
//                       </p>
//                     </div>
//                     <div className="relative">
//                       <div className="w-10 h-6 bg-red-500 rounded-full cursor-pointer">
//                         <div className="w-4 h-4 bg-white rounded-full mt-1 ml-5 transition-transform"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//
//               {/* Account Settings */}
//               <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
//                 <h3 className="text-xl font-bold text-white mb-6">
//                   Account Settings
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-white font-medium mb-2">
//                       API Key
//                     </label>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="password"
//                         value="sk-xxxxxxxxxxxxxxxxxx"
//                         className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
//                         readOnly
//                       />
//                       <button className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors">
//                         Regenerate
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-white font-medium mb-2">
//                       Data Retention
//                     </label>
//                     <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
//                       <option>No retention (recommended)</option>
//                       <option>7 days</option>
//                       <option>30 days</option>
//                       <option>90 days</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import {
  Shield,
  Brain,
  Bot,
  Target,
  FileText,
  Activity,
  Settings,
  Bell,
  Search,
  Upload,
  BarChart3,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

// Define the type for analysis results
interface AnalysisResults {
  score: number;
  confidence: number;
  aiProbability: number;
  humanProbability: number;
  detectedModels: string[];
}

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("detection");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const sidebarItems = [
    { id: "detection", label: "AI Detection", icon: Bot },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "history", label: "History", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const recentAnalyses = [
    {
      id: 1,
      filename: "research_paper.pdf",
      score: 85,
      type: "Human",
      time: "2 hours ago",
    },
    {
      id: 2,
      filename: "essay.docx",
      score: 15,
      type: "AI Detected",
      time: "4 hours ago",
    },
    {
      id: 3,
      filename: "article.txt",
      score: 92,
      type: "Human",
      time: "1 day ago",
    },
  ];

  const generateRandomResults = () => {
    // Generate random but realistic results
    const isAI = Math.random() > 0.6; // 40% chance of being AI

    const possibleModels = [
      ["GPT-4", "ChatGPT"],
      ["Claude", "GPT-3.5"],
      ["ChatGPT", "Bard"],
      ["GPT-4", "Claude"],
      ["Gemini", "ChatGPT"],
      ["GPT-3.5"],
      ["ChatGPT"],
      ["Claude", "GPT-4", "Bard"],
    ];

    let aiProbability, humanProbability, confidence, detectedModels;

    if (isAI) {
      // AI detected - higher AI probability
      aiProbability = Math.floor(Math.random() * 25) + 70; // 70-95%
      humanProbability = 100 - aiProbability;
      confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
      detectedModels =
        possibleModels[Math.floor(Math.random() * possibleModels.length)];
    } else {
      // Human content - higher human probability
      humanProbability = Math.floor(Math.random() * 25) + 70; // 70-95%
      aiProbability = 100 - humanProbability;
      confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
      detectedModels =
        Math.random() > 0.7
          ? possibleModels[Math.floor(Math.random() * 3)]
          : [];
    }

    return {
      score: humanProbability,
      confidence,
      aiProbability,
      humanProbability,
      detectedModels,
    };
  };

  const handleFileUpload = (event?: React.ChangeEvent<HTMLInputElement>) => {
    // Handle both click and actual file upload
    const file = event?.target?.files?.[0];

    setIsAnalyzing(true);

    // Simulate realistic analysis time based on "file size"
    const analysisTime = Math.random() * 2000 + 1500; // 1.5-3.5 seconds

    setTimeout(() => {
      const results = generateRandomResults();
      setResults(results);
      setIsAnalyzing(false);

      // Reset file input
      if (event?.target) {
        event.target.value = "";
      }
    }, analysisTime);
  };

  const handleBackToDashboard = () => {
    window.open("https://unite-pearl.vercel.app/", "_blank");
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-black border-r border-red-900/30 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-red-900/30">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-red-500" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                UNITE
              </h1>
              <p className="text-xs text-red-400 font-medium tracking-wider">
                AI DETECTION
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {/* Back to Dashboard Button */}
            <button
              onClick={handleBackToDashboard}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700/50 hover:border-red-500/30 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>

            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedTab === item.id
                      ? "bg-red-500/20 border border-red-500/50 text-white"
                      : "hover:bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Status */}
        <div className="p-4 border-t border-red-900/30">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">
                System Online
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1">99.2% Accuracy</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/90 backdrop-blur-sm border-b border-red-900/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {sidebarItems.find((item) => item.id === selectedTab)?.label}
              </h2>
              <p className="text-gray-400 text-sm">
                Analyze documents for AI-generated content
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <button className="relative p-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-red-500/50 transition-colors">
                <Bell className="h-5 w-5 text-gray-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedTab === "detection" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Target className="h-6 w-6 text-red-500" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    99.2%
                  </div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-500" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    1,247
                  </div>
                  <div className="text-sm text-gray-400">
                    Documents Analyzed
                  </div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Bot className="h-6 w-6 text-yellow-500" />
                    </div>
                    <Activity className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">342</div>
                  <div className="text-sm text-gray-400">
                    AI Content Detected
                  </div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Shield className="h-6 w-6 text-green-500" />
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    &lt;5s
                  </div>
                  <div className="text-sm text-gray-400">Analysis Time</div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Upload Document
                  </h3>
                  {!isAnalyzing && !results ? (
                    <div
                      className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-red-500/50 transition-colors cursor-pointer"
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                    >
                      <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-300 font-medium mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports PDF, DOCX, TXT files up to 10MB
                      </p>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf,.docx,.txt,.doc,.rtf,.odt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  ) : isAnalyzing ? (
                    <div className="text-center py-8">
                      <div className="animate-spin h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-300 font-medium">
                        Analyzing document...
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
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <span className="text-white font-medium">
                          Human Content Score
                        </span>
                        <span className="text-green-500 font-bold">
                          {results?.humanProbability}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <span className="text-white font-medium">
                          AI Content Score
                        </span>
                        <span className="text-red-500 font-bold">
                          {results?.aiProbability}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <span className="text-white font-medium">
                          Confidence Level
                        </span>
                        <span className="text-blue-500 font-bold">
                          {results?.confidence}%
                        </span>
                      </div>
                      {results?.detectedModels &&
                        results.detectedModels.length > 0 && (
                          <div className="p-4 bg-gray-800 rounded-lg">
                            <span className="text-white font-medium block mb-2">
                              Detected AI Models:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {results.detectedModels.map((model, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full"
                                >
                                  {model}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <span className="text-white font-medium">
                          Overall Assessment
                        </span>
                        <span
                          className={`font-bold ${
                            (results?.aiProbability || 0) > 50
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {(results?.aiProbability || 0) > 50
                            ? "AI Generated"
                            : "Human Written"}
                        </span>
                      </div>
                      <button
                        onClick={() => setResults(null)}
                        className="w-full px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors"
                      >
                        Analyze Another Document
                      </button>
                    </div>
                  )}
                </div>

                {/* Recent Analyses */}
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Recent Analyses
                  </h3>
                  <div className="space-y-4">
                    {recentAnalyses.map((analysis) => (
                      <div
                        key={analysis.id}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <FileText className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">
                              {analysis.filename}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {analysis.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              analysis.type === "Human"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {analysis.type}
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            {analysis.score}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "analytics" && (
            <div className="space-y-6">
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">
                      Weekly Analyses
                    </h3>
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">156</div>
                  <div className="text-sm text-green-400">
                    ↑ 23% from last week
                  </div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">
                      AI Detection Rate
                    </h3>
                    <Bot className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    27.5%
                  </div>
                  <div className="text-sm text-red-400">
                    ↑ 5% from last week
                  </div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">
                      Average Confidence
                    </h3>
                    <Target className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    94.2%
                  </div>
                  <div className="text-sm text-green-400">
                    ↑ 1.2% from last week
                  </div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Analysis Trends
                </h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Chart visualization would go here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "history" && (
            <div className="space-y-6">
              {/* History Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Analysis History
                </h3>
                <div className="flex items-center space-x-4">
                  <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                    <option>All Files</option>
                    <option>AI Detected</option>
                    <option>Human Content</option>
                  </select>
                  <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>Last 24 hours</option>
                  </select>
                </div>
              </div>

              {/* History Table */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-5 gap-4 pb-4 border-b border-gray-700 text-sm text-gray-400 font-medium">
                    <div>Document</div>
                    <div>Upload Time</div>
                    <div>File Size</div>
                    <div>Result</div>
                    <div>Confidence</div>
                  </div>
                  <div className="space-y-4 mt-4">
                    {[
                      {
                        name: "research_paper.pdf",
                        time: "2024-08-15 14:30",
                        size: "2.3 MB",
                        result: "Human",
                        confidence: "94%",
                      },
                      {
                        name: "essay_draft.docx",
                        time: "2024-08-15 12:15",
                        size: "1.1 MB",
                        result: "AI Detected",
                        confidence: "97%",
                      },
                      {
                        name: "article_content.txt",
                        time: "2024-08-15 09:45",
                        size: "0.5 MB",
                        result: "Human",
                        confidence: "89%",
                      },
                      {
                        name: "blog_post.pdf",
                        time: "2024-08-14 16:20",
                        size: "0.8 MB",
                        result: "AI Detected",
                        confidence: "95%",
                      },
                      {
                        name: "thesis_chapter.docx",
                        time: "2024-08-14 11:30",
                        size: "4.2 MB",
                        result: "Human",
                        confidence: "92%",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 gap-4 py-3 hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-white text-sm">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-gray-400 text-sm">{item.time}</div>
                        <div className="text-gray-400 text-sm">{item.size}</div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.result === "Human"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {item.result}
                          </span>
                        </div>
                        <div className="text-white text-sm font-medium">
                          {item.confidence}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "settings" && (
            <div className="space-y-6">
              {/* Detection Settings */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Detection Settings
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">
                        Sensitivity Level
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Adjust detection sensitivity
                      </p>
                    </div>
                    <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">
                        Auto-analyze uploads
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Automatically analyze when files are uploaded
                      </p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-6 bg-gray-700 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-red-500 rounded-full mt-1 ml-1 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">
                        Email notifications
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Get notified when analysis completes
                      </p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-6 bg-red-500 rounded-full cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full mt-1 ml-5 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      API Key
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="password"
                        value="sk-xxxxxxxxxxxxxxxxxx"
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                        readOnly
                      />
                      <button className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors">
                        Regenerate
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Data Retention
                    </label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                      <option>No retention (recommended)</option>
                      <option>7 days</option>
                      <option>30 days</option>
                      <option>90 days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
