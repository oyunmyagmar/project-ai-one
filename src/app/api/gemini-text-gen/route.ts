import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      Each response must be:
      - no longer than 20 words
   question: ${prompt}`,
  });

  const generatedText = response.text;
  console.log(generatedText);
  return NextResponse.json({ text: generatedText?.trim() });
}
