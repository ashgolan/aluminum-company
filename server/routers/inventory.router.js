import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/inventory.controller.js";
export const inventoryRouter = Router();

inventoryRouter.get("/", getAllProducts);
inventoryRouter.get("/:id", getProduct);
inventoryRouter.post("/", createProduct);
inventoryRouter.patch("/", updateProduct);
inventoryRouter.delete("/", deleteProduct);
