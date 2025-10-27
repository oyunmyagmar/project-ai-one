"use client";
import { ChangeEvent, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui";
import Image from "next/image";
import { ImageCreater, ImageAnalysis } from "@/app/_components-front";

const HomePage = () => {
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
        body: JSON.stringify({ ingredient }),
      });
      const data = await response.json();
      if (data.ingredient) {
        setIngredient(data.ingredient);
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

  return (
    <div className="w-screen h-screen flex flex-col items-center m-auto">
      <Tabs defaultValue="Image analysis" className="w-145 py-6 gap-6">
        <TabsList>
          <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
          <TabsTrigger value="Ingredient recognition">
            Ingredient recognition
          </TabsTrigger>
          <TabsTrigger value="Image creater">Image creater</TabsTrigger>
        </TabsList>

        <ImageAnalysis />

        <TabsContent value="Ingredient recognition">
          <form
            onSubmit={generateTextToText}
            className="w-180 mt-30 flex flex-col gap-10"
          >
            <div className="text-center text-2xl leading-8 font-bold">
              Ingredient recognition
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full p-4 border border-border rounded-xl text-sm leading-5 font-semibold"
            ></input>
            <button
              type="submit"
              disabled={loading || !prompt}
              className="w-full bg-foreground text-background py-3 rounded-full text-sm leading-5 font-medium"
            >
              {loading ? "Generating ..." : "Generate Image"}
            </button>

            {ingredient && (
              <div>
                {/* <img
                  src={}
                  alt="Genereated Image"
                  className="w-full rounded-xl"
                /> */}
              </div>
            )}
          </form>
        </TabsContent>

        <ImageCreater />
      </Tabs>
    </div>
  );
};

export default HomePage;
