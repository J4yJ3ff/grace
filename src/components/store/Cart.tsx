"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useCartStore, type CartItem } from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export function Cart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const { items, total } = useCartStore.getState();
    setCartItems(items);
    setCartTotal(total);

    const unsubscribe = useCartStore.subscribe((state) => {
      setCartItems(state.items);
      setCartTotal(state.total);
    });

    return () => unsubscribe();
  }, []);

  const { removeItem, updateQuantity } = useCartStore();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to checkout");
      setIsOpen(false);
      router.push("/sign-in?origin=checkout");
      return;
    }

    setIsCheckingOut(true);
    setIsOpen(false);
    router.push("/checkout");
    setIsCheckingOut(false);

    // setIsCheckingOut(true);
    // try {
    //   const productIds = cartItems.map((item) => item.id);
    //   const result = await createCheckoutSession({ productIds });
    //   if (result.url) {
    //     router.push(result.url);
    //   } else {
    //     throw new Error("Failed to create checkout session");
    //   }
    // } catch (error) {
    //   toast.error("Checkout failed. Please try again.");
    //   console.error("Checkout error:", error);
    // } finally {
    //   setIsCheckingOut(false);
    // }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {cartItems.length === 0 ? (
            <p className="text-center py-4">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4 pb-4 border-b"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      className="ml-4 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl">{formatCurrency(cartTotal)}</span>
              </div>
              <Button
                className="w-full mt-6 px-16 py-8 rounded-none"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Checkout"
                )}
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
