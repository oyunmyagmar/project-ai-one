import { ChatHistory } from "@/lib/models/ChatHistory";
import { ModelResponse, ModelResponseType } from "@/lib/models/ModelResponse";
import { UserPrompt, UserPromptSchemaType } from "@/lib/models/UserPrompt";
import connectDB from "@/lib/mongodb";
import { createChatHistory } from "@/lib/services/chat-history-service";
import { createModelResponse } from "@/lib/services/model-response-service";
import { createUserPrompt } from "@/lib/services/user-prompt-service";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  const { userPrompt } = await request.json();
  console.log("user Prompt", userPrompt);

  if (!userPrompt) {
    return NextResponse.json({ error: "Prompt is required" });
  }

  // get from db
  await connectDB();
  const allChatHistory = await ChatHistory.find();

  console.log({ allChatHistory });

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [],
  });

  const response = await chat.sendMessage({
    message: userPrompt,
  });

  const modelResponse = response.text || "";
  // console.log("Chat modelResponse:", modelResponse);

  // save to db
  await createChatHistory({ userPrompt, modelResponse });

  // console.log(response.text);
  return NextResponse.json({ allChatHistory });
}
