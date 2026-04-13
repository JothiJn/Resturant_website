import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = body.amount; // amount in smallest currency unit (e.g. paisa for INR)

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const options = {
      amount: amount.toString(),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
