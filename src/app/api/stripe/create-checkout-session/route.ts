import { NextRequest, NextResponse } from "next/server";
import { stripe, PRODUCT_CATALOG, CartItem, calculateCartTotal } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, dealerEmail, projectName } = body as {
      items: CartItem[];
      dealerEmail: string;
      projectName: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item) => {
      const product = PRODUCT_CATALOG[item.productId];
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${product.name} - ${item.color}`,
            description: product.description,
            metadata: {
              productId: item.productId,
              color: item.color,
            },
          },
          unit_amount: Math.round(product.pricePerSqFt * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dealer-portal?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dealer-portal?canceled=true`,
      customer_email: dealerEmail,
      metadata: {
        dealerEmail,
        projectName,
        orderType: "dealer_portal",
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

