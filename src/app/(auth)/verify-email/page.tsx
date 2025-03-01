import Image from "next/image";
import VerifyEmail from "../_components/VerifyEmail";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const token = params.token;
  const toEmail = params.to;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-14">
        <section className="mb-20">
          <h1 className="text-6xl md:text-6xl text-[8vw] font-bold mb-4 text-center">
            Verify Email
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Please verify your email to complete your registration.
          </p>
        </section>

        <section className="max-w-md mx-auto">
          {token && typeof token === "string" ? (
            <div className="grid gap-6">
              <VerifyEmail token={token} />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
              <div className="relative mb-4 h-60 w-60 text-gray-400">
                <Image
                  src="/assets/hippo-email-sent.png"
                  fill
                  alt="Email sent"
                />
              </div>

              <h3 className="text-2xl font-bold mb-2">Check your email</h3>

              {toEmail ? (
                <p className="text-gray-600 text-center">
                  We&apos;ve sent a verification link to{" "}
                  <span className="font-semibold">{toEmail}</span>.
                </p>
              ) : (
                <p className="text-gray-600 text-center">
                  We&apos;ve sent a verification link to your email.
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default VerifyEmailPage;
