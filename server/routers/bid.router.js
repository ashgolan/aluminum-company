import { Router } from "express";
import {
  createBid,
  deleteBid,
  getAllBids,
  getBid,
  updateBid,
} from "../controllers/bid.controller.js";
export const bidRouter = Router();

bidRouter.get("/", getAllBids);
bidRouter.get("/:id", getBid);
bidRouter.post("/", createBid);
bidRouter.patch("/", updateBid);
bidRouter.delete("/", deleteBid);
