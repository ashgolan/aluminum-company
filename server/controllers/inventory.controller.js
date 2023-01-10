import multer from "multer";
import { Inventory } from "../models/inventory.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Inventory.find();
    if (!products) throw Error("data not found");
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
};
export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Inventory.findById({ _id: id });
    if (!product) throw Error("product not found");
    res.send(product);
  } catch (e) {
    res.send(e.message);
  }
};

export const createProduct = async (req, res) => {
  const storage = multer.diskStorage({
    dist: "images",
    filename: (req, file, cb) => {
      file = req.body.image;
      cb(null, file);
    },
  });
  const upload = multer({
    storage: storage,
  }).single("testImage");

  try {
    const product = await Inventory.create({ ...req.body, image: upload });
    if (!product) throw Error("bad data was inserted!");
    res.send(product);
  } catch (e) {
    res.send(e.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Inventory.findByIdAndDelete({ _id: req.body._id });
    if (!product) throw Error("bad data was inserted!");
    res.send(product);
  } catch (e) {
    res.send(e.message);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const newProduct = await Inventory.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body }
    );
    if (!newProduct) throw Error("bad data was inserted!");
    res.send(newProduct);
  } catch (e) {
    res.send(e.message);
  }
};
