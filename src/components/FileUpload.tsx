"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

interface FileUploadProps {
  onFileProcessed: (text: string) => void;
}

export default function FileUpload({ onFileProcessed }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setError(null);
    setSelectedFile(file);

    if (!supportedTypes.includes(file.type)) {
      setError("Unsupported file type. Please upload PDF, DOCX, or TXT files.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size must be less than 10MB.");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onFileProcessed(result.extractedText);
      } else {
        setError(result.error || "Failed to process file");
      }
    } catch (err) {
      setError("An error occurred while processing the file");
    } finally {
      setIsProcessing(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`upload-zone border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer ${
          isDragOver ? "drag-over" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />

        {isProcessing ? (
          <LoadingSpinner />
        ) : (
          <>
            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              Upload your document
            </h3>
            <p className="text-gray-400 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>PDF</span>
              <span>•</span>
              <span>DOCX</span>
              <span>•</span>
              <span>TXT</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Maximum file size: 10MB
            </p>
          </>
        )}
      </div>

      {selectedFile && !isProcessing && (
        <div className="mt-4 p-4 bg-gray-dark rounded-lg border border-gray-medium">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-accent" />
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
