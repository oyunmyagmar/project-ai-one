"use client";
import React, { useState } from "react";
import { Button, TabsContent } from "@/components/ui";
import { RxReload } from "react-icons/rx";

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
      console.log(data, "TEXT");
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
    <div>
      <TabsContent value="Ingredient recognition" className="w-145">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="text-xl leading-7 font-semibold text-foreground">
                Ingredient recognition
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

            <form
              onSubmit={generateTextToText}
              className="w-full flex flex-col gap-2"
            >
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
              Identified Ingredients
            </div>
            {ingredient ? (
              <div>{ingredient}</div>
            ) : (
              <div className="text-sm leading-6 text-muted-foreground">
                First, enter your text to recognize an ingredients.
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </div>
  );
};
