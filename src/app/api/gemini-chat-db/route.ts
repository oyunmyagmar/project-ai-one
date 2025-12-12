import { ChatHistory } from "@/lib/models/ChatHistory";
import connectDB from "@/lib/mongodb";
import { createChatHistory } from "@/lib/services/chat-history-service";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    const { userPrompt } = await request.json();

    if (!userPrompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const allChatHistory = await ChatHistory.find().sort({ createdAt: 1 });

    const formattedHistory = allChatHistory.flatMap((history: any) => [
      {
        role: "user",
        parts: [{ text: history.userPrompt || "" }],
      },
      {
        role: "model",
        parts: [{ text: history.modelResponse || "" }],
      },
    ]);

    const chat = ai.chats.create({
      model: "gemini-2.0-flash-lite",
      history: formattedHistory,
    });

    const response = await chat.sendMessage({
      message: userPrompt,
    });

    const modelResponse = response.text || "";

    await createChatHistory({
      userPrompt: userPrompt,
      modelResponse: modelResponse,
    });

    return NextResponse.json({ data: modelResponse });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
