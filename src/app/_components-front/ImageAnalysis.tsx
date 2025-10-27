"use client";
import React, { ChangeEvent, useState } from "react";
import { TabsContent } from "@/components/ui";

export const ImageAnalysis = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<File>();
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

      const response = await fetch("api/generate-summary", {
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

  return (
    <TabsContent value="Image analysis">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xl leading-7 font-semibold text-foreground">
            Image analysis
          </div>
          <div className="text-sm leading-5 text-muted-foreground">
            Upload a photo, and AI will detect elements.
          </div>

          <div className="w-full flex flex-col gap-2">
            <input
              type="file"
              onChange={fileChangeHandler}
              className="w-full px-3 py-2 border border-input rounded-md text-sm leading-5"
            />
            <div className="w-full h-100 rounded-xl overflow-hidden">
              {imgPreview ? (
                <img src={imgPreview} className="w-full h-auto" alt="image" />
              ) : (
                <div className="w-full h-full bg-gray-50 flex justify-center items-center text-sm leading-5 font-medium text-muted-foreground">
                  Image Preview
                </div>
              )}
            </div>

            <button
              onClick={generateSummary}
              type="button"
              disabled={loading || !prompt}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm leading-5 font-medium"
            >
              {loading ? "Generating ..." : "Generate"}
            </button>
          </div>
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
