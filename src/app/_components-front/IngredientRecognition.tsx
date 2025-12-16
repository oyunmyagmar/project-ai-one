"use client";

import React, { useState } from "react";
import { Button, TabsContent, Textarea } from "@/components/ui";
import { RxReload } from "react-icons/rx";
import { NotepadText, Sparkle } from "lucide-react";
import Markdown from "react-markdown";

export const IngredientRecognition = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");

  const generateTextToText = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIngredient("");

    try {
      const response = await fetch("/api/generate-text-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.text) {
        setIngredient(data.text);
      } else {
        ("Failed to generate text to text");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Failed to generate text to text");
    } finally {
      setLoading(false);
    }
  };

  const refreshForm = () => {
    setPrompt("");
    setIngredient("");
  };

  return (
    <TabsContent value="Ingredient recognition" className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-1 text-xl leading-7 font-semibold text-foreground">
              <Sparkle /> Ingredient recognition
            </div>
            <Button
              onClick={refreshForm}
              type="button"
              variant={"outline"}
              className="w-12 h-10 cursor-pointer"
            >
              <RxReload size={16} />
            </Button>
          </div>

          <div className="text-sm leading-5 text-muted-foreground">
            Describe the food, and AI will detect the ingredients.
          </div>

          <form
            onSubmit={generateTextToText}
            className="w-full flex flex-col gap-2"
          >
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full h-31 px-3 py-2 border border-black/60 rounded-md text-sm leading-5 text-primary"
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
          <div className="flex gap-1 text-xl leading-7 font-semibold text-foreground">
            <NotepadText /> Identified Ingredients
          </div>

          {ingredient ? (
            <div className="text-sm leading-6 text-foreground border border-black/55 rounded-sm px-3 py-2">
              <p className="font-semibold">
                Here is quick summary of the ingredients:
              </p>
              <Markdown>{ingredient}</Markdown>
            </div>
          ) : (
            <div className="text-sm leading-6 text-muted-foreground">
              First, enter your text to recognize the ingredients.
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};
