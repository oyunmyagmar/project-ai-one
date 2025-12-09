import { InferenceClient } from "@huggingface/inference";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Ingredient is required" },
        { status: 400 }
      );
    }

    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: `Extract only the ingredients from this food description and return them as a simple comma-separated list without any explanation.
Food description: ${prompt}
Ingredients:`,
        },
      ],
    });

    if (!response) {
      return NextResponse.json({ error: "Failed to generate text!" });
    }

    const generatedText = response.choices[0]?.message?.content || "";

    return NextResponse.json({ text: generatedText.trim() });
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
