"use client";

import { useState, useEffect } from "react";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/lib/actions/Users.action";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await verifyEmail(token);
      setIsLoading(false);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    };
    verify();
  }, [token]);

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="text-2xl font-bold mb-2">There was a problem</h3>
        <p className="text-gray-600 text-center max-w-sm">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-gray-400">
          <Image src="/hippo-email-sent.png" fill alt="Email verified" />
        </div>

        <h3 className="text-2xl font-bold mb-2">You&apos;re all set!</h3>
        <p className="text-gray-600 text-center mb-4">
          Thank you for verifying your email.
        </p>
        <Link href="/sign-in">
          <Button className="px-8 py-6 rounded-none bg-gray-900 hover:bg-gray-800">
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
        <h3 className="text-2xl font-bold mb-2">Verifying...</h3>
        <p className="text-gray-600 text-center">This won&apos;t take long.</p>
      </div>
    );
  }
};

export default VerifyEmail;
