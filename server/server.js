import Express from "express";
import cors from "cors";
import "./DB/mongoose.js";
import { bidRouter } from "./routers/bid.router.js";
import { forgingRouter } from "./routers/forging.router.js";
import { inventoryRouter } from "./routers/inventory.router.js";
import { calcRouter } from "./routers/calc.router.js";
import passport from "passport";
import session from "express-session";
import * as url from "url";
import path from "path";
import { createUser, login } from "./controllers/user.controller.js";
import { userRouter } from "./routers/user.router.js";

const __dirname = url.fileURLToPath(new URL("./", import.meta.url));
const publicPath = path.join(__dirname, "build");

const PORT = process.env.port || 5000;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static(publicPath));

app.use(
  session({
    secret: "outlittlesecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error("Oh no")); //handle error
  }
  next(); //otherwise continue
});

app.use("/uploads", Express.static("uploads"));
app.use("/user", userRouter);

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.send("logging out");
});
app.use("/Bids", bidRouter);
app.use("/ForgingBids", forgingRouter);
app.use("/Inventory", inventoryRouter);
app.use("/Calc", calcRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("connecting to port", PORT);
});
