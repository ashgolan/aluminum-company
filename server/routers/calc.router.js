import { Router } from "express";
import {
  createWindowParams,
  deleteWindowParams,
  getAllCalcParameters,
  getWindowParams,
  updateWindowParams,
} from "../controllers/calc.controller.js";
export const calcRouter = Router();

calcRouter.get("/", getAllCalcParameters);
calcRouter.get("/:id", getWindowParams);
calcRouter.post("/", createWindowParams);
calcRouter.patch("/", updateWindowParams);
calcRouter.delete("/", deleteWindowParams);
