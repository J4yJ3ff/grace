"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { createCheckoutSession } from "@/lib/actions/Stripe.action";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, removeItem, total } = useCartStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const productIds = items.map((item) => item.id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to checkout");
      router.push("/sign-in?origin=checkout");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createCheckoutSession({ productIds });
      if (result.url) {
        router.push(result.url);
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="bg-[#F7F6F4] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
            Your Cart
          </h1>
          <Link
            href="/store"
            className="flex items-center text-gray-600 hover:text-[#FF6250]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <div className="relative mx-auto mb-6 h-40 w-40">
              <Image
                src="/placeholder.svg?height=160&width=160"
                fill
                alt="empty shopping cart"
                className="object-contain"
              />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-[#2D2D2D]">
              Your cart is empty
            </h3>
            <p className="mb-6 text-gray-600">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button
              onClick={() => router.push("/store")}
              className="px-8 py-6 rounded-none bg-gray-900 hover:bg-gray-800"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-8">
              <ul className="divide-y divide-gray-200 rounded-lg bg-white p-6 shadow-sm">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-[#2D2D2D]">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{formatCurrency(item.price)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          className="text-[#FF6250] hover:text-[#FF6250]/80"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16 lg:col-span-4 lg:mt-0">
              <div className="rounded-lg bg-white p-8 shadow-sm lg:sticky lg:top-4">
                <h2 className="mb-6 text-lg font-medium text-[#2D2D2D]">
                  Order summary
                </h2>
                <div className="flow-root">
                  <dl className="-my-4 divide-y divide-gray-200 text-sm">
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-[#2D2D2D]">
                        {formatCurrency(total)}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <dt className="text-base font-medium text-[#2D2D2D]">
                        Order total
                      </dt>
                      <dd className="text-base font-medium text-[#2D2D2D]">
                        {formatCurrency(total)}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-8">
                  <Button
                    onClick={handleCheckout}
                    className="w-full py-6 rounded-none bg-gray-900 hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <div className="flex items-center justify-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Checkout
                      </div>
                    )}
                  </Button>
                </div>
                <div className="mt-8 flex justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Package className="mr-1.5 h-5 w-5 text-[#FF6250]" />
                    Secure Delivery
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1.5 h-5 w-5 text-[#FF6250]" />
                    Quality Assured
                  </div>
                  <div className="flex items-center">
                    <ShoppingCart className="mr-1.5 h-5 w-5 text-[#FF6250]" />
                    Easy Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
