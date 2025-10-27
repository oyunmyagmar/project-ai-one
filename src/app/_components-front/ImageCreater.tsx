"use client";
import React, { useState } from "react";
import { Button, TabsContent } from "@/components/ui";
import { RxReload } from "react-icons/rx";

export const ImageCreater = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImage("");

    try {
      const response = await fetch("/api/generate-text-image", {
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

  const refreshForm = () => {
    setPrompt("");
    setImage("");
  };

  return (
    <TabsContent value="Image creater" className="w-145">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-xl leading-7 font-semibold text-foreground">
              Image creator
            </div>
            <Button
              onClick={refreshForm}
              type="button"
              variant={"outline"}
              className="w-12 h-10"
            >
              <RxReload size={16} />
            </Button>
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

            <Button
              type="submit"
              disabled={loading || !prompt}
              className="w-full"
            >
              {loading ? "Generating ..." : "Generate Image"}
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xl leading-7 font-semibold text-foreground">
            Result
          </div>

          {image ? (
            <img
              src={image}
              alt="Genereated Image"
              className="w-full rounded-xl"
            />
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
