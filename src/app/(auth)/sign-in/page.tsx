"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { signIn } from "@/lib/actions/Users.action";

const AuthCredentialsValidator = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const result = await signIn(data);

      if (result.success) {
        toast.success("Signed in successfully");

        if (origin) {
          router.push(`/${origin}`);
        } else {
          router.push("/");
        }
      } else {
        toast.error(result.error || "Failed to sign in");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative flex py-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          {/* <Icons.logo className="h-20 w-20" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>

          <Link
            className={cn(
              "text-sm text-muted-foreground underline underline-offset-4 hover:text-primary",
              "inline-flex items-center gap-1.5"
            )}
            href="/sign-up"
          >
            Don&apos;t have an account?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.email,
                  })}
                  placeholder="you@example.com"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  placeholder="Password"
                />
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button className="mt-4" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <Button variant="secondary" disabled={isLoading}>
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
