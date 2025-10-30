import mongoose, { Schema } from "mongoose";

export type ChatHistorySchemaType = {
  role: string;
  parts: { text: string }[];
};

export const ChatHistorySchema = new Schema({
  role: { type: String, enum: ["user", "model"], required: true },
  parts: [{ text: { type: String, required: true } }],
});

export const ChatHistory =
  mongoose.models.ChatHistory ||
  mongoose.model("ChatHistory", ChatHistorySchema);
