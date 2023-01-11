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
  try {
    console.log(req.file);
    const product = await Inventory.create({
      number: req.body.number,
      desc: req.body.desc,
      category: req.body.category,
      weight: req.body.weight,
      length: req.body.length,
      image: req.file.path.replace(/\\/g, "/"),
    });
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
