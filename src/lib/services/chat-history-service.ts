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
    console.log("USER PRO", userPrompt, modelResponse);
    await connectDB();
    // const newChatHistory = new ChatHistory([
    //   { role: "user", parts: [{ text: userPrompt }] },
    //   { role: "model", parts: [{ text: modelResponse }] },
    // ]);
    // await newChatHistory.save();

    const newChatHistory = await ChatHistory.create({
      role: "user",
      parts: [{ text: userPrompt }],
    });
    const newModelHistory = await ChatHistory.create({
      role: "model",
      parts: [{ text: modelResponse }],
    });
    return [newChatHistory, newModelHistory];
  } catch (error) {
    console.log("ERRORR!!!", error);
  }
};
