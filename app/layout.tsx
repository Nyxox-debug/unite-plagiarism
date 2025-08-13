// Remove the Poppins import from layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unite - Free Plagiarism Detector",
  description:
    "Professional, 100% free plagiarism detection for PDF, DOCX, and TXT files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
