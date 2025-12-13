"use client";

import { Button, Textarea } from "@/components/ui";
import { HistoryType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuSend, LuMessageCircle } from "react-icons/lu";
import { toast } from "sonner";

export const GeminiChatDB = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [conversations, setConversations] = useState<
    { role: "user" | "model"; content: string }[]
  >([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getConversationHistory = async () => {
      const res = await fetch("/api/gemini-chat-db/history");

      if (!res) {
        toast.error("No conversation found");
      }
      const data = await res.json();

      if (data) {
        const formatted = data.history.flatmap((history: HistoryType) => [
          { role: "user", content: history.userPrompt },
          { role: "model", content: history.modelResponse },
        ]);
        setConversations(formatted);
      }
    };
    getConversationHistory();
  }, []);

  const generateChat = async () => {
    const trimmedPrompt = userPrompt.trim();

    if (!trimmedPrompt.trim()) {
      toast.warning("userPrompt required!");
    }

    try {
      setLoading(true);

      setConversations((prev) => [
        ...prev,
        { role: "user", content: userPrompt },
      ]);

      const res = await fetch("/api/gemini-chat-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: trimmedPrompt }),
      });

      if (!res.ok) {
        toast.error("Not generated!");
      }

      const data = await res.json();

      setConversations((prev) => [
        ...prev,
        { role: "model", content: data.modelResponse },
      ]);

      setUserPrompt("");
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-25 right-9 bg-background">
      <Button
        onClick={() => setToggle(true)}
        className={`w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-700/80 ${
          toggle && "hidden"
        }`}
      >
        <LuMessageCircle size={16} />
      </Button>

      {toggle ? (
        <div className="w-95 h-118 flex flex-col justify-end items-end border border-input rounded-lg">
          <div className="w-full flex gap-2 px-4 py-2 items-center">
            <div className="w-full">AI Chat Assistant</div>
            <Button
              onClick={() => setToggle(false)}
              variant={"outline"}
              className="w-8 h-8"
            >
              X
            </Button>
          </div>

          <div className="w-full px-6 py-4 min-h-88 overflow-scroll flex flex-col gap-3">
            {conversations.map((c, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                  c.role === "user"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                {c.content}
              </div>
            ))}
          </div>

          {loading && (
            <div className="self-start text-gray-500 text-sm animate-pulse">
              AI is typing...
            </div>
          )}

          <div className="w-full flex gap-2 py-2 px-4 border border-border">
            <Textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(), generateChat();
                }
              }}
              className="min-h-10 rounded-lg text-sm leading-5 "
              placeholder="Type your message..."
            />

            <Button
              onClick={generateChat}
              disabled={loading}
              className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-700/80"
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
