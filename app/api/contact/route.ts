import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("Contact form submitted:", body);

  return NextResponse.json({ success: true }, { status: 200 });
}
