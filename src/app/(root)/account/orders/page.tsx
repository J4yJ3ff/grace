import { getUserOrders } from "@/lib/actions/Users.action";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function OrdersPage() {
  const result = await getUserOrders();

  if (!result.success) {
    // Redirect to sign in if not authenticated
    redirect("/sign-in");
  }

  const orders = result.orders || [];

  return (
    <div className="container mx-auto px-4 py-14">
      <section className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Orders</h1>
        <p className="text-lg text-gray-600">
          View and manage your purchase history
        </p>
      </section>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't made any purchases yet. Check out our store to find
            something you'll love!
          </p>
          <Link href="/store">
            <Button className="px-8 py-6 rounded-none bg-gray-900 hover:bg-gray-800">
              Browse Store
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 shadow-sm">
              <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                    {order.status || "Processing"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <div className="flex-grow">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                    <Link href={`/store/product/${product.id}`}>
                      <Button variant="outline" size="sm">
                        View Product
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    Total:{" "}
                    <span className="font-semibold">
                      {formatCurrency(
                        order.products.reduce(
                          (sum, product) => sum + product.price,
                          0
                        )
                      )}
                    </span>
                  </p>
                </div>
                <Link href={`/account/orders/${order.id}`}>
                  <Button variant="link">Order Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
