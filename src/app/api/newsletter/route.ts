import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation/newsletter";

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const result = newsletterSchema.safeParse(payload);
  if (!result.success) return NextResponse.json({ message: "Invalid email address." }, { status: 400 });

  const recipient = process.env.EMAIL_ADDRESS;
  if (!recipient) return NextResponse.json({ message: "EMAIL_ADDRESS is not configured." }, { status: 500 });

  console.info(`[newsletter] Notify ${recipient}: new subscriber ${result.data.email}`);
  return NextResponse.json({ message: "Notification sent." });
}
