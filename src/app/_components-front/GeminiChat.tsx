"use client";
import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@/components/ui";
import { LuSend, LuMessageCircle } from "react-icons/lu";

export const GeminiChat = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  // const [promptData, setPromptData] = useState({});

  let promptData = [];

  const handlePromptData = (prompt: string) => {
    promptData.push(...prompt);
    console.log(promptData, "DATAPROMPt");
    // setPrompt();
  };
  return (
    <div className="absolute bottom-41 right-9 bg-background">
      <Button
        onClick={() => setToggle(true)}
        className={`w-12 h-12 rounded-full bg-neutral-500 hover:bg-neutral-500/80 ${
          toggle && "hidden"
        }`}
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
            {/* {result && result} */}
          </div>

          <div className="w-full flex gap-2 py-2 px-4">
            <Textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              className="min-h-10 rounded-lg text-sm leading-5 "
              placeholder="Type your message..."
            />
            <Button
              onClick={() => handlePromptData(prompt)}
              className="w-10 h-10 rounded-full bg-neutral-500 hover:bg-neutral-500/80"
            >
              <LuSend size={16} />
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
