import Express from "express";
import cors from "cors";
import "./DB/mongoose.js";
import { bidRouter } from "./routers/bid.router.js";
import { forgingRouter } from "./routers/forging.router.js";
import { inventoryRouter } from "./routers/inventory.router.js";
import { calcRouter } from "./routers/calc.router.js";

const PORT = process.env.port || 5000;

const app = Express();
app.use("/uploads", Express.static("uploads"));
app.use(cors());
app.use(Express.json());

app.use("/Bids", bidRouter);
app.use("/ForgingBids", forgingRouter);
app.use("/Inventory", inventoryRouter);
app.use("/Calc", calcRouter);

app.listen(PORT, () => {
  console.log("connecting to port", PORT);
});
