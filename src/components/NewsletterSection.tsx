"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/lib/actions/Newsletter.action";

interface NewsletterSectionProps {
  title: string;
  description: string;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  title,
  description,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      const result = await subscribeToNewsletter(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Subscribed successfully!");
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="container mx-auto px-4 py-28"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 id="newsletter-heading" className="text-4xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-xl text-gray-600 mb-8">{description}</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-grow">
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-8 bg-[#E5E5E5] border-0 placeholder:text-gray-500 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-16 py-8 rounded-none bg-gray-900 hover:bg-gray-800"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
