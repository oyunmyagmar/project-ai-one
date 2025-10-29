import { Button, Textarea } from "@/components/ui";
import React, { useState } from "react";

export const GeminiChat = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const generateChat = async () => {
    const res = await fetch("/api/gemini-chat", {
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

  return (
    <div className="w-full mt-50">
      <div>
        <div className="h-50 border rounded-md">{result && result}</div>
        <Textarea
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateChat()}
          value={userPrompt}
          className="h-10"
        />
      </div>
      <Button onClick={generateChat}>Send</Button>
    </div>
  );
};
