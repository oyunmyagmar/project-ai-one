import { ChatHistory } from "@/lib/models/ChatHistory";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const history = await ChatHistory.find().sort({ createdAt: 1 }).lean();

    if (!history) {
      return NextResponse.json({ error: "No history found!" });
    }

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
