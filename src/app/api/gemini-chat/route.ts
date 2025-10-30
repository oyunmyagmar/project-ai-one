import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  const { promptData } = await request.json();
  console.log(promptData);

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      { role: "user", parts: [{ text: promptData[promptData.length - 1] }] },
      { role: "model", parts: [{ text: response.text }] },
    ],
  });

  // console.log(promptData.map((el: string) => typeof el));
  const response = await chat.sendMessage({
    message: promptData[promptData.length - 1],
  });
  console.log({ text: response.text });

  return NextResponse.json({ text: response.text });
}
//  history: [
//       { role: "user", parts: [{ text: "hello" }] },
//       { role: "model", parts: [{ text: "hi" }] },
//     ],
