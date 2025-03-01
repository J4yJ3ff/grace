"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createUser } from "@/lib/actions/Users.action";

const AuthCredentialsValidator = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = async (data: TAuthCredentialsValidator) => {
    setIsLoading(true);
    try {
      const result = await createUser(data);
      if (result.success) {
        toast.success(
          `Account created successfully. Please check your email to verify your account.`
        );
        router.push("/verify-email"); // Redirect to dashboard or home page
      } else {
        toast.error(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(
        `An unexpected error occurred. Please try again: ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen items-center justify-center flex">
      <main className="container mx-auto px-4 py-14">
        <section className="mb-20">
          <h1 className="text-6xl md:text-6xl text-[8vw] font-bold mb-4 text-center">
            Sign Up
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Create an account to access exclusive content and features.
          </p>
        </section>

        <section className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-lg font-semibold">
                Email
              </Label>
              <Input
                id="email"
                {...register("email")}
                className={cn("mt-2 py-6 rounded-none", {
                  "focus-visible:ring-red-500": errors.email,
                })}
                placeholder="you@example.com"
              />
              {errors?.email && (
                <p className="text-sm text-[#FF6250] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-lg font-semibold">
                Password
              </Label>
              <Input
                id="password"
                {...register("password")}
                type="password"
                className={cn("mt-2 py-6 rounded-none", {
                  "focus-visible:ring-red-500": errors.password,
                })}
                placeholder="Password"
              />
              {errors?.password && (
                <p className="text-sm text-[#FF6250] mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 rounded-none bg-gray-900 hover:bg-gray-800"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/sign-in"
              className="text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1.5"
            >
              Already have an account? Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
