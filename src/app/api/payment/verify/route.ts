import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error("RAZORPAY_KEY_SECRET is not defined");
    }

    // Create HMAC hex digest
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Payment is successful and verified
      return NextResponse.json(
        { message: "Payment verified successfully", isSuccess: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid payment signature", isSuccess: false },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Verification failed on server" },
      { status: 500 }
    );
  }
}
