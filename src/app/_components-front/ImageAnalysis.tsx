"use client";
import React, { ChangeEvent, useState } from "react";
import { Button, TabsContent } from "@/components/ui";
import { RxReload } from "react-icons/rx";

export const ImageAnalysis = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<File | undefined>();
  const [imgPreview, setImgPreview] = useState<string>("");
  const [summaryText, setSummaryText] = useState<string>("");

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPrompt(e.target.files[0]);
      const filePreview = URL.createObjectURL(e.target.files[0]);
      setImgPreview(filePreview);
    }
  };

  const generateSummary = async () => {
    setLoading(true);
    setSummaryText("");

    try {
      const newForm = new FormData();
      prompt && newForm.append("prompt", prompt);

      const response = await fetch("/api/generate-image-text", {
        method: "POST",
        body: newForm,
      });

      const data = await response.json();

      if (data.text) {
        setSummaryText(data.text);
      } else {
        alert("Failed to generate summary");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const refreshForm = () => {
    setPrompt(undefined);
    setImgPreview("");
    setSummaryText("");
  };

  return (
    <TabsContent value="Image analysis" className="w-145">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-xl leading-7 font-semibold text-foreground">
              Image analysis
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
            Upload a photo, and AI will detect elements.
          </div>

          {imgPreview ? (
            <img
              src={imgPreview}
              className="w-auto h-100 rounded-md object-cover"
              alt="image"
            />
          ) : (
            <input
              type="file"
              onChange={fileChangeHandler}
              className="w-full px-3 py-2 border border-input rounded-md text-sm leading-5"
            />
          )}

          <Button
            onClick={generateSummary}
            type="button"
            disabled={loading || !prompt}
            className="w-full"
          >
            {loading ? "Generating ..." : "Generate"}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xl leading-7 font-semibold text-foreground">
            Here is the summary
          </div>

          {summaryText ? (
            <div>{summaryText}</div>
          ) : (
            <div className="text-sm leading-6 text-muted-foreground">
              First, enter your image to recognize elements.
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};
