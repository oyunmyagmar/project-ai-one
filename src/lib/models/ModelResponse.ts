import mongoose, { Schema } from "mongoose";

export type ModelResponseType = {
  modelResponse: string;
};

const ModelResponseSchema = new Schema({
  modelResponse: { type: String, required: true },
});

export const ModelResponse =
  mongoose.models.ModelResponse ||
  mongoose.model("ModelResponse", ModelResponseSchema);
