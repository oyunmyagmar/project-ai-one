import { ModelResponse } from "../models/ModelResponse";
import connectDB from "../mongodb";

export const createModelResponse = async (modelResponse: string) => {
  await connectDB();
  const newModelResponse = new ModelResponse({ modelResponse });
  await newModelResponse.save();
  return newModelResponse;
};
