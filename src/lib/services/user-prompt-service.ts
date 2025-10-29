import { UserPrompt } from "../models/UserPrompt";
import connectDB from "../mongodb";

export const createUserPrompt = async (userPrompt: string) => {
  await connectDB();
  const newUserPrompt = new UserPrompt({ userPrompt });
  await newUserPrompt.save();
  return newUserPrompt;
};
