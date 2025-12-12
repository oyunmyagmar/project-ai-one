import { ChatHistory } from "../models/ChatHistory";
import connectDB from "../mongodb";

export const createChatHistory = async ({
  userPrompt,
  modelResponse,
}: {
  userPrompt: string;
  modelResponse: string;
}) => {
  try {
    await connectDB();

    const ChatHistoryDB = await ChatHistory.create({
      userPrompt,
      modelResponse,
    });

    return ChatHistoryDB;
  } catch (error) {
    console.error("Error", error);
  }
};
