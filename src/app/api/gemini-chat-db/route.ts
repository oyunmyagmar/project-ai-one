import { ChatHistory } from "@/lib/models/ChatHistory";
import connectDB from "@/lib/mongodb";
import { createChatHistory } from "@/lib/services/chat-history-service";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    const { userPrompt } = await request.json();

    if (!userPrompt.trim()) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    await connectDB();

    const chatHistoryDB = await ChatHistory.find({
      userPrompt: { $ne: "" },
      modelResponse: { $ne: "" },
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()
      .then((h) => h.reverse());

    const history = chatHistoryDB.flatMap((history) => [
      {
        role: "user",
        parts: [{ text: history.userPrompt }],
      },
      {
        role: "model",
        parts: [{ text: history.modelResponse }],
      },
    ]);

    const chat = ai.chats.create({
      model: "gemini-1.5-pro-latest",
      history: history,
    });

    const response = await chat.sendMessage({
      message: userPrompt.trim(),
    });

    const modelResponse = response.text || "";

    await createChatHistory({
      userPrompt: userPrompt.trim(),
      modelResponse: modelResponse,
    });

    return NextResponse.json({ modelResponse });
  } catch (error) {
    console.error("Error", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
