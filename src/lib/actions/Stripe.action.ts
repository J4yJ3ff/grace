"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { getPayloadClient } from "../payload";
import { stripe } from "../stripe";
import { getServerSideUser } from "./Users.action";

const CheckoutValidator = z.object({
  productIds: z.array(z.string()),
});

export async function createCheckoutSession(
  input: z.infer<typeof CheckoutValidator>
) {
  const { productIds } = CheckoutValidator.parse(input);

  if (productIds.length === 0) {
    throw new Error("No products selected");
  }

  const payload = await getPayloadClient();

  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  console.log("User: ", user);

  if (!user) {
    throw new Error("Sign in to Checkout");
  }

  const { docs: products } = await payload.find({
    collection: "products",
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const filteredProducts = products.filter((prod) => Boolean(prod.priceId));

  const order = await payload.create({
    collection: "orders",
    data: {
      _isPaid: false,
      products: filteredProducts.map((prod) => prod.id),
      user: user.id,
    },
  });

  interface LineItem {
    price: string;
    quantity: number;
    adjustable_quantity?: {
      enabled: boolean;
    };
  }

  const line_items: LineItem[] = filteredProducts.map((product) => ({
    price: product.priceId!,
    quantity: 1,
  }));

  line_items.push({
    price: "price_1PPBBN09Gl7km4EOW7JWxJMK",
    quantity: 1,
    adjustable_quantity: {
      enabled: false,
    },
  });

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
      payment_method_types: ["card"],
      mode: "payment",
      metadata: {
        userId: user.id,
        orderId: order.id,
      },
      line_items,
    });

    return { url: stripeSession.url };
  } catch (err) {
    console.error(err);
    return { url: null };
  }
}

export async function pollOrderStatus(orderId: string) {
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  if (!orders.length) {
    throw new Error("Order not found");
  }

  const [order] = orders;

  return { isPaid: order._isPaid };
}
