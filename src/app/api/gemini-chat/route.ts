import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  const { senderData } = await request.json();
  const { sender, prompt, date } = senderData;
  console.log(senderData, "senderData");
  // const chatData = <string[]>[];

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      { role: sender, parts: [{ text: prompt }] },
      { role: "model", parts: [{ text: response }] },
    ],
  });

  // console.log(promptData.map((el: string) => typeof el));
  // const response = await chat.sendMessage({
  //   message: promptData[promptData.length - 1],
  // });
  const response = await chat.sendMessage({ message: prompt });

  // if (response) {
  //   chatData.push(response.text || "");
  // }
  // console.log({ text: response.text });

  return NextResponse.json({ text: response.text });
}
//  history: [
//       { role: "user", parts: [{ text: "hello" }] },
//       { role: "model", parts: [{ text: "hi" }] },
//     ],
