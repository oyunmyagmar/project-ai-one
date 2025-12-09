import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const prompt = formData.get("prompt") as File;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required!" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (prompt) {
      imageUrl = await uploadImageToCloudinary(prompt);
    }

    const response = await hf.chatCompletion({
      model: "zai-org/GLM-4.6V-Flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "name elements in given photo without any further explanation.",
            },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
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
