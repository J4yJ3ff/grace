import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

// Add Epilogue font
const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const metadata: Metadata = {
  title: "Grace - Visual Designer",
  description:
    "Portfolio of Grace, a Visual Designer specializing in branding, logos, and graphic design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={` ${epilogue.variable} max-w-5xl mx-auto text-[#2D2D2D]`}
      >
        {children}
      </body>
    </html>
  );
}
