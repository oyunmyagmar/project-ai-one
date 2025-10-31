"use client";
import React, { ChangeEvent, useState } from "react";
import { Button, Input } from "@/components/ui";
import { LuSend, LuMessageCircle } from "react-icons/lu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const GeminiTextGen = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChatToggler = () => {
    setToggle(true);
  };

  const handlePrompt = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    setData("");
  };

  const generateChat = async () => {
    setLoading(true);
    const response = await fetch("/api/gemini-text-gen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    // console.log(result);
    if (result.text) {
      setData(result.text);
      setPrompt("");
    } else {
      alert("Failed to generate data");
    }
    setLoading(false);
  };

  return (
    <div className="absolute bottom-9 right-9 bg-background">
      <Button
        onClick={handleChatToggler}
        className={`w-12 h-12 rounded-full ${toggle && "hidden"}`}
      >
        <LuMessageCircle size={16} />
      </Button>
      {toggle ? (
        <div className="w-95 h-118 flex flex-col justify-end items-end border border-input rounded-lg">
          <div className="w-full flex gap-2 px-4 py-2 items-center">
            <div className="w-full">Chat assistant</div>
            <Button
              onClick={() => setToggle(false)}
              variant={"outline"}
              className="w-8 h-8"
            >
              X
            </Button>
          </div>

          <div className="w-full px-6 py-4 min-h-88 overflow-scroll border border-border">
            {data && data}
          </div>

          <div className="w-full flex gap-2 py-2 px-4">
            <Input
              onChange={handlePrompt}
              onKeyDown={(e) => e.key === "Enter" && generateChat()}
              value={prompt}
              className="min-h-10 rounded-lg text-sm leading-5 "
              placeholder="Type your message..."
            />
            <Button
              onClick={generateChat}
              className={`w-10 h-10 rounded-full`}
              disabled={loading}
            >
              <LuSend size={16} className={`${loading && "hidden"}`} />
              <AiOutlineLoading3Quarters
                size={16}
                className={`${!loading && "hidden"} animate-spin`}
              />
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
