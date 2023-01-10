import { Schema, model } from "mongoose";
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const calcSchema = new Schema({
  productName: { type: String, required: true },
  params: { type: Object },
  lastUpdate: { type: String, default: date },
  time: { type: String, default: time },
});

export const Calc = model("Calc", calcSchema);
