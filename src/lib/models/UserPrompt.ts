import mongoose, { Schema } from "mongoose";

export type UserPromptSchemaType = {
  userPrompt: string;
};

const UserPromptSchema = new Schema({
  userPrompt: { type: String, required: true },
});

export const UserPrompt =
  mongoose.models.UserPrompt || mongoose.model("UserPrompt", UserPromptSchema);
