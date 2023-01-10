import { Schema, model } from "mongoose";

const inventorySchema = new Schema({
  number: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  weight: { type: Number, required: true },
  length: { type: Number, required: true },
  image: { data: Buffer, contentType: String },
});

export const Inventory = model("Inventory", inventorySchema);
