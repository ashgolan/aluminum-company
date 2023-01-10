import { Router } from "express";
import {
  createForgingBid,
  deleteForgingBid,
  getAllForgingBids,
  getForgingBid,
  updateForgingBid,
} from "../controllers/forging.controller.js";
export const forgingRouter = Router();

forgingRouter.get("/", getAllForgingBids);
forgingRouter.get("/:id", getForgingBid);
forgingRouter.post("/", createForgingBid);
forgingRouter.patch("/", updateForgingBid);
forgingRouter.delete("/", deleteForgingBid);
