import { Schema } from "mongoose";

export const imageSchema = new Schema({
  name: { type: String, required: true },
  img: { data: Buffer, contentType: String },
});
