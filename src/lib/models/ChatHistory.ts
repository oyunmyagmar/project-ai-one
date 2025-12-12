import mongoose, { Schema } from "mongoose";

export type ChatHistorySchemaType = {
  userPrompt: string;
  modelResponse: string;
};

export const ChatHistorySchema = new Schema(
  {
    userPrompt: { type: String, required: true },
    modelResponse: { type: String, required: true },
  },
  { timestamps: true }
);

export const ChatHistory =
  mongoose.models.ChatHistory ||
  mongoose.model<ChatHistorySchemaType>("ChatHistory", ChatHistorySchema);
// tusdaa session - toi bh, session id-tai bh, tgd session -eeree yalgagdaj chatlah
