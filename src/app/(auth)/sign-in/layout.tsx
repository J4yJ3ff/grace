import type React from "react";
import { Suspense } from "react";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="container py-20 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
