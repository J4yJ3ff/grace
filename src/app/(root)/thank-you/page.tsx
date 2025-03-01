import { getServerSideUser } from "@/lib/actions/Users.action";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const param = await searchParams;
  const cookie = await cookies();
  const orderId = param.orderId;

  const { user } = await getServerSideUser(cookie);

  if (!orderId) {
    return notFound();
  }

  if (!user) {
    redirect("/sign-in");
  }

  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) {
    return notFound();
  }

  const { docs: products } = await payload.find({
    collection: "products",
    where: {
      id: {
        in: order.products.map((product) =>
          typeof product === "string" ? product : product.id
        ),
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-14">
      <div className="flex flex-col items-center justify-center">
        <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-4xl font-bold mb-4">
          Thank you for your purchase!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your order has been successfully processed.
        </p>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center">
              <span>{product.name}</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center font-semibold">
            <span>Total</span>
            <span>
              {formatCurrency(
                products.reduce((acc, product) => acc + product.price, 0)
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/account/orders">
          <Button className="px-8 py-6 rounded-none bg-gray-900 hover:bg-gray-800">
            View Your Orders
          </Button>
        </Link>
      </div>
    </div>
  );
}
