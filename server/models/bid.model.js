import { Schema, model } from "mongoose";
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const bidSchema = new Schema({
  clientName: { type: String, required: true },
  date: { type: String, default: date },
  time: { type: String, default: time },
  isApproved: { type: Boolean, default: false },
  color: { type: String, default: "Not Selected" },
  data: { type: Array },
});

export const Bid = model("Bid", bidSchema);
