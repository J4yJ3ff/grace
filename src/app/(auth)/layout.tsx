import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "../globals.css";
import NextTopLoader from "nextjs-toploader";
import Watermark from "@/components/watermark";
import { Toaster } from "sonner";

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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${epilogue.variable} bg-[#F7F6F4] text-[#2D2D2D] relative min-h-screen`}
      >
        <NextTopLoader
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          color="var(--primary)"
          showSpinner={false}
        />
        <main className="pb-16 max-w-5xl mx-auto min-h-screen ">
          {children}
        </main>
        <Watermark />
        <Toaster />
      </body>
    </html>
  );
}
