"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";
import { LuSend, LuMessageCircle } from "react-icons/lu";
import Markdown from "react-markdown";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const GeminiChat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [prompt, setPrompt] = useState("");

  const [promptData, setPromptData] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [resultData, setResultData] = useState<string[]>([]);

  const senderData = [{ sender: "user", prompt: prompt, date: new Date() }];

  // useEffect(() => {
  //   const newResultData = [...resultData, result];
  //   setResultData(newResultData);
  // }, [result]);

  // console.log(resultData, "resultData");

  const handleChangePrompt = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    // console.log(prompt, "PROMPT");
  };

  const handlePromptData = async (prompt: string) => {
    if (prompt == "") {
      return alert("Please enter your message");
    }

    // const newPrompData = [...promptData, prompt];

    // setPromptData(newPrompData);

    const generateChat = async () => {
      setLoading(true);
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "apllication/json" },
        body: JSON.stringify({ senderData }),
      });

      const resResult = await res.json();

      if (resResult.text) {
        setResult(resResult.text);
        setPrompt("");
        setLoading(false);
      } else {
        alert("Failed to generate data");
      }
    };
    generateChat();
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
            <div className="w-full">Chat ffffffassistant</div>
            <Button
              onClick={() => setToggle(false)}
              variant={"outline"}
              className="w-8 h-8"
            >
              X
            </Button>
          </div>

          <div className="w-full px-6 py-4 min-h-88 overflow-scroll border border-border flex flex-col">
            {/* {chats.map((el) => (
              <div>
                <div className="flex justify-end">{el.prompt}</div>
                <div>{el.result}</div>
              </div>
            ))} */}
            {/* <div className="flex justify-end">{prompt}</div> */}
            {/* <div>
              <Markdown>{result && result}</Markdown>
            </div> */}
          </div>

          <div className="w-full flex gap-2 py-2 px-4">
            <Input
              onChange={handleChangePrompt}
              onKeyDown={(e) => e.key === "Enter" && handlePromptData(prompt)}
              value={prompt}
              className="min-h-10 rounded-lg text-sm leading-5 "
              placeholder="Type your message..."
            />
            <Button
              onClick={() => handlePromptData(prompt)}
              className="w-10 h-10 rounded-full bg-neutral-500 hover:bg-neutral-500/80"
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
