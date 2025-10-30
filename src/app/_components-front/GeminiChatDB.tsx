"use client";
import { Button, Textarea } from "@/components/ui";
import React, { useState } from "react";
import { LuSend, LuMessageCircle } from "react-icons/lu";

export const GeminiChatDB = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const generateChat = async () => {
    const res = await fetch("/api/gemini-chat-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt }),
    });

    const resData = await res.json();
    console.log(resData.text);

    if (resData.text) {
      setResult(resData.text);
    }
    setUserPrompt("");
  };

  const handleChatToggler = () => {
    setToggle(true);
  };

  return (
    <div className="absolute bottom-25 right-9 bg-background">
      <Button
        onClick={handleChatToggler}
        className={`w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-700/80 ${
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
            {result && result}
          </div>

          <div className="w-full flex gap-2 py-2 px-4">
            <Textarea
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateChat()}
              value={userPrompt}
              className="min-h-10 rounded-lg text-sm leading-5 "
              placeholder="Type your message..."
            />
            <Button
              onClick={generateChat}
              className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-700/80"
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
