import mongoose, { Schema } from "mongoose";

export type ChatHistorySchemaType = {
  role: string;
  parts: { text: string }[];
};

export const ChatHistorySchema = new Schema({
  role: { type: String, enum: ["user", "model"] },
  parts: [{ text: String }],
});

export const ChatHistory =
  mongoose.models.ChatHistory ||
  mongoose.model("ChatHistory", ChatHistorySchema);
