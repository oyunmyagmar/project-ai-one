import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN);
export async function POST(req: NextRequest) {
  const { ingredient } = await req.json();

  if (!ingredient) {
    return NextResponse.json(
      { error: "Ingredient is required" },
      { status: 400 }
    );
  }

  const ingredient = await hf.textGeneration({
    model: "openai/gpt-oss-120b",
    inputs: ingredient,
  });
  console.log({ ingredient });

  return NextResponse.json({});
}
