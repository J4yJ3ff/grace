import { stripe } from "@/lib/stripe";
import { getPayloadClient } from "@/lib/payload";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { Resend } from "resend";
import { ReceiptEmailHtml } from "@/components/emails/ReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(
      `Webhook Error: ${error instanceof Error ? error.message : "Unknown Error"}`,
      {
        status: 400,
      }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId || !session?.metadata?.orderId) {
    return new NextResponse(
      `Webhook Error: No user or order present in metadata`,
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });

    const [user] = users;

    if (!user) return new NextResponse("No such user exists.", { status: 404 });

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const [order] = orders;

    if (!order)
      return new NextResponse("No such order exists.", { status: 404 });

    await payload.update({
      collection: "orders",
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    // send receipt
    try {
      await resend.emails.send({
        from: "Grace - Visual Designer <info@nohoaxx.com>",
        to: [user.email],
        subject: "Thanks for your order! This is your receipt.",
        html: ReceiptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: session.metadata.orderId,
          products: order.products,
        }),
      });
    } catch (error) {
      console.error("Failed to send receipt email:", error);
      // Don't return here, as we still want to acknowledge the webhook
    }
  }

  return new NextResponse(null, { status: 200 });
}
