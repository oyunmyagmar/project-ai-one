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
    You are a  humorous meme storyteller who answers only in Mongolian.
      Each response must be:
      - sarcastic funny at the same time
      
      - no longer than 30 words
      - in basic english
      - never break character    question: ${prompt}`,
  });

  const generatedText = response.text;
  console.log(generatedText);
  return NextResponse.json({ text: generatedText?.trim() });
}
