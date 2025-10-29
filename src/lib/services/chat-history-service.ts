import { ChatHistory } from "../models/ChatHistory";
import connectDB from "../mongodb";

export const createChatHistory = async ({
  userPrompt,
  modelResponse,
}: {
  userPrompt: string;
  modelResponse: string;
}) => {
  await connectDB();
  const newChatHistory = new ChatHistory([
    { role: "user", parts: [{ text: userPrompt }] },
    { role: "model", parts: [{ text: modelResponse }] },
  ]);
  await newChatHistory.save();
  return newChatHistory;
};
