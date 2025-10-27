"use client";
import React, { useState } from "react";
import { TabsContent } from "@/components/ui";

export const ImageCreater = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImage("");

    try {
      const response = await fetch("api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.image) {
        setImage(data.image);
      } else {
        alert("Failed to generate image");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="Image creater">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xl leading-7 font-semibold text-foreground">
            Image creator
          </div>
          <div className="text-sm leading-5 text-muted-foreground">
            What image do you want? Describe it briefly.
          </div>

          <form onSubmit={generateImage} className="w-full flex flex-col gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full px-3 py-2 border border-input rounded-md text-sm leading-5 text-primary"
            />

            <button
              type="submit"
              disabled={loading || !prompt}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm leading-5 font-medium"
            >
              {loading ? "Generating ..." : "Generate Image"}
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xl leading-7 font-semibold text-foreground">
            Result
          </div>

          {image ? (
            <div>
              <img
                src={image}
                alt="Genereated Image"
                className="w-full rounded-xl"
              />
            </div>
          ) : (
            <div className="text-sm leading-6 text-muted-foreground">
              First, enter your text to generate an image.
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};
